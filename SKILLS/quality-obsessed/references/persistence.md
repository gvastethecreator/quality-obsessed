# Persistence Mode

Use this for substantial missions, broad UI/product/code/docs/game work, explicit polish or completeness, user-declared obsession, or any task where the user did not set a time, budget, or loop count and meaningful weaknesses remain.

Persistence exists to keep the agent from stopping at "better than before" when the ask is "excellent." It is not pass-count theater: a counted loop must improve the artifact, remove a real risk, or produce proof that changes the next decision.

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
- evidence gates.
- critique or recovery findings.
- adjacent impact audit.
- selected mission-contract layers.
- visual horizon findings when visual quality matters.

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

A loop does not count if it only says "looks good", repeats the requirement, edits docs for a non-doc deliverable, adds ceremony, or produces proof without testing a real risk.

## Material Mix

By Loop 30, at least 60% of counted loops must be material-change loops. A material-change loop alters behavior, interaction, visual read, information architecture, responsiveness, accessibility, failure handling, maintainability, performance, or proof tooling in a way that changes user value or reviewer confidence.

Proof-only loops are allowed when they close a real risk, but they cannot dominate the run. README/docs-only loops count only when the deliverable is documentation or the doc change directly improves execution, review, or future continuation.

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
- proof covers the main path and one meaningful edge or recovery path.
- side-by-side evidence says the artifact beats the baseline, or final status honestly says it did not.
- the persistence target is satisfied or a no-padding/blocker verdict explains why fewer loops are honest.
- Loop 30, if reached, has a `stop` verdict; otherwise continue or ask.

Never translate loop count into quality. Quality is the artifact's margin over baseline.
