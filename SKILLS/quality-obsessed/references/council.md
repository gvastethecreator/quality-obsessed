# Quality Council

Turn a rough prompt, project, prototype, or plan into an execution-grade quality brief. The council is not brainstorming theater; it must expose tradeoffs, roast weak design/art choices, force useful disagreement, and produce a quality delta a builder can verify. When the user invites ambition, it should find the stronger outcome behind the literal request and brief that superior version. When the user says the result is poor, bland, conformist, softened, or not obsessive enough, the mission starts red and must enter recovery, not reassurance.

## Process

1. Frame the mission with evidence.
   - Classify mode: new plan, review/improvement, build execution, or execution packet.
   - Restate intent, audience, artifact type, constraints, success criteria, baseline to beat, and expected proof.
   - Distinguish literal request from underlying user outcome; identify where an ambition escalation could beat the literal artifact.
   - Classify documentation duty: final-response record, active task doc, improvement ledger, loop ledger, handoff plan, architecture workplan, issue, or existing tracker update.
   - Classify mission-control duty: final-response objective, active mission record, durable plan, or existing project tracker.
   - Read `references/council/adjacent-impact-audit.md` for any quality mission; define the named target, immediate surface, adjacent surfaces, analogous cases, proof nearby, safe expansion boundary, and ask-before-crossing line.
   - Define the quality stack needed to execute: domain/build skill, critique skill, verification/proof skill, and horizon/reference skill.
   - Define the exceptional bar: target level, signature moves, experience direction, and failure condition.
   - Read `references/council/relentless-critic.md` when the user criticizes a result as poor, bland, conformist, softened, not creative, or not obsessive enough.
   - Read `references/council/advisor-autonomy.md` when the user asks the agent to decide, challenge the request, use `improve`, operate autonomously, or hand work to another agent.
   - Read `references/council/ambition-escalation.md` when the user asks for standout quality, permits broader scope, or the literal artifact would be competent but forgettable.
   - Read `references/council/mission-control.md` when work is iterative, quality-gated, ambitious, resumable, or should improve the broader project while executing.
   - For existing work, inspect available code, docs, screenshots, running UI, logs, or artifacts before judging when practical.
   - For visual/UI/prototype/game work, visual critique must cite screenshots, live UI, canvas/image output, or a reported lack of visual tooling.
   - For assigned, delegated, resumable, multi-slice, risky, or quality-gated work, locate the repo's existing task documentation path and improvement ledger before writing the plan.
   - Done when the council knows what must become real, what evidence it has or lacks, and where the task will be documented.

2. Select the council.
   - Read `references/council/personas.md` before selecting personas.
   - Use the smallest council that covers the risk: Product Strategist, Real User, Implementer, Reality Judge, Transformation Judge, Quality-Obsessed Reviewer, Skeptic, and Ponytail are the common core.
   - Add Relentless Critic when recovery mode applies, target level is 5, or previous quality work failed to differentiate.
   - For assigned, resumable, multi-slice, delegated, or AFK work, include Task Documentarian.
   - For UI, prototype, game, visual, brand, interaction, product surface, dashboard, or design work, include Interface Design Critic, Art Direction Critic, and Experience Director.
   - Add Creative Director, Technical Art Director, Domain Specialist, Architect, or QA Lead when the task needs them.
   - Use real subagents only when the user requested delegation and the active tool policy allows it; otherwise simulate distinct personas internally.
   - Done when every active persona has a different responsibility, blocker type, and evidence target.

3. Run divergence.
   - Each persona gives: strongest opportunity, likely miss, blocker, quality upgrade, and proof needed.
   - Reality Judge compares against the baseline or expected competent output and can mark the mission red.
   - Define the transformation thesis: selected artifact-specific layers, required margin over baseline, evidence, and failure condition.
   - Run the adjacent impact audit: ask what nearby root cause, analog, state, asset, doc, test, or workflow would make a narrow answer feel negligent.
   - For UI/prototype/game/visual work, run a roast pass from evidence: Interface Design Critic attacks usability, hierarchy, layout, interaction, and accessibility; Art Direction Critic attacks mood, composition, palette, materiality, originality, and visual memorability.
   - Experience Director attacks first-five-second read, next action, reward cadence, recovery confidence, and sensory pacing.
   - Each roast must name current read, target read, gap, concrete fix, and before/after proof needed.
   - If the target read is hard to judge from prose, require a feasible `$imagegen` visual horizon: current screenshot edited/generated into a stronger target reference inside the actual implementation envelope.
   - Run an ambition ladder: better literal, expanded depth, stronger product, signature leap, showcase result; reject expansions that do not serve the user outcome or cannot be proved.
   - When `advisor-autonomy.md` applies, convert critique into vetted findings with evidence, impact, effort, risk, confidence, fix sketch, and rejected alternatives.
   - Force at least one disagreement about ambition vs scope, craft vs implementation cost, or user value vs novelty.
   - When `relentless-critic.md` applies, run the failure diagnosis, kill list, direction reset, and hyperfocus target before accepting the next direction.
   - Do not let Ponytail veto accepted user-visible quality gates; use Ponytail to cut waste after the bar is set.
   - Done when the quality risks and scope tensions are explicit.

4. Converge into decisions.
   - Read `references/council/quality-contract.md` before resolving the council into a build or review direction.
   - Resolve disagreements into accepted gates, cuts, defaults, and tradeoffs.
   - Ask the user only for choices that would materially change scope, direction, risk, or user satisfaction; otherwise choose a default and label the assumption.
   - Produce one recommended decision, not a menu. Include rejected options only with reasons.
   - Define 3-5 quality bets mapped to the selected transformation layers and the proof that will show they landed.
   - Define 2-4 signature moves, including at least one ambition leap when scope expansion is allowed, that make the result feel beyond a competent baseline.
   - For recovery mode, the recommended decision must either reset direction or explicitly prove why the old direction can still beat the baseline.
   - Define color/material/pacing decisions when the artifact has a visual or experiential surface.
   - Define the Loop 1 foundation lift: the first iteration's major cross-axis upgrade before any smaller loop can count.
   - Produce a Quality Contract with baseline, target, mission control, ambition escalation, layers, signature moves, quality stack, documentation path, improvement ledger, loop checkpoint cadence, scope, verification, reality verdict gate, and STOP conditions.
   - Include adjacent audit decisions: inspected surface, accepted nearby improvements, offered bigger moves, deferred items, and safe expansion boundary.
   - Done when a builder would not need to reinvent the brief, guess what "better" means, or guess where task state lives.

5. Produce the right artifact.
   - Read `references/council/task-documentation.md` before writing a task, plan, handoff, execution packet, or resumable work item.
   - Read `references/council/output-contract.md` before writing question rounds, reviews, plans, prototype briefs, or execution packets.
   - For new work, include baseline, quality delta, deliverables, acceptance criteria, implementation slices, cuts, risks, and verification.
   - For reviews, include evidence, critical issues, missed opportunities, design/art roast, council disagreement, priority improvements, and next slice.
   - For advisor-style outputs, include vetted findings, rejected options, decision, self-contained execution plan, verification gates with expected results, and STOP conditions.
   - For assigned or resumable tasks, create or update the task documentation before handoff or execution; prefer existing repo trackers/workplans/plans over new parallel docs.
   - Task documentation must include goal, mission control, baseline, Quality Contract, improvement ledger, loop records, scope, steps, acceptance criteria, verification, proof artifacts, STOP conditions, progress, learning, and open decisions.
   - Accepted improvements, tasks, cuts, risks, and follow-ups must be ledger entries with status, evidence, proof needed, and next action; do not leave them only in chat.
   - For long, AFK, multi-agent, or session-spanning execution, recommend `planning-with-files` as the durable execution layer.
   - Done when the output has decisions, not just options, and the task document can be executed without this chat.

6. Execute only with alignment.
   - If the user asked for planning/review, stop at the council output.
   - If the user asked to build, proceed once critical questions are answered or safe defaults are chosen.
   - When execution follows, use `quality-obsessed` gates: quality stack, exceptional bar, quality delta, red-team matrix, craft pass, Loop 1 foundation lift, 10-loop mission record, baseline challenge, and proof.
   - Done when the next action matches consent and has a checkable definition of done.

## Hard Gates

- No generic council: every persona must add a distinct blocker, upgrade, or proof requirement.
- No plan without baseline to beat, quality delta, cuts, and verification.
- No assigned, delegated, resumable, risky, or multi-slice task without task documentation.
- No task documentation that depends on hidden chat context; it must contain scope, steps, acceptance, proof, STOP conditions, and progress state.
- No accepted improvement, task, cut, risk, or follow-up without a ledger entry unless the work is tiny enough for final-response-only documentation.
- No looped execution handoff without loop record location, checkpoint cadence, and next open item.
- No iterative/ambitious mission without mission-control state: objective, current loop, next action, expected proof, learning, project improvement, and STOP conditions.
- No new parallel planning docs when the repo already has an accepted tracker, workplan, issue, or `plans/` convention.
- No quality plan without a quality stack: domain/build, critique, proof, and reference/horizon lanes must be selected or explicitly skipped.
- No quality plan without an adjacent impact audit covering root cause/underlying need, immediate surface, analogous cases, proof, and expansion boundary.
- No exceptional-quality plan without target level, signature moves, and failure condition.
- No baseline-comparison plan without a reality verdict gate: `quality wins`, `tie`, `baseline wins`, or `failed/no evidence`.
- No quality handoff without a Quality Contract a later executor can consume.
- No quality plan without transformation layers, required margin, and failure condition.
- No literal-minimum plan when the user explicitly invites superior scope; include an ambition escalation or state the constraint that blocks it.
- No scope expansion without user-outcome fit, proof, cuts, and fallback.
- No narrow literal fix when the surrounding impact surface shows a bounded higher-value improvement.
- No visual/UI/game plan without Interface Design Critic and Art Direction Critic roast.
- No visual/UI/game plan with image generation unless the council states the implementation envelope and rejects unreachable concept-art targets.
- No visual roast from imagination when screenshots, live UI, or canvas/image proof are available.
- No vague visual target: when quality depends on look/feel and prose is insufficient, require a `$imagegen` visual horizon plus before/horizon/after comparison.
- No visual plan without color/material/pacing decisions and an experience-direction critique.
- No fake consensus: disagreements must be resolved or explicitly left as user decisions.
- No "ask everything": choose safe defaults unless the answer would materially alter the result.
- No generic options dump: output must contain a recommended decision and rejected alternatives with reasons.
- No unvetted finding in an advisor-style brief: evidence, impact, effort, risk, confidence, and fix sketch are required.
- No handoff or execution packet without self-contained context, exact scope boundaries, verification with expected results, done criteria, and STOP conditions.
- No quality theater: recommendations must be observable in the artifact, tests, screenshots, docs, or final proof.
- No process-as-success: council/loops/imagegen do not matter if the actual artifact is worse than baseline.
- No layerless polish: quality bets must change core user-value layers, not only surrounding commentary, telemetry, or proof.
- No softened recovery: when the user says the result is poor, bland, conformist, or not obsessive enough, mark the mission red, diagnose the failure, and change the direction or state why it failed.
- No comfort language for failed quality work: do not call a red result "solid", "promising", or "good progress" unless the status remains explicitly red.
- No loop-as-personality: obsession must show up as artifact-changing loops, kill decisions, baseline challenges, and final honesty.

## Reference Files

- `references/council/personas.md`: read before selecting or simulating council personas.
- `references/council/adjacent-impact-audit.md`: read for any quality mission to inspect nearby surfaces, root cause, analogous cases, proof, and safe expansion.
- `references/council/relentless-critic.md`: read when the user reports blandness, conformity, softness, weak creativity, or insufficient obsessive critique.
- `references/council/advisor-autonomy.md`: read when the user asks for autonomous decision-making, `improve`-style planning, challenge, or executor-grade handoff.
- `references/council/ambition-escalation.md`: read when the user asks for exceptional quality, broader scope, or a result that should beat the literal ask.
- `references/council/mission-control.md`: read when work needs goal-like state, constant iteration, project improvement, learning, or resumable control.
- `references/council/quality-contract.md`: read before producing build/review direction, task docs, execution packets, or quality-gated handoffs.
- `references/council/task-documentation.md`: read before creating, assigning, resuming, or handing off task work.
- `references/council/output-contract.md`: read before writing question rounds, reviews, final plans, prototype briefs, or execution packets.
