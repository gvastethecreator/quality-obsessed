import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const smokeScript = path.join(repoRoot, "scripts", "smoke-package.mjs");

test("a clean copied package preserves every runtime file and contract", () => {
  const result = spawnSync(
    process.execPath,
    [
      smokeScript,
      "--json",
      path.join(repoRoot, "SKILLS", "quality-obsessed"),
      "--root-license",
      path.join(repoRoot, "LICENSE"),
    ],
    { cwd: repoRoot, encoding: "utf8" },
  );

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true, JSON.stringify(report, null, 2));
  assert.equal(report.copyIntegrity, true);
  assert.equal(report.licenseIntegrity, true);
  assert.ok(report.files.includes("SKILL.md"));
  assert.ok(report.files.includes("LICENSE"));
  assert.ok(report.files.includes("agents/openai.yaml"));
  assert.ok(report.files.includes("references/protocol.md"));
  assert.ok(report.files.includes("references/orchestration.md"));
  assert.ok(report.files.includes("references/creative-search.md"));
  assert.ok(!report.files.includes("references/README.md"));
});
