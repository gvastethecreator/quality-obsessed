# Orchestration

Use this branch when another execution context can improve capability, isolation, parallelism, or independence. A local multi-step plan alone does not require it. Keep the orchestrator responsible for scope, acceptance, dependencies, reconciliation, and the final artifact verdict.

## Quality before route

Set the deliverable, quality floor, and required gates before selecting a route. Judge every returned artifact against the same contract. A provider, model family, tier, benchmark, or reasoning level never proves quality.

Execute directly when the current context has the required capabilities. Route only when another context adds enough value to justify its handoff. Use cost and latency only after a route meets the quality floor.

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

For routine work, prefer direct execution or a low-handoff context that can satisfy the gates. For implementation, preserve settled context, writable access, and focused proof. For important judgment, prioritize domain fit and real independence when risk warrants it.

Record only actual dispatches. Record the selected capabilities, material constraints, deliverable, and proof. Do not add decorative route labels to local plan steps. Keep a compatible route stable until evidence changes its fit.

The current harness chooses how to provide the selected capabilities. It can use one agent, another agent, a queued worker, a separate session, a tool, or a human reviewer. The contract does not require a vendor, model, command, or reasoning control.

## Handoff and reconciliation

Each dispatched step names its deliverable, dependencies, writable surface, acceptance proof, and return condition. Keep the brief action-first. Include only the context needed to act. Do not hide unresolved product decisions inside an execution brief.

Inspect every return against scope and evidence. Accept low-risk work after focused proof and orchestrator reconciliation. For important or high-risk work, use a fresh independent reviewer when that review can change acceptance. A formal review returns `accept`, `repair`, or `reset`:

- `accept` admits the deliverable into the batch.
- `repair` returns a narrower action-first brief.
- `reset` rejects the direction and sends the unresolved decision back to judgment.

If a gate fails, diagnose the failure before changing routes. Repair missing context, a weak brief, an unsuitable tool, or the artifact when that is the cause. Then retry, select a better-fit route, or request independent review. If no available route can close the gate, report limited verification or a real blocker.

## Verification budget

For each task, run focused tests for the changed behavior. Run a real file-level check when one exists. If no focused check exists, record `N/A` with the reason. Run repository-wide tests, builds, and typechecks once at the integration boundary or final batch.
