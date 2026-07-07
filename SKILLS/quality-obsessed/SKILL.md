---
name: quality-obsessed
description: "Quality-delta execution with adjacent audits, critique loops, task docs, baseline challenge, resilience, and proof."
---

# Quality Obsessed

Create a quality delta: a visible or testable improvement a reviewer can name. This skill is not "be thorough" or token-saving; it spends the analysis needed to inspect the real artifact, choose a stronger direction, force ambition, red-team coverage, craft, iterative critique, and evidence while staying inside the user's intent. When the user permits broader scope, expand toward the superior version with proof, cuts, and fallback. When the user says the result is poor, bland, conformist, softened, or not obsessive enough, the mission is red until the artifact earns a preference win.

## Process

1. Assemble the quality stack.
   - Read `references/skill-orchestration.md` for substantial quality work or any task spanning UI, code, product, game, docs, data, workflow, visual design, or verification.
   - If a council pass produced a Quality Contract, consume it as the execution source. If not, read `references/council/quality-contract.md` and write the minimum contract before broad work.
   - Read `references/council/adjacent-impact-audit.md` for every quality mission; quality execution must inspect the named target plus the surrounding impact surface before final status.
   - Read `references/council/advisor-autonomy.md` when the user named `improve`, asked for autonomy, asked the agent to challenge the request, or the work needs a self-contained execution plan.
   - Read `references/council/ambition-escalation.md` when the user asks for standout quality, permits broader scope, or the literal artifact would be competent but forgettable.
   - Read `references/council/mission-control.md` for iterative, quality-gated, ambitious, resumable, or project-improving work.
   - Read `references/council/relentless-critic.md` when the user reports a poor/bland/conformist/soft result or asks for obsessive, hyperfocused critique.
   - Select the mission/domain skill, craft/critique skill, verification/proof skill, and reference/horizon skill needed to beat the baseline.
   - Use named user skills first, then add only the smallest set of relevant domain skills that can change the artifact.
   - Done when the stack is declared, each selected skill has a job, the Quality Contract names baseline/layers/proof/STOP conditions, advisor-autonomy fields are present when needed, and no obvious domain/proof skill is skipped without a reason.

2. Set the floor, ceiling, and exceptional bar.
   - State the user's goal, target user, first-use path, main success path, recovery path, constraints, and proof needed.
   - Read `references/council/task-documentation.md` before executing assigned, resumable, multi-slice, risky, or quality-gated work.
   - Create or update the task document before implementation when work will be handed off, resumed, delegated, split into slices, or judged by quality gates; prefer the repo's existing workplan, tracker, issue, `plans/`, or durable planning convention.
   - The task doc must include goal, mission control, baseline, Quality Contract, improvement ledger, loop records, scope, out-of-scope, steps, acceptance criteria, verification, proof artifacts, STOP conditions, progress, learning, and open decisions.
   - Define the floor: the competent no-skill result this work must beat.
   - Define the ceiling: the strongest version that fits the user's outcome, including justified scope expansion when allowed.
   - Define the adjacent audit: immediate surface, root cause or underlying need, analogous cases, nearby tests/proof, safe expansion boundary, and ask-before-crossing line.
   - When advisor autonomy applies, write or update a self-contained execution plan with vetted findings, rejected options, recommended decision, exact scope, verification expected results, done criteria, and STOP conditions before major implementation.
   - Read `references/exceptional-bar.md` when the user asks for quality, polish, professional finish, a baseline win, or the skill was invoked after weak differentiation.
   - Set the target level, signature moves, experience direction, color/material/pacing choices, and cuts before Loop 1.
   - If relentless recovery applies, write the red verdict, kill list, direction reset, and hyperfocus target before Loop 1; do not patch the old direction incrementally until it survives that reset.
   - Read `references/transformation-gate.md` for broad, creative, product, UI, code, docs, workflow, report, or baseline-comparison work.
   - Write a transformation thesis: which 3-5 core layers must become materially better than baseline, the required margin, and the evidence that will prove it.
   - Pick 3-5 quality bets that target those layers: deeper interaction, richer state coverage, sharper hierarchy, domain-specific detail, better copy, better accessibility, better debug/inspection, safer code, stronger proof, or better decision value.
   - Pick at least one ambition bet when scope expansion is allowed: a signature capability, interaction, visual direction, system depth, or decision surface that a competent literal pass would not include.
   - For visual/UI/prototype/game work, define the target read: what the result should feel like at first glance, what it should not look like, and which visual/interaction evidence will prove it.
   - Done when the delta is not just "more work": a reviewer can inspect the selected layers in the artifact, tests, screenshots, running UI, report, docs, or final notes, and the task doc says how to continue safely.

3. Build the real slice with ambition.
   - Make the real path work before polish; avoid mock-only shells unless mock-only was requested.
   - Build an elevated first slice, not a raw MVP. The first playable/usable version should already show core behavior, visual direction, recovery path, and proof hooks.
   - Land the ambition bet early enough that it can be judged, cut, or replaced before final proof.
   - Build enough depth for the chosen quality bets to be real, not described.
   - For narrow requests, fix the named target and the highest-value bounded adjacent issue: bug root cause/analog, nearby state, surrounding UI, asset context, doc contradiction, workflow recovery, or test gap.
   - Execute the recommended decision from the advisor brief; do not drift into unchosen options unless proof invalidates the plan and mission control is updated.
   - For UI/prototype/game work, include at least one bet in interaction depth, one in visual/craft detail, and one in recovery/debug/proof when relevant.
   - Identify one project-scale improvement opportunity and either land it when it supports the current outcome or record why it is deferred.
   - Done when a user can complete the main path through actual behavior and the result is visibly stronger than a placeholder or competent first pass.

4. Red-team the surface.
   - Enumerate relevant states, controls, inputs, edge values, failure/recovery paths, empty/loading/error cases, permissions, long content, disabled states, timing, and persistence limits.
   - For bugs, enumerate root cause, analogous paths, call sites, regression proof, and recovery/logging if trust is affected.
   - For icon/asset tweaks, inspect actual placement, neighboring assets, states, alignment, contrast, accessibility labels where relevant, and export/theming path.
   - For docs/workflows/code, inspect nearby contradictions, callers, fixtures, retries, idempotency, or reader/operator next action as relevant.
   - For every visible control, implement real behavior or label it as a noninteractive test case.
   - Fix issues that would embarrass the first 30 seconds, recovery from failure, mobile/tablet use, keyboard/touch use, or assistive tech basics.
   - Done when the feature does not collapse outside the happy path and one meaningful edge/recovery path has been exercised.

5. Run the craft pass.
   - Check affordances, copy, hierarchy, spacing, typography, density, feedback, transitions, focus, accessible names, overflow, performance risks, and layout fit.
   - Remove generic filler. Add domain-specific details that help the user judge the work: landmarks, states, motion cues, instrumentation, comparison hooks, constraints, or inspection surfaces.
   - For visual/UI/prototype/game work, inspect color roles, composition, interaction pacing, reward/error feedback, and the first five-second read; fix generic palettes or bland experience direction before minor polish.
   - For visual/UI/prototype/game work, read `references/visual-analysis.md`, inspect real screenshots or the live artifact when tools are available, create a feasible visual horizon with `$imagegen` when a stronger target would guide the work, and fix the highest-impact visual/interface gaps before final proof.
   - For broad UI, prototype, game, product, or indistinguishable-baseline risk, read `references/quality-delta.md` and apply the scorecard.
   - Done when the result feels deliberately designed for its use, not just assembled.

6. Run the mission loop.
   - For any substantial mission, broad UI/prototype/game/product task, or quality-sensitive implementation, read `references/iteration-loop.md`.
   - Create a critique backlog before counting loops: default target is at least 30 concrete weaknesses or risks when the user does not set budget/time/loop count; use at least 10 only for explicitly smaller work, and do not pad weak items.
   - In relentless recovery, seed the backlog with the failure diagnosis and kill list; the first valid loop must attack the most embarrassing user-visible weakness or reset the direction.
   - Seed the backlog from vetted findings when advisor autonomy applies; each item must keep evidence, impact, effort, risk, confidence, and rejected alternatives where relevant.
   - Seed the improvement ledger from the backlog before Loop 1; each accepted task, cut, risk, or follow-up needs status, evidence, proof needed, and next action.
   - Maintain mission-control state each loop: objective, current loop, highest-leverage item, next action, expected proof, learning, project opportunity, and STOP conditions.
   - Loop 1 must be a foundation lift: multiple material changes that make the artifact obviously stronger before smaller iterations begin.
   - When the user does not specify a limit, run at least 30 valid critique/fix loops when meaningful weaknesses remain; this is a floor, not a cap.
   - At Loop 30, evaluate continuation like a goal: keep looping while high-leverage improvements remain, ask the user only when the next useful loop requires a scope/time decision or value is uncertain, and stop only with a no-padding or blocker verdict.
   - Each counted loop must start from a backlog item or newly discovered weakness, update mission control and the improvement ledger, make a material improvement or produce hard proof, and record before/after evidence.
   - If three consecutive loops do not change likely user preference, stop incremental work, mark the direction red, and choose a bolder direction or report failure.
   - Done when the explicit user target or default 30-loop floor is satisfied, the continuation verdict is recorded, mission control and the ledger are current, at least 60% of counted loops changed the artifact or implementation materially, at least 3 selected transformation layers are substantially better, and every blocking finding is fixed or explicitly scoped out.

7. Challenge the baseline.
   - Compare the actual artifact against the competent no-skill baseline or a real baseline artifact when one exists. Use side-by-side screenshots, runnable flows, or concrete output evidence.
   - Ask: would the user choose this result over the baseline for the main goal?
   - If the baseline wins or ties on first impression, visual impact, playability/usability, clarity, delight, or the user's stated priority, mark the mission red and fix the highest-leverage weakness before counting completion.
   - If the quality result beats the literal baseline but lacks a signature leap after the user invited broader scope, keep iterating or report that the ambition target was not met.
   - If the user already called the prior result poor, a tie is a failure; do not soften it into a partial win.
   - If yes, iterate on depth, polish, resilience, evidence, art direction, or usefulness instead of adding decorative complexity.
   - If the requested scope prevents a bigger delta, state that limit explicitly.
   - Done when a skeptical reviewer would choose the quality result over the baseline on the main goal, or the final status honestly says it failed to beat the baseline.

8. Verify and package evidence.
   - Run build/dev/manual flow/test as practical, including the main path and one meaningful edge/recovery path.
   - For UI/prototype/game work, capture representative desktop and mobile/tablet proof when tools are available.
   - Update the task doc with final status, proof artifacts, reality verdict, skipped checks, remaining tradeoffs, deferred work, mission-control reconciliation, and ledger reconciliation.
   - Final response names the quality delta, adjacent audit result, loop count, proof, task doc path, skipped checks, mission status, learning, project improvement, ledger status, and remaining tradeoffs.
   - Done when status matches evidence and task documentation is current.

## Hard Gates

- No indistinguishable baseline: if it looks like a normal competent pass, keep improving or state the scope limit.
- No solo quality stack on multi-surface work: if a relevant domain, critique, or verification skill exists and is skipped without reason, the mission is under-briefed.
- No execution without a Quality Contract for substantial, assigned, multi-surface, review-sensitive, or baseline-comparison work.
- No autonomous execution without an advisor-grade decision record when the user asked to use `improve`, challenge the request, or decide the stronger path.
- No quality execution without adjacent impact audit: named target, root cause or underlying need, immediate surface, analogous cases, proof, and expansion boundary.
- No bug fix that only patches the visible symptom when nearby root cause, analogs, tests, or recovery are practical to inspect.
- No icon/asset tweak that ignores surrounding UI, neighboring assets, states, alignment, contrast, or actual use context.
- No small improvement that refuses a bounded higher-value adjacent fix merely because the user named a small object.
- No assigned, resumable, delegated, multi-slice, risky, or quality-gated execution without task documentation.
- No stale task docs: final status, proof artifacts, reality verdict, deferred work, and blockers must be reflected before done.
- No undocumented accepted improvements, tasks, cuts, risks, or follow-ups in substantial work; they must live in the repo tracker/task doc or final-response record.
- No stale loop ledger: each counted loop must reconcile the source item, before/after evidence, proof, status, and next action.
- No stale mission control: objective, loop state, next action, proof, learning, project improvement, and STOP conditions must stay current.
- No blind endless iteration: there is no fixed max, but each loop must improve the artifact/project or produce proof that changes the next decision.
- No docs-as-quality: documentation supports execution and continuity; it does not count as artifact transformation unless the deliverable is documentation.
- No ordinary-good stop: when the target level is 4 or 5, a merely competent or tidy artifact is red even if it passes tests.
- No literal-minimum completion when the user permits broader scope or asks for standout quality; the artifact must include a proved ambition leap or an explicit failed/scoped-out ambition record.
- No same artifact with extra ceremony: if the main artifact is basically the same as baseline and only the plan, README, logs, comments, panels, or process grew, the mission failed.
- No losing to baseline: if a no-skill or competent baseline artifact is better on the user's main goal, the quality mission is red regardless of loop count, docs, or automated scores.
- No happy-path-only completion.
- No mock-only completion unless mock-only was requested.
- No decorative polish as a substitute for behavior, state coverage, or proof.
- No scope creep as a substitute for quality: added scope must improve the main outcome and survive proof.
- No unbounded heroics: ask before crossing product direction, durable architecture, new dependencies, data/security boundaries, spending, release/versioning, or broad rewrites.
- No imagined visual critique: visual, game, prototype, or UI claims require screenshot/live-artifact evidence when tools are available.
- No blind implementation against prose when visual quality is the gap: use a visual horizon reference when the target read is unclear, ambitious, or hard to compare from text alone.
- No unexamined visual language: for visual work, color, composition, motion/feedback rhythm, and experience arc must be deliberate and inspected, not inherited by accident.
- No unreachable horizon: an image reference that exceeds the current medium, stack, asset budget, or session scope is rejected as inspiration, not accepted as the target.
- No automated-score-only quality: lint, audit, screenshot presence, or a `100` review score is a floor; if visual inspection still reads poor, generic, or embarrassing, the loop is not done.
- No false green: do not claim a quality delta when the artifact fails a side-by-side reality verdict. Report `failed to beat baseline` instead.
- No self-certification: the same agent cannot turn a weak artifact green with its own optimistic prose. Evidence must survive the reality verdict and selected transformation-layer checks.
- No self-soothing: when the user reports a poor/bland/conformist/soft result, start from red, name the failure, and change the artifact or direction before claiming progress.
- No comfort-close for failure: final status must say `red/failed`, `blocked`, or `quality wins`; do not bury failure under "solid progress" language.
- No hyperfocus theater: an obsession target must be named and materially improved or protected by each valid loop in recovery mode.
- No plan drift: if execution stops matching the recommended decision, update the advisor brief, record the rejected path, or stop for a material user decision.
- No missed transformation gate: broad quality work must improve selected core layers with a clear margin, or state `tie/no meaningful delta` or `failed to beat baseline`.
- No empty iteration theater: a loop counts only with a lens, user-impact weakness, action, before/after evidence, and remaining concern.
- No loop-count padding: copy-only, README-only, proof-only, or "verified no issue" loops are capped by `references/iteration-loop.md` and cannot be used to hit 30.
- No low-value loop while a major quality blocker remains: loops must attack the highest-impact open weakness before minor polish or bookkeeping.
- No "more code equals quality"; keep implementation lean while preserving the delta.
- Do not let terse progress, Ponytail, or smallest-sufficient wording shrink accepted quality gates.

## Reference Files

- `references/council.md`: read when a prompt, project, review, or plan needs the council brief before execution.
- `references/council/quality-contract.md`: read when a council contract is missing, stale, or too vague for execution.
- `references/council/adjacent-impact-audit.md`: read for any quality mission to inspect root cause/underlying need, nearby surfaces, analogous cases, proof, and safe expansion.
- `references/council/relentless-critic.md`: read when prior output felt poor, bland, conformist, softened, or insufficiently obsessive.
- `references/council/advisor-autonomy.md`: read when the user names `improve`, asks for autonomous decision-making, or the task needs an executor-grade plan.
- `references/council/task-documentation.md`: read before assigned, resumable, delegated, multi-slice, risky, or quality-gated work.
- `references/skill-orchestration.md`: read before substantial quality work to select domain, critique, verification, and horizon skills instead of running quality as a solo checklist.
- `references/exceptional-bar.md`: read when the user wants polish, professional finish, a clear baseline win, "lucirse", or a superior-model quality delta.
- `references/quality-delta.md`: read for broad, creative, UI, prototype, game, product, review-sensitive, or baseline-comparison work.
- `references/transformation-gate.md`: read for any substantial quality mission, especially when the result must be meaningfully better than a competent baseline across artifact-specific layers.
- `references/iteration-loop.md`: read for substantial missions, broad UI/prototype/game/product work, or any task where the user asks for completeness, polish, professional quality, or iteration.
- `references/visual-analysis.md`: read for UI, visual, prototype, game, art direction, interaction craft, dashboard, landing page, or any artifact where visual quality matters.
