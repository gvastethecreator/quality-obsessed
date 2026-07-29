# Orchestration

Use this branch when a mission may benefit from selectable model routing or bounded delegation. A local multi-step plan alone does not require it. Keep the orchestrator responsible for scope, acceptance, dependencies, reconciliation, and the final artifact verdict.

## Decide whether to route

Decide first whether another execution context adds enough value to pay for its handoff. Delegate for useful parallelism, context isolation, or an independent bounded review. Keep work in the orchestrator when it is small, serial, tightly coupled to settled context, or cheaper to execute than explain. Never split work merely to exercise a model tier.

Record a model and reasoning effort only for work that will actually be dispatched or queued. Local plan steps need deliverables and proof, not decorative model labels.

```text
routing_policy: contextual-defaults-not-invariants
delegation_policy: optional-when-value-exceeds-handoff
orchestrator_authority: direct-execution-or-contextual-route
route_record: actual-dispatch-only
routing_inputs: task-shape-risk-context-dependencies-proof-cost
route_stability: reuse-route-until-evidence-changes
handoff_contract: deliverable-dependencies-surface-proof-return
low_risk_route: reports-or-noncritical-execution
low_risk_model: gpt-5.6-luna
low_risk_reasoning: medium
detailed_execution_route: settled-documented-context-rich-implementation
detailed_execution_model: gpt-5.6-luna
detailed_execution_reasoning: max
important_judgment_route: planning-specs-tickets-reviews-or-critical-decisions
important_judgment_model: gpt-5.6-sol
important_judgment_reasoning: xhigh
route_override: orchestrator-allowed-with-material-reason
routing_fallback: closest-available-or-direct-disclosed
execution_communication: action-first-minimal-context
review_trigger: important-high-risk-ambiguous-or-user-requested
low_risk_acceptance: focused-proof-and-orchestrator-reconciliation
review_verdict: accept | repair | reset
task_local_verification: focused-tests-and-current-file-checks-only
interim_typecheck: current-edited-file-only-or-skip
full_verification_trigger: integration-boundary-or-final-batch
full_verification_suite: tests-build-typecheck-once-per-batch
```

## Contextual Codex defaults

Use these routes as defaults, not invariants:

- **Luna/medium:** reports with settled inputs, mechanical transformations, simple checks, and non-critical execution with a clear done condition.
- **Luna/max:** bounded execution or implementation when decisions are settled and the brief already contains the relevant documentation, context, tasks, writable surface, and proof.
- **Sol/xhigh:** planning, specs, tickets, architecture or product decisions, ambiguous diagnosis, direction resets, completed-work reviews, and other important or high-impact judgment.

The orchestrator may execute any step directly or select another available route when task shape, risk, dependencies, context locality, proof cost, or current host capability makes it a better choice. Record the reason only when the deviation is material. Keep a route stable across compatible work; reconsider it when evidence changes the classification, not after every step.

If a requested route is unavailable, use the closest available model or execute directly. Disclose the actual route when it affects trust, cost, or review strength. Never claim a dispatch or review that did not happen.

## Handoff and review

Each delegated or queued step names its deliverable, dependencies, writable surface, acceptance proof, and return condition. Keep execution briefs action-first and include only the context needed to act. Do not ask an execution route to resolve product decisions hidden inside the brief.

The orchestrator reconciles every return against scope and evidence. Low-risk work may close on focused proof and orchestrator review; a separate Sol/xhigh pass is not required for every Luna task. Prefer Sol/xhigh when a distinct review is useful for important, high-risk, ambiguous, subjective, or user-requested work. A formal review returns `accept`, `repair`, or `reset`:

- `accept` admits the deliverable into the batch.
- `repair` returns a narrower action-first brief.
- `reset` rejects the direction and sends the unresolved decision back to judgment.

If execution exposes a new tradeoff or invalidates settled context, stop that lane and return the decision to the orchestrator. Do not force a subagent round trip when the orchestrator can resolve it safely from current evidence.

## Verification budget

For each task, run focused tests for the changed behavior and a real check or typecheck for the edited file when one exists. If no focused or file-level check exists, record N/A with the reason. Run repository-wide tests, builds, and typechecks once at the integration boundary or final batch, then reconcile the resulting gates at the level of review warranted by risk.
