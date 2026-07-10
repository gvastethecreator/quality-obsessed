#!/usr/bin/env node
import { createHash, randomUUID } from "node:crypto";
import {
  access,
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSource = path.join(repoRoot, "SKILLS", "quality-obsessed");
const defaultTarget = path.resolve(
  repoRoot,
  "..",
  "agents-matrix",
  "skills",
  "quality-obsessed",
);
const stagePrefix = ".quality-obsessed.sync-stage-";
const backupPrefix = ".quality-obsessed.sync-backup-";

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

function isSameOrInside(candidate, parent) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function assertSafePaths(source, target) {
  if (
    path.basename(target).toLowerCase() !== "quality-obsessed" ||
    path.basename(path.dirname(target)).toLowerCase() !== "skills"
  ) {
    throw new Error(
      `Unsafe mirror target: expected a skills/quality-obsessed directory, got ${target}`,
    );
  }
  if (isSameOrInside(target, source) || isSameOrInside(source, target)) {
    throw new Error("Source and mirror target must be separate, non-nested directories.");
  }
}

function skillNameFromMarkdown(content) {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return frontmatter?.[1].match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1];
}

async function assertRealMirrorParent(target) {
  const parent = path.dirname(target);
  try {
    const parentStat = await lstat(parent);
    if (parentStat.isSymbolicLink()) {
      throw new Error(
        `Mirror target parent must be a real directory, not a junction or symbolic link: ${parent}`,
      );
    }
    if (!parentStat.isDirectory()) {
      throw new Error(`Mirror target parent is not a directory: ${parent}`);
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function assertRealMirrorTargetIfPresent(target) {
  try {
    const targetStat = await lstat(target);
    if (targetStat.isSymbolicLink()) {
      throw new Error(
        `Mirror target must be a real directory, not a junction or symbolic link: ${target}`,
      );
    }
    if (!targetStat.isDirectory()) {
      throw new Error(`Mirror target is not a directory: ${target}`);
    }
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function resolvePhysicalCandidate(candidate) {
  let cursor = candidate;
  const suffix = [];
  while (true) {
    try {
      return path.join(await realpath(cursor), ...suffix);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      const parent = path.dirname(cursor);
      if (parent === cursor) throw error;
      suffix.unshift(path.basename(cursor));
      cursor = parent;
    }
  }
}

async function assertPhysicalSeparation(source, target) {
  const [physicalSource, physicalTarget] = await Promise.all([
    realpath(source),
    resolvePhysicalCandidate(target),
  ]);
  if (
    isSameOrInside(physicalTarget, physicalSource) ||
    isSameOrInside(physicalSource, physicalTarget)
  ) {
    throw new Error(
      "Physical source and mirror target must be separate, non-nested directories.",
    );
  }
}

function assertManagedScratchPath(candidate, parent, prefix) {
  if (
    path.dirname(candidate) !== parent ||
    !path.basename(candidate).startsWith(prefix)
  ) {
    throw new Error(`Refusing unsafe mirror scratch path: ${candidate}`);
  }
}

async function removeManagedScratch(candidate, parent, prefix) {
  assertManagedScratchPath(candidate, parent, prefix);
  await rm(candidate, { recursive: true, force: true });
}

async function managedScratchDirectories(parent, prefix) {
  if (!(await exists(parent))) return [];
  const matches = [];
  for (const entry of await readdir(parent, { withFileTypes: true })) {
    if (!entry.name.startsWith(prefix)) continue;
    const candidate = path.join(parent, entry.name);
    assertManagedScratchPath(candidate, parent, prefix);
    if (entry.isSymbolicLink() || !entry.isDirectory()) {
      throw new Error(`Unsafe mirror recovery entry: ${candidate}`);
    }
    matches.push(candidate);
  }
  return matches.sort();
}

async function assertSkillDirectoryIdentity(directory, label) {
  const skillFile = path.join(directory, "SKILL.md");
  if (
    !(await exists(skillFile)) ||
    skillNameFromMarkdown(await readFile(skillFile, "utf8")) !==
      "quality-obsessed"
  ) {
    throw new Error(`${label} identity is not quality-obsessed: ${directory}`);
  }
}

async function recoverInterruptedCommit(target) {
  const parent = path.dirname(target);
  const stages = await managedScratchDirectories(parent, stagePrefix);
  for (const stage of stages) {
    await removeManagedScratch(stage, parent, stagePrefix);
  }
  const backups = await managedScratchDirectories(parent, backupPrefix);
  if (backups.length === 0) return;

  if (!(await exists(target))) {
    if (backups.length !== 1) {
      throw new Error(
        `Cannot safely recover mirror: target is missing with ${backups.length} backups in ${parent}`,
      );
    }
    await assertSkillDirectoryIdentity(backups[0], "Mirror backup");
    await rename(backups[0], target);
    return;
  }

  await assertSkillDirectoryIdentity(target, "Mirror target");
  for (const backup of backups) {
    await removeManagedScratch(backup, parent, backupPrefix);
  }
}

async function collectFileMap(root) {
  const files = new Map();
  if (!(await exists(root))) return files;

  async function walk(directory) {
    const rootStat = await lstat(directory);
    if (rootStat.isSymbolicLink()) {
      throw new Error(`Refusing to traverse a symbolic link or junction: ${directory}`);
    }
    if (!rootStat.isDirectory()) {
      throw new Error(`Expected a directory: ${directory}`);
    }

    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        throw new Error(`Refusing to traverse a symbolic link or junction: ${fullPath}`);
      }
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (!entry.isFile()) {
        throw new Error(`Unsupported mirror entry: ${fullPath}`);
      }
      const relative = path.relative(root, fullPath).replaceAll("\\", "/");
      const bytes = await readFile(fullPath);
      files.set(relative, createHash("sha256").update(bytes).digest("hex"));
    }
  }

  await walk(root);
  return files;
}

function compareFileMaps(sourceFiles, targetFiles) {
  const missing = [...sourceFiles.keys()]
    .filter((file) => !targetFiles.has(file))
    .sort();
  const extra = [...targetFiles.keys()]
    .filter((file) => !sourceFiles.has(file))
    .sort();
  const changed = [...sourceFiles.keys()]
    .filter(
      (file) =>
        targetFiles.has(file) && sourceFiles.get(file) !== targetFiles.get(file),
    )
    .sort();
  return {
    ok: missing.length === 0 && extra.length === 0 && changed.length === 0,
    missing,
    extra,
    changed,
  };
}

export async function syncSkillMirror({
  sourcePath,
  targetPath,
  mode,
  beforeCommit,
}) {
  if (!new Set(["check", "write"]).has(mode)) {
    throw new Error(`Unknown mirror mode: ${mode}`);
  }

  const source = path.resolve(sourcePath);
  const target = path.resolve(targetPath);
  assertSafePaths(source, target);
  await assertRealMirrorParent(target);

  const sourceSkillPath = path.join(source, "SKILL.md");
  if (!(await exists(sourceSkillPath))) {
    throw new Error(`Canonical skill is missing SKILL.md: ${source}`);
  }
  const sourceIdentity = skillNameFromMarkdown(
    await readFile(sourceSkillPath, "utf8"),
  );
  if (sourceIdentity !== "quality-obsessed") {
    throw new Error(
      `Canonical skill identity is not quality-obsessed; refusing to sync: ${source}`,
    );
  }
  await assertPhysicalSeparation(source, target);
  let targetExists = await assertRealMirrorTargetIfPresent(target);
  if (mode === "write") {
    await recoverInterruptedCommit(target);
    targetExists = await assertRealMirrorTargetIfPresent(target);
  }
  if (targetExists) {
    if (mode === "write") {
      const entries = await readdir(target);
      if (entries.length > 0) {
        const identityPath = path.join(target, "SKILL.md");
        if (!(await exists(identityPath))) {
          throw new Error(
            `Mirror target identity is missing; refusing to prune nonempty directory: ${target}`,
          );
        }
        const identity = skillNameFromMarkdown(await readFile(identityPath, "utf8"));
        if (identity !== "quality-obsessed") {
          throw new Error(
            `Mirror target identity is not quality-obsessed; refusing to prune: ${target}`,
          );
        }
      }
    }
  }

  const sourceFiles = await collectFileMap(source);
  const targetFiles = await collectFileMap(target);
  const before = compareFileMaps(sourceFiles, targetFiles);
  if (mode === "check") {
    return { ...before, source, target, copied: [], removed: [] };
  }
  if (beforeCommit !== undefined && typeof beforeCommit !== "function") {
    throw new Error("beforeCommit must be a function when provided.");
  }
  if (before.ok) {
    return { ...before, source, target, copied: [], removed: [] };
  }

  const copied = [...before.missing, ...before.changed].sort();
  const removed = [...before.extra].sort();
  const parent = path.dirname(target);
  const nonce = `${process.pid}-${randomUUID()}`;
  const stage = path.join(parent, `${stagePrefix}${nonce}`);
  const backup = path.join(parent, `${backupPrefix}${nonce}`);
  assertManagedScratchPath(stage, parent, stagePrefix);
  assertManagedScratchPath(backup, parent, backupPrefix);

  await mkdir(parent, { recursive: true });
  let originalMoved = false;
  let committed = false;
  try {
    await mkdir(stage);
    for (const relative of sourceFiles.keys()) {
      const destination = path.join(stage, ...relative.split("/"));
      await mkdir(path.dirname(destination), { recursive: true });
      await copyFile(path.join(source, ...relative.split("/")), destination);
    }
    const staged = compareFileMaps(sourceFiles, await collectFileMap(stage));
    if (!staged.ok) {
      throw new Error(
        `Staged mirror verification failed: ${staged.missing.length} missing, ${staged.extra.length} extra, ${staged.changed.length} changed`,
      );
    }
    if (beforeCommit) await beforeCommit({ source, target, stage });

    if (await exists(target)) {
      await rename(target, backup);
      originalMoved = true;
    }
    await rename(stage, target);
    committed = true;
    if (originalMoved) {
      await removeManagedScratch(backup, parent, backupPrefix);
      originalMoved = false;
    }
  } catch (error) {
    if (originalMoved && !committed) {
      try {
        await rename(backup, target);
        originalMoved = false;
      } catch (rollbackError) {
        throw new AggregateError(
          [error, rollbackError],
          `Mirror commit failed and rollback could not restore ${target}`,
        );
      }
    }
    throw error;
  } finally {
    if (await exists(stage)) {
      await removeManagedScratch(stage, parent, stagePrefix);
    }
  }

  const after = compareFileMaps(
    await collectFileMap(source),
    await collectFileMap(target),
  );
  return { ...after, source, target, copied, removed };
}

function parseArgs(argv) {
  let mode;
  let sourcePath = defaultSource;
  let targetPath = defaultTarget;
  let json = false;
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--check" || argument === "--write") {
      const nextMode = argument.slice(2);
      if (mode && mode !== nextMode) throw new Error("Choose exactly one mirror mode.");
      mode = nextMode;
    } else if (argument === "--source" || argument === "--target") {
      const value = argv[index + 1];
      if (!value) throw new Error(`${argument} requires a path.`);
      if (argument === "--source") sourcePath = value;
      else targetPath = value;
      index += 1;
    } else if (argument === "--json") {
      json = true;
    } else if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    } else {
      positional.push(argument);
    }
  }

  if (!mode) throw new Error("Choose --check or --write.");
  if (positional.length > 1) throw new Error("Pass at most one positional target path.");
  if (positional.length === 1) targetPath = positional[0];
  return { mode, sourcePath, targetPath, json };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const report = await syncSkillMirror(options);
  if (options.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    const action = options.mode === "write" ? "synchronized" : "matches";
    process.stdout.write(
      `Skill mirror ${action}: ${report.target} (${report.copied.length} copied, ${report.removed.length} removed)\n`,
    );
  } else {
    process.stderr.write(
      `Skill mirror drift: ${report.missing.length} missing, ${report.extra.length} extra, ${report.changed.length} changed\n`,
    );
  }
  if (!report.ok) process.exitCode = 1;
}

const isMain = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isMain) {
  try {
    await main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 2;
  }
}
