---
name: quality-obsessed
description: "Run evidence-gated quality missions and context-adaptive quality councils against a real baseline. Use for explicit requests to be obsessive or exhaustive, beat a baseline, recover rejected or bland output, convene multiple professional lenses, or run a persistent eval-driven improvement loop. Do not invoke implicitly for routine fixes, ordinary reviews, explanations, or status checks."
license: MIT
---

# Quality Obsessed

Measure obsession in the artifact and its proof. Inspect the real output, locate the highest-value weakness, improve the authorized surface, and verify the delta. Process, reviewer count, and loop count never substitute for a better result.

## Operating contract

Always read [Protocol](references/protocol.md) before acting. Select the mission mode from the user's verb and permissions. Explicit user boundaries outrank ambition, persistence, adjacent findings, and reviewer suggestions; this skill never grants authority the user did not provide.

Before broad work, record a compact contract:

```text
Artifact and user outcome:
Mission mode:
In scope / out of scope:
Baseline or acceptance target:
Applicable gates and safe proof surfaces:
Stop condition:
```

Use an actual snapshot, prior output, fixture, specification, or user-approved reference as the baseline. For greenfield work without one, use acceptance criteria and mark comparison claims `not-assessed`; do not invent a competent default.

## Core loop

1. **Inspect.** Render, run, read, or exercise the real artifact through a safe, authorized surface. Cross-check output and source when both exist.
2. **Locate.** Name one concrete weakness, its user harm, severity, and likely source cause. Prefer the highest-leverage in-scope item.
3. **Act according to mode.** Change the smallest systemic cause in change, recovery, or goal mode. In diagnose or audit mode, collect evidence and recommendations without modifying the target unless the user separately authorized an output artifact.
4. **Prove.** Capture evidence appropriate to the claim: test output, screenshot, benchmark, rendered document, source pointer, or measured diff. Static inspection proves only static claims.
5. **Judge.** Record the canonical loop verdict from Protocol. A mixed result needs repair; two consecutive flat or worse verdicts require a direction reset.
6. **Continue or stop.** Continue while a material in-scope risk remains and the next action has a credible proof path. Freeze the accepted scope after discovery; defer new unrelated findings unless they invalidate the mission result.

Do not count comments, docs, renames, or refactors by file type. They count when they improve the mission's actual artifact or contract and the relevant proof observes that improvement.

## Evidence and routing

Read [Evidence](references/evidence.md) to build the gate manifest. Every selected gate is `required`, `conditional`, or `N/A` with a reason. Missing runtime or visual capability makes verification limited; it never silently turns a gate green.

Normal missions load Protocol, Evidence, and one domain profile:

- [Code profile](references/code-profile.md) — code, bugs, architecture, automation, performance, or security boundaries.
- [Visual profile](references/visual-profile.md) — UI, product, prototype, game, image, or interaction work.
- [Docs and data profile](references/docs-data-profile.md) — documentation, specs, reports, analysis, datasets, or read-only audits.

Load extra branches only when the mission requires them:

- [Scope and autonomy](references/scope-and-autonomy.md) — adjacent work, research, wayfinding, dirty trees, broad migrations, or boundary decisions.
- [Persistence](references/persistence.md) — explicit deep work; substantial, broad, or quality-sensitive work without a user limit; resumable multi-slice work; or goal-like missions.
- [Recovery](references/recovery.md) — user rejection, baseline loss, bland output, or failed direction.
- [Pressure](references/pressure.md) — pre-final adversarial autopsy for broad, quality-sensitive, recovery, or review work; a context-adaptive Council with 2-4 non-overlapping lenses; independent review; standout direction; grilling; or simplification.
- [Host capability mapping](references/host-capabilities.md) — the current agent exposes different names or lacks execution, visual, delegation, research, or durable-run capabilities.
- [Examples](references/examples.md) — a mode, evidence claim, or final record remains ambiguous.

Use the smallest relevant stack. A domain or proof skill counts only if it changes the artifact, decision, or evidence.

## Persistence and pressure

Read Persistence before the first counted loop for explicit deep missions and for substantial, broad, or quality-sensitive missions when the user supplies no budget, time limit, or loop count. Preserve the default floor of 30 valid loops while meaningful risks remain, with no hard maximum and an explicit Loop 30 verdict. Routine small or explicitly bounded work may stop at acceptance. Never pre-invent 30 weaknesses or fragment one change to satisfy the count.

For substantial or high-risk work, use one fresh reviewer when available and when independence can change a decision. Reconcile accepted and rejected findings; reviewer volume is not proof.

Before final status for broad, quality-sensitive, recovery, review/audit, or explicitly obsessive work, run Pressure's fresh adversarial autopsy against the real artifact. It is required even when independent review is unavailable and does not grant mutation authority in diagnose or audit mode.

## Final record

Report the three canonical axes from Protocol separately:

```text
Task state:
Artifact verdict:
Verification state:
Evidence:
Deferred or blocked gates:
Next highest-leverage move, if any:
```

When Pressure was applicable, add whether independent review was used or omitted and the concrete reason; never imply a reviewer existed when it did not.

Never convert effort, confidence, or process into an artifact verdict. If evidence is missing, say exactly which claim remains unverified.
