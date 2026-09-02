import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TOOL_NAMES } from "../src/data.ts";
import { registerTools } from "../src/tools.ts";

type RegisteredTools = Record<string, { description?: string }>;

function registeredTools(server: McpServer): RegisteredTools {
  const record = server as unknown as { _registeredTools?: RegisteredTools };
  return record._registeredTools ?? {};
}

describe("MCP tool registration", () => {
  it("registers each catalog tool on McpServer via server.tool()", () => {
    const server = new McpServer({
      name: "joshna-yarlagadda-test",
      version: "1.0.0",
    });
    registerTools(server);
    const names = Object.keys(registeredTools(server)).sort();
    assert.deepEqual(names, [...TOOL_NAMES].sort());
  });

  it("gives each tool a non-empty description", () => {
    const server = new McpServer({
      name: "joshna-yarlagadda-test",
      version: "1.0.0",
    });
    registerTools(server);
    for (const name of TOOL_NAMES) {
      const tool = registeredTools(server)[name];
      assert.ok(tool, `missing ${name}`);
      assert.ok(tool.description && tool.description.length > 20, name);
    }
  });
});
