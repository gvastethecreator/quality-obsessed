# Quality Obsessed

![Quality Obsessed banner](./assets/readme-banner.png)

> A portable [Agent Skills](https://agentskills.io/) workflow for evidence-gated, persistent quality missions and context-adaptive professional councils: inspect the real artifact, improve the authorized surface, and prove every material claim.

[![License: MIT](https://shieldcn.dev/badge/license-MIT-yellow.svg?variant=secondary&size=xs)](./LICENSE)
[![Status](https://shieldcn.dev/badge/status-preview-purple.svg?variant=secondary&size=xs)](#status)

The runtime contract is agent-agnostic. It works with Codex, Claude Code, OpenCode, and other clients or open-source models that can load the Agent Skills format. Product-specific metadata is additive and never required to understand the workflow.

## Use it when

- The user explicitly asks for obsessive, exhaustive, baseline-beating quality.
- A prior result was rejected as bland, generic, fragile, or incomplete.
- A difficult artifact needs a persistent eval-driven improvement loop.
- A quality council needs professional lenses adapted to the artifact instead of a fixed panel.
- The task needs adversarial evidence without confusing task completion with artifact quality.

Do not activate it implicitly for routine fixes, ordinary reviews, explanations, or status checks. Explicit invocation still works for any task.

## Install

The Skills CLI can install the package for supported agents and lets you choose the target host and scope when needed:

```powershell
npx skills@1.5.15 add gvastethecreator/quality-obsessed
```

For manual project installation, copy or link `SKILLS/quality-obsessed` to the host's skill directory:

| Host | Project location | User location | Typical explicit invocation |
|---|---|---|---|
| Codex | `.agents/skills/quality-obsessed` | `~/.agents/skills/quality-obsessed` | Run `/skills`, mention `$quality-obsessed`, or choose it from the skill picker |
| Claude Code | `.claude/skills/quality-obsessed` | `~/.claude/skills/quality-obsessed` | `/quality-obsessed` |
| OpenCode | `.opencode/skills/quality-obsessed` | `~/.config/opencode/skills/quality-obsessed` | Ask the agent to load `quality-obsessed`; OpenCode uses its native skill tool |
| Generic Agent Skills host | `.agents/skills/quality-obsessed` when supported | Host-specific | Use the host's explicit skill mechanism |

OpenCode also discovers Claude-compatible `.claude/skills` and agent-compatible `.agents/skills` locations. See the official [Codex skills](https://developers.openai.com/codex/skills), [Claude Code skills](https://code.claude.com/docs/en/slash-commands), and [OpenCode Agent Skills](https://dev.opencode.ai/docs/skills) documentation for host-specific discovery and permissions.

After copying the complete folder, verify discovery through the host rather than assuming the path worked: use `/skills` in Codex, `/quality-obsessed` in Claude Code, `opencode debug skill` in OpenCode, or the equivalent skill inventory in a generic host.

## Contract

The skill separates three questions that older quality workflows often conflate:

- task_state: `completed | blocked` — whether the requested work completed. Use `blocked` only when an external constraint prevents meaningful continuation, not when the artifact is weak.
- artifact_verdict: `win | tie | loss | not-assessed` — whether the artifact beats the baseline or acceptance target; use `not-assessed` when no honest comparison is available.
- verification_state: `verified | limited | unverified` — whether claims have complete proof, partial proof with named gaps, or no usable proof.

For example, `completed + loss + verified` means an audit finished successfully, proved its conclusion, and found that the artifact does not meet the target.

It selects one mission mode:

- `change`: improve only the authorized target.
- `diagnose`: determine cause without silently implementing a fix.
- `audit`: inspect and report without mutating the target.
- `recovery`: replace a rejected or losing direction.
- `goal`: pursue an explicitly durable objective through checkpoints.

Every evidence gate is selected as required, conditional, or not applicable. Desktop-only software does not invent mobile proof; documentation counts as an artifact; static inspection cannot certify runtime or visual claims.

## Context-adaptive Council

Council is a compact branch, not a separate framework or fixed cast. Activate it when the user explicitly requests one or when two or more materially different failure modes need judgment together. Select 2-4 non-overlapping lenses from the artifact, outcome, risk, and professional domain, then make every lens inspect the same real evidence and converge on one decision, next artifact move, and closing proof.

The professional lens changes with the work. A realtime visual-effects application should include a **Professional VFX Artist / Technical Director** perspective; an audio mastering application should include a **Professional Mastering Engineer**; games, financial workflows, and developer platforms should receive their own relevant specialists. Supporting lenses exist only when they add material judgment. Internal personalities remain structured self-review, not independent review, unless a fresh external or delegated reviewer actually participates.

## Creative Search

Creative Search activates only for an explicit creative, standout, greenfield, or direction-risk request. It is skipped for routine fixes and conformance work. Build three cheap representative artifacts with materially different theses, structures, or behaviors; compare them on user value, signature, feasibility, and proof; and choose one explicitly. Do not default to a hybrid. Add one memorable useful signature, subtract one generic or diluting element, then run a blind audience read without the brief: understood, action, memory, mismatch. Resolve material mismatch before commit. The detailed route and evidence contract lives in [creative-search.md](./SKILLS/quality-obsessed/references/creative-search.md).

## Deep persistence

Deep persistence activates when the user explicitly asks for an obsessive, exhaustive, no-limit, baseline-beating, or durable goal-like mission. It also activates by default for an explicitly invoked substantial, broad, or quality-sensitive mission when the user supplies no budget, time limit, or loop count and meaningful in-scope weaknesses remain. A routine small or explicitly bounded task does not inherit 10 loops, and loading durable task-record guidance alone does not activate them. Persistent work inside the current task does not require a durable goal:

- Exactly one mandatory floor: 10 valid loops once Deep Persistence activates.
- No hard maximum.
- Dynamic evidence-backed backlog; no pre-invented quota of 10 weaknesses.
- Compact epochs of five loops.
- Loop 10 verdict: `continue`, `ask`, or `stop`; repeat the judgment at later epoch boundaries while continuing.
- A host-specific durable-run capability is used only when the user explicitly requests it.

Loop count is never the quality claim. The artifact and its proof decide the verdict.

## Model-routed orchestration

Plans split judgment from execution when the host supports per-task model selection. Every step names its intended model and reasoning effort, deliverable, and proof; selectable tasks must actually dispatch that route rather than merely display its label. In Codex, planning, audits, feature thinking, critiques, architecture, and final reconciliation use `gpt-5.6-sol` with `xhigh` reasoning. Bounded implementation, specific changes, test creation, focused verification, and simple tasks use `gpt-5.6-luna` with `max` reasoning. If an execution task becomes ambiguous, it returns to the judgment route before more edits.

Every Luna/max task starts pending and stays pending until a Sol/xhigh audit returns `accept`, `repair`, or `reset`. Keep the Luna brief action-first and the conversation minimal. Per task, run only focused tests and a real check/typecheck for the edited file when one exists; skip and record N/A when it does not. Full tests, builds, and repository-wide typechecks are prohibited per task; run them once after multiple Sol-accepted tasks or final batch, then have Sol audit the gates.

Unavailable model routing does not block otherwise safe work: the plan preserves the intended route and the final record discloses the actual fallback. The mandatory Sol/xhigh audit cannot fallback; if exact Sol/xhigh is unavailable, the Luna task remains pending and cannot close or continue. See [orchestration.md](./SKILLS/quality-obsessed/references/orchestration.md) for the handoff and batch-verification contract.

## Package layout

- [SKILL.md](./SKILLS/quality-obsessed/SKILL.md): compact router and core loop.
- [protocol.md](./SKILLS/quality-obsessed/references/protocol.md): canonical modes, state axes, severities, and transitions.
- [evidence.md](./SKILLS/quality-obsessed/references/evidence.md): applicable-gate manifest and proof rules.
- [creative-search.md](./SKILLS/quality-obsessed/references/creative-search.md): explicit creative direction search, signature/subtraction, and blind audience read.
- [persistence.md](./SKILLS/quality-obsessed/references/persistence.md): dynamic deep persistence and continuation policy.
- [orchestration.md](./SKILLS/quality-obsessed/references/orchestration.md): role-based planning, delegation, and Codex model routing.
- [pressure.md](./SKILLS/quality-obsessed/references/pressure.md): context-adaptive Council, adversarial autopsy, and independent pressure.
- [host-capabilities.md](./SKILLS/quality-obsessed/references/host-capabilities.md): agent-agnostic capability mapping.
- [evals/cases.json](./evals/cases.json): behavioral matrix for generic hosts, Codex, Claude Code, and OpenCode.

The installed package includes its own MIT license. This distribution also requires additive Codex UI metadata for its main host; other hosts can ignore `agents/openai.yaml`, and the Markdown runtime does not depend on it.

## Validate

Install the repository's validation dependency and run the complete quality gate. The installed skill bundle itself remains dependency-free.

```powershell
npm install
npm run check
```

It validates the skill contract and behavioral catalog, runs the Node test suite, copies the full package once into a clean relocation sandbox, verifies hashes, and checks the installed license. Host paths are documentation contracts; discovery is verified separately so repeated copies do not masquerade as four independent host tests. No paid model call runs in CI.

The pinned Skills CLI discovery smoke performs no model call and confirms that the repository source resolves to exactly one skill, including on case-sensitive filesystems:

```powershell
npm run smoke:discovery
```

This repository is the canonical source. Compare any installed or mirrored copy before relying on it:

```powershell
node scripts/compare-skill-copy.mjs SKILLS/quality-obsessed <installed-skill-path>
```

The tracked `agents-matrix` mirror is generated one-way from this package. With the sibling repositories in their standard layout, check or refresh it deterministically:

```powershell
npm run mirror:check
npm run mirror:write
```

The writer stages and verifies the canonical file set before swapping an identity-checked `skills/quality-obsessed` target, restores the prior mirror if the commit step fails, recovers an identity-checked backup after an interrupted swap, rejects junction targets and immediate `skills` parents, and verifies exact file parity after the write. Pass `--source` and `--target` directly to the script for a different checkout layout.

CI executes the same check on Windows and Linux.

## Status

Preview. The package is contract-tested and agent-agnostic; release tagging remains a maintainer action, while the local downstream mirror has an executable parity gate.
