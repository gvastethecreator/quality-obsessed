import assert from "node:assert/strict";
import test from "node:test";

import { parseDiscoveryOutput } from "../scripts/smoke-skills-cli.mjs";

test("Skills CLI discovery requires exactly the canonical skill", () => {
  const report = parseDiscoveryOutput(
    "Found 1 skill\nAvailable Skills\nquality-obsessed\n",
  );
  assert.deepEqual(report, {
    ok: true,
    count: 1,
    foundCanonicalName: true,
  });
});

test("Skills CLI discovery rejects extra or renamed skills", () => {
  assert.equal(
    parseDiscoveryOutput("Found 2 skills\nquality-obsessed\nother-skill\n").ok,
    false,
  );
  assert.equal(parseDiscoveryOutput("Found 1 skill\nother-skill\n").ok, false);
});
