# Grilling

Use this when assumptions are fuzzy, a plan feels too comfortable, a loop goes flat, the user asks to grill, or a quality mission needs sharper decisions before continuing.

Grilling is not a question dump. It is pressure applied one material decision at a time.

## What To Grill

Grill the artifact, plan, backlog, and evidence before grilling the user:

- Which claims are facts that should be researched instead of asked?
- Which claims are decisions only the user/product owner can make?
- Which uncertainty is still fog and needs a decision map before execution?
- Is the literal request enough to satisfy the real user outcome?
- What assumption would make this work fail?
- What would a competent baseline also do?
- What is the most embarrassing remaining weakness?
- Which proposed addition is scope creep rather than quality?
- Which proof would actually change the verdict?
- What must be killed, not adjusted?

Ask the user only when repo inspection, evidence, and a safe default cannot decide.

Do not ask the user for facts that official docs, source code, specs, first-party APIs, or repo artifacts can answer. Research those first and ask only for decisions.

## Question Shape

When a user decision is needed, ask one question:

```text
Decision:
Why it matters:
Recommended answer:
Tradeoff:
Default if unanswered:
```

Do not ask neutral questions. Every question needs a recommended answer and a reason.

## Loop Checkpoints

Run a grilling checkpoint:

- before Loop 1 when the quality target or superior version is unclear.
- after any two `flat`, `mixed`, or `worse` verdicts.
- when a backlog item is vague or not tied to evidence.
- before adding a feature that may hide a weak core.
- at Loop 30 before `continue | ask | stop`.

## Output

```text
Grilling trigger:
Inspected first:
Material question:
Recommended answer:
Settled decision:
Rejected paths:
Default assumption:
Execution released:
```

## Hard Rules

- No repo-answerable questions.
- No source-answerable questions when primary sources are reachable.
- No question dumps.
- No execution after a requested grilling session until shared understanding is confirmed or the user releases the gate.
- No endless grilling: continue when decisions are repo-settled, safely defaulted, user-confirmed, or blocked by one named decision.
- No softening: if grilling reveals the artifact does not beat baseline, mark it red and change direction.
