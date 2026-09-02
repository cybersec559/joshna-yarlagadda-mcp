import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
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

const streamable = JoshnaMcp.serve("/mcp");
const sse = JoshnaMcp.serveSSE("/sse");

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/mcp" || path.startsWith("/mcp/")) {
      return streamable.fetch(request, env, ctx);
    }

    if (path === "/sse" || path.startsWith("/sse/")) {
      return sse.fetch(request, env, ctx);
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
