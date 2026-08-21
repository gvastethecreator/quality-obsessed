# Canonical Protocol

Owns modes, states, severities, and transitions. Other references add domain guidance without redefining these values.

## Machine-checkable contract

```text
mission_mode: change | diagnose | audit | recovery | goal
task_state: completed | blocked
artifact_verdict: win | tie | loss | not-assessed
verification_state: verified | limited | unverified
loop_verdict: better | mixed | flat | worse
severity: blocker | P1 | P2 | P3
gate_state: passed | failed | blocked | N/A
scope_rule: explicit-user-boundaries-win
mutation_stop: acceptance-met-and-no-blocker-or-P1
analysis_stop: requested-analysis-complete
intent_capture: purpose-and-enabling-outcome
action_threshold: minimum-information-known
settled_context: reuse-unless-new-evidence
blocker_isolation: blocked-lane-only-continue-safe-work
milestone_provenance: current-run-or-durable-evidence-ledger
turn_exit: requested-deliverable-done-or-explicitly-blocked
```

## Precedence and modes

System, safety, user, and repository instructions remain authoritative. Explicit user boundaries win over every expansion this skill proposes.

| Mode | Purpose | Target mutation |
|---|---|---|
| `change` | Improve an authorized artifact | Allowed inside scope |
| `diagnose` | Determine cause and explain evidence | Not allowed unless the user also asks for a fix |
| `audit` | Assess and report findings | Read-only target; a requested report artifact is allowed |
| `recovery` | Replace a rejected or losing direction | Allowed inside the recovery scope |
| `goal` | Pursue a durable objective across checkpoints | Allowed only inside the explicit goal contract |

Mode from the user's verb, not from the repo being editable. Two modes: keep permissions separate — e.g. audit first, remediate only approved findings.

## Execution discipline

- Capture purpose and enabling outcome when they change acceptance, priority, or proof.
- Ask only when missing input would force incompatible work, cross a boundary, or require a choice only the user can make. Once minimum facts known, act.
- Reuse established facts, current baseline, and settled decisions. Reopen only on conflicting evidence or a stale artifact. Record changed evidence; do not replay the debate.
- Blocked lane: record it; continue safe independent work inside scope. Never bypass the gate. Mark `blocked` only after no meaningful authorized lane remains.
- Before a milestone or final report, map claims to evidence from the current run or a durable evidence ledger tied to same artifact revision. Refresh drift-prone proof. Report a missing or failed check as such.
- Before ending the turn, inspect pending deliverable; execute any safe in-scope work the response still promises. A requested plan, audit, or explanation can itself be the completed deliverable; otherwise end only when the requested deliverable is done or an explicit blocker prevents further work.

## State axes

- `task_state`: requested work done, or an external constraint prevents further progress.
- `artifact_verdict`: artifact beats baseline or acceptance. `not-assessed` when no honest comparison is available or comparison is outside the request.
- `verification_state`: complete proof, partial proof with named gaps, or no usable proof.

Completed audit may report `completed`, `loss`, and `verified`. Unavailable sandbox: `completed`, the evidence-supported artifact verdict, and `limited`. Reserve `blocked` for a constraint that prevents meaningful continuation after safe independent lanes are exhausted — not an artifact weakness.

## Severity and transitions

- `blocker`: artifact or evidence cannot be safely assessed or used.
- `P1`: main path, core claim, safety, or acceptance target fails.
- `P2`: repeated or systemic weakness materially lowers trust, usability, or maintainability.
- `P3`: local polish after higher risks are controlled.

Use `better` only when captured evidence shows a meaningful delta. `mixed`: gain and regression coexist; repair regression before finalizing. Two consecutive `flat` or `worse` verdicts trigger a direction reset: state why the direction failed, name what to remove, choose a materially different move, and re-enter the loop.

## State machine

```text
SETUP -> BASELINE -> SELECT_GATES -> INSPECT -> ACT_IF_AUTHORIZED
      -> PROVE -> VERDICT -> CONTINUE | RESET | STOP
```

Freeze accepted scope and risk register after initial discovery. Add a newly discovered issue only when it is inside that boundary or invalidates current result; otherwise defer it visibly.

`change`/`recovery`/`goal` stop: acceptance met, no in-scope blocker or P1, every applicable gate has an honest state, and no bounded high-value action with a credible proof path remains.

`audit`/`diagnose` stop: requested analysis complete, material findings have evidence and recommendations, every applicable proof gate has an honest state. Open artifact findings affect the artifact verdict but do not prevent task completion.

## Final record

Always report task, artifact, and verification axes separately. Support each nontrivial claim with a path, command output, screenshot, source pointer, or measured artifact. Never promote `limited` evidence to `verified` through prose.
