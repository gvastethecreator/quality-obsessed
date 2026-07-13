import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocument } from "yaml";

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function listFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(target)));
    else files.push(target);
  }
  return files;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseYamlRecord(source) {
  try {
    const document = parseDocument(source, { uniqueKeys: true });
    if (document.errors.length > 0) {
      return {
        ok: false,
        value: undefined,
        errors: document.errors.map((error) => error.message),
      };
    }

    const value = document.toJS({ maxAliasCount: 100 });
    return {
      ok: isRecord(value),
      value,
      errors: isRecord(value) ? [] : ["YAML document must contain a mapping."],
    };
  } catch (error) {
    return {
      ok: false,
      value: undefined,
      errors: [error.message],
    };
  }
}

export async function validateSkill(skillPath) {
  const resolved = path.resolve(skillPath);
  const violations = [];

  const skillFile = path.join(resolved, "SKILL.md");
  if (!(await exists(skillFile))) {
    violations.push({
      code: "frontmatter",
      path: "SKILL.md",
      message: "SKILL.md is required.",
    });
  } else {
    const content = await readFile(skillFile, "utf8");
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    const allowed = new Set([
      "name",
      "description",
      "license",
      "compatibility",
      "metadata",
      "allowed-tools",
    ]);
    if (!match) {
      violations.push({
        code: "frontmatter",
        path: "SKILL.md",
        message: "SKILL.md must begin with YAML frontmatter.",
      });
    } else {
      const parsed = parseYamlRecord(match[1]);
      const data = parsed.value;
      if (!parsed.ok) {
        violations.push({
          code: "frontmatter-yaml",
          path: "SKILL.md",
          message: `Frontmatter is not valid YAML: ${parsed.errors.join("; ")}`,
        });
      } else {
        const keys = Object.keys(data);
        if (
          !keys.includes("name") ||
          !keys.includes("description") ||
          keys.some((key) => !allowed.has(key))
        ) {
          violations.push({
            code: "frontmatter",
            path: "SKILL.md",
            message: "Frontmatter must use only portable fields supported by this package.",
          });
        }

        const name = data.name;
        const validName =
          typeof name === "string" &&
          name.length >= 1 &&
          name.length <= 64 &&
          /^(?!.*--)[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) &&
          name === path.basename(resolved);
        if (!validName) {
          violations.push({
            code: "frontmatter-name",
            path: "SKILL.md",
            message:
              "Skill name must follow the Agent Skills format and match its directory.",
          });
        }

        const description = data.description;
        if (
          typeof description !== "string" ||
          description.length < 1 ||
          description.length > 1_024
        ) {
          violations.push({
            code: "frontmatter-description",
            path: "SKILL.md",
            message:
              "Description must be a valid non-empty scalar of at most 1024 characters.",
          });
        }

        if (data.license !== "MIT") {
          violations.push({
            code: "frontmatter-license",
            path: "SKILL.md",
            message: "This distribution must declare license: MIT.",
          });
        }

        if (data.compatibility !== undefined) {
          if (
            typeof data.compatibility !== "string" ||
            data.compatibility.length < 1 ||
            data.compatibility.length > 500
          ) {
            violations.push({
              code: "frontmatter-compatibility",
              path: "SKILL.md",
              message:
                "Compatibility must be a valid non-empty scalar of at most 500 characters.",
            });
          }
        }

        if (
          data.metadata !== undefined &&
          (!isRecord(data.metadata) ||
            Object.values(data.metadata).some(
              (value) => typeof value !== "string",
            ))
        ) {
          violations.push({
            code: "frontmatter-metadata",
            path: "SKILL.md",
            message: "Metadata must be a mapping of string keys to string values.",
          });
        }

        if (
          data["allowed-tools"] !== undefined &&
          (typeof data["allowed-tools"] !== "string" ||
            data["allowed-tools"].length < 1)
        ) {
          violations.push({
            code: "frontmatter-allowed-tools",
            path: "SKILL.md",
            message: "allowed-tools must be a non-empty space-separated string.",
          });
        }
      }
    }
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 1_200) {
      violations.push({
        code: "skill-context-budget",
        path: "SKILL.md",
        message: `SKILL.md has ${wordCount} words; keep it at or below 1200.`,
      });
    }
  }

  const licensePath = path.join(resolved, "LICENSE");
  if (!(await exists(licensePath))) {
    violations.push({
      code: "package-license",
      path: "LICENSE",
      message: "The installed skill package must include its MIT license.",
    });
  } else {
    const license = await readFile(licensePath, "utf8");
    const requiredLicenseText = [
      "MIT License",
      "Permission is hereby granted, free of charge",
      'THE SOFTWARE IS PROVIDED "AS IS"',
    ];
    if (requiredLicenseText.some((text) => !license.includes(text))) {
      violations.push({
        code: "package-license",
        path: "LICENSE",
        message: "The bundled LICENSE must contain the complete MIT grant and disclaimer.",
      });
    }
  }

  const agentMetadataPath = path.join(resolved, "agents", "openai.yaml");
  if (!(await exists(agentMetadataPath))) {
    violations.push({
      code: "agent-metadata",
      path: "agents/openai.yaml",
      message: "The package must declare its Codex interface metadata.",
    });
  } else {
    const metadata = await readFile(agentMetadataPath, "utf8");
    const requiredFields = ["display_name", "short_description", "default_prompt"];
    const parsed = parseYamlRecord(metadata);
    const interfaceData = parsed.ok && isRecord(parsed.value.interface)
      ? parsed.value.interface
      : {};
    const missing = requiredFields.filter((field) => {
      const value = interfaceData[field];
      return typeof value !== "string" || value.trim().length === 0;
    });
    const shortDescription = interfaceData.short_description;
    const defaultPrompt = interfaceData.default_prompt;
    if (
      !parsed.ok ||
      missing.length > 0 ||
      (typeof shortDescription === "string" && shortDescription.length > 64) ||
      (typeof defaultPrompt === "string" &&
        !defaultPrompt.includes("$quality-obsessed"))
    ) {
      violations.push({
        code: "agent-metadata",
        path: "agents/openai.yaml",
        message: `Codex interface metadata is invalid or incomplete: ${missing.join(", ") || parsed.errors.join("; ")}.`,
      });
    }
  }

  if (await exists(path.join(resolved, "references", "README.md"))) {
    violations.push({
      code: "runtime-readme",
      path: "references/README.md",
      message: "Keep reference routing in SKILL.md; do not ship a duplicate runtime README.",
    });
  }

  const protocolPath = path.join(resolved, "references", "protocol.md");
  const protocolContract = new Map([
    ["mission_mode", "change | diagnose | audit | recovery | goal"],
    ["task_state", "completed | blocked"],
    ["artifact_verdict", "win | tie | loss | not-assessed"],
    ["verification_state", "verified | limited | unverified"],
    ["loop_verdict", "better | mixed | flat | worse"],
    ["severity", "blocker | P1 | P2 | P3"],
    ["gate_state", "passed | failed | blocked | N/A"],
    ["scope_rule", "explicit-user-boundaries-win"],
    ["mutation_stop", "acceptance-met-and-no-blocker-or-P1"],
    ["analysis_stop", "requested-analysis-complete"],
  ]);
  if (!(await exists(protocolPath))) {
    violations.push({
      code: "protocol-contract",
      path: "references/protocol.md",
      message: "The canonical protocol reference is required.",
    });
  } else {
    const protocol = await readFile(protocolPath, "utf8");
    const invalid = [];
    for (const [key, value] of protocolContract) {
      const definitions = [...protocol.matchAll(new RegExp(`^[ \\t]{0,3}${key}:\\s*(.+?)\\s*$`, "gm"))];
      if (definitions.length !== 1 || definitions[0][1] !== value) {
        invalid.push(`${key}: ${value}`);
      }
    }
    if (invalid.length > 0) {
      violations.push({
        code: "protocol-contract",
        path: "references/protocol.md",
        message: `Canonical protocol keys must appear exactly once with these values: ${invalid.join(", ")}`,
      });
    }
  }

  const persistencePath = path.join(resolved, "references", "persistence.md");
  const persistenceContract = new Map([
    ["minimum_valid_loops", "10"],
    ["hard_maximum", "none"],
    ["loop_10_verdict", "continue | ask | stop"],
    ["backlog_policy", "dynamic-evidence-only"],
    ["default_activation", "substantial-unbounded-quality-mission"],
    ["goal_activation", "explicit-user-request"],
  ]);
  if (!(await exists(persistencePath))) {
    violations.push({
      code: "persistence-contract",
      path: "references/persistence.md",
      message: "The deep persistence reference is required.",
    });
  } else {
    const persistence = await readFile(persistencePath, "utf8");
    const invalid = [];
    for (const [key, value] of persistenceContract) {
      const definitions = [
        ...persistence.matchAll(new RegExp(`^[ \\t]{0,3}${key}:\\s*(.+?)\\s*$`, "gm")),
      ];
      if (definitions.length !== 1 || definitions[0][1] !== value) {
        invalid.push(`${key}: ${value}`);
      }
    }
    if (invalid.length > 0) {
      violations.push({
        code: "persistence-contract",
        path: "references/persistence.md",
        message: `Deep-persistence keys must appear exactly once with these values: ${invalid.join(", ")}`,
      });
    }
  }

  const semanticParityContracts = new Map([
    [
      "references/scope-and-autonomy.md",
      new Map([
        ["multi_slice_execution", "vertical-frontier-expand-contract"],
        [
          "durable_research_note",
          "current-disputed-reusable-delegated-or-multi-slice",
        ],
      ]),
    ],
    [
      "references/persistence.md",
      new Map([
        ["durable_task_record", "required-when-capable-and-resumable"],
        [
          "artifact_balance",
          "artifact-change-dominates-when-mutation-authorized",
        ],
      ]),
    ],
    [
      "references/pressure.md",
      new Map([
        ["council_pass", "explicit-or-multiple-material-lenses"],
        ["council_lenses", "two-to-four-non-overlapping"],
        [
          "context_specialist",
          "required-artifact-specific-professional-role",
        ],
        ["council_conflict", "evidence-only-no-forced-disagreement"],
        [
          "council_convergence",
          "one-decision-and-next-artifact-move",
        ],
        [
          "council_value",
          "artifact-backlog-proof-scope-or-decision-change",
        ],
        [
          "council_independence",
          "internal-lenses-are-not-independent-review",
        ],
        ["ambition_leap", "explicit-standout-within-authority"],
        ["grilling_hold", "explicit-preimplementation-request"],
        ["review_disclosure", "report-used-or-omitted"],
        [
          "review_escalation",
          "two-consecutive-mixed-when-decision-relevant",
        ],
        [
          "adversarial_autopsy",
          "required-before-final-for-broad-quality-recovery-review",
        ],
      ]),
    ],
    [
      "references/orchestration.md",
      new Map([
        [
          "plan_routing",
          "model-and-reasoning-on-every-step-when-selectable",
        ],
        ["routing_sequence", "judgment-execution-judgment"],
        [
          "handoff_contract",
          "deliverable-dependencies-surface-proof-return",
        ],
        ["routing_enforcement", "plan-label-and-actual-dispatch"],
        ["routing_fallback", "closest-available-disclosed"],
        ["judgment_model", "gpt-5.6-sol"],
        ["judgment_reasoning", "xhigh"],
        ["execution_model", "gpt-5.6-luna"],
        ["execution_reasoning", "max"],
        ["execution_communication", "caveman-action-first-minimal-talk"],
        ["execution_audit", "sol-xhigh-required-before-acceptance"],
        ["execution_audit_verdict", "accept | repair | reset"],
        [
          "task_local_verification",
          "focused-tests-and-current-file-checks-only",
        ],
        ["interim_typecheck", "current-edited-file-only-or-skip"],
        [
          "full_verification_trigger",
          "multiple-sol-accepted-tasks-or-final-batch",
        ],
        ["full_verification_suite", "tests-build-typecheck-once-per-batch"],
      ]),
    ],
    [
      "references/creative-search.md",
      new Map([
        ["creative_search", "diverge-prototype-compare-commit"],
        [
          "creative_trigger",
          "explicit-creative-standout-greenfield-or-direction-risk",
        ],
        ["direction_count", "three-materially-distinct"],
        [
          "direction_distance",
          "thesis-structure-or-behavior-not-cosmetic",
        ],
        ["prototype_policy", "cheapest-representative-artifact"],
        ["selection_basis", "user-value-signature-feasibility-proof"],
        ["hybrid_policy", "no-default-hybrid"],
        ["signature_move", "one-memorable-useful-move"],
        ["subtraction_move", "remove-one-generic-or-diluting-element"],
        ["blind_audience_read", "brief-hidden-perception-test"],
        ["blind_read_fields", "understood-action-memory-mismatch"],
      ]),
    ],
    [
      "references/visual-profile.md",
      new Map([
        ["artifact_realism", "representative-functional-no-placeholders"],
      ]),
    ],
    [
      "references/code-profile.md",
      new Map([
        [
          "automation_safety",
          "trigger-idempotency-retry-feedback-secrets-logs-rollback-dry-run",
        ],
      ]),
    ],
    [
      "references/recovery.md",
      new Map([
        ["recovery_hyperfocus", "improve-protect-or-prove-each-loop"],
        [
          "recovery_reset",
          "three-invalid-low-impact-mixed-flat-or-neutral",
        ],
      ]),
    ],
  ]);
  for (const [relative, contract] of semanticParityContracts) {
    const contractPath = path.join(resolved, ...relative.split("/"));
    const invalid = [];
    if (!(await exists(contractPath))) {
      invalid.push(...[...contract].map(([key, value]) => `${key}: ${value}`));
    } else {
      const content = await readFile(contractPath, "utf8");
      for (const [key, value] of contract) {
        const definitions = [
          ...content.matchAll(
            new RegExp(`^[ \\t]{0,3}${key}:\\s*(.+?)\\s*$`, "gm"),
          ),
        ];
        if (definitions.length !== 1 || definitions[0][1] !== value) {
          invalid.push(`${key}: ${value}`);
        }
      }
    }
    if (invalid.length > 0) {
      violations.push({
        code: "semantic-parity-contract",
        path: relative,
        message: `Restored semantic contracts must appear exactly once: ${invalid.join(", ")}`,
      });
    }
  }

  const semanticParityOwners = new Map(
    [...semanticParityContracts].flatMap(([relative, contract]) =>
      [...contract.keys()].map((key) => [key, relative]),
    ),
  );
  const semanticParityPattern = `^[ \\t]{0,3}(${[
    ...semanticParityOwners.keys(),
  ].join("|")})\\s*:`;

  if (await exists(resolved)) {
    const markdownFiles = (await listFiles(resolved)).filter((file) => file.endsWith(".md"));
    const legacyStatus = /\b(?:quality wins?|red\/failed|tie\/no meaningful delta|failed to beat baseline)\b/i;
    const vendorRuntime = /\b(?:Codex|Claude Code|OpenCode)\b|(?:^|\s)\/goal\b|\$quality-obsessed\b/im;
    const vendorRuntimeOwners = new Set(["references/orchestration.md"]);
    const canonicalDefinition = /^[ \t]{0,3}(mission_mode|task_state|artifact_verdict|verification_state|loop_verdict|severity|gate_state|scope_rule|mutation_stop|analysis_stop)\s*:/gm;
    const persistenceDefinition = /^[ \t]{0,3}(minimum_valid_loops|hard_maximum|loop_10_verdict|backlog_policy|default_activation|goal_activation)\s*:/gm;
    for (const file of markdownFiles) {
      const content = await readFile(file, "utf8");
      const relative = path.relative(resolved, file).replaceAll("\\", "/");
      if (legacyStatus.test(content)) {
        violations.push({
          code: "legacy-status",
          path: relative,
          message: "Use the canonical task, artifact, and verification state axes.",
        });
      }
      if (vendorRuntime.test(content) && !vendorRuntimeOwners.has(relative)) {
        violations.push({
          code: "vendor-runtime-coupling",
          path: relative,
          message: "Runtime Markdown must describe host capabilities, not vendor commands.",
        });
      }
      if (relative !== "references/protocol.md") {
        const redefined = [...content.matchAll(canonicalDefinition)].map((match) => match[1]);
        if (redefined.length > 0) {
          violations.push({
            code: "protocol-redefinition",
            path: relative,
            message: `Canonical protocol keys may be defined only in references/protocol.md: ${[...new Set(redefined)].join(", ")}`,
          });
        }
      }
      if (relative !== "references/persistence.md") {
        const redefined = [...content.matchAll(persistenceDefinition)].map(
          (match) => match[1],
        );
        if (redefined.length > 0) {
          violations.push({
            code: "persistence-redefinition",
            path: relative,
            message: `Deep-persistence keys may be defined only in references/persistence.md: ${[...new Set(redefined)].join(", ")}`,
          });
        }
      }
      const foreignParityDefinitions = [
        ...content.matchAll(new RegExp(semanticParityPattern, "gm")),
      ]
        .map((match) => match[1])
        .filter((key) => semanticParityOwners.get(key) !== relative);
      if (foreignParityDefinitions.length > 0) {
        violations.push({
          code: "semantic-parity-redefinition",
          path: relative,
          message: `Restored semantic keys may appear only in their owner reference: ${[
            ...new Set(foreignParityDefinitions),
          ].join(", ")}`,
        });
      }

      const lines = content.split(/\r?\n/);
      if (
        relative.startsWith("references/") &&
        lines.length > 100 &&
        !lines.slice(0, 20).some((line) => /^## Contents\s*$/.test(line))
      ) {
        violations.push({
          code: "reference-toc",
          path: relative,
          message: "References over 100 lines need an early '## Contents' index.",
        });
      }

      const localLinks = [...content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)]
        .map((match) => match[1].trim().replace(/^<|>$/g, ""))
        .filter((link) => !/^(?:https?:|mailto:|#)/i.test(link));
      for (const link of localLinks) {
        const clean = link.split("#", 1)[0].split("?", 1)[0];
        const target = path.resolve(path.dirname(file), clean);
        if (!(await exists(target))) {
          violations.push({
            code: "broken-reference",
            path: relative,
            message: `Local reference does not exist: ${link}`,
          });
        }
      }
    }
  }

  return {
    ok: violations.length === 0,
    skillPath: resolved,
    violations,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const positional = args.filter((arg) => arg !== "--json");
  const skillPath = positional[0] ?? "SKILLS/quality-obsessed";
  const report = await validateSkill(skillPath);

  if (json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    process.stdout.write(`Skill contract valid: ${report.skillPath}\n`);
  } else {
    for (const violation of report.violations) {
      process.stderr.write(`[${violation.code}] ${violation.path}: ${violation.message}\n`);
    }
  }

  if (!report.ok) process.exitCode = 1;
}

const isMain = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isMain) {
  await main();
}
