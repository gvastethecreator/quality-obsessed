# Evidence gates

A gate passes only with captured evidence. "I checked it" is not evidence. Evidence is an artifact someone else could inspect: a screenshot, a test run's output, a command's output, a diff.

## Side-by-side gate

- Baseline = the state of the artifact before this mission (or, for greenfield work, the competent default any tool would produce).
- Put final next to baseline — literally, when visual: two screenshots viewed together.
- Pass condition: a neutral reviewer could name the improvement in one sentence. "It's cleaner" does not count; "the dashboard now shows live totals with per-category breakdown instead of a static list" counts.
- Automatic fail: the artifact is materially the same and only process output grew (plans, docs, logs, comments, README). This is the cardinal failure mode of fake quality work.

## Adversarial critique gate

For broad, quality-sensitive, recovery, visual/product/code/docs, audit/review, or user-declared obsessive work, run the result autopsy in `critique.md` before final status.

Pass condition:

- the top objections are located in the artifact or executed output.
- each objection names user harm, likely/source cause, cut/fix, proof needed, status, and severity.
- in-scope blocker/P1 findings are fixed, blocked by a named external constraint, or scoped out by explicit user limit.
- repeated/systemic P2 findings have another loop, a bounded deferral, or evidence that they are outside the mission.
- the final report does not praise the artifact before naming open severity.

Automatic fail:

- "looks better" or "overall solid" without evidence.
- advice-only output when the artifact was editable and the user asked for improvement.
- a generic critique that could apply to any artifact.
- a detector/test/screenshot treated as the verdict instead of evidence for a conclusion.
- cosmetic changes while the named source cause remains untouched.

## States gate

Every user-visible surface must have been **seen** (screenshot or executed render) in:

- Empty (zero items, no data yet)
- Loading
- Error (and the error message must be useful, not "Something went wrong" alone)
- Overflow: longest realistic text, 3× expected item count, and 1 item
- Happy path with realistic data — never lorem ipsum, never "Item 1 / Item 2"

If a state cannot occur by design, state why in one line instead of skipping silently.

## Hostile-input gate (code)

Run — do not reason about — at least:

- Malformed/missing input on every public entry point touched
- Boundary values (0, 1, max, negative, empty string, unicode)
- The failure path: what does the caller/user actually see when the dependency fails?

Capture the command and its output. A hostile case that "would obviously be handled" but was never run is an open gate.

## Source gate

Any current or external fact that shaped the quality target, implementation direction, or final claim must have a source pointer:

- official docs, source code, specs, first-party APIs, changelogs, standards, or repo-owned artifacts.
- date/version when the fact can drift.
- uncertainty called out when the primary source is unreachable.

Secondary articles, memory, or confident prose do not pass this gate when a primary source is reachable.

## Test-seam gate (code)

New or changed tests pass this gate only when:

- the tested seam is public and agreed for the mission.
- the test observes behavior through the seam, not private internals.
- expected values come from a known literal, worked example, spec, fixture, prior observed behavior, or another independent source.
- the assertion is not tautological: it must not recompute the expected value the same way the implementation does.

If a test would still pass when the implementation repeats its own mistake, it is not proof.

## Frontier gate

For multi-slice work, implementation cannot be called quality-ready unless:

- blockers are explicit.
- the current frontier is visible.
- each ticket describes end-to-end behavior and proof, not only layer work.
- wide refactors use expand-contract instead of pretending one vertical slice can stay green.

## First-impression gate (visual)

Apply the five-second read from `critique.md` on an actual screenshot at both a desktop and a mobile width. Both must pass.

## Verdict discipline

After every fix, issue exactly one verdict:

- `substantially better` — the evidence shows a difference a reviewer would name unprompted.
- `mixed` — improved one thing, regressed or muddied another. Name both.
- `flat` — evidence shows no meaningful change. Do not dress this up.
- `worse` — admit it, revert or redirect.

Rules:
- Verdicts are issued against evidence, never against effort. A pass that took an hour and produced no visible change is `flat`.
- Two consecutive `flat`/`worse` → direction reset (see `critique.md`). Continuing to polish is forbidden.
- The final report may not contain a verdict that lacks its evidence artifact.

## Persistence gate

For substantial missions, explicit polish/completeness, or no user limit on iteration, `persistence.md` must be satisfied before `quality win`:

- the persistence target or explicit user limit is met.
- Loop 30, when reached, has a `continue`, `ask`, or `stop` verdict.
- at least 60% of counted loops are material-change loops.
- any early stop has a blocker or no-padding verdict with evidence.

## Adjacent gate

For quality work with nearby consequences, `adjacent-impact.md` must be satisfied:

- the named target and immediate surface were inspected.
- root cause, analogous cases, or nearby states/tests/docs were checked when cheap.
- bounded nearby fixes were made, offered, deferred, or skipped with a reason.

## Delegated-review gate

When the work is substantial and subagents or independent review passes are available, `delegated-review.md` must be considered before final status:

- a reviewer was used for critique, proof, domain review, visual review, simplification, or orchestration; or
- the run states why delegation was not useful or not available.
- accepted findings changed the artifact, backlog, proof, or decision.
- rejected findings have a reason.

## Council/grilling gate

When the user invokes obsession, asks to exceed the request, or the mission enters persistence/recovery mode:

- council pressure identified the superior version, risks, cuts, proof, or next move; or the run states why no council lens would add value.
- grilling resolved the current material assumption, flat loop, or stop/continue decision; or the run states why no material question exists.
- accepted decisions changed the artifact, backlog, proof, or final claim.

## Anti-theater rules

- No pass counting as a metric. "I did 12 passes" is meaningless; 12 verdicts with evidence is the claim.
- No ritual with no teeth. Council, grilling, docs, and reviewers are good when they change the artifact, decision, proof, or cuts.
- No self-graded rubrics or scores. Numbers you assign yourself prove nothing; only external evidence does.
- No subagent-count theater. Multiple reviewers prove nothing unless their findings change the artifact or decision.
- No research theater. A source list proves nothing unless it changes a decision, artifact, risk, or claim.
- No ticket theater. A ticket list proves nothing unless blockers, frontier, and proof make the next action safer.
- No negation-only target. Say what the artifact should become, not only what it must avoid.
- No softened failure states. If a gate is open at the end, the status is `failed`, and the report says which gate and why.
