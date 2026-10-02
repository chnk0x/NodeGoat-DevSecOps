write a github repo readme file only with using all new modern designs animations and all new unique…

write a github repo readme file only with using all new modern designs animations and all new uniques technology useing (https://github.com/chnk0x/NodeGoat-DevSecOps)# 🛡️ NodeGoat DevSecOps Security Project

DevSecOps Pipeline](https://github.com/chnk0x/NodeGoat-DevSecOps/actions/workflows/devsecops.yml/badge.svg)](https://github.com/chnk0x/NodeGoat-DevSecOps/actions/workflows/devsecops.yml))
E2E Test](https://github.com/chnk0x/NodeGoat-DevSecOps/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/chnk0x/NodeGoat-DevSecOps/actions/workflows/e2e-test.yml))
LintA security-focused DevSecOps implementation based on OWASP NodeGoat, developed for the IE3142 – DevOps Security module @Sliit
The project demonstrates how security can be integrated throughout the software development lifecycle using automated CI/CD security gates, container security, vulnerability remediation, secret management, static analysis, dependency scanning, and secure collaborative development.
📌 Project Overview

OWASP NodeGoat is an intentionally vulnerable Node.js web application designed for learning about OWASP Top 10 security risks.

For this project, NodeGoat was used as the base application and extended with a complete DevSecOps security workflow.

The project focuses on:

    Identifying security vulnerabilities
    Demonstrating vulnerabilities in an authorized local environment
    Applying secure remediation
    Verifying that attacks are blocked after remediation
    Integrating automated security scanning
    Containerizing the application
    Protecting sensitive configuration
    Enforcing security gates through GitHub Actions
    Using Pull Requests for controlled team integration

The final application and all team contributions were integrated into the main branch only after automated CI/CD verification.
🏗️ System Architecture

The project consists primarily of two communicating application components:

text

                    Developer  
                        │  
                        │ Git Push / Pull Request  
                        ▼  
                ┌─────────────────┐  
                │     GitHub      │  
                │   Repository    │  
                └────────┬────────┘  
                         │  
                         ▼  
              ┌─────────────────────┐  
              │   GitHub Actions    │  
              │   CI/CD Pipeline    │  
              └─────────┬───────────┘  
                        │  
          ┌─────────────┼──────────────┐  
          │             │              │  
          ▼             ▼              ▼  
      Semgrep       npm audit       Gitleaks  
       SAST            SCA          Secrets  
          │             │              │  
          └─────────────┼──────────────┘  
                        │  
                        ▼  
                 Docker Build  
                        │  
                        ▼  
                      Trivy  
                 Container Scan  
                        │  
                        ▼  
                 Tests + Lint  
                        │  
                        ▼  
                  Approved Code  
                        │  
                        ▼  
                 ┌─────────────┐  
                 │    main     │  
                 └─────────────┘  
  
  
             Runtime Architecture  
  
          User / Web Browser  
                  │  
                  │ HTTP :4000  
                  ▼  
        ┌────────────────────┐  
        │   NodeGoat Web     │  
        │   Node.js/Express  │  
        │   Docker Container │  
        └─────────┬──────────┘  
                  │  
                  │ MongoDB connection  
                  ▼  
        ┌────────────────────┐  
        │      MongoDB       │  
        │ Docker Container   │  
        └────────────────────┘     

🧰 Technology Stack
Technology Purpose
Node.js Application runtime
Express.js Web application framework
MongoDB Application database
Docker Application containerization
Docker Compose Multi-container orchestration
Git Version control
GitHub Source-code collaboration
GitHub Actions CI/CD automation
Semgrep Static Application Security Testing
npm audit Dependency vulnerability scanning
Gitleaks Secret detection
Trivy Container vulnerability scanning
Cypress End-to-end testing
JSHint Code quality/lint validation

🔐 DevSecOps CI/CD Pipeline
The project uses GitHub Actions to automatically perform security and quality checks whenever code is pushed or submitted through a Pull Request.
The main workflow is:
.github/workflows/devsecops.yml

The pipeline implements four major security gates.
1️⃣ Semgrep – SAST
Semgrep performs Static Application Security Testing against the source code.
It is used to identify potentially insecure coding patterns before code is integrated.
Example pipeline stage:

    name: Set up Python
    uses: actions/setup-python@v5
    with:
    python-version: '3.11'

    name: Install Semgrep
    run: python -m pip install semgrep

    name: Run Semgrep SAST
    run: semgrep scan --config auto .

Custom Semgrep rules were also introduced for selected application vulnerabilities.
2️⃣ npm audit – Dependency Security
npm audit analyzes Node.js dependencies for known security vulnerabilities.
Because NodeGoat intentionally uses a legacy dependency stack, the project implements a controlled security baseline.
The baseline permits documented inherited vulnerabilities while preventing new HIGH or CRITICAL vulnerabilities from being introduced.
Current approved production baseline:
HIGH <= 12
CRITICAL <= 10

The security gate is implemented through:
scripts/audit-gate.js

The pipeline fails when the number of HIGH or CRITICAL vulnerabilities exceeds the approved baseline.
This prevents dependency-security regression while maintaining compatibility with the legacy training application.
The baseline represents documented accepted legacy risk. It does not mean the remaining vulnerabilities are remediated.

3️⃣ Gitleaks – Secret Scanning
Gitleaks scans Git history and repository content for accidentally committed credentials and sensitive information.
The pipeline executes:

    name: Run Gitleaks
    uses: gitleaks/gitleaks-action@v2
    env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

During development, secret scanning detected sensitive information including:

    Hardcoded API keys
    Private-key material
    Sensitive configuration values
    These values were removed from the current source and replaced with secure runtime configuration.
    Historical findings that had already been remediated were documented using exact Gitleaks fingerprints.
    This allows historical known findings to be recognized while keeping the security gate active for new or unapproved secrets.
    4️⃣ Trivy – Container Security
    After building the Docker image, Trivy scans the production container for HIGH and CRITICAL vulnerabilities.
    name: Run Trivy container scan
    uses: aquasecurity/trivy-action@master
    with:
    image-ref: 'nodegoat:ci'
    format: 'table'
    vuln-type: 'os,library'
    severity: 'HIGH,CRITICAL'
    exit-code: '1'
    ignore-unfixed: true
    trivyignores: '.trivyignore'

The important configuration is:
exit-code: '1'

This ensures that an unapproved HIGH or CRITICAL finding causes the security gate to fail.
Documented inherited vulnerabilities required by the legacy NodeGoat training environment are recorded separately in .trivyignore.
These entries represent accepted legacy risk and must not be interpreted as vulnerability fixes.
🐳 Container Security
The project uses a hardened multi-stage Docker build.
The production image was improved by:

    Moving to a supported Node.js 20 Alpine base
    Separating dependency installation and runtime stages
    Installing production dependencies only
    Applying Alpine package upgrades
    Running the application as the non-root node user
    Removing unnecessary package-management tooling from the runtime image
    Reducing unnecessary build context using .dockerignore
    Scanning the final image with Trivy
    Example security control:
    USER node

Running the application as a non-root user reduces the potential impact of container compromise.
🔒 Secrets Management
Sensitive configuration should never be committed directly to source control.
The project uses environment variables and GitHub Actions encrypted secrets for runtime-sensitive values.
Examples include:
COOKIE_SECRET
CRYPTO_KEY

Security controls include:

    GitHub encrypted secrets
    Environment-based configuration
    Gitleaks secret scanning
    Removal of hardcoded credentials
    Removal of private-key material from tracked source
    .gitignore protection for sensitive files
    Secrets are never intentionally printed in CI logs.
    🚨 Security Gate Failure & Remediation
    A major objective of the project was demonstrating that CI/CD security gates genuinely block insecure builds.
    The pipeline was therefore tested against real security findings.
    Dependency Gate Failure
    npm audit initially caused the pipeline to fail because the inherited NodeGoat dependency tree contained a large number of vulnerable packages.
    Safe dependency fixes were applied using:
    npm audit fix

Breaking upgrades were deliberately avoided.
A controlled production dependency baseline was then implemented to prevent future security regression.
Secret Scanning Failure
Gitleaks identified hardcoded secrets and private-key material.
Remediation included:

    Removing hardcoded sensitive values
    Moving configuration to environment variables
    Removing private-key material
    Re-running the pipeline
    After remediation, the active source passed secret scanning.
    Container Security Failure
    Trivy detected HIGH and CRITICAL vulnerabilities in the initial runtime container.
    The image was hardened by:
    Updating the Node.js base image
    Updating Alpine packages
    Installing only production dependencies
    Removing unnecessary package-management tools
    Reducing runtime attack surface
    Remaining inherited application vulnerabilities were documented as accepted legacy risk.
    Trivy remains configured with:
    exit-code: '1'

so new unapproved HIGH or CRITICAL findings continue to fail CI.
🛡️ Application Security Remediation
The project included vulnerability identification, controlled exploitation, remediation, and security verification.
Testing was performed only against the authorized local NodeGoat training environment.
Security work included areas such as:
Security Area Remediation Approach
NoSQL Injection Strict input validation and safer query construction
Authentication Improved credential handling and password verification
Access Control Server-side authorization/access validation
XSS Output escaping and safer template rendering
Secrets Environment variables and encrypted CI secrets
Dependencies Automated auditing and controlled baseline
Containers Hardened production image and Trivy scanning

For each selected vulnerability, the security-testing process followed:
Identify
↓
Demonstrate vulnerability
↓
Capture evidence
↓
Apply remediation
↓
Repeat the same test
↓
Confirm attack is blocked
↓
Run automated security scanning

🧪 Testing
The repository contains multiple automated verification workflows.
Unit / Application Tests
npm test

Tests are automatically executed during CI.
End-to-End Testing
The project uses Cypress-based E2E tests.
The E2E workflow verifies application behavior across the configured Node.js test matrix.
Deprecated GitHub Action versions in the original workflow were updated while preserving the intended application tests.
Linting
The project also runs automated lint checks to detect code-quality issues.
The final integrated main branch successfully passed:
✅ DevSecOps Pipeline
✅ E2E Test
✅ Lint

🔄 Development Workflow
The team used a branch-based collaborative workflow.
Individual Member Branch
│
▼
Development / Security Fix
│
▼
Commit + Push
│
▼
Pull Request
│
▼
GitHub Actions
│
├── Semgrep
├── npm audit
├── Gitleaks
├── Docker Build
├── Trivy
├── Tests
└── Lint
│
▼
Review / Fix Failures
│
▼
All Required Checks Pass
│
▼
Merge into main

The final team changes were merged only after the relevant CI/CD verification succeeded.
🌿 Branch Strategy
Main development branches included:
main
Chanuka
Danidu
Praween
Christina

main contains the final integrated project.
Individual branches preserve development and contribution history.
Pull Requests were used to integrate member work into main. 👥 Team Members & Contributions
Member Student ID Name Main Responsibility
Member 1 Danidu Vulnerability analysis and NoSQL Injection remediation
Member 2 Praween Authentication and session security remediation
Member 3 Chanuka CI/CD pipeline, security gates, container security and integration
Member 4 Christina Access-control security and secure runtime configuration Member 1
Key work included:

    NoSQL Injection investigation
    Input validation
    Safer MongoDB query handling
    Custom Semgrep detection rule
    Vulnerability verification
    Member 2
    Key work included:
    Authentication security improvements
    Password-handling improvements
    Session-related security work
    bcrypt-based password hashing/verification
    E2E authentication test updates
    Member 3
    Key work included:
    GitHub Actions CI/CD implementation
    Semgrep integration
    npm audit security gate
    Gitleaks integration
    Trivy container scanning
    Dependency-security baseline
    Secret-remediation support
    Docker image hardening
    CI troubleshooting
    Pull Request integration
    Final pipeline verification
    Member 4
    Key work included:
    Access-control security improvements
    Route-level validation
    Custom Semgrep access-control checks
    GitHub encrypted-secret configuration
    CI workflow modernization
    E2E verification support
    🚀 Running the Project
    Prerequisites
    Install:
    Git
    Docker Desktop
    Docker Compose
    Verify:
    git --version
    docker --version
    docker compose version

Clone the Repository
git clone https://github.com/chnk0x/NodeGoat-DevSecOps.git
cd NodeGoat-DevSecOps

Build the Application
docker compose build

or:
docker compose up -d --build

Check Running Containers
docker compose ps

The environment contains:
NodeGoat Web Application
+
MongoDB Database

Access NodeGoat
After the containers start, open:
http://localhost:4000

View Container Logs
docker compose logs -f

To view only the web application:
docker compose logs -f web

Stop the Environment
docker compose down

👤 NodeGoat Test Accounts
The original NodeGoat training dataset includes test accounts such as:
Username: user1
Password: User1_123

These accounts are intended only for the local training environment.
Do not reuse these credentials for real systems.
📂 Important Project Files
NodeGoat-DevSecOps/
│
├── .github/
│ └── workflows/
│ ├── devsecops.yml
│ ├── e2e-test.yml
│ └── lint.yml
│
├── app/
│ ├── data/
│ ├── routes/
│ └── views/
│
├── config/
│
├── scripts/
│ └── audit-gate.js
│
├── test/
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── .gitleaksignore
├── .trivyignore
├── nodegoat-rules.yaml
├── package.json
├── package-lock.json
└── README.md

📊 Final CI/CD Status
After all member Pull Requests were integrated, the final main branch was validated again.
Final integration status:
┌─────────────────────┬─────────┐
│ Workflow │ Status │
├─────────────────────┼─────────┤
│ DevSecOps Pipeline │ PASS ✅ │
│ E2E Test │ PASS ✅ │
│ Lint │ PASS ✅ │
└─────────────────────┴─────────┘

This verifies that the integrated project passes the configured security, functional, and code-quality workflows.
⚠️ Accepted Legacy Risk
NodeGoat is intentionally designed as a vulnerable security-training application.
Therefore, some legacy dependencies and intentionally insecure components may remain for educational compatibility.
The project distinguishes between:
Remediated vulnerabilities
Security issues that were explicitly fixed and verified by the team.
Accepted legacy risks
Inherited NodeGoat vulnerabilities that cannot safely be upgraded without breaking the training application or require architectural changes outside the project scope.
Accepted risks are documented through controlled mechanisms such as:
.trivyignore
scripts/audit-gate.js
.gitleaksignore

These files must not be interpreted as vulnerability fixes.
Their purpose is to establish a documented security baseline while ensuring that newly introduced security regressions continue to fail CI.
⚖️ Ethical Testing
All penetration-testing and vulnerability demonstrations performed for this project were restricted to the authorized NodeGoat laboratory environment.
The team did not perform testing against unauthorized third-party systems.
Security testing followed the project ethical-clearance requirements.
The intentionally vulnerable application was used solely for educational and defensive-security purposes.
🎯 Project Outcomes
This project demonstrates practical implementation of:

    Secure software development
    DevSecOps principles
    Shift-left security
    CI/CD automation
    Static application security testing
    Software composition analysis
    Secret detection
    Container security
    Secure configuration management
    Vulnerability remediation
    Risk acceptance and documentation
    Git branching
    Pull Request-based collaboration
    Automated testing
    Security regression prevention
    The final result demonstrates how security controls can become part of the normal development workflow rather than being performed only after development is complete.
    📚 Security Tools
    Semgrep
    Used for source-code static analysis and custom security rules.
    npm audit
    Used to identify known vulnerabilities in Node.js dependencies.
    Gitleaks
    Used to detect secrets and sensitive information in repository content and Git history.
    Trivy
    Used to analyze the final Docker image for HIGH and CRITICAL vulnerabilities.
    GitHub Actions
    Used to orchestrate the complete automated DevSecOps workflow.
    🔗 References
    OWASP NodeGoat
    OWASP Top 10
    GitHub Actions
    Semgrep
    Gitleaks
    Aqua Security Trivy
    Docker
    Node.js
    MongoDB
    📜 License & Attribution
    This project is based on OWASP NodeGoat, an intentionally vulnerable Node.js application created for security education.
    The original NodeGoat source code remains subject to its original license and attribution requirements.
    The modifications in this repository were created as part of an academic DevSecOps security project. 🎓 Academic Context
    Module: IE3142 – DevOps Security
    Project: Building and Securing a DevSecOps Pipeline
    Programme: BSc (Hons) in Information Technology – Cyber Security
    Institution:SLIIT | Sri Lanka Institute of Information Technology (highligh this)
    Campus: Malabe Campus
    Academic Year: 2026

Fetched https://github.com/chnk0x/NodeGoat-DevSecOps
Ran commands5
Searched the web
Fetched https://github.com/orgs/community/discussions/70672
Ran commands4
Searched images for "SLIIT logo Sri Lanka Institute of Information Technology"
Explored2 reads
Readsliit-logo-sri-lanka-institute-of-inform-2.png
Readsliit-logo-sri-lanka-institute-of-inform-1.jpg
Ran commands2
Write/tmp/mmd/render.js57 lines
Searched the web
Ran commands10
Write/tmp/mmd/shot.js21 lines
Ran commands5
Edited files2
Edited files2
Ran commands2
Explored4 reads
Read.prev_a.png
Read.prev_b.png
Read.prev_c.png
Read.prev_d.png
Ran commands5
Edited files2
Explored2 reads
Read.prev_f.png
Read.prev_g.png
Explored2 reads
Read.prev_i.png
Read.prev_h.png
Ran commands2
Explored1 read
Read.prev_j.png
Write/tmp/mmd/shield_stl.py69 lines
Explored1 read
Read.prev_stl.png
Ran commands3

Now let me write the final shield model with refined check-mark proportions:
Ran commands3
Explored1 read
Read.prev_stl3.png

The 3D model renders correctly with three.js (the same engine family GitHub uses). Now let me write the README template:
Write/tmp/mmd/template.md1407 lines
2 hours ago
2:47 PM
Write/tmp/mmd/build.py150 lines
Ran commands3
Explored3 reads
Read.r1.png
Read.r2.png
Read.r3.png
Explored1 read
Read.r4.png
Write/tmp/mmd/preview.js54 lines
Ran commands2
Explored1 read
Read.pv-dark-00.png
Explored2 reads
Read.pv-dark-01.png
Read.pv-dark-02.png
Explored1 read
Read.pvp-1.png
Explored5 reads
Read.tm3.png
Read.pvp-2.png
Read.pvp-3.png
Read.pvp-4.png
Read.pvp-5.png
Explored1 read
Read.sl.png
Ran commands2
Explored1 read
Read.r6.png
Ran commands7
Explored1 read
Read.pf-light-top.png
Ran commands3
Explored1 read
Read.el-dark-all.png
Explored1 read
Read.el-dark-all.png
Ran commands2
Explored1 read
Read.pg-hero.png
Ran commands3

I've written the new
README.md. It's a single file: replace the existing README with it and commit. No image or asset files need to be uploaded. All 11 diagrams rendered without errors on the version of Mermaid that GitHub uses, in both light and dark mode. All the external images and links load except the SLIIT website link, which blocked my automated check.

What's new in the design:

    Animated header: a wave banner, an animated NodeGoat goat and a line of typing text. Each switches colour for GitHub's light or dark mode.
    Pipeline replay: a small animated terminal that types out a green pipeline run, one gate at a time.
    Animated diagrams: the CI/CD pipeline, runtime and "exploit → fix → verify" diagrams have connecting lines that move. GitHub draws these itself from text, so they aren't images.
    Other built-in visuals:
        a branch graph showing PRs #1–#4 in the order they were merged
        a dated project timeline taken from your commit history
        a sequence diagram of the Pull Request workflow
        a file tree with descriptions
        a mind map of project outcomes
        a cause-and-effect (fishbone) diagram of what made the app insecure
        a Dev ∩ Sec ∩ Ops diagram
    Formula and maps: the npm audit rule (HIGH ≤ 12, CRITICAL ≤ 10) as a maths formula, and an interactive map pinning SLIIT Malabe Campus.
    3D shield: a shield shaped like the SLIIT crest with a raised ✓ that visitors can rotate, at the end of the file.
    SLIIT highlighted: a navy-and-orange banner in SLIIT's crest colours, an Institution badge, an academic card with SLIIT as its heading, and SLIIT also in the top line, nav bar and footer.
    Your content: every section you wrote is kept. Long YAML snippets and each member's work list fold away into expandable sections. Your original ASCII diagrams are kept the same way, for viewers that can't show diagrams. The broken badge markdown is fixed and the badges show live status.

Things to check before you commit:

    Student IDs are placeholders (ITXXXXXXXX). Replace them with the real ones.
    Christina's profile: her commits aren't linked to a GitHub account. I used the GitHub user ChristinaPerera because her commits are signed with exactly that name. Confirm it's her, or change the handle in the Team section.
    Praween's profile points to the IT24103798 account, which made the authentication commits on the Praween branch.
    Semgrep doesn't block builds as configured. semgrep scan --config auto . only fails the job on findings if you add --error. The README says findings are "reported in the CI log" rather than claiming it blocks. If you want it to block, add --error to the workflow.
    Dates in the timeline are Sri Lanka time, so PR #3 shows as merged on 30 Sep.

39m 54s | 2 hours ago
2:47 PM

forget to add these/... so remake add threse to contribution section with suitable form # 🛡️ Identified & Remediated Vulnerabilities

As part of the project, four security vulnerabilities were assigned across the team. Each vulnerability was investigated in the authorized NodeGoat environment, remediated, and retested.

| # | Vulnerability | OWASP Top 10 (2021) | CWE | Severity |

|---|---|---|---|---|

| 1 | NoSQL Injection (including SSJS via $where) | A03 – Injection | CWE-943 | 🔴 Critical |(Member 1)

| 2 | Broken Authentication / Session Management | A02 – Cryptographic/Auth Failures | CWE-256, CWE-384, CWE-613, CWE-521 | 🟠 High |(member 2)

| 3 | Stored XSS (including vulnerable marked component) | A03 – Injection | CWE-79 | 🟠 High |(Member 3)

| 4 | Broken Access Control / IDOR | A01 – Broken Access Control | CWE-285, CWE-639 | 🟠 High |(Member 4)
Vulnerability Remediation Process

Each vulnerability followed the same security validation process:

text


Identify Vulnerability

        ↓

Demonstrate / Exploit in Authorized Local Environment

        ↓

Capture Before-Fix Evidence

        ↓

Apply Secure Remediation

        ↓

Repeat the Same Attack

        ↓

Verify Attack Is Blocked

        ↓

Capture After-Fix Evidence

        ↓

Run Security Scanning / CI Verification

Running commands35


Agent
README.md

<a id="readme-top"></a>
<div align="center"><picture> <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&amp;height=240&amp;color=0:0f172a,50:0e7490,100:10b981&amp;section=header&amp;text=NodeGoat%20DevSecOps&amp;fontColor=ffffff&amp;fontSize=62&amp;fontAlignY=36&amp;desc=Security%20Project%20%20%C2%B7%20%20shift-left%20security%20for%20OWASP%20NodeGoat&amp;descSize=17&amp;descAlignY=58&amp;animation=fadeIn" /> <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&amp;height=240&amp;color=0:a5f3fc,50:67e8f9,100:6ee7b7&amp;section=header&amp;text=NodeGoat%20DevSecOps&amp;fontColor=0f172a&amp;fontSize=62&amp;fontAlignY=36&amp;desc=Security%20Project%20%20%C2%B7%20%20shift-left%20security%20for%20OWASP%20NodeGoat&amp;descSize=17&amp;descAlignY=58&amp;animation=fadeIn" /> <img src="https://capsule-render.vercel.app/api?type=waving&amp;height=240&amp;color=0:0f172a,50:0e7490,100:10b981&amp;section=header&amp;text=NodeGoat%20DevSecOps&amp;fontColor=ffffff&amp;fontSize=62&amp;fontAlignY=36&amp;desc=Security%20Project%20%20%C2%B7%20%20shift-left%20security%20for%20OWASP%20NodeGoat&amp;descSize=17&amp;descAlignY=58&amp;animation=fadeIn" width="100%" alt="NodeGoat DevSecOps — shift-left security for OWASP NodeGoat" /> </picture><p><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Goat.png" width="84" alt="🐐" /></p><a href="#pipeline"> <picture> <source media="(prefers-color-scheme: dark)" srcset="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&amp;weight=600&amp;size=21&amp;duration=2600&amp;pause=900&amp;color=22D3EE&amp;center=true&amp;vCenter=true&amp;width=760&amp;height=48&amp;lines=Shift-left+security+for+OWASP+NodeGoat;4+automated+security+gates+on+every+push;Semgrep+%E2%80%A2+npm+audit+%E2%80%A2+Gitleaks+%E2%80%A2+Trivy;Hardened+Node+20+Alpine+%E2%80%A2+non-root+runtime;Exploit+%E2%86%92+Fix+%E2%86%92+Verify+%E2%86%92+Prevent+regression;IE3142+DevOps+Security+%E2%80%A2+SLIIT+2026" /> <source media="(prefers-color-scheme: light)" srcset="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&amp;weight=600&amp;size=21&amp;duration=2600&amp;pause=900&amp;color=0E7490&amp;center=true&amp;vCenter=true&amp;width=760&amp;height=48&amp;lines=Shift-left+security+for+OWASP+NodeGoat;4+automated+security+gates+on+every+push;Semgrep+%E2%80%A2+npm+audit+%E2%80%A2+Gitleaks+%E2%80%A2+Trivy;Hardened+Node+20+Alpine+%E2%80%A2+non-root+runtime;Exploit+%E2%86%92+Fix+%E2%86%92+Verify+%E2%86%92+Prevent+regression;IE3142+DevOps+Security+%E2%80%A2+SLIIT+2026" /> <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&amp;weight=600&amp;size=21&amp;duration=2600&amp;pause=900&amp;color=22D3EE&amp;center=true&amp;vCenter=true&amp;width=760&amp;height=48&amp;lines=Shift-left+security+for+OWASP+NodeGoat;4+automated+security+gates+on+every+push;Semgrep+%E2%80%A2+npm+audit+%E2%80%A2+Gitleaks+%E2%80%A2+Trivy;Hardened+Node+20+Alpine+%E2%80%A2+non-root+runtime;Exploit+%E2%86%92+Fix+%E2%86%92+Verify+%E2%86%92+Prevent+regression;IE3142+DevOps+Security+%E2%80%A2+SLIIT+2026" alt="Shift-left security for OWASP NodeGoat · 4 automated security gates · Semgrep, npm audit, Gitleaks, Trivy" /> </picture> </a><p> <b>🛡️ NodeGoat DevSecOps Security Project</b><br /> A security-focused DevSecOps implementation of <a href="https://github.com/OWASP/NodeGoat">OWASP NodeGoat</a> demonstrating <b>secure software development</b>, <b>automated security testing</b>, <b>container security</b>, <b>secret management</b>, and <b>secure CI/CD practices</b>.<br /> <sub>IE3142 – DevOps Security &nbsp;·&nbsp; <b>SLIIT — Sri Lanka Institute of Information Technology</b> &nbsp;·&nbsp; Malabe Campus &nbsp;·&nbsp; 2026</sub> </p>

DevSecOps Pipeline
E2E Test
Lint

<a href="https://github.com/OWASP/NodeGoat"><img src="https://img.shields.io/badge/OWASP-NodeGoat-000000?style=for-the-badge&amp;logo=owasp&amp;logoColor=white" alt="OWASP NodeGoat" /></a>
<img src="https://img.shields.io/badge/Node.js-20%20Alpine-339933?style=for-the-badge&amp;logo=nodedotjs&amp;logoColor=white" alt="Node.js 20 Alpine" />
<img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&amp;logo=docker&amp;logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?style=for-the-badge&amp;logo=githubactions&amp;logoColor=white" alt="GitHub Actions" />
<br />
<img src="https://img.shields.io/badge/Semgrep-SAST-7C3AED?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwIDJhOCA4IDAgMCAxIDYuMzIgMTIuOWw1LjM5IDUuNC0xLjQyIDEuNC01LjM5LTUuMzhBOCA4IDAgMSAxIDEwIDJ6bTAgMmE2IDYgMCAxIDAgMCAxMiA2IDYgMCAwIDAgMC0xMnoiLz48L3N2Zz4=" alt="Semgrep SAST" />
<img src="https://img.shields.io/badge/npm%20audit-SCA-CB3837?style=for-the-badge&amp;logo=npm&amp;logoColor=white" alt="npm audit SCA" />
<img src="https://img.shields.io/badge/Gitleaks-Secrets-D9480F?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJzNyA3LjYgNyAxMi41YTcgNyAwIDAgMS0xNCAwQzUgOS42IDEyIDIgMTIgMnoiLz48L3N2Zz4=" alt="Gitleaks secret scanning" />
<img src="https://img.shields.io/badge/Trivy-Container%20Scan-1904DA?style=for-the-badge&amp;logo=trivy&amp;logoColor=white" alt="Trivy container scanning" />
<img src="https://img.shields.io/github/license/chnk0x/NodeGoat-DevSecOps?style=flat-square&amp;color=0e7490" alt="License" /> <img src="https://img.shields.io/github/last-commit/chnk0x/NodeGoat-DevSecOps?style=flat-square&amp;logo=git&amp;logoColor=white&amp;color=7c3aed" alt="Last commit" /> <img src="https://img.shields.io/github/issues-pr-closed/chnk0x/NodeGoat-DevSecOps?style=flat-square&amp;logo=github&amp;label=pull%20requests&amp;color=2ea043" alt="Pull requests" /> <a href="#academic"><img src="https://img.shields.io/badge/SLIIT-IE3142%20DevOps%20Security-00007B?style=flat-square&amp;labelColor=FF7300" alt="SLIIT · IE3142" /></a><p> <a href="#overview"><b>Overview</b></a> &nbsp;•&nbsp; <a href="#architecture"><b>Architecture</b></a> &nbsp;•&nbsp; <a href="#pipeline"><b>Pipeline</b></a> &nbsp;•&nbsp; <a href="#container"><b>Container</b></a> &nbsp;•&nbsp; <a href="#remediation"><b>Remediation</b></a> &nbsp;•&nbsp; <a href="#testing"><b>Testing</b></a> &nbsp;•&nbsp; <a href="#run"><b>Run it</b></a> &nbsp;•&nbsp; <a href="#team"><b>Team</b></a> &nbsp;•&nbsp; <a href="#academic"><b>SLIIT</b></a> </p></div><img src="https://capsule-render.vercel.app/api?type=rect&amp;height=3&amp;color=0:7c3aed,50:0e7490,100:10b981&amp;section=header" width="100%" alt="" /><details> <summary><b>📑 Table of contents</b></summary> <br />
#	Section	#	Section
01	📌 Project Overview	13	🚀 Running the Project
02	🏗️ System Architecture	14	👤 NodeGoat Test Accounts
03	🧰 Technology Stack	15	📂 Important Project Files
04	🔐 DevSecOps CI/CD Pipeline	16	📊 Final CI/CD Status
05	🐳 Container Security	17	⚠️ Accepted Legacy Risk
06	🔒 Secrets Management	18	⚖️ Ethical Testing
07	🚨 Security Gate Failure & Remediation	19	🎯 Project Outcomes
08	🛡️ Application Security Remediation	20	📚 Security Tools
09	🧪 Testing	21	🔗 References
10	🔄 Development Workflow	22	📜 License & Attribution
11	🌿 Branch Strategy	23	🎓 Academic Context — SLIIT
12	👥 Team Members & Contributions	✨	🧊 Bonus · Interactive 3D Shield
</details>

<a id="overview"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pushpin.png" width="32" alt="📌" /> Project Overview

OWASP NodeGoat is an intentionally vulnerable Node.js web application designed for learning about OWASP Top 10 security risks. For this project, NodeGoat was used as the base application and extended with a complete DevSecOps security workflow — demonstrating how security can be integrated throughout the software development lifecycle using automated CI/CD security gates, container security, vulnerability remediation, secret management, static analysis, dependency scanning, and secure collaborative development.

The project focuses on:
<table> <tr> <td>🔍 Identifying security vulnerabilities</td> <td>💥 Demonstrating vulnerabilities in an <b>authorized local environment</b></td> <td>🛠️ Applying secure remediation</td> </tr> <tr> <td>✅ Verifying that attacks are blocked after remediation</td> <td>🤖 Integrating automated security scanning</td> <td>🐳 Containerizing the application</td> </tr> <tr> <td>🔐 Protecting sensitive configuration</td> <td>🚦 Enforcing security gates through GitHub Actions</td> <td>🔀 Using Pull Requests for controlled team integration</td> </tr> </table>

    [!IMPORTANT]
    The final application and all team contributions were integrated into the main branch only after automated CI/CD verification.

<a id="highlights"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" width="24" alt="✨" /> At a glance
<div align="center"> <table> <tr> <td align="center" width="33%"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shield.png" width="46" alt="🛡️" /><br /><b>4 Security Gates</b><br /><sub>SAST · SCA · Secrets · Container</sub></td> <td align="center" width="33%"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" width="46" alt="⚙️" /><br /><b>3 CI Workflows</b><br /><sub>DevSecOps Pipeline · E2E Test · Lint</sub></td> <td align="center" width="33%"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Left.png" width="46" alt="🔎" /><br /><b>4 Custom Semgrep Rules</b><br /><sub>NoSQL injection · access control · IDOR</sub></td> </tr> <tr> <td align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Package.png" width="46" alt="📦" /><br /><b>Non-root Container</b><br /><sub>Node 20 Alpine · <code>USER node</code></sub></td> <td align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Test%20Tube.png" width="46" alt="🧪" /><br /><b>13 Cypress E2E Specs</b><br /><sub>Node 10 · 12 · 14 test matrix</sub></td> <td align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Herb.png" width="46" alt="🌿" /><br /><b>4 Pull Requests → main</b><br /><sub>merged only after green CI</sub></td> </tr> </table> </div><p align="center"><sub>🧬 <b>Dev ∩ Sec ∩ Ops</b> — security woven into everyday development and operations</sub></p>

mermaid

---
config:
  venn:
    width: 620
    height: 330
---
venn-beta
  set Dev["Dev"]
  set Sec["Sec"]
  set Ops["Ops"]
  union Dev,Sec,Ops["DevSecOps"]
  style Dev fill:#2f81f7,color:#2f81f7
  style Sec fill:#da3633,color:#da3633
  style Ops fill:#2ea043,color:#2ea043

<a id="architecture"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Building%20Construction.png" width="32" alt="🏗️" /> System Architecture

The project consists primarily of two communicating application components — the NodeGoat web application and its MongoDB database — delivered through an automated, security-gated CI/CD pipeline.
⚡ CI/CD security flow

<sub>✨ The dashed connectors are <b>live Mermaid edge animations</b>, rendered natively by GitHub.</sub>

mermaid

---
config:
  flowchart:
    nodeSpacing: 36
    rankSpacing: 40
---
flowchart TB
    DEV(["👩‍💻 Developer"]) e0@==>|"git push · pull request"| WF{{"⚙️ GitHub Actions"}}

    subgraph PIPE["🔐 DevSecOps Pipeline · devsecops.yml"]
        T["🧪 npm ci + npm test"] --> G1["🔎 Gate 1 · Semgrep SAST"]
        G1 --> G2["📦 Gate 2 · npm audit gate"]
        G2 --> G3["🔑 Gate 3 · Gitleaks"]
        G3 --> BLD["🐳 docker build nodegoat:ci"]
        BLD --> G4["🛡️ Gate 4 · Trivy scan"]
    end

    WF e1@==> T
    WF e2@==> E2E["🌐 E2E Test<br/>Cypress · Node 10 / 12 / 14"]
    WF e3@==> LINT["🧹 Lint<br/>JSHint · secrets check"]
    G4 e4@==> OK{"all checks<br/>green?"}
    E2E e5@==> OK
    LINT e6@==> OK
    OK e7@==>|"yes"| MAIN[["🌿 merge into main"]]
    OK -.->|"no"| STOP["⛔ blocked — fix & re-push"]

    e0@{ animation: fast }
    e1@{ animation: fast }
    e2@{ animation: fast }
    e3@{ animation: fast }
    e4@{ animation: fast }
    e5@{ animation: fast }
    e6@{ animation: fast }
    e7@{ animation: fast }

    classDef dev fill:#1f6feb,stroke:#58a6ff,color:#fff
    classDef ci fill:#6e40c9,stroke:#a371f7,color:#fff
    classDef test fill:#0e7490,stroke:#22d3ee,color:#fff
    classDef sast fill:#7c3aed,stroke:#c4b5fd,color:#fff
    classDef sca fill:#cb3837,stroke:#ff7b72,color:#fff
    classDef secret fill:#d9480f,stroke:#ffa94d,color:#fff
    classDef docker fill:#2496ed,stroke:#79c0ff,color:#fff
    classDef trivy fill:#1904da,stroke:#8b7bff,color:#fff
    classDef ok fill:#2ea043,stroke:#56d364,color:#fff
    classDef bad fill:#da3633,stroke:#ff7b72,color:#fff
    classDef gate fill:#30363d,stroke:#8b949e,color:#fff
    class DEV dev
    class WF ci
    class T,E2E,LINT test
    class G1 sast
    class G2 sca
    class G3 secret
    class BLD docker
    class G4 trivy
    class MAIN ok
    class STOP bad
    class OK gate

🧭 Runtime architecture

mermaid

flowchart LR
    U(["🧑‍💻 User / web browser"]) a1@==>|"HTTP :4000"| WEB
    subgraph DC["🐳 docker compose"]
        direction LR
        WEB["⚙️ <b>web</b><br/>NodeGoat · Node.js / Express<br/><i>node:20-alpine · USER node</i>"]
        DB[("🍃 <b>mongo</b><br/>MongoDB 4.4<br/><i>user: mongodb</i>")]
        WEB a2@==>|"mongodb://mongo:27017/nodegoat"| DB
    end
    a1@{ animation: slow }
    a2@{ animation: slow }
    classDef user fill:#1f6feb,stroke:#58a6ff,color:#fff
    classDef web fill:#339933,stroke:#7ee787,color:#fff
    classDef db fill:#13aa52,stroke:#7ee787,color:#fff
    class U user
    class WEB web
    class DB db

<details> <summary><b>📜 Classic ASCII view</b> — for terminals and viewers without Mermaid support</summary> <br />

text

                    Developer
                        │
                        │ Git Push / Pull Request
                        ▼
                ┌─────────────────┐
                │     GitHub      │
                │   Repository    │
                └────────┬────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   GitHub Actions    │
              │   CI/CD Pipeline    │
              └─────────┬───────────┘
                        │
          ┌─────────────┼──────────────┐
          │             │              │
          ▼             ▼              ▼
      Semgrep       npm audit       Gitleaks
       SAST            SCA          Secrets
          │             │              │
          └─────────────┼──────────────┘
                        │
                        ▼
                 Docker Build
                        │
                        ▼
                      Trivy
                 Container Scan
                        │
                        ▼
                 Tests + Lint
                        │
                        ▼
                  Approved Code
                        │
                        ▼
                 ┌─────────────┐
                 │    main     │
                 └─────────────┘


             Runtime Architecture

          User / Web Browser
                  │
                  │ HTTP :4000
                  ▼
        ┌────────────────────┐
        │   NodeGoat Web     │
        │   Node.js/Express  │
        │   Docker Container │
        └─────────┬──────────┘
                  │
                  │ MongoDB connection
                  ▼
        ┌────────────────────┐
        │      MongoDB       │
        │ Docker Container   │
        └────────────────────┘

</details>

<a id="stack"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Toolbox.png" width="32" alt="🧰" /> Technology Stack
<p align="center"> <picture> <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=nodejs,js,express,mongodb,docker,githubactions,git,github,npm,cypress,py,linux&amp;theme=dark&amp;perline=12" /> <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=nodejs,js,express,mongodb,docker,githubactions,git,github,npm,cypress,py,linux&amp;theme=light&amp;perline=12" /> <img src="https://skillicons.dev/icons?i=nodejs,js,express,mongodb,docker,githubactions,git,github,npm,cypress,py,linux&amp;theme=dark&amp;perline=12" alt="Node.js · JavaScript · Express · MongoDB · Docker · GitHub Actions · Git · GitHub · npm · Cypress · Python · Linux" /> </picture> </p><div align="center">
Technology	Purpose	Where it lives
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&amp;logo=nodedotjs&amp;logoColor=white" alt="Node.js" />	Application runtime	node:20-alpine image
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&amp;logo=express&amp;logoColor=white" alt="Express.js" />	Web application framework	server.js · app/routes/
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white" alt="MongoDB" />	Application database	mongo:4.4 service
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&amp;logo=docker&amp;logoColor=white" alt="Docker" />	Application containerization	Dockerfile (multi-stage)
<img src="https://img.shields.io/badge/Docker%20Compose-1D63ED?style=for-the-badge&amp;logo=docker&amp;logoColor=white" alt="Docker Compose" />	Multi-container orchestration	docker-compose.yml
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&amp;logo=git&amp;logoColor=white" alt="Git" />	Version control	5 branches
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="GitHub" />	Source-code collaboration	Pull Requests #1 – #4
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&amp;logo=githubactions&amp;logoColor=white" alt="GitHub Actions" />	CI/CD automation	.github/workflows/
<img src="https://img.shields.io/badge/Semgrep-7C3AED?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwIDJhOCA4IDAgMCAxIDYuMzIgMTIuOWw1LjM5IDUuNC0xLjQyIDEuNC01LjM5LTUuMzhBOCA4IDAgMSAxIDEwIDJ6bTAgMmE2IDYgMCAxIDAgMCAxMiA2IDYgMCAwIDAgMC0xMnoiLz48L3N2Zz4=" alt="Semgrep" />	Static Application Security Testing	--config auto + custom rules
<img src="https://img.shields.io/badge/npm%20audit-CB3837?style=for-the-badge&amp;logo=npm&amp;logoColor=white" alt="npm audit" />	Dependency vulnerability scanning	scripts/audit-gate.js
<img src="https://img.shields.io/badge/Gitleaks-D9480F?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJzNyA3LjYgNyAxMi41YTcgNyAwIDAgMS0xNCAwQzUgOS42IDEyIDIgMTIgMnoiLz48L3N2Zz4=" alt="Gitleaks" />	Secret detection	gitleaks/gitleaks-action@v2
<img src="https://img.shields.io/badge/Trivy-1904DA?style=for-the-badge&amp;logo=trivy&amp;logoColor=white" alt="Trivy" />	Container vulnerability scanning	aquasecurity/trivy-action
<img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&amp;logo=cypress&amp;logoColor=69D3A7" alt="Cypress" />	End-to-end testing	test/e2e/
<img src="https://img.shields.io/badge/JSHint-4B5563?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJhMTAgMTAgMCAxIDEgMCAyMCAxMCAxMCAwIDAgMSAwLTIwem0tMS4yIDEzLjYgNi40LTYuNC0xLjQtMS40LTUgNS0yLjQtMi40TDcgMTEuOHoiLz48L3N2Zz4=" alt="JSHint" />	Code quality / lint validation	lint.yml · .jshintrc
</div><p align="right"><a href="#readme-top"><img src="https://img.shields.io/badge/back%20to%20top-%E2%86%91-0e7490?style=flat-square" alt="back to top" /></a></p>

<a id="pipeline"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png" width="34" alt="🤖" /> DevSecOps CI/CD Pipeline

The project uses GitHub Actions to automatically perform security and quality checks whenever code is pushed or submitted through a Pull Request. The main workflow is .github/workflows/devsecops.yml.
<div align="center"> <img src="https://readme-typing-svg.demolab.com?font=Fira+Mono&amp;weight=500&amp;size=14&amp;duration=700&amp;pause=250&amp;color=3FB950&amp;background=161B22&amp;multiline=true&amp;repeat=false&amp;width=520&amp;height=165&amp;lines=%24+git+push+-%3E+GitHub+Actions+triggered;%5Btest%5D+npm+ci+%26%26+npm+test+.................+ok;%5Bgate+1%5D+semgrep+scan+--config+auto+.....+PASS;%5Bgate+2%5D+node+scripts%2Faudit-gate.js+.....+PASS;%5Bgate+3%5D+gitleaks-action%40v2+.............+PASS;%5Bbuild%5D+docker+build+-t+nodegoat%3Aci+.......+ok;%5Bgate+4%5D+trivy+HIGH%2CCRITICAL+exit%3D1+.....+PASS;%3E%3E+all+checks+green+--+merge+into+main" alt="Animated terminal replay of a green DevSecOps pipeline run" /> <br /> <sub>▶ Animated replay of a green run (illustrative output)</sub> </div>

The pipeline implements four major security gates:
	Gate	Tool	What it checks	Enforcement
1️⃣	SAST	<img src="https://img.shields.io/badge/Semgrep-7C3AED?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwIDJhOCA4IDAgMCAxIDYuMzIgMTIuOWw1LjM5IDUuNC0xLjQyIDEuNC01LjM5LTUuMzhBOCA4IDAgMSAxIDEwIDJ6bTAgMmE2IDYgMCAxIDAgMCAxMiA2IDYgMCAwIDAgMC0xMnoiLz48L3N2Zz4=" alt="Semgrep" />	Insecure coding patterns in the source	Findings reported in the CI log on every push / PR
2️⃣	SCA	<img src="https://img.shields.io/badge/npm%20audit-CB3837?style=for-the-badge&amp;logo=npm&amp;logoColor=white" alt="npm audit" />	Known-vulnerable production dependencies	❌ Fails above HIGH 12 / CRITICAL 10
3️⃣	Secrets	<img src="https://img.shields.io/badge/Gitleaks-D9480F?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJzNyA3LjYgNyAxMi41YTcgNyAwIDAgMS0xNCAwQzUgOS42IDEyIDIgMTIgMnoiLz48L3N2Zz4=" alt="Gitleaks" />	Credentials in commits and Git history	❌ Fails on new / unapproved secrets
4️⃣	Container	<img src="https://img.shields.io/badge/Trivy-1904DA?style=for-the-badge&amp;logo=trivy&amp;logoColor=white" alt="Trivy" />	OS + library CVEs in nodegoat:ci	❌ Fails on unapproved HIGH / CRITICAL
<details> <summary><b>1️⃣ Semgrep — Static Application Security Testing (SAST)</b></summary> <br />

Semgrep performs Static Application Security Testing against the source code. It is used to identify potentially insecure coding patterns before code is integrated.

YAML

- name: Set up Python
  uses: actions/setup-python@v5
  with:
    python-version: '3.11'

- name: Install Semgrep
  run: python -m pip install semgrep

- name: Run Semgrep SAST
  run: semgrep scan --config auto .

Custom Semgrep rules were also introduced for selected application vulnerabilities:
Rule file	Rule ID	Detects
nodegoat-rules.yaml	nodegoat-nosql-injection-dynamic-where	MongoDB $where built from a template literal (CWE-943)
semgrep/christina-access-control.yaml	nodegoat.broken-access-control.benefits-get-missing-isadmin	/benefits GET route without isAdmin
↳	nodegoat.broken-access-control.benefits-post-missing-isadmin	/benefits POST route without isAdmin
↳	nodegoat.idor.userid-from-url	userId taken from req.params (IDOR risk)

Run the custom rules locally:

Bash

semgrep scan --config nodegoat-rules.yaml --config semgrep/ .

</details><details> <summary><b>2️⃣ npm audit — Dependency Security (SCA)</b></summary> <br />

npm audit analyzes Node.js dependencies for known security vulnerabilities. Because NodeGoat intentionally uses a legacy dependency stack, the project implements a controlled security baseline: it permits documented inherited vulnerabilities while preventing new HIGH or CRITICAL vulnerabilities from being introduced.
npm audit gate  =  {PASSif   Nhigh≤12    ∧    Ncritical≤10FAIL  ⇒  exit 1otherwise
npm audit gate={PASSFAIL⇒exit 1​if Nhigh​≤12∧Ncritical​≤10otherwise​
Severity	Current approved production baseline
🔴 CRITICAL	<= 10
🟠 HIGH	<= 12

The security gate is implemented through scripts/audit-gate.js:

JavaScript

const BASELINE_HIGH = 12;
const BASELINE_CRITICAL = 10;

// report = JSON output of: npm audit --production --json
if (
  vulnerabilities.high > BASELINE_HIGH ||
  vulnerabilities.critical > BASELINE_CRITICAL
) {
  console.error("FAILED: vulnerabilities exceed approved legacy baseline.");
  process.exit(1);
}

The pipeline fails when the number of HIGH or CRITICAL vulnerabilities exceeds the approved baseline. This prevents dependency-security regression while maintaining compatibility with the legacy training application.

    [!WARNING]
    The baseline represents documented accepted legacy risk. It does not mean the remaining vulnerabilities are remediated.

</details><details> <summary><b>3️⃣ Gitleaks — Secret Scanning</b></summary> <br />

Gitleaks scans Git history and repository content for accidentally committed credentials and sensitive information. The checkout step uses fetch-depth: 0, so the full commit history is available to the scan.

YAML

- name: Run Gitleaks
  uses: gitleaks/gitleaks-action@v2
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

During development, secret scanning detected sensitive information including:

    🔑 Hardcoded API keys
    🗝️ Private-key material
    ⚙️ Sensitive configuration values

These values were removed from the current source and replaced with secure runtime configuration. Historical findings that had already been remediated were documented using exact Gitleaks fingerprints in .gitleaksignore. This allows historical known findings to be recognized while keeping the security gate active for new or unapproved secrets.
</details><details> <summary><b>4️⃣ Trivy — Container Security</b></summary> <br />

After building the Docker image, Trivy scans the production container for HIGH and CRITICAL vulnerabilities.

YAML

- name: Run Trivy container scan
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'nodegoat:ci'
    format: 'table'
    vuln-type: 'os,library'
    severity: 'HIGH,CRITICAL'
    exit-code: '1'
    ignore-unfixed: true
    trivyignores: '.trivyignore'

The important configuration is exit-code: '1' — it ensures that an unapproved HIGH or CRITICAL finding causes the security gate to fail.

Documented inherited vulnerabilities required by the legacy NodeGoat training environment are recorded separately in .trivyignore.

    [!WARNING]
    These entries represent accepted legacy risk and should not be interpreted as vulnerability fixes.

</details>

<a id="container"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Whale.png" width="34" alt="🐳" /> Container Security

The project uses a hardened multi-stage Docker build. The production image was improved by:

    Moving to a supported Node.js 20 Alpine base
    Separating dependency installation and runtime stages
    Installing production dependencies only
    Applying Alpine package upgrades
    Running the application as the non-root node user
    Removing unnecessary package-management tooling from the runtime image
    Reducing unnecessary build context using .dockerignore
    Scanning the final image with Trivy

Example security control:

Dockerfile

USER node

    [!TIP]
    Running the application as a non-root user reduces the potential impact of container compromise.

<details> <summary><b>🐋 View the hardened <code>Dockerfile</code></b></summary> <br />

Dockerfile

# ── Stage 1 · production dependencies ─────────────────────────────
FROM node:20-alpine

ENV WORKDIR=/usr/src/app/
WORKDIR $WORKDIR

COPY package*.json $WORKDIR
RUN npm install --production --no-cache

# ── Stage 2 · hardened runtime ────────────────────────────────────
FROM node:20-alpine

# Install available Alpine security updates
RUN apk --no-cache upgrade

# Remove package-manager tooling not required at application runtime
RUN rm -rf /usr/local/lib/node_modules/npm \
    /opt/yarn* \
    /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/yarn \
    /usr/local/bin/yarnpkg

ENV USER=node
ENV WORKDIR=/home/$USER/app
WORKDIR $WORKDIR

COPY --from=0 /usr/src/app/node_modules node_modules
RUN chown $USER:$USER $WORKDIR
COPY --chown=node . $WORKDIR

USER $USER
EXPOSE 4000

</details>

<a id="secrets"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png" width="32" alt="🔒" /> Secrets Management

    [!IMPORTANT]
    Sensitive configuration should never be committed directly to source control.

The project uses environment variables and GitHub Actions encrypted secrets for runtime-sensitive values, for example <kbd>COOKIE_SECRET</kbd> and <kbd>CRYPTO_KEY</kbd>.
Security control	Purpose
🔐 GitHub encrypted secrets	Runtime values injected into the E2E and Lint workflows
🌱 Environment-based configuration	No sensitive values hardcoded in source
🕵️ Gitleaks secret scanning	Every push / PR — commits and Git history
🧹 Removal of hardcoded credentials	Cleaned from the active source
🗝️ Removal of private-key material	Removed from tracked source
🚫 .gitignore protection	Keeps sensitive local files out of the repository

The Lint workflow proves the secrets exist without ever printing them:

YAML

- name: Verify required secrets are available
  shell: bash
  run: |
    test -n "$COOKIE_SECRET"
    test -n "$CRYPTO_KEY"
    echo "Required runtime secrets are configured."

    [!NOTE]
    Secrets are never intentionally printed in CI logs.

<p align="right"><a href="#readme-top"><img src="https://img.shields.io/badge/back%20to%20top-%E2%86%91-0e7490?style=flat-square" alt="back to top" /></a></p>

<a id="gate-failures"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Police%20Car%20Light.png" width="32" alt="🚨" /> Security Gate Failure & Remediation

A major objective of the project was demonstrating that CI/CD security gates genuinely block insecure builds. The pipeline was therefore tested against real security findings:

mermaid

flowchart TB
    subgraph DEP["📦 Dependency gate — npm audit"]
        direction LR
        d1["❌ FAIL<br/>inherited vulnerable<br/>dependency tree"] --> d2["🛠️ npm audit fix<br/>no breaking upgrades"] --> d3["✅ PASS<br/>production baseline<br/>gate in CI"]
    end
    subgraph SEC["🔑 Secret gate — Gitleaks"]
        direction LR
        s1["❌ FAIL<br/>API keys + private-key<br/>material detected"] --> s2["🛠️ removed from source<br/>moved to env vars"] --> s3["✅ PASS<br/>active source clean"]
    end
    subgraph CON["🐳 Container gate — Trivy"]
        direction LR
        c1["❌ FAIL<br/>HIGH / CRITICAL in<br/>runtime image"] --> c2["🛠️ hardened image<br/>Node 20 Alpine · prod deps"] --> c3["✅ PASS<br/>exit-code 1 still enforced"]
    end
    DEP ~~~ SEC ~~~ CON
    classDef bad fill:#da3633,stroke:#ff7b72,color:#fff
    classDef fix fill:#9a6700,stroke:#d29922,color:#fff
    classDef ok fill:#2ea043,stroke:#56d364,color:#fff
    class d1,s1,c1 bad
    class d2,s2,c2 fix
    class d3,s3,c3 ok

<details> <summary><b>📦 Dependency gate failure</b></summary> <br />

npm audit initially caused the pipeline to fail because the inherited NodeGoat dependency tree contained a large number of vulnerable packages. Safe dependency fixes were applied using:

Bash

npm audit fix

Breaking upgrades were deliberately avoided. A controlled production dependency baseline was then implemented to prevent future security regression.
</details><details> <summary><b>🔑 Secret scanning failure</b></summary> <br />

Gitleaks identified hardcoded secrets and private-key material. Remediation included:

    Removing hardcoded sensitive values
    Moving configuration to environment variables
    Removing private-key material
    Re-running the pipeline

After remediation, the active source passed secret scanning.
</details><details> <summary><b>🐳 Container security failure</b></summary> <br />

Trivy detected HIGH and CRITICAL vulnerabilities in the initial runtime container. The image was hardened by:

    Updating the Node.js base image
    Updating Alpine packages
    Installing only production dependencies
    Removing unnecessary package-management tools
    Reducing runtime attack surface

Remaining inherited application vulnerabilities were documented as accepted legacy risk. Trivy remains configured with exit-code: '1', so new unapproved HIGH or CRITICAL findings continue to fail CI.
</details>

<a id="remediation"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shield.png" width="32" alt="🛡️" /> Application Security Remediation

The project included vulnerability identification, controlled exploitation, remediation, and security verification. Testing was performed only against the authorized local NodeGoat training environment. Security work included areas such as:
Security Area	Remediation Approach
💉 NoSQL Injection	Strict input validation and safer query construction
🔑 Authentication	Improved credential handling and password verification
🚪 Access Control	Server-side authorization / access validation
🧨 XSS	Output escaping and safer template rendering
🗝️ Secrets	Environment variables and encrypted CI secrets
📦 Dependencies	Automated auditing and controlled baseline
🐳 Containers	Hardened production image and Trivy scanning
🐟 Cause & effect — what made the original release insecure

mermaid

ishikawa-beta
    Insecure release
    Code
        NoSQL injection
        Stored XSS
    Access
        Weak authentication
        Missing authorization
    Secrets
        Hardcoded API keys
        Private-key material
    Supply chain
        Vulnerable dependencies
        Vulnerable base image

🔁 Exploit-to-fix verification loop

For each selected vulnerability, the security-testing process followed:

mermaid

flowchart LR
    A["🔍 Identify"] l1@--> B["💥 Demonstrate<br/><sub>local lab only</sub>"]
    B l2@--> C["📸 Capture<br/>evidence"]
    C l3@--> D["🛠️ Apply<br/>remediation"]
    D l4@--> E["🔁 Repeat the<br/>same test"]
    E l5@--> F{"attack<br/>blocked?"}
    F l6@-->|"yes"| G["🤖 Run automated<br/>security scanning"]
    F -.->|"no — iterate"| D
    l1@{ animation: slow }
    l2@{ animation: slow }
    l3@{ animation: slow }
    l4@{ animation: slow }
    l5@{ animation: slow }
    l6@{ animation: slow }
    classDef step fill:#0e7490,stroke:#22d3ee,color:#fff
    classDef attack fill:#d9480f,stroke:#ffa94d,color:#fff
    classDef ok fill:#2ea043,stroke:#56d364,color:#fff
    class A,C,D,E step
    class B attack
    class G ok

<p align="right"><a href="#readme-top"><img src="https://img.shields.io/badge/back%20to%20top-%E2%86%91-0e7490?style=flat-square" alt="back to top" /></a></p>

<a id="testing"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Test%20Tube.png" width="32" alt="🧪" /> Testing

The repository contains multiple automated verification workflows:
<table> <tr> <th width="33%">🧪 Unit / Application Tests</th> <th width="33%">🌐 End-to-End Testing</th> <th width="33%">🧹 Linting</th> </tr> <tr> <td valign="top">

Bash

npm test

Tests are automatically executed during CI.
</td> <td valign="top">

Cypress-based E2E tests verify application behavior across the configured Node.js matrix — 10.x · 12.x · 14.x — against a MongoDB service container.

Deprecated GitHub Action versions in the original workflow were updated while preserving the intended application tests.
</td> <td valign="top">

Automated JSHint lint checks detect code-quality issues.

The workflow also verifies that the required runtime secrets are configured.
</td> </tr> </table>

The final integrated main branch successfully passed:

DevSecOps Pipeline
E2E Test
Lint

<a id="workflow"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Counterclockwise%20Arrows%20Button.png" width="32" alt="🔄" /> Development Workflow

The team used a branch-based collaborative workflow. Every change travelled through a Pull Request and the full set of automated checks:

mermaid

sequenceDiagram
    autonumber
    actor Dev as 👩‍💻 Member branch
    participant GH as 🐙 GitHub
    participant CI as ⚙️ GitHub Actions
    participant Main as 🌿 main
    Dev->>GH: development / security fix → commit + push
    Dev->>GH: open Pull Request
    GH->>CI: trigger DevSecOps Pipeline · E2E Test · Lint
    rect rgba(46, 160, 67, 0.12)
        Note over CI: Semgrep → npm audit → Gitleaks → Docker build → Trivy → Tests → Lint
    end
    alt any check fails
        CI-->>Dev: ❌ failing check + logs
        Dev->>GH: review / fix failures and push again
        GH->>CI: re-run every check
    else all required checks pass
        CI-->>GH: ✅ all required checks green
        GH->>Main: merge into main
    end

The final team changes were merged only after the relevant CI/CD verification succeeded.

<a id="branches"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Herb.png" width="32" alt="🌿" /> Branch Strategy

mermaid

---
config:
  theme: base
  themeVariables:
    git0: "#2ea043"
    git1: "#a371f7"
    git2: "#2f81f7"
    git3: "#db6d28"
    git4: "#f85149"
    gitBranchLabel0: "#ffffff"
    gitBranchLabel1: "#ffffff"
    gitBranchLabel2: "#ffffff"
    gitBranchLabel3: "#ffffff"
    gitBranchLabel4: "#ffffff"
    commitLabelColor: "#ffffff"
    commitLabelBackground: "#30363d"
    commitLabelFontSize: "12px"
    tagLabelColor: "#ffffff"
    tagLabelBackground: "#1f6feb"
    tagLabelBorder: "#58a6ff"
    tagLabelFontSize: "12px"
  gitGraph:
    mainBranchName: main
    rotateCommitLabel: true
---
gitGraph
    commit id: "init"
    commit id: "Semgrep + Trivy"
    branch Christina
    commit id: "CI modernised"
    commit id: "secrets check"
    checkout main
    branch Praween
    commit id: "auth + session"
    checkout main
    branch Chanuka
    commit id: "XSS fix"
    commit id: "4 gates"
    commit id: "audit baseline"
    commit id: "secrets removed"
    commit id: "hardened image"
    checkout main
    branch Danidu
    commit id: "NoSQLi fix"
    checkout main
    merge Chanuka id: "PR #3" tag: "pipeline"
    checkout Christina
    merge main id: "sync C"
    commit id: "access-control E2E"
    checkout Praween
    merge main id: "sync P"
    commit id: "bcrypt seeds"
    checkout Danidu
    merge main id: "sync D"
    checkout main
    merge Danidu id: "PR #2"
    merge Praween id: "PR #1"
    merge Christina id: "PR #4" tag: "all checks green" type: HIGHLIGHT

<sub>Simplified view of the real branch history.</sub>
Branch	Role	Pull Request
🌿 main	Contains the final integrated project	—
Chanuka	CI/CD pipeline, security gates, container security	#3
Danidu	NoSQL Injection remediation + custom Semgrep rule	#2
Praween	Authentication and session security	#1
Christina	Access control + CI secret configuration	#4

Individual branches preserve development and contribution history. Pull Requests were used to integrate member work into main.
<p align="right"><a href="#readme-top"><img src="https://img.shields.io/badge/back%20to%20top-%E2%86%91-0e7490?style=flat-square" alt="back to top" /></a></p>

<a id="team"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" width="34" alt="🤝" /> Team Members & Contributions
<table> <tr> <td align="center" valign="top" width="25%"> <a href="https://github.com/Danidu-S"><img src="https://images.weserv.nl/?url=github.com/Danidu-S.png&amp;w=192&amp;h=192&amp;fit=cover&amp;mask=circle&amp;maxage=7d" width="96" alt="Danidu" /></a><br /> <b>Danidu</b><br /> <sub>Member 1 · <code>ITXXXXXXXX</code></sub><br /><br /> 💉 Vulnerability analysis and <b>NoSQL Injection</b> remediation<br /><br /> <a href="https://github.com/Danidu-S"><img src="https://img.shields.io/badge/%40Danidu--S-181717?style=flat-square&amp;logo=github&amp;logoColor=white" alt="@Danidu-S" /></a> </td> <td align="center" valign="top" width="25%"> <a href="https://github.com/IT24103798"><img src="https://images.weserv.nl/?url=github.com/IT24103798.png&amp;w=192&amp;h=192&amp;fit=cover&amp;mask=circle&amp;maxage=7d" width="96" alt="Praween" /></a><br /> <b>Praween</b><br /> <sub>Member 2 · <code>ITXXXXXXXX</code></sub><br /><br /> 🔑 <b>Authentication</b> and session security remediation<br /><br /> <a href="https://github.com/IT24103798"><img src="https://img.shields.io/badge/%40IT24103798-181717?style=flat-square&amp;logo=github&amp;logoColor=white" alt="@IT24103798" /></a> </td> <td align="center" valign="top" width="25%"> <a href="https://github.com/chnk0x"><img src="https://images.weserv.nl/?url=github.com/chnk0x.png&amp;w=192&amp;h=192&amp;fit=cover&amp;mask=circle&amp;maxage=7d" width="96" alt="Chanuka" /></a><br /> <b>Chanuka</b><br /> <sub>Member 3 · <code>ITXXXXXXXX</code></sub><br /><br /> 🤖 <b>CI/CD pipeline</b>, security gates, container security and integration<br /><br /> <a href="https://github.com/chnk0x"><img src="https://img.shields.io/badge/%40chnk0x-181717?style=flat-square&amp;logo=github&amp;logoColor=white" alt="@chnk0x" /></a> </td> <td align="center" valign="top" width="25%"> <a href="https://github.com/ChristinaPerera"><img src="https://images.weserv.nl/?url=github.com/ChristinaPerera.png&amp;w=192&amp;h=192&amp;fit=cover&amp;mask=circle&amp;maxage=7d" width="96" alt="Christina" /></a><br /> <b>Christina</b><br /> <sub>Member 4 · <code>ITXXXXXXXX</code></sub><br /><br /> 🚪 <b>Access-control</b> security and secure runtime configuration<br /><br /> <a href="https://github.com/ChristinaPerera"><img src="https://img.shields.io/badge/%40ChristinaPerera-181717?style=flat-square&amp;logo=github&amp;logoColor=white" alt="@ChristinaPerera" /></a> </td> </tr> </table><details> <summary><b>💉 Member 1 — Danidu</b> · key work</summary> <br />

    NoSQL Injection investigation
    Input validation
    Safer MongoDB query handling
    Custom Semgrep detection rule
    Vulnerability verification

</details><details> <summary><b>🔑 Member 2 — Praween</b> · key work</summary> <br />

    Authentication security improvements
    Password-handling improvements
    Session-related security work
    bcrypt-based password hashing / verification
    E2E authentication test updates

</details><details> <summary><b>🤖 Member 3 — Chanuka</b> · key work</summary> <br />

    GitHub Actions CI/CD implementation
    Semgrep integration
    npm audit security gate
    Gitleaks integration
    Trivy container scanning
    Dependency-security baseline
    Secret-remediation support
    Docker image hardening
    CI troubleshooting
    Pull Request integration
    Final pipeline verification

</details><details> <summary><b>🚪 Member 4 — Christina</b> · key work</summary> <br />

    Access-control security improvements
    Route-level validation
    Custom Semgrep access-control checks
    GitHub encrypted-secret configuration
    CI workflow modernization
    E2E verification support

</details>

<a id="run"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" width="34" alt="🚀" /> Running the Project
1️⃣ Prerequisites

Install <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&amp;logo=git&amp;logoColor=white" alt="Git" align="center" /> <img src="https://img.shields.io/badge/Docker%20Desktop-2496ED?style=flat-square&amp;logo=docker&amp;logoColor=white" alt="Docker Desktop" align="center" /> <img src="https://img.shields.io/badge/Docker%20Compose-1D63ED?style=flat-square&amp;logo=docker&amp;logoColor=white" alt="Docker Compose" align="center" /> and verify:

Bash

git --version
docker --version
docker compose version

2️⃣ Clone the repository

Bash

git clone https://github.com/chnk0x/NodeGoat-DevSecOps.git
cd NodeGoat-DevSecOps

3️⃣ Build the application

Bash

docker compose build

or build and start in one step:

Bash

docker compose up -d --build

4️⃣ Check running containers

Bash

docker compose ps

The environment contains: NodeGoat Web Application ➕ MongoDB Database

    [!TIP]
    On start-up the web container waits until MongoDB accepts connections, seeds the training data (artifacts/db-reset.js) and then launches the app.

5️⃣ Access NodeGoat

After the containers start, open 👉 http://localhost:4000
6️⃣ View container logs

Bash

docker compose logs -f        # all services
docker compose logs -f web    # only the web application

7️⃣ Stop the environment

Bash

docker compose down

<a id="accounts"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Identification%20Card.png" width="32" alt="👤" /> NodeGoat Test Accounts

The original NodeGoat training dataset includes test accounts such as:
<div align="center">
Username	Password
<kbd>user1</kbd>	<kbd>User1_123</kbd>
</div>

    [!CAUTION]
    These accounts are intended only for the local training environment. Do not reuse these credentials for real systems.

<p align="right"><a href="#readme-top"><img src="https://img.shields.io/badge/back%20to%20top-%E2%86%91-0e7490?style=flat-square" alt="back to top" /></a></p>

<a id="structure"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Open%20File%20Folder.png" width="32" alt="📂" /> Important Project Files

mermaid

---
config:
  treeView:
    showIcons: true
    rowIndent: 18
  themeVariables:
    treeView:
      labelColor: "#2f81f7"
      lineColor: "#8b949e"
      iconColor: "#d29922"
      descriptionColor: "#3fb950"
      highlightBg: "rgba(210, 153, 34, 0.14)"
      highlightStroke: "#d29922"
---
treeView-beta
.github/
    workflows/
        devsecops.yml :::highlight ## 4 security gates
        e2e-test.yml ## Cypress E2E matrix
        lint.yml ## JSHint + secrets check
app/
    data/ ## MongoDB data access
    routes/ ## Express routes
    views/ ## templates
config/ ## environment configuration
scripts/
    audit-gate.js :::highlight ## npm audit baseline gate
semgrep/
    christina-access-control.yaml ## custom access-control rules
test/ ## E2E + security tests
Dockerfile :::highlight ## hardened multi-stage image
docker-compose.yml ## web + mongo
.dockerignore
.gitignore
.gitleaksignore ## documented historical findings
.trivyignore ## documented accepted legacy risk
nodegoat-rules.yaml ## custom NoSQL-injection rule
package.json
package-lock.json
README.md

<details> <summary><b>🗂️ Plain-text tree</b></summary> <br />

text

NodeGoat-DevSecOps/
│
├── .github/
│   └── workflows/
│       ├── devsecops.yml
│       ├── e2e-test.yml
│       └── lint.yml
│
├── app/
│   ├── data/
│   ├── routes/
│   └── views/
│
├── config/
│
├── scripts/
│   └── audit-gate.js
│
├── semgrep/
│   └── christina-access-control.yaml
│
├── test/
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── .gitleaksignore
├── .trivyignore
├── nodegoat-rules.yaml
├── package.json
├── package-lock.json
└── README.md

</details>

<a id="status"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png" width="32" alt="📊" /> Final CI/CD Status

After all member Pull Requests were integrated, the final main branch was validated again:
<div align="center">
Workflow	File	Live status	Final integration
🔐 DevSecOps Pipeline	devsecops.yml	DevSecOps Pipeline	PASS ✅
🌐 E2E Test	e2e-test.yml	E2E Test	PASS ✅
🧹 Lint	lint.yml	Lint	PASS ✅
</div>

This verifies that the integrated project passes the configured security, functional, and code-quality workflows.
🗓️ Road to a green main

mermaid

timeline
    title From vulnerable app to green pipeline · Sep – Oct 2026
    section Foundation
        24 – 25 Sep : NodeGoat imported
                    : Semgrep SAST and Trivy scanning added
                    : Trivy gate demonstrated
        27 Sep      : Deprecated Actions modernised
                    : Encrypted runtime secrets verified
    section Remediation
        28 Sep      : Auth and session hardening (bcrypt)
                    : Stored XSS fixed (Swig autoescape)
                    : All four security gates enforced
        29 Sep      : npm audit fix and baseline gate
                    : Hardcoded secrets removed
                    : Container hardened and Trivy baseline
                    : NoSQL injection fix and custom Semgrep rule
    section Integration
        30 Sep      : PR #3 merged (pipeline)
                    : Access-control and login E2E updates
                    : bcrypt seed data fixed
        02 Oct      : PRs #2, #1 and #4 merged
                    : main fully green

<a id="legacy-risk"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Warning.png" width="32" alt="⚠️" /> Accepted Legacy Risk

    [!WARNING]
    NodeGoat is intentionally designed as a vulnerable security-training application. Therefore, some legacy dependencies and intentionally insecure components may remain for educational compatibility.

The project distinguishes between:
<table> <tr> <th width="50%">✅ Remediated vulnerabilities</th> <th width="50%">⚠️ Accepted legacy risks</th> </tr> <tr> <td valign="top">Security issues that were <b>explicitly fixed and verified</b> by the team.</td> <td valign="top">Inherited NodeGoat vulnerabilities that <b>cannot safely be upgraded</b> without breaking the training application, or that require architectural changes outside the project scope.</td> </tr> </table>

Accepted risks are documented through controlled mechanisms:
File	Mechanism
.trivyignore	Documented CVE / GHSA identifiers retained for the training app — Trivy still runs with exit-code: '1'
scripts/audit-gate.js	Production dependency baseline — HIGH <= 12, CRITICAL <= 10
.gitleaksignore	Exact fingerprints of already-remediated historical findings

    [!IMPORTANT]
    These files must not be interpreted as vulnerability fixes. Their purpose is to establish a documented security baseline while ensuring that newly introduced security regressions continue to fail CI.

<a id="ethics"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Balance%20Scale.png" width="32" alt="⚖️" /> Ethical Testing

    [!CAUTION]
    All penetration-testing and vulnerability demonstrations performed for this project were restricted to the authorized NodeGoat laboratory environment.

    🚫 The team did not perform testing against unauthorized third-party systems.
    📋 Security testing followed the project ethical-clearance requirements.
    🎓 The intentionally vulnerable application was used solely for educational and defensive-security purposes.

<p align="right"><a href="#readme-top"><img src="https://img.shields.io/badge/back%20to%20top-%E2%86%91-0e7490?style=flat-square" alt="back to top" /></a></p>

<a id="outcomes"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Bullseye.png" width="32" alt="🎯" /> Project Outcomes

This project demonstrates practical implementation of:

mermaid

---
config:
  theme: base
  themeVariables:
    fontSize: "15px"
    cScale0: "#1f6feb"
    cScale1: "#7c3aed"
    cScale2: "#0e7490"
    cScale3: "#2ea043"
    cScale4: "#db6d28"
    cScale5: "#cb3837"
    cScaleLabel0: "#ffffff"
    cScaleLabel1: "#ffffff"
    cScaleLabel2: "#ffffff"
    cScaleLabel3: "#ffffff"
    cScaleLabel4: "#ffffff"
    cScaleLabel5: "#ffffff"
---
mindmap
  root((🛡️ DevSecOps<br/>principles))
    Shift-left security
      Static application security testing
      Software composition analysis
      Secret detection
      Container security
    Secure engineering
      Secure software development
      Secure configuration management
      Vulnerability remediation
      Risk acceptance & documentation
    Automation
      CI/CD automation
      Automated testing
      Security regression prevention
    Collaboration
      Git branching
      Pull Request-based collaboration

The final result demonstrates how security controls can become part of the normal development workflow rather than being performed only after development is complete.

<a id="tools"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" width="32" alt="📚" /> Security Tools
<div align="center">
Tool	Role in this project
<img src="https://img.shields.io/badge/Semgrep-7C3AED?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwIDJhOCA4IDAgMCAxIDYuMzIgMTIuOWw1LjM5IDUuNC0xLjQyIDEuNC01LjM5LTUuMzhBOCA4IDAgMSAxIDEwIDJ6bTAgMmE2IDYgMCAxIDAgMCAxMiA2IDYgMCAwIDAgMC0xMnoiLz48L3N2Zz4=" alt="Semgrep" />	Source-code static analysis and custom security rules
<img src="https://img.shields.io/badge/npm%20audit-CB3837?style=for-the-badge&amp;logo=npm&amp;logoColor=white" alt="npm audit" />	Identifying known vulnerabilities in Node.js dependencies
<img src="https://img.shields.io/badge/Gitleaks-D9480F?style=for-the-badge&amp;logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJzNyA3LjYgNyAxMi41YTcgNyAwIDAgMS0xNCAwQzUgOS42IDEyIDIgMTIgMnoiLz48L3N2Zz4=" alt="Gitleaks" />	Detecting secrets and sensitive information in repository content and Git history
<img src="https://img.shields.io/badge/Trivy-1904DA?style=for-the-badge&amp;logo=trivy&amp;logoColor=white" alt="Trivy" />	Analyzing the final Docker image for HIGH and CRITICAL vulnerabilities
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&amp;logo=githubactions&amp;logoColor=white" alt="GitHub Actions" />	Orchestrating the complete automated DevSecOps workflow
</div>

<a id="references"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Link.png" width="32" alt="🔗" /> References

    🐐 OWASP NodeGoat
    🔟 OWASP Top 10
    ⚙️ GitHub Actions
    🔎 Semgrep
    🔑 Gitleaks
    🛡️ Aqua Security Trivy
    🐳 Docker
    🟩 Node.js
    🍃 MongoDB
    📦 npm audit · 🌐 Cypress · 🧹 JSHint

<a id="license"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Scroll.png" width="32" alt="📜" /> License & Attribution

This project is based on OWASP NodeGoat, an intentionally vulnerable Node.js application created for security education. The original NodeGoat source code remains subject to its original license and attribution requirements — see LICENSE (Apache License 2.0).

The modifications in this repository were created as part of an academic DevSecOps security project.
<p align="right"><a href="#readme-top"><img src="https://img.shields.io/badge/back%20to%20top-%E2%86%91-0e7490?style=flat-square" alt="back to top" /></a></p>

<a id="academic"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Graduation%20Cap.png" width="32" alt="🎓" /> Academic Context
<div align="center"><a href="https://www.sliit.lk/"> <img src="https://capsule-render.vercel.app/api?type=soft&amp;height=150&amp;color=0:00007B,60:1a1aa0,100:FF7300&amp;text=SLIIT&amp;fontColor=ffffff&amp;fontSize=60&amp;fontAlignY=40&amp;desc=Sri%20Lanka%20Institute%20of%20Information%20Technology%20%20%C2%B7%20%20Malabe%20Campus&amp;descSize=17&amp;descAlignY=72&amp;animation=fadeIn" width="100%" alt="SLIIT — Sri Lanka Institute of Information Technology · Malabe Campus" /> </a>

<a href="https://www.sliit.lk/"><img src="https://img.shields.io/badge/Institution-SLIIT%20%7C%20Sri%20Lanka%20Institute%20of%20Information%20Technology-00007B?style=for-the-badge&amp;labelColor=FF7300" alt="Institution: SLIIT — Sri Lanka Institute of Information Technology" /></a>
<table> <tr> <td align="center" colspan="2"> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Classical%20Building.png" width="56" alt="🏛️" /> <h3>SLIIT | Sri Lanka Institute of Information Technology</h3> <sub>📍 Malabe Campus · Sri Lanka</sub> </td> </tr> <tr> <td>📘 <b>Module</b></td> <td><b>IE3142 – DevOps Security</b></td> </tr> <tr> <td>🛠️ <b>Project</b></td> <td>Building and Securing a DevSecOps Pipeline</td> </tr> <tr> <td>🎓 <b>Programme</b></td> <td>BSc (Hons) in Information Technology – Cyber Security</td> </tr> <tr> <td>🏛️ <b>Institution</b></td> <td><b>SLIIT</b> | <b>Sri Lanka Institute of Information Technology</b></td> </tr> <tr> <td>📍 <b>Campus</b></td> <td>Malabe Campus</td> </tr> <tr> <td>📅 <b>Academic Year</b></td> <td>2026</td> </tr> </table></div>

    [!IMPORTANT]
    🏛️ Proudly developed at SLIIT — Sri Lanka Institute of Information Technology, Malabe Campus, for the IE3142 – DevOps Security module.

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20Showing%20Asia-Australia.png" width="24" alt="🌏" /> Where it was built

geojson

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "SLIIT — Malabe Campus",
        "institution": "Sri Lanka Institute of Information Technology",
        "module": "IE3142 – DevOps Security",
        "project": "NodeGoat DevSecOps",
        "marker-color": "#FF7300",
        "marker-size": "large",
        "marker-symbol": "college"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [79.9733, 6.9147]
      }
    }
  ]
}

<a id="shield-3d"></a>
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Ice.png" width="32" alt="🧊" /> Bonus · Interactive 3D Security Shield

<sub>A low-poly shield inspired by the SLIIT crest, with an embossed ✓ for “all gates passed” — rendered natively by GitHub from ASCII STL. <b>Drag to rotate · scroll to zoom.</b></sub>

stl

solid nodegoat_devsecops_shield
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex 0 -0.11 -1.25
   vertex 0.306 -0.11 -1.066
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex 0.306 0.11 -1.066
   vertex 0 0.11 -1.25
  endloop
 endfacet
 facet normal 0.516 0 -0.857
  outer loop
   vertex 0 -0.11 -1.25
   vertex 0.306 0.11 -1.066
   vertex 0.306 -0.11 -1.066
  endloop
 endfacet
 facet normal 0.516 0 -0.857
  outer loop
   vertex 0 -0.11 -1.25
   vertex 0 0.11 -1.25
   vertex 0.306 0.11 -1.066
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex 0.306 -0.11 -1.066
   vertex 0.544 -0.11 -0.848
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex 0.544 0.11 -0.848
   vertex 0.306 0.11 -1.066
  endloop
 endfacet
 facet normal 0.674 0 -0.739
  outer loop
   vertex 0.306 -0.11 -1.066
   vertex 0.544 0.11 -0.848
   vertex 0.544 -0.11 -0.848
  endloop
 endfacet
 facet normal 0.674 0 -0.739
  outer loop
   vertex 0.306 -0.11 -1.066
   vertex 0.306 0.11 -1.066
   vertex 0.544 0.11 -0.848
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex 0.544 -0.11 -0.848
   vertex 0.714 -0.11 -0.598
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex 0.714 0.11 -0.598
   vertex 0.544 0.11 -0.848
  endloop
 endfacet
 facet normal 0.827 0 -0.562
  outer loop
   vertex 0.544 -0.11 -0.848
   vertex 0.714 0.11 -0.598
   vertex 0.714 -0.11 -0.598
  endloop
 endfacet
 facet normal 0.827 0 -0.562
  outer loop
   vertex 0.544 -0.11 -0.848
   vertex 0.544 0.11 -0.848
   vertex 0.714 0.11 -0.598
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex 0.714 -0.11 -0.598
   vertex 0.816 -0.11 -0.316
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex 0.816 0.11 -0.316
   vertex 0.714 0.11 -0.598
  endloop
 endfacet
 facet normal 0.941 0 -0.339
  outer loop
   vertex 0.714 -0.11 -0.598
   vertex 0.816 0.11 -0.316
   vertex 0.816 -0.11 -0.316
  endloop
 endfacet
 facet normal 0.941 0 -0.339
  outer loop
   vertex 0.714 -0.11 -0.598
   vertex 0.714 0.11 -0.598
   vertex 0.816 0.11 -0.316
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex 0.816 -0.11 -0.316
   vertex 0.85 -0.11 0
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex 0.85 0.11 0
   vertex 0.816 0.11 -0.316
  endloop
 endfacet
 facet normal 0.994 0 -0.107
  outer loop
   vertex 0.816 -0.11 -0.316
   vertex 0.85 0.11 0
   vertex 0.85 -0.11 0
  endloop
 endfacet
 facet normal 0.994 0 -0.107
  outer loop
   vertex 0.816 -0.11 -0.316
   vertex 0.816 0.11 -0.316
   vertex 0.85 0.11 0
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex 0.85 -0.11 0
   vertex 0.85 -0.11 1
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex 0.85 0.11 1
   vertex 0.85 0.11 0
  endloop
 endfacet
 facet normal 1 0 0
  outer loop
   vertex 0.85 -0.11 0
   vertex 0.85 0.11 1
   vertex 0.85 -0.11 1
  endloop
 endfacet
 facet normal 1 0 0
  outer loop
   vertex 0.85 -0.11 0
   vertex 0.85 0.11 0
   vertex 0.85 0.11 1
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex 0.85 -0.11 1
   vertex -0.85 -0.11 1
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex -0.85 0.11 1
   vertex 0.85 0.11 1
  endloop
 endfacet
 facet normal 0 0 1
  outer loop
   vertex 0.85 -0.11 1
   vertex -0.85 0.11 1
   vertex -0.85 -0.11 1
  endloop
 endfacet
 facet normal 0 0 1
  outer loop
   vertex 0.85 -0.11 1
   vertex 0.85 0.11 1
   vertex -0.85 0.11 1
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex -0.85 -0.11 1
   vertex -0.85 -0.11 0
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex -0.85 0.11 0
   vertex -0.85 0.11 1
  endloop
 endfacet
 facet normal -1 0 0
  outer loop
   vertex -0.85 -0.11 1
   vertex -0.85 0.11 0
   vertex -0.85 -0.11 0
  endloop
 endfacet
 facet normal -1 0 0
  outer loop
   vertex -0.85 -0.11 1
   vertex -0.85 0.11 1
   vertex -0.85 0.11 0
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex -0.85 -0.11 0
   vertex -0.816 -0.11 -0.316
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex -0.816 0.11 -0.316
   vertex -0.85 0.11 0
  endloop
 endfacet
 facet normal -0.994 0 -0.107
  outer loop
   vertex -0.85 -0.11 0
   vertex -0.816 0.11 -0.316
   vertex -0.816 -0.11 -0.316
  endloop
 endfacet
 facet normal -0.994 0 -0.107
  outer loop
   vertex -0.85 -0.11 0
   vertex -0.85 0.11 0
   vertex -0.816 0.11 -0.316
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex -0.816 -0.11 -0.316
   vertex -0.714 -0.11 -0.598
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex -0.714 0.11 -0.598
   vertex -0.816 0.11 -0.316
  endloop
 endfacet
 facet normal -0.941 0 -0.339
  outer loop
   vertex -0.816 -0.11 -0.316
   vertex -0.714 0.11 -0.598
   vertex -0.714 -0.11 -0.598
  endloop
 endfacet
 facet normal -0.941 0 -0.339
  outer loop
   vertex -0.816 -0.11 -0.316
   vertex -0.816 0.11 -0.316
   vertex -0.714 0.11 -0.598
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex -0.714 -0.11 -0.598
   vertex -0.544 -0.11 -0.848
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex -0.544 0.11 -0.848
   vertex -0.714 0.11 -0.598
  endloop
 endfacet
 facet normal -0.827 0 -0.562
  outer loop
   vertex -0.714 -0.11 -0.598
   vertex -0.544 0.11 -0.848
   vertex -0.544 -0.11 -0.848
  endloop
 endfacet
 facet normal -0.827 0 -0.562
  outer loop
   vertex -0.714 -0.11 -0.598
   vertex -0.714 0.11 -0.598
   vertex -0.544 0.11 -0.848
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex -0.544 -0.11 -0.848
   vertex -0.306 -0.11 -1.066
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex -0.306 0.11 -1.066
   vertex -0.544 0.11 -0.848
  endloop
 endfacet
 facet normal -0.674 0 -0.739
  outer loop
   vertex -0.544 -0.11 -0.848
   vertex -0.306 0.11 -1.066
   vertex -0.306 -0.11 -1.066
  endloop
 endfacet
 facet normal -0.674 0 -0.739
  outer loop
   vertex -0.544 -0.11 -0.848
   vertex -0.544 0.11 -0.848
   vertex -0.306 0.11 -1.066
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.11 -0.377
   vertex -0.306 -0.11 -1.066
   vertex 0 -0.11 -1.25
  endloop
 endfacet
 facet normal 0 1 0
  outer loop
   vertex 0 0.11 -0.377
   vertex 0 0.11 -1.25
   vertex -0.306 0.11 -1.066
  endloop
 endfacet
 facet normal -0.516 0 -0.857
  outer loop
   vertex -0.306 -0.11 -1.066
   vertex 0 0.11 -1.25
   vertex 0 -0.11 -1.25
  endloop
 endfacet
 facet normal -0.516 0 -0.857
  outer loop
   vertex -0.306 -0.11 -1.066
   vertex -0.306 0.11 -1.066
   vertex 0 0.11 -1.25
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex 0 -0.17 -1.025
   vertex 0.245 -0.17 -0.877
  endloop
 endfacet
 facet normal 0.516 0 -0.857
  outer loop
   vertex 0 -0.17 -1.025
   vertex 0.245 -0.11 -0.877
   vertex 0.245 -0.17 -0.877
  endloop
 endfacet
 facet normal 0.516 0 -0.857
  outer loop
   vertex 0 -0.17 -1.025
   vertex 0 -0.11 -1.025
   vertex 0.245 -0.11 -0.877
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex 0.245 -0.17 -0.877
   vertex 0.435 -0.17 -0.704
  endloop
 endfacet
 facet normal 0.674 0 -0.739
  outer loop
   vertex 0.245 -0.17 -0.877
   vertex 0.435 -0.11 -0.704
   vertex 0.435 -0.17 -0.704
  endloop
 endfacet
 facet normal 0.674 0 -0.739
  outer loop
   vertex 0.245 -0.17 -0.877
   vertex 0.245 -0.11 -0.877
   vertex 0.435 -0.11 -0.704
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex 0.435 -0.17 -0.704
   vertex 0.571 -0.17 -0.504
  endloop
 endfacet
 facet normal 0.827 0 -0.562
  outer loop
   vertex 0.435 -0.17 -0.704
   vertex 0.571 -0.11 -0.504
   vertex 0.571 -0.17 -0.504
  endloop
 endfacet
 facet normal 0.827 0 -0.562
  outer loop
   vertex 0.435 -0.17 -0.704
   vertex 0.435 -0.11 -0.704
   vertex 0.571 -0.11 -0.504
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex 0.571 -0.17 -0.504
   vertex 0.653 -0.17 -0.277
  endloop
 endfacet
 facet normal 0.941 0 -0.339
  outer loop
   vertex 0.571 -0.17 -0.504
   vertex 0.653 -0.11 -0.277
   vertex 0.653 -0.17 -0.277
  endloop
 endfacet
 facet normal 0.941 0 -0.339
  outer loop
   vertex 0.571 -0.17 -0.504
   vertex 0.571 -0.11 -0.504
   vertex 0.653 -0.11 -0.277
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex 0.653 -0.17 -0.277
   vertex 0.68 -0.17 -0.025
  endloop
 endfacet
 facet normal 0.994 0 -0.107
  outer loop
   vertex 0.653 -0.17 -0.277
   vertex 0.68 -0.11 -0.025
   vertex 0.68 -0.17 -0.025
  endloop
 endfacet
 facet normal 0.994 0 -0.107
  outer loop
   vertex 0.653 -0.17 -0.277
   vertex 0.653 -0.11 -0.277
   vertex 0.68 -0.11 -0.025
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex 0.68 -0.17 -0.025
   vertex 0.68 -0.17 0.775
  endloop
 endfacet
 facet normal 1 0 0
  outer loop
   vertex 0.68 -0.17 -0.025
   vertex 0.68 -0.11 0.775
   vertex 0.68 -0.17 0.775
  endloop
 endfacet
 facet normal 1 0 0
  outer loop
   vertex 0.68 -0.17 -0.025
   vertex 0.68 -0.11 -0.025
   vertex 0.68 -0.11 0.775
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex 0.68 -0.17 0.775
   vertex -0.68 -0.17 0.775
  endloop
 endfacet
 facet normal 0 0 1
  outer loop
   vertex 0.68 -0.17 0.775
   vertex -0.68 -0.11 0.775
   vertex -0.68 -0.17 0.775
  endloop
 endfacet
 facet normal 0 0 1
  outer loop
   vertex 0.68 -0.17 0.775
   vertex 0.68 -0.11 0.775
   vertex -0.68 -0.11 0.775
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex -0.68 -0.17 0.775
   vertex -0.68 -0.17 -0.025
  endloop
 endfacet
 facet normal -1 0 0
  outer loop
   vertex -0.68 -0.17 0.775
   vertex -0.68 -0.11 -0.025
   vertex -0.68 -0.17 -0.025
  endloop
 endfacet
 facet normal -1 0 0
  outer loop
   vertex -0.68 -0.17 0.775
   vertex -0.68 -0.11 0.775
   vertex -0.68 -0.11 -0.025
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex -0.68 -0.17 -0.025
   vertex -0.653 -0.17 -0.277
  endloop
 endfacet
 facet normal -0.994 0 -0.107
  outer loop
   vertex -0.68 -0.17 -0.025
   vertex -0.653 -0.11 -0.277
   vertex -0.653 -0.17 -0.277
  endloop
 endfacet
 facet normal -0.994 0 -0.107
  outer loop
   vertex -0.68 -0.17 -0.025
   vertex -0.68 -0.11 -0.025
   vertex -0.653 -0.11 -0.277
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex -0.653 -0.17 -0.277
   vertex -0.571 -0.17 -0.504
  endloop
 endfacet
 facet normal -0.941 0 -0.339
  outer loop
   vertex -0.653 -0.17 -0.277
   vertex -0.571 -0.11 -0.504
   vertex -0.571 -0.17 -0.504
  endloop
 endfacet
 facet normal -0.941 0 -0.339
  outer loop
   vertex -0.653 -0.17 -0.277
   vertex -0.653 -0.11 -0.277
   vertex -0.571 -0.11 -0.504
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex -0.571 -0.17 -0.504
   vertex -0.435 -0.17 -0.704
  endloop
 endfacet
 facet normal -0.827 0 -0.562
  outer loop
   vertex -0.571 -0.17 -0.504
   vertex -0.435 -0.11 -0.704
   vertex -0.435 -0.17 -0.704
  endloop
 endfacet
 facet normal -0.827 0 -0.562
  outer loop
   vertex -0.571 -0.17 -0.504
   vertex -0.571 -0.11 -0.504
   vertex -0.435 -0.11 -0.704
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex -0.435 -0.17 -0.704
   vertex -0.245 -0.17 -0.877
  endloop
 endfacet
 facet normal -0.674 0 -0.739
  outer loop
   vertex -0.435 -0.17 -0.704
   vertex -0.245 -0.11 -0.877
   vertex -0.245 -0.17 -0.877
  endloop
 endfacet
 facet normal -0.674 0 -0.739
  outer loop
   vertex -0.435 -0.17 -0.704
   vertex -0.435 -0.11 -0.704
   vertex -0.245 -0.11 -0.877
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0 -0.17 -0.327
   vertex -0.245 -0.17 -0.877
   vertex 0 -0.17 -1.025
  endloop
 endfacet
 facet normal -0.516 0 -0.857
  outer loop
   vertex -0.245 -0.17 -0.877
   vertex 0 -0.11 -1.025
   vertex 0 -0.17 -1.025
  endloop
 endfacet
 facet normal -0.516 0 -0.857
  outer loop
   vertex -0.245 -0.17 -0.877
   vertex -0.245 -0.11 -0.877
   vertex 0 -0.11 -1.025
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex -0.24 -0.26 -0.16
   vertex -0.451 -0.26 -0.063
   vertex -0.171 -0.26 -0.383
  endloop
 endfacet
 facet normal -0.753 0 -0.659
  outer loop
   vertex -0.451 -0.26 -0.063
   vertex -0.171 -0.17 -0.383
   vertex -0.171 -0.26 -0.383
  endloop
 endfacet
 facet normal -0.753 0 -0.659
  outer loop
   vertex -0.451 -0.26 -0.063
   vertex -0.451 -0.17 -0.063
   vertex -0.171 -0.17 -0.383
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex -0.24 -0.26 -0.16
   vertex -0.171 -0.26 -0.383
   vertex -0.029 -0.26 -0.257
  endloop
 endfacet
 facet normal 0.659 0 -0.753
  outer loop
   vertex -0.171 -0.26 -0.383
   vertex -0.029 -0.17 -0.257
   vertex -0.029 -0.26 -0.257
  endloop
 endfacet
 facet normal 0.659 0 -0.753
  outer loop
   vertex -0.171 -0.26 -0.383
   vertex -0.171 -0.17 -0.383
   vertex -0.029 -0.17 -0.257
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex -0.24 -0.26 -0.16
   vertex -0.029 -0.26 -0.257
   vertex -0.309 -0.26 0.063
  endloop
 endfacet
 facet normal 0.753 0 0.659
  outer loop
   vertex -0.029 -0.26 -0.257
   vertex -0.309 -0.17 0.063
   vertex -0.309 -0.26 0.063
  endloop
 endfacet
 facet normal 0.753 0 0.659
  outer loop
   vertex -0.029 -0.26 -0.257
   vertex -0.029 -0.17 -0.257
   vertex -0.309 -0.17 0.063
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex -0.24 -0.26 -0.16
   vertex -0.309 -0.26 0.063
   vertex -0.451 -0.26 -0.063
  endloop
 endfacet
 facet normal -0.659 0 0.753
  outer loop
   vertex -0.309 -0.26 0.063
   vertex -0.451 -0.17 -0.063
   vertex -0.451 -0.26 -0.063
  endloop
 endfacet
 facet normal -0.659 0 0.753
  outer loop
   vertex -0.309 -0.26 0.063
   vertex -0.309 -0.17 0.063
   vertex -0.451 -0.17 -0.063
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0.138 -0.26 -0.003
   vertex -0.09 -0.26 -0.444
   vertex 0.515 -0.26 0.321
  endloop
 endfacet
 facet normal 0.784 0 -0.62
  outer loop
   vertex -0.09 -0.26 -0.444
   vertex 0.515 -0.17 0.321
   vertex 0.515 -0.26 0.321
  endloop
 endfacet
 facet normal 0.784 0 -0.62
  outer loop
   vertex -0.09 -0.26 -0.444
   vertex -0.09 -0.17 -0.444
   vertex 0.515 -0.17 0.321
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0.138 -0.26 -0.003
   vertex 0.515 -0.26 0.321
   vertex 0.365 -0.26 0.439
  endloop
 endfacet
 facet normal 0.62 0 0.784
  outer loop
   vertex 0.515 -0.26 0.321
   vertex 0.365 -0.17 0.439
   vertex 0.365 -0.26 0.439
  endloop
 endfacet
 facet normal 0.62 0 0.784
  outer loop
   vertex 0.515 -0.26 0.321
   vertex 0.515 -0.17 0.321
   vertex 0.365 -0.17 0.439
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0.138 -0.26 -0.003
   vertex 0.365 -0.26 0.439
   vertex -0.24 -0.26 -0.326
  endloop
 endfacet
 facet normal -0.784 0 0.62
  outer loop
   vertex 0.365 -0.26 0.439
   vertex -0.24 -0.17 -0.326
   vertex -0.24 -0.26 -0.326
  endloop
 endfacet
 facet normal -0.784 0 0.62
  outer loop
   vertex 0.365 -0.26 0.439
   vertex 0.365 -0.17 0.439
   vertex -0.24 -0.17 -0.326
  endloop
 endfacet
 facet normal 0 -1 0
  outer loop
   vertex 0.138 -0.26 -0.003
   vertex -0.24 -0.26 -0.326
   vertex -0.09 -0.26 -0.444
  endloop
 endfacet
 facet normal -0.62 0 -0.784
  outer loop
   vertex -0.24 -0.26 -0.326
   vertex -0.09 -0.17 -0.444
   vertex -0.09 -0.26 -0.444
  endloop
 endfacet
 facet normal -0.62 0 -0.784
  outer loop
   vertex -0.24 -0.26 -0.326
   vertex -0.24 -0.17 -0.326
   vertex -0.09 -0.17 -0.444
  endloop
 endfacet
endsolid nodegoat_devsecops_shield

<div align="center"><img src="https://capsule-render.vercel.app/api?type=rect&amp;height=3&amp;color=0:7c3aed,50:0e7490,100:10b981&amp;section=header" width="100%" alt="" />

Danidu  ·  Praween  ·  Chanuka  ·  Christina

<sub>🛡️ Secure by design  ·  ✅ Verified by pipeline  ·  🎓 Built at <b>SLIIT — Sri Lanka Institute of Information Technology</b> for IE3142 – DevOps Security · 2026</sub>

<a href="#readme-top"><img src="https://img.shields.io/badge/back%20to%20top-%E2%86%91-0e7490?style=flat-square" alt="back to top" /></a>
<picture> <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&amp;height=140&amp;color=0:10b981,50:0e7490,100:0f172a&amp;section=footer&amp;text=Shift%20left%20%C2%B7%20Ship%20secure&amp;fontColor=ffffff&amp;fontSize=24&amp;fontAlignY=70&amp;animation=fadeIn" /> <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&amp;height=140&amp;color=0:6ee7b7,50:67e8f9,100:a5f3fc&amp;section=footer&amp;text=Shift%20left%20%C2%B7%20Ship%20secure&amp;fontColor=0f172a&amp;fontSize=24&amp;fontAlignY=70&amp;animation=fadeIn" /> <img src="https://capsule-render.vercel.app/api?type=waving&amp;height=140&amp;color=0:10b981,50:0e7490,100:0f172a&amp;section=footer&amp;text=Shift%20left%20%C2%B7%20Ship%20secure&amp;fontColor=ffffff&amp;fontSize=24&amp;fontAlignY=70&amp;animation=fadeIn" width="100%" alt="" /> </picture></div>
Arena | Benchmark & Compare the Best AI Models
