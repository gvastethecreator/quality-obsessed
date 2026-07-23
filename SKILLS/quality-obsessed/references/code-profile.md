# Code Profile

Use this profile for code, bugs, architecture, automation, performance, reliability, and security-boundary work.

## Inspect and diagnose

- Reproduce or execute the relevant public seam when safe and authorized.
- Cross-check observed behavior with the source cause, call sites, analogous paths, tests, fixtures, error handling, and recovery.
- Prefer the smallest systemic fix when repeated symptoms share a primitive, state model, contract, or ownership boundary.
- Preserve unrelated dirty-tree changes and existing public behavior outside the mission.

## Applicable proof

Select only gates relevant to the touched seam. Run malformed, boundary, concurrency, or dependency-failure cases only when they represent a real risk and a fixture or sandbox makes execution safe.

Tests must observe the highest useful public seam. Expected values come from a literal, spec, worked example, fixture, or prior behavior independent of the implementation.

For a behavior-preserving refactor, improvement may be structural: reduced duplication, clearer ownership, smaller public surface, lower complexity, or removed failure class. Prove behavior parity plus the structural delta; a lack of user-visible change is not automatically a flat result.

Documentation, naming, configuration, or comments count when they are the contract operators or users consume and the proof observes improved correctness or actionability.

## Structural self-check

Before closing a code change, inspect the actual diff and affected call sites for ad-hoc branches attached to unrelated flows, thin pass-through wrappers that add no ownership or clarity, feature logic leaking into shared paths, and avoidable file sprawl where a clear boundary already exists. Treat these as findings only when the changed structure causes concrete cost or risk. Do not widen scope to refactor unrelated code for checklist compliance.

```text
structural_self_check: inspect-ad-hoc-branches-thin-wrappers-and-avoidable-sprawl
```

## Automation safety

For scheduled, event-driven, background, or operator-facing automation, verify the trigger and duplicate-delivery behavior, idempotency, retry and terminal failure paths, operator feedback, secret handling, useful logs, rollback or recovery, and a safe dry-run or proof hook where applicable. Do not accept silent unrecoverable background behavior.

```text
automation_safety: trigger-idempotency-retry-feedback-secrets-logs-rollback-dry-run
```

## Closeout

Capture the focused test/runtime output, relevant diff, structural self-check, main path, and one meaningful boundary or recovery path. If runtime execution is unavailable, limit runtime claims instead of inferring them from source.
