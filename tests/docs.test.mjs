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
  const persistence = await readFile(
    path.join(
      repoRoot,
      "SKILLS",
      "quality-obsessed",
      "references",
      "persistence.md",
    ),
    "utf8",
  );

  assert.match(readme, /substantial, broad, or quality-sensitive/i);
  assert.doesNotMatch(readme, /deep persistence activates only/i);
  assert.match(skill, /substantial, broad, or quality-sensitive/i);
  assert.match(skill, /no budget, time limit, or loop count/i);
  assert.match(examples, /substantial unbounded mission/i);
  assert.match(examples, /does not require a durable goal/i);
  assert.match(readme, /10 valid loops once Deep Persistence activates/i);
  assert.match(skill, /Loop 10 verdict/i);
  assert.match(skill, /require 10 valid loops/i);
  assert.match(persistence, /10-loop floor is mandatory/i);
  assert.match(persistence, /Do not stop before Loop 10/i);
  assert.doesNotMatch(persistence, /may stop earlier/i);
  assert.doesNotMatch(readme, /30 valid loops|Loop 30/i);
});

test("public guidance documents model-routed orchestration", async () => {
  const [readme, skill, orchestration, metadata] = await Promise.all([
    readFile(path.join(repoRoot, "README.md"), "utf8"),
    readFile(
      path.join(repoRoot, "SKILLS", "quality-obsessed", "SKILL.md"),
      "utf8",
    ),
    readFile(
      path.join(
        repoRoot,
        "SKILLS",
        "quality-obsessed",
        "references",
        "orchestration.md",
      ),
      "utf8",
    ),
    readFile(
      path.join(
        repoRoot,
        "SKILLS",
        "quality-obsessed",
        "agents",
        "openai.yaml",
      ),
      "utf8",
    ),
  ]);

  assert.match(skill, /\[Orchestration\]\(references\/orchestration\.md\)/);
  assert.match(readme, /gpt-5\.6-sol.*xhigh/i);
  assert.match(readme, /gpt-5\.6-luna.*max/i);
  assert.match(orchestration, /plan_routing: model-and-reasoning-on-every-step-when-selectable/);
  assert.match(orchestration, /handoff_contract: deliverable-dependencies-surface-proof-return/);
  assert.match(orchestration, /routing_enforcement: plan-label-and-actual-dispatch/);
  assert.match(orchestration, /judgment_model: gpt-5\.6-sol/);
  assert.match(orchestration, /judgment_reasoning: xhigh/);
  assert.match(orchestration, /execution_model: gpt-5\.6-luna/);
  assert.match(orchestration, /execution_reasoning: max/);
  assert.match(orchestration, /execution_communication: caveman-action-first-minimal-talk/);
  assert.match(orchestration, /execution_audit: sol-xhigh-required-before-acceptance/);
  assert.match(orchestration, /execution_audit_verdict: accept \| repair \| reset/);
  assert.match(orchestration, /task_local_verification: focused-tests-and-current-file-checks-only/);
  assert.match(orchestration, /interim_typecheck: current-edited-file-only-or-skip/);
  assert.match(orchestration, /full_verification_trigger: multiple-sol-accepted-tasks-or-final-batch/);
  assert.match(orchestration, /full_verification_suite: tests-build-typecheck-once-per-batch/);
  assert.match(metadata, /model-routed execution/i);
});

test("public guidance documents the Creative Search contract", async () => {
  const [skill, creative] = await Promise.all([
    readFile(
      path.join(repoRoot, "SKILLS", "quality-obsessed", "SKILL.md"),
      "utf8",
    ),
    readFile(
      path.join(
        repoRoot,
        "SKILLS",
        "quality-obsessed",
        "references",
        "creative-search.md",
      ),
      "utf8",
    ),
  ]);

  assert.match(skill, /For Creative Search missions/i);
  for (const contract of [
    "creative_search: diverge-prototype-compare-commit",
    "creative_trigger: explicit-creative-standout-greenfield-or-direction-risk",
    "direction_count: three-materially-distinct",
    "direction_distance: thesis-structure-or-behavior-not-cosmetic",
    "prototype_policy: cheapest-representative-artifact",
    "selection_basis: user-value-signature-feasibility-proof",
    "hybrid_policy: no-default-hybrid",
    "signature_move: one-memorable-useful-move",
    "subtraction_move: remove-one-generic-or-diluting-element",
    "blind_audience_read: brief-hidden-perception-test",
    "blind_read_fields: understood-action-memory-mismatch",
  ]) {
    assert.match(creative, new RegExp(contract.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")));
  }
});

test("public prose preserves three-direction search and Sol-accepted batch gates", async () => {
  const [readme, skill, examples] = await Promise.all([
    readFile(path.join(repoRoot, "README.md"), "utf8"),
    readFile(
      path.join(repoRoot, "SKILLS", "quality-obsessed", "SKILL.md"),
      "utf8",
    ),
    readFile(
      path.join(
        repoRoot,
        "SKILLS",
        "quality-obsessed",
        "references",
        "examples.md",
      ),
      "utf8",
    ),
  ]);
  const publicProse = [readme, skill, examples].join("\n");

  assert.doesNotMatch(
    publicProse,
    /\b(?:one|single|a\s+single)\s+(?:better|superior)\s+direction\b/i,
  );
  assert.doesNotMatch(publicProse, /several accepted tasks/i);
  for (const source of [readme, skill, examples]) {
    assert.match(source, /multiple Sol-accepted tasks or final batch/i);
  }

  const auditParagraph = readme
    .split(/\r?\n\r?\n/)
    .find((paragraph) => /Luna\/max.*starts pending/i.test(paragraph));
  assert.ok(auditParagraph, "README must state the mandatory Luna pending state");
  assert.match(
    auditParagraph,
    /(?:every|each)\s+Luna\/max\s+(?:task|execution step)\s+(?:starts|begins)\s+pending[\s\S]{0,120}stays\s+pending\s+until\s+(?:a\s+)?Sol\/xhigh\s+audit\s+returns\s+`accept`,\s*`repair`,\s*or\s*`reset`/i,
  );
  assert.doesNotMatch(
    auditParagraph,
    /\b(?:fallback|unavailable|optional|when available|if available)\b/i,
  );
  assert.match(
    readme,
    /(?:mandatory|required)\s+Sol\/xhigh\s+audit[\s\S]{0,120}(?:cannot|must\s+not|does\s+not)\s+(?:fall\s*back|use\s+(?:a\s+)?fallback|accept\s+(?:a\s+)?fallback)/i,
  );
  assert.match(
    readme,
    /(?:if|when)\s+(?:the\s+)?exact\s+Sol(?:\/xhigh)?\s+(?:model\s+)?is\s+unavailable[\s\S]{0,160}Luna(?:\/max)?(?:\s+(?:task|step|execution\s+step))?\s+(?:remains|stays)\s+pending[\s\S]{0,120}(?:cannot|must\s+not|may\s+not|can\s+neither|may\s+neither)\s+(?:close\s+(?:or|nor)\s+continue|continue\s+(?:or|nor)\s+close)/i,
  );
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
