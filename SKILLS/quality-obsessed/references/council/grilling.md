# Council Grilling

Use this when the user asks to grill a plan, the council finds unresolved product/design/architecture choices, a task must be self-contained before execution, or project vocabulary, `CONTEXT.md`, or ADRs may change.

This embeds the useful parts of `grill-me`, `grill-with-docs`, `grilling`, and `domain-modeling` so the council can run the workflow without depending on those user-invoked skills at runtime.

## Grilling Loop

1. Build the decision tree.
   - Inspect repo rules, task docs, context docs, ADRs, code, tests, screenshots, and prior artifacts before asking.
   - Split branches into `repo-settled`, `safe default`, `user decision required`, and `blocked/unknown`.
   - Each branch needs evidence, default recommendation, impact if wrong, and whether it blocks execution.
   - Done when open branches are explicit and no repo-answerable question remains.

2. Ask one question at a time.
   - Ask only material decisions the repo cannot settle and safe defaults cannot cover.
   - Include the recommended answer, why it wins, alternatives, and what changes if the user answers differently.
   - Wait for the user before asking the next question.
   - Done when the answer resolves the branch, splits it into clearer branches, or confirms a safe default.

3. Track settled decisions.
   - Record durable decisions, constraints, rejected paths, default assumptions, and remaining open questions.
   - For resumable, delegated, risky, or quality-gated work, write them into the task doc, Quality Contract, or improvement ledger; do not leave them only in chat.
   - Done when another agent can see what was decided, why, what was rejected, and what still needs input.

4. Capture domain model changes.
   - If `CONTEXT-MAP.md`, `CONTEXT.md`, ADRs, or glossary-like docs exist, inspect the relevant ones before naming new terms or decisions.
   - Split overloaded terms into canonical vocabulary when the plan depends on them.
   - Update context docs inline only for resolved durable terms; keep implementation details out of `CONTEXT.md`.
   - Offer an ADR only for hard-to-reverse, surprising, or policy-shaping tradeoffs.
   - Done when settled vocabulary and durable decisions match the plan and future agents do not need to re-litigate them.

5. Feed the council.
   - Product Strategist gets the user-outcome branches.
   - Architect gets durable design/ADR branches.
   - Implementer gets sequencing and proof branches.
   - Skeptic gets speculative or reversible branches.
   - Task Documentarian gets settled decisions, rejected paths, and open questions.
   - Done when the Quality Contract, output packet, or question round contains the decision tree and next action.

## Output Shape

```text
Grilling:
- trigger:
- docs inspected:
- decision tree:
  - branch -> status -> evidence -> recommended default -> impact if wrong -> blocks execution?
- user questions:
  - question -> recommended answer -> alternatives -> impact
- settled decisions:
- rejected paths:
- default assumptions:
- unresolved branches:
- domain terms changed:
- docs/ADRs to update or updated:
- execution allowed only if:
```

## Hard Gates

- No repo-answerable questions: inspect first, ask only when evidence cannot decide.
- No question dumps: ask one material question, wait, then continue.
- No neutral questions: each question needs a recommended answer and why.
- No execution after a requested grilling session until the user confirms shared understanding or explicitly releases the gate.
- No hidden decisions: settled decisions, rejected paths, and assumptions must be durable for any resumable or delegated work.
- No stale domain model: changed vocabulary or durable decisions must update existing context/ADR docs or record why docs were not changed.
- No ADR inflation: do not create ADRs for obvious, reversible, or implementation-only choices.
- No endless grilling: stop when branches are repo-settled, safely defaulted, user-confirmed, or blocked by a named material decision.
