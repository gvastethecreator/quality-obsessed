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
| Scope | Every mission | Diff/surface audit vs explicit boundaries |
| Acceptance or baseline | Improvement or comparison claimed | Before/after artifact, fixture, spec, or user reference |
| Claim provenance | Every nontrivial final claim | Test, screenshot, command, source pointer, or measured diff |
| Regression | Target mutation occurred | Focused tests + relevant integration/runtime path |
| Structural integrity | Code change can add branching, indirection, ownership drift, or file sprawl | Diff + call-site inspection; behavior parity when structure changes |
| Runtime behavior | Behavior is runnable and authorized | Executed public seam or sandbox scenario |
| Hostile input | Relevant code boundary changed and a safe fixture exists | Malformed, boundary, concurrency, or dependency-failure test |
| User states | Touched visual flow can enter those states | Rendered supported states that actually exist |
| Viewport/platform | Target supports that viewport or platform | Screenshot/runtime capture at supported dimensions |
| First impression | Quality target includes hierarchy or identity | Blind five-second read on actual output |
| Creative direction search | Creative Search active (explicit creative, standout, greenfield, or direction-risk) | Three cheap artifacts differing in thesis, structure, or behavior; like-for-like comparison; explicit choice |
| Signature and subtraction | Creative Search active; identity part of acceptance | Source pointer or artifact record: one memorable useful move and one removed generic or diluting element |
| Blind audience read | Creative Search before commit | Brief-hidden read: understood, next action, remembered, mismatch; material mismatch resolved before commit |
| Routed handoff | Another execution context is used | Dispatch record, bounded handoff, returned artifact, focused proof, orchestrator reconciliation; independent verdict when risk triggers distinct review |
| Batch verification | Integration boundary or final batch closing | One batch-level tests/build/typecheck run; never use a full suite as per-task proof |
| Source | Current/external facts or data conclusions matter | Primary source with version/date or repository-owned evidence |
| Independent judgment | Subjective, high-risk, or baseline-sensitive claims remain | Blind reviewer over raw artifacts and rubric |
| Adversarial autopsy | Broad, quality-sensitive, recovery, review/audit, or explicitly obsessive work before final | Fresh artifact objection: location, harm, cause, concrete cut/fix, closing proof, unresolved severity |

Do not require mobile for desktop-only software, loading for synchronous artifacts, hostile execution without a sandbox, or visual originality when conformance to a design system is the target.

Creative Search gates: N/A for routine fixes or conformance; the direction protocol owns the exact search record. Orchestration gates defer to the handoff contract and actual dispatch record. Low-risk routed work: focused proof and orchestrator reconciliation. Important or high-risk work uses independent review when it can change acceptance. Full tests, builds, and repository-wide typechecks once at the integration boundary or final batch.

## Evidence discipline

Map every claim to the narrowest evidence. Static reading can establish source structure, text, configuration, and documented contracts — not runtime behavior, visual output, performance, or recovery.

Independent expected values for tests: literals, specifications, worked examples, fixtures, or prior observed behavior. A test that recomputes implementation logic is not proof.

Subjective work: combine deterministic checks with a blind judge. Self-assigned scores may guide planning but never pass a gate by themselves.

## Baseline and comparison

Capture starting artifact before mutation. If none exists, use explicit acceptance criteria or an approved reference. Do not fabricate a baseline. Compare like-for-like: same input, environment, viewport, data, and proof method.

## Limited verification

When a capability is unavailable or unsafe:

```text
Verification state: limited
Verified claims:
Unverified claims:
Missing capability or boundary:
Exact proof needed:
```

Continue with safe evidence where useful, but do not call missing gate passed.
