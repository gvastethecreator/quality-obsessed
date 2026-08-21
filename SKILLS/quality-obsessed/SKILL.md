---
name: quality-obsessed
description: "Quality missions: model- and harness-agnostic evidence-gated improvement, obsessive/exhaustive loops, baseline beating, recovery, creative/standout/greenfield direction, quality councils, persistent eval loops. Do not invoke implicitly for routine fixes, conformance, ordinary reviews, explanations, or status checks."
license: MIT
---

# Quality Obsessed

Obsession = better artifact + proof. Inspect real output, name the highest-value weakness, improve the authorized surface, verify the delta. Process, reviewer count, and loop count never substitute.

## Operating contract

Read [Protocol](references/protocol.md) before acting. Mode from the user's verb and permissions. Explicit user boundaries outrank ambition, persistence, adjacent findings, and reviewer suggestions; this skill grants no extra authority.

Before broad work, record a compact contract:

```text
Artifact and user outcome:
Purpose and enabling outcome:
Mission mode:
In scope / out of scope:
Baseline or acceptance target:
Applicable gates and safe proof surfaces:
Stop condition:
```

Baseline: actual snapshot, prior output, fixture, specification, or user-approved reference. Greenfield: acceptance criteria; mark comparison `not-assessed`; never invent a competent default.

Apply Protocol throughout: reuse settled context unless evidence conflicts; act once minimum facts known; continue safe work around a blocked lane; audit milestone claims against current or revision-matched durable evidence.

## Core loop

1. **Inspect.** Render, run, read, or exercise the real artifact on a safe authorized surface; cross-check output and source when both exist.
2. **Locate.** Name one weakness, user harm, severity, and likely source; prefer the highest-leverage in-scope item.
3. **Act according to mode.** Change the smallest systemic cause in change, recovery, or goal. Diagnose/audit: evidence and recommendations only; no target mutation unless the user separately authorized an output artifact.
4. **Prove.** Capture evidence matching the claim: test output, screenshot, benchmark, rendered document, source pointer, or measured diff. Static inspection proves only static claims.
5. **Judge.** Record Protocol's loop verdict. Mixed → repair; two consecutive flat/worse → direction reset.
6. **Continue or stop.** Continue while material in-scope risk remains and the next action has a credible proof path. Freeze accepted scope after discovery; defer unrelated findings unless they invalidate the result.
7. **Close.** Run applicable structural self-check; finish promised safe in-scope work; end only when the requested deliverable is done or explicitly blocked.

Comments, docs, renames, refactors: count only when they improve the mission artifact or contract and proof observes it — not by file type.

## Evidence and routing

Read [Evidence](references/evidence.md) for the gate manifest. Every selected gate: `required`, `conditional`, or `N/A` with a reason. Missing runtime/visual capability → verification limited; never silently green.

Normal missions load Protocol, Evidence, and one domain profile:

- [Code profile](references/code-profile.md) — code, bugs, architecture, automation, performance, security boundaries
- [Visual profile](references/visual-profile.md) — UI, product, prototype, game, image, interaction work
- [Docs and data profile](references/docs-data-profile.md) — documentation, specs, reports, analysis, datasets, read-only audits

Load extra branches only when the mission requires them:

- [Scope and autonomy](references/scope-and-autonomy.md) — adjacent work, research, wayfinding, dirty trees, broad migrations, boundary decisions
- [Persistence](references/persistence.md) — explicit deep work; substantial, broad, or quality-sensitive work without a user limit; resumable multi-slice work; goal-like missions
- [Recovery](references/recovery.md) — user rejection, baseline loss, bland output, failed direction
- [Pressure](references/pressure.md) — pre-final adversarial autopsy for broad, quality-sensitive, recovery, or review work; context-adaptive Council with 2-4 non-overlapping lenses; independent review; standout direction; grilling; simplification
- [Creative Search](references/creative-search.md) — explicitly creative, standout, greenfield, or direction-risk work: compare three materially different directions before committing; skip routine fixes and conformance
- [Orchestration](references/orchestration.md) — another execution context, bounded delegation, queued work, or independent review. Skip ordinary local plans
- [Host capability mapping](references/host-capabilities.md) — harness uses different names or lacks execution, visual, delegation, research, review, or durable-run capabilities
- [Examples](references/examples.md) — mode, evidence claim, or final record remains ambiguous

Use the smallest relevant stack. A domain or proof skill counts only if it changes the artifact, decision, or evidence.

Creative Search: load the reference before choosing a direction. Three cheap representative artifacts with different thesis, structure, or behavior; compare, choose explicitly, no default hybrid; one signature, one subtraction, blind read (understood, action, memory, mismatch); resolve mismatch before commit.

## Persistence and pressure

Read Persistence before the first counted loop for explicit deep missions and for substantial, broad, or quality-sensitive missions with no budget, time limit, or loop count. Once active: 10 valid loops, no hard max, then Loop 10 verdict. Routine small or explicitly bounded work skips the floor. Never pre-invent 10 weaknesses or fragment one change to pad the count.

Substantial/high-risk: one fresh reviewer when available and independence can change a decision. Reconcile accepted and rejected findings; reviewer volume is not proof.

Orchestration: set acceptance contract and required proof before a route. Execute directly when the current context can meet them; route only for material capability, isolation, parallelism, or independence. Select by capability fit, context, risk, and evidence. Provider, model family, tier, benchmark, or reasoning level never proves quality. Same gates on every return; failed gate → repair or pick a better-fit available route. Low-risk: focused proof plus orchestrator reconciliation. High-risk, ambiguous, subjective, or requested work may require independent review. Full tests, builds, and typechecks once at the integration boundary or final batch.

Before final status for broad, quality-sensitive, recovery, review/audit, or explicitly obsessive work, run Pressure's fresh adversarial autopsy on the real artifact. Required even without independent review; grants no mutation authority in diagnose/audit.

Before every final status, run Protocol's turn-exit check. For code changes, also run the Code profile's structural self-check.

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

When Pressure applied, add whether independent review was used or omitted and why; never imply a reviewer existed when it did not.

Never convert effort, confidence, or process into an artifact verdict. If evidence is missing, name the unverified claim.
