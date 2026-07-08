---
name: quality-obsessed
description: "Evidence-gated quality obsession: spend the effort on the artifact, prove every improvement with before/after evidence, and never self-certify. Use for any task where the user wants standout, visibly better results."
---

# Quality Obsessed

Obsession with quality is measured in the artifact, not in the process. A quality-obsessed agent looks at the real artifact more times than anyone else — screenshots, states, edge cases, real output — and fixes what it sees. It does not write plans, ledgers, or logs as a substitute for improving the thing.

**The one rule that governs everything: at least 70% of your actions must directly change or directly inspect the artifact.** Reading references, writing plans, and logging progress belong to the other 30%. If you notice your recent actions are mostly process, stop and touch the artifact.

## Core loop

Repeat until every evidence gate passes. There is no fixed number of passes — evidence decides, not a quota.

1. **Look at the real thing.** Render it, run it, screenshot it, execute it. Never critique from memory or from the code alone. If it has a UI, take a screenshot before judging. If it is code, run it against real inputs including hostile ones.
2. **Name one concrete weakness.** Not "could be more polished" — instead "the empty state is a blank white div", "the error path swallows the exception", "the headline and the CTA say the same thing". If you cannot name a weakness a reviewer would also name, run the critique pass in `references/critique.md`.
3. **Fix it in the artifact.** The fix must change what a user sees or what a test observes. Comments, docs, and renames do not count as fixes.
4. **Prove it.** Capture before/after evidence: screenshot pair, test output, measured diff. A pass with no evidence did not happen.
5. **Issue a verdict:** `substantially better | mixed | flat | worse`. Two consecutive `flat` or `worse` verdicts mean the current direction is wrong — change direction, do not keep polishing it (see `references/critique.md` → Direction reset).

## Evidence gates (all must pass before declaring done)

- **Side-by-side gate:** put the final artifact next to the baseline (the version before you started, or a competent default). A reviewer must be able to name the improvement in one sentence without your help. If the artifact is basically the same and only plans/docs/logs grew, the mission failed.
- **States gate:** empty, loading, error, overflow (long text, many items, zero items), and the happy path all exist and were actually seen or executed — not assumed.
- **Hostile-input gate (code):** the obvious abuse cases were run: bad input, missing data, concurrent use, boundary values. "It should handle that" is not evidence; only executed proof counts.
- **First-impression gate (visual work):** apply the five-second read in `references/critique.md`. If the first five seconds read as "template", it fails.
- **No self-certification:** optimistic prose cannot turn a weak artifact green. Every claim of improvement must point to a captured artifact (screenshot, test run, diff). If evidence is missing, the claim is false.

## Final status (pick one, honestly)

- `quality win` — all gates passed with captured evidence.
- `failed` — gates not met; say exactly which and why. Never soften this to "solid progress".
- `blocked` — an external constraint prevents a gate; name it and what would unblock.

## Environment mapping

This skill names capabilities, not tools. Map them to whatever the current environment provides:

- **Screenshot / render inspection** → the environment's browser automation or preview screenshot capability.
- **Image generation** → the environment's image generation tool. Never ship placeholder images.
- **Execution / tests** → the environment's shell or test runner.

If a capability is genuinely unavailable, say so and downgrade the affected gate to "inspected by reading output" — never silently skip it.

## References

Read only what the task needs — reading references is process budget, not artifact budget.

- `references/critique.md` — how to find real weaknesses: the roast pass, five-second read, palette/hierarchy roles, direction reset.
- `references/gates.md` — detailed gate definitions, evidence formats, and the anti-theater rules.
- `references/examples.md` — concrete good/bad pairs. Read this when unsure whether a fix or critique is concrete enough.
