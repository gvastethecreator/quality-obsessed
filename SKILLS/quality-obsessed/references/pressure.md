# Decision Pressure

Use when it can change the artifact, backlog, proof, scope, decision, or final verdict. Broad, quality-sensitive, recovery, review/audit, and explicitly obsessive missions always require pre-final autopsy. Reviewer count and ceremony are not quality.

## Select lenses

- **Critic:** locate highest-impact weaknesses in real output.
- **Adversary:** attack assumptions, hostile inputs, recovery, and unsafe proof.
- **Context specialist:** use the artifact-specific professional role whose craft judgment matters.
- **Proof reviewer:** test whether evidence supports each claim.
- **Simplifier:** remove scope, abstractions, duplication, and ritual that add no value.
- **Orchestrator:** choose the smallest domain and proof stack for a broad mission.

## Context-adaptive Council

Convene Council only when the user explicitly requests it or two or more materially different failure modes need judgment together. Choose 2-4 non-overlapping lenses from artifact, outcome, risk, and professional domain; never add a personality just to fill seats.

Every Council includes one lens for the artifact's relevant professional practice, without claiming real-world credentials. Realtime VFX authoring app: **Professional VFX Artist / Technical Director** for compositing, effect quality, control range, production workflow, and visual artifacts. Complement only where useful: realtime graphics engineering, creative-tool UX, or proof/reliability. Adapt the specialist to other domains; do not reuse a generic reviewer.

Every lens inspects the same real artifact and evidence, then returns role, reason, finding or opportunity, location, harm, concrete cut or fix, and closing proof. Record tension only when evidence creates it; never force disagreement. Reconcile to one decision, next artifact move, and proof — not an options menu. Council counts only when it changes the artifact, backlog, proof, scope, or decision.

Internal lenses are structured self-review, never independent review. Only a fresh external or delegated reviewer working from raw evidence qualifies as independent; disclose availability honestly.

```text
council_pass: explicit-or-multiple-material-lenses
council_lenses: two-to-four-non-overlapping
context_specialist: required-artifact-specific-professional-role
council_conflict: evidence-only-no-forced-disagreement
council_convergence: one-decision-and-next-artifact-move
council_value: artifact-backlog-proof-scope-or-decision-change
council_independence: internal-lenses-are-not-independent-review
```

Substantial or high-risk: one fresh independent reviewer when available and a bounded role can expose a failure the main agent may miss. Give raw artifacts and minimum task-local context, not expected answer or prior diagnosis.

After two consecutive `mixed` verdicts, escalate to a fresh reviewer when available and independent evidence can change the direction; otherwise run one named adversarial lens and disclose that it was not independent. This supplements Protocol's earlier reset for two consecutive `flat` or `worse` verdicts.

```text
review_escalation: two-consecutive-mixed-when-decision-relevant
```

## Adversarial autopsy

Before final status for broad, quality-sensitive, recovery, review/audit, or explicitly obsessive work, inspect the real artifact again from a fresh skeptical stance. Record the strongest remaining objection: location, user harm, likely source cause, concrete cut/fix, proof that would close it, unresolved severity. Repair when mutation is authorized; in diagnose/audit, keep read-only scope and let the finding control the artifact verdict. Mandatory self-critique; not independent review.

```text
adversarial_autopsy: required-before-final-for-broad-quality-recovery-review
```

## Brief and reconciliation

```text
Artifact and outcome:
Baseline or acceptance:
Evidence to inspect:
Reviewer role:
Find 3-5 highest-impact issues with location, harm, fix, and proof.
Do not restate generic advice or certify from prose.
```

Reconcile every finding:

```text
Accepted / rejected:
Reason and evidence:
Artifact, backlog, or decision change:
Remaining risk:
```

If opinions conflict, run the smallest safe proof that decides. Do not average them into compromise.

## Ambition leap

When the user explicitly asks for standout, baseline-beating, superior, or unusually ambitious quality, delegate direction generation and comparison to [Creative Search](creative-search.md). This branch owns boundary, authority, tradeoff, and proof: extra user value, what weak or generic element is cut, the tradeoff, and how the artifact will prove the difference. Adopt a direction only inside the existing authorization envelope; ask before a dependency, architecture, product, budget, release, or other boundary-crossing choice. Skip routine fixes; do not use “ambition” to inflate surface area without a measurable outcome.

```text
ambition_leap: explicit-standout-within-authority
```

## Creative Search pressure

When Creative Search is active, pressure-test the three representative artifacts as competing theses, structures, or behaviors. Critic: user-value difference. Context specialist: craft and audience fit. Proof reviewer: like-for-like comparison. Converge on one explicit choice; a hybrid is a new decision requiring evidence, not a safe compromise.

Before commit: one useful signature, one generic/diluting element removed, and a brief-hidden blind read (understood, action, memory, mismatch). A material mismatch is an unresolved gate: repair or reset before acceptance. Routine fixes and conformance skip this pass.

Routed execution: apply review pressure where it can change acceptance. Low-risk: focused proof and orchestrator reconciliation — not independent review on every task. Important, high-risk, ambiguous, subjective, or user-requested work: capable independent reviewer when available; keep pending until `accept`, `repair`, or `reset`, then close, narrow, or replace the direction. Batch-level full verification at the integration boundary or final batch, not inside each task.

## Grilling

Internal council or grilling when delegation is unavailable. Ask the user only for decisions that repository inspection, primary sources, and safe defaults cannot settle. One decision at a time: recommended choice, material tradeoff, and the default if non-blocking.

When the user explicitly asks to be grilled before implementation, hold target mutation until the requested understanding or decision is confirmed. Read-only inspection and prep that improve the question are allowed; the hold ends once the agreed decision boundary is clear.

```text
grilling_hold: explicit-preimplementation-request
```

## Final disclosure

In the final record, state whether independent review was used. If used, name the bounded role and what artifact, decision, backlog, or proof it changed. If applicable but unavailable or unlikely to change the result, state omitted and why. Do not imply independent judgment from internal self-review.

```text
review_disclosure: report-used-or-omitted
```
