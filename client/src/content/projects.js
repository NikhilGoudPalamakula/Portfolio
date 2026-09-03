export const PROJECTS = [
  {
    slug: 'seatrace-seafood-erp',
    title: 'SeaTrace — Seafood ERP',
    category: 'Full-Stack · ERP',
    year: 'Jan 2026 – Present',
    org: 'PatternLab.ai',
    blurb:
      'An ERP running the full lifecycle of a shrimp processing and export business — supplier to shipment — with every carton traceable back to its batch, plant, shift and supplier.',
    tint: 'var(--pine)',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB'],
    repo: null,
    live: 'https://app.seatrace.ai/login',
    metrics: [
      { v: '~89', k: 'NestJS REST modules' },
      { v: '30+', k: 'Analytical reports' },
      { v: '12', k: 'Floor-balance modules' },
      { v: '13', k: 'Organoleptic QC forms' },
    ],
    groups: [
      {
        label: 'What it does',
        items: [
          'Runs the entire lifecycle of a shrimp processing and export business in one system',
          'Starts at the supplier — raw-material bookings, purchase and price masters',
          'Follows every lot through receiving, supervisor/plant assignment, and each stage: beheading, grading, soaking, peeling & cutting, nobashi, IQF, cold store and packing',
          'Captures quality control at every stage — pre-harvest checks, lab parameters, defect specs and organoleptic inspections',
          'Closes the loop with export masters, export transactions with generated documentation, and payment settlement',
          'Every carton shipped traces back to the batch, plant, shift and supplier it came from',
          'Surfaces it all through 30+ analytical reports and KPI dashboards — yield, costing, procurement and multi-plant production',
        ],
      },
      {
        label: 'How it helps',
        items: [
          'Replaces spreadsheets with same-day visibility — stage-wise floor balance reconciles what went into each process against what came out, so unaccounted stock surfaces immediately instead of at month-end',
          'Makes yield measurable per stage, batch and supervisor — beheading, peeling/cutting and soaking yields tracked against plan, exposing which lines, shifts and grades actually perform',
          'Costing and margin known per batch — costing-per-batch and budget-vs-actual tie real processing cost back to purchase price, so buying decisions follow outcomes, not estimates',
          'Gives procurement evidence — booking accuracy, count-wise and cross-origin price comparison show which suppliers and sizes are worth buying',
          'Makes multi-plant operations comparable — daily production consolidated across plants on one view',
          'Stops exports and payments being manual — documentation generated from the same data that produced it, and outstanding raw-material payments tracked instead of chased',
        ],
      },
    ],
    build: [
      {
        label: 'Technical lead & architecture',
        items: [
          'Co-led the build as one of two technical leads',
          'Owned the data architecture across the ERP — schema design for each module, how data is stored and fetched, and the coding conventions the codebase follows',
        ],
      },
      {
        label: 'Exports & finance — built end to end',
        items: [
          'Export masters and transactions with server-side PDF document generation',
          'Strategy-based payments module with raw-material payments-outstanding tracking',
        ],
      },
      {
        label: 'Across the platform',
        items: [
          'Contributed additional features across the processing, quality and reporting modules',
          'Worked in a NestJS + MongoDB backend (~89 REST modules) and a React 19 + TypeScript + Vite + MUI frontend',
        ],
      },
    ],
  },
  {
    slug: 'factory-intelligence',
    title: 'Factory Intelligence',
    category: 'Full-Stack · Manufacturing',
    year: 'Dec 2024 – Jan 2026',
    org: 'PatternLab.ai',
    blurb:
      'A multi-tenant factory intelligence platform that turns live machine telemetry and operator data into real-time OEE, utilisation and downtime insight — serving many plants from one codebase.',
    tint: 'var(--indigo)',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Python'],
    repo: null,
    live: 'https://app.patternlab.ai/login',
    metrics: [
      { v: '~$1,100', k: 'Recurring fetch cost cut' },
      { v: '15', k: 'Automated report types' },
      { v: '~45', k: 'React feature modules' },
    ],
    groups: [
      {
        label: 'What it does',
        items: [
          'Multi-tenant platform serving many plants and tenants from a single codebase',
          'Ingests live IoT telemetry streamed from machines on the shop floor',
          'Combines it with operator-entered data — production, quality, downtime reasons, manpower, refrigeration and energy',
          'Classifies every machine as running, stopped or idle and streams that state live to dashboards over WebSockets',
          'Computes OEE, utilisation, downtime Pareto, energy and load, batch and SKU-level quality, and manpower productivity',
          'Delivers 15 automated PDF reports on daily, weekly and monthly schedules',
          'Answers plant-performance questions in plain English through an AI copilot',
        ],
      },
      {
        label: 'How it helps',
        items: [
          'Exposes hidden lost capacity — conventional OEE tools count only logged downtime, so a machine powered on but not producing disappears from the numbers',
          'Treats idle time as a first-class signal, surfacing underutilised machines that downtime-only maths makes invisible',
          "Shifts plants from next-morning reporting to live visibility — a stall is seen as it happens, not in tomorrow's shift report",
          'Turns lost output from something you account for into something you prevent',
          'Makes metrics explainable — which stoppage reasons cost which hours, which SKUs dragged quality, how the day split across run, planned and unplanned stop',
          "Stays honest about its data — labels where each figure came from, so under-instrumented sites are never shown numbers the data can't support",
        ],
      },
    ],
    build: [
      {
        label: 'Machine utilisation & idle-time analytics',
        items: [
          'Made idle segments count toward stoppage aggregation across the production analytics layer',
          'Surfaced idle time as attributed, actionable lost capacity instead of an unexplained gap in the data',
        ],
      },
      {
        label: 'Real-time machine-state visibility',
        items: [
          'Authenticated Socket.IO gateway with a JWT-over-cookie handshake and a per-tenant connection registry',
          'Live machine state pushed to both floor and management dashboards',
          'Machine timeline views for shift-level review',
        ],
      },
      {
        label: 'Line-day explainability',
        items: [
          'OEE calendar with a drill-down drawer that explains a production day rather than only scoring it',
          'Run / planned-stop / unplanned-stop time split, downtime reasons ranked by hours, SKU-level quality contribution',
          'Extracted the arithmetic into a pure, dependency-free module so executive-facing numbers are provable in unit tests',
          'Provenance labelling on every time split, so the UI degrades honestly on low-coverage plants instead of showing a misleading all-green bar',
        ],
      },
      {
        label: 'Analytics & KPI engine (Python)',
        items: [
          'Contributed to the Python analytics engine — data processing and KPI calculation',
          'Co-designed the MongoDB schema and data model the metrics are computed from',
          'Cut recurring data-fetching cost by ~$1,100 — eliminated redundant fetches and cached results so a single fetch feeds multiple KPI calculations',
        ],
      },
      {
        label: 'AI analytics copilot',
        items: [
          'NestJS gateway fronting a Python analytics agent',
          'Metric-ontology knowledge graph — nodes, edges, relations, per-plant notes, nightly refresh cron',
          'Enforced the tenant boundary with short-lived scoped tokens, so the agent service holds zero database credentials',
          'Streaming React chat surface with clarification cards and inline chart rendering',
        ],
      },
      {
        label: 'Automated reporting engine',
        items: [
          'Extended a strategy-pattern report system to 15 report types — headlines, consumption, refrigeration, PI, solar efficiency and load management',
          'Server-side PDF rendering via EJS + Highcharts Export Server, delivered on cron schedules',
        ],
      },
      {
        label: 'Manpower & hourly production analytics',
        items: [
          'Modelled per-line, per-shift headcount as a first-class entity and KPI',
          'Built end-to-end: MongoDB schema, NestJS APIs, React data-entry forms, hourly trend visualisations',
          'Lets output be read against the people actually on the floor',
        ],
      },
      {
        label: 'Platform & multi-tenancy',
        items: [
          'Contributed across ~45 React feature modules',
          'Per-client configuration flags, role and permission management, route-level access control, audit trails',
        ],
      },
    ],
  },
  {
    slug: 'ems-energy-management-system',
    title: 'EMS — Energy Management System',
    category: 'Full-Stack · Energy',
    year: 'May 2024 – Dec 2024',
    org: 'PatternLab.ai',
    blurb:
      "A platform to monitor energy use across a facility, spot where it's being wasted, and fix it.",
    confidential: true,
    tint: 'var(--clay)',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    repo: null,
    live: null,
    metrics: [
      { v: '45+', k: 'REST API modules' },
      { v: '40+', k: 'React frontend modules' },
      { v: '4', k: 'User personas' },
    ],
    groups: [
      {
        label: 'What it does',
        items: [
          'Live energy and load monitoring, section by section',
          'Critical alerts for issues needing immediate action',
          'Custom alerts for your own thresholds',
          'Finds energy losses and shows them in rupees',
          'Scheduled reports, exportable to CSV and PDF',
          'Separate views for operators, supervisors and management',
        ],
      },
      {
        label: 'How it helps',
        items: [
          'See load as it happens and adjust — not wait for the monthly bill',
          'Turn invisible waste into a number worth acting on',
          'Spot equipment that keeps failing and plan ahead',
        ],
      },
      {
        label: 'What I built',
        items: [
          'Sole full-stack developer — built the entire application, from a 45+ module Express/Mongoose backend to the React frontend, serving a dashboard used daily by plant operations',
          'Designed the MongoDB schema and data architecture — collections, relationships, and time-series analytics storage',
          'Auth and session security — JWT with refresh rotation, bcrypt password hashing, and automatic session expiry',
          'React frontend with 40+ feature modules across four role-scoped personas (live monitoring, dashboards, root-cause diagnosis, asset master-data)',
          'Optimized API response times with database indexing, query tuning, and pagination for lighter payloads',
          'Scheduled report generation (EJS + node-cron + Postmark) with client-side PDF/CSV export',
          "Integrated with the Python analytics team's engine, co-designing the shared MongoDB data model so data was stored for efficient reads and writes on both sides",
          'Containerised a three-service stack with Docker Compose for on-prem deployment',
        ],
      },
    ],
  },
  {
    slug: 'hms-hospital-management-system',
    title: 'HMS — Hospital Management System',
    category: 'Full-Stack · Healthcare',
    year: 'Dec 2023 – Apr 2024',
    org: 'Matrical Technologies',
    blurb:
      'A hospital management ERP covering the full patient journey — from walk-in to discharge — with billing, pharmacy and inventory in one system.',
    tint: 'var(--pine)',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    repo: null,
    live: null,
    groups: [
      {
        label: 'What it does',
        items: [
          'Tracks patients end to end, from walk-in registration through to discharge',
          'Billing across consultations, procedures and services',
          'Pharmacy management, with dispensing tied to patient records',
          'Inventory tracking for stock and supplies',
        ],
      },
    ],
  },
  {
    slug: 'pharma-automation-21-cfr-part-11',
    title: 'Pharma Automation & 21 CFR Part 11 Implementations',
    category: 'Industrial Automation · Compliance',
    org: 'SBR Automation',
    blurb:
      "Automation and compliance implementations across pharma manufacturing plants — moving legacy machines onto audit-ready systems, keeping each machine's core process structure intact while building new functionality onto it.",
    tint: 'var(--indigo)',
    tags: ['Mitsubishi', 'Allen-Bradley', 'Beijer HMI', '21 CFR Part 11'],
    repo: null,
    live: null,
    groups: [
      {
        label: 'What it involved',
        items: [
          'Implemented Beijer X2 Pro HMI systems in place of legacy Mitsubishi and Allen-Bradley HMIs and PLCs',
          "Kept each machine's core process structure intact while adding new functionality on top of it",
          'Implemented 21 CFR Part 11 features — user management, audit trails and electronic reports',
          'Re-worked machine process-flow logic to suit what each plant actually needed',
          'Delivered across multiple client plants, often running several implementations at once',
        ],
      },
      {
        label: 'Client plants',
        items: [
          'Hetero — Unit 3 and other units',
          'MSN — Unit 1 and Unit 4',
          'Aurobindo — Unit 6',
          "Dr. Reddy's — FTO2 and FTO3",
        ],
      },
    ],
  },
  {
    slug: 'injectables-mixing-vessel-automation',
    title: 'Injectables Mixing Vessel Automation',
    category: 'Industrial Automation',
    org: 'SBR Automation',
    blurb:
      'Ground-up mixing-vessel automation for the injectables division at Eugia Unit 3 — control logic, HMI, reporting and audit trails, all built from scratch.',
    tint: 'var(--clay)',
    tags: ['Mitsubishi', 'Beijer HMI', 'PLC', 'Pharma'],
    repo: null,
    live: null,
    groups: [
      {
        label: 'What it involved',
        items: [
          'Built the mixing-vessel automation logic from scratch on a Mitsubishi PLC',
          'Beijer X2 Pro HMI for operator control and monitoring',
          'Production and batch reporting',
          'Audit trails for full traceability',
        ],
      },
    ],
  },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);

export const getProjectIndex = (slug) => PROJECTS.findIndex((p) => p.slug === slug);
