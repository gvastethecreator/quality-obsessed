import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");

test("README documents portable Agent Skills usage across supported hosts", async () => {
  const readme = await readFile(path.join(repoRoot, "README.md"), "utf8");
  for (const text of [
    "Agent Skills",
    "Codex",
    "Claude Code",
    "OpenCode",
    ".agents/skills",
    "~/.agents/skills/quality-obsessed",
    ".claude/skills",
    ".opencode/skills",
    "npm run check",
    "npm run smoke:discovery",
    "npx skills@1.5.15 add",
    "compare-skill-copy.mjs",
    "task_state: `completed | blocked`",
    "artifact_verdict: `win | tie | loss | not-assessed`",
    "verification_state: `verified | limited | unverified`",
    "https://developers.openai.com/codex/skills",
  ]) {
    assert.match(readme, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(readme, /~\/\.codex\/skills/);
  assert.match(readme, /clean relocation sandbox/i);
});

test("all repository Markdown links resolve locally", async () => {
  const markdownFiles = [
    path.join(repoRoot, "README.md"),
    path.join(repoRoot, "SKILLS", "README.md"),
    path.join(repoRoot, "SKILLS", "quality-obsessed", "SKILL.md"),
  ];

  for (const file of markdownFiles) {
    const content = await readFile(file, "utf8");
    const links = [...content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)]
      .map((match) => match[1].trim().replace(/^<|>$/g, ""))
      .filter((link) => !/^(?:https?:|mailto:|#)/i.test(link));
    for (const link of links) {
      const target = path.resolve(
        path.dirname(file),
        link.split("#", 1)[0].split("?", 1)[0],
      );
      await assert.doesNotReject(access(target), `${file} -> ${link}`);
    }
  }
});

test("public guidance preserves substantial unbounded persistence without conflating goals", async () => {
  const readme = await readFile(path.join(repoRoot, "README.md"), "utf8");
  const skill = await readFile(
    path.join(repoRoot, "SKILLS", "quality-obsessed", "SKILL.md"),
    "utf8",
  );
  const examples = await readFile(
    path.join(
      repoRoot,
      "SKILLS",
      "quality-obsessed",
      "references",
      "examples.md",
    ),
    "utf8",
  );

  assert.match(readme, /substantial, broad, or quality-sensitive/i);
  assert.doesNotMatch(readme, /deep persistence activates only/i);
  assert.match(skill, /substantial, broad, or quality-sensitive/i);
  assert.match(skill, /no budget, time limit, or loop count/i);
  assert.match(examples, /substantial unbounded mission/i);
  assert.match(examples, /does not require a durable goal/i);
});

test("public discovery and examples explain the context-adaptive Council", async () => {
  const readme = await readFile(path.join(repoRoot, "README.md"), "utf8");
  const skill = await readFile(
    path.join(repoRoot, "SKILLS", "quality-obsessed", "SKILL.md"),
    "utf8",
  );
  const examples = await readFile(
    path.join(repoRoot, "SKILLS", "quality-obsessed", "references", "examples.md"),
    "utf8",
  );
  const metadata = await readFile(
    path.join(repoRoot, "SKILLS", "quality-obsessed", "agents", "openai.yaml"),
    "utf8",
  );

  assert.match(skill, /^description:.*context-adaptive quality councils/im);
  assert.match(skill, /2-4 non-overlapping lenses/i);
  assert.match(readme, /context-adaptive Council/i);
  assert.match(readme, /Professional VFX Artist \/ Technical Director/i);
  assert.match(readme, /Professional Mastering Engineer/i);
  assert.match(examples, /Professional VFX Artist \/ Technical Director/i);
  assert.match(examples, /internal self-review, not independent review/i);
  assert.match(metadata, /context-adaptive councils/i);
});

test("evidence matrix defines the mandatory adversarial autopsy gate", async () => {
  const evidence = await readFile(
    path.join(
      repoRoot,
      "SKILLS",
      "quality-obsessed",
      "references",
      "evidence.md",
    ),
    "utf8",
  );

  const row = evidence
    .split(/\r?\n/)
    .find((line) => line.startsWith("| Adversarial autopsy |"));
  assert.ok(row, "missing Adversarial autopsy gate row");
  for (const term of ["location", "harm", "cause", "cut/fix", "proof", "severity"]) {
    assert.match(row, new RegExp(term, "i"));
  }
});
