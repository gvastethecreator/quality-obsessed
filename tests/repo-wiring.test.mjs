import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");

test("repository wiring exposes one complete validation command", async () => {
  const packageJson = JSON.parse(
    await readFile(path.join(repoRoot, "package.json"), "utf8"),
  );
  assert.equal(
    packageJson.scripts.check,
    "npm run validate && npm test && npm run smoke:package",
  );
  assert.match(packageJson.scripts.validate, /validate-skill\.mjs/);
  assert.match(packageJson.scripts.validate, /validate-evals\.mjs/);
  assert.match(packageJson.scripts["smoke:package"], /--root-license LICENSE/);
  assert.match(
    packageJson.scripts["smoke:discovery"],
    /smoke-skills-cli\.mjs/,
  );
  assert.equal(packageJson.devDependencies.yaml, "2.9.0");
});

test("CI runs the complete check on Linux and Windows", async () => {
  const workflow = await readFile(
    path.join(repoRoot, ".github", "workflows", "validate.yml"),
    "utf8",
  );
  assert.match(workflow, /ubuntu-latest/);
  assert.match(workflow, /windows-latest/);
  assert.match(workflow, /npm run check/);
  assert.match(workflow, /npm run smoke:discovery/);
  assert.match(workflow, /npm ci/);
});

test("repository normalizes text files for cross-platform copy parity", async () => {
  const attributes = await readFile(path.join(repoRoot, ".gitattributes"), "utf8");
  assert.match(attributes, /\* text=auto eol=lf/);
  assert.match(attributes, /\*\.png binary/);
});

test("the installed bundle physically uses LF text", async () => {
  const root = path.join(repoRoot, "SKILLS", "quality-obsessed");
  const pending = [root];
  while (pending.length > 0) {
    const current = pending.pop();
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) pending.push(target);
      else {
        const content = await readFile(target);
        assert.equal(
          content.includes(13),
          false,
          `${path.relative(repoRoot, target)} contains CR bytes`,
        );
      }
    }
  }
});

test("root and installed package carry the same MIT license", async () => {
  const [rootLicense, packageLicense] = await Promise.all([
    readFile(path.join(repoRoot, "LICENSE"), "utf8"),
    readFile(
      path.join(repoRoot, "SKILLS", "quality-obsessed", "LICENSE"),
      "utf8",
    ),
  ]);
  assert.equal(packageLicense, rootLicense);
});
