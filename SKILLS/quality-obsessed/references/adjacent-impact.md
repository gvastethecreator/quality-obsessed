# Adjacent Impact

Use this for bugs, narrow tweaks, icons, copy, docs, workflows, code, UI, assets, automations, prototypes, and any quality mission where the named target has nearby consequences.

The rule: do not stop at the named object until the surrounding impact surface has been inspected. Fix the request, then look for the nearby higher-value work a careful owner would notice.

## Impact Radius

Record this before execution or before final status:

```text
Named target:
Immediate surface:
Root cause or underlying need:
Adjacent surfaces:
Analogous cases:
Tests/proof nearby:
Docs or task records nearby:
User-visible consequences:
Safe expansion boundary:
Ask before crossing:
```

Default expansion is allowed inside the immediate surface and directly analogous cases when it improves the user's outcome and can be proved. Ask before crossing product direction, durable architecture, new dependencies, data/security boundaries, spending, release/versioning, or broad rewrites.

## Domain Moves

Bug fix:

- Reproduce or inspect evidence before changing when practical.
- Identify root cause, not only the failing line.
- Search analogous code paths, call sites, tests, fixtures, and recent changes.
- Fix the class of nearby failures when bounded and low risk.
- Add regression proof when it fits.
- Audit logging, errors, and recovery if trust is affected.

Code improvement:

- Inspect local architecture, naming, duplication, ownership, and failure handling around the touched area.
- Prefer one clean bounded refactor over a shim that preserves the bug class.
- Add proof for the main path and one relevant boundary.
- Record deferred broader cleanup when real but outside safe scope.

UI/product/visual tweak:

- Inspect actual placement, neighboring controls/assets, states, size, contrast, alignment, hover/focus/disabled behavior, labels, and export/theming path.
- Improve surrounding affordance or grouping when the named object alone cannot solve the read.
- Capture before/after visual proof when tools are available.

Docs/spec/report:

- Inspect the reader's next action, examples, acceptance criteria, caveats, and nearby docs that may go stale.
- Fix adjacent contradictions or missing acceptance proof when bounded.
- Do not expand into a full PRD unless the user outcome needs it.

Automation/workflow:

- Inspect trigger, idempotency, failure/retry, operator feedback, secrets, logs, and rollback path.
- Add dry-run or proof hooks when practical.
- Avoid silent background behavior with no recovery.

## Output

```text
Adjacent audit:
- inspected:
- improved:
- offered:
- deferred:
- not inspected:
- proof:
```

`offered` means a valuable expansion exists but should wait for user decision. `deferred` means valid but not needed for the current outcome or too risky.

## Hard Gates

- No symptom-only bug fix when root cause and analogs are cheap to inspect.
- No isolated icon/asset/copy tweak when the surrounding UI makes the change ineffective.
- No narrow code patch that leaves the same nearby failure class unexamined.
- No docs-only improvement that leaves visible adjacent contradictions.
- No workflow fix without checking failure, retry, and observability basics.
- No final claim without saying what adjacent surface was inspected or deliberately skipped.
