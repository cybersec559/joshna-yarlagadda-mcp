const TOOLS = [
  ["get_profile", "Name, title, headline, location, years, certs, open-to"],
  ["list_services", "CISO search, fractional CISO, board advisory, consulting, MCP build"],
  ["list_industries", "Payments, FS, healthcare, retail, SaaS, semiconductor, platforms, regulated"],
  ["list_outcomes", "Published bio outcomes only — no invented metrics"],
  ["list_experience", "Roles and published bullets, including MCP/AI at Optimized Payments"],
  ["list_certifications", "CCISO, CISM, CEH, AWS Security, ISO 27001 LA, Security+, CCNA, COBIT 5"],
  ["get_contact", "Email, LinkedIn, mobile, Atlanta — public site data only"],
  ["get_mcp_offering", "How “Build an MCP for your product” is delivered"],
] as const;

export function landingPage(): Response {
  const rows = TOOLS.map(
    ([name, detail]) =>
      `<tr><td><code>${name}</code></td><td>${detail}</td></tr>`,
  ).join("");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Joshna Yarlagadda MCP</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #0c1118;
      --fg: #e8eef6;
      --muted: #9aa8b8;
      --line: #243044;
      --accent: #7eb0d6;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
      background: var(--bg);
      color: var(--fg);
      line-height: 1.5;
    }
    main {
      max-width: 40rem;
      margin: 0 auto;
      padding: 2.5rem 1.25rem 4rem;
    }
    h1 { font-size: 1.65rem; letter-spacing: -0.03em; margin: 0 0 0.35rem; }
    p { color: var(--muted); }
    a { color: var(--accent); }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.88em;
    }
    table { width: 100%; border-collapse: collapse; margin: 1.25rem 0; }
    th, td { text-align: left; vertical-align: top; padding: 0.55rem 0.4rem; border-bottom: 1px solid var(--line); }
    th { color: var(--muted); font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; }
    .chip {
      display: inline-block;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 0.15rem 0.65rem;
      font-size: 0.8rem;
      color: var(--muted);
      margin-right: 0.35rem;
    }
  </style>
</head>
<body>
  <main>
    <p class="chip">Public MCP</p>
    <p class="chip">Authless v1</p>
    <h1>Joshna Yarlagadda MCP</h1>
    <p>Head of Security, IT &amp; DevOps. Assistants should connect to <a href="/mcp"><code>/mcp</code></a> (Streamable HTTP). This page is for humans.</p>
    <p>Canonical URL: <a href="https://joshnayarlagadda.com/mcp">https://joshnayarlagadda.com/mcp</a>. Source facts: <a href="https://joshnayarlagadda.com">joshnayarlagadda.com</a>. No OAuth — the site data is already public.</p>
    <table>
      <thead><tr><th>Tool</th><th>Returns</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p>Live MCP (use this today): <a href="https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp"><code>https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp</code></a>. Authentication: none.</p>
    <h2 style="font-size:1.05rem;margin:1.75rem 0 0.4rem">AI client setup</h2>
    <p>Full manual for Cursor, Claude, VS Code, Windsurf, Cline, Continue, Codex, Gemini, ChatGPT, Inspector, and stdio-only hosts: <a href="https://github.com/cybersec559/joshna-yarlagadda-mcp/blob/main/SETUP.md">SETUP.md</a>. Architecture: <a href="https://github.com/cybersec559/joshna-yarlagadda-mcp/blob/main/ARCHITECTURE.md">ARCHITECTURE.md</a>.</p>
    <p><strong>Claude (quick):</strong> Customize → Connectors → Add custom connector → URL above → Authentication <strong>None</strong> → enable under chat “+”.</p>
    <p><strong>Claude Code:</strong> <code>claude mcp add --transport http joshna-yarlagadda https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp</code></p>
    <p><strong>Cursor (quick):</strong> Settings → MCP → add URL <code>…/mcp</code>, or copy <code>examples/cursor.mcp.json</code>.</p>
  </main>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
