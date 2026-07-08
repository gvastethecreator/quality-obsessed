---
name: quality-obsessed
description: "Evidence-gated quality obsession. Use when the user wants standout quality, polish, completeness, baseline-beating work, persistent improvement, council/grilling pressure, or recovery from weak/bland output."
---

# Quality Obsessed

Obsession with quality is measured in the artifact, not in the process. A quality-obsessed agent looks at the real artifact more times than anyone else: screenshots, states, edge cases, real output, and proof. It fixes what it sees. It does not write plans, ledgers, or logs as a substitute for improving the thing.

**The one rule that governs everything: at least 70% of your actions must directly change or directly inspect the artifact.** Reading references, writing plans, and logging progress belong to the other 30%. If you notice your recent actions are mostly process, stop and touch the artifact.

## Core loop

Repeat until every evidence gate passes and the artifact has been pushed past the literal request when useful. Small work can finish only when no bounded higher-value improvement remains. Substantial, quality-sensitive, broad, visual/product/code, or user-declared obsessive work enters persistence mode; read `references/persistence.md` before claiming done.

1. **Look at the real thing.** Render it, run it, screenshot it, execute it. Never critique from memory or from the code alone. If it has a UI, take a screenshot before judging. If it is code, run it against real inputs including hostile ones.
2. **Name one concrete weakness.** Not "could be more polished" — instead "the empty state is a blank white div", "the error path swallows the exception", "the headline and the CTA say the same thing". If you cannot name a weakness a reviewer would also name, run the critique pass in `references/critique.md`.
3. **Fix it in the artifact.** The fix must change what a user sees or what a test observes. Comments, docs, and renames do not count as fixes.
4. **Prove it.** Capture before/after evidence: screenshot pair, test output, measured diff. A pass with no evidence did not happen.
5. **Issue a verdict:** `substantially better | mixed | flat | worse`. Two consecutive `flat` or `worse` verdicts mean the current direction is wrong — change direction, do not keep polishing it (see `references/critique.md` → Direction reset).

## Mission setup

Before broad work, define a compact contract: artifact, user goal, baseline to beat, quality target, proof, scope, and stop conditions. Read `references/mission-contract.md` when the work is broad, resumable, delegated, risky, baseline-comparison, or likely to span multiple slices.

Use council pressure when the mission needs multiple lenses. Read `references/council.md` when quality depends on critique, ambition, proof, scope judgment, simplification, or orchestration. Read `references/grilling.md` when unresolved assumptions, weak plans, flat loops, or user-facing decisions need one-question-at-a-time pressure.

For every quality mission, inspect the surrounding impact surface before final status. Read `references/adjacent-impact.md` when the named target has nearby states, analogs, call sites, docs, tests, UI context, or workflow consequences.

Use the right domain and proof tools. Read `references/orchestration.md` when the task spans UI, product, game, code, docs, data, automation, visual design, or another specialized domain. A domain skill or proof skill counts only when it changes the artifact, critique, or evidence.

Separate facts from decisions. Current docs, APIs, standards, library behavior, or external claims need primary-source research before they shape the quality bar. Foggy large work needs wayfinding or a decision map before implementation. Clear multi-slice work needs spec/tickets with blockers and a visible frontier.

When the environment exposes subagents or delegated reviewers, use them for real independence on substantial missions: critique, adversarial review, domain review, visual review, verification review, or orchestration planning. Read `references/delegated-review.md` when a fresh reviewer could catch what the main agent is likely to miss.

For visual/UI/prototype/game work where the target read is unclear or ambitious, read `references/visual-horizon.md` and compare before, feasible horizon, and after. If the user says the prior result is poor, bland, generic, conformist, softened, or not obsessive enough, read `references/recovery.md` before patching.

## Evidence gates (all must pass before declaring done)

- **Side-by-side gate:** put the final artifact next to the baseline (the version before you started, or a competent default). A reviewer must be able to name the improvement in one sentence without your help. If the artifact is basically the same and only plans/docs/logs grew, the mission failed.
- **States gate:** empty, loading, error, overflow (long text, many items, zero items), and the happy path all exist and were actually seen or executed — not assumed.
- **Hostile-input gate (code):** the obvious abuse cases were run: bad input, missing data, concurrent use, boundary values. "It should handle that" is not evidence; only executed proof counts.
- **Test-seam gate (code):** new or changed tests exercise agreed public seams, and expected values come from an independent source of truth — not a restatement of the implementation.
- **First-impression gate (visual work):** apply the five-second read in `references/critique.md`. If the first five seconds read as "template", it fails.
- **No self-certification:** optimistic prose cannot turn a weak artifact green. Every claim of improvement must point to a captured artifact (screenshot, test run, diff). If evidence is missing, the claim is false.

## Final status (pick one, honestly)

- `quality win` — all gates passed with captured evidence.
- `failed` or `red/failed` — gates not met; say exactly which and why. Use `red/failed` when recovery mode or baseline comparison says the result still does not win. Never soften this to "solid progress".
- `blocked` — an external constraint prevents a gate; name it and what would unblock.

## Environment mapping

This skill names capabilities, not tools. Map them to whatever the current environment provides:

- **Screenshot / render inspection** → the environment's browser automation or preview screenshot capability.
- **Image generation** → the environment's image generation tool. Never ship placeholder images.
- **Execution / tests** → the environment's shell or test runner.

If a capability is genuinely unavailable, say so and downgrade the affected gate to "inspected by reading output" — never silently skip it.

## References

Read only what the task needs — reading references is process budget, not artifact budget.

- `references/gates.md` — detailed gate definitions, evidence formats, verdict rules, and anti-theater rules.
- `references/critique.md` — read when weaknesses are vague, visual read matters, or a direction reset is needed.
- `references/persistence.md` — read for substantial missions, explicit polish/completeness, or no user limit on iteration.
- `references/mission-contract.md` — read for broad, risky, resumable, baseline-comparison, or multi-slice work.
- `references/council.md` — read when multiple quality lenses should pressure the artifact, plan, proof, ambition, or scope.
- `references/grilling.md` — read when unresolved decisions, weak assumptions, or flat loops need one-question-at-a-time challenge.
- `references/adjacent-impact.md` — read for bugs, narrow tweaks, docs, UI, workflows, assets, or any target with nearby consequences.
- `references/orchestration.md` — read when domain, critique, verification, or reference skills/tools can materially raise the artifact.
- `references/delegated-review.md` — read when subagents or independent review passes can materially improve critique, proof, or orchestration.
- `references/visual-horizon.md` — read for visual/UI/prototype/game work with ambitious or unclear target quality.
- `references/recovery.md` — read when the user rejects the result or the baseline/tie verdict is red.
- `references/examples.md` — read when unsure whether a critique, fix, evidence claim, loop, or failure report is concrete enough.
