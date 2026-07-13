# Deep Persistence

Use this branch when the user explicitly requests obsessive, exhaustive, no-limit, baseline-beating, or goal-like quality. Also enter it by default for a substantial, broad, or quality-sensitive mission when the user supplies no budget, time limit, or loop count and meaningful in-scope weaknesses remain. A routine small or explicitly bounded fix/review does not enter merely because no time limit was stated. Loading this branch only for resumable task state does not activate the 10-loop floor.

## Machine-checkable contract

```text
minimum_valid_loops: 10
hard_maximum: none
loop_10_verdict: continue | ask | stop
backlog_policy: dynamic-evidence-only
default_activation: substantial-unbounded-quality-mission
goal_activation: explicit-user-request
durable_task_record: required-when-capable-and-resumable
```

Once this branch activates, the 10-loop floor is mandatory. Default activation requires substantial in-scope work that can support valid loops; routine small or already-saturated work does not activate it merely because the skill was loaded. An explicit deep request still activates the floor. Do not stop before Loop 10 or count padding: each loop must address distinct evidence-backed risk, artifact value, decision, or proof.

## Durable task record

When the host exposes durable task state and the mission spans sessions, delegated work, or multiple vertical slices, create or update the existing workplan or task record. Keep only the accepted outcome and boundaries, material decisions, current frontier, evidence, blockers, deferred items, and exact next resumable action. Refresh it after each completed or blocked slice so continuation does not depend on conversation memory.

If that capability is unavailable, keep the same compact checkpoint in the current task and disclose the limitation. Never claim background persistence. This record requirement is independent from durable-goal activation and does not by itself turn an ordinary multi-slice change into a 10-loop mission.

## Dynamic backlog

Seed only findings supported by the baseline, applicable gates, executed output, source inspection, recovery autopsy, or independent review. Do not pre-create 10 weaknesses. Replenish the backlog as new evidence appears inside the frozen mission scope.

Prioritize blocker, P1, then systemic P2. Batch findings that share one source cause; one systemic fix may close several findings.

## Valid loop

A counted loop must change the artifact, remove a real risk, resolve a decision that releases implementation, or produce evidence that changes the verdict. Planning restatements, reviewer count, cosmetic churn against a systemic issue, and duplicated verification do not count.

In change, recovery, or goal mode, material artifact changes must dominate while an authorized, actionable weakness remains. Proof-only or decision-only loops may unblock or close a real uncertainty, but they cannot replace implementation that the evidence still requires. Diagnose, audit, and other read-only missions mark this mutation balance `N/A` rather than inventing writes.

```text
artifact_balance: artifact-change-dominates-when-mutation-authorized
```

Keep the record compact:

```text
N | source finding | artifact/proof delta | loop verdict | next
```

Expand the record only for blocker/P1, mixed/flat/worse verdicts, scope decisions, or external blockers.

## Epochs and checkpoints

Work in epochs of five valid loops. At each epoch boundary:

- compare against the best prior artifact or acceptance target.
- remove closed and duplicate findings.
- confirm the next item remains in scope and has a proof path.
- reset direction after two consecutive flat or worse verdicts.

Use one fresh reviewer before Loop 10 when the surface is substantial and independent evidence can change the backlog. At Loop 10, inspect the artifact and issue exactly one continuation verdict:

- `continue`: meaningful in-scope risks remain and the next loop is actionable.
- `ask`: the next valuable move requires a user decision, new authority, or tradeoff.
- `stop`: acceptance is met, applicable gates are honest, and further loops would be padding.

Continue beyond Loop 10 without a hard maximum while the verdict remains `continue`. Reissue the verdict at each later epoch boundary; loop count alone never justifies continuing or stopping.

## Goal integration

Create or activate a durable goal only when the user explicitly requests goal-like continuation and the environment exposes that capability. Define one objective, boundaries, proof commands or artifacts, checkpoints, and a verifiable stopping condition. Otherwise, persist within the current task without pretending that a normal turn is a background goal.

## Stop rule

Stop only when the canonical protocol permits it and the latest evidence supports the continuation verdict. Never translate loop count into artifact quality.
