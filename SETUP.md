# Joshna Yarlagadda MCP — AI client setup manual

Attach any MCP-capable assistant to the public, **authless** professional server.

| | |
| --- | --- |
| **Live URL (use this today)** | `https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp` |
| **Canonical URL (after DNS)** | `https://joshnayarlagadda.com/mcp` |
| **Transport** | Streamable HTTP at `/mcp` (legacy SSE at `/sse`) |
| **Authentication** | **None.** Do not add OAuth, API keys, or bearer tokens. |
| **Human page** | https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/ |
| **Source facts** | https://joshnayarlagadda.com |

After you attach, ask: *“Call `get_profile` and summarize Joshna Yarlagadda’s open-to roles.”* You should see eight tools: `get_profile`, `list_services`, `list_industries`, `list_outcomes`, `list_experience`, `list_certifications`, `get_contact`, `get_mcp_offering`.

Copy-paste JSON lives in [`examples/`](examples/).

---

## 1. Cursor

**UI:** Settings → MCP → Add new MCP server → type **URL** / HTTP → paste the live URL → Save. Restart Cursor if tools do not appear.

**Project file** `.cursor/mcp.json` or **user file** `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "joshna-yarlagadda": {
      "url": "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp"
    }
  }
}
```

If your Cursor build only accepts a local command, use the stdio bridge:

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

Confirm under Settings → MCP that the server is green, then use Agent / Chat.

---

## 2. Claude.ai, Claude Desktop, Cowork, mobile (Connectors)

Claude’s custom connectors call the URL from Anthropic’s cloud. The server must be public HTTPS (it is).

1. **Free / Pro / Max:** Customize → Connectors → **Add custom connector**
2. **Team / Enterprise (Owner):** Organization settings → Connectors → Add → Custom → Web
3. Name: `Joshna Yarlagadda` (ASCII; no umlauts)
4. Remote MCP server URL: `https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp`
5. Authentication: **None** (leave OAuth client id/secret empty)
6. Click Add. In a chat, open **+ → Connectors** and enable it.

Team/Enterprise members click **Connect** after an Owner adds it.

---

## 3. Claude Desktop (local stdio)

Use this if your Desktop build does not yet show remote Connectors.

Config path:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

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

Ready-made file: [`examples/claude_desktop_config.json`](examples/claude_desktop_config.json). Restart Claude Desktop. Requires Node.js so `npx` works.

---

## 4. Claude Code

```bash
claude mcp add --transport http joshna-yarlagadda \
  https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp
```

User-wide:

```bash
claude mcp add --transport http --scope user joshna-yarlagadda \
  https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp
```

Or a project [`.mcp.json`](.mcp.json):

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

Check with `claude mcp list`.

---

## 5. Claude Messages API

No bearer token. Use Anthropic’s current MCP beta header for your SDK version.

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

---

## 6. Visual Studio Code + GitHub Copilot

**Command Palette:** `MCP: Add Server` → HTTP → paste the live URL.

**Project file** `.vscode/mcp.json` (note: top-level key is `servers`, not `mcpServers`):

```json
{
  "servers": {
    "joshna-yarlagadda": {
      "type": "http",
      "url": "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp"
    }
  }
}
```

Ready-made file: [`examples/vscode.mcp.json`](examples/vscode.mcp.json). Open Copilot **Agent** chat and ask it to call `get_profile`.

---

## 7. Windsurf (Codeium)

Edit `~/.codeium/windsurf/mcp_config.json` (global; Windsurf does not use a project-level file).

Native URL (if your build supports it):

```json
{
  "mcpServers": {
    "joshna-yarlagadda": {
      "serverUrl": "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp"
    }
  }
}
```

Stdio fallback:

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

Ready-made file: [`examples/windsurf.mcp_config.json`](examples/windsurf.mcp_config.json). Restart Windsurf.

---

## 8. Cline (VS Code / Cursor extension)

Open Cline → MCP Servers → Configure, or edit `cline_mcp_settings.json`:

- macOS VS Code: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- Windows: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`

```json
{
  "mcpServers": {
    "joshna-yarlagadda": {
      "url": "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

If Cline only accepts a command, use the `mcp-remote` block from section 3. Ready-made file: [`examples/cline_mcp_settings.json`](examples/cline_mcp_settings.json).

---

## 9. Continue

`~/.continue/config.json` (or the Continue YAML config, depending on version). Add:

```json
{
  "mcpServers": [
    {
      "name": "joshna-yarlagadda",
      "url": "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp"
    }
  ]
}
```

If that key is ignored, use `command` / `args` with `mcp-remote` as in section 3. Reload the Continue window.

---

## 10. OpenAI Codex CLI

```bash
codex mcp add joshna-yarlagadda \
  --url https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp
```

If your Codex build only launches local processes:

```bash
codex mcp add joshna-yarlagadda -- npx -y mcp-remote \
  https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp
```

---

## 11. Gemini CLI (Google)

```bash
gemini mcp add joshna-yarlagadda \
  --transport http \
  https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp
```

Or `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "joshna-yarlagadda": {
      "httpUrl": "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp"
    }
  }
}
```

Flag names vary slightly by Gemini CLI version (`httpUrl` vs `url`). If HTTP is rejected, use the `mcp-remote` command block.

---

## 12. ChatGPT (custom connectors / Apps)

On plans that allow **custom MCP / connectors**:

1. Settings → Connectors (or Apps) → create a custom connector
2. Server URL: `https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp`
3. Authentication: **None**
4. Enable the connector in the conversation

ChatGPT cannot use a localhost MCP. This Worker is already on the public internet.

---

## 13. Cloudflare AI Playground

1. Open https://playground.ai.cloudflare.com/
2. Paste `https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp`
3. Connect and list tools

---

## 14. MCP Inspector (verify before handing to anyone)

```bash
npx @modelcontextprotocol/inspector@latest
```

1. Transport: **Streamable HTTP**
2. URL: `https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp`  
   Local: `http://localhost:8788/mcp` after `npm start`
3. Connect → List Tools → call `get_profile` and `get_mcp_offering`

Older Inspector builds: transport SSE, URL `https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/sse`.

---

## 15. Any other stdio-only client

If the app can only spawn a local process, wrap the remote server:

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

Requires Node.js 18+. Do not put secrets in this block — the server does not accept any.

---

## 16. First prompts that prove the attach

- “Use `get_profile`. What roles is Joshna open to?”
- “Use `list_experience` filtered to Optimized Payments. What MCP/AI work is published?”
- “Use `get_mcp_offering` and explain how to wrap a product API as a remote MCP.”
- “Use `get_contact` and give only the public email and LinkedIn.”

---

## 17. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Tools never appear | Restart the client. Confirm the URL ends in `/mcp`, not `/`. |
| Browser GET `/mcp` errors | Expected. `/mcp` is a protocol endpoint, not a web page. Use Inspector or an MCP client. |
| Claude asks for OAuth | Choose Authentication **None**. This v1 server is public. |
| Claude tools missing in chat | Enable the connector under **+ → Connectors**. Use an ASCII connector name. Start a new chat. |
| Cursor / Windsurf `npx` fails | Install Node.js 18+, or use the native `url` / `serverUrl` form instead of `mcp-remote`. |
| `mcp-remote` hangs | Run `npx -y mcp-remote https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp` in a terminal; you should see a session start. |
| Corporate SSL inspection | Allow `*.workers.dev` outbound HTTPS. |
| Custom domain not resolving | Until DNS is attached, use the `workers.dev` URL above. |

Protocol smoke (should list eight tools):

```bash
curl -sS -X POST https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"setup","version":"1"}}}'
```

Then from this repo: `MCP_URL=https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp npm run smoke`
