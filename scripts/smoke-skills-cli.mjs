import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ANSI_SEQUENCE = /\u001B\[[0-?]*[ -/]*[@-~]/g;

export function parseDiscoveryOutput(output) {
  const clean = output.replace(ANSI_SEQUENCE, "");
  const count = Number(clean.match(/Found\s+(\d+)\s+skills?/i)?.[1] ?? NaN);
  const foundCanonicalName = clean
    .split(/\r?\n/)
    .some((line) => /(?:^|\s)quality-obsessed(?:\s|$)/.test(line));

  return {
    ok: count === 1 && foundCanonicalName,
    count,
    foundCanonicalName,
  };
}

export function smokeSkillsCli(cwd = process.cwd()) {
  const executable = process.platform === "win32"
    ? (process.env.ComSpec ?? "cmd.exe")
    : "npx";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", "npx -y skills@1.5.15 add . --list"]
    : ["-y", "skills@1.5.15", "add", ".", "--list"];
  const result = spawnSync(executable, args, { cwd, encoding: "utf8" });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  const discovery = parseDiscoveryOutput(output);

  return {
    ok: result.status === 0 && discovery.ok,
    exitCode: result.status,
    error: result.error?.message,
    output,
    ...discovery,
  };
}

async function main() {
  const report = smokeSkillsCli();
  if (report.ok) {
    process.stdout.write(
      "Skills CLI discovery passed: exactly quality-obsessed was found.\n",
    );
  } else {
    process.stderr.write(
      `Skills CLI discovery failed: expected exactly quality-obsessed.\n${report.output}`,
    );
    if (report.error) process.stderr.write(`\n${report.error}\n`);
    process.exitCode = 1;
  }
}

const isMain = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isMain) {
  await main();
}
