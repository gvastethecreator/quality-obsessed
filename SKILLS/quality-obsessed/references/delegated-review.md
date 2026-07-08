# Delegated Review

Use this when subagents, parallel reviewers, or independent review passes are available and could materially improve the artifact. Delegation is encouraged for substantial quality work, but only when the reviewer gets a narrow job and produces evidence or decisions the main agent can act on.

Delegation is optional for tiny work, private context, missing tool support, or when the main agent can inspect the artifact faster than coordinating reviewers. If the user explicitly invoked obsession, still consider whether one independent critic, adversary, or proof pass would catch a failure mode the main agent might miss.

## When To Delegate

Call a subagent or run an independent review pass when any of these apply:

- the work is broad, risky, visual, product-facing, security/data-sensitive, or user-declared obsessive.
- the mission enters persistence mode and has enough surface area for independent critique.
- the main agent has two `flat`, `mixed`, or `worse` verdicts.
- the artifact needs a domain expert, adversarial reviewer, visual critic, code reviewer, proof reviewer, or simplification pass.
- the mission contract has unresolved tradeoffs and a reviewer can evaluate evidence without asking the user.

Do not delegate when the task is a one-line fix, the reviewer would only restate the prompt, or the subagent would need secrets/production access the main agent should not share.

## Reviewer Roles

Pick the smallest useful set:

- **Critic:** finds concrete weaknesses from the rendered/executed artifact.
- **Adversary:** attacks assumptions, edge cases, hostile inputs, and failure paths.
- **Domain reviewer:** checks code, product, design, game, docs, data, or workflow fit.
- **Visual reviewer:** inspects screenshots, target read, art direction, hierarchy, responsiveness, and visual horizon.
- **Proof reviewer:** checks whether evidence actually supports the quality claim.
- **Simplifier:** cuts scope, abstractions, options, and process that do not improve the artifact.
- **Orchestrator:** proposes the smallest stack of domain, critique, proof, and reference tools for a broad mission.

## Brief Shape

Give each reviewer a bounded brief:

```text
Artifact and goal:
Baseline:
Evidence to inspect:
Your role:
Find 3-5 highest-impact issues:
For each issue: location, failure, user impact, fix sketch, proof needed.
Do not: restate generic advice, expand scope without proof, or certify quality from prose.
```

Ask reviewers for findings, not implementation ownership, unless the user explicitly wants parallel execution. The main agent remains responsible for integration, tradeoffs, and final status.

## Reconciliation

After delegated review:

```text
Reviewer:
Findings accepted:
Findings rejected:
Reason:
Artifact changes made:
Proof:
Remaining risk:
```

Accepted findings must enter the backlog, mission contract, task record, or final response. Rejected findings need a reason so they are not reopened blindly.

If reviewers disagree, prefer evidence over confidence. If evidence is insufficient, run the smallest proof that can decide. Do not average opinions into a mushy compromise.

## Hard Rules

- No subagent theater: a delegated review counts only if it changes the artifact, backlog, proof, or decision.
- No hidden delegation: final status must say which delegated review ran or why it was skipped when expected.
- No blind acceptance: the main agent must reconcile accepted and rejected findings.
- No proof laundering: a reviewer saying "looks good" is not evidence.
- No context dumping: give reviewers only the artifact, goal, baseline, evidence, role, constraints, and requested output.
- No endless review loop: if a second reviewer would not inspect new evidence or resolve a material conflict, continue improving the artifact instead.
