# Orchestration

Use when another execution context can improve capability, isolation, parallelism, or independence. A local multi-step plan alone does not require it. Orchestrator owns scope, acceptance, dependencies, reconciliation, and final artifact verdict.

## Quality before route

Set deliverable, quality floor, and required gates before selecting a route. Judge every returned artifact against same contract. Provider, model family, tier, benchmark, or reasoning level never proves quality.

Execute directly when current context has required capabilities; route only when another context adds enough value to justify handoff. Cost and latency only after a route meets quality floor.

```text
routing_policy: capability-and-evidence-adaptive
delegation_policy: optional-when-value-exceeds-handoff
orchestrator_authority: direct-execution-or-capability-route
route_record: actual-dispatch-only
routing_inputs: capabilities-context-risk-dependencies-proof-independence-cost
route_stability: reuse-route-until-evidence-changes
handoff_contract: deliverable-dependencies-surface-proof-return
quality_floor: acceptance-contract-and-required-gates
model_policy: no-required-provider-family-tier-or-reasoning-level
harness_policy: capability-mapping-without-command-assumptions
route_requirements: artifact-access-authority-context-and-proof
route_preference: best-evidenced-capability-fit
cost_policy: optimize-after-quality-floor
escalation_trigger: failed-gate-mixed-verdict-or-material-uncertainty
escalation_policy: repair-retry-reroute-or-independent-review
routing_fallback: execute-directly-or-use-capable-route-and-disclose-limits
execution_communication: action-first-minimal-context
review_trigger: high-risk-ambiguous-subjective-independence-or-user-requested
low_risk_acceptance: focused-proof-and-orchestrator-reconciliation
review_verdict: accept | repair | reset
task_local_verification: focused-tests-and-current-file-checks-only
interim_typecheck: current-edited-file-only-or-skip
full_verification_trigger: integration-boundary-or-final-batch
full_verification_suite: tests-build-typecheck-once-per-batch
```

## Select a capable route

- Routine: prefer direct execution or low-handoff context that can satisfy the gates.
- Implementation: preserve settled context, writable access, and focused proof.
- Important judgment: prioritize domain fit and real independence when risk warrants it.

Record only actual dispatches — selected capabilities, material constraints, deliverable, and proof. No decorative route labels on local plan steps. Keep compatible route stable until evidence changes its fit.

Current harness chooses how to provide selected capabilities: one agent, another agent, queued worker, separate session, tool, or human reviewer. No required vendor, model, command, or reasoning control.

## Handoff and reconciliation

Each dispatched step names deliverable, dependencies, writable surface, acceptance proof, and return condition. Brief is action-first; include only context needed to act. Do not hide unresolved product decisions inside execution brief.

Inspect every return against scope and evidence. Low-risk: accept after focused proof and orchestrator reconciliation. Important or high-risk: fresh independent reviewer when it can change acceptance. Formal review returns `accept`, `repair`, or `reset`:

- `accept` admits deliverable into the batch.
- `repair` returns a narrower action-first brief.
- `reset` rejects the direction and sends unresolved decision back to judgment.

If a gate fails, diagnose before changing routes. Repair missing context, a weak brief, an unsuitable tool, or the artifact. Then retry, select a better-fit route, or request independent review. If no available route can close the gate, report limited verification or a real blocker.

## Verification budget

Per task: focused tests for changed behavior. Real file-level check when one exists; else `N/A` with the reason. Repository-wide tests, builds, and typechecks once at the integration boundary or final batch.
