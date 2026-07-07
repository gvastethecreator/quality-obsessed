# Visual Analysis

Use this for UI, prototypes, games, dashboards, visual direction, art direction, and interaction craft.

Quality mode is allowed to spend more analysis. Do not compress visual critique into generic "looks good" notes. Inspect the real artifact and make decisions that raise the result.

## Evidence First

Before visual critique, collect one or more:

- Screenshot at the target desktop viewport.
- Mobile/tablet screenshot when relevant.
- Live browser inspection.
- Canvas/image output inspection.
- Existing user-supplied reference or screenshot.

If tools are unavailable, say so and use source/static inspection as weaker evidence. Do not pretend source inspection proves visual quality.

## Visual Horizon With `$imagegen`

Use `$imagegen` when visual quality is a main risk and text critique is not enough to steer a stronger result.

Use it to:

- Edit a current screenshot into a stronger target composition.
- Generate a style/atmosphere reference from the current read, target read, and implementation envelope.
- Explore 2-3 visual directions before committing.
- Create a before/target/after comparison for the implementation.

## Implementation Envelope

Before prompting `$imagegen`, write the envelope that the final artifact must actually fit:

```text
Medium/renderer:
Available primitives/assets:
Viewport/layout that must stay:
Session budget:
Must remain code-native:
Fidelity cap:
Non-goals:
```

Examples:
- Plain HTML/CSS/canvas, no external assets, one session: use silhouettes, gradients, particles, HUD framing, palette, lighting bands, and shape language. Do not ask for photoreal creatures, AAA materials, cinematic 3D, dense imported UI chrome, or impossible texture detail.
- Existing React UI, design-system components only: use hierarchy, spacing, component states, iconography, and color roles. Do not ask for a bespoke product redesign that cannot be built with the available components.

## Feasible Horizon

A horizon is accepted only when it is reachable enough to steer implementation. It should be a one-session target, not a moodboard fantasy.

Acceptance test:
- Same basic layout, viewport, information architecture, and control density as the real artifact.
- At least 70% of the visible target can be approximated with the current stack and allowed assets.
- The image's strongest ideas translate into named code moves: layout, palette roles, silhouette rules, lighting model, animation cues, component states, or debug/readability changes.
- The target improves the current read without demanding new engines, asset pipelines, copyrighted/IP assets, photoreal materials, or unsupported 3D.
- If the generated image is too ambitious, label it `rejected: unreachable`, keep only a short inspiration note, and regenerate a tighter feasible horizon before using it as proof.

Default workflow:

1. Capture or locate the current screenshot.
2. Inspect it with `view_image` so the actual artifact is visible.
3. Invoke `$imagegen` using built-in image editing/generation mode.
4. Prompt for a reachable reference image, not a final code substitute. Preserve the product/game/layout constraints and the implementation envelope that must remain real in HTML/CSS/canvas/native UI.
5. Save the selected visual horizon under project proof/output, for example `prototypes/output/visual-horizons/<slug>-target.png`.
6. Write a translation map from the horizon into concrete implementation moves.
7. Implement toward the target using native code/assets in the project.
8. Capture the after screenshot.
9. Compare current screenshot vs feasible horizon vs after screenshot. If the after screenshot still reads poor or far from the target, the visual loop remains open.

Prompt shape:

```text
Use case: ui-mockup or stylized-concept
Asset type: visual horizon reference for implementation
Input image: current screenshot as edit/reference target
Current read: ...
Target read: ...
Implementation envelope: <renderer, allowed primitives/assets, viewport, session budget, fidelity cap>
Keep: information architecture, core controls, required states, readable text zones
Improve: hierarchy, art direction, palette roles, focal point, code-native materiality, rhythm, visual feedback
Avoid: adding impossible product features, copyrighted IP, fake UI text, unreadable detail, decorative clutter, photoreal/AAA detail unless the stack supports it
Output: a clearer target screenshot/reference that the current code implementation can plausibly approximate in this session
```

The horizon is useful only if it changes decisions. If the generated reference is not clearly better or not implementable, reject it or iterate once with a sharper prompt.

## Visual Read

Write a short visual read before fixing:

```text
Current read:
Target read:
Audience/genre expectation:
Strongest visual asset:
Weakest visual liability:
Do not look like:
Visual horizon reference:
Implementation envelope:
Horizon translation map:
```

For games/prototypes, include moment-to-moment read: what the player notices first, where the eye goes next, what looks interactive, what looks dangerous/safe, and what feels rewarding.

## Color And Experience Direction

For visual/UI/prototype/game work, do not inherit colors by accident. Define:

```text
Palette roles:
- background:
- surface/chrome:
- primary action:
- reward/success:
- danger/friction:
- data/debug:
- disabled/quiet:
Material language:
Motion/feedback rhythm:
First-five-second experience:
```

If the artifact reads as a generic dark UI, bland cards, one-note palette, or default canvas demo, run at least one direction pass before smaller polish. Explore 2-3 materially different directions when the first direction is weak or the user is comparing quality modes. Vary structure, color roles, shape language, feedback, and pacing; do not merely swap accent colors.

## Critique Axes

Interface Design Critic:
- hierarchy, layout, spacing, density, alignment, controls, affordances, state clarity, responsive fit, focus/touch.

Art Direction Critic:
- composition, silhouette, palette, contrast, lighting, materiality, rhythm, originality, mood, animation personality, visual memory.

Interaction/Game Feel Critic:
- input feel, feedback, readability under motion, timing, anticipation, impact, reward, fairness, recovery.

Experience Director:
- first impression, next action, emotional tone, reward cadence, recovery confidence, sensory balance, and what the user remembers.

## Fix Standard

A visual fix must name:

```text
Weakness:
Evidence:
Design decision:
Change:
Before/horizon/after proof:
Why better:
```

For visual/UI/game artifacts, at least one early fix must be visible in a screenshot without reading text. If the before/horizon/after comparison looks nearly identical, the fix is too weak.

## Upgrade Moves

Use these to produce real deltas:

- Establish a stronger focal hierarchy: make the primary action/state visually dominant.
- Pick a visual language: e.g. instrument panel, neon storm, paper tactical map, toy diorama, cockpit HUD, editorial black-and-white, arcade candy, industrial console.
- Improve silhouette and shape language so interactive/danger/reward elements read at a glance.
- Reduce generic filler: remove vague panels, fake metadata strips, weak headings, noisy decoration, and repeated neutral boxes.
- Add stateful feedback: impact, success, danger, disabled, pending, recovery, and finish states.
- Tighten palette roles: background, primary action, danger, reward, neutral chrome, debug.
- Improve motion purpose: anticipation, impact, continuity, not random movement.
- Fix mobile and dense layouts so primary controls remain reachable and text does not crowd the core artifact.

## Stop Rule

Do not finish visual work until:

- Current read and target read are written.
- A visual horizon reference exists when the target is ambitious or hard to compare from prose alone, or the lack of imagegen/tooling is reported.
- Interface Design Critic and Art Direction Critic each have at least one concrete finding.
- At least one major finding from each critic is fixed or explicitly scoped out.
- Before/horizon/after evidence exists, or lack of visual tooling is reported as a verification limit.
- The horizon is feasible for the actual implementation medium, or an unreachable horizon was rejected and replaced with a tighter target.
