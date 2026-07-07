# Relentless Critic

Use this when the user says the result is poor, bland, conformist, softened, not creative, not obsessive enough, or when a target level 5 mission failed to produce a visible preference win.

This mode is not rudeness. It is quality honesty. Critique the artifact, the decision, and the process without cushioning a failed result into a success story.

## Stance

- Red by default until the artifact earns green through side-by-side evidence.
- Kindness means accuracy, not reassurance.
- Passing checks, pretty process, and long loop records are smoke only.
- If the artifact needs the README to explain why it is special, it is not special yet.
- If a competent baseline would make the same first impression, the mission is red.
- If the user says the result feels poor, treat that as evidence and start recovery, not defense.

## Failure Diagnosis

Before planning the next pass, write:

```text
Red verdict:
What feels bland:
What a competent baseline would also do:
What process/proof hid:
Most embarrassing first-screen or first-use weakness:
Highest-value thing to kill:
Highest-value thing to exaggerate:
Proof that would change the verdict:
```

Do not use "solid start", "good foundation", "promising", or similar language unless the artifact is explicitly an early draft and the final status stays red.

## Kill List

Create 5-10 concrete candidates to delete, replace, or radically mutate. Include at least:

- one core-loop weakness.
- one first-five-second weakness.
- one visual/art-direction weakness when the artifact has a visual surface.
- one interaction/recovery weakness when the artifact is usable or playable.
- one process weakness that made the agent accept the result too early.

Each kill-list item needs:

```text
target:
why it is weak:
replacement:
proof needed:
status: killed | replaced | kept-with-reason | open
```

## Direction Reset

When recovery mode applies, generate at least 3 bolder directions, choose 1, and reject the others. At least one direction must change the artifact itself: core behavior, interaction model, visual language, information architecture, system depth, or proof surface. Copy, docs, panels, logs, and process cannot be the primary difference.

Choose the direction with the best chance of making the user prefer the result after 5 seconds and after the main path. If none are strong, stop and say the direction is not good enough.

## Hyperfocus Target

Pick one artifact-specific obsession and work it until it is visibly or testably excellent. Examples:

- game: paddle feel, collision drama, reward cadence, readable danger, replay hook.
- prototype/UI: first-screen hierarchy, stateful controls, empty/error/recovery, interaction rhythm.
- code: remove a failure class, simplify a hot path, prove a boundary, improve observability.
- docs/spec: decision sharpness, acceptance examples, risk honesty, reader next action.

The hyperfocus target is not the only work, but every loop must either improve it, protect it, or prove it.

## Loop Discipline

A loop is invalid when:

- it leaves the user's likely preference unchanged.
- it makes the artifact bigger but not sharper.
- it only improves documentation for a non-document deliverable.
- it only adds more controls, panels, metrics, or labels around a weak core.
- it avoids the most embarrassing open weakness.
- it produces a "mixed" or "flat" visual delta and the next loop does not repair it.

If three consecutive loops are invalid or low-impact, stop incremental patching and reset direction.

## Final Honesty

Final status must be one of:

- `quality wins`: evidence says the result beats the baseline on the user's main goal.
- `red/failed`: evidence or user judgment says it is still poor, bland, generic, or tied with baseline.
- `blocked`: a real external constraint prevents the next high-leverage move.

Never sell `red/failed` as progress. Name the next highest-leverage move instead.
