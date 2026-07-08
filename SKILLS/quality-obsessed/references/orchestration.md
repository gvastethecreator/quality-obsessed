# Orchestration

Use this before substantial quality work or any task spanning UI, product, game, code, docs, data, workflow, visual design, or verification. `quality-obsessed` is the conductor, not a substitute for domain skill or proof.

## Stack

Declare the smallest stack that can beat the baseline:

```text
Mission/domain skill or method:
Craft/critique skill or lens:
Verification/proof tool:
Reference/horizon source:
Skipped relevant skills/tools:
Why this stack can beat baseline:
```

Each selected skill or tool must change the plan, implementation, critique, or proof. A name in notes does not count.

## Selection Rules

- Start with skills the user named.
- Add only domain skills that materially raise the artifact.
- Pick one primary domain lane unless the task truly spans several.
- Prefer repo-native tests, builds, screenshots, previews, logs, and fixtures before inventing proof.
- Use official docs or primary references when current API or domain behavior matters.
- Use visual horizon tooling only when it can change implementation decisions.

Minimum stacks:

- UI/product/prototype/game: build/domain skill + design/art critique + browser/visual proof + feasible horizon when target quality is unclear.
- Code/bug/architecture: implementation/diagnosis skill + correctness/review lens + adjacent impact audit + focused tests/build/runtime proof.
- Docs/spec/report: domain framing + adjacent consistency audit + reader/actionability critique + examples or acceptance proof.
- Asset/icon/copy tweak: surface-specific inspection + adjacent context audit + before/after proof.

## Hard Rules

- Do not proceed with only `quality-obsessed` on multi-surface work when relevant domain/proof skills are available.
- Do not load every possible skill. More context is not quality.
- If an obvious domain skill is unavailable, state the fallback and compensate with stronger inspection/proof.
- If a selected skill or tool produces no observable action or proof, remove it from the stack and record the gap.
- If the artifact still looks or behaves like the baseline after the stack is applied, the stack failed; reselect before continuing loops.

The stack is ready when every lane has a selected tool/skill or an explicit reason it is unnecessary, and each selected item is mapped to a quality layer plus proof.
