/**
 * Public professional facts for Joshna (Josh) Yarlagadda.
 * Encoded from https://joshnayarlagadda.com — do not invent metrics or jobs.
 * Tools work offline from this catalog. A live site fetch is optional metadata only.
 */

export const SOURCE = {
  site: "https://joshnayarlagadda.com",
  mcp: "https://joshnayarlagadda.com/mcp",
  note: "Public professional facts only. No unpublished roles or invented metrics.",
} as const;

export const PROFILE = {
  name: "Joshna Yarlagadda",
  preferred_name: "Josh",
  pronouns: "he/him",
  title: "Head of Security, IT & DevOps",
  headline:
    "Enterprise Security & Technology Executive with 15+ years leading Information Security, IT, and DevOps across Finance, Payments, Healthcare, Retail, and Analytics. Zero major audit findings across SOC 2 and PCI. Trusted advisor to executive leadership and boards — translating cyber risk into business impact.",
  positioning: "CISO / advisory — Security Executive · CISO · Advisor",
  location: "Atlanta, Georgia",
  years: "15+",
  certifications_short: [
    "CCISO",
    "CISM",
    "CEH",
    "AWS Security",
    "ISO 27001",
  ],
  open_to: [
    "CISO",
    "fractional CISO",
    "board advisory",
    "strategic consulting",
  ],
  open_to_detail:
    "Actively exploring Chief Information Security Officer roles, fractional CISO engagements, board-level security advisory positions, and strategic consulting. Fintech, payments, SaaS, and high-growth companies are a natural fit.",
  source: SOURCE,
} as const;

export const SERVICES = [
  {
    id: "ciso-search",
    name: "CISO search",
    summary:
      "Full-time Chief Information Security Officer candidacy — owning security, IT, and DevOps as one operating layer.",
    who_its_for:
      "Boards and CEOs at fintech, payments, SaaS, and high-growth companies hiring a security executive who already runs infrastructure and pipelines, not only a GRC function.",
  },
  {
    id: "fractional-ciso",
    name: "Fractional CISO",
    summary:
      "Part-time CISO-level ownership of program, risk, audit, and leadership reporting without a full-time seat.",
    who_its_for:
      "Growth-stage companies that need executive security leadership, board-ready metrics, and audit ownership before they hire a standing CISO.",
  },
  {
    id: "board-security-advisory",
    name: "Board security advisory",
    summary:
      "Board-level cyber risk in business language — KPI reporting, M&A diligence visibility, and control posture without checkbox theater.",
    who_its_for:
      "Boards and audit committees that need an independent security advisor who has sat on both sides of SOC 2, PCI, and transaction diligence.",
  },
  {
    id: "strategic-consulting",
    name: "Strategic consulting",
    summary:
      "Targeted engagements: security program build, cloud/DevSecOps, IAM/Zero Trust, compliance lifecycle, or M&A security integration.",
    who_its_for:
      "Operators who need a practitioner-executive for a defined outcome — not a staff-aug ticket queue.",
  },
  {
    id: "build-an-mcp",
    name: "Build an MCP for your product",
    summary:
      "Wrap a client product API as a remote Model Context Protocol server on Cloudflare Workers, served at /mcp, so Cursor, Claude, and other assistants can call task-shaped tools.",
    who_its_for:
      "Product and platform teams that want their public or authenticated API usable by AI coding agents — with this server as the living example.",
  },
] as const;

export const INDUSTRIES = [
  {
    id: "payments-fintech",
    name: "Payments & Fintech",
    focus: "PCI DSS, SOC 2 Type II, payment platform security, M&A due diligence",
  },
  {
    id: "financial-services",
    name: "Financial Services",
    focus: "Enterprise fintech, regulatory compliance, FFIEC-aligned controls",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    focus: "HIPAA compliance, patient data protection, clinical system security",
  },
  {
    id: "retail",
    name: "Retail",
    focus: "Consumer data privacy, POS security, CCPA/CPRA compliance",
  },
  {
    id: "analytics-saas",
    name: "Analytics & SaaS",
    focus: "Cloud-native security, multi-tenant architecture, SOC 2 readiness",
  },
  {
    id: "semiconductor-manufacturing",
    name: "Semiconductor & Manufacturing",
    focus: "OT/ICS security, IP protection, supply chain risk management",
  },
  {
    id: "technology-platforms",
    name: "Technology & Platforms",
    focus: "DevSecOps, product security, SDLC integration, cloud security",
  },
  {
    id: "regulated-gdpr-nist",
    name: "Regulated Environments",
    focus: "GDPR, EU–US Data Privacy Framework, NIST CSF, multi-framework compliance",
  },
] as const;

export const OUTCOMES = [
  {
    metric: "50%+",
    label: "Reduction in critical vulnerabilities",
    source: "Public bio on joshnayarlagadda.com",
  },
  {
    metric: "40%",
    label: "Improvement in MTTD / MTTR",
    source: "Public bio on joshnayarlagadda.com",
  },
  {
    metric: "45%",
    label: "Fewer cloud misconfigurations",
    source: "Public bio on joshnayarlagadda.com",
  },
  {
    metric: "Zero",
    label: "Major findings across SOC 2 and PCI audits",
    source: "Public bio on joshnayarlagadda.com",
  },
] as const;

export const EXPERIENCE = [
  {
    period: "2023 — Present",
    company: "Optimized Payments",
    title: "Chief Cybersecurity Architect / Head of IT, Security & DevOps",
    location: null,
    summary:
      "Full executive ownership of Security, IT Operations, and DevOps for a high-growth payment analytics platform.",
    bullets: [
      "Achieved SOC 2 Type II with zero major findings; improved security program maturity by 30% in 12 months.",
      "Reduced critical vulnerabilities by 50%+, cloud misconfigurations by 45%, and MTTD/MTTR by 40% via SIEM/EDR deployment.",
      "Led Zero Trust architecture using Zscaler and Okta/Azure AD, cutting orphaned accounts by 60%.",
      "Integrated SAST/DAST/SCA into CI/CD, reducing pre-production vulnerabilities by 35%.",
      "Architected Model Context Protocol (MCP) integrations connecting enterprise systems to AI agents, and established an AI authorization framework governing access, permissions, and data exposure across every AI-connected tool.",
      "Key personnel driving enterprise-wide AI adoption — leading security evaluation, procurement, and governed rollout of OpenAI, Anthropic (Claude), Cursor, and Grok (xAI) across the organization.",
      "Leading confidential M&A due diligence — security risk assessment, control evaluation, and integration planning.",
    ],
  },
  {
    period: "2022 — 2023",
    company: "Fiserv",
    title: "Information Security Manager II",
    location: null,
    summary:
      "Led enterprise security strategy, roadmap, and compliance programs at one of the world's largest fintech firms.",
    bullets: [
      "Built and scaled security teams as principal security architect for enterprise initiatives.",
      "Directed threat hunting and SIEM operations across the environment.",
      "Supported PCI DSS, SOC 2, and maturity assessments at enterprise scale.",
    ],
  },
  {
    period: "2021 — 2022",
    company: "Fiserv",
    title: "Manager – IT Security",
    location: "Alpharetta, GA",
    summary:
      "Led security engineering and operations initiatives across enterprise systems, strengthening threat detection and response.",
    bullets: [
      "Supported enterprise compliance, risk management, and M&A integration.",
      "Led post-merger security integration of Ondot Systems, aligning IAM and compliance controls.",
      "Consolidated security tooling across merged environments.",
    ],
  },
  {
    period: "2015 — 2021",
    company: "Raise Networks / Ondot Systems",
    title: "Senior Manager – Information Security",
    location: "San Francisco Bay Area",
    summary:
      "Led enterprise security programs for fintech and payment platforms, designing security architecture and controls from the ground up.",
    bullets: [
      "Built SIEM and monitoring capabilities, improving detection coverage by 50%.",
      "Implemented IAM, DLP, and endpoint security across the organization.",
      "Led PCI DSS, SOC, and ISO compliance initiatives through multiple audit cycles.",
    ],
  },
  {
    period: "2010 — 2014",
    company: "JenPro InfoTech",
    title: "Senior IT Security Specialist / Information Security Consultant",
    location: "India",
    summary:
      "Implemented enterprise security controls, monitoring, and risk assessments — building the foundational practitioner depth that underpins all subsequent leadership.",
    bullets: [
      "Conducted security audits and compliance support across client environments.",
      "Assisted in the implementation of enterprise security frameworks.",
    ],
  },
] as const;

export const CERTIFICATIONS = {
  credentials: [
    {
      name: "CCISO",
      full_name: "Certified Chief Information Security Officer",
      issuer: "EC-Council",
    },
    {
      name: "CISM",
      full_name: "Certified Information Security Manager",
      issuer: "ISACA",
    },
    {
      name: "CEH",
      full_name: "Certified Ethical Hacker",
      issuer: "EC-Council",
    },
    {
      name: "AWS Security Specialty",
      full_name: "AWS Certified Security – Specialty",
      issuer: "Amazon Web Services",
    },
    {
      name: "ISO 27001 Lead Auditor",
      full_name: "ISO/IEC 27001:2013 Lead Auditor Certified",
      issuer: "ISO/IEC 27001:2013",
    },
    {
      name: "Security+",
      full_name: "CompTIA Security+",
      issuer: "CompTIA",
    },
    {
      name: "CCNA",
      full_name: "Cisco Certified Network Associate",
      issuer: "Cisco",
    },
    {
      name: "COBIT 5",
      full_name: "COBIT 5 Foundation",
      issuer: "ISACA",
    },
  ],
  education: [
    {
      degree: "Master of Science",
      field: "Computer Science",
      school: "San Francisco Bay University",
    },
    {
      degree: "Bachelor of Science",
      field: "Computer Science",
      school: "JNTUH",
    },
  ],
  source: SOURCE,
} as const;

export const CONTACT = {
  email: "joshnayarlagadda@gmail.com",
  linkedin: "https://www.linkedin.com/in/bhaskary066525135",
  linkedin_handle: "linkedin.com/in/bhaskary066525135",
  mobile: "732.983.8495",
  location: "Atlanta, Georgia",
  site: SOURCE.site,
  note: "Public site contact data only. Prefer email or LinkedIn for first contact.",
} as const;

export const MCP_OFFERING = {
  name: "Build an MCP for your product",
  living_example: {
    url: "https://joshnayarlagadda.com/mcp",
    live: "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp",
    local: "http://localhost:8788/mcp",
    note: "This Worker is the working example — an authless public MCP because the underlying site data is already public. Client product MCPs usually add two-layer auth.",
    setup_manual:
      "https://github.com/cybersec559/joshna-yarlagadda-mcp/blob/main/SETUP.md",
    architecture:
      "https://github.com/cybersec559/joshna-yarlagadda-mcp/blob/main/ARCHITECTURE.md",
  },
  claude: {
    authentication: "none",
    url: "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp",
    claude_ai:
      "Customize → Connectors → Add custom connector. Name: Joshna Yarlagadda. URL: the live /mcp. Authentication: None. Enable the connector in the chat + menu.",
    claude_desktop:
      "Settings → Connectors → Add custom connector with the same URL, or paste the mcp-remote block into claude_desktop_config.json and restart.",
    claude_code:
      "claude mcp add --transport http joshna-yarlagadda https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp",
  },
  what_it_means:
    "Wrap a client product API as a remote Model Context Protocol server on Cloudflare Workers so assistants (Cursor, Claude, and others) can call real, task-shaped tools instead of scraping docs.",
  phases: [
    {
      id: "intake",
      name: "Intake",
      detail:
        "Map the product surface: which objects, verbs, and outcomes an assistant should be allowed to perform. Public vs authenticated data, rate limits, and the canonical /mcp URL.",
    },
    {
      id: "task-shaped-tools",
      name: "Task-shaped tools",
      detail:
        "Design verb_noun tools with Zod schemas — get_*, list_*, create_* — that match jobs an agent actually has, not a 1:1 dump of every REST path.",
    },
    {
      id: "two-layer-auth",
      name: "Two-layer auth",
      detail:
        "Layer 1: who the client is (OAuth, Cloudflare Access, or a bearer issued by the product). Layer 2: what that principal may call (tool allowlists and scoped tokens). This public-site MCP skips both layers on purpose; product APIs should not.",
    },
    {
      id: "cloudflare-mcp",
      name: "Cloudflare /mcp",
      detail:
        "Ship a TypeScript Worker using McpAgent, Durable Objects, and Streamable HTTP at path /mcp. Attach a custom domain route (example: yourproduct.com/mcp) when DNS is ready.",
    },
    {
      id: "inspector",
      name: "Inspector",
      detail:
        "Prove the server with MCP Inspector: connect to /mcp, List Tools, and exercise each tool before handing the URL to customers.",
    },
    {
      id: "handoff",
      name: "Cursor / Claude handoff",
      detail:
        "Give clients the remote MCP URL plus a Cursor mcp.json / Claude Desktop snippet (or mcp-remote for local-only clients) so an agent can attach in one step.",
    },
  ],
  source: SOURCE,
} as const;

export const TOOL_NAMES = [
  "get_profile",
  "list_services",
  "list_industries",
  "list_outcomes",
  "list_experience",
  "list_certifications",
  "get_contact",
  "get_mcp_offering",
] as const;

export type ToolName = (typeof TOOL_NAMES)[number];
