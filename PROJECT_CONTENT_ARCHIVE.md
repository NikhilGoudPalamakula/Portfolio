# Project content archive

The full project copy as it stood on **2026-10-12**, before the case-study pages were condensed
(summary → key numbers → "What I built" → folded details). Nothing here is lost: pull any line
back into `client/src/content/projects.js` if it is needed again.

Generated verbatim from `projects.js` — wording, numbers and order are exactly what the site showed.

## What changed on the site

Every page now reads **summary (problem / my role / result) → key numbers → "What I built" → What it
does → How it helps**, all shown in full (an interim version folded the later sections; that was
reverted the same day — no extra clicks). Only the lines listed as *dropped* below are off the site
entirely and live only in this file.

| Project | "What I built" | Other sections (condensed) | Dropped (only here) |
|---|---|---|---|
| SeaTrace | 4 (data architecture, exports, payments, stack) | What it does (7 → 3, merged) · How it helps (6 → 3) | Separate supplier / every-carton / export bullets (merged into the 3); How it helps: procurement evidence, multi-plant comparison, exports & payments not manual |
| Factory Intelligence | 9 — 4 headline (idle time, Socket.IO, ~$1,100, AI copilot) + 5 condensed from the other build groups | What it does (7 → 4) · How it helps (6 → 3) | Machine timeline views; metric-ontology knowledge graph + nightly cron; streaming chat UI with clarification cards; "turns lost output into something you prevent"; "stays honest about its data" (folded into the line-day line) |
| EMS | 7 — 4 headline (backend + schema, frontend, auth, ~50%) + reports, Python integration, Docker | What it does (6 → 4) · How it helps (3) | "Sole full-stack developer…" bullet (now the summary's role line); "Separate views for operators, supervisors and management" (now in the frontend bullet) |
| HMS | 3 — **added** from the resume (4 modules, client requirements, demos & pre-sales) | What it does (4, unchanged) | — |
| Pharma automation | 3 | Client plants (4, unchanged) | The liaise / commission-on-site and "4 companies" bullets moved into the summary |
| Injectables | 4 (unchanged) | — | — |

New on every page: a three-line summary. New metrics: Pharma `4 · Pharma companies`.

---

## 01 · SeaTrace — Seafood ERP

- **Slug:** `seatrace-seafood-erp`
- **Category:** Full-Stack · ERP
- **Org:** PatternLab.ai
- **Dates:** Jan 2026 – Present
- **Tags:** React, TypeScript, NestJS, MongoDB
- **Live:** https://app.seatrace.ai/login

**Blurb:** An ERP running the full lifecycle of a shrimp processing and export business — supplier to shipment — with every carton traceable back to its batch, plant, shift and supplier.

### Key numbers

| Value | Label |
|---|---|
| ~200 | Daily users |
| ~89 | NestJS REST modules |
| 30+ | Analytical reports |
| 12 | Floor-balance modules |
| 13 | Organoleptic QC forms |

### What it does

- Runs the entire lifecycle of a shrimp processing and export business in one system
- Starts at the supplier — raw-material bookings, purchase and price masters
- Follows every lot through receiving, supervisor/plant assignment, and each stage: beheading, grading, soaking, peeling & cutting, nobashi, IQF, cold store and packing
- Captures quality control at every stage — pre-harvest checks, lab parameters, defect specs and organoleptic inspections
- Closes the loop with export masters, export transactions with generated documentation, and payment settlement
- Every carton shipped traces back to the batch, plant, shift and supplier it came from
- Surfaces it all through 30+ analytical reports and KPI dashboards — yield, costing, procurement and multi-plant production

### How it helps

- Replaces spreadsheets with same-day visibility — stage-wise floor balance reconciles what went into each process against what came out, so unaccounted stock surfaces immediately instead of at month-end
- Makes yield measurable per stage, batch and supervisor — beheading, peeling/cutting and soaking yields tracked against plan, exposing which lines, shifts and grades actually perform
- Costing and margin known per batch — costing-per-batch and budget-vs-actual tie real processing cost back to purchase price, so buying decisions follow outcomes, not estimates
- Gives procurement evidence — booking accuracy, count-wise and cross-origin price comparison show which suppliers and sizes are worth buying
- Makes multi-plant operations comparable — daily production consolidated across plants on one view
- Stops exports and payments being manual — documentation generated from the same data that produced it, and outstanding raw-material payments tracked instead of chased

### What I built

#### Technical lead & architecture

- Co-led the build as one of two technical leads in a 6-person engineering team
- Owned the data architecture across the ERP — schema design for each module, how data is stored and fetched, and the coding conventions the codebase follows

#### Exports & finance — built end to end

- Export masters and transactions with server-side PDF document generation
- Strategy-based payments module with raw-material payments-outstanding tracking

#### Across the platform

- Contributed additional features across the processing, quality and reporting modules
- Worked in a NestJS + MongoDB backend (~89 REST modules) and a React 19 + TypeScript + Vite + MUI frontend

---

## 02 · Factory Intelligence

- **Slug:** `factory-intelligence`
- **Category:** Full-Stack · Manufacturing
- **Org:** PatternLab.ai
- **Dates:** Dec 2024 – Jan 2026
- **Tags:** React, TypeScript, NestJS, MongoDB, Python
- **Live:** https://app.patternlab.ai/login

**Blurb:** A multi-tenant factory intelligence platform that turns live machine telemetry and operator data into real-time OEE, utilisation and downtime insight — live across 6 client organisations from one codebase.

### Key numbers

| Value | Label |
|---|---|
| 6 | Client organisations |
| ~$1,100 | Recurring fetch cost cut |
| 15 | Automated report types |
| ~45 | React feature modules |

### What it does

- Multi-tenant platform live across 6 client organisations from a single codebase
- Ingests live IoT telemetry streamed from machines on the shop floor
- Combines it with operator-entered data — production, quality, downtime reasons, manpower, refrigeration and energy
- Classifies every machine as running, stopped or idle and streams that state live to dashboards over WebSockets
- Computes OEE, utilisation, downtime Pareto, energy and load, batch and SKU-level quality, and manpower productivity
- Delivers 15 automated PDF reports on daily, weekly and monthly schedules
- Answers plant-performance questions in plain English through an AI copilot

### How it helps

- Exposes hidden lost capacity — conventional OEE tools count only logged downtime, so a machine powered on but not producing disappears from the numbers
- Treats idle time as a first-class signal, surfacing underutilised machines that downtime-only maths makes invisible
- Shifts plants from next-morning reporting to live visibility — a stall is seen as it happens, not in tomorrow's shift report
- Turns lost output from something you account for into something you prevent
- Makes metrics explainable — which stoppage reasons cost which hours, which SKUs dragged quality, how the day split across run, planned and unplanned stop
- Stays honest about its data — labels where each figure came from, so under-instrumented sites are never shown numbers the data can't support

### What I built

#### Machine utilisation & idle-time analytics

- Made idle segments count toward stoppage aggregation across the production analytics layer
- Surfaced idle time as attributed, actionable lost capacity instead of an unexplained gap in the data

#### Real-time machine-state visibility

- Authenticated Socket.IO gateway with a JWT-over-cookie handshake and a per-tenant connection registry
- Live machine state pushed to both floor and management dashboards
- Machine timeline views for shift-level review

#### Line-day explainability

- OEE calendar with a drill-down drawer that explains a production day rather than only scoring it
- Run / planned-stop / unplanned-stop time split, downtime reasons ranked by hours, SKU-level quality contribution
- Extracted the arithmetic into a pure, dependency-free module so executive-facing numbers are provable in unit tests
- Provenance labelling on every time split, so the UI degrades honestly on low-coverage plants instead of showing a misleading all-green bar

#### Analytics & KPI engine (Python)

- Contributed to the Python analytics engine — data processing and KPI calculation
- Co-designed the MongoDB schema and data model the metrics are computed from
- Cut recurring data-fetching cost by ~$1,100 — eliminated redundant fetches and cached results so a single fetch feeds multiple KPI calculations

#### AI analytics copilot

- NestJS gateway fronting a Python analytics agent
- Metric-ontology knowledge graph — nodes, edges, relations, per-plant notes, nightly refresh cron
- Enforced the tenant boundary with short-lived scoped tokens, so the agent service holds zero database credentials
- Streaming React chat surface with clarification cards and inline chart rendering

#### Automated reporting engine

- Extended a strategy-pattern report system to 15 report types — headlines, consumption, refrigeration, PI, solar efficiency and load management
- Server-side PDF rendering via EJS + Highcharts Export Server, delivered on cron schedules

#### Manpower & hourly production analytics

- Modelled per-line, per-shift headcount as a first-class entity and KPI
- Built end-to-end: MongoDB schema, NestJS APIs, React data-entry forms, hourly trend visualisations
- Lets output be read against the people actually on the floor

#### Platform & multi-tenancy

- Contributed across ~45 React feature modules
- Per-client configuration flags, role and permission management, route-level access control, audit trails

---

## 03 · EMS — Energy Management System

- **Slug:** `ems-energy-management-system`
- **Category:** Full-Stack · Energy
- **Org:** PatternLab.ai
- **Dates:** May 2024 – Dec 2024
- **Tags:** React, Node.js, Express, MongoDB, Python, Docker

**Blurb:** A platform to monitor energy use across a facility, spot where it's being wasted, and fix it.

### Key numbers

| Value | Label |
|---|---|
| 45+ | REST API modules |
| 40+ | React frontend modules |
| 4 | User personas |
| ~50% | Faster API responses |

### What it does

- Live energy and load monitoring, section by section
- Critical alerts for issues needing immediate action
- Custom alerts for your own thresholds
- Finds energy losses and shows them in rupees
- Scheduled reports, exportable to CSV and PDF
- Separate views for operators, supervisors and management

### How it helps

- See load as it happens and adjust — not wait for the monthly bill
- Turn invisible waste into a number worth acting on
- Spot equipment that keeps failing and plan ahead

### What I built

- Sole full-stack developer — built the entire application, from a 45+ module Express/Mongoose backend to the React frontend, serving a dashboard used daily by plant operations
- Designed the MongoDB schema and data architecture — collections, relationships, and time-series analytics storage
- Auth and session security — JWT with refresh rotation, bcrypt password hashing, and automatic session expiry
- React frontend with 40+ feature modules across four role-scoped personas (live monitoring, dashboards, root-cause diagnosis, asset master-data)
- Cut API response times by ~50% (approx. 3s to 1.5s) with database indexing, query tuning, and pagination for lighter payloads
- Scheduled report generation (EJS + node-cron + Postmark) with client-side PDF/CSV export
- Integrated with the Python analytics team's engine, co-designing the shared MongoDB data model so data was stored for efficient reads and writes on both sides
- Containerised a three-service stack with Docker Compose for on-prem deployment

---

## 04 · HMS — Hospital Management System

- **Slug:** `hms-hospital-management-system`
- **Category:** Full-Stack · Healthcare
- **Org:** Matrical Technologies
- **Dates:** Dec 2023 – Apr 2024
- **Tags:** React, Node.js, Express, MongoDB

**Blurb:** A hospital management ERP covering the full patient journey — from walk-in to discharge — with billing, pharmacy and inventory in one system.

### Key numbers

| Value | Label |
|---|---|
| 4 | Core modules |

### What it does

- Tracks patients end to end, from walk-in registration through to discharge
- Billing across consultations, procedures and services
- Pharmacy management, with dispensing tied to patient records
- Inventory tracking for stock and supplies

---

## 05 · Pharma Automation & 21 CFR Part 11 Implementations

- **Slug:** `pharma-automation-21-cfr-part-11`
- **Category:** Industrial Automation · Compliance
- **Org:** SBR Automation
- **Tags:** Mitsubishi, Allen-Bradley, Beijer HMI, 21 CFR Part 11

**Blurb:** Automation and compliance implementations across pharma manufacturing plants — moving legacy machines onto audit-ready systems, keeping each machine's core process structure intact while building new functionality onto it.

### What it involved

- Liaised directly with plant and client engineering teams to capture requirements for new machine functionality and process changes, then specified, built and commissioned the automation on site
- Implemented Beijer X2 Pro HMI systems in place of legacy Mitsubishi and Allen-Bradley HMIs and PLCs
- Kept each machine's core process structure intact while adding new functionality on top of it
- Implemented 21 CFR Part 11 features — user management, audit trails and electronic reports
- Re-worked machine process-flow logic to suit what each plant actually needed
- Delivered across 4 pharmaceutical companies, often running several plant units in parallel

### Client plants

- Hetero — Unit 3 and other units
- MSN — Unit 1 and Unit 4
- Aurobindo — Unit 6
- Dr. Reddy's — FTO2 and FTO3

---

## 06 · Injectables Mixing Vessel Automation

- **Slug:** `injectables-mixing-vessel-automation`
- **Category:** Industrial Automation
- **Org:** SBR Automation
- **Tags:** Mitsubishi, Beijer HMI, PLC, Pharma

**Blurb:** Ground-up mixing-vessel automation for the injectables division at Eugia Unit 3 — control logic, HMI, reporting and audit trails, all built from scratch.

### What it involved

- Built the mixing-vessel automation logic from scratch on a Mitsubishi PLC
- Beijer X2 Pro HMI for operator control and monitoring
- Production and batch reporting
- Audit trails for full traceability
