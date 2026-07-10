import { createHash } from "node:crypto";
import { cp, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateSkill } from "./validate-skill.mjs";

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

async function hashFile(file) {
  return createHash("sha256").update(await readFile(file)).digest("hex");
}

export async function fileMap(root) {
  const entries = await Promise.all(
    (await listFiles(root)).map(async (file) => [
      path.relative(root, file).replaceAll("\\", "/"),
      await hashFile(file),
    ]),
  );
  return new Map(entries.sort(([a], [b]) => a.localeCompare(b)));
}

export async function smokePackage(skillPath, rootLicensePath) {
  const source = path.resolve(skillPath);
  const sandbox = await mkdtemp(path.join(tmpdir(), "quality-obsessed-package-"));
  const installed = path.join(sandbox, "quality-obsessed");

  try {
    await cp(source, installed, { recursive: true, force: true });
    const [sourceMap, installedMap, contract] = await Promise.all([
      fileMap(source),
      fileMap(installed),
      validateSkill(installed),
    ]);
    const files = [...sourceMap.keys()];
    const copyIntegrity =
      JSON.stringify([...sourceMap]) === JSON.stringify([...installedMap]);
    const licenseIntegrity = rootLicensePath
      ? (await hashFile(path.resolve(rootLicensePath))) ===
        (await hashFile(path.join(installed, "LICENSE")))
      : true;

    return {
      ok: contract.ok && copyIntegrity && licenseIntegrity,
      sourcePath: source,
      files,
      copyIntegrity,
      licenseIntegrity,
      violations: contract.violations,
    };
  } finally {
    await rm(sandbox, { recursive: true, force: true });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const licenseIndex = args.indexOf("--root-license");
  const rootLicense = licenseIndex >= 0 ? args[licenseIndex + 1] : undefined;
  const positional = args.filter(
    (arg, index) =>
      arg !== "--json" &&
      arg !== "--root-license" &&
      index !== licenseIndex + 1,
  );
  const skillPath = positional[0] ?? "SKILLS/quality-obsessed";
  const report = await smokePackage(skillPath, rootLicense);

  if (json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    process.stdout.write(`Package smoke passed: ${report.files.length} files\n`);
  } else {
    process.stderr.write(`${JSON.stringify(report, null, 2)}\n`);
  }

  if (!report.ok) process.exitCode = 1;
}

const isMain = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isMain) {
  await main();
}
