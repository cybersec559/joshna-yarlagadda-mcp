import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isAllowedClientOrigin } from "../src/clients.ts";

describe("Claude / client Origin allowlist", () => {
  it("accepts Claude and local Origins", () => {
    assert.equal(isAllowedClientOrigin("https://claude.ai"), true);
    assert.equal(isAllowedClientOrigin("https://www.claude.ai"), true);
    assert.equal(isAllowedClientOrigin("https://claude.com"), true);
    assert.equal(isAllowedClientOrigin("https://app.anthropic.com"), true);
    assert.equal(isAllowedClientOrigin("http://localhost:5173"), true);
    assert.equal(
      isAllowedClientOrigin(
        "https://joshna-yarlagadda-mcp.bhaskar-itm.workers.dev",
      ),
      true,
    );
  });

  it("rejects unrelated Origins", () => {
    assert.equal(isAllowedClientOrigin("https://evil.example"), false);
    assert.equal(isAllowedClientOrigin("not-a-url"), false);
  });
});
