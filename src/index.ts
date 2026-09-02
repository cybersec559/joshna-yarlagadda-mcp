import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { MCP_CORS, applyClientCors } from "./clients";
import { landingPage } from "./landing";
import { registerTools } from "./tools";

/**
 * Sessionful MCP agent. Each Inspector / client session is a Durable Object.
 * v1 is authless: every tool returns facts already published on
 * https://joshnayarlagadda.com.
 */
export class JoshnaMcp extends McpAgent {
  server = new McpServer({
    name: "joshna-yarlagadda",
    version: "1.0.0",
  });

  async init() {
    registerTools(this.server);
  }
}

const streamable = JoshnaMcp.serve("/mcp", { corsOptions: MCP_CORS });
const sse = JoshnaMcp.serveSSE("/sse", { corsOptions: MCP_CORS });

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/mcp" || path.startsWith("/mcp/")) {
      return applyClientCors(request, await streamable.fetch(request, env, ctx));
    }

    if (path === "/sse" || path.startsWith("/sse/")) {
      return applyClientCors(request, await sse.fetch(request, env, ctx));
    }

    if (path === "/" && request.method === "GET") {
      return landingPage();
    }

    return new Response("Not found. MCP lives at /mcp.", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
} satisfies ExportedHandler<Env>;
