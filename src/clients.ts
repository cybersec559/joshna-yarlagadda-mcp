/** Public Streamable HTTP URL Claude / Cursor attach today. */
export const LIVE_MCP_URL =
  "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/mcp";

export const LIVE_SITE_URL =
  "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev/";

/**
 * Browser Origins that may preflight /mcp (Claude.ai connector UI, Inspector).
 * Anthropic's cloud connector often sends no Origin; those requests stay allowed.
 */
const CLIENT_ORIGIN_SUFFIXES = [
  ".claude.ai",
  ".claude.com",
  ".anthropic.com",
  ".cursor.com",
  ".workers.dev",
] as const;

const CLIENT_ORIGIN_HOSTS = new Set([
  "claude.ai",
  "www.claude.ai",
  "claude.com",
  "www.claude.com",
  "localhost",
  "127.0.0.1",
]);

export function isAllowedClientOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }
    const host = url.hostname.toLowerCase();
    if (CLIENT_ORIGIN_HOSTS.has(host)) {
      return true;
    }
    return CLIENT_ORIGIN_SUFFIXES.some((suffix) => host.endsWith(suffix));
  } catch {
    return false;
  }
}

export const MCP_CORS = {
  origin: "*",
  headers:
    "Content-Type, Accept, Authorization, mcp-session-id, mcp-protocol-version, Last-Event-ID",
  methods: "GET, POST, DELETE, OPTIONS",
  exposeHeaders: "mcp-session-id, mcp-protocol-version",
  maxAge: 86400,
} as const;

export function applyClientCors(request: Request, response: Response): Response {
  const origin = request.headers.get("Origin");
  if (!origin || !isAllowedClientOrigin(origin)) {
    return response;
  }
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.append("Vary", "Origin");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
