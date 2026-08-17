<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/header/document.svg?title=Quality+Obsessed&subtitle=Evidence+before+victory+laps.&logo=target&theme=green&align=center&mode=dark" />
    <img alt="Quality Obsessed — evidence before victory laps" src="https://shieldcn.dev/header/document.svg?title=Quality+Obsessed&subtitle=Evidence+before+victory+laps.&logo=target&theme=green&align=center&mode=light" />
  </picture>
</p>

> A portable [Agent Skills](https://agentskills.io/) workflow for evidence-gated, persistent quality missions and context-adaptive professional councils: inspect the real artifact, improve the authorized surface, and prove every material claim.

<p align="center">
  <a href="https://github.com/gvastethecreator/quality-obsessed/actions/workflows/validate.yml"><img alt="Validation status" src="https://shieldcn.dev/github/ci/gvastethecreator/quality-obsessed.svg?workflow=validate&branch=main&variant=secondary&size=xs" /></a>
  <a href="https://gvastethecreator.github.io/quality-obsessed/"><img alt="Project site" src="https://shieldcn.dev/badge/site-pages-166534.svg?logo=githubpages&variant=branded&size=xs" /></a>
  <a href="https://agentskills.io/"><img alt="Agent Skills compatible" src="https://shieldcn.dev/badge/Agent+Skills-compatible-111111.svg?variant=secondary&size=xs" /></a>
  <a href="https://github.com/gvastethecreator/quality-obsessed/stargazers"><img alt="GitHub stars" src="https://shieldcn.dev/github/stars/gvastethecreator/quality-obsessed.svg?variant=secondary&size=xs" /></a>
  <a href="LICENSE"><img alt="MIT license" src="https://shieldcn.dev/github/license/gvastethecreator/quality-obsessed.svg?variant=secondary&size=xs" /></a>
</p>

[Project site](https://gvastethecreator.github.io/quality-obsessed/) · [Install](#install) · [Quality contract](#contract) · [Contributing](CONTRIBUTING.md)

The runtime contract is model- and harness-agnostic. It works in any environment that can load or include the Agent Skills Markdown contract. Product-specific metadata is additive and never controls quality decisions.

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

## Execution discipline

The skill captures the purpose that changes acceptance, acts once the minimum facts are known, and reuses settled facts and decisions until new evidence changes them. An approval, access, or user-input blocker stops only its own lane while safe independent work remains. Milestone and final claims must point to current evidence or a durable proof record tied to the same artifact revision.

Code changes receive a final structural check for ad-hoc branches, thin pass-through wrappers, leaked feature logic, and avoidable file sprawl. Before ending, the skill completes any safe in-scope work still promised by its response. A requested plan, audit, or explanation counts as the deliverable; other work ends when the requested result is done or explicitly blocked.

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

## Capability-based orchestration

Set the acceptance contract and required gates before selecting a route. Delegation is optional, and the orchestrator may execute directly. Another context is useful only when its capabilities, isolation, parallelism, or independence add material value.

Select routes by capability fit, context, risk, dependencies, proof, and independence. Use cost and latency only after a route meets the quality floor. Do not use a provider, model family, tier, benchmark, or reasoning level as quality evidence. The current harness maps the required capabilities to its available execution contexts.

Judge every return against the same gates. If a gate fails, repair the cause, retry, select a better-fit route, or request independent review. Focused proof plus orchestrator reconciliation can close low-risk output. Important or high-risk work uses independent review when it can change acceptance. Per task, run focused checks only. Run repository-wide tests, builds, and typechecks once at the integration boundary or final batch. See [orchestration.md](./SKILLS/quality-obsessed/references/orchestration.md) for the full contract.

## Package layout

- [SKILL.md](./SKILLS/quality-obsessed/SKILL.md): compact router and core loop.
- [protocol.md](./SKILLS/quality-obsessed/references/protocol.md): canonical modes, state axes, severities, and transitions.
- [evidence.md](./SKILLS/quality-obsessed/references/evidence.md): applicable-gate manifest and proof rules.
- [creative-search.md](./SKILLS/quality-obsessed/references/creative-search.md): explicit creative direction search, signature/subtraction, and blind audience read.
- [persistence.md](./SKILLS/quality-obsessed/references/persistence.md): dynamic deep persistence and continuation policy.
- [orchestration.md](./SKILLS/quality-obsessed/references/orchestration.md): quality-first planning, bounded handoffs, and capability-based route selection.
- [pressure.md](./SKILLS/quality-obsessed/references/pressure.md): context-adaptive Council, adversarial autopsy, and independent pressure.
- [host-capabilities.md](./SKILLS/quality-obsessed/references/host-capabilities.md): agent-agnostic capability mapping.
- [evals/cases.json](./evals/cases.json): behavioral matrix for any capability-compatible harness.

The installed package includes its own MIT license. This distribution also requires additive Codex UI metadata for its main host; other hosts can ignore `agents/openai.yaml`, and the Markdown runtime does not depend on it.

## Validate

Install the repository's validation dependency and run the complete quality gate. The installed skill bundle itself remains dependency-free.

```powershell
pnpm install --frozen-lockfile
pnpm run check
```

It validates the skill contract and behavioral catalog, runs the Node test suite, copies the full package once into a clean relocation sandbox, verifies hashes, and checks the installed license. Host paths are documentation contracts; discovery is verified separately so repeated copies do not masquerade as four independent host tests. No paid model call runs in CI.

The pinned Skills CLI discovery smoke performs no model call and confirms that the repository source resolves to exactly one skill, including on case-sensitive filesystems:

```powershell
pnpm run smoke:discovery
```

This repository is the canonical source. Compare any installed copy before relying on it:

```powershell
node scripts/compare-skill-copy.mjs SKILLS/quality-obsessed <installed-skill-path>
```

Managed workspace installations should use direct junctions or symbolic links to `SKILLS/quality-obsessed`, so one canonical package owns the files. The workspace bootstrap and audit tooling owns those links; this package does not maintain a second physical mirror.

## Status

Preview. The package is contract-tested and agent-agnostic; release tagging remains a maintainer action, while package relocation and host discovery have executable gates.

## Support

If this workflow helps you ship more honest work, support its maintenance through [GitHub Sponsors](https://github.com/sponsors/gvastethecreator) or [Ko-fi](https://ko-fi.com/gvaste). Security reports belong in the private channel documented in [SECURITY.md](SECURITY.md).
