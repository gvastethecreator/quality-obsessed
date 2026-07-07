# Advisor Autonomy

Use this when the user asks the agent to decide, improve, challenge the request, use `improve`, or produce work another agent could execute without hidden chat context.

This adapts the useful part of `shadcn/improve`: the strongest model spends judgment on recon, evidence, decisions, and executable plans. Unlike pure `improve`, these quality skills may execute, but the decision layer still has to be advisor-grade.

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
Vetted findings:
- id -> evidence -> impact -> effort -> risk -> confidence -> fix sketch
Rejected findings/options:
- item -> reason
Decision:
Why this decision wins:
Default assumptions:
User decision required only if:
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
- No generic options list: present a recommended decision and the rejected alternatives.
- No unvetted finding: evidence, impact, effort, risk, and confidence are required.
- No hidden-context handoff: a later agent must not need this chat to execute.
- No plan without hard boundaries, expected verification results, and STOP conditions.
- No confidence laundering: automated checks, loop count, or nice prose cannot override a baseline reality verdict.
- No silent improvisation: when reality diverges from the plan, update the plan, ask for the material decision, or mark the mission blocked/red.
