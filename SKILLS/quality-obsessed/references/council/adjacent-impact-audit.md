# Adjacent Impact Audit

Use this for any quality mission, including bugs, small improvements, icons, copy, docs, workflows, code, UI, assets, automations, and prototypes.

The rule: do not stop at the named object until the surrounding impact surface has been inspected. The agent should fix the request and look for the nearby higher-value work that a careful owner would notice.

## Impact Radius

Classify the requested change:

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
- Search for analogous code paths, call sites, tests, fixtures, and recent changes.
- Fix the class of nearby failures when bounded and low risk.
- Add or update regression proof when it fits.
- Audit logging/errors/recovery if the bug affects operator or user trust.

Code improvement:
- Inspect local architecture, naming, duplication, ownership, and failure handling around the touched area.
- Prefer one clean bounded refactor over a shim that preserves the same bug class.
- Add proof for the main path and one relevant boundary.
- Record deferred broader cleanup if it is real but outside safe scope.

Icon/asset/visual tweak:
- Inspect the icon in its actual UI context, neighboring icons, states, size, stroke/fill, contrast, alignment, hover/focus/disabled states, and export path.
- Improve surrounding affordance or grouping when the icon alone cannot solve the read.
- Offer or implement a more significant direction when the current visual language is the real weakness.
- Capture before/after visual proof when tools are available.

UI/product improvement:
- Inspect the containing flow, adjacent controls, empty/error/loading/disabled states, copy, responsiveness, focus/touch basics, and telemetry/proof if present.
- Improve the smallest surrounding slice that changes first-use clarity or task success.
- Avoid adding panels or options around a weak core.

Docs/spec/report:
- Inspect the reader's next action, examples, acceptance criteria, caveats, and nearby docs that may go stale.
- Fix adjacent contradictions or missing acceptance proof when bounded.
- Do not expand into a full PRD unless the user outcome needs it.

Automation/workflow:
- Inspect trigger, idempotency, failure/retry, operator feedback, secrets, logs, and rollback path.
- Add dry-run or proof hooks when practical.
- Avoid silent background behavior with no recovery.

## Output

Before execution or final status, record:

```text
Adjacent audit:
- inspected:
- improved:
- offered:
- deferred:
- not inspected:
- proof:
```

`offered` means a meaningful expansion was found but should wait for user decision. `deferred` means valid but not needed for the current outcome or too risky.

## Hard Gates

- No symptom-only bug fix when root cause and analogous paths are cheap to inspect.
- No isolated icon/asset tweak when the surrounding UI makes the change ineffective.
- No narrow code patch that leaves the same nearby failure class unexamined.
- No docs-only improvement that leaves adjacent contradictions when they are visible and bounded.
- No workflow fix without checking failure, retry, and observability basics.
- No expansion that cannot be proved, explained as user-value, or bounded by cuts.
- No final claim without saying what adjacent surface was inspected or deliberately skipped.
