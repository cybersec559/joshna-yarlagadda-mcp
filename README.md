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

## Inspector

```bash
npx @modelcontextprotocol/inspector@latest
```

1. Transport: **Streamable HTTP**
2. URL: `http://localhost:8788/mcp`
3. Connect → **List Tools** — you should see the eight `verb_noun` tools above
4. Call `get_profile`, then `get_mcp_offering`

If a client only speaks SSE, use `http://localhost:8788/sse`.

### Cursor

```json
{
  "mcpServers": {
    "joshna-yarlagadda": {
      "url": "https://joshnayarlagadda.com/mcp"
    }
  }
}
```

Local-only clients can wrap the remote URL with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "joshna-yarlagadda": {
      "command": "npx",
      "args": ["mcp-remote", "https://joshnayarlagadda.com/mcp"]
    }
  }
}
```

Cloudflare AI Playground: paste the `/mcp` URL.

## Claude

This server is public and **authless**. Claude users should attach the live HTTPS endpoint (custom-domain `joshnayarlagadda.com/mcp` is a later DNS step):

**https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp**

Authentication: **None**. Do not configure OAuth.

### claude.ai, Claude Desktop, Cowork, mobile

Claude’s custom connectors call this URL from Anthropic’s cloud (not from localhost).

1. **Free / Pro / Max:** Customize → Connectors → **Add custom connector**
2. **Team / Enterprise (Owner):** Organization settings → Connectors → Add → Custom → Web
3. Name: `Joshna Yarlagadda` (ASCII only — avoid spaces-as-needed is fine; skip umlauts)
4. Remote MCP server URL: `https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp`
5. Authentication: **None** (leave OAuth client id/secret empty)
6. Add, then in a chat open **+ → Connectors** and enable it

Members on Team/Enterprise click **Connect** after an Owner adds it.

### Claude Desktop (local process)

Settings → Developer → Edit Config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "joshna-yarlagadda": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp"
      ]
    }
  }
}
```

Restart Claude Desktop. Prefer the Connectors UI above if your build supports remote MCP natively.

### Claude Code

```bash
claude mcp add --transport http joshna-yarlagadda https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp
```

Or a project `.mcp.json`:

```json
{
  "mcpServers": {
    "joshna-yarlagadda": {
      "type": "http",
      "url": "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp"
    }
  }
}
```

### Claude API

```json
{
  "mcp_servers": [
    {
      "type": "url",
      "url": "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp",
      "name": "joshna-yarlagadda"
    }
  ]
}
```

Use Anthropic’s current Messages API MCP beta header for your SDK version. No bearer token is required.

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
examples/        Claude Desktop config snippet
.mcp.json        Claude Code project attach
wrangler.toml    DO binding + commented custom-domain route
test/            Catalog + registration fixtures
scripts/smoke-mcp.ts
```

## Privacy

Contact tools return only what the public site already shows (email, LinkedIn, mobile, Atlanta). No extra PII.
