# Quality Contract

Use this whenever the council turns a request into work, review, or a handoff. The contract is the source of truth `quality-obsessed` must execute against.

## Contract Shape

```text
Task:
Artifact type:
Audience/user:
Baseline to beat:
Quality target:
Advisor autonomy:
- evidence inspected:
- advisor interpretation:
- advisor checkpoints:
- consult budget/fallback:
- vetted findings:
- rejected options:
- recommended decision:
- advice accepted/rejected:
- user decision required only if:
Grilling:
- trigger:
- docs inspected:
- decision tree:
- current user question:
- settled decisions:
- rejected paths:
- default assumptions:
- unresolved branches:
- domain docs updated or skipped:
- execution allowed only if:
Mission control:
- objective:
- current loop:
- next action:
- expected proof:
- learning log:
- project-scale opportunity:
Ambition escalation:
- literal request:
- superior version:
- accepted leap:
- added scope:
- cuts:
- fallback:
Transformation layers:
- layer -> required margin -> proof
Signature moves:
- move -> where it appears -> proof
Quality stack:
- domain/build:
- critique:
- proof:
- reference/horizon:
Adjacent audit:
- named target:
- immediate surface:
- root cause or underlying need:
- adjacent surfaces:
- analogous cases:
- accepted nearby improvements:
- offered bigger moves:
- deferred/skipped:
- safe expansion boundary:
Evidence inspected:
Task documentation:
- path:
- status:
- owner:
Improvement ledger:
- location:
- open items:
- update rule:
Loop ledger:
- location:
- minimum loops:
- checkpoint cadence:
Files/surfaces in scope:
Out of scope:
Loop 1 foundation lift:
- axis:
- expected delta:
Adversarial states:
- state/path -> expected behavior -> proof
Verification commands/proof:
Verification expected results:
Reality verdict gate:
STOP conditions:
Final claim allowed only if:
```

## Rules

- Baseline must be concrete: current artifact, competent no-skill result, or explicit assumption.
- Iterative, ambitious, or resumable work must have mission-control state with objective, next action, proof, learning, project improvement, and STOP conditions.
- If the user invites broader scope or standout quality, the contract must include an ambition escalation or name the constraint that blocks it.
- If the user asks for autonomy, challenge, or `improve`, include advisor autonomy fields: evidence, advisor interpretation, checkpoints, consult budget/fallback, vetted findings, rejected options, decision, advice accepted/rejected, and user-decision threshold.
- If the user asks to grill or material branches remain unresolved, include grilling fields: docs inspected, decision tree, one current question when needed, settled decisions, rejected paths, defaults, unresolved branches, and execution gate.
- If `CONTEXT.md`, `CONTEXT-MAP.md`, ADRs, or glossary-like docs change or should change, record updated docs or the reason they were skipped.
- Transformation layers must name artifact-specific user value, not process.
- Adjacent audit must name what nearby surface was inspected, improved, offered, deferred, or skipped.
- Signature moves must be visible, usable, testable, or decision-improving.
- Proof must name commands, screenshots, logs, output paths, diffs, or manual flows.
- Verification must name expected success results, not only commands.
- STOP conditions must cover drift, missing access, failed proof, scope expansion, and false assumptions.
- If the task will be assigned, resumed, delegated, or executed over multiple slices, the task documentation path is required before work starts.
- Accepted improvements, tasks, cuts, risks, and follow-ups must be recorded in the repo tracker/task doc or final-response record with status, evidence, proof needed, and next action.
- Looped work must name where loop records live, how often reality checkpoints run, and which ledger item starts Loop 1.
- Advisor checkpoints must name whether they are external, subagent, or internal council fallback; missing external advice is not proof.
- A requested grilling session blocks execution until the user confirms shared understanding or explicitly releases the gate.
- Scope expansion must include user-outcome fit, proof, cuts, risk/cost, and fallback.
- Bounded adjacent improvements can be accepted by default when they improve the user outcome and proof is available; ask before crossing product direction, durable architecture, new dependencies, data/security boundaries, spending, release/versioning, or broad rewrites.
- Project-scale improvement must support the current user outcome or be deferred with a reason.
- If no evidence exists, mark `failed/no evidence`; do not certify quality from prose.

## Reality Verdict

```text
quality wins | tie | baseline wins | failed/no evidence
```

The verdict is based on the artifact and proof, not loop count, council count, lint success, or confidence.
