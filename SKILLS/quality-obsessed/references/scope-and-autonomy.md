# Scope And Autonomy

Use this branch when inspection reveals adjacent work, research is needed, the route is foggy, or the repository already contains unrelated changes.

## Authorization envelope

- Preserve every explicit user limit: files, surfaces, behavior, time, budget, dependencies, branch, writes, execution, and release actions.
- Treat read-only requests as read-only even when the target is editable.
- Do not turn diagnosis or audit into remediation without authorization.
- Do not create goals, releases, tags, commits, pushes, external messages, spend, dependencies, migrations, or production operations unless the user requested them.
- Preserve unrelated dirty-tree changes and avoid generated churn outside the mission.

## Adjacent impact

Inspect the immediate impact surface when cheap: root cause, analogous paths, call sites, states, tests, docs, error handling, recovery, and operator feedback.

Classify each adjacent finding:

```text
inside-scope: fix and prove
required-for-acceptance: fix or surface the blocker
outside-scope-low-risk: offer or defer
boundary-crossing: ask before acting
```

Inspection permission is not modification permission. Fix adjacent surface autonomously only when it lies inside the explicit outcome and proof lane.

## Research and wayfinding

Research a material current, external, or repository fact when guessing could change implementation, risk, proof, or final claims. Prefer primary sources and record the decision the finding changes.

Persist the finding in the existing task record or workplan when it is current or external, disputed, reusable, needed by another agent, or part of multi-slice work. Keep one-off findings close to the artifact or final record instead of creating ceremony.

```text
durable_research_note: current-disputed-reusable-delegated-or-multi-slice
```

Map a decision frontier when the destination is clear but implementation is not:

```text
Known facts:
Decision only the user can make:
Fog that can be inspected:
Next agent-ready action:
Proof if resolved:
```

Stop research or mapping when it no longer changes the artifact, evidence, or frontier. Ask one focused question only when source and repository evidence cannot safely settle a material user decision.

## Multi-slice execution

Use vertical slices when a migration, cross-module change, or broad refactor cannot safely land as one atomic edit. Keep a visible frontier of `ready`, `blocked`, `done`, and `deferred` slices. Each slice must cross the real public seam, name its acceptance proof, and leave the artifact runnable or honestly blocked; do not create speculative horizontal layers that only become useful at the end.

Apply expand-contract when replacing a shared seam: introduce the compatible path, migrate dependents in evidence-backed batches, then remove the old path only after its callers and rollback obligations are closed. Update the frontier after each batch so another capable agent can resume without reconstructing intent.

```text
multi_slice_execution: vertical-frontier-expand-contract
```

## Scope audit

Before finalizing, report what was inspected, changed, deferred, offered, and deliberately skipped. A deferred unrelated issue does not make the in-scope task incomplete.
