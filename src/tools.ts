import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  CERTIFICATIONS,
  CONTACT,
  EXPERIENCE,
  INDUSTRIES,
  MCP_OFFERING,
  OUTCOMES,
  PROFILE,
  SERVICES,
  SOURCE,
} from "./data";
import { jsonResult } from "./respond";

const emptyInput = {};

const experienceInput = {
  company: z
    .string()
    .optional()
    .describe(
      "Optional case-insensitive substring to filter roles (e.g. Fiserv, Optimized Payments, Ondot, JenPro).",
    ),
};

export function registerTools(server: McpServer): void {
  server.tool(
    "get_profile",
    "Return Joshna (Josh) Yarlagadda's public profile: name, title, headline, location, years, short certification list, and open-to roles (CISO / fractional CISO / board advisory / strategic consulting).",
    emptyInput,
    async () => jsonResult(PROFILE),
  );

  server.tool(
    "list_services",
    "List public services: CISO search, fractional CISO, board security advisory, strategic consulting, and Build an MCP for your product — including who each is for.",
    emptyInput,
    async () => jsonResult({ services: SERVICES, source: SOURCE }),
  );

  server.tool(
    "list_industries",
    "List industries served: payments/fintech, financial services, healthcare, retail, analytics/SaaS, semiconductor/manufacturing, technology platforms, and regulated/GDPR-NIST environments.",
    emptyInput,
    async () => jsonResult({ industries: INDUSTRIES, source: SOURCE }),
  );

  server.tool(
    "list_outcomes",
    "List published outcomes from the public bio: 50%+ critical vuln reduction, 40% MTTD/MTTR, 45% fewer cloud misconfigs, zero major SOC 2 & PCI findings. Does not invent additional metrics.",
    emptyInput,
    async () => jsonResult({ outcomes: OUTCOMES, source: SOURCE }),
  );

  server.tool(
    "list_experience",
    "List published roles: Optimized Payments 2023–present; Fiserv ISM II 2022–2023; Fiserv Manager IT Security 2021–2022; Raise/Ondot 2015–2021; JenPro 2010–2014 — including public bullets (MCP/AI at Optimized Payments).",
    experienceInput,
    async ({ company }) => {
      const needle = company?.trim().toLowerCase();
      const roles = needle
        ? EXPERIENCE.filter(
            (role) =>
              role.company.toLowerCase().includes(needle) ||
              role.title.toLowerCase().includes(needle),
          )
        : EXPERIENCE;
      return jsonResult({
        experience: roles,
        filtered: Boolean(needle),
        source: SOURCE,
      });
    },
  );

  server.tool(
    "list_certifications",
    "List published credentials (CCISO, CISM, CEH, AWS Security Specialty, ISO 27001 Lead Auditor, Security+, CCNA, COBIT 5) and degrees (MS CS, San Francisco Bay University; BS CS, JNTUH).",
    emptyInput,
    async () => jsonResult(CERTIFICATIONS),
  );

  server.tool(
    "get_contact",
    "Return public contact data from joshnayarlagadda.com: email, LinkedIn, mobile, and Atlanta GA location. No additional PII.",
    emptyInput,
    async () => jsonResult(CONTACT),
  );

  server.tool(
    "get_mcp_offering",
    "Explain Build an MCP for your product: intake, task-shaped tools, two-layer auth, Cloudflare /mcp, Inspector, and Cursor/Claude handoff. Points at this same MCP as the living example.",
    emptyInput,
    async () => jsonResult(MCP_OFFERING),
  );
}
