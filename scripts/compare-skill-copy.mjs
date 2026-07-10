import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

async function listFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(target)));
    else files.push(target);
  }
  return files;
}

async function fileMap(root) {
  const rows = await Promise.all(
    (await listFiles(root)).map(async (file) => [
      path.relative(root, file).replaceAll("\\", "/"),
      createHash("sha256").update(await readFile(file)).digest("hex"),
    ]),
  );
  return new Map(rows);
}

export async function compareSkillCopies(canonicalPath, copyPath) {
  const canonical = path.resolve(canonicalPath);
  const copy = path.resolve(copyPath);
  const [canonicalFiles, copyFiles] = await Promise.all([
    fileMap(canonical),
    fileMap(copy),
  ]);

  const missing = [...canonicalFiles.keys()]
    .filter((file) => !copyFiles.has(file))
    .sort();
  const extra = [...copyFiles.keys()]
    .filter((file) => !canonicalFiles.has(file))
    .sort();
  const changed = [...canonicalFiles.keys()]
    .filter(
      (file) =>
        copyFiles.has(file) && canonicalFiles.get(file) !== copyFiles.get(file),
    )
    .sort();

  return {
    ok: missing.length === 0 && extra.length === 0 && changed.length === 0,
    canonical,
    copy,
    missing,
    extra,
    changed,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const positional = args.filter((arg) => arg !== "--json");
  if (positional.length < 2) {
    process.stderr.write(
      "Usage: node scripts/compare-skill-copy.mjs [--json] <canonical> <copy>\n",
    );
    process.exitCode = 2;
    return;
  }

  const report = await compareSkillCopies(positional[0], positional[1]);
  if (json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    process.stdout.write(`Skill copies match: ${report.copy}\n`);
  } else {
    process.stderr.write(
      `Skill copy drift: ${report.missing.length} missing, ${report.extra.length} extra, ${report.changed.length} changed\n`,
    );
  }

  if (!report.ok) process.exitCode = 1;
}

const isMain = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isMain) {
  await main();
}
