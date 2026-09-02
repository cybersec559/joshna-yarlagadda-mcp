import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CERTIFICATIONS,
  CONTACT,
  EXPERIENCE,
  INDUSTRIES,
  MCP_OFFERING,
  OUTCOMES,
  PROFILE,
  SERVICES,
  TOOL_NAMES,
} from "../src/data.ts";

describe("public catalog fixtures", () => {
  it("registers the eight task-shaped tools and no admin/destroy tools", () => {
    assert.deepEqual(TOOL_NAMES, [
      "get_profile",
      "list_services",
      "list_industries",
      "list_outcomes",
      "list_experience",
      "list_certifications",
      "get_contact",
      "get_mcp_offering",
    ]);
    assert.equal(
      TOOL_NAMES.some((name) => /admin|destroy|delete/i.test(name)),
      false,
    );
  });

  it("encodes the public profile without inventing years", () => {
    assert.equal(PROFILE.name, "Joshna Yarlagadda");
    assert.equal(PROFILE.preferred_name, "Josh");
    assert.equal(PROFILE.title, "Head of Security, IT & DevOps");
    assert.equal(PROFILE.location, "Atlanta, Georgia");
    assert.equal(PROFILE.years, "15+");
    assert.deepEqual(PROFILE.open_to, [
      "CISO",
      "fractional CISO",
      "board advisory",
      "strategic consulting",
    ]);
    assert.ok(PROFILE.certifications_short.includes("CCISO"));
  });

  it("lists the five published services including the MCP offering", () => {
    assert.equal(SERVICES.length, 5);
    assert.deepEqual(
      SERVICES.map((service) => service.id),
      [
        "ciso-search",
        "fractional-ciso",
        "board-security-advisory",
        "strategic-consulting",
        "build-an-mcp",
      ],
    );
    assert.match(SERVICES[4].summary, /Cloudflare/i);
  });

  it("lists the eight published industries", () => {
    assert.equal(INDUSTRIES.length, 8);
    assert.ok(INDUSTRIES.some((row) => row.id === "payments-fintech"));
    assert.ok(INDUSTRIES.some((row) => row.id === "regulated-gdpr-nist"));
  });

  it("lists only the four public-bio outcomes", () => {
    assert.equal(OUTCOMES.length, 4);
    assert.deepEqual(
      OUTCOMES.map((row) => row.metric),
      ["50%+", "40%", "45%", "Zero"],
    );
  });

  it("encodes the published role sequence including MCP/AI at Optimized Payments", () => {
    assert.equal(EXPERIENCE.length, 5);
    assert.equal(EXPERIENCE[0].company, "Optimized Payments");
    assert.match(EXPERIENCE[0].title, /Chief Cybersecurity Architect/);
    assert.ok(
      EXPERIENCE[0].bullets.some((bullet) =>
        bullet.includes("Model Context Protocol"),
      ),
    );
    assert.equal(EXPERIENCE[1].company, "Fiserv");
    assert.match(EXPERIENCE[1].title, /Information Security Manager II/);
    assert.equal(EXPERIENCE[2].company, "Fiserv");
    assert.match(EXPERIENCE[2].title, /IT Security/);
    assert.match(EXPERIENCE[3].company, /Ondot/);
    assert.equal(EXPERIENCE[4].company, "JenPro InfoTech");
    assert.match(EXPERIENCE[4].period, /2010/);
  });

  it("lists the eight credentials and two public degrees", () => {
    assert.deepEqual(
      CERTIFICATIONS.credentials.map((row) => row.name),
      [
        "CCISO",
        "CISM",
        "CEH",
        "AWS Security Specialty",
        "ISO 27001 Lead Auditor",
        "Security+",
        "CCNA",
        "COBIT 5",
      ],
    );
    assert.equal(CERTIFICATIONS.education[0].school, "San Francisco Bay University");
    assert.equal(CERTIFICATIONS.education[1].school, "JNTUH");
  });

  it("exposes only public-site contact fields", () => {
    assert.equal(CONTACT.email, "joshnayarlagadda@gmail.com");
    assert.equal(CONTACT.linkedin_handle, "linkedin.com/in/bhaskary066525135");
    assert.equal(CONTACT.mobile, "732.983.8495");
    assert.equal(CONTACT.location, "Atlanta, Georgia");
    assert.equal("ssn" in CONTACT, false);
    assert.equal("address" in CONTACT, false);
  });

  it("describes the MCP offering and points at this same /mcp", () => {
    assert.equal(MCP_OFFERING.living_example.url, "https://joshnayarlagadda.com/mcp");
    const phaseIds = MCP_OFFERING.phases.map((phase) => phase.id);
    assert.deepEqual(phaseIds, [
      "intake",
      "task-shaped-tools",
      "two-layer-auth",
      "cloudflare-mcp",
      "inspector",
      "handoff",
    ]);
  });
});
