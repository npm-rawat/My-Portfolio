/* =========================================================
   Anupam Rawat · Full-Stack Portfolio — main.js
   No framework, no build. All content lives in the data
   objects below, so updating the site means editing them.
   ========================================================= */

/* ---------- CONFIG ----------
   Contact form delivery. GitHub Pages is static, so the form needs a form backend.
   1. Create a free form at https://formspree.io (sign in, "New form", use your email).
   2. Paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
   If left empty, the form opens the visitor's email app with the message prefilled. */
const FORM_ENDPOINT = "https://formspree.io/f/xppdnkpa";
const CONTACT_EMAIL = "npmrawat.048@gmail.com";

/* ---------- DATA ---------- */
const ROLES = [
  "ship to production",
  "stream AI live",
  "run on Lambda",
  "outlive legacy",
  "fit any device",
];

const DEVICON = "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/";
/* Each skill shows either a real logo (i: devicon path) or a line icon from the
   sprite in index.html (ic: icon id, c: its color). mono: true turns a dark logo white. */
const SKILLS = {
  frontend: [
    { n: "Angular", d: "Primary framework", i: "angular/angular-original.svg" },
    { n: "TypeScript", d: "Daily driver", i: "typescript/typescript-original.svg" },
    { n: "RxJS", d: "Streams & async", i: "rxjs/rxjs-original.svg" },
    { n: "NgRx", d: "App state", i: "ngrx/ngrx-original.svg" },
    { n: "React", d: "Built an app from scratch", i: "react/react-original.svg" },
    { n: "Angular Material", d: "Tables, pagination", i: "angularmaterial/angularmaterial-original.svg" },
    { n: "AngularJS", d: "Legacy & migration", i: "angularjs/angularjs-original.svg" },
    { n: "JavaScript", d: "ES2015+", i: "javascript/javascript-original.svg" },
    { n: "HTML", d: "Semantic, accessible", i: "html5/html5-original.svg" },
    { n: "CSS", d: "Responsive layouts", i: "css3/css3-original.svg" },
    { n: "Sass", d: "Styles at scale", i: "sass/sass-original.svg" },
    { n: "Bootstrap", d: "UI framework", i: "bootstrap/bootstrap-original.svg" },
    { n: "Infragistics", d: "Enterprise grids", ic: "grid", c: "#22d3ee" },
  ],
  backend: [
    { n: "Node.js", d: "Services & Lambda handlers", i: "nodejs/nodejs-original.svg" },
    { n: "REST APIs", d: "Design & integration", ic: "braces", c: "#34d399" },
    { n: "AWS Lambda", d: "Serverless functions", ic: "lambda", c: "#ff9900" },
    { n: "PostgreSQL", d: "Relational data", i: "postgresql/postgresql-original.svg" },
    { n: "DynamoDB", d: "Key-value data", i: "dynamodb/dynamodb-original.svg" },
    { n: "Aurora MySQL", d: "Project data store", i: "mysql/mysql-original.svg" },
    { n: "SQL modeling", d: "ER diagrams", ic: "database", c: "#fbbf24" },
    { n: "Role-based access", d: "Admin & customer portals", ic: "shield", c: "#f472b6" },
  ],
  cloud: [
    { n: "AWS", d: "Lambda, SES, EventBridge", i: "amazonwebservices/amazonwebservices-original-wordmark.svg", mono: true },
    { n: "AWS SES", d: "Transactional email", ic: "mail", c: "#ff9900" },
    { n: "EventBridge", d: "Event scheduling", ic: "nodes", c: "#e7157b" },
    { n: "CloudFormation", d: "Infrastructure as code", ic: "layers", c: "#ff4f8b" },
    { n: "CI/CD", d: "Build & deploy workflows", i: "githubactions/githubactions-original.svg" },
    { n: "Git", d: "Version control", i: "git/git-original.svg" },
    { n: "Releases", d: "Docs, deploys, go-live", ic: "rocket", c: "#a78bfa" },
  ],
  realtime: [
    { n: "WebSockets", d: "Streamed responses", ic: "zap", c: "#22d3ee" },
    { n: "AI assistant UIs", d: "Helpdesk & diagnostics", ic: "bot", c: "#a78bfa" },
    { n: "Streamed Markdown", d: "Rendered as it arrives", i: "markdown/markdown-original.svg", mono: true },
    { n: "Chart.js", d: "Diagnostic charts", ic: "chart", c: "#ff6384" },
    { n: "Retries & timeouts", d: "Resilient streams", ic: "refresh", c: "#34d399" },
    { n: "Claude-assisted dev", d: "Code adaptation", ic: "sparkles", c: "#fb923c" },
  ],
};

const PROJECTS = [
  {
    title: "Broadband Network Maintenance Platform",
    summary: "Two AI assistant frontends for helpdesk support and modem diagnostics, with responses streamed live over WebSockets and diagnostics rendered right inside the conversation.",
    org: "Ksolves", period: "Mar 2026 – Present", domain: "Telecom diagnostics",
    stack: ["Angular", "TypeScript", "RxJS", "WebSockets", "Chart.js", "Angular Material"],
    tags: ["realtime", "frontend"], badge: "Live project", live: true, cover: "stream", wide: true,
    problem: "Helpdesk and modem-diagnostics users needed to follow assistant answers as they were generated and read structured network data without leaving the chat.",
    built: "Moved assistant messaging from HTTP requests to RxJS + WebSocket streams with progress updates, inactivity timeouts, retry controls and subscription cleanup. Built streamed Markdown, follow-ups, feedback flows, and reusable charts, tables and summary cards for network-correlation previews. Added configurable cron scheduling for network polling with pause windows.",
  },
  {
    title: "Applicant Tracking System",
    summary: "Recruitment platform work across the stack: Angular Material interfaces on top, Node.js and AWS Lambda functions underneath, PostgreSQL and DynamoDB for data.",
    org: "Ksolves", period: "Aug 2022 – Jan 2024", domain: "Recruitment software",
    stack: ["Angular", "Angular Material", "NgRx", "RxJS", "Node.js", "AWS Lambda", "PostgreSQL", "DynamoDB"],
    tags: ["fullstack"], badge: "Full-stack", cover: "ats", wide: true,
    problem: "Recruiters needed workflow screens backed by data services that read and wrote across two different databases.",
    built: "Built Angular Material interfaces with reactive state in RxJS and NgRx. Implemented Node.js and AWS Lambda functionality for data workflows across PostgreSQL and DynamoDB, integrated external services, and worked with clients and QA on requirements, validation and deployment.",
  },
  {
    title: "ATS Modernization",
    summary: "A core recruitment business module migrated from AngularJS to Angular while every existing workflow kept working.",
    org: "Ksolves", period: "Jul 2026 – Nov 2026", domain: "Legacy modernization",
    stack: ["AngularJS", "Angular", "TypeScript", "Claude-assisted dev"],
    tags: ["frontend"], badge: "Migration", cover: "migration",
    problem: "A business-critical module had to leave AngularJS without interrupting recruiters who used it daily.",
    built: "Contributed to migrating the core module to Angular, using the existing recruitment workflows as the spec for what had to carry over, and used Claude to assist with adapting the legacy code.",
  },
  {
    title: "Inventory Management Application",
    summary: "Mobile-friendly Angular screens for physical inventory, cycle counts and ad-hoc counts, built for the devices operators already carry.",
    org: "Ksolves", period: "May 2024 – Feb 2026", domain: "Retail inventory",
    stack: ["Angular", "NgRx", "RxJS", "Infragistics", "Bootstrap"],
    tags: ["frontend"], badge: "Shipped", cover: "inventory",
    problem: "Store operators needed fast, reliable count screens for several count types on existing handheld devices.",
    built: "Built the mobile-friendly count screens and worked with product and QA on validation and issue resolution. Contributed to code reviews, release documentation, deployments and go-live support.",
  },
  {
    title: "Compliance Management System",
    summary: "A React application built from scratch for requesting, reviewing and tracking documents across admin and customer portals, with the initial SQL data model.",
    org: "Ksolves", period: "Feb 2024 – Apr 2024", domain: "Document compliance",
    stack: ["React", "Bootstrap", "SQL", "ER modeling", "Node.js*", "Aurora MySQL*"],
    tags: ["fullstack", "frontend"], badge: "Built from scratch", cover: "compliance",
    problem: "Admins and customers needed one place to request, review and track compliance documents with the right access for each role.",
    built: "Built the React app from scratch, designed the initial SQL entity-relationship diagrams, contributed to role-based access workflows, and worked with stakeholders on Salesforce integration requirements. (*Part of the project stack.)",
  },
  {
    title: "Stock Count Workbench",
    summary: "A personal Angular app for counting warehouse stock, explaining variances and approving a count, with activity history that survives a reload.",
    org: "Personal project", period: "2026", domain: "Inventory operations",
    stack: ["Angular", "TypeScript", "Signals", "Reactive Forms"],
    tags: ["frontend"], badge: "Personal project", cover: "image", img: "assets/img/workbench-preview.webp",
    problem: "A stock count needs a clear record of what was counted, why it differs from the expected quantity, and who moved it to review.",
    built: "Typed reactive forms handle entry while a signal-based store enforces quantity bounds, variance reasons and legal status transitions. Includes search, review/approval, CSV export and local persistence.",
  },
];

const TIMELINE = [
  { period: "Mar 2026 – Present", title: "Broadband Network Maintenance Platform", stack: "Angular · RxJS · WebSockets · Chart.js", now: true,
    points: ["Integrated two AI assistant frontends: helpdesk support and modem diagnostics", "Moved messaging from HTTP to WebSocket streams with timeouts, retries and cleanup", "Built cron scheduling for network polling with pause windows"] },
  { period: "Jul 2026 – Nov 2026", title: "ATS Modernization", stack: "AngularJS → Angular",
    points: ["Migrated a core recruitment module while preserving existing workflows (in parallel with BNMP)"] },
  { period: "May 2024 – Feb 2026", title: "Inventory Management Application", stack: "Angular · NgRx · Infragistics",
    points: ["Mobile-friendly screens for physical, cycle and ad-hoc counts", "Code reviews, release docs, deployments and go-live support"] },
  { period: "Feb 2024 – Apr 2024", title: "Compliance Management System", stack: "React · SQL",
    points: ["Built the React app from scratch and designed the initial ER diagrams"] },
  { period: "Aug 2022 – Jan 2024", title: "Applicant Tracking System", stack: "Angular · Node.js · AWS Lambda · PostgreSQL · DynamoDB",
    points: ["Angular Material UIs with RxJS/NgRx state", "Node.js + Lambda data workflows across PostgreSQL and DynamoDB"] },
  { period: "May 2022", title: "Joined Ksolves India Limited", stack: "Senior Software Engineer",
    points: ["Started on Angular and grew into full-stack project work"] },
];

/* ---------- COVER ART (inline SVG, no image files needed) ---------- */
const COVERS = {
  stream: () => `
  <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="cs1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1442"/><stop offset="1" stop-color="#062431"/></linearGradient>
      <linearGradient id="cs2" x1="0" x2="1"><stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#cs1)"/>
    <g opacity=".25" stroke="#fff" stroke-width=".6">${Array.from({ length: 14 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="450"/>`).join("")}</g>
    <rect x="60" y="60" width="330" height="56" rx="16" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.15)"/>
    <rect x="80" y="80" width="200" height="8" rx="4" fill="#c4b5fd"/><rect x="80" y="96" width="140" height="6" rx="3" fill="rgba(255,255,255,.35)"/>
    <rect x="200" y="140" width="330" height="120" rx="16" fill="rgba(124,92,255,.18)" stroke="rgba(124,92,255,.5)"/>
    <rect x="222" y="162" width="250" height="8" rx="4" fill="#fff" opacity=".8"/>
    <rect x="222" y="180" width="280" height="8" rx="4" fill="#fff" opacity=".55"/>
    <rect x="222" y="198" width="190" height="8" rx="4" fill="#fff" opacity=".4"/>
    <path d="M222 238 q20 -24 40 0 t40 0 t40 0 t40 0" fill="none" stroke="url(#cs2)" stroke-width="3" class="wave"/>
    <circle cx="505" cy="200" r="4" fill="#22d3ee"><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></circle>
    <rect x="560" y="120" width="190" height="200" rx="16" fill="rgba(7,8,13,.6)" stroke="rgba(255,255,255,.14)"/>
    ${[60, 110, 80, 140, 100, 160, 120].map((h, i) => `<rect x="${582 + i * 22}" y="${296 - h}" width="12" height="${h}" rx="3" fill="url(#cs2)" opacity="${0.55 + i * 0.06}"/>`).join("")}
    <text x="580" y="146" font-family="JetBrains Mono, monospace" font-size="12" fill="#9aa1b5">signal / channel</text>
    <g font-family="JetBrains Mono, monospace" font-size="13" fill="#67e8f9"><text x="60" y="330">stream$ = webSocket(url)</text><text x="60" y="354" fill="#9aa1b5">retry · timeout · takeUntil</text></g>
    <g transform="translate(60 380)"><rect width="118" height="34" rx="17" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)"/><text x="16" y="22" font-family="Inter, sans-serif" font-size="12" fill="#eef0f6">Follow-up</text><svg x="84" y="10" width="14" height="14" fill="none" stroke="#eef0f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="#i-arrow-up-right"/></svg></g>
    <g transform="translate(190 380)" fill="none" stroke="#eef0f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="84" height="34" rx="17" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)" stroke-width="1"/><svg x="18" y="9" width="16" height="16"><use href="#i-thumbs-up"/></svg><svg x="50" y="9" width="16" height="16"><use href="#i-thumbs-down"/></svg></g>
  </svg>`,

  ats: () => `
  <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="ca1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d1b2e"/><stop offset="1" stop-color="#22123a"/></linearGradient></defs>
    <rect width="800" height="450" fill="url(#ca1)"/>
    ${["Applied", "Screen", "Interview", "Offer"].map((c, i) => `
      <g transform="translate(${50 + i * 120} 50)">
        <text x="0" y="0" font-family="JetBrains Mono, monospace" font-size="12" fill="#9aa1b5">${c}</text>
        ${Array.from({ length: 4 - i }, (_, j) => `<rect x="0" y="${14 + j * 46}" width="104" height="38" rx="8" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.12)"/><circle cx="16" cy="${33 + j * 46}" r="7" fill="${["#f472b6", "#a78bfa", "#22d3ee", "#34d399"][i]}" opacity=".85"/><rect x="30" y="${28 + j * 46}" width="${50 - j * 6}" height="6" rx="3" fill="rgba(255,255,255,.4)"/>`).join("")}
      </g>`).join("")}
    <g font-family="JetBrains Mono, monospace" font-size="13">
      <rect x="560" y="60" width="190" height="54" rx="12" fill="rgba(221,0,49,.15)" stroke="#dd0031"/><text x="655" y="92" text-anchor="middle" fill="#fda4af">Angular UI</text>
      <rect x="560" y="170" width="190" height="54" rx="12" fill="rgba(255,153,0,.13)" stroke="#ff9900"/><text x="655" y="202" text-anchor="middle" fill="#fcd34d">λ Node.js Lambda</text>
      <rect x="540" y="290" width="104" height="54" rx="12" fill="rgba(51,103,145,.25)" stroke="#5b8fc7"/><text x="592" y="322" text-anchor="middle" fill="#bfdbfe">Postgres</text>
      <rect x="664" y="290" width="104" height="54" rx="12" fill="rgba(77,39,170,.25)" stroke="#8b5cf6"/><text x="716" y="322" text-anchor="middle" fill="#ddd6fe">DynamoDB</text>
    </g>
    <g stroke="#22d3ee" stroke-width="2" fill="none" stroke-dasharray="5 6" class="flow">
      <path d="M655 114 V170"/><path d="M630 224 L592 290"/><path d="M680 224 L716 290"/>
    </g>
    <text x="50" y="390" font-family="Space Grotesk, sans-serif" font-size="30" font-weight="700" fill="rgba(255,255,255,.9)">UI → API → Data</text>
    <text x="50" y="416" font-family="JetBrains Mono, monospace" font-size="13" fill="#9aa1b5">end-to-end recruitment workflows</text>
  </svg>`,

  migration: () => `
  <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="cm1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a0f1c"/><stop offset="1" stop-color="#120d2e"/></linearGradient>
    <linearGradient id="cm2" x1="0" x2="1"><stop offset="0" stop-color="#f43f5e"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs>
    <rect width="800" height="450" fill="url(#cm1)"/>
    <g transform="translate(110 115)">
      <path d="M90 0 L180 32 L166 150 L90 200 L14 150 L0 32 Z" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)" stroke-dasharray="6 6"/>
      <text x="90" y="112" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="22" fill="#9aa1b5">AngularJS</text>
    </g>
    <g transform="translate(510 115)">
      <path d="M90 0 L180 32 L166 150 L90 200 L14 150 L0 32 Z" fill="rgba(221,0,49,.22)" stroke="#f43f5e" stroke-width="2"/>
      <path d="M90 40 L130 140 H114 L106 118 H74 L66 140 H50 Z M80 104 H100 L90 76 Z" fill="#fff"/>
    </g>
    <path d="M310 215 H490" stroke="url(#cm2)" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 10" class="flow"/>
    <path d="M478 203 L494 215 L478 227" fill="none" stroke="#a78bfa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <g font-family="JetBrains Mono, monospace" font-size="12" fill="#c4b5fd">
      <text x="400" y="190" text-anchor="middle">workflows preserved</text>
    </g>
    <text x="400" y="375" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" fill="#9aa1b5">legacy module → modern Angular</text>
  </svg>`,

  inventory: () => `
  <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="ci1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06241f"/><stop offset="1" stop-color="#0c1630"/></linearGradient></defs>
    <rect width="800" height="450" fill="url(#ci1)"/>
    ${[0, 1, 2].map(r => `<rect x="60" y="${90 + r * 110}" width="380" height="8" rx="4" fill="rgba(255,255,255,.18)"/>` +
      Array.from({ length: 6 }, (_, c) => `<rect x="${72 + c * 60}" y="${90 + r * 110 - 30 - ((r + c) % 3) * 10}" width="46" height="${30 + ((r + c) % 3) * 10}" rx="5" fill="${["#34d399", "#22d3ee", "#a78bfa", "#fbbf24"][(r + c) % 4]}" opacity=".55"/>`).join("")).join("")}
    <g transform="translate(520 60)">
      <rect width="200" height="340" rx="28" fill="#0b0d16" stroke="rgba(255,255,255,.25)" stroke-width="2"/>
      <rect x="14" y="40" width="172" height="40" rx="10" fill="rgba(52,211,153,.15)" stroke="#34d399"/>
      <text x="100" y="66" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" fill="#6ee7b7">Cycle count</text>
      ${[0, 1, 2, 3].map(i => `<rect x="14" y="${96 + i * 44}" width="172" height="34" rx="8" fill="rgba(255,255,255,.06)"/><rect x="26" y="${109 + i * 44}" width="${70 + i * 10}" height="7" rx="3.5" fill="rgba(255,255,255,.45)"/><text x="172" y="${118 + i * 44}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="12" fill="${i === 2 ? "#fbbf24" : "#a7f3d0"}">${[24, 18, 31, 9][i]}</text>`).join("")}
      <rect x="40" y="290" width="120" height="30" rx="15" fill="#34d399"/><text x="100" y="310" text-anchor="middle" font-family="Inter, sans-serif" font-weight="600" font-size="13" fill="#04241b">Submit</text>
    </g>
    <g transform="translate(60 380)">${Array.from({ length: 34 }, (_, i) => `<rect x="${i * 8}" y="0" width="${i % 3 ? 3 : 5}" height="36" fill="rgba(255,255,255,.55)"/>`).join("")}</g>
  </svg>`,

  compliance: () => `
  <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="cc1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a1f33"/><stop offset="1" stop-color="#1d1036"/></linearGradient></defs>
    <rect width="800" height="450" fill="url(#cc1)"/>
    ${[0, 1, 2].map(i => `
      <g transform="translate(${110 + i * 40} ${70 + i * 30}) rotate(${-8 + i * 6})">
        <rect width="200" height="260" rx="14" fill="${i === 2 ? "#141a2e" : "rgba(255,255,255,.06)"}" stroke="rgba(255,255,255,.2)"/>
        ${[0, 1, 2, 3, 4].map(l => `<rect x="22" y="${36 + l * 26}" width="${150 - (l % 2) * 40}" height="8" rx="4" fill="rgba(255,255,255,${i === 2 ? .45 : .2})"/>`).join("")}
      </g>`).join("")}
    <g transform="translate(300 300)"><circle r="34" fill="#34d399"/><path d="M-14 0 l9 10 l19 -20" fill="none" stroke="#04241b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g font-family="JetBrains Mono, monospace" font-size="13">
      <rect x="500" y="90" width="230" height="48" rx="12" fill="rgba(97,218,251,.12)" stroke="#61dafb"/><text x="615" y="119" text-anchor="middle" fill="#a5f3fc">Admin portal</text>
      <rect x="500" y="160" width="230" height="48" rx="12" fill="rgba(244,114,182,.12)" stroke="#f472b6"/><text x="615" y="189" text-anchor="middle" fill="#fbcfe8">Customer portal</text>
      <rect x="540" y="260" width="150" height="90" rx="12" fill="rgba(251,191,36,.1)" stroke="#fbbf24"/>
      <text x="615" y="290" text-anchor="middle" fill="#fde68a">SQL / ERD</text>
      <line x1="560" y1="305" x2="670" y2="305" stroke="rgba(251,191,36,.4)"/><text x="615" y="330" text-anchor="middle" fill="#9aa1b5" font-size="11">requests · docs · roles</text>
    </g>
    <path d="M615 208 V260" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5 6" class="flow"/>
  </svg>`,
};

/* ---------- HELPERS ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- NAV ---------- */
const nav = $("#nav");
const progressBar = $("#progressBar");
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 20);
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Sliding section title.
   The active link is moved to the front of the nav (CSS gives it margin-right: auto,
   so it sits on the left edge). A FLIP animation slides every link from where it was
   to where it is now: the new title travels left, the old one travels back right. */
const navEl = $("#navLinks");
const NAV_ORDER = $$("a", navEl).map(a => a.dataset.id);
const linkById = Object.fromEntries($$("a", navEl).map(a => [a.dataset.id, a]));
const desktopNav = matchMedia("(min-width: 821px)");
let activeId = "home";
let navLock = 0;

function setActive(id) {
  if (id === activeId || !linkById[id]) return;
  const links = $$("a", navEl);
  const before = new Map(links.map(a => [a, a.getBoundingClientRect().left]));

  NAV_ORDER.forEach(k => navEl.appendChild(linkById[k]));
  navEl.prepend(linkById[id]);
  links.forEach(a => {
    const on = a.dataset.id === id;
    a.classList.toggle("active", on);
    on ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current");
  });

  if (!reduceMotion && desktopNav.matches) {
    links.forEach(a => {
      a.getAnimations().forEach(an => an.cancel());
      const dx = before.get(a) - a.getBoundingClientRect().left;
      if (Math.abs(dx) > 1) {
        a.animate([{ transform: `translateX(${dx}px)` }, { transform: "translateX(0)" }],
          { duration: 520, easing: "cubic-bezier(.22,.75,.25,1)" });
      }
    });
  }
  activeId = id;
  dock.move(id);
}

/* Mobile bottom dock (replaces the top nav under 821px).
   - A gradient blob slides behind the active icon, stretching mid-way like liquid.
   - The "island" pill above names the section; its width animates between labels.
   - A thin line along the dock's top edge shows how far down the page you are.
   - The dock tucks away while scrolling down and returns on scroll up. */
const dock = (function () {
  const el = $("#dock"), blob = $("#dockBlob"), island = $("#dockIsland");
  const numEl = $("#dockNum"), labelEl = $("#dockLabel"), prog = $("#dockProgress");
  const btn = Object.fromEntries($$(".dock-bar a", el).map(a => [a.dataset.id, a]));
  const LABEL = { home: "Home", about: "About", services: "Services", skills: "Stack", work: "Work", experience: "Experience", contact: "Hire me" };
  let current = "home", lastY = scrollY;

  const xOf = id => btn[id].offsetLeft;
  function place(id) { blob.style.transform = `translateX(${xOf(id)}px)`; }

  function setLabel(id) {
    const w0 = island.offsetWidth;
    numEl.textContent = String(NAV_ORDER.indexOf(id) + 1).padStart(2, "0");
    labelEl.textContent = LABEL[id];
    if (reduceMotion || !w0) return;
    const w1 = island.offsetWidth;
    island.animate([{ width: `${w0}px` }, { width: `${w1}px` }], { duration: 420, easing: "cubic-bezier(.34,1.4,.64,1)" });
    labelEl.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 320, easing: "ease-out" });
  }

  function move(id) {
    if (id === current || !btn[id]) return;
    Object.entries(btn).forEach(([k, a]) => {
      a.classList.toggle("on", k === id);
      k === id ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current");
    });
    const from = xOf(current), to = xOf(id);
    current = id;
    setLabel(id);
    el.classList.remove("tucked");
    if (reduceMotion || desktopNav.matches) { place(id); return; }
    blob.getAnimations().forEach(a => a.cancel());
    blob.animate([
      { transform: `translateX(${from}px) scaleX(1)` },
      { transform: `translateX(${(from + to) / 2}px) scaleX(${1 + Math.min(Math.abs(to - from) / 60, 2.2)}) scaleY(.82)`, offset: .45 },
      { transform: `translateX(${to}px) scaleX(1)` },
    ], { duration: 560, easing: "cubic-bezier(.3,.7,.2,1)" });
    place(id);
  }

  addEventListener("scroll", () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (Date.now() < navLock) { lastY = y; return; }      // scrolling because a dock icon was tapped: stay visible
    if (Math.abs(y - lastY) > 6) {
      el.classList.toggle("tucked", y > lastY && y > 300 && y < max - 80);
      lastY = y;
    }
  }, { passive: true });

  $$(".dock-bar a", el).forEach(a => a.addEventListener("click", () => {
    setActive(a.dataset.id);
    navLock = Date.now() + 1200;
  }));
  addEventListener("resize", () => place(current));
  btn.home.classList.add("on");
  place("home");
  return { move };
})();

// Clicking a link updates the title immediately and ignores scroll updates until the scroll settles.
$$("a", navEl).forEach(a => a.addEventListener("click", () => {
  setActive(a.dataset.id);
  navLock = Date.now() + 1200;
}));
addEventListener("scrollend", () => { navLock = 0; });

const sections = $$("main section[id]");
const activeObs = new IntersectionObserver(entries => {
  if (Date.now() < navLock) return;
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => activeObs.observe(s));

/* ---------- TYPED ROLE ---------- */
(function typed() {
  const el = $("#typed");
  if (reduceMotion) { el.textContent = ROLES[0]; return; }
  let r = 0, i = ROLES[0].length, deleting = true;
  const tick = () => {
    const word = ROLES[r];
    if (deleting) {
      i--;
      if (i <= 0) { deleting = false; r = (r + 1) % ROLES.length; }
    } else {
      i++;
      if (i >= ROLES[r].length) { deleting = true; el.textContent = ROLES[r]; return setTimeout(tick, 1900); }
    }
    el.textContent = ROLES[r].slice(0, Math.max(i, 0)) || " ";
    setTimeout(tick, deleting ? 38 : 70);
  };
  setTimeout(tick, 2200);
})();

/* ---------- SKILLS: cover-flow slider ----------
   `pos` is a fractional index that eases toward `target` every frame. Each item's
   position, tilt, blur and opacity come from its distance to `pos`, so the centre
   logo fades out gradually as it slides away rather than snapping. */
(function coverflow() {
  const TECH = Object.entries(SKILLS).flatMap(([g, list]) => list.map(s => ({ ...s, g })));
  const N = TECH.length;
  const root = $("#coverflow"), stage = $("#cfStage");
  const nameEl = $("#cfName"), descEl = $("#cfDesc"), countEl = $("#cfCount");
  const tabs = $$(".tab");

  const logo = s => s.i
    ? `<img src="${DEVICON}${s.i}" alt="" draggable="false"${s.mono ? ' class="mono"' : ""}>`
    : `<svg class="icon" style="color:${s.c}" aria-hidden="true"><use href="#i-${s.ic}"/></svg>`;
  stage.innerHTML = TECH.map((s, i) => `
    <button class="cf-item" data-i="${i}" tabindex="-1" aria-label="${esc(s.n)}">
      <span class="cf-face">${logo(s)}</span>
      <span class="cf-reflect" aria-hidden="true">${logo(s)}</span>
    </button>`).join("");
  const items = $$(".cf-item", stage);

  let pos = 0, target = 0, raf = 0, shown = -1;
  const wrap = d => ((d % N) + N + N / 2) % N - N / 2;          // shortest signed distance on a loop
  const spacing = () => Math.min(230, root.clientWidth * (root.clientWidth < 600 ? 0.29 : 0.2));

  function layout() {
    const s1 = spacing(), s2 = s1 * 0.52;
    items.forEach((el, i) => {
      const d = wrap(i - pos), a = Math.abs(d), sign = Math.sign(d);
      if (a > 4.6) { el.style.visibility = "hidden"; el.style.opacity = 0; return; }
      const x = sign * (a < 1 ? a * s1 : s1 + (a - 1) * s2);
      const near = Math.min(a, 1);
      el.style.visibility = "visible";
      el.style.transform = `translate(-50%, 0) translateX(${x}px) translateZ(${-near * 170 - Math.max(a - 1, 0) * 70}px) rotateY(${-sign * near * 14}deg) scale(${(1.14 - near * 0.18).toFixed(3)})`;
      el.style.opacity = Math.max(0, 1 - near * 0.42 - Math.max(a - 1, 0) * 0.17).toFixed(3);
      el.style.filter = `blur(${(near * 0.8 + Math.max(a - 1, 0) * 1.3).toFixed(2)}px)`;
      el.style.zIndex = String(100 - Math.round(a * 10));
      el.classList.toggle("is-center", a < 0.5);
    });
    const idx = ((Math.round(pos) % N) + N) % N;
    if (idx !== shown) {
      shown = idx;
      const t = TECH[idx];
      nameEl.textContent = t.n;
      descEl.textContent = t.d;
      countEl.textContent = `${String(idx + 1).padStart(2, "0")} / ${N}`;
      tabs.forEach(tb => {
        const on = tb.dataset.tab === t.g;
        tb.classList.toggle("active", on);
        tb.setAttribute("aria-selected", String(on));
      });
    }
  }

  function tick() {
    const diff = target - pos;
    pos = Math.abs(diff) < 0.001 ? target : pos + diff * (reduceMotion ? 1 : 0.075);
    layout();
    raf = pos === target ? 0 : requestAnimationFrame(tick);
  }
  const go = t => { target = t; if (!raf) raf = requestAnimationFrame(tick); };
  const goTo = i => go(target + wrap(i - target));                 // go to index by the shortest way
  const step = n => go(Math.round(target) + n);

  // Autoplay while visible, paused on hover/focus/drag
  let timer = 0, hovering = false, inView = false;
  const play = () => {
    clearInterval(timer);
    if (!reduceMotion && inView && !hovering) timer = setInterval(() => step(1), 2600);
  };
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; play(); }, { threshold: 0.3 }).observe(root);
  root.addEventListener("pointerenter", () => { hovering = true; play(); });
  root.addEventListener("pointerleave", () => { hovering = false; play(); });
  root.addEventListener("focusin", () => { hovering = true; play(); });
  root.addEventListener("focusout", () => { hovering = false; play(); });

  $("#cfPrev").addEventListener("click", () => step(-1));
  $("#cfNext").addEventListener("click", () => step(1));
  root.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { step(1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { step(-1); e.preventDefault(); }
  });
  tabs.forEach(tb => tb.addEventListener("click", () => goTo(TECH.findIndex(t => t.g === tb.dataset.tab))));

  // Drag / swipe
  let dragX = null, startTarget = 0, moved = false;
  stage.addEventListener("pointerdown", e => {
    dragX = e.clientX; startTarget = target; moved = false;
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", e => {
    if (dragX === null) return;
    const dx = e.clientX - dragX;
    if (Math.abs(dx) > 4) moved = true;
    if (moved) go(startTarget - dx / spacing());
  });
  const endDrag = () => { if (dragX === null) return; dragX = null; if (moved) go(Math.round(target)); };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  // A click (not a drag) on a side logo brings it to the centre
  stage.addEventListener("click", e => {
    const item = e.target.closest(".cf-item");
    if (item && !moved) goTo(+item.dataset.i);
  });

  addEventListener("resize", layout);
  layout();
})();

/* ---------- PROJECTS ---------- */
const projectsEl = $("#projects");
projectsEl.innerHTML = PROJECTS.map(p => `
  <article class="project${p.wide ? " wide" : ""}" data-tags="${p.tags.join(" ")}">
    <div class="p-cover">
      <span class="p-badge">${p.live ? '<i class="live-dot"></i>' : ""}${esc(p.badge)}</span>
      ${p.cover === "image" ? `<img src="${p.img}" alt="Screenshot of ${esc(p.title)}" loading="lazy">` : COVERS[p.cover]()}
    </div>
    <div class="p-body">
      <div class="p-meta"><span>${esc(p.org)}</span><span>${esc(p.period)}</span><span>${esc(p.domain)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      <div class="p-stack">${p.stack.map(s => `<span>${esc(s)}</span>`).join("")}</div>
      <details class="p-more">
        <summary>Case study</summary>
        <div class="p-detail">
          <div><b>The problem</b><p>${esc(p.problem)}</p></div>
          <div><b>What I built</b><p>${esc(p.built)}</p></div>
        </div>
      </details>
    </div>
  </article>`).join("");

$$(".filter").forEach(btn => btn.addEventListener("click", () => {
  $$(".filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  $$(".project").forEach(card => {
    const show = f === "all" || card.dataset.tags.split(" ").includes(f);
    card.classList.toggle("hide", !show);
    // wide cards look odd when filtered alone, so collapse them while filtering
    if (card.classList.contains("wide") || card.dataset.wasWide) {
      card.dataset.wasWide = "1";
      card.classList.toggle("wide", f === "all");
    }
    if (show) { card.style.animation = "none"; card.offsetHeight; card.style.animation = ""; }
  });
}));

/* ---------- TIMELINE ---------- */
$("#timeline").innerHTML = TIMELINE.map(t => `
  <li class="tl reveal${t.now ? " now" : ""}">
    <span class="tl-period">${esc(t.period)}</span>
    <h3>${esc(t.title)}</h3>
    <div class="tl-stack">${esc(t.stack)}</div>
    <ul>${t.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
  </li>`).join("");

/* ---------- REVEAL + COUNTERS ---------- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min((i % 6) * 70, 350)}ms`;
  revealObs.observe(el);
});

const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || "";
    countObs.unobserve(el);
    if (reduceMotion) { el.textContent = end + suffix; return; }
    const t0 = performance.now(), dur = 1400;
    const step = now => {
      const k = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}, { threshold: 0.6 });
$$("[data-count]").forEach(el => countObs.observe(el));

/* ---------- POINTER EFFECTS ---------- */
const glow = $("#cursorGlow");
if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  addEventListener("pointermove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });
  $$(".svc").forEach(card => card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  }));
} else {
  glow.style.display = "none";
}

/* ---------- CONTACT FORM ---------- */
const form = $("#contactForm");
const note = $("#formNote");
const success = $("#success");
const sendBtn = $(".btn-send", form);

function validate() {
  let ok = true;
  const checks = [
    ["f-name", v => v.trim().length > 1],
    ["f-email", v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())],
    ...($("#f-role").value === "Other" ? [["f-other", v => v.trim().length > 1]] : []),
    ["f-msg", v => v.trim().length >= 10],
  ];
  for (const [id, test] of checks) {
    const input = $("#" + id);
    const valid = test(input.value);
    input.closest(".field").classList.toggle("invalid", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    if (!valid && ok) { input.focus(); ok = false; }
  }
  return ok;
}
$$("input, textarea", form).forEach(el => el.addEventListener("input", () => el.closest(".field")?.classList.remove("invalid")));

function confetti() {
  if (reduceMotion) return;
  const colors = ["#7c5cff", "#22d3ee", "#f472b6", "#34d399", "#fbbf24"];
  const r = sendBtn.getBoundingClientRect();
  for (let i = 0; i < 70; i++) {
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.background = colors[i % colors.length];
    document.body.appendChild(c);
    const x0 = r.left + r.width / 2, y0 = r.top;
    const ang = (Math.random() * Math.PI) + Math.PI, v = 220 + Math.random() * 320;
    c.animate([
      { transform: `translate(${x0}px, ${y0}px) rotate(0)`, opacity: 1 },
      { transform: `translate(${x0 + Math.cos(ang) * v}px, ${y0 + Math.sin(ang) * v + 380}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
    ], { duration: 1400 + Math.random() * 900, easing: "cubic-bezier(.2,.6,.4,1)" }).onfinish = () => c.remove();
  }
}

function showSuccess(text) {
  $("#successText").textContent = text;
  success.hidden = false;
  confetti();
  $("#againBtn").focus();
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  note.textContent = ""; note.classList.remove("error");
  if (!validate()) return;
  if (form._gotcha.value) return; // bot

  const data = Object.fromEntries(new FormData(form));
  delete data._gotcha;
  if (data.role === "Other") data.role = data.roleOther.trim();   // send what they typed as the role
  delete data.roleOther;
  sendBtn.classList.add("sending");
  $(".send-label", sendBtn).textContent = "Sending…";

  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `Portfolio: ${data.intent} from ${data.name}` }),
      });
      if (!res.ok) throw new Error("Request failed");
      showSuccess(`Thanks, ${data.name.split(" ")[0]}! Your message reached my inbox. I'll reply at ${data.email}.`);
    } else {
      const subject = encodeURIComponent(`${data.intent}: ${data.role}${data.company ? " at " + data.company : ""}`);
      const body = encodeURIComponent(`Hi Anupam,\n\n${data.message}\n\n— ${data.name}${data.company ? ", " + data.company : ""}\n${data.email}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      showSuccess("Your email app should open with the message ready. Just hit send there.");
    }
    form.reset();
    roleDD.reset();
  } catch {
    note.classList.add("error");
    note.innerHTML = `Couldn't send right now. Please email me at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`;
  } finally {
    setTimeout(() => {
      sendBtn.classList.remove("sending");
      $(".send-label", sendBtn).textContent = "Send message";
    }, 900);
  }
});
$("#againBtn").addEventListener("click", () => { success.hidden = true; $("#f-name").focus(); });

/* ---------- THEMED DROPDOWN (role / project type) ---------- */
const roleDD = (function () {
  const wrap = $("#roleDropdown"), btn = $("#roleBtn"), list = $("#roleList");
  const input = $("#f-role"), valueEl = $("#roleValue"), icoEl = $("#roleIco");
  const opts = $$("[role=option]", list);
  let active = 0;

  const highlight = i => {
    active = (i + opts.length) % opts.length;
    opts.forEach((o, k) => o.classList.toggle("is-active", k === active));
    list.setAttribute("aria-activedescendant", opts[active].id);
  };
  const open = () => {
    wrap.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    highlight(opts.findIndex(o => o.getAttribute("aria-selected") === "true"));
    list.focus({ preventScroll: true });
  };
  const close = (focusBtn = true) => {
    wrap.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    if (focusBtn) btn.focus({ preventScroll: true });
  };
  const otherBox = $("#otherBox"), otherInput = $("#f-other");
  const choose = (i, fromUser = true) => {
    opts.forEach((o, k) => o.setAttribute("aria-selected", String(k === i)));
    input.value = opts[i].dataset.value;
    valueEl.textContent = opts[i].dataset.value;
    // "Other" opens a text box under the row and moves focus into it
    const isOther = input.value === "Other";
    otherBox.classList.toggle("open", isOther);
    otherInput.tabIndex = isOther ? 0 : -1;
    if (!isOther) { otherInput.value = ""; otherInput.closest(".field").classList.remove("invalid"); }
    if (isOther && fromUser) setTimeout(() => otherInput.focus({ preventScroll: true }), 60);
    icoEl.innerHTML = $(".dd-ico", opts[i]).innerHTML;
  };

  btn.addEventListener("click", () => wrap.classList.contains("open") ? close() : open());
  btn.addEventListener("keydown", e => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); open(); }
  });
  list.addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { e.preventDefault(); highlight(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); highlight(active - 1); }
    else if (e.key === "Home") { e.preventDefault(); highlight(0); }
    else if (e.key === "End") { e.preventDefault(); highlight(opts.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); close(); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Tab") { close(false); }
  });
  opts.forEach((o, i) => {
    o.addEventListener("pointermove", () => active !== i && highlight(i));
    o.addEventListener("click", () => { choose(i); close(); });
  });
  document.addEventListener("pointerdown", e => { if (!wrap.contains(e.target)) close(false); });
  return { reset: () => choose(0, false) };
})();

/* ---------- DOT MATRIX: hero wave field ---------- */
(function dotField() {
  const cv = $("#dotfield"), ctx = cv.getContext("2d");
  const hero = $(".hero");
  let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
  const mouse = { x: -9999, y: -9999, t: 0 };
  const GAP = 18;

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    cv.style.width = w + "px"; cv.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const s = t / 1000;
    for (let y = GAP / 2; y < h; y += GAP) {
      for (let x = GAP / 2; x < w; x += GAP) {
        // slow diagonal wave
        let a = 0.5 + 0.5 * Math.sin(x * 0.018 + y * 0.012 - s * 1.1);
        a = a * a * a * 0.55;
        // ripple rings from the last pointer position
        const d = Math.hypot(x - mouse.x, y - mouse.y);
        if (d < 320) a += Math.max(0, Math.sin(d * 0.06 - s * 7)) * (1 - d / 320) * 0.9;
        if (a < 0.04) continue;
        const k = x / w;                          // violet → cyan across the width
        const r = Math.round(124 + (34 - 124) * k), g = Math.round(92 + (211 - 92) * k), b = Math.round(255 + (238 - 255) * k);
        const sz = 1.2 + Math.min(a, 1) * 1.8;
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(a, 0.9).toFixed(3)})`;
        ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
      }
    }
    if (!reduceMotion && visible) raf = requestAnimationFrame(draw);
  }
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  }, { passive: true });
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf && !reduceMotion) raf = requestAnimationFrame(draw);
    if (!visible) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(hero);
  addEventListener("resize", () => { size(); if (reduceMotion) draw(0); });
  size();
  raf = requestAnimationFrame(draw);
})();

/* ---------- DOT MATRIX: LED ticker in the contact section ---------- */
(function ledTicker() {
  const cv = $("#led"), ctx = cv.getContext("2d");
  const TEXT = "LET'S BUILD SOMETHING • OPEN TO FULL-STACK ROLES • HIRE ME • ";
  const F = { // 5×7 font, one string per row
    A: "01110 10001 10001 11111 10001 10001 10001", B: "11110 10001 10001 11110 10001 10001 11110",
    C: "01110 10001 10000 10000 10000 10001 01110", D: "11110 10001 10001 10001 10001 10001 11110",
    E: "11111 10000 10000 11110 10000 10000 11111", F: "11111 10000 10000 11110 10000 10000 10000",
    G: "01110 10001 10000 10111 10001 10001 01111", H: "10001 10001 10001 11111 10001 10001 10001",
    I: "01110 00100 00100 00100 00100 00100 01110", K: "10001 10010 10100 11000 10100 10010 10001",
    L: "10000 10000 10000 10000 10000 10000 11111", M: "10001 11011 10101 10101 10001 10001 10001",
    N: "10001 10001 11001 10101 10011 10001 10001", O: "01110 10001 10001 10001 10001 10001 01110",
    P: "11110 10001 10001 11110 10000 10000 10000", R: "11110 10001 10001 11110 10100 10010 10001",
    S: "01111 10000 10000 01110 00001 00001 11110", T: "11111 00100 00100 00100 00100 00100 00100",
    U: "10001 10001 10001 10001 10001 10001 01110", "-": "00000 00000 00000 11111 00000 00000 00000",
    "'": "00100 00100 01000 00000 00000 00000 00000", "•": "00000 00000 01110 01110 01110 00000 00000",
    " ": "00000 00000 00000 00000 00000 00000 00000",
  };
  // Build the message as columns of 7 bits (1 blank column between letters)
  const cols = [];
  for (const ch of TEXT) {
    const rows = (F[ch] || F[" "]).split(" ");
    for (let c = 0; c < 5; c++) cols.push(rows.map(r => r[c] === "1"));
    cols.push(Array(7).fill(false));
  }
  let pitch = 7, w = 0, h = 0, dpr = 1, raf = 0, visible = false, offset = 0, last = 0;

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    pitch = innerWidth < 600 ? 5 : 7;
    w = cv.parentElement.clientWidth - 20; h = pitch * 7 + pitch * 2;   // minus the frame's side padding
    cv.width = w * dpr; cv.height = h * dpr;
    cv.style.width = w + "px"; cv.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw(t) {
    const dt = last ? Math.min(t - last, 50) : 16; last = t;
    if (!reduceMotion) offset += dt * 0.012;                 // columns per ms
    ctx.clearRect(0, 0, w, h);
    const n = Math.ceil(w / pitch), shift = Math.floor(offset), r = pitch * 0.32;
    for (let c = 0; c < n; c++) {
      const col = cols[(c + shift) % cols.length];
      const k = c / n;
      const lit = `rgb(${Math.round(167 + (34 - 167) * k)},${Math.round(139 + (211 - 139) * k)},${Math.round(250 + (238 - 250) * k)})`;
      for (let y = 0; y < 7; y++) {
        const x0 = c * pitch + pitch / 2, y0 = pitch + y * pitch + pitch / 2;
        ctx.beginPath();
        ctx.arc(x0, y0, r, 0, Math.PI * 2);
        if (col[y]) { ctx.fillStyle = lit; ctx.shadowColor = lit; ctx.shadowBlur = 6; }
        else { ctx.fillStyle = "rgba(255,255,255,.06)"; ctx.shadowBlur = 0; }
        ctx.fill();
      }
    }
    ctx.shadowBlur = 0;
    if (visible && !reduceMotion) raf = requestAnimationFrame(draw);
  }
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(draw); }
    if (!visible) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(cv);
  addEventListener("resize", () => { size(); draw(performance.now()); });
  size(); draw(0);
})();

/* ---------- DIRECTIONAL CIRCULAR FILL ---------- */
function fxPoint(el, e) {
  const r = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - r.left}px`);
  el.style.setProperty("--y", `${e.clientY - r.top}px`);
  el.style.setProperty("--d", `${Math.ceil(Math.hypot(r.width, r.height) * 2)}px`);
}
$$(".fx").forEach(el => {
  el.addEventListener("pointerenter", e => {
    if (e.pointerType === "touch") return;
    fxPoint(el, e);                // grow from the entry point
    el.classList.add("fx-in");
  });
  el.addEventListener("pointerleave", e => {
    fxPoint(el, e);                // shrink back toward the exit point
    el.classList.remove("fx-in");
  });
});

/* ---------- MISC ---------- */
$("#year").textContent = new Date().getFullYear();
