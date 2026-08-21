# Code Profile

Use for code, bugs, architecture, automation, performance, reliability, and security-boundary work.

## Inspect and diagnose

- Reproduce or execute the relevant public seam when safe and authorized.
- Cross-check observed behavior with source cause, call sites, analogous paths, tests, fixtures, error handling, and recovery.
- Prefer smallest systemic fix when repeated symptoms share a primitive, state model, contract, or ownership boundary.
- Preserve unrelated dirty-tree changes and existing public behavior outside mission.

## Applicable proof

Touched-seam gates only. Hostile cases (malformed, boundary, concurrency, dependency-failure) only when real risk + fixture/sandbox makes execution safe. Tests observe highest useful public seam. Expected values: literal, spec, worked example, fixture, or prior behavior independent of the implementation.

Behavior-preserving refactor may improve structure: less duplication, clearer ownership, smaller public surface, lower complexity, or a removed failure class. Prove behavior parity plus the structural delta; missing user-visible change is not automatically flat.

Docs, naming, configuration, or comments count when they are contract operators or users consume and proof observes improved correctness or actionability.

## Structural self-check

Inspect actual diff and affected call sites — ad-hoc branches on unrelated flows, thin pass-through wrappers with no ownership or clarity, feature logic leaking into shared paths, avoidable file sprawl where a clear boundary already exists. Findings only when changed structure causes concrete cost or risk. Do not widen scope to refactor unrelated code for checklist compliance.

```text
structural_self_check: inspect-ad-hoc-branches-thin-wrappers-and-avoidable-sprawl
```

## Automation safety

Scheduled, event-driven, background, or operator-facing automation: check trigger and duplicate-delivery, idempotency, retry and terminal failure, operator feedback, secret handling, useful logs, rollback or recovery, and a safe dry-run or proof hook. Silent unrecoverable background behavior is unacceptable.

```text
automation_safety: trigger-idempotency-retry-feedback-secrets-logs-rollback-dry-run
```

## Closeout

Focused test/runtime output, relevant diff, structural self-check, main path, plus one meaningful boundary or recovery path. Runtime unavailable → limit runtime claims; do not infer from source.
