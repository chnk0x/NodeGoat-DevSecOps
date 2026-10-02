
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
