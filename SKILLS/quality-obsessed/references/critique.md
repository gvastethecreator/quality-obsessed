# Critique: finding real weaknesses

Critique operates on the rendered/executed artifact, never on intentions or code you merely wrote. One rule: every criticism must be specific enough that a fix is obvious from the criticism alone.

## Relentless stance

Start skeptical. Assume the artifact is hiding a hierarchy, correctness, recovery, trust, evidence, or maintainability failure until the inspected result proves otherwise.

- Challenge the artifact, not the person who made it.
- Do not flatter the result before naming the strongest failure.
- Do not accept "it works" as "it is good"; functional output can still be confusing, brittle, generic, slow, or unproved.
- Do not ask permission to raise the bar when the user asked for quality, polish, recovery, critique, review, or improvement.
- If the artifact is editable and the task is actionable, the top in-scope finding must become a patch, not only advice.

Banned soft exits:

- "Overall solid."
- "Could be improved."
- "Consider adjusting."
- "Maybe add spacing."
- "Good enough."
- "Looks better" without evidence.

Use blunt working language:

- "This is the real blocker..."
- "The artifact is pretending X matters, but the user needs Y."
- "This fix is cosmetic; the root problem is..."
- "I am not calling this done because..."
- "The next patch should attack..."

## Result autopsy

Use this before final status for broad, quality-sensitive, recovery, visual/product/code/docs, audit/review, or user-declared obsessive work. Keep it short, but make it sharp enough to change the next action.

```text
Intended outcome:
Actual observed result:
What the artifact accidentally prioritizes:
Strongest remaining failure:
Location:
User harm:
Likely/source cause:
Severity: blocker | P1 | P2 | P3
Cut/fix:
Proof needed:
Status: fixed | blocked | scoped-out | still-open
```

Severity means:

- `blocker`: the artifact cannot be honestly judged or used until this is resolved.
- `P1`: the main path, core claim, safety, correctness, or first impression fails.
- `P2`: repeated/systemic weakness that materially lowers trust, usability, maintainability, or proof.
- `P3`: local polish or cleanup that matters only after higher failures are handled.

Final status follows severity. In-scope blocker/P1 findings mean `failed` or `blocked`. Repeated/systemic P2 findings require another loop unless explicitly scoped out with evidence.

## Cross-evidence rule

When both output and source exist, critique both:

- visual/UI: screenshot or rendered state plus component/style/state cause.
- code: executed behavior plus public seam, failure path, or implementation cause.
- docs/spec: reader task plus exact section, missing decision, weak acceptance example, or stale source.
- data/report: displayed conclusion plus data quality, metric definition, caveat, or query/source cause.

Do not critique only the output when source explains the failure. Do not critique only the source when the rendered or executed result shows what users actually suffer.

## The roast pass

Adopt the voice of the harshest competent reviewer you can imagine — someone whose job is to reject this work. Write their top 3 objections. Rules:

- Each objection names a location ("the hero section", "the `parseDate` fallback", "row 3 of the pricing table") and a failure ("reads as filler", "silently returns null", "misaligns at 375px").
- Each objection names user harm and a likely cause, not only the symptom.
- Each objection ends with a concrete action: kill, merge, hide, collapse, promote, replace, prove, or rewrite.
- Banned phrases: "could be improved", "might benefit from", "consider adding", "overall solid". If an objection could apply to any project, it is not an objection.
- If you cannot produce 3 real objections, you have not looked hard enough — go back to the artifact with a different lens (mobile width, keyboard-only, slow network, adversarial input, a skeptical first-time user).

## Ruthless cuts

When the artifact feels bland, generic, cluttered, fragile, or unconvincing, name cuts before additions. Incremental garnish is how weak work survives.

Use direct verbs:

- Kill the duplicated surface, dead branch, fake status, weak CTA, stale claim, or private seam.
- Merge repeated warnings, cards, states, handlers, tests, or docs that make the same point.
- Hide advanced/debug/secondary material until the main path is clear.
- Collapse noisy detail behind a useful summary.
- Promote the one task, state, failure, metric, or proof the user actually needs first.
- Replace the generic/default pattern with a specific positive target.
- Prove the riskiest claim through output someone else can inspect.

Bad:

```text
Improve hierarchy and reduce clutter.
```

Good:

```text
Kill the second readiness panel because it repeats the header status and makes the failure path look optional. Promote the single failing gate above the fold, then prove it with before/after screenshots at desktop and narrow width.
```

## The five-second read (visual work)

Look at a screenshot for five seconds, then answer without scrolling back:

1. What is this? (If unclear → hierarchy failure.)
2. What is the one thing I'm supposed to do? (If unclear → CTA/focus failure.)
3. Does it look like a default template? (If yes → identity failure. Something specific to this product must be visible in the first screen: a real image, real data, a distinctive type/color decision.)

## Palette and hierarchy roles (visual work)

Every color and size must have a nameable job:

- One primary color = the action color. If it appears on non-actions, it loses meaning.
- Neutrals carry structure; if two grays are nearly identical, delete one.
- The largest text on screen must be the most important. If a decorative element is louder than the primary action, invert them.
- Check contrast where text sits on images or tinted backgrounds — this is the most common silent failure.

## Direction reset

Triggered by two consecutive `flat`/`worse` verdicts, or the user calling the result bland, generic, or not good enough.

1. Write one sentence admitting the current direction failed and why. No hedging.
2. Kill list: name the elements that must be deleted, not adjusted. Incremental polish of a failed direction is how mediocre work survives.
3. Pick a new direction with one concrete signature: a specific layout structure, a specific interaction, a specific visual device, a specific data presentation. "More modern" is not a direction; "dense two-column ledger layout with a sticky running total" is.
4. Rebuild from the new direction, then re-enter the core loop.

If the user explicitly rejects the result or the baseline still wins, use `recovery.md` instead of doing a small direction tweak.

## Positive target

Do not steer critique only by negation. "Not generic", "not bland", and "not overengineered" all keep the failure pattern in frame. Convert each ban into a positive target:

```text
Avoid: generic admin template
Target: alert-first operational console with one real decision path visible above the fold
```

A prohibition is allowed as a hard guardrail only when paired with the target behavior, visual read, or proof that should replace it.

## Visual horizon trigger

If the critique says "generic", "template", "bland", "flat", "default canvas", "same dark panels", or "unclear target read", read `visual-horizon.md` before visual polish. Text-only critique is not enough when the failure is visual direction.

## Anti-patterns in critique

- **Adjective critique:** "it feels bland" with no location. Useless — convert to a located failure or discard.
- **Checklist theater:** enumerating 20 shallow findings to look thorough. Three deep, located objections beat twenty shallow ones.
- **Critiquing the plan instead of the artifact:** if your critique cites the intention ("the design system is cohesive") rather than the rendered output, it is invalid.
- **Negation trap:** saying only what to avoid without naming the replacement target.
- **Polite bypass:** praise that makes the agent emotionally ready to stop before the strongest failure is fixed.
- **Advice-only exit:** ending with recommendations when the artifact is editable and the user asked for improvement.
- **Cosmetic patching:** changing labels, colors, or spacing when the source cause is a broken state model, unclear contract, duplicated primitive, weak proof seam, or wrong information architecture.
- **Detector-only judgment:** treating tests, linters, screenshots, or review scripts as the verdict instead of evidence for a human conclusion.
