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
task_local_verification: diff-first-diagnostic-only-when-blocking
interim_typecheck: only-when-next-edit-depends-on-diagnostic
full_verification_trigger: integration-boundary-or-final-batch
full_verification_suite: risk-selected-checks-once-per-final-batch
parent_reverify: reuse-matching-evidence-rerun-on-drift-or-gap
verification_hierarchy: leaf-evidence-parent-reconciliation-scoped-integration
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

## Verification hierarchy

Local completion does not imply integration.

1. **Leaf evidence.** Return the artifact revision, command or observed path, relevant environment, result, and limitations. Coordinate final checks; each worker need not run a broad gate.
2. **Parent reconciliation.** Inspect scope and evidence provenance. Reuse a result when it matches final bytes, environment, and claim. Rerun only for drift, insufficient evidence, or an integration risk the leaf could not observe.
3. **Batch integration.** Run the smallest applicable final checks for uncovered cross-boundary behavior. Do not repeat unchanged passing gates or duplicate layers that prove the same claim.

Do not mark a returned leaf verified solely because its checkboxes are checked.

## Verification budget

During edits: inspect the diff and use a focused diagnostic only when its answer blocks the next edit. At final integration: select checks for the changed risk and repository contract. Tests, builds, typechecks, and runtime proof are options with distinct purposes, not an automatic chain. Small behavior-preserving edits need no product suite. Report what ran and why other checks were unnecessary or unavailable.
