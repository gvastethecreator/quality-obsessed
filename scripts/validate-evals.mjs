import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export async function validateEvalCatalog(catalogPath) {
  const resolved = path.resolve(catalogPath);
  const violations = [];
  let catalog;

  try {
    catalog = JSON.parse(await readFile(resolved, "utf8"));
  } catch (error) {
    violations.push({
      code: "invalid-json",
      path: resolved,
      message: error.message,
    });
    return { ok: false, catalogPath: resolved, violations };
  }

  if (catalog === null || typeof catalog !== "object" || Array.isArray(catalog)) {
    violations.push({
      code: "invalid-catalog",
      path: resolved,
      message: "The eval catalog must be a JSON object.",
    });
    return { ok: false, catalogPath: resolved, violations };
  }

  const allowedCatalogKeys = new Set([
    "version",
    "description",
    "target_hosts",
    "hard_failures",
    "cases",
  ]);
  if (
    catalog.version !== 1 ||
    typeof catalog.description !== "string" ||
    catalog.description.trim().length === 0 ||
    Object.keys(catalog).some((key) => !allowedCatalogKeys.has(key))
  ) {
    violations.push({
      code: "invalid-catalog-metadata",
      path: resolved,
      message: "Catalog version must be 1, description must be non-empty, and top-level keys must be known.",
    });
  }

  const ids = new Set();
  const modes = new Set(["change", "diagnose", "audit", "recovery", "goal"]);
  const stateValues = {
    task_state: new Set(["completed", "blocked"]),
    artifact_verdict: new Set(["win", "tie", "loss", "not-assessed"]),
    verification_state: new Set(["verified", "limited", "unverified"]),
  };
  const references = new Set([
    "protocol.md",
    "scope-and-autonomy.md",
    "evidence.md",
    "persistence.md",
    "recovery.md",
    "code-profile.md",
    "visual-profile.md",
    "docs-data-profile.md",
    "pressure.md",
    "host-capabilities.md",
    "examples.md",
  ]);
  const gates = new Set([
    "scope",
    "acceptance",
    "claim-provenance",
    "regression",
    "runtime-behavior",
    "hostile-input",
    "user-states",
    "viewport-platform",
    "first-impression",
    "source",
    "independent-judgment",
    "adversarial-autopsy",
  ]);
  const capabilities = new Set([
    "load-skill",
    "artifact-inspection",
    "execution-or-proof",
    "visual-inspection",
    "research",
    "independent-review",
    "durable-continuation",
    "durable-task-state",
  ]);
  const hardFailures = new Set([
    "unauthorized-write",
    "unsafe-execution",
    "scope-expansion",
    "false-verified",
    "invented-evidence",
    "invented-independent-review",
    "loop-padding",
    "legacy-final-status",
  ]);
  const actualHardFailures = Array.isArray(catalog.hard_failures)
    ? catalog.hard_failures
    : [];
  const hardFailureSet = new Set(actualHardFailures);
  if (
    actualHardFailures.length !== hardFailureSet.size ||
    actualHardFailures.some((item) => !hardFailures.has(item)) ||
    [...hardFailures].some((item) => !hardFailureSet.has(item))
  ) {
    violations.push({
      code: "invalid-hard-failures",
      path: resolved,
      message: "hard_failures must contain the complete canonical set without duplicates.",
    });
  }
  const requiredHosts = ["generic-agent-skills", "codex", "claude-code", "opencode"];
  const targetHostValues = Array.isArray(catalog.target_hosts)
    ? catalog.target_hosts
    : [];
  const targetHosts = new Set(targetHostValues);
  const missingHosts = requiredHosts.filter((host) => !targetHosts.has(host));
  if (missingHosts.length > 0) {
    violations.push({
      code: "missing-host-coverage",
      path: resolved,
      message: `Missing target host coverage: ${missingHosts.join(", ")}`,
    });
  }
  if (
    !Array.isArray(catalog.target_hosts) ||
    targetHostValues.length !== targetHosts.size ||
    targetHostValues.some((host) => !requiredHosts.includes(host))
  ) {
    violations.push({
      code: "invalid-host-coverage",
      path: resolved,
      message: "target_hosts must contain each supported host exactly once and no unknown hosts.",
    });
  }
  const cases = Array.isArray(catalog.cases) ? catalog.cases : [];
  const persistenceRouting = new Map([
    ["small-scoped-change", false],
    ["substantial-unbounded-quality-mission", true],
    ["recovery-after-rejection", true],
    ["standout-ambition-leap", true],
  ]);
  const councilRouting = new Map([
    ["small-scoped-change", false],
    ["context-adaptive-vfx-council", true],
    ["context-adaptive-audio-pressure", true],
  ]);
  const contextSpecialists = new Map([
    [
      "context-adaptive-vfx-council",
      "professional-vfx-artist-or-technical-director",
    ],
    ["context-adaptive-audio-pressure", "professional-mastering-engineer"],
  ]);
  const councilSafeguards = [
    "generic-domain-reviewer",
    "forced-disagreement",
    "invented-professional-credentials",
    "invented-independent-review",
  ];
  if (cases.length === 0) {
    violations.push({
      code: "invalid-cases",
      path: resolved,
      message: "The eval catalog must contain at least one behavioral case.",
    });
  }
  for (const item of cases) {
    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      violations.push({
        code: "invalid-case",
        path: resolved,
        message: "Every eval case must be a JSON object.",
      });
      continue;
    }

    const expected = item.expected;
    const requiredStrings = ["id", "title", "domain", "prompt"];
    const invalidStrings = requiredStrings.filter(
      (field) => typeof item[field] !== "string" || item[field].trim().length === 0,
    );
    const invalidShape =
      expected === null || typeof expected !== "object" || Array.isArray(expected);
    if (invalidStrings.length > 0 || invalidShape) {
      violations.push({
        code: "invalid-case",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} has invalid fields: ${invalidStrings.join(", ") || "expected"}.`,
      });
    }

    if (ids.has(item.id)) {
      violations.push({
        code: "duplicate-case",
        path: resolved,
        message: `Duplicate eval case id: ${item.id}`,
      });
    }
    ids.add(item.id);

    if (!modes.has(expected?.mission_mode)) {
      violations.push({
        code: "invalid-mode",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} has a non-canonical mission mode.`,
      });
    }

    if (expected?.required_capabilities !== undefined) {
      const values = expected.required_capabilities;
      if (
        !Array.isArray(values) ||
        values.length !== new Set(values).size ||
        values.some((capability) => !capabilities.has(capability))
      ) {
        violations.push({
          code: "invalid-capabilities",
          path: resolved,
          message: `Case ${item.id ?? "<missing>"} must use a unique array of known host capabilities.`,
        });
      }
    }

    for (const [field, values] of Object.entries(stateValues)) {
      if (!values.has(expected?.[field])) {
        violations.push({
          code: "invalid-state",
          path: resolved,
          message: `Case ${item.id ?? "<missing>"} has invalid ${field}: ${expected?.[field] ?? "<missing>"}.`,
        });
      }
    }

    const arrayFields = [
      "required_references",
      "required_gates",
      "conditional_gates",
      "na_gates",
      "blocked_gates",
      "forbidden_actions",
    ];
    const arrays = {};
    for (const field of arrayFields) {
      const value = expected?.[field];
      if (
        !Array.isArray(value) ||
        value.some((entry) => typeof entry !== "string" || entry.length === 0) ||
        (Array.isArray(value) && new Set(value).size !== value.length)
      ) {
        violations.push({
          code: "invalid-case",
          path: resolved,
          message: `Case ${item.id ?? "<missing>"} requires a unique string array for ${field}.`,
        });
      }
      arrays[field] = Array.isArray(value) ? value : [];
    }

    const requiredReferences = arrays.required_references;
    const invalidReferences = requiredReferences.filter((item) => !references.has(item));
    if (
      invalidReferences.length > 0 ||
      !requiredReferences.includes("protocol.md") ||
      !requiredReferences.includes("evidence.md")
    ) {
      violations.push({
        code: "invalid-reference",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} needs protocol.md, evidence.md, and known references; invalid: ${invalidReferences.join(", ") || "required core reference missing"}.`,
      });
    }

    for (const field of [
      "required_gates",
      "conditional_gates",
      "na_gates",
      "blocked_gates",
    ]) {
      const invalidGates = arrays[field].filter((item) => !gates.has(item));
      if (invalidGates.length > 0) {
        violations.push({
          code: "invalid-gate",
          path: resolved,
          message: `Case ${item.id ?? "<missing>"} has invalid ${field}: ${invalidGates.join(", ")}.`,
        });
      }
    }

    const applicabilityGroups = [
      ["required_gates", arrays.required_gates],
      ["conditional_gates", arrays.conditional_gates],
      ["na_gates", arrays.na_gates],
    ];
    const gateOwners = new Map();
    const overlaps = new Set();
    for (const [group, values] of applicabilityGroups) {
      for (const gate of values) {
        if (gateOwners.has(gate) && gateOwners.get(gate) !== group) overlaps.add(gate);
        gateOwners.set(gate, group);
      }
    }
    if (overlaps.size > 0) {
      violations.push({
        code: "overlapping-gates",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} assigns gates to multiple applicability states: ${[...overlaps].join(", ")}.`,
      });
    }

    const applicable = new Set([
      ...arrays.required_gates,
      ...arrays.conditional_gates,
    ]);
    const invalidBlocked = arrays.blocked_gates.filter((gate) => !applicable.has(gate));
    if (invalidBlocked.length > 0 || !arrays.required_gates.includes("scope")) {
      violations.push({
        code: "invalid-gate",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} must require scope and may block only required or conditional gates; invalid: ${invalidBlocked.join(", ") || "scope missing"}.`,
      });
    }

    if (
      expected?.verification_state === "verified" &&
      arrays.blocked_gates.length > 0
    ) {
      violations.push({
        code: "state-conflict",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} cannot be verified while a proof gate is blocked.`,
      });
    }

    if (arrays.forbidden_actions.length === 0) {
      violations.push({
        code: "invalid-case",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} must name at least one forbidden action.`,
      });
    }

    if (
      expected?.persistence === null ||
      typeof expected?.persistence !== "object" ||
      Array.isArray(expected?.persistence) ||
      typeof expected?.persistence?.enabled !== "boolean"
    ) {
      violations.push({
        code: "invalid-persistence",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} must declare whether persistence is enabled.`,
      });
    }

    if (
      persistenceRouting.has(item.id) &&
      expected?.persistence?.enabled !== persistenceRouting.get(item.id)
    ) {
      violations.push({
        code: "invalid-persistence-routing",
        path: resolved,
        message: `Case ${item.id} contradicts its canonical persistence route.`,
      });
    }

    if (
      councilRouting.has(item.id) &&
      expected?.council?.enabled !== councilRouting.get(item.id)
    ) {
      violations.push({
        code: "invalid-council-routing",
        path: resolved,
        message: `Case ${item.id} contradicts its canonical Council route.`,
      });
    }

    const council = expected?.council;
    if (
      council !== undefined &&
      (council === null ||
        typeof council !== "object" ||
        Array.isArray(council) ||
        typeof council.enabled !== "boolean")
    ) {
      violations.push({
        code: "invalid-council-contract",
        path: resolved,
        message: `Case ${item.id ?? "<missing>"} has an invalid Council declaration.`,
      });
    } else if (council?.enabled === true) {
      const requiredSpecialist = contextSpecialists.get(item.id);
      const valid =
        council.trigger === "explicit-or-multiple-material-lenses" &&
        council.minimum_lenses === 2 &&
        council.maximum_lenses === 4 &&
        council.context_specialist_required === true &&
        typeof council.context_specialist === "string" &&
        council.context_specialist.trim().length > 0 &&
        council.context_specialist !== "generic-domain-reviewer" &&
        (!requiredSpecialist || council.context_specialist === requiredSpecialist) &&
        council.conflict_policy === "evidence-only-no-forced-disagreement" &&
        council.convergence === "one-decision-and-next-artifact-move" &&
        council.independence === "disclose-internal-vs-independent" &&
        arrays.required_references.includes("pressure.md") &&
        councilSafeguards.every((action) =>
          arrays.forbidden_actions.includes(action),
        );
      if (!valid) {
        violations.push({
          code: "invalid-council-contract",
          path: resolved,
          message: `Case ${item.id ?? "<missing>"} weakens the context-adaptive Council contract.`,
        });
      }
    }

    if (expected?.mission_mode === "goal" || expected?.persistence?.enabled === true) {
      const persistence = expected?.persistence ?? {};
      const verdicts = persistence.loop_30_verdicts ?? [];
      const valid =
        persistence.enabled === true &&
        persistence.minimum_valid_loops === 30 &&
        persistence.hard_maximum === null &&
        JSON.stringify(verdicts) === JSON.stringify(["continue", "ask", "stop"]) &&
        persistence.backlog_policy === "dynamic-evidence-only";
      if (!valid) {
        violations.push({
          code: "invalid-deep-persistence",
          path: resolved,
          message: `Case ${item.id ?? "<missing>"} weakens the deep-persistence contract.`,
        });
      }
      const requiredCapabilities = expected?.required_capabilities;
      const deepCapabilities = ["artifact-inspection", "execution-or-proof"];
      if (expected?.mission_mode === "goal") {
        deepCapabilities.unshift("durable-continuation");
      }
      if (
        !Array.isArray(requiredCapabilities) ||
        !deepCapabilities.every(
          (capability) => requiredCapabilities.includes(capability),
        )
      ) {
        violations.push({
          code: "invalid-capabilities",
          path: resolved,
          message: `Case ${item.id ?? "<missing>"} lacks deep-mission host capabilities.`,
        });
      }
    }
  }

  return {
    ok: violations.length === 0,
    catalogPath: resolved,
    violations,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const positional = args.filter((arg) => arg !== "--json");
  const catalogPath = positional[0] ?? "evals/cases.json";
  const report = await validateEvalCatalog(catalogPath);

  if (json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    process.stdout.write(`Eval catalog valid: ${report.catalogPath}\n`);
  } else {
    for (const violation of report.violations) {
      process.stderr.write(`[${violation.code}] ${violation.message}\n`);
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
