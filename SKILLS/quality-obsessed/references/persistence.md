# Persistence Mode

Use this for substantial missions, broad UI/product/code/docs/game work, explicit polish or completeness, user-declared obsession, or any task where the user did not set a time, budget, or loop count and meaningful weaknesses remain.

Persistence exists to keep the agent from stopping at "better than before" when the ask is "excellent." It is not pass-count theater: a counted loop must improve the artifact, remove a real risk, or produce proof that changes the next decision.

When `quality-obsessed` is invoked, the default bias is to exceed the literal request within safe alignment. Small scope is not a reason to avoid pressure; it is a reason to keep council and grilling lightweight, direct, and artifact-focused.

## Default Contract

- There is no hard maximum loop count.
- When the user does not specify budget, time, or loop count, run at least 30 valid loops when meaningful weaknesses remain.
- The 30-loop target is a floor, not a cap.
- Stop before 30 only when the user explicitly limits the mission, a hard blocker prevents progress, or a no-padding verdict proves more loops would not improve user value, recovery, trust, craft, proof, or maintainability.
- At Loop 30, issue one verdict: `continue`, `ask`, or `stop`.
- After Loop 30, continue in valid loops while the verdict is `continue`; ask only when the next useful loop requires user scope, time, direction, or tradeoff input.

## Pre-Loop Backlog

Before counting loops, inspect the artifact and create a backlog. For a default persistence mission, target 30 concrete weaknesses or risks. Use fewer only when the artifact is small or the user limited scope, and record why fewer is honest.

Each backlog item needs:

```text
id:
severity: blocker | major | minor
lens:
evidence:
user impact:
proposed fix:
proof needed:
status: open | fixed | scoped-out
```

Seed the backlog from:

- baseline comparison.
- adversarial result autopsy.
- evidence gates.
- council findings.
- grilling decisions.
- critique or recovery findings.
- adjacent impact audit.
- selected mission-contract layers.
- visual horizon findings when visual quality matters.
- delegated review findings when subagents or independent reviewers are available.

## Valid Loop

Each counted loop must include:

```text
Loop N:
Source item:
Before evidence:
Action:
After evidence:
Verdict: substantially better | mixed | flat | worse
Remaining concern:
Next action:
```

A loop does not count if it only says "looks good", repeats the requirement, edits docs for a non-doc deliverable, adds ritual with no artifact/decision/evidence effect, or produces proof without testing a real risk.

If the loop responds to a critique finding, its `Action` must attack the named cause, not only the visible symptom. Cosmetic changes do not count against a systemic P1/P2 unless the evidence shows the source cause no longer harms the artifact.

## Material Mix

By Loop 30, at least 60% of counted loops must be material-change loops. A material-change loop alters behavior, interaction, visual read, information architecture, responsiveness, accessibility, failure handling, maintainability, performance, or proof tooling in a way that changes user value or reviewer confidence.

Proof-only loops are allowed when they close a real risk, but they cannot dominate the run. README/docs-only loops count only when the deliverable is documentation or the doc change directly improves execution, review, or future continuation.

## Delegated Review Checkpoints

For default persistence missions, run at least one delegated review or explicit internal substitute before Loop 10 when subagents are available and the surface is large enough. Use `delegated-review.md` to brief the reviewer.

Good checkpoint roles:

- after Loop 1: critic or visual reviewer checks whether the foundation lift is actually visible.
- before Loop 10: adversary or proof reviewer checks edge cases and evidence gaps.
- at Loop 30: proof reviewer or orchestrator checks whether the verdict should be `continue`, `ask`, or `stop`.

If no subagent capability is available, record `delegated review unavailable` and run the role internally from fresh notes. Do not skip the independence need silently.

## Council And Grilling Checkpoints

For persistence missions, run council and grilling as pressure valves:

- before Loop 1: council defines the superior version, ambition leap, risks, cuts, and proof.
- after Loop 1: grilling asks whether the foundation lift is truly visible or testable.
- after two weak verdicts: recovery-style grilling forces a kill list or direction reset.
- at Loop 30: run the adversarial result autopsy, then council plus grilling decide `continue`, `ask`, or `stop`.

These checkpoints are lightweight records, not essays. They count only when they change the next artifact move, backlog, proof, or final claim.

## Mission Control

For iterative, ambitious, delegated, resumable, or project-improving work, keep a compact mission record in the task doc or final response:

```text
Objective:
Current loop:
Highest-leverage open item:
Next action:
Expected proof:
Learning:
STOP conditions:
```

Update it when evidence changes the plan. Hidden objective drift is a failure mode.

## Stop Rule

Stop only when:

- every blocker and major finding is fixed or scoped out with a reason.
- the latest adversarial result autopsy has no in-scope blocker/P1 and no repeated/systemic P2 still open.
- proof covers the main path and one meaningful edge or recovery path.
- side-by-side evidence says the artifact beats the baseline, or final status honestly says it did not.
- the persistence target is satisfied or a no-padding/blocker verdict explains why fewer loops are honest.
- Loop 30, if reached, has a `stop` verdict; otherwise continue or ask.
- delegated review findings, when used, are accepted/rejected with reasons and proof.

Never translate loop count into quality. Quality is the artifact's margin over baseline.
