# Host Capability Mapping

Runtime contract is independent of model vendor, client, shell, and OS. Map capabilities to tools this host exposes; never assume a command name or directory layout from another environment.

## Capability map

| Contract capability | Acceptable host implementation |
|---|---|
| Load skill | Native loader, explicit invocation, or compatible prompt package |
| Inspect files | Read/search tools or safe shell |
| Execute and test | Authorized shell, sandbox, test runner, or remote execution |
| Inspect visual output | Browser automation, screenshot, preview, image viewer, or supplied capture |
| Research current facts | Web/search with primary-source access |
| Independent review | Fresh subagent, separate session, external reviewer, or blind judge |
| Bounded handoff | Agent, queued worker, separate session, remote job, tool, or human collaborator |
| Durable continuation | Goal, task, loop, background-run, or resumable checkpoint mechanism |
| Durable task state | Repository workplan, scratch plan, issue, task record, or host memory |

Read bundled references relative to skill root. Product-specific metadata directories are optional; Markdown contract must stay usable if a host ignores them.

## Missing capabilities

- No safe execution: static claims only; runtime proof limited.
- No visual inspection: do not pass visual gates from source.
- No independent review: named internal adversarial pass; do not call it independent.
- No other execution context: keep acceptance contract; execute directly. Do not invent delegation or decorative route labels.
- No route controls: current harness maps required capabilities. Disclose a limit only when it affects trust, cost, or review strength.
- No durable continuation: compact epochs in current session; report the exact resumable checkpoint. Do not claim background persistence.
- No durable task state: compact frontier in current task; include the exact resume action in the final record.
- No web access: repository-owned sources; identify current/external claims that remain uncertain.

Host permissions and user authorization still govern every capability. Availability never implies permission.
