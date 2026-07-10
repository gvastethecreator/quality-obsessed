# Decision Pressure

Use pressure when it can change the artifact, backlog, proof, scope, decision, or final verdict. Broad, quality-sensitive, recovery, review/audit, and explicitly obsessive missions always require the compact pre-final autopsy below. Reviewer count and ceremony are not quality.

## Select lenses

- **Critic:** locate the highest-impact weaknesses in real output.
- **Adversary:** attack assumptions, hostile inputs, recovery, and unsafe proof.
- **Context specialist:** use the artifact-specific professional role whose craft judgment matters.
- **Proof reviewer:** test whether evidence supports each claim.
- **Simplifier:** remove scope, abstractions, duplication, and ritual that add no value.
- **Orchestrator:** choose the smallest domain and proof stack for a broad mission.

## Context-adaptive Council

Convene Council only when the user explicitly requests it or two or more materially different failure modes need judgment together. Choose 2-4 non-overlapping lenses from the artifact, outcome, risk, and professional domain; never add a personality just to fill seats.

Every Council includes one lens representing the artifact's relevant professional practice without claiming real-world credentials. For a realtime VFX authoring app, use a **Professional VFX Artist / Technical Director** lens to judge compositing, effect quality, control range, production workflow, and visual artifacts. Complement it only where useful, such as realtime graphics engineering, creative-tool UX, or proof/reliability. Adapt the specialist to other domains instead of reusing a generic reviewer.

Every lens inspects the same real artifact and evidence, then returns its role and reason, finding or opportunity, location, user or professional harm, concrete cut or fix, and closing proof. Record tension only when evidence creates it; never force disagreement. Reconcile to one decision, next artifact move, and proof rather than an options menu. Council counts only when it changes the artifact, backlog, proof, scope, or decision.

Internal lenses are structured self-review, never independent review. Only a fresh external or delegated reviewer working from raw evidence qualifies as independent, and its availability must be disclosed honestly.

```text
council_pass: explicit-or-multiple-material-lenses
council_lenses: two-to-four-non-overlapping
context_specialist: required-artifact-specific-professional-role
council_conflict: evidence-only-no-forced-disagreement
council_convergence: one-decision-and-next-artifact-move
council_value: artifact-backlog-proof-scope-or-decision-change
council_independence: internal-lenses-are-not-independent-review
```

For substantial or high-risk missions, use one fresh independent reviewer when available and when a bounded role can expose a failure the main agent may miss. Give raw artifacts and the minimum task-local context, not the expected answer or prior diagnosis.

After two consecutive `mixed` verdicts, escalate to a fresh reviewer when available and when independent evidence can change the direction; otherwise run one named adversarial lens and disclose that it was not independent. This supplements the Protocol's earlier reset for two consecutive `flat` or `worse` verdicts.

```text
review_escalation: two-consecutive-mixed-when-decision-relevant
```

## Adversarial autopsy

Before final status for broad, quality-sensitive, recovery, review/audit, or explicitly obsessive work, inspect the real artifact again from a fresh skeptical stance. Record the strongest remaining objection, its location and user harm, likely source cause, the concrete cut/fix, proof that would close it, and unresolved severity. Repair it when mutation is authorized; in diagnose/audit mode, preserve read-only scope and let the finding control the artifact verdict. This self-critique is mandatory but is not independent review.

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

When the user explicitly asks for standout, baseline-beating, superior, or unusually ambitious quality, pressure-test the literal solution against one materially better direction. State what extra user value the leap creates, what weak or generic elements it cuts, the tradeoff it introduces, and how the artifact will prove the difference. Adopt the superior direction only inside the existing authorization envelope; ask before a dependency, architecture, product, budget, release, or other boundary-crossing choice.

Do not run this exercise for routine fixes, and do not use “ambition” to inflate surface area without a measurable outcome.

```text
ambition_leap: explicit-standout-within-authority
```

## Grilling

Use internal council or grilling as compact decision pressure when delegation is unavailable. Ask the user only for decisions that repository inspection, primary sources, and safe defaults cannot settle. Ask one decision at a time and include the recommended choice, its material tradeoff, and the default you will use if the decision is non-blocking.

When the user explicitly asks to be grilled before implementation, hold target mutation until the requested understanding or decision is confirmed. The hold does not prevent read-only inspection or preparation that helps ask a better question, and it ends once the agreed decision boundary is clear.

```text
grilling_hold: explicit-preimplementation-request
```

## Final disclosure

In the final record, state whether independent review was used. If used, name the bounded role and the artifact, decision, backlog, or proof it changed. If it was applicable but unavailable or unlikely to change the result, state that it was omitted and why. Do not imply independent judgment from an internal self-review.

```text
review_disclosure: report-used-or-omitted
```
