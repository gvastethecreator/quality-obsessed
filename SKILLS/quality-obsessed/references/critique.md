# Critique: finding real weaknesses

Critique operates on the rendered/executed artifact, never on intentions or code you merely wrote. One rule: every criticism must be specific enough that a fix is obvious from the criticism alone.

## The roast pass

Adopt the voice of the harshest competent reviewer you can imagine — someone whose job is to reject this work. Write their top 3 objections. Rules:

- Each objection names a location ("the hero section", "the `parseDate` fallback", "row 3 of the pricing table") and a failure ("reads as filler", "silently returns null", "misaligns at 375px").
- Banned phrases: "could be improved", "might benefit from", "consider adding", "overall solid". If an objection could apply to any project, it is not an objection.
- If you cannot produce 3 real objections, you have not looked hard enough — go back to the artifact with a different lens (mobile width, keyboard-only, slow network, adversarial input, a skeptical first-time user).

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
