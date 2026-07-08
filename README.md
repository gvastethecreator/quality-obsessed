# Quality Obsessed

![Quality Obsessed banner](./assets/readme-banner.png)

> Codex skill pack for evidence-gated quality work: inspect the real artifact, improve it directly, and prove the result before calling it done.

[![License: MIT](https://shieldcn.dev/badge/license-MIT-yellow.svg?variant=secondary&size=xs)](./LICENSE)
[![Status](https://shieldcn.dev/badge/status-preview-purple.svg?variant=secondary&size=xs)](#status)

Quality Obsessed is a workflow skill for making the delivered artifact visibly better, not just producing more process around it. It pushes Codex to look at the thing itself, name concrete weaknesses, fix them in the artifact, and attach proof to every claim of improvement.

The core rule is simple: at least 70% of the work must directly inspect or directly change the artifact. Planning, reference reading, and progress logging are useful only when they help improve what a user can see, run, or verify.

Use it when a task needs more than a competent first pass:

- UI, prototype, visual, product, code, docs, and output polish.
- Work where "looks better" or "more robust" must be backed by screenshots, tests, command output, or reviewed diffs.
- Tasks where hidden edge cases, empty states, hostile inputs, or weak first impressions would make the result feel unfinished.
- Situations where the agent should keep iterating until evidence gates pass, not until a pass count or plan says enough.

Do not use it to turn every tiny task into ceremony. The point is better artifacts, not bigger process.

## Quick Install

Download this repo or ask Codex to install `quality-obsessed` in your workspace.

The shipped skill lives at:

- [`SKILLS/quality-obsessed/SKILL.md`](./SKILLS/quality-obsessed/SKILL.md)

For local skill collections, copy or install the `SKILLS/quality-obsessed` folder into the target Codex skills directory.

## How It Works

The skill runs a tight evidence loop:

1. Look at the real thing: render it, run it, screenshot it, execute it, or test it.
2. Name one concrete weakness that a reviewer could also find.
3. Fix the artifact so the user-visible output or tested behavior changes.
4. Prove the fix with captured evidence.
5. Issue an honest verdict: `substantially better`, `mixed`, `flat`, or `worse`.

There is no fixed number of passes. Evidence decides whether the work is done. Two consecutive `flat` or `worse` verdicts mean the current direction needs to change instead of receiving more polish.

## Evidence Gates

The skill treats these gates as required before a quality win:

- **Side-by-side:** compare the final artifact with the baseline so the improvement is nameable.
- **States:** verify empty, loading, error, overflow, and happy-path states when the surface can have them.
- **Hostile input:** run malformed, missing, boundary, and failure-path cases for touched code.
- **First impression:** for visual work, inspect real screenshots at desktop and mobile widths.
- **No self-certification:** every improvement claim needs evidence, not optimistic prose.

Final status must be one of `quality win`, `failed`, or `blocked`.

## What's Inside

- [`SKILL.md`](./SKILLS/quality-obsessed/SKILL.md): the main artifact-first quality loop, evidence gates, verdict discipline, and environment mapping.
- [`references/gates.md`](./SKILLS/quality-obsessed/references/gates.md): detailed gate definitions, evidence formats, verdict rules, and anti-theater rules.
- [`references/critique.md`](./SKILLS/quality-obsessed/references/critique.md): concrete critique, five-second visual read, palette and hierarchy checks, and direction reset.
- [`references/examples.md`](./SKILLS/quality-obsessed/references/examples.md): good and bad examples for critique, fixes, evidence, side-by-side verdicts, honest failure, and direction reset.

## Status

Preview skill pack.

- The previous council-style reference set has been replaced by a smaller evidence-gated skill.
- Best for substantial, review-sensitive, visual, product, code, docs, and prototype work.
- Not meant to turn every tiny task into a ceremony.

## License

MIT.
