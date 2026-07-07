# Iteration Loop

Use this for substantial missions and any task where the user asks for quality, polish, professional completeness, or repeated improvement.

The loop exists to raise the artifact, not to fill a checklist. A counted loop must expose a meaningful weakness, improve the work, and prove the improvement. If the loop would not change what a user sees, feels, can do, can recover from, or can trust, it probably does not count.

## Pre-Loop Backlog

Before counting loops, inspect the current artifact or plan and create a critique backlog. Default target is at least 30 items when the user does not set budget, time, or loop count. Use at least 10 items only for explicitly small or budgeted work. If the artifact truly cannot support 30 meaningful items, record a no-padding verdict with evidence instead of inventing weak work.

For substantial quality work, the backlog must reflect `skill-orchestration.md` and `exceptional-bar.md`: the selected quality stack, target level, signature moves, and experience direction are treated as requirements, not inspiration.

For assigned, resumable, multi-slice, delegated, risky, or quality-gated work, the backlog must also name the task documentation path and current status. If no path exists, create or update it before counting loops.

For iterative, ambitious, or project-improving work, the backlog must also name mission-control state: objective, current loop, highest-leverage open item, next proof, learning so far, project-scale opportunity, and STOP conditions.

When the user reports that the previous result was poor, bland, conformist, softened, or not obsessive enough, start from `council/relentless-critic.md`: mark the mission red, create a kill list, pick a hyperfocus target, and include at least 3 direction-reset candidates before counting loops.

Each backlog item needs:

```text
id:
severity: blocker | major | minor
lens:
transformation layer:
evidence:
user impact:
effort:
risk:
confidence:
proposed fix:
proof needed:
status: open | fixed | scoped-out
```

At least 3 backlog items must come from adjacent impact audit for substantial work: root cause/underlying need, analogous cases, neighboring surface, proof/test gap, or safe expansion opportunity. For tiny work, record why fewer are honest.

For UI/prototype/game work, read `visual-analysis.md` before building the backlog. At least 6 backlog items must come from the visible/runnable artifact, screenshots, or live browser when tools are available. At least 2 must come from Interface Design Critic and at least 2 from Art Direction Critic.

At least 3 backlog items must attack the difference between competent and exceptional: signature move absent, weak experience arc, generic visual language, missing domain depth, or failure to use the selected quality stack.

When the user permits broader scope, at least 2 backlog items must target ambition escalation: one higher-order opportunity and one risk/cut that keeps the leap disciplined.

If the visual target is unclear or quality is the differentiator, create a feasible `$imagegen` visual horizon before Loop 1 and include the implementation envelope plus translation map in the backlog evidence. An unreachable concept-art target does not count as the horizon.

## Improvement Ledger

Before Loop 1, convert accepted backlog items into the task document's improvement ledger or existing tracker. Tiny one-turn work may use the final response as the ledger, but substantial work must not keep accepted improvements only in chat.

Each loop must:

- start from the highest-impact open ledger item unless a new blocker appears.
- add newly discovered weaknesses as ledger items before acting on them.
- update the source item with status, before/after evidence, proof, reality verdict, remaining concern, and next action.
- mark deferred/rejected items with a reason.
- split broad items instead of pretending one loop closed them.

The ledger is current when every blocker/major item is fixed, scoped out with a reason, or named as a remaining tradeoff with proof status.

When `advisor-autonomy.md` applies, keep rejected findings/options near the ledger. Do not reopen a rejected option unless new evidence changes impact, effort, risk, or confidence.

## Mission Control Loop

Before each loop, write:

```text
Objective:
Current loop:
Highest-leverage open item:
Next action:
Expected proof:
Expected learning:
Project-scale opportunity:
```

After each loop, update:

```text
Artifact/project delta:
Proof:
Learning:
Decision:
Next highest-leverage move:
STOP condition check:
```

A loop that does not improve the artifact/project, remove a risk, or change the next decision with proof is not productive and does not count.

In recovery mode, a loop also does not count unless it attacks the highest-leverage failure, changes likely user preference, or proves the current direction should be abandoned.

## Loop Contract

There is no hard maximum loop count.

When the user does not specify budget, time, or loop count, treat the mission like a goal: run at least 30 valid loops when meaningful weaknesses remain. The 30-loop target is a floor, not a cap.

Stop before 30 only when the user explicitly limits the mission, a hard blocker prevents progress, or mission control records a no-padding verdict proving more loops would not improve user value, recovery, trust, craft, proof, or maintainability.

At Loop 30, run a continuation checkpoint:

- `continue`: high-leverage backlog remains, proof says the artifact can still improve, and the next loop is clear.
- `ask`: improvement is plausible but needs a user decision about scope, time, direction, or tradeoff.
- `stop`: quality wins, no blocker/major item remains, and more loops would be padding.

After Loop 30, continue in valid loops while the checkpoint says `continue`; rerun the checkpoint every 5 loops or whenever a blocker, scope decision, or quality plateau appears.

Loop 1 is special: it must be a foundation lift, not a minor fix.

Loop 1 must:

- Make at least 3 material improvements.
- Touch at least 3 axes: core path, interaction feel, visual/art direction, recovery/debug, accessibility/responsiveness, or proof tooling.
- Include a first ambition move when broader scope is allowed, unless the task doc records why a lower rung was chosen.
- Produce before/after evidence that would let a reviewer say the result is substantially more professional.
- For UI/prototype/game work, improve the visible screenshot or live canvas in a way that is obvious without reading the README.
- For visual/UI/prototype/game work, include one Interface Design Critic fix and one Art Direction Critic fix in Loop 1 unless the task is nonvisual.
- When a visual horizon exists, Loop 1 must move the implementation visibly toward it.
- If the artifact still reads poor, generic, or embarrassing after Loop 1, Loop 1 failed even if the code works. Reopen the foundation lift instead of counting smaller loops.

If Loop 1 does not materially raise the artifact, it does not count; restart the loop from a stronger critique.

Each loop record must include:

```text
Loop N - lens:
Mission-control state:
Improvement ledger item:
Backlog item:
Priority rank:
Transformation layer:
Before evidence:
Horizon/reference:
Action taken:
After evidence:
User-visible delta:
Signature/experience delta:
Visual delta verdict:
Reality verdict:
Layer score delta:
Remaining concern:
Task doc update:
Learning/project update:
```

A loop is invalid if it only says "looks good", merely restates the requirement, edits only README/planning text for a product/UI/game deliverable, or produces proof without testing a real risk.

For any artifact type, a counted loop must improve a selected transformation layer, remove a high-impact risk, or produce hard proof that changes the next decision. If it only increases ceremony, instrumentation, documentation, or polish while selected layers stay flat, it is invalid.

For visual/UI/game work, each visual loop must look substantially better than the previous screenshot on at least one major user-facing axis: composition, silhouette/readability, hierarchy, motion feedback, interaction clarity, art direction, or responsive fit. If the after screenshot is worse, merely different, or only marginally improved, mark the loop `invalid` and apply a penalty: identify the regression, revert or redesign that direction, and do not count the loop.

If three consecutive loops are invalid, mixed, flat, or preference-neutral, stop incremental patching. Mark the direction red, run a direction reset, and resume only when a stronger direction has a proof target.

## Minimum Mix

For UI/prototype/game/product work, the default 30-loop run must include by Loop 30. For an explicit smaller loop target, scale from the old 10-loop minimum without padding.

- At least 18 material-change loops that alter behavior, interaction, visual design, information architecture, responsiveness, accessibility, performance, or proof tooling.
- At least 15 transformation-layer loops that improve the selected artifact-specific layers from `references/transformation-gate.md`.
- At least 12 screenshot-obvious loops that materially improve the user's visible read, not only source structure, telemetry, README text, or hidden state.
- At least 6 roast loops: at least 3 Interface Design Critic loops and 3 Art Direction Critic loops, based on real screenshots or live UI when tools are available.
- At least 6 experience-direction loops for visual/UI/game work: color/material system, focal composition, motion/feedback rhythm, reward/error read, or first-five-second clarity.
- At least 6 recovery/adversarial loops: failure, reset, empty/error, collision, invalid input, hard mode, mobile, or reduced-motion.
- At least 2 Ponytail loops after ambitious changes: remove or simplify complexity without lowering accepted quality.
- No more than 6 proof-only loops.
- No more than 3 README/docs-only loops unless the deliverable itself is documentation.

## Required Lenses

1. Mission fit: user goal, audience, first-use path, and success criteria.
2. Core path: main flow works end to end through real behavior.
3. Adjacent impact: root cause/underlying need, neighboring surface, analogs, proof gap, and expansion boundary.
4. First-run clarity: copy, affordances, feedback, and what to do next.
5. Failure/recovery: invalid, empty, error, reset, retry, back, disabled, or timeout paths.
6. Interaction feel: input latency, control mapping, motion, state transitions, and tactile feedback.
7. Interface Design Critic: hierarchy, spacing, alignment, density, hit areas, focus, and responsive fit.
8. Art Direction Critic: mood, palette, lighting, composition, materiality, originality, and visual memorability.
9. Accessibility/responsiveness: keyboard, touch, labels, contrast, reduced motion, overflow, mobile/tablet.
10. Engineering quality: local architecture, state model, performance, maintainability, tests, and dependency discipline.
11. Proof/baseline challenge: evidence, screenshots/tests/manual flows, and why this beats a competent baseline.

## Depth Bar

A material-change loop should usually do one of these:

- Change the actual user path, controls, game feel, layout, state model, recovery path, or visual read.
- Add or repair a meaningful state: loading, empty, error, failure, reset, retry, win/lose, disabled, boundary, or mobile.
- Improve visual hierarchy or art direction in a way visible in screenshots.
- Add instrumentation or proof that catches a real class of defects.
- Remove complexity that made the result harder to use, maintain, or verify.

Micro-fixes count only when the weakness had real user impact.

## Loop Rules

- Fix blocker and major findings before minor polish.
- Select loops by quality leverage, not checklist convenience. A minor fix cannot count while a blocker or major user-visible weakness remains open unless it directly unblocks that fix.
- Re-rank by leverage when new evidence appears; do not continue a low-impact plan just because it was first.
- Keep a layer score after Loop 1, Loop 5, Loop 10, Loop 20, Loop 30, and every 10 loops after that. If fewer than 3 selected layers are on track to score `2`, change direction.
- Keep a signature-move score after Loop 1, Loop 5, Loop 10, Loop 20, Loop 30, and every 10 loops after that. If no signature move has landed by Loop 5, stop incremental patching and redesign the direction.
- Keep an ambition-leap score after Loop 1, Loop 5, Loop 10, Loop 20, Loop 30, and every 10 loops after that when broader scope is allowed. If the leap is still unproved by Loop 5, cut or replace it instead of polishing around it.
- Prefer visible user-value fixes over ornamental additions.
- Treat automated review scores as smoke tests only. A passing audit cannot overrule a screenshot-backed design/art critique.
- Compare against the first working version or a competent baseline; do not compare only against the immediately previous loop.
- For visual/UI/game work, compare against the feasible horizon and the baseline. If the result is far below both, continue or state the hard scope limit.
- For visual/UI/game work, run a visual delta verdict every loop: `substantially better`, `mixed`, `flat`, or `worse`. Only `substantially better` can count for screenshot-obvious loops; `mixed` needs a follow-up repair before counting; `flat` and `worse` are invalid.
- Run side-by-side reality checkpoints after Loop 1, Loop 5, Loop 10, Loop 20, Loop 30, and every 10 loops after that: `quality wins`, `tie`, or `baseline wins`. If the baseline wins after Loop 1, redo the foundation lift. If it still wins after Loop 5 or Loop 10, stop incremental patching and change direction. If it wins after Loop 30, continue only with a stronger direction, ask for a scope/time decision, or report failed.
- Keep Ponytail active after ambitious fixes: cut complexity that does not serve the accepted quality bar.
- For UI/prototype/game work, at least every third loop must inspect a screenshot or running UI when tools are available.
- For code/features, at least every third loop must inspect tests, types, build output, or runtime behavior.
- Every loop must update mission control with learning and next action; if there is no meaningful next action, run the final reality verdict instead of continuing.
- Real subagents may act as fresh reviewers only when the user requested delegation and active tool policy allows it; otherwise run the lenses internally with fresh notes.

## Stop Rule

Stop only when:

- The explicit user loop target is satisfied, or the default mission has 30 valid loop records, or a blocker/no-padding verdict explains why fewer loops are honest.
- If 30 loops exist, the continuation checkpoint says `stop`; if it says `continue`, keep looping, and if it says `ask`, ask the user.
- At least 60% of counted loops made material changes.
- The transformation gate passes: selected layers show a clear margin over baseline or the final status says it did not.
- All blocker and major findings are fixed or scoped out with a reason.
- Proof covers main path and one meaningful edge/recovery path.
- For visual/UI/game work, the final screenshot no longer reads poor, placeholder-like, or materially below the feasible horizon.
- For visual/UI/game work, each counted visual loop has a `substantially better` visual delta verdict, and any `mixed`, `flat`, or `worse` loop was repaired before handoff.
- For baseline-comparison work, the final side-by-side reality verdict is `quality wins` on the user's main goal. A tie or baseline win is a failed quality mission.
- For recovery work, the final status is not allowed to be "partially successful" unless the user explicitly asked for an intermediate checkpoint; use `quality wins`, `red/failed`, or `blocked`.
- The final baseline challenge names an observable delta and points to evidence.
- At least one signature move is present in the artifact itself and is named in the final evidence.
- When broader scope was allowed, at least one ambition leap is present in the artifact itself, or the final status says the superior target was missed and why.
- Task documentation is current: status, loop/progress summary, proof paths, reality verdict, deferred work, and blockers are recorded.
- Improvement ledger is reconciled: accepted items, deferred work, rejected cuts, remaining blockers, proof paths, and next action are current.
- Mission control is reconciled: objective, final loop, learning, project improvement, next action, STOP conditions, and final claim are current.
