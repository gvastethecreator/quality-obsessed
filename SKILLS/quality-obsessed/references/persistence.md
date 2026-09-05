# Deep Persistence

Use when the user explicitly requests obsessive, exhaustive, no-limit, baseline-beating, or goal-like quality. Default-enter for a substantial, broad, or quality-sensitive mission while meaningful in-scope weaknesses remain. Respect any user budget or time limit. A routine small fix/review does not enter merely because no limit was stated. Loading resumable task guidance does not impose a loop quota.

## Machine-checkable contract

```text
minimum_valid_loops: 0
hard_maximum: none
checkpoint_verdict: continue | ask | stop
backlog_policy: dynamic-evidence-only
default_activation: substantial-unbounded-quality-mission
goal_activation: explicit-user-request
durable_task_record: required-when-capable-and-resumable
```

There is no mandatory loop floor. Stop when the accepted outcome and applicable evidence are complete; continue while a material authorized weakness remains. A user-requested iteration count is a task constraint, not permission to invent work. Each useful iteration addresses a distinct risk, artifact improvement, decision, or missing proof.

## Durable task record

If the host exposes durable task state and the mission spans sessions or needs handoff, update the existing workplan at meaningful phase changes. Keep accepted outcome, boundaries, decisions, current frontier, evidence, blockers, and the next resumable action. Otherwise keep a compact checkpoint in the task. Never claim background persistence or create a durable goal without an explicit request.

## Dynamic backlog

Seed only findings supported by baseline, applicable gates, executed output, source inspection, recovery autopsy, or independent review. Do not pre-create a quota of weaknesses. Replenish only from new in-scope evidence. Prioritize blocker, P1, then systemic P2. Batch findings that share one source cause.

## Valid loop

A counted loop must change the artifact, remove a real risk, resolve a decision that releases implementation, or produce evidence that changes the verdict — not planning restatements, reviewer count, cosmetic churn against a systemic issue, or duplicated verification.

In change, recovery, or goal, material artifact changes must dominate while an authorized, actionable weakness remains. Proof-only or decision-only loops may unblock or close a real uncertainty, but cannot replace implementation the evidence still requires. Diagnose, audit, and other read-only missions mark mutation balance `N/A` rather than inventing writes.

```text
artifact_balance: artifact-change-dominates-when-mutation-authorized
```

```text
N | source finding | artifact/proof delta | loop verdict | next
```

Expand only for blocker/P1, mixed/flat/worse verdicts, scope decisions, or external blockers.

## Epochs and checkpoints

Use checkpoints at meaningful phase changes or final integration, not after every small edit:

- compare against the best prior artifact or acceptance target.
- remove closed and duplicate findings.
- confirm the next item remains in scope and has a proof path.
- reset direction after two consecutive flat or worse verdicts.

Use a fresh reviewer only when authorized and a distinct unresolved risk warrants it. At a checkpoint, inspect the artifact and choose a continuation verdict:

- `continue`: meaningful in-scope risks remain; next loop is actionable.
- `ask`: next valuable move needs a user decision, new authority, or tradeoff.
- `stop`: acceptance met, applicable gates honest, further loops would be padding.

Continue while the verdict remains `continue` and the user's budget permits. Batch normal test runs and complete validation at final integration; a focused diagnostic may run earlier only when the next edit depends on it. Loop count never proves quality.

## Goal integration

Durable goal only when the user explicitly requests goal-like continuation and the environment exposes that capability. Define one objective, boundaries, proof commands or artifacts, checkpoints, and a verifiable stop condition. Otherwise persist in the current task — a normal turn is not a background goal.

## Stop rule

Stop only when canonical protocol permits it and latest evidence supports the continuation verdict. Never translate loop count into artifact quality.
