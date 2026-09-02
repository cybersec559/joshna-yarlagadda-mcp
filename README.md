# Joshna Yarlagadda MCP

Public, **authless** remote MCP server for [Joshna (Josh) Yarlagadda](https://joshnayarlagadda.com) — Head of Security, IT & DevOps, CISO/advisory.

Canonical URL: **https://joshnayarlagadda.com/mcp**  
(Custom-domain DNS is a later step. This Worker already serves MCP at path `/mcp`.)

v1 does **not** use OAuth. Every tool returns facts already published on the site. Do not invent metrics or jobs; the catalog in `src/data.ts` is the source of truth and works offline.

Built as a Cloudflare Worker with **McpAgent** (agents SDK), `server.tool()` + Zod, and a SQLite Durable Object binding — the `cloudflare/ai/demos/remote-mcp-authless` pattern.

## Tools

| Tool | Returns |
| --- | --- |
| `get_profile` | Name, title, headline, Atlanta GA, 15+ years, short certs, open-to (CISO / fractional CISO / board advisory / strategic consulting) |
| `list_services` | CISO search, fractional CISO, board security advisory, strategic consulting, Build an MCP for your product — plus who each is for |
| `list_industries` | Payments/fintech, financial services, healthcare, retail, analytics/SaaS, semiconductor/manufacturing, technology platforms, regulated/GDPR-NIST |
| `list_outcomes` | 50%+ critical vuln reduction, 40% MTTD/MTTR, 45% fewer cloud misconfigs, zero major SOC 2 & PCI findings (public bio only) |
| `list_experience` | Optimized Payments 2023–present; Fiserv ISM II 2022–2023; Fiserv Manager IT Security 2021–2022; Raise/Ondot 2015–2021; JenPro 2010–2014 — published bullets, including MCP/AI at OP. Optional `company` filter. |
| `list_certifications` | CCISO, CISM, CEH, AWS Security Specialty, ISO 27001 Lead Auditor, Security+, CCNA, COBIT 5; MS CS (San Francisco Bay University); BS CS (JNTUH) |
| `get_contact` | Email, LinkedIn, mobile, location — public site fields only |
| `get_mcp_offering` | Intake → task-shaped tools → two-layer auth → Cloudflare `/mcp` → Inspector → Cursor/Claude handoff. Points at this same MCP as the living example. |

GET `/` is a short human page. Assistants must use `/mcp` (Streamable HTTP). `/sse` remains for older Inspector clients.

**Client setup:** [SETUP.md](SETUP.md)  
**Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)

## Local

```bash
npm install
npm start
```

MCP: [http://localhost:8788/mcp](http://localhost:8788/mcp)  
Human page: [http://localhost:8788/](http://localhost:8788/)

```bash
npm test
npm run typecheck
```

Against a running `npm start`:

```bash
npm run smoke
```

## Attach an AI client

Step-by-step for every supported assistant is in **[SETUP.md](SETUP.md)** (Cursor, Claude.ai / Desktop / Code / API, VS Code Copilot, Windsurf, Cline, Continue, Codex CLI, Gemini CLI, ChatGPT connectors, Cloudflare Playground, Inspector, and any stdio-only host via `mcp-remote`).

Live URL: `https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp` — Authentication: **None**.

## Deploy

No secrets are required for v1. Do **not** add API tokens or OAuth client secrets to git.

```bash
npx wrangler login
npm run deploy
```

That publishes `https://joshna-yarlagadda-mcp.<your-account>.workers.dev/mcp`.

`wrangler.toml` already binds Durable Object `MCP_OBJECT` → class `JoshnaMcp` (SQLite migration `v1`). If Cloudflare credentials are missing in this environment, skip deploy — the commands above are enough once you are logged in.

## Attach joshnayarlagadda.com/mcp

The Worker serves `/mcp` regardless of hostname. After the zone is on Cloudflare DNS:

1. Dashboard → Workers & Pages → `joshna-yarlagadda-mcp` → **Domains & Routes**
2. Add a route: `joshnayarlagadda.com/mcp*` (and optionally `joshnayarlagadda.com/sse*` if you still need SSE)
3. Or uncomment the `[[routes]]` example in `wrangler.toml` and redeploy:

```toml
[[routes]]
pattern = "joshnayarlagadda.com/mcp"
zone_name = "joshnayarlagadda.com"
```

Keep the marketing site on the apex. This Worker only needs the `/mcp` path.

Confirm with Inspector against `https://joshnayarlagadda.com/mcp`, then point Cursor/Claude at that URL.

## Layout

```
src/index.ts     Worker + JoshnaMcp (McpAgent)
src/tools.ts     server.tool() registrations (Zod)
src/data.ts      Static public catalog
src/clients.ts   Live URL + Claude Origin allowlist
src/landing.ts   GET /
SETUP.md         AI client setup manual
ARCHITECTURE.md  Runtime, tools, data, deploy topology
examples/        Copy-paste configs per client
.mcp.json        Claude Code project attach
wrangler.toml    DO binding + commented custom-domain route
test/            Catalog + registration fixtures
scripts/smoke-mcp.ts
```

## Privacy

Contact tools return only what the public site already shows (email, LinkedIn, mobile, Atlanta). No extra PII.
