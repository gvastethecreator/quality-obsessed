# Mission Control

Use this when work is quality-gated, iterative, ambitious, resumable, project-improving, or expected to learn while doing. It behaves like a goal loop, but the source of truth is the repo task document or final-response record, not hidden chat state.

If the user explicitly creates an external `/goal`, keep this mission record aligned with it. Otherwise, do not require external goal tooling.

## Mission Record

```text
Objective:
User outcome:
Current artifact/project state:
Target level:
Advisor checkpoints:
Grilling branches:
Ambition escalation:
Transformation layers:
Current loop:
Highest-leverage open item:
Next action:
Expected proof:
Learning log:
Project-scale opportunities:
Decisions:
Risks/blockers:
STOP conditions:
Final claim allowed only if:
```

## Productive Iteration

Each loop must answer:

```text
What changed in the artifact/project?
Why was this the highest-leverage move?
What proof changed our confidence?
What did we learn?
What is the next highest-leverage move?
```

A loop is productive only if it improves the artifact, removes a real risk, upgrades the project path, or produces proof that changes the next decision. Busywork, cosmetic churn, and documentation without artifact leverage do not count.

## Project Improvement

For each substantial mission, look beyond the immediate artifact and identify one project-scale opportunity:

- reusable component, helper, fixture, skill, test, script, docs entry, architecture seam, prototype pattern, verification harness, or workflow guard.

Accept the opportunity only when it improves future work with low drag. Otherwise record it as deferred or rejected with a reason.

## Learning Discipline

Record learning when it changes future action:

- surprising repo constraint.
- failed approach and why.
- visual/product/technical pattern worth reusing.
- verification method that caught a real issue.
- scope expansion that paid off or failed.

Learning must be short, evidence-backed, and tied to next action. Do not write diary notes.

## Checkpoints

Run mission-control checkpoints:

- before Loop 1: objective, ambition, first action, proof.
- after orientation: whether the advisor checkpoint changed the decision, scope, proof, or STOP conditions.
- after grilling: settled decisions, unresolved branches, and whether execution is released.
- after Loop 1: whether the foundation lift changed the artifact/project.
- after Loop 5: whether the mission is on track or needs a direction change.
- final: durable proof, final advisor/reality reconciliation when required, reality verdict, project improvement, learning, remaining tradeoffs.

## Hard Gates

- No hidden objective drift: if the work changes direction, update the mission record.
- No hidden advice drift: if advisor guidance is accepted, rejected, overridden, or unavailable, update the mission record or task doc.
- No hidden grilling drift: if a user answer, safe default, rejected path, or unresolved branch changes execution, update the mission record or task doc.
- No endless iteration: each loop must name a next action and proof target.
- No project scaling without artifact leverage: future-facing work must support the current user outcome or be deferred.
- No learning log without evidence or action.
- No final claim unless objective, proof, project improvement, learning, and remaining tradeoffs are reconciled.
