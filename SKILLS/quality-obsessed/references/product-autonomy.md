# Product Autonomy

Use this when a quality mission can improve the product by discovering facts, mapping fog, or touching adjacent surface without waiting for the user to name every move.

Autonomy means "find the next evidence-backed product improvement." It does not mean "wander." The 70% artifact rule still applies: research, mapping, and notes must quickly change the artifact, critique, proof, or decision frontier.

## Automatic Research

Research is automatic when any material claim could change the quality bar, implementation path, risk, or final status.

Trigger it for:

- current docs, APIs, SDK behavior, standards, laws, pricing, browser/runtime behavior, or external claims.
- repo facts that are cheap to verify in source, tests, docs, changelog, or logs.
- product/domain facts where guessing would choose the wrong UX, copy, workflow, metric, or acceptance criterion.
- independent expected values for tests or QA.

Do the smallest useful research pass:

```text
Question:
Decision it unblocks:
Primary source(s):
Finding:
Uncertainty:
Next artifact move:
```

Write a durable note only when the fact is current/external, disputed, reusable, likely to be needed by another agent, or part of a multi-slice mission. Otherwise, keep the cited finding in the task record or final response.

## Automatic Wayfinding

Wayfinding is automatic when quality depends on a route that is not yet visible enough for implementation, spec, or tickets.

Trigger it for:

- migrations, multi-surface redesigns, broad product changes, architecture shifts, long investigations, or workflows with unknown blockers.
- repeated flat/worse loop verdicts where the issue is not local craft but unclear direction.
- fog that cannot yet be phrased as a one-ticket task.
- conflicting viable paths where the tradeoff changes user outcome, risk, or proof.

Use the smallest decision map that helps:

```text
Destination:
Known facts:
Decisions needed:
Fog:
Frontier ticket:
Blocked by:
Next artifact move if resolved:
```

If the frontier ticket is research or repo inspection, work it. If it is a human product/architecture decision, ask one focused question. If the path becomes clear, stop mapping and implement.

## Adjacent Product Improvement

Quality-obsessed work may expand past the literal request when the adjacent improvement is:

- visible to the user or reviewer.
- connected to the same artifact, state, workflow, or risk.
- low-risk and reversible.
- proveable in the same verification lane.
- likely to raise trust, usability, recovery, correctness, maintainability, or decision quality.

Examples:

- A button-label request reveals the empty state has no recovery path: fix the empty-state copy, CTA hierarchy, and retry proof.
- A bug fix reveals the same helper drives an adjacent upload path: add the shared regression test and inspect the adjacent path.
- A UI polish task depends on the current component library API: check the official docs before choosing implementation.

Ask before expanding into product direction, durable architecture, spend, external dependencies, data/security posture, brand identity, release/versioning, irreversible migration, or work that needs user taste/preference.

## Loop Integration

At each quality loop:

1. If the next weakness depends on a fact, do automatic research before fixing.
2. If the next weakness is foggy, map the frontier before fixing.
3. If the next weakness is adjacent but materially affects the user outcome, include it or ask if it crosses a boundary.
4. If research or wayfinding does not change the artifact, critique, proof, or decision frontier, stop that branch and return to the artifact.

## Final Status

When product autonomy changed the mission, name it briefly:

```text
Autonomy used:
Research finding:
Wayfinding decision/frontier:
Adjacent improvement:
Boundary asked or respected:
Proof:
```

Do not hide expanded scope. The user should be able to see why the extra move served the product.
