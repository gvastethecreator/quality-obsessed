# Orchestration

Use this before substantial quality work or any task spanning UI, product, game, code, docs, data, workflow, visual design, or verification. `quality-obsessed` is the conductor, not a substitute for domain skill or proof.

## Stack

Declare the smallest stack that can beat the baseline:

```text
Mission/domain skill or method:
Craft/critique skill or lens:
Verification/proof tool:
Reference/horizon source:
Research/source note:
Wayfinding/decision map:
Spec/ticket workflow:
Council roles:
Grilling checkpoint:
Delegated reviewers:
Skipped relevant skills/tools:
Why this stack can beat baseline:
```

Each selected skill or tool must change the plan, implementation, critique, or proof. A name in notes does not count.

## Selection Rules

- Start with skills the user named.
- Add only domain skills that materially raise the artifact.
- Pick one primary domain lane unless the task truly spans several.
- Prefer repo-native tests, builds, screenshots, previews, logs, and fixtures before inventing proof.
- Use official docs, source code, specs, first-party APIs, changelogs, or primary references when current API, library, standard, or domain behavior matters. Secondary sources are leads, not proof.
- Use a research skill or primary-source note when external/current facts affect the quality bar, implementation direction, or final claim.
- Use a wayfinding or decision-map skill when the destination matters but the path is too foggy for implementation, spec, or tickets.
- Use a spec/ticket workflow for clear multi-slice work: tickets need blockers, a visible frontier, and end-to-end behavior.
- For tests, agree the highest useful public seam first; expected values must come from an independent source of truth, not the implementation.
- Use visual horizon tooling only when it can change implementation decisions.
- Use `council.md` when multiple lenses should pressure the plan, ambition, proof, or scope.
- Use `grilling.md` when the plan has unresolved assumptions or the loops start going flat.
- Use `delegated-review.md` when a subagent or independent reviewer can materially improve critique, proof, or orchestration.

Minimum stacks:

- UI/product/prototype/game: build/domain skill + design/art critique + browser/visual proof + feasible horizon when target quality is unclear.
- Code/bug/architecture: implementation/diagnosis skill + correctness/review lens + adjacent impact audit + focused tests/build/runtime proof.
- Docs/spec/report: domain framing + adjacent consistency audit + reader/actionability critique + examples or acceptance proof.
- Asset/icon/copy tweak: surface-specific inspection + adjacent context audit + before/after proof.
- Broad quality mission: domain lane + council roles + grilling checkpoint + proof lane + delegated reviewer when subagents are available and the added independence can change decisions + wayfinding when the route is foggy.

## Hard Rules

- Do not proceed with only `quality-obsessed` on multi-surface work when relevant domain/proof skills are available.
- Do not load every possible skill. More context is not quality; useful pressure is.
- Do not spawn every possible reviewer. Use the smallest reviewer set that can catch independent failure modes.
- Do not let uncited current/external facts decide quality direction when primary sources are reachable.
- Do not force foggy missions into implementation. Map the decision frontier or mark the blocker.
- Do not publish multi-ticket work without blockers and a visible frontier.
- Do not count tautological or private-seam tests as proof.
- If an obvious domain skill is unavailable, state the fallback and compensate with stronger inspection/proof.
- If a selected skill or tool produces no observable action or proof, remove it from the stack and record the gap.
- If delegated review is expected but unavailable, say so and run the same role internally as a named independent pass.
- If the artifact still looks or behaves like the baseline after the stack is applied, the stack failed; reselect before continuing loops.

The stack is ready when every lane has a selected tool/skill or an explicit reason it is unnecessary, selected council/grilling pressure has a job, each selected item is mapped to a quality layer plus proof, and any delegated reviewer has a bounded role plus reconciliation plan.
