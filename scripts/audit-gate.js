const { execSync } = require("child_process");

const BASELINE_HIGH = 12;
const BASELINE_CRITICAL = 10;

let output;

try {
  output = execSync("npm audit --omit=dev --json", {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
} catch (error) {
  output = error.stdout;
}

const report = JSON.parse(output);
const vulnerabilities = report.metadata.vulnerabilities;

console.log("npm audit production dependency results:");
console.log(vulnerabilities);

console.log(
  `Security baseline: HIGH <= ${BASELINE_HIGH}, CRITICAL <= ${BASELINE_CRITICAL}`
);

if (
  vulnerabilities.high > BASELINE_HIGH ||
  vulnerabilities.critical > BASELINE_CRITICAL
) {
  console.error("FAILED: vulnerabilities exceed approved legacy baseline.");
  process.exit(1);
}

console.log("PASSED: no new HIGH or CRITICAL vulnerabilities above baseline.");