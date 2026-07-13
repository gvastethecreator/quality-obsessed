import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const validator = path.join(repoRoot, "scripts", "validate-evals.mjs");

function runValidator(catalogPath) {
  return spawnSync(process.execPath, [validator, "--json", catalogPath], {
    cwd: repoRoot,
    encoding: "utf8",
  });
}

test("reports a structured error for a non-object eval catalog", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-shape-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    await writeFile(catalogPath, "null", "utf8");

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "invalid-catalog"),
      JSON.stringify(report, null, 2),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a catalog with no behavioral cases", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-empty-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    await writeFile(
      catalogPath,
      JSON.stringify({
        version: 1,
        target_hosts: ["generic-agent-skills", "codex", "claude-code", "opencode"],
        cases: [],
      }),
      "utf8",
    );

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "invalid-cases"),
      JSON.stringify(report, null, 2),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects incompatible catalog metadata, hosts, and capabilities", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-metadata-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    const catalog = JSON.parse(
      await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
    );
    catalog.version = "1";
    catalog.description = "   ";
    catalog.target_hosts.push("codex", "invented-host");
    catalog.cases.find(({ id }) => id === "deep-goal-mission").expected.required_capabilities =
      "durable-continuation";
    await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    for (const code of [
      "invalid-catalog-metadata",
      "invalid-host-coverage",
      "invalid-capabilities",
    ]) {
      assert.ok(
        report.violations.some((violation) => violation.code === code),
        `${code}: ${JSON.stringify(report, null, 2)}`,
      );
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects malformed cases, invented states, references, and gates", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-contract-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    await writeFile(
      catalogPath,
      JSON.stringify({
        version: 1,
        target_hosts: ["generic-agent-skills", "codex", "claude-code", "opencode"],
        cases: [
          null,
          {
            id: "invalid-contract",
            title: "Invalid contract",
            domain: "code",
            prompt: "",
            expected: {
              mission_mode: "change",
              task_state: "done",
              artifact_verdict: "great",
              verification_state: "trusted",
              persistence: { enabled: false },
              required_references: ["missing.md"],
              required_gates: ["scope", "invented-gate"],
              conditional_gates: ["scope"],
              na_gates: ["scope"],
              blocked_gates: ["scope"],
              forbidden_actions: [],
            },
          },
        ],
      }),
      "utf8",
    );

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    for (const code of [
      "invalid-case",
      "invalid-state",
      "invalid-reference",
      "invalid-gate",
      "overlapping-gates",
    ]) {
      assert.ok(
        report.violations.some((violation) => violation.code === code),
        `${code}: ${JSON.stringify(report, null, 2)}`,
      );
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects duplicate behavioral eval case ids", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    await writeFile(
      catalogPath,
      JSON.stringify({
        version: 1,
        cases: [
          { id: "same", prompt: "first", expected: {} },
          { id: "same", prompt: "second", expected: {} },
        ],
      }),
      "utf8",
    );

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "duplicate-case"),
      JSON.stringify(report, null, 2),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects eval cases with a non-canonical mission mode", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-mode-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    await writeFile(
      catalogPath,
      JSON.stringify({
        version: 1,
        cases: [
          {
            id: "bad-mode",
            prompt: "test",
            expected: { mission_mode: "review" },
          },
        ],
      }),
      "utf8",
    );

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "invalid-mode"),
      JSON.stringify(report, null, 2),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a goal eval that weakens deep persistence", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-goal-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    await writeFile(
      catalogPath,
      JSON.stringify({
        version: 1,
        cases: [
          {
            id: "weak-goal",
            prompt: "keep improving",
            expected: {
              mission_mode: "goal",
              persistence: {
                enabled: true,
                minimum_valid_loops: 5,
                hard_maximum: 10,
              },
            },
          },
        ],
      }),
      "utf8",
    );

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "invalid-deep-persistence"),
      JSON.stringify(report, null, 2),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a catalog that omits a supported agent host", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-host-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    await writeFile(
      catalogPath,
      JSON.stringify({
        version: 1,
        target_hosts: ["generic-agent-skills", "codex", "claude-code"],
        cases: [
          {
            id: "host-coverage",
            prompt: "test",
            expected: {
              mission_mode: "change",
              persistence: { enabled: false },
            },
          },
        ],
      }),
      "utf8",
    );

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "missing-host-coverage"),
      JSON.stringify(report, null, 2),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects inversion of small and substantial persistence routing", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-routing-test-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    const catalog = JSON.parse(
      await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
    );
    const small = catalog.cases.find(({ id }) => id === "small-scoped-change");
    small.expected.persistence = {
      enabled: true,
      minimum_valid_loops: 10,
      hard_maximum: null,
      loop_10_verdicts: ["continue", "ask", "stop"],
      backlog_policy: "dynamic-evidence-only",
    };
    small.expected.required_capabilities = [
      "artifact-inspection",
      "execution-or-proof",
    ];

    const substantial = catalog.cases.find(
      ({ id }) => id === "substantial-unbounded-quality-mission",
    );
    substantial.expected.persistence = { enabled: false };

    await writeFile(catalogPath, JSON.stringify(catalog), "utf8");
    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    const violations = report.violations.filter(
      ({ code }) => code === "invalid-persistence-routing",
    );
    assert.equal(violations.length, 2, JSON.stringify(report, null, 2));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects inversion of small, VFX, and audio council routing", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-council-routing-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    const catalog = JSON.parse(
      await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
    );
    const small = catalog.cases.find(({ id }) => id === "small-scoped-change");
    small.expected.council = {
      enabled: true,
      trigger: "explicit-or-multiple-material-lenses",
      minimum_lenses: 2,
      maximum_lenses: 4,
      context_specialist_required: true,
      context_specialist: "configuration-maintainer",
      conflict_policy: "evidence-only-no-forced-disagreement",
      convergence: "one-decision-and-next-artifact-move",
      independence: "disclose-internal-vs-independent",
    };

    const vfx = catalog.cases.find(
      ({ id }) => id === "context-adaptive-vfx-council",
    );
    vfx.expected.council = { enabled: false };
    const audio = catalog.cases.find(
      ({ id }) => id === "context-adaptive-audio-pressure",
    );
    audio.expected.council = { enabled: false };

    await writeFile(catalogPath, JSON.stringify(catalog), "utf8");
    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    const violations = report.violations.filter(
      ({ code }) => code === "invalid-council-routing",
    );
    assert.equal(violations.length, 3, JSON.stringify(report, null, 2));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a weak or misleading context-adaptive council contract", async () => {
  const mutations = [
    ["too-few-lenses", (expected) => { expected.council.minimum_lenses = 1; }],
    ["too-many-lenses", (expected) => { expected.council.maximum_lenses = 5; }],
    ["optional-specialist", (expected) => {
      expected.council.context_specialist_required = false;
    }],
    ["generic-specialist", (expected) => {
      expected.council.context_specialist = "generic-domain-reviewer";
    }],
    ["forced-conflict", (expected) => {
      expected.council.conflict_policy = "forced-disagreement";
    }],
    ["no-convergence", (expected) => {
      expected.council.convergence = "return-an-options-menu";
    }],
    ["laundered-independence", (expected) => {
      expected.council.independence = "internal-lenses-count-as-independent";
    }],
    ["missing-pressure-reference", (expected) => {
      expected.required_references = expected.required_references.filter(
        (reference) => reference !== "pressure.md",
      );
    }],
    ["missing-safeguards", (expected) => {
      expected.forbidden_actions = expected.forbidden_actions.filter(
        (action) => ![
          "generic-domain-reviewer",
          "forced-disagreement",
          "invented-professional-credentials",
          "invented-independent-review",
        ].includes(action),
      );
    }],
  ];

  for (const [name, mutate] of mutations) {
    const root = await mkdtemp(path.join(tmpdir(), `quality-evals-council-${name}-`));
    const catalogPath = path.join(root, "cases.json");
    try {
      const catalog = JSON.parse(
        await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
      );
      const expected = catalog.cases.find(
        ({ id }) => id === "context-adaptive-vfx-council",
      ).expected;
      mutate(expected);
      await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

      const result = runValidator(catalogPath);
      assert.equal(result.status, 1, `${name}: ${result.stderr}`);
      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "invalid-council-contract"),
        `${name}: ${JSON.stringify(report, null, 2)}`,
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }
});

test("rejects substitution of the inferred professional audio specialist", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-audio-specialist-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    const catalog = JSON.parse(
      await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
    );
    const audio = catalog.cases.find(
      ({ id }) => id === "context-adaptive-audio-pressure",
    );
    audio.expected.council.context_specialist = "professional-vfx-artist";
    await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "invalid-council-contract"),
      JSON.stringify(report, null, 2),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects weakened Codex model routing", async () => {
  const mutations = [
    ["missing-labels", (expected) => {
      expected.orchestration.plan_model_labels_required = false;
    }],
    ["wrong-judgment-model", (expected) => {
      expected.orchestration.judgment_model = "gpt-5.6-luna";
    }],
    ["lowered-judgment-effort", (expected) => {
      expected.orchestration.judgment_reasoning = "high";
    }],
    ["weak-execution-effort", (expected) => {
      expected.orchestration.execution_reasoning = "low";
    }],
    ["missing-handoff", (expected) => {
      delete expected.orchestration.handoff_contract;
    }],
    ["labels-without-dispatch", (expected) => {
      expected.orchestration.routing_enforcement = "plan-label-only";
    }],
    ["missing-reference", (expected) => {
      expected.required_references = expected.required_references.filter(
        (reference) => reference !== "orchestration.md",
      );
    }],
  ];

  for (const [name, mutate] of mutations) {
    const root = await mkdtemp(path.join(tmpdir(), `quality-evals-routing-${name}-`));
    const catalogPath = path.join(root, "cases.json");
    try {
      const catalog = JSON.parse(
        await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
      );
      const expected = catalog.cases.find(
        ({ id }) => id === "codex-model-routed-plan",
      ).expected;
      mutate(expected);
      await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

      const result = runValidator(catalogPath);
      assert.equal(result.status, 1, `${name}: ${result.stderr}`);
      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(
          ({ code }) => code === "invalid-orchestration-contract",
        ),
        `${name}: ${JSON.stringify(report, null, 2)}`,
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }
});

test("rejects weakened Luna-to-Sol audit and deferred verification routing", async () => {
  const mutations = [
    ["missing-sol-audit", (expected) => {
      expected.orchestration.execution_audit = "luna-self-acceptance";
    }],
    ["invalid-audit-verdict", (expected) => {
      expected.orchestration.execution_audit_verdict = "accept-only";
    }],
    ["verbose-communication", (expected) => {
      expected.orchestration.execution_communication = "verbose-plan";
    }],
    ["broad-task-verification", (expected) => {
      expected.orchestration.task_local_verification = "full-suite-per-task";
    }],
    ["broad-interim-typecheck", (expected) => {
      expected.orchestration.interim_typecheck = "whole-project-typecheck";
    }],
    ["early-full-verification", (expected) => {
      expected.orchestration.full_verification_trigger = "every-task";
    }],
    ["wrong-full-suite", (expected) => {
      expected.orchestration.full_verification_suite = "tests-build-typecheck-per-task";
    }],
  ];

  for (const [name, mutate] of mutations) {
    const root = await mkdtemp(path.join(tmpdir(), `quality-evals-audit-${name}-`));
    const catalogPath = path.join(root, "cases.json");
    try {
      const catalog = JSON.parse(
        await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
      );
      const expected = catalog.cases.find(
        ({ id }) => id === "codex-model-routed-plan",
      ).expected;
      mutate(expected);
      await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

      const result = runValidator(catalogPath);
      assert.equal(result.status, 1, `${name}: ${result.stderr}`);
      const report = JSON.parse(result.stdout);
      const violation = report.violations.find(
        ({ code }) => code === "invalid-orchestration-contract",
      );
      assert.ok(violation, `${name}: ${JSON.stringify(report, null, 2)}`);
      assert.match(violation.message, /expected/);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }
});

test("rejects weakened Creative Search contracts", async () => {
  const mutations = [
    ["trigger", (creative) => { creative.creative_trigger = "always"; }],
    ["direction-count", (creative) => { creative.direction_count = "two"; }],
    ["direction-distance", (creative) => { creative.direction_distance = "cosmetic-only"; }],
    ["representative-artifact", (creative) => { creative.prototype_policy = "placeholder-ok"; }],
    ["selection", (creative) => { creative.selection_basis = "preference-only"; }],
    ["hybrid", (creative) => { creative.hybrid_policy = "default-hybrid"; }],
    ["signature", (creative) => { creative.signature_move = "many-memorable-moves"; }],
    ["subtraction", (creative) => { creative.subtraction_move = "add-more-elements"; }],
    ["blind-read", (creative) => { creative.blind_audience_read = "brief-visible-read"; }],
    ["blind-fields", (creative) => { creative.blind_read_fields = "understood-only"; }],
  ];

  for (const [name, mutate] of mutations) {
    const root = await mkdtemp(path.join(tmpdir(), `quality-evals-creative-${name}-`));
    const catalogPath = path.join(root, "cases.json");
    try {
      const catalog = JSON.parse(
        await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
      );
      const expected = catalog.cases.find(
        ({ id }) => id === "creative-search-standout",
      ).expected;
      mutate(expected.creative_search);
      await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

      const result = runValidator(catalogPath);
      assert.equal(result.status, 1, `${name}: ${result.stderr}`);
      const report = JSON.parse(result.stdout);
      const violation = report.violations.find(
        ({ code }) => code === "invalid-creative-contract",
      );
      assert.ok(violation, `${name}: ${JSON.stringify(report, null, 2)}`);
      assert.match(violation.message, /expected/);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }
});

test("rejects inversion of Creative Search routing", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-evals-creative-routing-"));
  const catalogPath = path.join(root, "cases.json");
  try {
    const catalog = JSON.parse(
      await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
    );
    catalog.cases.find(({ id }) => id === "creative-search-standout").expected.creative_search.enabled = false;
    catalog.cases.find(({ id }) => id === "small-scoped-change").expected.creative_search.enabled = true;
    catalog.cases.find(({ id }) => id === "routine-conformance").expected.creative_search.enabled = true;
    await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

    const result = runValidator(catalogPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(
      report.violations.filter(({ code }) => code === "invalid-creative-routing").length,
      3,
      JSON.stringify(report, null, 2),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("repository eval catalog covers the approved behavioral matrix", async () => {
  const catalogPath = path.join(repoRoot, "evals", "cases.json");
  const result = runValidator(catalogPath);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
  assert.ok(catalog.cases.length >= 10);
  assert.deepEqual(
    new Set(catalog.target_hosts),
    new Set(["generic-agent-skills", "codex", "claude-code", "opencode"]),
  );

  const ids = new Set(catalog.cases.map(({ id }) => id));
  for (const id of [
    "small-scoped-change",
    "behavior-preserving-refactor",
    "read-only-audit",
    "desktop-only-ui",
    "docs-only-change",
    "substantial-unbounded-quality-mission",
    "deep-goal-mission",
    "limited-visual-evidence",
    "recovery-after-rejection",
    "architecture-boundary",
    "delegation-unavailable",
     "proof-blocked",
     "codex-model-routed-plan",
     "creative-search-standout",
     "routine-conformance",
  ]) {
    assert.ok(ids.has(id), `missing eval case: ${id}`);
  }

  const modes = new Set(catalog.cases.map(({ expected }) => expected.mission_mode));
  assert.deepEqual(
    modes,
    new Set(["change", "diagnose", "audit", "recovery", "goal"]),
  );

  const deep = catalog.cases.find(({ id }) => id === "deep-goal-mission");
  assert.equal(deep.expected.persistence.enabled, true);
  assert.equal(deep.expected.persistence.minimum_valid_loops, 10);
  assert.equal(deep.expected.persistence.hard_maximum, null);
  assert.ok(deep.expected.required_capabilities.includes("durable-continuation"));
  assert.doesNotMatch(deep.prompt, /\/goal|\$quality-obsessed/);

  const unbounded = catalog.cases.find(
    ({ id }) => id === "substantial-unbounded-quality-mission",
  );
  assert.equal(unbounded.expected.mission_mode, "change");
  assert.equal(unbounded.expected.persistence.enabled, true);
  assert.equal(unbounded.expected.persistence.minimum_valid_loops, 10);
  assert.equal(unbounded.expected.persistence.hard_maximum, null);
  assert.deepEqual(
    unbounded.expected.persistence.loop_10_verdicts,
    ["continue", "ask", "stop"],
  );
  assert.equal(
    unbounded.expected.persistence.backlog_policy,
    "dynamic-evidence-only",
  );
  assert.ok(
    unbounded.expected.required_capabilities.includes("artifact-inspection"),
  );
  assert.ok(
    unbounded.expected.required_capabilities.includes("execution-or-proof"),
  );
  assert.ok(
    !unbounded.expected.required_capabilities.includes("durable-continuation"),
  );
  assert.ok(unbounded.expected.required_references.includes("persistence.md"));
  assert.ok(unbounded.expected.required_references.includes("pressure.md"));
  assert.ok(unbounded.expected.required_gates.includes("adversarial-autopsy"));

  const small = catalog.cases.find(({ id }) => id === "small-scoped-change");
  assert.equal(small.expected.persistence.enabled, false);
  assert.equal(small.expected.creative_search.enabled, false);

  const recovery = catalog.cases.find(
    ({ id }) => id === "recovery-after-rejection",
  );
  assert.equal(recovery.expected.persistence.enabled, true);
  assert.equal(recovery.expected.persistence.minimum_valid_loops, 10);
  assert.equal(recovery.expected.persistence.hard_maximum, null);
  assert.ok(recovery.expected.required_references.includes("persistence.md"));
  assert.ok(recovery.expected.required_references.includes("pressure.md"));
  assert.ok(recovery.expected.required_gates.includes("adversarial-autopsy"));

  const audit = catalog.cases.find(({ id }) => id === "read-only-audit");
  assert.ok(audit.expected.forbidden_actions.includes("target-write"));
  assert.equal(audit.expected.task_state, "completed");
  assert.ok(audit.expected.required_references.includes("pressure.md"));
  assert.ok(audit.expected.required_gates.includes("adversarial-autopsy"));

  const limited = catalog.cases.find(({ id }) => id === "limited-visual-evidence");
  assert.equal(limited.expected.verification_state, "limited");

  for (const item of catalog.cases) {
    assert.ok(["completed", "blocked"].includes(item.expected.task_state));
    assert.ok(
      ["win", "tie", "loss", "not-assessed"].includes(
        item.expected.artifact_verdict,
      ),
    );
    assert.ok(
      ["verified", "limited", "unverified"].includes(
        item.expected.verification_state,
      ),
    );
    for (const field of [
      "required_gates",
      "conditional_gates",
      "na_gates",
      "blocked_gates",
    ]) {
      assert.ok(Array.isArray(item.expected[field]), `${item.id}: ${field}`);
    }
  }

  assert.ok(
    catalog.cases.some(({ expected }) => expected.task_state === "blocked"),
  );
  assert.ok(
    catalog.cases.some(
      ({ expected }) => expected.artifact_verdict === "not-assessed",
    ),
  );
  assert.ok(
    catalog.cases.some(
      ({ expected }) => expected.verification_state === "unverified",
    ),
  );
  assert.ok(
    catalog.cases.some(({ expected }) => expected.conditional_gates.length > 0),
  );
});

test("repository eval catalog covers resumable vertical multi-slice migrations", async () => {
  const catalog = JSON.parse(
    await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
  );
  const item = catalog.cases.find(({ id }) => id === "multi-slice-migration");
  assert.ok(item, "missing eval case: multi-slice-migration");
  assert.ok(item.expected.required_capabilities.includes("durable-task-state"));
  assert.ok(item.expected.required_references.includes("scope-and-autonomy.md"));
  assert.ok(item.expected.required_references.includes("persistence.md"));
  assert.ok(item.expected.forbidden_actions.includes("premature-contract"));
});

test("repository eval catalog covers an authorized standout ambition leap", async () => {
  const catalog = JSON.parse(
    await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
  );
  const item = catalog.cases.find(({ id }) => id === "standout-ambition-leap");
  assert.ok(item, "missing eval case: standout-ambition-leap");
  assert.equal(item.expected.persistence.enabled, true);
  assert.equal(item.expected.persistence.minimum_valid_loops, 10);
  assert.equal(item.expected.persistence.hard_maximum, null);
  assert.ok(item.expected.required_references.includes("persistence.md"));
  assert.ok(item.expected.required_references.includes("pressure.md"));
  assert.ok(item.expected.required_gates.includes("adversarial-autopsy"));
  assert.ok(item.expected.forbidden_actions.includes("literal-only-solution"));
  assert.ok(item.expected.forbidden_actions.includes("authority-expansion"));
});

test("repository eval catalog holds implementation during an explicit grill", async () => {
  const catalog = JSON.parse(
    await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
  );
  const item = catalog.cases.find(({ id }) => id === "grill-before-implementation");
  assert.ok(item, "missing eval case: grill-before-implementation");
  assert.equal(item.expected.task_state, "blocked");
  assert.ok(item.expected.required_references.includes("pressure.md"));
  assert.ok(item.expected.blocked_gates.includes("acceptance"));
  assert.ok(item.expected.forbidden_actions.includes("target-write-before-decision"));
});

test("repository eval catalog routes a VFX request through a context-adaptive council", async () => {
  const catalog = JSON.parse(
    await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
  );
  const item = catalog.cases.find(
    ({ id }) => id === "context-adaptive-vfx-council",
  );
  assert.ok(item, "missing eval case: context-adaptive-vfx-council");
  assert.doesNotMatch(item.prompt, /VFX Artist|Technical Director/i);
  assert.equal(item.expected.council.enabled, true);
  assert.equal(
    item.expected.council.trigger,
    "explicit-or-multiple-material-lenses",
  );
  assert.equal(item.expected.council.minimum_lenses, 2);
  assert.equal(item.expected.council.maximum_lenses, 4);
  assert.equal(item.expected.council.context_specialist_required, true);
  assert.equal(
    item.expected.council.context_specialist,
    "professional-vfx-artist-or-technical-director",
  );
  assert.equal(
    item.expected.council.conflict_policy,
    "evidence-only-no-forced-disagreement",
  );
  assert.equal(
    item.expected.council.convergence,
    "one-decision-and-next-artifact-move",
  );
  assert.equal(
    item.expected.council.independence,
    "disclose-internal-vs-independent",
  );
  assert.ok(item.expected.required_references.includes("pressure.md"));
  assert.ok(item.expected.forbidden_actions.includes("generic-domain-reviewer"));
  assert.ok(item.expected.forbidden_actions.includes("forced-disagreement"));
  assert.ok(item.expected.forbidden_actions.includes("invented-professional-credentials"));

  const small = catalog.cases.find(({ id }) => id === "small-scoped-change");
  assert.equal(small.expected.council.enabled, false);
});

test("repository eval catalog infers Council pressure across a second professional domain", async () => {
  const catalog = JSON.parse(
    await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
  );
  const item = catalog.cases.find(
    ({ id }) => id === "context-adaptive-audio-pressure",
  );
  assert.ok(item, "missing eval case: context-adaptive-audio-pressure");
  assert.doesNotMatch(item.prompt, /council|mastering engineer/i);
  assert.equal(item.expected.council.enabled, true);
  assert.equal(
    item.expected.council.trigger,
    "explicit-or-multiple-material-lenses",
  );
  assert.equal(item.expected.council.context_specialist_required, true);
  assert.equal(
    item.expected.council.context_specialist,
    "professional-mastering-engineer",
  );
  assert.equal(
    item.expected.council.conflict_policy,
    "evidence-only-no-forced-disagreement",
  );
  assert.equal(
    item.expected.council.convergence,
    "one-decision-and-next-artifact-move",
  );
  assert.ok(item.expected.required_references.includes("pressure.md"));
  assert.ok(item.expected.forbidden_actions.includes("generic-domain-reviewer"));
});

test("repository eval catalog routes Codex judgment and execution models", async () => {
  const catalog = JSON.parse(
    await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
  );
  const item = catalog.cases.find(
    ({ id }) => id === "codex-model-routed-plan",
  );
  assert.ok(item, "missing eval case: codex-model-routed-plan");
  assert.equal(item.expected.orchestration.plan_model_labels_required, true);
  assert.equal(item.expected.orchestration.judgment_model, "gpt-5.6-sol");
  assert.equal(item.expected.orchestration.judgment_reasoning, "xhigh");
  assert.equal(item.expected.orchestration.execution_model, "gpt-5.6-luna");
  assert.equal(item.expected.orchestration.execution_reasoning, "max");
  assert.equal(
    item.expected.orchestration.execution_communication,
    "caveman-action-first-minimal-talk",
  );
  assert.equal(
    item.expected.orchestration.execution_audit,
    "sol-xhigh-required-before-acceptance",
  );
  assert.equal(
    item.expected.orchestration.execution_audit_verdict,
    "accept | repair | reset",
  );
  assert.equal(
    item.expected.orchestration.task_local_verification,
    "focused-tests-and-current-file-checks-only",
  );
  assert.equal(
    item.expected.orchestration.interim_typecheck,
    "current-edited-file-only-or-skip",
  );
  assert.equal(
    item.expected.orchestration.full_verification_trigger,
    "multiple-sol-accepted-tasks-or-final-batch",
  );
  assert.equal(
    item.expected.orchestration.full_verification_suite,
    "tests-build-typecheck-once-per-batch",
  );
  assert.equal(
    item.expected.orchestration.handoff_contract,
    "deliverable-dependencies-surface-proof-return",
  );
  assert.equal(
    item.expected.orchestration.routing_enforcement,
    "plan-label-and-actual-dispatch",
  );
  assert.ok(item.expected.required_references.includes("orchestration.md"));
  assert.ok(item.expected.required_capabilities.includes("model-routing"));
  for (const action of [
    "unaudited-luna-acceptance",
    "verbose-luna-planning",
    "per-task-full-suite/build/typecheck",
  ]) {
    assert.ok(item.expected.forbidden_actions.includes(action), action);
  }
});

test("repository eval catalog routes Creative Search only for standout direction risk", async () => {
  const catalog = JSON.parse(
    await readFile(path.join(repoRoot, "evals", "cases.json"), "utf8"),
  );
  const creative = catalog.cases.find(({ id }) => id === "creative-search-standout");
  assert.ok(creative, "missing eval case: creative-search-standout");
  assert.equal(creative.expected.creative_search.enabled, true);
  assert.equal(creative.expected.creative_search.direction_count, "three-materially-distinct");
  assert.ok(creative.expected.required_references.includes("creative-search.md"));
  for (const action of [
    "cosmetic-variants",
    "default-hybrid",
    "brief-leaked-blind-read",
    "signature-without-user-value",
    "additive-only-creativity",
  ]) {
    assert.ok(creative.expected.forbidden_actions.includes(action), action);
  }

  const routine = catalog.cases.find(({ id }) => id === "routine-conformance");
  assert.ok(routine, "missing eval case: routine-conformance");
  assert.equal(routine.expected.creative_search.enabled, false);
});
