# Contributing

Quality Obsessed is a portable Agent Skills package. Keep changes agent-agnostic unless a host-specific file is explicitly additive.

## Before opening a pull request

1. Install the pinned toolchain with `pnpm install --frozen-lockfile`.
2. Run `pnpm run check`.
3. Run `pnpm run smoke:discovery` when changing package layout, metadata, or discovery guidance.
4. Update the nearest behavioral case when a contract changes.
5. Keep public documentation and examples in English.

Do not weaken an assertion to make a behavior change pass. Explain any platform-specific limitation in the pull request.
