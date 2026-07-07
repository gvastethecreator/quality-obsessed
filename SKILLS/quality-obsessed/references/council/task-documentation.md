# Task Documentation

Use this when the council or executor creates, assigns, resumes, or hands off work. The document must let another agent continue without this chat.

## Where To Put It

Prefer the repo's existing task system:

- Existing architecture review/workplan: update it.
- Existing issue tracker or project docs: update it.
- Existing `plans/`: add a self-contained plan.
- Existing durable planning store: update the active plan.
- Existing `.scratch/planning` or `.planning`: update the active plan instead of creating a parallel system.

If the repo has no durable task convention and the task is small enough to finish in one turn, the final response can be the task record. If the task is assigned to another agent, spans sessions, has multiple slices, or has quality gates, create a real task document before execution or handoff.

## Minimum Task Doc

```text
Title:
Date:
Status: proposed | accepted | in-progress | blocked | done | rejected
Goal:
Mission control:
Baseline:
Quality contract:
Advisor autonomy:
Adjacent audit:
Improvement ledger:
Loop records:
Files/surfaces in scope:
Out of scope:
Steps:
Acceptance criteria:
Verification:
Proof artifacts:
STOP conditions:
Progress log:
Learning log:
Open decisions:
```

## Self-Contained Plan

For plans another agent will execute, include:

- current-state evidence with file paths and line references where practical.
- vetted findings with impact, effort, risk, confidence, and rejected options.
- adjacent impact audit: named target, root cause/underlying need, immediate surface, analogs, accepted improvements, offered/deferred scope, and proof.
- one recommended decision with default assumptions.
- exact files allowed in scope.
- exact commands and expected success result.
- tests or visual proof to add.
- drift check against current repo state.
- escape hatches: what to stop on instead of improvising.
- docs to update when done.

If the work may be resumed or delegated, include a drift check against the current commit or touched paths. If the drift check fails, the executor must compare current-state excerpts against the live files before editing.

## Improvement Ledger

Use one ledger for improvements, tasks, risks, cuts, follow-ups, and loop sources. Prefer the existing tracker/workplan/issue/plan; otherwise put it inside the task doc. Tiny one-turn work may use the final response as the record.

Each item needs:

```text
id:
source: council | roast | baseline | user | test | loop N | review
type: improvement | task | risk | cut | follow-up
status: proposed | accepted | in-progress | fixed | deferred | rejected | blocked
scope:
evidence:
action:
acceptance/proof:
next action:
loop link:
```

Accepted items cannot remain only in chat. Rejected or deferred items need a short reason so the next agent does not reopen them blindly.

## Mission Control

Use mission control for iterative, ambitious, resumable, delegated, AFK, or project-improving work. It is the goal-like state of the task document.

Minimum fields:

```text
Objective:
Current loop:
Highest-leverage open item:
Next action:
Expected proof:
Project-scale opportunity:
Learning log:
Decision log:
Risk/blocker log:
STOP conditions:
```

Keep it current before and after each execution slice. If an external `/goal` exists, mirror its objective here, but do not depend on hidden goal state for handoff.

## Loop Records

For quality loops, store records beside the improvement ledger or link to their proof artifacts. Each loop must name its source item, before evidence, action, after evidence, proof, reality verdict, remaining concern, and next ledger item.

## Progress Discipline

- Update status before and after execution slices.
- Record accepted, rejected, and deferred decisions.
- Record adjacent surfaces inspected, improved, offered, deferred, or skipped.
- Record proof paths, not only "tested".
- Before each execution slice, pick the highest-impact accepted/open ledger item.
- After each counted loop, update the source item status, proof, remaining concern, and next action.
- After each counted loop, update mission control with what changed, what was learned, and the next highest-leverage action.
- Split broad items when one loop cannot close them honestly.
- Keep docs close to the existing repo convention; do not create parallel planning systems when a workplan already exists.
- Documentation does not count as quality unless it improves execution, review, or future continuation.
