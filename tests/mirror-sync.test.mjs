import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { syncSkillMirror } from "../scripts/sync-skill-mirror.mjs";

const canonicalSkill = [
  "---",
  "name: quality-obsessed",
  "description: canonical",
  "---",
  "",
  "# Canonical",
  "",
].join("\n");

test("check detects drift and write creates an exact skill mirror", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-sync-test-"));
  const canonical = path.join(root, "canonical");
  const mirror = path.join(root, "skills", "quality-obsessed");
  try {
    await mkdir(path.join(canonical, "references"), { recursive: true });
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(
        path.join(canonical, "references", "contract.md"),
        "contract\n",
        "utf8",
      ),
    ]);

    const drift = await syncSkillMirror({
      sourcePath: canonical,
      targetPath: mirror,
      mode: "check",
    });
    assert.equal(drift.ok, false);
    assert.deepEqual(drift.missing, ["SKILL.md", "references/contract.md"]);

    const written = await syncSkillMirror({
      sourcePath: canonical,
      targetPath: mirror,
      mode: "write",
    });
    assert.equal(written.ok, true);
    assert.deepEqual(written.copied, ["SKILL.md", "references/contract.md"]);
    assert.equal(await readFile(path.join(mirror, "SKILL.md"), "utf8"), canonicalSkill);

    const clean = await syncSkillMirror({
      sourcePath: canonical,
      targetPath: mirror,
      mode: "check",
    });
    assert.equal(clean.ok, true);
    assert.deepEqual(clean.missing, []);
    assert.deepEqual(clean.extra, []);
    assert.deepEqual(clean.changed, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write removes stale mirror files and verifies the final root", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-prune-test-"));
  const canonical = path.join(root, "canonical");
  const mirror = path.join(root, "skills", "quality-obsessed");
  try {
    await Promise.all([
      mkdir(canonical, { recursive: true }),
      mkdir(path.join(mirror, "legacy"), { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(
        path.join(mirror, "SKILL.md"),
        "---\nname: quality-obsessed\ndescription: stale\n---\n",
        "utf8",
      ),
      writeFile(path.join(mirror, "legacy", "old.md"), "old\n", "utf8"),
    ]);

    const written = await syncSkillMirror({
      sourcePath: canonical,
      targetPath: mirror,
      mode: "write",
    });
    assert.equal(written.ok, true);
    assert.deepEqual(written.copied, ["SKILL.md"]);
    assert.deepEqual(written.removed, ["legacy/old.md"]);
    assert.deepEqual(written.extra, []);
    assert.equal(await readFile(path.join(mirror, "SKILL.md"), "utf8"), canonicalSkill);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write refuses to prune a nonempty target without skill identity", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-safety-test-"));
  const canonical = path.join(root, "canonical");
  const mirror = path.join(root, "skills", "quality-obsessed");
  const unrelated = path.join(mirror, "DO_NOT_DELETE.txt");
  try {
    await Promise.all([
      mkdir(canonical, { recursive: true }),
      mkdir(mirror, { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(unrelated, "unrelated\n", "utf8"),
    ]);

    await assert.rejects(
      syncSkillMirror({
        sourcePath: canonical,
        targetPath: mirror,
        mode: "write",
      }),
      /identity/i,
    );
    assert.equal(await readFile(unrelated, "utf8"), "unrelated\n");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write resolves stale file-directory shape conflicts", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-shape-test-"));
  const canonical = path.join(root, "canonical");
  const mirror = path.join(root, "skills", "quality-obsessed");
  const identity = [
    "---",
    "name: quality-obsessed",
    "description: test",
    "---",
    "",
  ].join("\n");
  try {
    await Promise.all([
      mkdir(path.join(canonical, "references"), { recursive: true }),
      mkdir(mirror, { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), identity, "utf8"),
      writeFile(path.join(canonical, "references", "contract.md"), "new\n", "utf8"),
      writeFile(path.join(mirror, "SKILL.md"), identity, "utf8"),
      writeFile(path.join(mirror, "references"), "stale file\n", "utf8"),
    ]);

    const written = await syncSkillMirror({
      sourcePath: canonical,
      targetPath: mirror,
      mode: "write",
    });
    assert.equal(written.ok, true);
    assert.deepEqual(written.removed, ["references"]);
    assert.equal(
      await readFile(path.join(mirror, "references", "contract.md"), "utf8"),
      "new\n",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write refuses a canonical source with the wrong skill identity", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-source-test-"));
  const canonical = path.join(root, "canonical");
  const mirror = path.join(root, "skills", "quality-obsessed");
  try {
    await mkdir(canonical, { recursive: true });
    await writeFile(
      path.join(canonical, "SKILL.md"),
      "---\nname: another-skill\ndescription: wrong\n---\n",
      "utf8",
    );

    await assert.rejects(
      syncSkillMirror({
        sourcePath: canonical,
        targetPath: mirror,
        mode: "write",
      }),
      /canonical.*identity/i,
    );
    await assert.rejects(readFile(path.join(mirror, "SKILL.md"), "utf8"), {
      code: "ENOENT",
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write refuses a mirror path routed through a junction parent", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-parent-test-"));
  const canonical = path.join(root, "canonical");
  const realSkills = path.join(root, "real-skills");
  const linkedSkills = path.join(root, "skills");
  const mirror = path.join(linkedSkills, "quality-obsessed");
  try {
    await Promise.all([
      mkdir(canonical, { recursive: true }),
      mkdir(realSkills, { recursive: true }),
    ]);
    await writeFile(path.join(canonical, "SKILL.md"), canonicalSkill, "utf8");
    await symlink(
      realSkills,
      linkedSkills,
      process.platform === "win32" ? "junction" : "dir",
    );

    await assert.rejects(
      syncSkillMirror({
        sourcePath: canonical,
        targetPath: mirror,
        mode: "write",
      }),
      /parent.*(?:junction|symbolic link)/i,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write leaves the original mirror intact when commit fails after staging", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-rollback-test-"));
  const canonical = path.join(root, "canonical");
  const mirror = path.join(root, "skills", "quality-obsessed");
  const original = [
    "---",
    "name: quality-obsessed",
    "description: original",
    "---",
    "",
    "# Original",
    "",
  ].join("\n");
  try {
    await Promise.all([
      mkdir(path.join(canonical, "references"), { recursive: true }),
      mkdir(path.join(mirror, "legacy"), { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(path.join(canonical, "references", "new.md"), "new\n", "utf8"),
      writeFile(path.join(mirror, "SKILL.md"), original, "utf8"),
      writeFile(path.join(mirror, "legacy", "old.md"), "old\n", "utf8"),
    ]);

    await assert.rejects(
      syncSkillMirror({
        sourcePath: canonical,
        targetPath: mirror,
        mode: "write",
        beforeCommit: () => {
          throw new Error("simulated commit failure");
        },
      }),
      /simulated commit failure/,
    );
    assert.equal(await readFile(path.join(mirror, "SKILL.md"), "utf8"), original);
    assert.equal(
      await readFile(path.join(mirror, "legacy", "old.md"), "utf8"),
      "old\n",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write recovers an interrupted commit backup before resynchronizing", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-recovery-test-"));
  const canonical = path.join(root, "canonical");
  const skills = path.join(root, "skills");
  const mirror = path.join(skills, "quality-obsessed");
  const backup = path.join(skills, ".quality-obsessed.sync-backup-crash");
  const abandonedStage = path.join(
    skills,
    ".quality-obsessed.sync-stage-crash",
  );
  const original = [
    "---",
    "name: quality-obsessed",
    "description: interrupted original",
    "---",
    "",
  ].join("\n");
  try {
    await Promise.all([
      mkdir(canonical, { recursive: true }),
      mkdir(backup, { recursive: true }),
      mkdir(abandonedStage, { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(path.join(backup, "SKILL.md"), original, "utf8"),
      writeFile(path.join(abandonedStage, "partial.tmp"), "partial\n", "utf8"),
    ]);

    const written = await syncSkillMirror({
      sourcePath: canonical,
      targetPath: mirror,
      mode: "write",
    });
    assert.equal(written.ok, true);
    assert.equal(await readFile(path.join(mirror, "SKILL.md"), "utf8"), canonicalSkill);
    assert.equal(
      (await readdir(skills)).some((name) =>
        name.startsWith(".quality-obsessed.sync-"),
      ),
      false,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write rejects a junction target before touching an interrupted backup", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-target-link-test-"));
  const canonical = path.join(root, "canonical");
  const skills = path.join(root, "skills");
  const mirror = path.join(skills, "quality-obsessed");
  const linkedTarget = path.join(root, "linked-quality-obsessed");
  const backup = path.join(skills, ".quality-obsessed.sync-backup-crash");
  try {
    await Promise.all([
      mkdir(canonical, { recursive: true }),
      mkdir(linkedTarget, { recursive: true }),
      mkdir(backup, { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(path.join(linkedTarget, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(path.join(backup, "SKILL.md"), canonicalSkill, "utf8"),
    ]);
    await symlink(
      linkedTarget,
      mirror,
      process.platform === "win32" ? "junction" : "dir",
    );

    await assert.rejects(
      syncSkillMirror({
        sourcePath: canonical,
        targetPath: mirror,
        mode: "write",
      }),
      /target.*(?:junction|symbolic link)/i,
    );
    assert.equal(await readFile(path.join(backup, "SKILL.md"), "utf8"), canonicalSkill);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write cleans a partially deleted backup when the committed target is valid", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-partial-backup-test-"));
  const canonical = path.join(root, "canonical");
  const skills = path.join(root, "skills");
  const mirror = path.join(skills, "quality-obsessed");
  const backup = path.join(skills, ".quality-obsessed.sync-backup-partial");
  try {
    await Promise.all([
      mkdir(canonical, { recursive: true }),
      mkdir(mirror, { recursive: true }),
      mkdir(backup, { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(path.join(mirror, "SKILL.md"), canonicalSkill, "utf8"),
      writeFile(path.join(backup, "partial.tmp"), "partial\n", "utf8"),
    ]);

    const written = await syncSkillMirror({
      sourcePath: canonical,
      targetPath: mirror,
      mode: "write",
    });
    assert.equal(written.ok, true);
    assert.equal(
      (await readdir(skills)).some((name) =>
        name.startsWith(".quality-obsessed.sync-backup-"),
      ),
      false,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("write rejects source and target aliases that resolve to the same directory", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-mirror-alias-test-"));
  const actualRoot = path.join(root, "actual");
  const source = path.join(actualRoot, "skills", "quality-obsessed");
  const aliasRoot = path.join(root, "alias");
  const target = path.join(aliasRoot, "skills", "quality-obsessed");
  try {
    await mkdir(source, { recursive: true });
    await writeFile(path.join(source, "SKILL.md"), canonicalSkill, "utf8");
    await symlink(
      actualRoot,
      aliasRoot,
      process.platform === "win32" ? "junction" : "dir",
    );

    await assert.rejects(
      syncSkillMirror({
        sourcePath: source,
        targetPath: target,
        mode: "write",
      }),
      /physical.*(?:same|separate)|non-nested/i,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
