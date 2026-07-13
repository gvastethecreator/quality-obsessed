import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const validator = path.join(repoRoot, "scripts", "validate-skill.mjs");

async function withFixture(files, run) {
  const root = await mkdtemp(path.join(tmpdir(), "quality-obsessed-test-"));
  try {
    for (const [relativePath, content] of Object.entries(files)) {
      const target = path.join(root, relativePath);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, content, "utf8");
    }
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function withRepositorySkillCopy(run) {
  const root = await mkdtemp(path.join(tmpdir(), "quality-obsessed-copy-test-"));
  const skillPath = path.join(root, "quality-obsessed");
  try {
    await cp(path.join(repoRoot, "SKILLS", "quality-obsessed"), skillPath, {
      recursive: true,
    });
    await run(skillPath);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

function runValidator(skillPath) {
  return spawnSync(process.execPath, [validator, "--json", skillPath], {
    cwd: repoRoot,
    encoding: "utf8",
  });
}

test("rejects an installed skill package without its MIT license", async () => {
  await withFixture(
    {
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
      ].join("\n"),
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.equal(report.ok, false);
      assert.ok(
        report.violations.some(({ code }) => code === "package-license"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects a package without Codex interface metadata", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
      ].join("\n"),
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "agent-metadata"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects legacy final-status aliases outside the canonical protocol", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": [
        "interface:",
        '  display_name: "Quality Obsessed"',
        '  short_description: "Evidence-gated quality missions"',
        '  default_prompt: "Use $quality-obsessed to improve this artifact."',
      ].join("\n"),
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
        "",
        "Read `references/protocol.md`.",
      ].join("\n"),
      "references/protocol.md": [
        "# Protocol",
        "",
        "Final artifact verdict: `win | tie | loss | not-assessed`.",
      ].join("\n"),
      "references/legacy.md": "Finish with `quality wins` when it looks good.\n",
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "legacy-status"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects runtime README files that duplicate skill routing", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": "interface:\n  display_name: \"Quality Obsessed\"\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
      ].join("\n"),
      "references/README.md": "# Duplicate reference index\n",
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "runtime-readme"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects a protocol without canonical state axes and scope precedence", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": "interface:\n  display_name: \"Quality Obsessed\"\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
        "",
        "Read `references/protocol.md`.",
      ].join("\n"),
      "references/protocol.md": [
        "# Protocol",
        "",
        "Modes: change, diagnose, audit, recovery, goal.",
      ].join("\n"),
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "protocol-contract"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects broken local Markdown references", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": "interface:\n  display_name: \"Quality Obsessed\"\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
        "",
        "Read [Protocol](references/protocol.md).",
        "Read [Missing](references/missing.md).",
      ].join("\n"),
      "references/protocol.md": "# Protocol\\n\\nmission_mode: change | diagnose | audit | recovery | goal\\ntask_state: completed | blocked\\nartifact_verdict: win | tie | loss | not-assessed\\nverification_state: verified | limited | unverified\\nloop_verdict: better | mixed | flat | worse\\nseverity: blocker | P1 | P2 | P3\\ngate_state: passed | failed | blocked | N/A\\nscope_rule: explicit-user-boundaries-win\\n",
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "broken-reference"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects vendor-only frontmatter fields from the portable core", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": "interface:\n  display_name: \"Quality Obsessed\"\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "disable-model-invocation: true",
        "---",
        "",
        "# Quality Obsessed",
      ].join("\n"),
      "references/protocol.md": "# Protocol\\n\\nmission_mode: change | diagnose | audit | recovery | goal\\ntask_state: completed | blocked\\nartifact_verdict: win | tie | loss | not-assessed\\nverification_state: verified | limited | unverified\\nloop_verdict: better | mixed | flat | worse\\nseverity: blocker | P1 | P2 | P3\\ngate_state: passed | failed | blocked | N/A\\nscope_rule: explicit-user-boundaries-win\\n",
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "frontmatter"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("accepts every portable Agent Skills frontmatter field", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const skillFile = path.join(skillPath, "SKILL.md");
    const content = await readFile(skillFile, "utf8");
    await writeFile(
      skillFile,
      content.replace(
        "license: MIT",
        [
          "license: MIT",
          "compatibility: Requires a host that can load Agent Skills.",
          "metadata:",
          '  quality-obsessed.test: "portable"',
          'allowed-tools: "Read Grep"',
        ].join("\n"),
      ),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  });
});

test("rejects a skill name that violates the open specification", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const skillFile = path.join(skillPath, "SKILL.md");
    const content = await readFile(skillFile, "utf8");
    await writeFile(
      skillFile,
      content.replace("name: quality-obsessed", "name: Quality--Obsessed"),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "frontmatter-name"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects malformed or empty skill descriptions", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const skillFile = path.join(skillPath, "SKILL.md");
    const content = await readFile(skillFile, "utf8");
    await writeFile(
      skillFile,
      content.replace(/^description:.*$/m, "description: [unterminated"),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "frontmatter-yaml"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a package whose bundled license is not MIT", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    await writeFile(path.join(skillPath, "LICENSE"), "not a license\n", "utf8");

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "package-license"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects empty Codex interface metadata", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    await writeFile(path.join(skillPath, "agents", "openai.yaml"), "", "utf8");

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "agent-metadata"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects Codex metadata fields under the wrong YAML section", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    await writeFile(
      path.join(skillPath, "agents", "openai.yaml"),
      [
        "interface: {}",
        "wrong_section:",
        '  display_name: "Quality Obsessed"',
        '  short_description: "Evidence-gated quality missions"',
        '  default_prompt: "Use $quality-obsessed."',
      ].join("\n"),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "agent-metadata"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects blank Codex metadata and a prompt that omits the skill", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    await writeFile(
      path.join(skillPath, "agents", "openai.yaml"),
      [
        "interface:",
        '  display_name: " "',
        '  short_description: " "',
        '  default_prompt: "Improve this artifact."',
      ].join("\n"),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "agent-metadata"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects canonical enum redefinitions outside protocol.md", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    await writeFile(
      path.join(skillPath, "references", "drift.md"),
      "# Drift\n\ntask_state: done | paused\nseverity: critical | low\n",
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "protocol-redefinition"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects indented protocol and persistence drift in other references", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    await writeFile(
      path.join(skillPath, "references", "drift.md"),
      [
        "# Drift",
        "",
        " task_state: done | paused",
        "   mutation_stop: stop-whenever",
        " minimum_valid_loops: 5",
        "   hard_maximum: 10",
      ].join("\n"),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "protocol-redefinition"),
      JSON.stringify(report, null, 2),
    );
    assert.ok(
      report.violations.some(({ code }) => code === "persistence-redefinition"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("reports YAML alias expansion attacks as structured violations", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const skillFile = path.join(skillPath, "SKILL.md");
    const content = await readFile(skillFile, "utf8");
    const aliases = Array(101).fill("*base").join(", ");
    await writeFile(
      skillFile,
      content.replace(
        "license: MIT",
        `license: MIT\nmetadata:\n  base: &base value\n  expansion: [${aliases}]`,
      ),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "frontmatter-yaml"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects duplicate or contradictory keys inside protocol.md", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const protocolPath = path.join(skillPath, "references", "protocol.md");
    const protocol = await readFile(protocolPath, "utf8");
    await writeFile(
      protocolPath,
      `${protocol}\n\ntask_state: done | paused\nmutation_stop: stop-whenever\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "protocol-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a SKILL.md that exceeds the runtime context budget", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": "interface:\n  display_name: \"Quality Obsessed\"\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
        "",
        "word ".repeat(1_201),
      ].join("\n"),
      "references/protocol.md": "# Protocol\\n\\nmission_mode: change | diagnose | audit | recovery | goal\\ntask_state: completed | blocked\\nartifact_verdict: win | tie | loss | not-assessed\\nverification_state: verified | limited | unverified\\nloop_verdict: better | mixed | flat | worse\\nseverity: blocker | P1 | P2 | P3\\ngate_state: passed | failed | blocked | N/A\\nscope_rule: explicit-user-boundaries-win\\n",
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "skill-context-budget"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects vendor-specific commands in runtime Markdown", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": "interface:\n  display_name: \"Quality Obsessed\"\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "license: MIT",
        "---",
        "",
        "# Quality Obsessed",
        "",
        "In Codex, always start the /goal command for persistence.",
      ].join("\n"),
      "references/protocol.md": "# Protocol\\n\\nmission_mode: change | diagnose | audit | recovery | goal\\ntask_state: completed | blocked\\nartifact_verdict: win | tie | loss | not-assessed\\nverification_state: verified | limited | unverified\\nloop_verdict: better | mixed | flat | worse\\nseverity: blocker | P1 | P2 | P3\\ngate_state: passed | failed | blocked | N/A\\nscope_rule: explicit-user-boundaries-win\\n",
      "references/persistence.md": "# Persistence\\n\\nminimum_valid_loops: 10\\nhard_maximum: none\\nloop_10_verdict: continue | ask | stop\\nbacklog_policy: dynamic-evidence-only\\ndefault_activation: substantial-unbounded-quality-mission\\ngoal_activation: explicit-user-request\\n",
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "vendor-runtime-coupling"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects long references without an early contents index", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": "interface:\n  display_name: \"Quality Obsessed\"\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
        "",
        "Read [Protocol](references/protocol.md).",
        "Read [Long](references/long.md).",
      ].join("\n"),
      "references/protocol.md": "# Protocol\\n\\nmission_mode: change | diagnose | audit | recovery | goal\\ntask_state: completed | blocked\\nartifact_verdict: win | tie | loss | not-assessed\\nverification_state: verified | limited | unverified\\nloop_verdict: better | mixed | flat | worse\\nseverity: blocker | P1 | P2 | P3\\ngate_state: passed | failed | blocked | N/A\\nscope_rule: explicit-user-boundaries-win\\n",
      "references/long.md": ["# Long Reference", ...Array(101).fill("detail")].join("\n"),
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "reference-toc"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects persistence policy that loses the deep 10-loop contract", async () => {
  await withFixture(
    {
      "LICENSE": "MIT License\n",
      "agents/openai.yaml": "interface:\n  display_name: \"Quality Obsessed\"\n",
      "SKILL.md": [
        "---",
        "name: quality-obsessed",
        'description: "Use for explicit quality missions."',
        "---",
        "",
        "# Quality Obsessed",
        "",
        "Read [Protocol](references/protocol.md).",
        "Read [Persistence](references/persistence.md).",
      ].join("\n"),
      "references/protocol.md": "# Protocol\\n\\nmission_mode: change | diagnose | audit | recovery | goal\\ntask_state: completed | blocked\\nartifact_verdict: win | tie | loss | not-assessed\\nverification_state: verified | limited | unverified\\nloop_verdict: better | mixed | flat | worse\\nseverity: blocker | P1 | P2 | P3\\ngate_state: passed | failed | blocked | N/A\\nscope_rule: explicit-user-boundaries-win\\n",
      "references/persistence.md": "# Persistence\n\nKeep improving for a while.\n",
    },
    (skillPath) => {
      const result = runValidator(skillPath);
      assert.equal(result.status, 1, result.stderr);

      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "persistence-contract"),
        JSON.stringify(report, null, 2),
      );
    },
  );
});

test("rejects duplicate or contradictory deep-persistence keys", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const persistencePath = path.join(
      skillPath,
      "references",
      "persistence.md",
    );
    const persistence = await readFile(persistencePath, "utf8");
    await writeFile(
      persistencePath,
      `${persistence}\n\nminimum_valid_loops: 5\nhard_maximum: 10\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "persistence-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a weakened model-routing profile", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const orchestrationPath = path.join(
      skillPath,
      "references",
      "orchestration.md",
    );
    const orchestration = await readFile(orchestrationPath, "utf8");
    await writeFile(
      orchestrationPath,
      orchestration.replace("judgment_reasoning: xhigh", "judgment_reasoning: high"),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects model-routing keys outside their owner reference", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const examplesPath = path.join(skillPath, "references", "examples.md");
    const examples = await readFile(examplesPath, "utf8");
    await writeFile(
      examplesPath,
      `${examples}\n\nexecution_model: gpt-5.6-luna\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(
        ({ code }) => code === "semantic-parity-redefinition",
      ),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a weakened Creative Search owner contract", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(
      skillPath,
      "references",
      "creative-search.md",
    );
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      content.replace(
        "direction_count: three-materially-distinct",
        "direction_count: two",
      ),
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects Creative Search keys outside their owner reference", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const examplesPath = path.join(skillPath, "references", "examples.md");
    const examples = await readFile(examplesPath, "utf8");
    await writeFile(
      examplesPath,
      `${examples}\n\ndirection_count: three-materially-distinct\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(
        ({ code }) => code === "semantic-parity-redefinition",
      ),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects persistence policy that disables the substantial unbounded default", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const persistencePath = path.join(
      skillPath,
      "references",
      "persistence.md",
    );
    const persistence = await readFile(persistencePath, "utf8");
    await writeFile(
      persistencePath,
      `${persistence}\n\ndefault_activation: explicit-deep-only\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "persistence-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a package that loses vertical multi-slice execution", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(
      skillPath,
      "references",
      "scope-and-autonomy.md",
    );
    const contract = "multi_slice_execution: vertical-frontier-expand-contract";
    const content = await readFile(referencePath, "utf8");
    assert.ok(content.includes(contract), `missing fixture contract: ${contract}`);
    await writeFile(referencePath, content.replace(contract, ""), "utf8");

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a package that loses resumable durable task records", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(
      skillPath,
      "references",
      "persistence.md",
    );
    const contract = "durable_task_record: required-when-capable-and-resumable";
    const content = await readFile(referencePath, "utf8");
    assert.ok(content.includes(contract), `missing fixture contract: ${contract}`);
    await writeFile(referencePath, content.replace(contract, ""), "utf8");

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a package that loses explicit standout ambition leaps", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "pressure.md");
    const contract = "ambition_leap: explicit-standout-within-authority";
    const content = await readFile(referencePath, "utf8");
    assert.ok(content.includes(contract), `missing fixture contract: ${contract}`);
    await writeFile(referencePath, content.replace(contract, ""), "utf8");

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a package that loses the explicit preimplementation grilling hold", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "pressure.md");
    const contract = "grilling_hold: explicit-preimplementation-request";
    const content = await readFile(referencePath, "utf8");
    assert.ok(content.includes(contract), `missing fixture contract: ${contract}`);
    await writeFile(referencePath, content.replace(contract, ""), "utf8");

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a package that loses final independent-review disclosure", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "pressure.md");
    const contract = "review_disclosure: report-used-or-omitted";
    const content = await readFile(referencePath, "utf8");
    assert.ok(content.includes(contract), `missing fixture contract: ${contract}`);
    await writeFile(referencePath, content.replace(contract, ""), "utf8");

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a visual profile that permits mock-only or placeholder proof", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "visual-profile.md");
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      `${content}\n\nartifact_realism: mock-or-placeholder-ok\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects a code profile that loses automation operational safety", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "code-profile.md");
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      `${content}\n\nautomation_safety: happy-path-only\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects autonomy guidance that loses reusable research notes", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(
      skillPath,
      "references",
      "scope-and-autonomy.md",
    );
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      `${content}\n\ndurable_research_note: never\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects recovery guidance that can churn away from its hyperfocus", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "recovery.md");
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      `${content}\n\nrecovery_hyperfocus: optional\nrecovery_reset: flat-only\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects pressure guidance that loses repeated-mixed escalation", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "pressure.md");
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      `${content}\n\nreview_escalation: never-for-mixed\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects pressure guidance that loses the context-adaptive Council contract", async () => {
  const contracts = [
    "council_pass: explicit-or-multiple-material-lenses",
    "council_lenses: two-to-four-non-overlapping",
    "context_specialist: required-artifact-specific-professional-role",
    "council_conflict: evidence-only-no-forced-disagreement",
    "council_convergence: one-decision-and-next-artifact-move",
    "council_value: artifact-backlog-proof-scope-or-decision-change",
    "council_independence: internal-lenses-are-not-independent-review",
  ];
  for (const contract of contracts) {
    await withRepositorySkillCopy(async (skillPath) => {
      const referencePath = path.join(skillPath, "references", "pressure.md");
      const content = await readFile(referencePath, "utf8");
      assert.ok(content.includes(contract), `missing fixture contract: ${contract}`);
      await writeFile(referencePath, content.replace(contract, ""), "utf8");

      const result = runValidator(skillPath);
      assert.equal(result.status, 1, `${contract}: ${result.stderr}`);
      const report = JSON.parse(result.stdout);
      assert.ok(
        report.violations.some(({ code }) => code === "semantic-parity-contract"),
        `${contract}: ${JSON.stringify(report, null, 2)}`,
      );
    });
  }
});

test("rejects persistence that lets proof loops replace authorized artifact improvement", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "persistence.md");
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      `${content}\n\nartifact_balance: proof-only-is-enough\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects restored contract redefinitions in non-owner references", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "examples.md");
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      `${content}\n\nartifact_realism: mock-or-placeholder-ok\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(
        ({ code }) => code === "semantic-parity-redefinition",
      ),
      JSON.stringify(report, null, 2),
    );
  });
});

test("rejects pressure guidance that makes the final adversarial autopsy optional", async () => {
  await withRepositorySkillCopy(async (skillPath) => {
    const referencePath = path.join(skillPath, "references", "pressure.md");
    const content = await readFile(referencePath, "utf8");
    await writeFile(
      referencePath,
      `${content}\n\nadversarial_autopsy: optional\n`,
      "utf8",
    );

    const result = runValidator(skillPath);
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.ok(
      report.violations.some(({ code }) => code === "semantic-parity-contract"),
      JSON.stringify(report, null, 2),
    );
  });
});

test("the repository skill package satisfies the canonical contract", () => {
  const skillPath = path.join(repoRoot, "SKILLS", "quality-obsessed");
  const result = runValidator(skillPath);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true, JSON.stringify(report, null, 2));
  assert.deepEqual(report.violations, []);
});
