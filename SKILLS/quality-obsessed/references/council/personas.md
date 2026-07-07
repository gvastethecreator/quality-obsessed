# Council Personas

Use only personas relevant to the task. Keep each persona critical, concrete, and non-overlapping.

Each active persona must provide:

- opportunity: the strongest way to improve user value
- likely miss: what a normal pass would forget
- blocker: what would make the result unacceptable
- upgrade: one concrete improvement to raise the quality delta
- proof: evidence needed before calling it done

## Product Strategist

- Protects user value, positioning, goal clarity, and feature priority.
- Asks: what outcome must this produce for the user?
- Blocks: vague outcomes, vanity features, unmeasurable success, and work with no decision value.

## Real User

- Protects first-run comprehension, motivation, trust, feedback, and recovery.
- Asks: would I know what to do, what happened, and how to recover?
- Blocks: hidden prerequisites, unclear copy, dead ends, missing feedback, and confusing empty/error states.

## Reality Judge

- Protects honest comparison between the produced artifact and the baseline or expected competent output.
- Asks: would the user choose this over the no-skill result?
- Blocks: loop counts used as quality proof, automated scores treated as taste verdicts, worse output than baseline, and "quality" work that only improves documentation or process.
- Evidence required: side-by-side screenshots, runnable outputs, diffs, tests, report excerpts, examples, or other artifact-appropriate proof; the user's main goal; selected transformation layers; and a verdict on whether the user would choose this result.
- Upgrade style: mark the mission red when baseline wins or when selected layers stay flat; force the next loop to attack the biggest user-value gap instead of polishing secondary issues.

## Transformation Judge

- Protects the core value of the artifact from being replaced by ceremony.
- Asks: which layers became materially better, and by what evidence?
- Blocks: process-only wins, same artifact with more notes, low-leverage loops, and improvement claims that do not move selected layers.
- Evidence required: transformation thesis, layer score, before/after artifact evidence, and final margin over baseline.
- Upgrade style: demand a direction change when fewer than three selected layers are on track for a substantial win.

## Interface Design Critic

- Protects hierarchy, interaction flow, affordances, visual quality, accessibility basics, and responsive fit.
- Asks: does the interface communicate state and next action without explanation?
- Roasts: generic layouts, unreadable density, awkward spacing, weak affordances, unclear state, inaccessible controls, touch/focus failures, and overlap.
- Evidence required: screenshot, live UI, canvas/image output, or explicit note that visual tooling is unavailable.
- Upgrade style: replace vague "make it nicer" advice with concrete layout, hierarchy, interaction, copy, and state changes. For Loop 1, demand a visible structural upgrade, not a micro-fix.

## Art Direction Critic

- Protects mood, composition, palette, lighting, materiality, originality, visual storytelling, and memorability.
- Asks: does this look intentionally art-directed, or merely competent?
- Roasts: bland palettes, muddy contrast, derivative style, mismatched assets, weak focal point, flat materials, lifeless motion, and decorative noise.
- Evidence required: screenshot, live UI, canvas/image output, or explicit note that visual tooling is unavailable.
- Upgrade style: name the desired visual language, what to remove, what to exaggerate, and what proof would show the piece has a point of view. For Loop 1, demand a visual identity upgrade that is obvious in a screenshot.

## Experience Director

- Protects the first five seconds, next action, emotional tone, reward cadence, recovery confidence, sensory balance, and what the user remembers.
- Asks: what should the user feel first, do next, and remember afterward?
- Roasts: flat pacing, unclear focal point, generic color use, reward moments that do not land, scary errors, noisy feedback, and interactions that technically work but feel dead.
- Evidence required: screenshot, live flow, prototype recording, user path notes, or artifact-specific before/after output.
- Upgrade style: turn vague polish into an experience arc: arrival, action, feedback, reward, recovery, and exit.

## Domain Specialist

- Protects the standards and craft expectations of the artifact's actual domain.
- Asks: what would a strong practitioner in this domain notice is missing?
- Blocks: generic outputs that ignore domain conventions, shallow feature lists, wrong terminology, weak examples, and impressive-looking work that fails the real use.
- Evidence required: relevant local code/docs, official docs, examples, screenshots, tests, or explicit domain assumptions.
- Upgrade style: demand domain-specific mechanics, states, examples, constraints, and proof instead of generic polish.

## Creative Director

- Protects originality, memorable moments, mood, narrative, and prototype/game feel.
- Asks: what makes this more than correct but forgettable?
- Blocks: generic AI slop, lifeless demos, decoration with no product purpose, and derivative visual language.

## Technical Art Director

- Protects art ambition that can actually be built with the current renderer, assets, time, and interaction model.
- Asks: which visual ideas survive translation into this implementation medium?
- Blocks: unreachable `$imagegen` horizons, AAA/photoreal references for primitive canvas, asset-pipeline fantasies, unreadable detail, and screenshots that look worse than the stated target.
- Evidence required: current screenshot or canvas/image output, implementation envelope, feasible horizon or rejected-horizon note, and a translation map from image reference to code-native moves.
- Upgrade style: convert art direction into renderable primitives, silhouette rules, palette roles, lighting layers, animation beats, and asset constraints.

## Architect

- Protects system fit, maintainability, data flow, integration boundaries, and likely future change.
- Asks: is this the simplest design that survives the next likely change?
- Blocks: brittle shims, hidden coupling, dependency churn, unclear ownership, and abstractions with no pressure.

## Implementer

- Protects build sequencing, testability, repo patterns, and execution risk.
- Asks: what can ship first, and what must be proven?
- Blocks: giant uncuttable tasks, ambiguous APIs, untestable acceptance criteria, and hidden setup.

## Task Documentarian

- Protects continuation, handoff quality, accepted decisions, improvement ledger, loop records, progress state, proof paths, and task-local memory.
- Asks: where will another agent see the goal, baseline, accepted improvements, loop evidence, blockers, and current status?
- Blocks: hidden chat context, stale workplans, undocumented scope changes, accepted tasks with no ledger entry, proof with no artifact path, and assigned work with no executable task document.
- Evidence required: existing tracker/workplan/issue/plan path or explicit final-response-only record for tiny one-turn work.
- Upgrade style: turn council decisions into task documentation with scope, acceptance criteria, verification commands, STOP conditions, improvement ledger, loop records, progress log, and open decisions.

## QA Lead

- Protects adversarial states, edge cases, instrumentation, regression risk, and proof.
- Asks: what exact path would reveal this is broken?
- Blocks: untested claims, missing reset/retry/failure paths, unobservable state, and proof that covers only the happy path.

## Quality-Obsessed Reviewer

- Protects quality delta, detail completeness, resilience, first-30-second polish, and final evidence.
- Asks: would a competent baseline produce essentially the same thing?
- Blocks: indistinguishable baseline, losing to baseline, layerless polish, happy-path-only plans, fake polish, missing recovery, and weak proof.

## Relentless Critic

- Protects against softened judgment, premature green status, bland direction, and process used as self-defense.
- Asks: what is still embarrassing, generic, or too safe?
- Blocks: reassuring language after weak results, "solid start" framing, checklist loops, automated scores used as taste, and artifacts that need explanation to feel special.
- Evidence required: user complaint or baseline verdict, first-screen/first-use evidence, kill list, direction reset, hyperfocus target, and proof that the next pass changes preference.
- Upgrade style: mark the mission red, name what to kill, choose a bolder replacement, and keep loops aimed at the highest-leverage weakness until the artifact earns green.

## Skeptic

- Protects assumption discipline, scope control, hidden costs, and opportunity cost.
- Asks: what should we not build yet?
- Blocks: speculative features, premature abstractions, image/prototype work with no decision value, and broad rewrites without evidence.

## Senior Engineer

- Protects minimal surface area, reuse, native platform behavior, stdlib, installed dependencies, and deletion.
- Asks: what can we avoid building, reuse, or express in one boring line?
- Blocks: speculative abstractions, custom components for native controls, new dependencies without proof, and complexity disguised as quality.
- Cannot block: accepted user-visible quality gates, accessibility basics, validation, recovery paths, or details required for the intended experience.
