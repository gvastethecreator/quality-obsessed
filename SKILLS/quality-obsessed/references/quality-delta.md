# Quality Delta Scorecard

Use this when the request is broad, visual, prototype/game/product-oriented, review-sensitive, or likely to look like a competent baseline.

## Rubric

Score each item 1-5 before final response. Do another pass for any item under 4 unless the user's scope makes it impossible.

- Purpose: the user goal, audience, and first-use path are obvious in the artifact or final notes.
- Baseline preference: a skeptical reviewer would choose this result over the competent baseline for the user's main goal.
- Transformation margin: selected artifact-specific layers are materially better, not merely surrounded by more process.
- Exceptional bar: the result reaches the selected target level and includes at least one signature move a competent baseline would probably miss.
- Ambition: when the user permits broader scope, the artifact includes a justified ambition leap with proof, cuts, and fallback.
- Core path: the main action works end to end through real behavior.
- Depth: the result includes domain-specific interaction, state, or content beyond a generic shell.
- Recovery: reset, retry, empty/error/failure, invalid input, or equivalent recovery path works where relevant.
- Craft: hierarchy, spacing, typography, copy, feedback, motion, and visual rhythm feel intentional.
- Experience direction: color/material roles, pacing, feedback, and first-five-second read fit the task instead of defaulting to generic styling.
- Accessibility: semantic controls, focus, labels, keyboard/touch basics, and hit areas are handled where relevant.
- Responsiveness: representative desktop and mobile/tablet layouts fit without overlap or hidden core actions.
- Evidence: proof covers the main path plus one meaningful edge/recovery path.
- Adjacent impact: the named target and surrounding surface were inspected; bounded nearby improvements were made, offered, or deferred with reasons.
- Visual horizon: for visual/UI/prototype/game work where quality is the differentiator, a generated or edited target reference exists and the after screenshot is compared against it.
- Feasible horizon: the target reference fits the actual medium, stack, assets, viewport, and session budget; unreachable concept art is rejected or translated into a tighter implementable target.
- Scope discipline: complexity serves user value; decorative or speculative work is cut.
- Advisor autonomy: when autonomy or `improve` was invoked, the work has evidence-backed findings, portable advisor checkpoints or fallback, rejected alternatives, one recommended decision, accepted/rejected advice, self-contained execution steps, verification expected results, and STOP conditions.
- Grilling: when a plan is grillable or the user asked to grill, repo/docs recon precedes questions, one material question is asked at a time with a recommended answer, settled decisions and rejected paths are durable, and execution waits for the explicit gate when required.
- Task documentation: assigned, delegated, resumable, multi-slice, risky, or quality-gated work has a current task doc with contract, improvement ledger, loop records, scope, progress, proof paths, STOP conditions, and deferred work.
- Mission control: iterative or ambitious work keeps objective, current loop, learning, project-scale opportunity, next action, proof, and STOP conditions current.
- Iteration: Loop 1 is a foundation lift with at least 3 material improvements, and substantial missions without an explicit user limit default to 30 valid loop records, including a pre-loop backlog, reconciled ledger, before/after evidence, a continuation checkpoint, and at least 60% material-change loops.
- Transformation: at least 3 selected layers from `transformation-gate.md` score `2`, or the final claim admits tie/failure.
- Critical honesty: the result does not soften a failed artifact into success; user-reported disappointment triggers red status, kill list, direction reset, and a named hyperfocus target.

## Reality Verdict

Use this when a baseline exists or the user is comparing quality modes.

Required evidence:
- Baseline screenshot or runnable output.
- Quality screenshot or runnable output.
- Main user goal and the 3-5 axes that matter for that goal.

Verdict shape:

```text
Reality verdict: quality wins | tie | baseline wins | failed/no evidence
Axes:
- first impression:
- main-path usefulness:
- visual/art direction:
- interaction/game feel:
- clarity/debug/recovery:
Decision:
Next action:
```

Rules:
- Automated scores, passing checks, and loop counts cannot set the verdict. They only support evidence.
- If baseline wins on the main user goal, the quality mission is red. Do not claim a quality delta.
- If the quality result adds process but produces a worse artifact, the process failed; restart from the highest-impact weakness or report failure.
- A tie is not a win. Continue only if scope/time allows; otherwise state that the skill did not create a meaningful delta.
- When the user already said the result felt poor/bland/conformist, a tie is `red/failed`, not a neutral outcome.
- For visual/UI/game work, every counted visual loop must have a `substantially better` visual delta verdict. Penalize `mixed`, `flat`, or `worse` by invalidating that loop and repairing the regression before continuing.
- For any artifact type, process-only gains do not count. The chosen transformation layers must move.

## Domain Upgrades

Product/UI:
- Add real state transitions, disabled/loading/error/empty states, inline feedback, meaningful defaults, and copy that removes first-run confusion.
- Prefer fewer stronger screens over many shallow panels.
- Define a color/material/interaction language for the specific product surface; do not accept generic dark panels as visual direction.
- When scope expansion is allowed, add one higher-order product move that changes preference: smarter default, richer comparison, guided workflow, stateful insight, or stronger recovery loop.

Prototype/game:
- Add playable depth, readable landmarks, input feel, debug/QA controls, failure/retry, finish state, and screenshot proof.
- Show the thing being tested first; do not bury it in explanatory UI.
- Add a signature interaction or reward moment that changes the play experience, not just the HUD.
- When scope expansion is allowed, make the prototype answer a bigger question than "can it exist": feel, replay, inspectability, system depth, or production direction.
- Run interface-design and art-direction roast passes against screenshots or the live canvas before final handoff, then fix at least one major finding from each critic.
- Define current read and target read; a screenshot should make the target read more obvious after the fixes.
- Use `$imagegen` to create or edit a visual horizon when the target read needs a concrete visual reference; compare before, horizon, and after.
- Keep the visual horizon implementable: write the renderer/assets/time envelope and a translation map from image ideas into code-native changes before treating the image as a target.

Code/features:
- Add regression coverage when practical, handle boundary conditions, preserve local architecture, and expose clear errors.
- For bugs, inspect root cause, analogous paths, call sites, fixtures, and trust/recovery signals before stopping.
- Prefer small cohesive refactors over shims when the shim would encode the bug.
- When scope expansion is allowed, remove a class of future failure or expose a more powerful seam instead of patching only the symptom.

Icon/assets/copy:
- Inspect actual placement, neighboring elements, size/stroke/fill or tone, states, contrast, semantics, and implementation/export path.
- If the requested small change cannot improve the read by itself, offer or implement the smallest surrounding surface change that can.

Docs/plans:
- Add decisions, acceptance criteria, examples, risks, and verification steps.
- Remove generic advice that cannot be acted on.

Project scaling:
- Promote reusable improvements only when they support the current outcome: component, helper, test fixture, verification harness, architecture seam, docs entry, script, or skill rule.
- Record learning that changes the next action; skip diary notes.

## Baseline Challenge

Before stopping, write a one-sentence answer to:

`A competent baseline would probably deliver X; this result is better because Y is observable in Z.`

If Y is vague, iterate. If Z cannot be inspected, add proof or lower the claim. If a real baseline is visibly better, replace the sentence with `This failed to beat the baseline because ...` and do not present the mission as successful.
