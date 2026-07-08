# Quality Stack

Use this before substantial quality work. `quality-obsessed` is the conductor, not a replacement for domain skills.

## Stack Declaration

Before planning, write:

```text
Mission/domain skill:
Craft/critique skill:
Verification/proof skill:
Reference/horizon skill:
Adjacent impact audit:
Quality Contract:
Advisor autonomy:
Advisor checkpoints:
Grilling:
Task documentation:
Mission control:
Improvement ledger:
Skipped relevant skills:
Why this stack can beat baseline:
```

Each selected skill must change the plan, implementation, critique, or proof. A skill name in notes does not count.

## Selection Rules

Start with skills the user named. Then add only the few skills needed to raise the artifact.

Pick at most one primary from each lane unless the task truly spans multiple domains:

- Mission/domain: `prototype-lab` for browser/UI prototypes; `game-feature-prototype` or relevant `redblob-*` for game systems; `frontend-design`, `improve-ui`, or product-design skills for app/product UI; `threejs-*` for 3D; `implement`, `tdd`, `diagnose`, or code-review skills for code; docs/spec/data/security skills for those domains; `write-a-skill` for skill edits.
- Craft/critique: the `quality-obsessed` council pass, `improve-ui`, product/design audit, domain critic, or a task-specific reviewer.
- Verification/proof: `browser-ui-verification`, `verification-quality-gate`, repo tests, build/typecheck/lint, visual regression, Playwright screenshots, or artifact-specific manual proof.
- Reference/horizon: `$imagegen` for visual targets, official docs for current APIs, screenshots/references, examples, or benchmark artifacts.

For visual/UI/prototype/game work, the minimum stack is:

```text
prototype/build skill + design/art critique + browser/visual proof + feasible horizon when target quality is unclear
```

For code-heavy work, the minimum stack is:

```text
implementation/diagnose skill + correctness/review skill + adjacent impact audit + focused tests/build proof
```

For docs/plans/specs, the minimum stack is:

```text
domain framing skill + adjacent consistency audit + reader/actionability critique + example/acceptance proof
```

For narrow assets/icons/copy/UI tweaks, the minimum stack is:

```text
surface-specific skill + adjacent context audit + craft critique + before/after proof
```

## Hard Rules

- Do not proceed with only `quality-obsessed` on multi-surface work when relevant skills are available.
- Do not load every possible skill. Choose the smallest stack that can plausibly create a superior artifact.
- If a named or obvious domain skill is unavailable, state the fallback and compensate with stronger inspection/proof.
- If a selected skill does not produce an observable action or proof, remove it from the stack and record the gap.
- Adjacent impact audit is not optional for quality missions; if skipped, record exactly why there was no surrounding surface to inspect.
- If the artifact still looks or behaves like the baseline after the stack is applied, the stack failed; reselect before continuing loops.

## Completion

The stack is ready when:

- each lane has either a selected skill or an explicit reason it is unnecessary.
- selected skills are mapped to transformation layers and proof.
- adjacent impact audit names inspected, improved, offered, deferred, and skipped surfaces.
- the Quality Contract has baseline, layers, signature moves, proof, and STOP conditions.
- when autonomy, challenge, or `improve` applies, the advisor brief has evidence, portable advisor checkpoints or fallback, vetted findings, rejected options, one recommended decision, accepted/rejected advice, scope boundaries, verification expected results, and STOP conditions.
- when grilling applies, the council has inspected repo/docs, built a decision tree, asked at most one current material question with a recommended answer, and recorded settled decisions, rejected paths, unresolved branches, and the execution gate.
- iterative or ambitious work has mission-control state: objective, loop, next action, proof, learning, project opportunity, and STOP conditions.
- assigned, delegated, resumable, multi-slice, risky, or quality-gated work has a task documentation path.
- accepted improvements, tasks, risks, cuts, and loop sources have a ledger path or final-response record.
- the first implementation slice uses the stack, not only the quality checklist.
