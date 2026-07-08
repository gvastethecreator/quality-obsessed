# Advisor Autonomy

Use this when the user asks the agent to decide, improve, challenge the request, use `improve`, or produce work another agent could execute without hidden chat context.

This adapts the useful part of `shadcn/improve`: the strongest model spends judgment on recon, evidence, decisions, and executable plans. It also adapts the portable part of Anthropic's advisor-tool pattern: a faster executor consults a stronger strategic reviewer after orientation, before commitment, and again before a hard final claim.

This workflow does not require Claude Code or an Anthropic `advisor` tool. Here, `advisor` means the strongest available independent decision pass: an external model, subagent, or reviewer when explicitly available, otherwise the council personas run as an internal evidence-backed critique. Do not copy provider mechanics into the task unless the actual runtime supports them.

## Portable Advisor Pattern

Use advisor checkpoints as decision gates, not ceremony.

1. Orientation checkpoint.
   - For tasks longer than a few steps, autonomous decisions, risky edits, architecture/product/design calls, or quality-gated work, inspect the real surface first with read-only recon, then run the advisor pass before writing, locking a plan, or building on a major assumption.
   - Skip this only for simple factual answers, one-line reactive edits dictated by inspected output, or tasks with no non-obvious decision.

2. Planner funnel.
   - When a task doc, Quality Contract, update plan, or handoff packet will steer execution, run advisor autonomy before those artifacts harden the path.
   - The advisor output must feed the planner: vetted findings, rejected options, recommended decision, proof, and STOP conditions.

3. Trouble and conflict checkpoint.
   - Re-run advisor autonomy when errors repeat, the approach is not converging, evidence contradicts the plan, or execution would switch to a materially different path.
   - If local evidence and advisor guidance disagree, reconcile explicitly instead of silently switching or silently ignoring the advice.

4. Final checkpoint.
   - For difficult, review-sensitive, delegated, or quality-gated work, make the deliverable durable first: write files, update task docs, save proof paths, and run available checks.
   - Then run a final advisor/reality pass before claiming `quality wins`.

5. Budget and fallback.
   - Default budget: one orientation checkpoint and one final checkpoint for substantial work; add a trouble checkpoint only when new evidence changes the decision.
   - Do not repeat advisor passes without new evidence, a new conflict, or a new decision.
   - Keep the prompt or internal brief concise: goal, inspected evidence, candidate decision, risks, proof plan, and the specific decision requested.
   - If an external advisor is unavailable, rate-limited, context-too-large, or not part of the runtime, fall back to the internal council pass, mark the fallback in the task doc or final record, and avoid using missing advice as proof.
   - For long loops, distill stable context into the task doc or mission record so later advisor passes read the evidence summary instead of the whole chat.

6. Advice handling.
   - Give advice serious weight. Empirical repo evidence, official docs, or user constraints can override it, but the override must be recorded.
   - Record accepted advice, rejected advice, and why; seed accepted items into the improvement ledger.
   - A passing self-test does not refute advice unless the test actually covers the risk the advice named.

## Advisor Loop

1. Recon the real surface.
   - Read repo rules, relevant docs, existing task trackers, current artifact/code, verification commands, and examples before judging.
   - Identify local conventions the executor must follow.
   - Record what was not inspected.

2. Write findings with evidence.
   - Each finding needs evidence, impact, effort, risk, confidence, and fix sketch.
   - Reject weak, duplicate, by-design, or low-leverage findings with a one-line reason.
   - Do not let a persona opinion become a finding until evidence supports it.

3. Decide by leverage.
   - Rank by user impact divided by effort, adjusted by confidence and fix risk.
   - Pick the smallest set of moves that can beat the baseline.
   - Choose defaults instead of asking unless the answer changes product direction, durable architecture, spending, external dependencies, security/data posture, brand identity, or irreversible scope.

4. Produce an executor-grade plan.
   - The plan must be self-contained: context, paths, current-state evidence, conventions, exact scope, out-of-scope, steps, verification, expected results, done criteria, and STOP conditions.
   - Include a drift check when work may be resumed or delegated.
   - Every step should either change the artifact/project or produce proof that changes the next decision.

5. Close the loop.
   - After execution, reconcile findings, decisions, rejected options, proof, deferred work, and next action.
   - If execution reveals the plan was wrong, update the plan or mark the mission red instead of improvising silently.

## Autonomy Contract

```text
Evidence inspected:
Not inspected:
Advisor interpretation:
Advisor checkpoints:
- orientation:
- trouble/reconcile:
- final:
Advisor budget/fallback:
Vetted findings:
- id -> evidence -> impact -> effort -> risk -> confidence -> fix sketch
Rejected findings/options:
- item -> reason
Decision:
Why this decision wins:
Default assumptions:
User decision required only if:
Advice accepted/rejected:
Self-contained execution plan:
- in scope:
- out of scope:
- ordered steps:
- verification and expected result:
- done criteria:
- STOP conditions:
Drift/reconcile rule:
```

## Hard Gates

- No ask-the-user reflex: ask only for material decisions; otherwise choose and label the assumption.
- No Claude-only assumption: use provider-specific advisor tools only when the current runtime actually exposes them; otherwise use the portable council/advisor pass.
- No high-risk autonomous first write before an orientation checkpoint when the task has non-obvious design, architecture, product, security/data, quality, or handoff risk.
- No generic options list: present a recommended decision and the rejected alternatives.
- No unvetted finding: evidence, impact, effort, risk, and confidence are required.
- No hidden-context handoff: a later agent must not need this chat to execute.
- No plan without hard boundaries, expected verification results, and STOP conditions.
- No unrecorded advice drift: accepted, rejected, overridden, or conflicted advice must be reconciled in the plan, ledger, task doc, or final record.
- No repeated advisor theater: another pass needs new evidence, a new conflict, or a material decision.
- No confidence laundering: automated checks, loop count, or nice prose cannot override a baseline reality verdict.
- No silent improvisation: when reality diverges from the plan, update the plan, ask for the material decision, or mark the mission blocked/red.
