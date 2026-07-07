# Exceptional Bar

Use this when the user asks for quality, polish, professional finish, "lucirse", a superior result, or a clear win over baseline.

Quality mode is preference mode. Correct is the floor. The mission is to produce an artifact a skeptical reviewer would prefer.

## Impact Ladder

Set the target level before building:

1. Correct: works, but plain.
2. Competent: covers the obvious path.
3. Polished: clear, tidy, verified.
4. Memorable: has a strong point of view, domain-specific depth, and visible craft.
5. Superior: feels like a stronger model made it; richer decisions, sharper criticism, better taste, and fewer missed details.

Default target:

- ordinary quality request: level 4.
- baseline comparison, "quality-obsessed", "lucirse", explicit scope expansion, user reports bland/conformist/poor output, or repeated failure to differentiate: level 5.
- narrow bugfix: level 3 unless the user asks for broader quality.

Do not stop at level 3 when the target is 4 or 5.

## Bar Statement

Before Loop 1, write:

```text
Target level:
Baseline would likely:
Ordinary good would:
Exceptional read:
Signature moves:
- ...
Ambition leap:
Experience arc:
Color/material/pacing choices:
Tradeoffs/cuts:
Impossible fantasies rejected:
```

`Signature moves` are 2-4 concrete choices a normal competent pass probably would not include. When the user permits broader scope, one signature move should be an ambition leap: a justified upgrade from the literal ask to the stronger outcome. They must be visible, usable, testable, or decision-improving. Examples:

- UI/product: a clearer task flow, decisive information hierarchy, stateful feedback, high-trust copy, responsive behavior, or a control model that removes friction.
- Game/prototype: a memorable interaction loop, expressive feedback, integrated systems, readable danger/reward, and a finish/recovery moment.
- Code: a simpler architecture that removes a bug class, precise tests, explicit failure handling, observability, and clean integration with local patterns.
- Docs/spec/report: crisp decisions, concrete examples, acceptance criteria, caveats, and reader next actions.
- Workflow/automation: safe recovery, idempotence, operator feedback, traceability, and proof that catches real mistakes.

## Experience Direction

For visual, UI, game, prototype, dashboard, or creative work, define:

```text
First-glance focal point:
Second read:
Primary action/reward:
Danger/error/recovery read:
Palette roles:
Motion/feedback rhythm:
What must feel custom to this task:
What must be removed because it feels generic:
```

If the first screenshot could be described as a generic dark dashboard, generic canvas toy, bland card grid, or ordinary CRUD screen, the bar is not met.

If the user already called a result poor, bland, conformist, or softened, do not lower the bar to "clearer" or "more polished." The next pass must change what a skeptical reviewer remembers: core behavior, visual language, interaction model, decision value, or system depth.

## Ambition Mode

When the user explicitly invites scope expansion, ordinary scope discipline changes from "smallest sufficient" to "highest-value superior version." Still cut waste, but do not hide behind the literal request.

Before Loop 1, decide:

```text
Literal artifact:
Superior artifact:
Ambition leap:
Added scope:
Proof it improves the main outcome:
Cut to keep the leap focused:
Fallback if proof fails:
```

If the leap is too risky, pick a lower rung from `council/ambition-escalation.md` instead of shrinking back to ordinary-good.

## Relentless Recovery

When a previous quality pass disappointed the user, write before Loop 1:

```text
Red verdict:
What must be killed:
What must be exaggerated:
Three bolder directions:
Chosen direction:
Rejected directions:
Hyperfocus target:
First proof that could earn green:
```

If the chosen direction would still need explanation to feel special, reject it before building.

## Rehearsal

Before building, ask:

```text
Would a skeptical reviewer say this plan sounds like a superior model made it?
What part would they remember after 5 seconds?
Which baseline habit are we deliberately refusing?
```

If the answer is vague, rebrief. Do not spend loops on a weak direction.

## Completion

The exceptional bar is met only when:

- at least one signature move is present in the artifact itself.
- when scope expansion was allowed, at least one proved ambition leap is present or honestly marked failed/scoped-out.
- selected transformation layers show visible or testable margin over baseline.
- for visual work, color/material/pacing choices are deliberate and inspected in screenshots or live UI.
- the final response can name why the result is preferred without citing effort, loop count, or automated score.
- when recovery mode applied, the final status is honestly `quality wins`, `red/failed`, or `blocked`; no comfort framing hides a miss.
