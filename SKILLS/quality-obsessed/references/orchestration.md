# Orchestration

Use this branch when the mission needs a multi-step plan, distinct judgment and execution work, or delegated tasks. Keep the main thread responsible for scope, acceptance, dependencies, reconciliation, and the final artifact verdict. Delegate only bounded work whose ownership and proof can be stated without leaking unresolved product decisions.

## Plan contract

Label every plan step with its intended model and reasoning effort when the host can select them. Each delegated or queued step must also name its deliverable, dependencies, writable surface, acceptance proof, and return condition. Do not use delegation or a stronger model merely to add ceremony.

```text
plan_routing: model-and-reasoning-on-every-step-when-selectable
routing_sequence: judgment-execution-judgment
handoff_contract: deliverable-dependencies-surface-proof-return
routing_enforcement: plan-label-and-actual-dispatch
routing_fallback: closest-available-disclosed
execution_communication: caveman-action-first-minimal-talk
execution_audit: sol-xhigh-required-before-acceptance
execution_audit_verdict: accept | repair | reset
task_local_verification: focused-tests-and-current-file-checks-only
interim_typecheck: current-edited-file-only-or-skip
full_verification_trigger: multiple-sol-accepted-tasks-or-final-batch
full_verification_suite: tests-build-typecheck-once-per-batch
```

For mixed work, separate judgment from execution:

- Judgment includes planning, audit and diagnosis, feature thinking, critique, architecture or design choices, risk and scope decisions, review reconciliation, and the final adversarial judgment.
- Execution includes specific changes, test implementation, focused verification, mechanical transformations, and simple tasks with an explicit done condition.
- Test strategy, ambiguous failure analysis, or a newly discovered tradeoff returns to judgment before execution resumes.

Use a compact plan label:

```text
[model | reasoning] task -> deliverable; proof
```

## Codex model profile

When Codex exposes these selectable models, use this exact routing:

```text
judgment_model: gpt-5.6-sol
judgment_reasoning: xhigh
execution_model: gpt-5.6-luna
execution_reasoning: max
```

Assign Sol/xhigh to planning, audits, feature exploration, critiques, architecture, synthesis, and direction resets. Assign Luna/max to bounded implementation, specific edits, test creation, focused checks, and straightforward tasks. A mixed mission begins and ends with Sol/xhigh; Luna/max executes the accepted steps in between.

A plan label is not proof of routing. When dispatching a selectable main task or subagent, actually set the planned model and reasoning effort through the host. Record the real route in the task result.

If the requested model or effort is unavailable, use the closest available option without blocking otherwise safe work, retain the intended route in the plan, and disclose the actual fallback. Never claim that a model-routed or delegated step ran when it did not.

This fallback never applies to the mandatory Sol/xhigh audit: if Sol/xhigh is unavailable, the Luna/max step remains pending.

## Luna execution gate

Every bounded Luna/max step starts with status `pending`. It stays pending until a non-fallback Sol/xhigh audit inspects the raw artifact, focused proof, and scope, then returns exactly one verdict: `accept`, `repair`, or `reset`. Luna cannot close or continue without that exact Sol/xhigh verdict; if Sol/xhigh is unavailable, leave the step pending and disclose the block.

- `accept` closes the step and makes its deliverable eligible for the next judgment step.
- `repair` returns a narrowed, action-first brief to Luna; keep conversation to the minimum needed to execute it.
- `reset` rejects the direction, records what failed, and returns to Sol/xhigh for a materially different decision.

The Luna brief contains only the action, writable surface, dependencies, acceptance proof, and return condition. Keep it caveman-action-first with minimal conversation. Do not ask Luna to reopen unresolved product decisions. If a Luna change exposes ambiguity or a new tradeoff, stop and return to Sol/xhigh before editing further.

## Verification budget

For each task, run only focused tests relevant to the changed behavior and a real check or typecheck for the edited file when that check exists. If no focused test or file-level check exists, skip it and record N/A with the reason. Full tests, builds, and repository-wide typechecks are prohibited per task. Run them once after multiple Sol-accepted tasks or on the final batch, then have Sol audit the resulting gates and evidence.
