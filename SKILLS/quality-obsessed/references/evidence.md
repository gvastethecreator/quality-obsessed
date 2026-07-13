# Evidence And Applicable Gates

Build a gate manifest before broad work. Select gates by claim, artifact, supported platform, changed surface, risk, and authorization.

## Manifest

```text
Gate:
Applicability: required | conditional | N/A
Reason:
Safe proof surface:
Evidence:
State:
Unverified claim:
```

`N/A` needs a concrete reason. `blocked` names the external constraint. A gate passes only when another reviewer could inspect the captured evidence.

## Gate matrix

| Gate | Apply when | Acceptable proof |
|---|---|---|
| Scope | Every mission | Diff/surface audit against explicit boundaries |
| Acceptance or baseline | Improvement or comparison is claimed | Before/after artifact, fixture, spec, or user reference |
| Claim provenance | Every nontrivial final claim | Test, screenshot, command, source pointer, or measured diff |
| Regression | Target mutation occurred | Focused tests plus the relevant integration/runtime path |
| Runtime behavior | Behavior is runnable and authorized | Executed public seam or sandbox scenario |
| Hostile input | Relevant code boundary changed and a safe fixture exists | Malformed, boundary, concurrency, or dependency-failure test |
| User states | Touched visual flow can enter those states | Rendered supported states that actually exist |
| Viewport/platform | Target supports that viewport or platform | Screenshot/runtime capture at supported dimensions |
| First impression | The quality target includes hierarchy or identity | Blind five-second read on actual output |
| Creative direction search | Creative Search is active for explicit creative, standout, greenfield, or direction-risk work | Three cheap representative artifacts with materially different thesis, structure, or behavior, plus a like-for-like comparison and explicit choice |
| Signature and subtraction | Creative Search is active and identity is part of the acceptance target | Source pointer or artifact record naming one memorable useful move and one removed generic or diluting element |
| Blind audience read | Creative Search is active before commit | Brief-hidden read recording what was understood, the next action, what was remembered, and any mismatch; material mismatch resolved before commit |
| Execution handoff | Delegated or model-routed execution is used | Each Luna/max step is pending until a Sol/xhigh audit returns an explicit verdict; accepted batch record includes scope and focused proof |
| Batch verification | Multiple Sol-accepted tasks or final batch is closing | One batch-level tests/build/typecheck run; never use a full suite as per-task proof |
| Source | Current/external facts or data conclusions matter | Primary source with version/date or repository-owned evidence |
| Independent judgment | Subjective, high-risk, or baseline-sensitive claims remain | Blind reviewer over raw artifacts and rubric |
| Adversarial autopsy | Broad, quality-sensitive, recovery, review/audit, or explicitly obsessive work before final status | Fresh artifact objection with location, harm, cause, concrete cut/fix, closing proof, and unresolved severity |

Do not require mobile for desktop-only software, loading for synchronous artifacts, hostile execution without a sandbox, or visual originality when conformance to a design system is the target.

Creative Search gates are conditional on the branch trigger and remain N/A for routine fixes or conformance work. The direction protocol owns the exact search record; this matrix only states the evidence needed to pass it. Orchestration gates likewise defer to the handoff contract and never promote a pending Luna step from prose alone. Full tests, builds, and repository-wide typechecks run only after multiple Sol-accepted tasks or on the final batch; Sol audits those resulting gates.

## Evidence discipline

Map every claim to the narrowest evidence that can prove it. Static reading can establish source structure, text, configuration, and documented contracts; it cannot prove runtime behavior, visual output, performance, or recovery.

Use independent expected values for tests: literals, specifications, worked examples, fixtures, or prior observed behavior. A test that recomputes the implementation's logic is not proof.

For subjective work, combine deterministic checks with a blind judge. Self-assigned scores may guide planning but never pass a gate by themselves.

## Baseline and comparison

Capture the starting artifact before mutation. If no prior artifact exists, use explicit acceptance criteria or an approved reference. Do not fabricate a baseline. Compare like-for-like: same input, environment, viewport, data, and proof method.

## Limited verification

When a capability is unavailable or unsafe:

```text
Verification state: limited
Verified claims:
Unverified claims:
Missing capability or boundary:
Exact proof needed:
```

Continue with safe evidence where useful, but do not call the missing gate passed.
