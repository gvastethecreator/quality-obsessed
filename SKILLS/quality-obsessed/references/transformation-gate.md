# Transformation Gate

Use this for any substantial quality mission. The goal is not to add process; the goal is to transform the artifact in ways the user can feel, use, inspect, or trust.

## What Went Wrong

Quality fails when the agent:
- treats loops, councils, screenshots, or tests as the deliverable.
- improves secondary surfaces while the core artifact stays basically unchanged.
- lets automated checks replace taste, usefulness, correctness, or user preference.
- compares against an imagined weak baseline instead of the actual competent baseline.
- accepts "slightly nicer" when the skill was invoked to create a meaningful quality delta.
- treats `quality-obsessed` as a solo checklist instead of orchestrating the right domain, critique, and proof skills.
- never defines what would make the artifact feel exceptional, so loops polish an ordinary direction.

## Transformation Thesis

Before building, write:

```text
Artifact type:
Main user goal:
Competent baseline would likely:
Superior version should:
Quality stack:
Advisor autonomy:
Adjacent impact audit:
Task documentation:
Mission control:
Improvement ledger:
Exceptional bar:
Signature moves:
Ambition leap:
Quality version must materially improve:
- Layer 1:
- Layer 2:
- Layer 3:
Required margin:
Evidence:
Failure condition:
```

The required margin must be stronger than "not worse". Use one of:
- `clear preference`: a skeptical reviewer would pick the quality artifact over baseline.
- `substantial layer win`: at least 3 selected layers are visibly or testably better.
- `risk removed`: a major failure mode is eliminated and proved.
- `decision value`: the artifact enables a better decision than baseline.
- `execution clarity`: a later agent could execute the selected path without hidden chat context and without reopening rejected options.
- `ambition leap`: the artifact adds a justified higher-order capability, interaction, visual direction, or decision surface that materially improves the main outcome.
- `project lift`: the work leaves a reusable project improvement with proof and low drag.
- `adjacent lift`: the named target is fixed and at least one bounded surrounding risk, analog, state, asset context, doc contradiction, or proof gap is improved or explicitly offered/deferred.

## Core Layers

Select 3-5 layers that matter for the artifact. Do not select easy layers merely because they are cheap to improve.

UI/product:
- task flow, information hierarchy, state coverage, interaction feedback, accessibility/responsiveness, visual trust, experience direction, empty/error/recovery.

Game/prototype:
- core feel, readable state, visual identity, systems depth, reward/progression, replayability, controls, color/material/motion read, performance/proof.

Code/architecture:
- correctness, failure handling, integration fit, simplicity, maintainability, observability, tests, performance, security boundary.

Bug/fix:
- reproduction/evidence, root cause, analogous paths, regression proof, failure/recovery, user/operator trust, blast radius.

Docs/plans/specs:
- decision clarity, specificity, examples, constraints, acceptance criteria, risk coverage, sequencing, reader actionability.

Data/report/dashboard:
- question fit, metric correctness, data quality, analysis depth, visual clarity, interpretation, caveats, decision support.

Automation/workflow:
- trigger correctness, recovery/idempotency, operator feedback, safety, observability, maintainability, proof.

Creative/brand/assets:
- concept originality, composition, craft, palette/material direction, consistency, memorability, implementation fit, audience fit, production usability.

Narrow icon/copy/asset:
- actual-use context, neighboring elements, state variants, alignment/contrast, semantics/accessibility, system consistency, export/implementation path.

## Margin Score

For each selected layer, score against baseline:

```text
2 = substantially better; clear user-visible or testable win
1 = somewhat better; useful but not enough alone
0 = tie; no meaningful delta
-1 = worse; regression
```

Passing gate:
- at least 3 layers score `2`, or
- one critical layer scores `2` and one major risk is removed with proof, when scope is narrow.

Failing gate:
- any selected critical layer scores `-1`.
- total score is less than `4` on broad quality work.
- baseline is preferred overall.
- mission-control learning, project improvement, or next action is stale on iterative work.
- user invited broader scope but no ambition leap landed or was honestly scoped out.
- improvements are mostly process/doc/proof while the artifact remains similar.
- named target improves but the surrounding impact surface still makes the result weak.

## Layer Repair

If the gate fails:
- pick the lowest-scoring high-impact layer.
- change direction, not just polish.
- make one visible/testable material change.
- gather before/after evidence.
- rerun the margin score.

Do not continue low-value loops while a selected core layer is still `0` or `-1`.

Task documentation, mission control, and the improvement ledger must stay current during repair. Record the failed layer, chosen repair, proof path, reality verdict, learning, next action, and deferred work so the next loop does not restart from hidden chat context.

## Final Claim

Final response must state one of:
- `quality wins`: name the layers and evidence.
- `tie/no meaningful delta`: explain the scope or remaining blocker.
- `failed to beat baseline`: name why and what would need to change.

Never translate effort into quality. Quality is the artifact's margin over baseline.
