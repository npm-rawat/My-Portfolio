export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly role: string;
  readonly period: string;
  readonly domain: string;
  readonly stack: readonly string[];
  readonly kind: 'Personal project' | 'Professional work';
  readonly featured?: boolean;
  readonly visual?: { readonly kind: 'stream' | 'migration' } | {
    readonly kind: 'image';
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  readonly problem: string;
  readonly contribution: string;
  readonly decisions: readonly { readonly title: string; readonly description: string }[];
  readonly evidence: string;
  readonly demo?: { readonly route: string; readonly label: string };
  readonly source?: string;
}

interface Profile {
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly employer: string;
  readonly employmentStart: string;
  readonly linkedin: string;
  readonly github?: string;
  readonly resume?: string;
}

export const profile: Profile = {
  name: 'Anupam Rawat',
  title: 'Senior Software Engineer',
  location: 'Ahmedabad, India',
  employer: 'Ksolves India Limited',
  employmentStart: 'May 2022',
  linkedin: 'https://www.linkedin.com/in/npm-rawat/',
};

export const projects: readonly Project[] = [
  {
    slug: 'stock-count-workbench',
    title: 'Stock Count Workbench',
    summary: 'An interactive Angular app for counting warehouse stock, explaining discrepancies, and reviewing a count before approval.',
    role: 'Personal project · End-to-end implementation',
    period: '2026',
    domain: 'Inventory operations',
    stack: ['Angular', 'TypeScript', 'Signals', 'Reactive Forms'],
    kind: 'Personal project',
    featured: true,
    visual: {
      kind: 'image', src: 'workbench-preview.webp', width: 1040, height: 875,
      alt: 'Stock Count Workbench showing the stock table, count entry form and activity feed',
    },
    problem: 'A stock count needs a clear record of what was counted, why a number differs from the expected quantity, and who can advance the count to review.',
    contribution: 'I built a warehouse cycle-count demo that covers item search, quantity entry, variance explanations, review, approval, and CSV export.',
    decisions: [
      { title: 'Keep rules in the store', description: 'Typed reactive forms handle entry. The inventory store enforces quantity bounds, variance reasons, and legal status transitions.' },
      { title: 'Derive the view from one session', description: 'Signals derive filtered rows, remaining counts, and discrepancies from the current session. Local storage keeps work and its timestamped activity available after reload.' },
    ],
    evidence: 'Try the demo with synthetic inventory. Save a variance, submit the count for review, and reload to inspect the activity record.',
    demo: { route: '/workbench', label: 'Try the Angular demo' },
  },
  {
    slug: 'bnmp',
    title: 'Broadband Network Maintenance Platform',
    summary: 'Two AI assistant frontends for helpdesk and modem diagnostics, with responses streamed over WebSockets.',
    role: 'Frontend engineering · Ksolves',
    period: 'Mar 2026 – Present · Expected end Jan 2027',
    domain: 'Telecom diagnostics',
    stack: ['Angular', 'TypeScript', 'RxJS', 'WebSockets', 'Chart.js'],
    kind: 'Professional work',
    featured: true,
    visual: { kind: 'stream' },
    problem: 'Helpdesk and modem diagnostics users needed to follow assistant responses and read structured diagnostic information inside the conversation.',
    contribution: 'I integrated two assistant frontends, moved messaging from HTTP requests to WebSocket streaming, and built streamed Markdown, follow-ups, feedback, and diagnostic charts and tables.',
    decisions: [
      { title: 'Handle the stream lifecycle', description: 'RxJS coordinated incoming messages and cleanup. Progress updates, inactivity timeouts, and retry controls gave users a way to recover when a response stalled.' },
      { title: 'Present diagnostics in context', description: 'Reusable charts, tables, and summary cards brought network-correlation previews into the assistant conversation.' },
    ],
    evidence: 'The illustration shows the frontend message lifecycle at a high level. The public case study describes my UI and integration work.',
  },
  {
    slug: 'ats-modernization',
    title: 'ATS Modernization',
    summary: 'A core recruitment module migrated from AngularJS to Angular while preserving existing workflows.',
    role: 'Frontend modernization · Ksolves',
    period: 'Jul 2026 – Nov 2026',
    domain: 'Recruitment software',
    stack: ['AngularJS', 'Angular', 'Claude-assisted development'],
    kind: 'Professional work',
    featured: true,
    visual: { kind: 'migration' },
    problem: 'A core module in the Applicant Tracking System needed to move off AngularJS while keeping existing recruitment workflows available.',
    contribution: 'I returned to the ATS project and contributed to migrating the core module to Angular. I used Claude to assist with adapting the existing code.',
    decisions: [
      { title: 'Preserve the workflow', description: 'The existing recruitment workflow guided what needed to carry over as the module moved to Angular.' },
    ],
    evidence: 'The public diagram shows the migration scope at a high level. Specific framework versions and internal implementation details are omitted.',
  },
  {
    slug: 'inventory-management',
    title: 'Inventory Management Application',
    summary: 'Mobile-friendly Angular workflows for physical inventory, cycle counts, and ad-hoc counts.',
    role: 'Frontend engineering · Ksolves',
    period: 'May 2024 – Feb 2026',
    domain: 'Retail inventory',
    stack: ['Angular', 'NgRx', 'RxJS', 'Infragistics', 'Bootstrap'],
    kind: 'Professional work',
    problem: 'Inventory operators needed screens for several count types that worked on the devices already in use.',
    contribution: 'I built mobile-friendly count screens and worked with product and QA to validate workflows and resolve issues. I also contributed to reviews, release documentation, deployments, and go-live support.',
    decisions: [
      { title: 'Work with existing devices', description: 'The screens were built to support operators on their existing devices across physical inventory, cycle counts, and ad-hoc counts.' },
    ],
    evidence: 'Stock Count Workbench is a separate personal demo that illustrates related inventory concepts using synthetic data.',
  },
  {
    slug: 'compliance-management',
    title: 'Compliance Management System',
    summary: 'A React application built from scratch for document review, requests, and tracking across two portals.',
    role: 'Frontend and data modeling · Ksolves',
    period: 'Feb 2024 – Apr 2024',
    domain: 'Document compliance',
    stack: ['React', 'Bootstrap', 'SQL'],
    kind: 'Professional work',
    problem: 'Admin and customer users needed workflows to request, review, and track documents.',
    contribution: 'I built the React application from scratch, designed initial SQL entity-relationship diagrams, and contributed to role-based access workflows.',
    decisions: [
      { title: 'Model the two portal workflows', description: 'The React screens and initial SQL model reflected document requests and review across the admin and customer portals.' },
    ],
    evidence: 'This case study summarizes my application and initial data-model contributions.',
  },
  {
    slug: 'applicant-tracking',
    title: 'Applicant Tracking System',
    summary: 'Angular recruitment interfaces and serverless data workflows involving PostgreSQL and DynamoDB.',
    role: 'Frontend and serverless development · Ksolves',
    period: 'Aug 2022 – Jan 2024',
    domain: 'Recruitment software',
    stack: ['Angular', 'Angular Material', 'RxJS', 'NgRx', 'Node.js', 'AWS Lambda', 'PostgreSQL', 'DynamoDB'],
    kind: 'Professional work',
    problem: 'Recruitment workflows needed frontend features and data integrations to support users working through the applicant tracking process.',
    contribution: 'I built Angular Material interfaces and implemented Node.js and AWS Lambda functionality for PostgreSQL and DynamoDB data workflows. I worked with clients and QA on requirements, validation, and deployment.',
    decisions: [
      { title: 'Use reactive state in the UI', description: 'RxJS and NgRx supported the state flows behind the Angular Material recruitment interfaces.' },
    ],
    evidence: 'This case study describes the original ATS work. ATS Modernization covers the later core-module migration.',
  },
];

type ExperienceEntry = { readonly project: string } | {
  readonly title: string;
  readonly period: string;
  readonly summary: string;
};

export const experience: readonly ExperienceEntry[] = [
  { title: 'Probation and Angular training', period: 'May 2022 – Jul 2022', summary: 'Learned Angular fundamentals during probation.' },
  { project: 'applicant-tracking' },
  { project: 'compliance-management' },
  { project: 'inventory-management' },
  { project: 'bnmp' },
  { project: 'ats-modernization' },
];

export const experienceOverlap = 'BNMP and ATS Modernization ran in parallel from July to November 2026.';

export const capabilities = [
  {
    title: 'Frontend workflows',
    decision: 'I kept the stock-count rules in the inventory store so quantity limits, variance reasons, and review transitions are enforced outside the form.',
    technologies: 'Angular, TypeScript, Signals, Reactive Forms',
    project: 'stock-count-workbench',
    example: 'Read the stock count case study',
  },
  {
    title: 'Real-time integration',
    decision: 'I used RxJS to manage WebSocket responses and cleanup. Inactivity timeouts and retry controls gave users a way to recover when a stream stalled.',
    technologies: 'REST APIs, WebSockets',
    project: 'bnmp',
    example: 'Read the assistant streaming case study',
  },
  {
    title: 'Application modernization',
    decision: 'I used the existing recruitment workflows to guide what needed to carry over when adapting a core module from AngularJS to Angular.',
    technologies: 'AngularJS, Angular, Claude-assisted development',
    project: 'ats-modernization',
    example: 'Read the ATS modernization case study',
  },
] as const;

export function findProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}
