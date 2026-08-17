# Dependency review — 2026-08-15

- Migrated npm scripts/lockfile to pnpm 11.21.0; no Bun runtime was found.
- `yaml` remains at 2.9.0, the current registry release; no dependency upgrade was available.
- Upstream release notes: <https://github.com/eemeli/yaml/releases>.
- The installed skill bundle remains dependency-free; `yaml` is used only by repository validation.
