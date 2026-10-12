/*
 * Case-study shape, read top to bottom on the project page:
 *   summary  — problem / role / result, three lines a skimmer can read in seconds
 *   metrics  — key numbers
 *   built    — "What I built", strongest points first
 *   more     — further sections (what it does, how it helps…), shown in full
 *
 * The longer copy these pages carried before 2026-10-12 is preserved verbatim
 * in PROJECT_CONTENT_ARCHIVE.md at the repo root.
 */
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
    summary: {
      problem:
        'A shrimp processor and exporter running procurement, floor operations, quality and exports on spreadsheets — unaccounted stock and real yields surfaced at month-end, if at all.',
      role: 'Co-led the build as one of two technical leads in a 6-person team — owned the data architecture and built the exports & finance domain end to end.',
      result:
        'A live ERP used by ~200 people daily, with every carton traceable back to its batch, plant, shift and supplier.',
    },
    metrics: [
      { v: '~200', k: 'Daily users' },
      { v: '~89', k: 'NestJS REST modules' },
      { v: '30+', k: 'Analytical reports' },
      { v: '12', k: 'Floor-balance modules' },
      { v: '13', k: 'Organoleptic QC forms' },
    ],
    built: [
      'Owned the data architecture across the ERP — schema design for each module, how data is stored and fetched, and the coding conventions the codebase follows',
      'Built exports end to end — export masters and transactions with server-side PDF document generation',
      'Strategy-based payments module with raw-material payments-outstanding tracking',
      'Features across processing, quality and reporting in a NestJS + MongoDB backend (~89 REST modules) and a React 19 + TypeScript + Vite + MUI frontend',
    ],
    more: [
      {
        label: 'What it does',
        items: [
          'Runs the full lifecycle in one system — supplier bookings and purchase, every processing stage from receiving through grading, peeling, IQF, cold store and packing, to export and payment settlement',
          'Captures quality control at every stage — pre-harvest checks, lab parameters, defect specs and organoleptic inspections',
          'Surfaces it all through 30+ analytical reports and KPI dashboards — yield, costing, procurement and multi-plant production',
        ],
      },
      {
        label: 'How it helps',
        items: [
          'Same-day visibility instead of spreadsheets — stage-wise floor balance reconciles what went into each process against what came out, so unaccounted stock surfaces immediately instead of at month-end',
          'Yield measurable per stage, batch and supervisor — exposing which lines, shifts and grades actually perform',
          'Costing and margin known per batch — real processing cost tied back to purchase price, so buying decisions follow outcomes, not estimates',
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
      'A multi-tenant factory intelligence platform that turns live machine telemetry and operator data into real-time OEE, utilisation and downtime insight — live across 6 client organisations from one codebase.',
    tint: 'var(--indigo)',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Python'],
    repo: null,
    live: 'https://app.patternlab.ai/login',
    summary: {
      problem:
        "Conventional OEE tools count only logged downtime — a machine powered on but not producing disappears from the numbers, and plants find out in tomorrow's shift report.",
      role: 'Full-stack developer on the multi-tenant platform — idle-time analytics, real-time machine state, reporting and an AI copilot across React, NestJS, MongoDB and Python.',
      result:
        'Live across 6 client organisations: idle time now shows up as attributed lost capacity, and recurring data-fetching cost is down ~$1,100.',
    },
    metrics: [
      { v: '6', k: 'Client organisations' },
      { v: '~$1,100', k: 'Recurring fetch cost cut' },
      { v: '15', k: 'Automated report types' },
      { v: '~45', k: 'React feature modules' },
    ],
    built: [
      'Made idle segments count toward stoppage aggregation — idle time surfaces as attributed, actionable lost capacity instead of an unexplained gap in the data',
      'Authenticated Socket.IO gateway with a JWT-over-cookie handshake and a per-tenant connection registry, pushing live machine state to floor and management dashboards',
      'Cut recurring data-fetching cost by ~$1,100 — eliminated redundant fetches and cached results so a single fetch feeds multiple KPI calculations',
      'AI analytics copilot — a NestJS gateway fronting a Python agent, with the tenant boundary enforced by short-lived scoped tokens so the agent holds zero database credentials',
          'Line-day explainability — an OEE calendar with a drill-down drawer that explains a production day; the arithmetic lives in a pure, unit-tested module, and provenance labels keep low-coverage plants honest',
          'Reporting engine — extended a strategy-pattern system to 15 report types, rendered server-side via EJS + Highcharts Export Server on cron schedules',
          'Manpower analytics — per-line, per-shift headcount as a first-class KPI, built end to end from MongoDB schema to hourly trend charts',
          'Python analytics engine — KPI calculation, and co-designed the MongoDB data model the metrics are computed from',
          'Platform — contributed across ~45 React feature modules: per-client configuration flags, role and permission management, route-level access control, audit trails',
    ],
    more: [
      {
        label: 'What it does',
        items: [
          'Combines live IoT telemetry from shop-floor machines with operator-entered production, quality, downtime, manpower, refrigeration and energy data',
          'Classifies every machine as running, stopped or idle and streams that state live to dashboards over WebSockets',
          'Computes OEE, utilisation, downtime Pareto, energy and load, SKU-level quality and manpower productivity',
          'Delivers 15 automated PDF reports on schedule, and answers plant-performance questions in plain English through the AI copilot',
        ],
      },
      {
        label: 'How it helps',
        items: [
          'Exposes hidden lost capacity — idle time is a first-class signal, so underutilised machines stop being invisible',
          "Live visibility instead of next-morning reporting — a stall is seen as it happens, not in tomorrow's shift report",
          'Explainable metrics — which stoppage reasons cost which hours, which SKUs dragged quality, how the day split across run, planned and unplanned stop',
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
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Docker'],
    repo: null,
    live: null,
    summary: {
      problem:
        'Energy waste showed up on the monthly bill — too late to act on load spikes, losses or equipment that kept failing.',
      role: 'Sole full-stack developer — built the entire application, from the MongoDB schema and APIs to a four-persona React frontend.',
      result:
        'Live monitoring and alerting with losses shown in rupees, and API responses ~50% faster (approx. 3s to 1.5s).',
    },
    metrics: [
      { v: '45+', k: 'REST API modules' },
      { v: '40+', k: 'React frontend modules' },
      { v: '4', k: 'User personas' },
      { v: '~50%', k: 'Faster API responses' },
    ],
    built: [
      'A 45+ module Express/Mongoose backend on a MongoDB schema I designed — collections, relationships and time-series analytics storage',
      'React frontend with 40+ feature modules across four role-scoped personas — live monitoring, dashboards, root-cause diagnosis and asset master data',
      'Auth and session security — JWT with refresh rotation, bcrypt password hashing and automatic session expiry',
      'Cut API response times by ~50% (approx. 3s to 1.5s) with database indexing, query tuning and pagination',
          'Scheduled report generation (EJS + node-cron + Postmark) with client-side PDF/CSV export',
          "Integrated with the Python analytics team's engine, co-designing the shared MongoDB data model for efficient reads and writes on both sides",
          'Containerised a three-service stack with Docker Compose for on-prem deployment',
    ],
    more: [
      {
        label: 'What it does',
        items: [
          'Live energy and load monitoring, section by section',
          'Critical alerts for issues needing immediate action, plus custom alerts on your own thresholds',
          'Finds energy losses and shows them in rupees',
          'Scheduled reports, exportable to CSV and PDF',
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
    summary: {
      problem:
        'A hospital needed patient records, billing, pharmacy and stock to work as one system across the whole patient journey — walk-in registration to discharge.',
      role: 'Full-stack developer on React, Node.js/Express and MongoDB — and on the client side, gathering requirements and demoing the platform.',
      result:
        '4 core modules in one system, with client demos that fed product improvements and supported pre-sales pitches that brought in new business.',
    },
    metrics: [{ v: '4', k: 'Core modules' }],
    built: [
      'Developed the 4 core modules — patient records, billing, pharmacy dispensing and inventory — on React, Node.js/Express and MongoDB',
      'Coordinated directly with clients to gather and clarify requirements, translating business needs into technical specifications and delivering features against them',
      'Demonstrated the platform to existing and prospective clients, gathering feedback for product improvements and supporting pre-sales pitches that brought in new business',
    ],
    more: [
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
    summary: {
      problem:
        'Legacy machines in pharma plants lacked what 21 CFR Part 11 demands — user management, audit trails and electronic records.',
      role: 'Captured requirements with plant and client engineering teams, then specified, built and commissioned the automation on site.',
      result:
        "Delivered across 4 pharmaceutical companies — Hetero, MSN, Aurobindo and Dr. Reddy's — often several plant units in parallel.",
    },
    metrics: [{ v: '4', k: 'Pharma companies' }],
    built: [
      'Implemented Beijer X2 Pro HMI systems in place of legacy Mitsubishi and Allen-Bradley HMIs and PLCs',
      'Implemented 21 CFR Part 11 features — user management, audit trails and electronic reports',
      "Re-worked machine process-flow logic to suit what each plant needed, keeping each machine's core process structure intact",
    ],
    more: [
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
    summary: {
      problem:
        'The injectables division at Eugia Unit 3 needed mixing-vessel automation with nothing existing to migrate from.',
      role: 'Engineered it from scratch — PLC logic, the operator HMI, reporting and audit trails.',
      result:
        'A running mixing-vessel system with production and batch reporting and full audit traceability.',
    },
    built: [
      'Built the mixing-vessel automation logic from scratch on a Mitsubishi PLC',
      'Beijer X2 Pro HMI for operator control and monitoring',
      'Production and batch reporting',
      'Audit trails for full traceability',
    ],
  },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);

export const getProjectIndex = (slug) => PROJECTS.findIndex((p) => p.slug === slug);

// Projects whose copy (tags, bullets, metrics…) names a skill as a whole word.
// Driven by the text, so a "Used in" link is only shown where the project
// actually says so. `terms` overrides the label for aliased skills.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const projectText = new Map(PROJECTS.map((p) => [p.slug, JSON.stringify(p)]));

export const getProjectsForSkill = (skill, terms = [skill]) => {
  const res = terms.map((t) => new RegExp(`(^|[^A-Za-z])${escapeRe(t)}([^A-Za-z]|$)`));
  return PROJECTS.filter((p) => res.some((re) => re.test(projectText.get(p.slug))));
};

// Neighbours of a project in list order. No wrap-around: the first has no
// previous, the last has no next.
export const getAdjacentProjects = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return { prev: PROJECTS[i - 1] ?? null, next: PROJECTS[i + 1] ?? null };
};
