# Mission Contract

Use this before broad, risky, resumable, delegated, baseline-comparison, multi-slice, or ambitious quality work. The contract keeps the mission from drifting and gives later agents enough context to continue without hidden chat.

Keep it compact. If the task is tiny and finishes in one turn, the final response can be the record, but it still needs to capture any council or grilling decision that changed the artifact.

## Contract

```text
Task:
Artifact type:
Audience/user:
Baseline to beat:
Quality target:
Selected layers:
Signature move or ambition leap:
Proof required:
Council roles:
Grilling decisions:
Delegated review:
Files/surfaces in scope:
Out of scope:
Adjacent audit:
Task record path or final-response record:
STOP conditions:
Final claim allowed only if:
```

## Quality Layers

Pick 3-5 layers that matter for the artifact. Do not pick easy layers merely because they are cheap to improve.

- UI/product: task flow, information hierarchy, state coverage, interaction feedback, accessibility/responsiveness, visual trust, experience direction, empty/error/recovery.
- Game/prototype: core feel, readable state, visual identity, systems depth, reward/progression, controls, motion read, performance/proof.
- Code/architecture: correctness, failure handling, integration fit, simplicity, maintainability, observability, tests, performance, security boundary.
- Bug/fix: reproduction evidence, root cause, analogous paths, regression proof, failure/recovery, user/operator trust, blast radius.
- Docs/spec/report: decision clarity, specificity, examples, constraints, acceptance criteria, risk coverage, sequencing, reader actionability.
- Data/dashboard: question fit, metric correctness, data quality, analysis depth, visual clarity, interpretation, caveats, decision support.
- Automation/workflow: trigger correctness, recovery/idempotency, operator feedback, safety, observability, maintainability, proof.

Score each selected layer against baseline:

```text
2 = substantially better; clear user-visible or testable win
1 = somewhat better; useful but not enough alone
0 = tie; no meaningful delta
-1 = worse; regression
```

The mission passes when at least 3 selected layers score `2`, or one critical layer scores `2` and one major risk is removed with proof for narrow work. A `-1` on a critical layer means repair before final status.

## Ambition

When the user asks for standout quality, permits broader scope, or the literal request would be forgettable, define one ambition leap:

```text
Competent literal version:
Superior version:
Ambition leap:
Why it serves the user outcome:
Added scope:
Cuts:
Proof the leap wins:
Fallback if the leap fails:
```

Good expansion is visible, usable, testable, or decision-improving. Bad expansion hides a broken core path, adds unneeded dependencies, makes proof vague, or grows a product shell around a weak artifact.

Ask before crossing product direction, durable architecture, spending, external dependencies, data/security posture, brand identity, release/versioning, or irreversible scope.

## Task Record

Create or update a task record when the work is assigned, delegated, resumable, multi-slice, risky, quality-gated, or likely to cross sessions. Prefer the repo's existing workplan, issue, `plans/`, `.scratch/planning`, or `.planning`; do not create a parallel planning system.

Minimum fields:

```text
Status:
Goal:
Mission contract:
Adjacent audit:
Improvement ledger:
Loop records:
Verification:
Proof artifacts:
Delegated review findings:
Council/grilling record:
Deferred work:
Open decisions:
```

Accepted improvements, rejected options, deferred work, and proof paths must not live only in chat when another agent may need them.

## Final Claim

Final status must be one of:

- `quality wins`: name the layers and evidence.
- `tie/no meaningful delta`: explain the scope or remaining blocker.
- `failed to beat baseline`: name why and what would need to change.
- `blocked`: name the external blocker and the next proof needed.

Never turn effort, loop count, or confident prose into a quality claim.
