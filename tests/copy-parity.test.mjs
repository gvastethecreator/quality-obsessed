import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const comparator = path.join(repoRoot, "scripts", "compare-skill-copy.mjs");

test("reports changed files between canonical and installed skill copies", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "quality-copy-test-"));
  const canonical = path.join(root, "canonical");
  const installed = path.join(root, "installed");
  try {
    await Promise.all([
      mkdir(path.join(canonical, "references"), { recursive: true }),
      mkdir(path.join(installed, "references"), { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(canonical, "SKILL.md"), "canonical\n"),
      writeFile(path.join(installed, "SKILL.md"), "stale\n"),
      writeFile(path.join(canonical, "references", "same.md"), "same\n"),
      writeFile(path.join(installed, "references", "same.md"), "same\n"),
    ]);

    const result = spawnSync(
      process.execPath,
      [comparator, "--json", canonical, installed],
      { cwd: repoRoot, encoding: "utf8" },
    );
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.deepEqual(report.changed, ["SKILL.md"]);
    assert.deepEqual(report.missing, []);
    assert.deepEqual(report.extra, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
