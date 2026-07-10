# Canonical Protocol

Use this file as the single source of truth for modes, states, severities, and transitions. Other references add domain guidance without redefining these values.

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
```

## Precedence and modes

System, safety, user, and repository instructions remain authoritative. Explicit user boundaries win over every expansion proposed by this skill.

| Mode | Purpose | Target mutation |
|---|---|---|
| `change` | Improve an authorized artifact | Allowed inside scope |
| `diagnose` | Determine cause and explain evidence | Not allowed unless the user also asks for a fix |
| `audit` | Assess and report findings | Read-only target; a requested report artifact is allowed |
| `recovery` | Replace a rejected or losing direction | Allowed inside the recovery scope |
| `goal` | Pursue a durable objective across checkpoints | Allowed only inside the explicit goal contract |

Infer the mode from the user's verb, not from the fact that the repository is editable. When two modes are requested, keep their permissions separate; for example, audit first and remediate only approved findings.

## State axes

- `task_state` answers whether the requested work completed or an external constraint prevents further progress.
- `artifact_verdict` answers whether the artifact beats the baseline or acceptance target. Use `not-assessed` when no honest comparison is available or comparison is outside the request.
- `verification_state` answers whether the claims have complete proof, partial proof with named gaps, or no usable proof.

A completed audit can report `completed`, `loss`, and `verified`. A completed implementation with an unavailable sandbox path can report `completed`, the evidence-supported artifact verdict, and `limited`. Reserve `blocked` for a constraint that prevents meaningful continuation, not for an artifact weakness.

## Severity and transitions

- `blocker`: the artifact or evidence cannot be safely assessed or used.
- `P1`: the main path, core claim, safety, or acceptance target fails.
- `P2`: a repeated or systemic weakness materially lowers trust, usability, or maintainability.
- `P3`: local polish after higher risks are controlled.

Use `better` only when captured evidence shows a meaningful delta. `mixed` means a gain and regression coexist; repair the regression before finalizing. Two consecutive `flat` or `worse` verdicts trigger a direction reset: state why the direction failed, name what to remove, choose a materially different move, and re-enter the loop.

## State machine

```text
SETUP -> BASELINE -> SELECT_GATES -> INSPECT -> ACT_IF_AUTHORIZED
      -> PROVE -> VERDICT -> CONTINUE | RESET | STOP
```

Freeze the accepted scope and risk register after initial discovery. Add a newly discovered issue only when it is inside that boundary or invalidates the current result; otherwise defer it visibly.

In `change`, `recovery`, or `goal` mode, stop when the user's acceptance condition is met, no in-scope blocker or P1 remains, every applicable gate has an honest state, and no bounded high-value action with a credible proof path remains.

In `audit` or `diagnose` mode, stop when the requested analysis is complete, material findings have evidence and recommendations, and every applicable proof gate has an honest state. Open artifact findings affect the artifact verdict but do not prevent task completion.

## Final record

Always report task, artifact, and verification axes separately. Support each nontrivial claim with a path, command output, screenshot, source pointer, or measured artifact. Never promote `limited` evidence to `verified` through prose.
