/**
 * Protocol smoke against a running Worker (npm start).
 * Usage: MCP_URL=http://127.0.0.1:8788/mcp npm run smoke
 *
 * Inspector notes (manual):
 *   1. npm start
 *   2. npx @modelcontextprotocol/inspector@latest
 *   3. Transport: Streamable HTTP
 *   4. URL: http://localhost:8788/mcp
 *   5. Connect → List Tools — expect the eight verb_noun tools
 *   6. Call get_profile and get_mcp_offering
 */

const url = process.env.MCP_URL ?? "http://127.0.0.1:8788/mcp";

const expected = [
  "get_profile",
  "list_services",
  "list_industries",
  "list_outcomes",
  "list_experience",
  "list_certifications",
  "get_contact",
  "get_mcp_offering",
] as const;

async function mcp(
  method: string,
  params: Record<string, unknown>,
  id: number,
  sessionId?: string,
): Promise<{ status: number; body: unknown; sessionId?: string }> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
  };
  if (sessionId) {
    headers["mcp-session-id"] = sessionId;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
  });

  const text = await response.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    const data = text
      .split("\n")
      .filter((line) => line.startsWith("data: "))
      .map((line) => line.slice(6))
      .join("");
    if (data) {
      body = JSON.parse(data);
    }
  }

  return {
    status: response.status,
    body,
    sessionId: response.headers.get("mcp-session-id") ?? sessionId,
  };
}

async function main(): Promise<void> {
  const init = await mcp(
    "initialize",
    {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "joshna-mcp-smoke", version: "1.0.0" },
    },
    1,
  );

  if (init.status >= 400) {
    throw new Error(`initialize failed: ${init.status} ${JSON.stringify(init.body)}`);
  }

  await mcp("notifications/initialized", {}, 2, init.sessionId);

  const listed = await mcp("tools/list", {}, 3, init.sessionId);
  const payload = listed.body as {
    result?: { tools?: Array<{ name: string }> };
  };
  const names = (payload.result?.tools ?? []).map((tool) => tool.name).sort();
  const missing = expected.filter((name) => !names.includes(name));

  if (missing.length > 0) {
    throw new Error(`missing tools: ${missing.join(", ")} (got ${names.join(", ")})`);
  }

  console.log(`OK ${url} — ${names.length} tools: ${names.join(", ")}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
