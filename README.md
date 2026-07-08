# Quality Obsessed

![Quality Obsessed banner](./assets/readme-banner.png)

> Codex skill pack for evidence-gated quality work: inspect the real artifact, improve it directly, and prove the result before calling it done.

[![License: MIT](https://shieldcn.dev/badge/license-MIT-yellow.svg?variant=secondary&size=xs)](./LICENSE)
[![Status](https://shieldcn.dev/badge/status-preview-purple.svg?variant=secondary&size=xs)](#status)

Quality Obsessed is a workflow skill for making the delivered artifact visibly better, not just producing more process around it. It pushes Codex to look at the thing itself, name concrete weaknesses, fix them in the artifact, and attach proof to every claim of improvement.

The core rule is simple: at least 70% of the work must directly inspect or directly change the artifact. Planning, reference reading, and progress logging are useful only when they help improve what a user can see, run, or verify.

Use it when a task needs more than a competent first pass:

- UI, prototype, visual, product, code, docs, and output polish.
- Work where "looks better" or "more robust" must be backed by screenshots, tests, command output, or reviewed diffs.
- Tasks where hidden edge cases, empty states, hostile inputs, or weak first impressions would make the result feel unfinished.
- Situations where the agent should keep iterating until evidence gates pass, including persistence missions with a 30-loop floor when the user does not set limits and meaningful weaknesses remain.
- Substantial work where independent subagent review can catch critique, proof, domain, visual, simplification, or orchestration failures.

When this skill is invoked, useful ceremony is part of the work. Council passes, grilling, delegated review, visual horizons, and persistence loops are encouraged when they help the agent exceed the literal request while staying aligned with the user's outcome. The failure mode is not ceremony; the failure mode is ritual that does not change the artifact, decision, proof, or cuts.

## Quick Install

Download this repo or ask Codex to install `quality-obsessed` in your workspace.

The shipped skill lives at:

- [`SKILLS/quality-obsessed/SKILL.md`](./SKILLS/quality-obsessed/SKILL.md)

For local skill collections, copy or install the `SKILLS/quality-obsessed` folder into the target Codex skills directory.

## How It Works

The skill runs a tight evidence loop:

1. Look at the real thing: render it, run it, screenshot it, execute it, or test it.
2. Name one concrete weakness that a reviewer could also find.
3. Fix the artifact so the user-visible output or tested behavior changes.
4. Prove the fix with captured evidence.
5. Issue an honest verdict: `substantially better`, `mixed`, `flat`, or `worse`.

Small work can finish as soon as the gates pass. Substantial, quality-sensitive, broad, visual/product/code, or user-declared obsessive work enters persistence mode: 30 valid loops by default when the user does not set limits, no hard maximum, and a Loop 30 verdict of `continue`, `ask`, or `stop`.

Two consecutive `flat` or `worse` verdicts mean the current direction needs to change instead of receiving more polish.

## Evidence Gates

The skill treats these gates as required before a quality win:

- **Side-by-side:** compare the final artifact with the baseline so the improvement is nameable.
- **States:** verify empty, loading, error, overflow, and happy-path states when the surface can have them.
- **Hostile input:** run malformed, missing, boundary, and failure-path cases for touched code.
- **First impression:** for visual work, inspect real screenshots at desktop and mobile widths.
- **No self-certification:** every improvement claim needs evidence, not optimistic prose.

Final status must be one of `quality win`, `failed`, `red/failed`, or `blocked`.

## Modes

- **Quick quality pass:** use the core loop and evidence gates for bounded work.
- **Persistence mission:** use [`references/persistence.md`](./SKILLS/quality-obsessed/references/persistence.md) for substantial quality, polish, completeness, or no explicit user limit.
- **Council pressure:** use [`references/council.md`](./SKILLS/quality-obsessed/references/council.md) when multiple lenses should challenge ambition, critique, proof, scope, or cuts.
- **Grilling:** use [`references/grilling.md`](./SKILLS/quality-obsessed/references/grilling.md) when assumptions, flat loops, or stop/continue decisions need one-question-at-a-time pressure.
- **Recovery mode:** use [`references/recovery.md`](./SKILLS/quality-obsessed/references/recovery.md) when the user rejects the result or baseline comparison is red.
- **Visual horizon:** use [`references/visual-horizon.md`](./SKILLS/quality-obsessed/references/visual-horizon.md) when visual direction is unclear or ambitious.
- **Mission contract:** use [`references/mission-contract.md`](./SKILLS/quality-obsessed/references/mission-contract.md) for broad, risky, resumable, delegated, or baseline-comparison work.
- **Delegated review:** use [`references/delegated-review.md`](./SKILLS/quality-obsessed/references/delegated-review.md) when subagents or independent reviewer passes can materially improve critique, proof, or orchestration.

## What's Inside

- [`SKILL.md`](./SKILLS/quality-obsessed/SKILL.md): the main artifact-first quality loop, evidence gates, verdict discipline, and environment mapping.
- [`references/README.md`](./SKILLS/quality-obsessed/references/README.md): map of branch-specific references.
- [`references/gates.md`](./SKILLS/quality-obsessed/references/gates.md): detailed gate definitions, evidence formats, verdict rules, and anti-theater rules.
- [`references/critique.md`](./SKILLS/quality-obsessed/references/critique.md): concrete critique, five-second visual read, palette and hierarchy checks, and direction reset.
- [`references/persistence.md`](./SKILLS/quality-obsessed/references/persistence.md): 30-loop floor, no hard cap, Loop 30 continuation verdict, mission control, and no-padding rule.
- [`references/mission-contract.md`](./SKILLS/quality-obsessed/references/mission-contract.md): baseline, quality layers, ambition, task record, and final claim rules.
- [`references/council.md`](./SKILLS/quality-obsessed/references/council.md): multi-lens quality pressure for ambition, critique, proof, scope, cuts, and orchestration.
- [`references/grilling.md`](./SKILLS/quality-obsessed/references/grilling.md): one-question-at-a-time challenge for assumptions, weak plans, flat loops, and decisions.
- [`references/adjacent-impact.md`](./SKILLS/quality-obsessed/references/adjacent-impact.md): root cause, analogs, nearby surfaces, proof gaps, and safe expansion boundary.
- [`references/orchestration.md`](./SKILLS/quality-obsessed/references/orchestration.md): smallest useful domain, critique, proof, and reference stack.
- [`references/delegated-review.md`](./SKILLS/quality-obsessed/references/delegated-review.md): subagent reviewer roles, bounded briefs, reconciliation, and anti-theater rules.
- [`references/visual-horizon.md`](./SKILLS/quality-obsessed/references/visual-horizon.md): before/horizon/after workflow for visual quality.
- [`references/recovery.md`](./SKILLS/quality-obsessed/references/recovery.md): red status, kill list, direction reset, and hyperfocus after weak output.
- [`references/examples.md`](./SKILLS/quality-obsessed/references/examples.md): good and bad examples for critique, fixes, evidence, loops, adjacent audit, honest failure, and recovery.

## Status

Preview skill pack.

- The older large reference set has been replaced by a smaller evidence-gated skill with compact council, grilling, persistence, contract, adjacent-impact, orchestration, delegated-review, visual-horizon, and recovery references.
- Best for substantial, review-sensitive, visual, product, code, docs, and prototype work.
- Designed to exceed the literal request when useful, while rejecting ritual that does not improve the artifact or evidence.

## License

MIT.
