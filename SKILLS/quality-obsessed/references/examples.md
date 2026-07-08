# Examples: concrete vs. theater

Read these when unsure whether your critique, fix, or evidence is real. Each pair shows the failure mode and the standard.

## Example 1 — Critique

**Bad (adjective critique):**
> "The landing page feels a bit generic and could use more polish. Consider improving the visual hierarchy and making it more engaging."

**Good (located, fixable):**
> "1. The hero headline 'Welcome to our platform' says nothing about the product — a visitor cannot tell what this app does in five seconds. 2. The three feature cards use identical icons and near-identical copy; they read as one repeated card. 3. At 375px the pricing table forces horizontal scroll and the CTA falls below the fold."

Every item names a place and a failure; the fix is implied by the criticism.

## Example 2 — Fix + evidence

**Bad (process as fix):**
> "I improved error handling across the app and documented the error strategy in ERRORS.md. The code is now more robust."
> (No error was ever triggered. The doc grew; the artifact didn't visibly change.)

**Good (artifact change with executed proof):**
> "Before: submitting the form with an unreachable API left the button in a permanent spinner (screenshot A). Fix: 10s timeout + inline retry message. After: screenshot B shows 'Couldn't save — Retry' with the form data preserved. Verified by killing the dev API mid-submit; output captured."
> Verdict: `substantially better`.

## Example 3 — Side-by-side verdict

**Bad (self-certification):**
> "The dashboard is now significantly more polished and production-ready, with a cohesive design system and improved UX throughout."

**Good (nameable delta):**
> "Baseline vs final, side by side: baseline showed a static table of raw rows. Final shows the same data as a summary strip (total, trend, worst offender) above a filterable table, with the empty state offering a one-click seed action. A reviewer can name the delta: 'it answers the question before I read the table.'"

## Example 4 — Honest failure

**Bad (softened):**
> "Made solid progress on the checkout flow. A few edge cases remain but the core experience is much improved."

**Good (open gate named):**
> "Status: `failed`. Open gate: hostile-input — I could not run the payment-declined path because the sandbox lacks a Stripe test key. Everything else passed with evidence (screenshots 1–6, test run attached). Unblock: add STRIPE_SECRET_KEY test value, then I rerun the declined-card case."

## Example 5 — Direction reset

**Bad (polishing a failed direction):**
> Verdicts: flat, flat, flat — while continuing to nudge paddings and shuffle card order on the same layout.

**Good (kill and redirect):**
> "Two flat verdicts. Admission: the card-grid direction fails because every metric looks equally important — the layout has no answer to 'what's wrong today?'. Kill list: the 8-card grid, the decorative sparklines. New direction: single alert-first column — the worst metric gets the top slot at 3× size with its cause, everything else collapses into a compact ranked list. Rebuilt, screenshot pair attached." Verdict: `substantially better`.

## Example 6 — Persistence without theater

**Bad (quota theater):**
> "Completed 30 loops. Most were verification passes and README edits, but the checklist is done."

**Good (valid persistence):**
> "Loop 30 verdict: `continue`. 21/30 loops changed behavior, state coverage, visual read, or proof tooling. Remaining high-leverage item: mobile overflow still hides the retry action. Next loop: rebuild the error footer and capture 375px before/after."

## Example 7 — Adjacent impact

**Bad (named target only):**
> "Fixed the broken upload button."

**Good (impact surface):**
> "Fixed upload retry. Adjacent audit found the same timeout path in avatar upload and document upload; avatar shared the helper and got the regression test, document uses a different service and is deferred with reason. Proof: timeout test plus manual retry screenshot."

## Example 8 — Recovery honesty

**Bad (comfort framing):**
> "The result is much improved even though it may still feel a little generic."

**Good (red until proof):**
> "Status: `red/failed`. The first screen still reads like a generic admin template beside the baseline. Kill list: repeated stat cards, fake activity feed, weak CTA. New direction: alert-first operational console with one real decision path. Proof needed: side-by-side desktop/mobile screenshots."

## Example 9 — Delegated review

**Bad (subagent theater):**
> "Asked three reviewers. They all said it looks good, so the quality gate passes."

**Good (independent findings):**
> "Delegated visual review found the mobile error state hides the retry button and the primary action color is used on non-actions. Accepted both. Rejected the suggestion to add a second chart because it does not support the main task. Proof: 375px before/after screenshot plus updated color-role diff."

## Example 10 — Useful council and grilling

**Bad (avoiding ceremony):**
> "This was a small request, so I only changed the button label and stopped once tests passed."

**Good (obsessive but aligned):**
> "Council pass found the label was only a symptom: the whole empty state failed to tell users what to do next. Grilling decision: keep scope inside the empty state, but add a one-click recovery path and proof. Result: label, CTA hierarchy, empty copy, and retry state changed; screenshot and test attached."
