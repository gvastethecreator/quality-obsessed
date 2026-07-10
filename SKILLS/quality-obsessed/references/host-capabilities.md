# Host Capability Mapping

Keep the runtime contract independent of model vendor, client, shell, and operating system. Map capabilities to the tools exposed by the current host; never assume a command name or directory layout from another environment.

## Capability map

| Contract capability | Acceptable host implementation |
|---|---|
| Load skill | Native skill loader, explicit skill invocation, or compatible prompt package |
| Inspect files | Read/search tools or a safe shell |
| Execute and test | Authorized shell, sandbox, test runner, or remote execution tool |
| Inspect visual output | Browser automation, screenshot, preview, image viewer, or supplied capture |
| Research current facts | Web/search tool with primary-source access |
| Independent review | Fresh subagent, separate session, external reviewer, or blind judge |
| Durable continuation | Goal, task, loop, background-run, or resumable checkpoint mechanism |
| Durable task state | Repository workplan, scratch plan, issue, task record, or host memory |

Use paths relative to the skill root when reading bundled references. Product-specific metadata directories are optional enhancements; the Markdown contract must remain usable when a host ignores them.

## Missing capabilities

- Without safe execution, verify static claims only and mark runtime proof limited.
- Without visual inspection, do not pass visual gates from source code.
- Without independent review, run a named internal adversarial pass but do not call it independent.
- Without durable continuation, work in compact epochs inside the current session and report the exact resumable checkpoint; do not claim background persistence.
- Without durable task state, keep a compact frontier in the current task and include the exact resume action in the final record.
- Without web access, use repository-owned sources and identify current/external claims that remain uncertain.

Host permissions and user authorization still govern every capability. Availability never implies permission.
