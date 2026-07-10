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

## Automation safety

For scheduled, event-driven, background, or operator-facing automation, verify the trigger and duplicate-delivery behavior, idempotency, retry and terminal failure paths, operator feedback, secret handling, useful logs, rollback or recovery, and a safe dry-run or proof hook where applicable. Do not accept silent unrecoverable background behavior.

```text
automation_safety: trigger-idempotency-retry-feedback-secrets-logs-rollback-dry-run
```

## Closeout

Capture the focused test/runtime output, relevant diff, main path, and one meaningful boundary or recovery path. If runtime execution is unavailable, limit runtime claims instead of inferring them from source.
