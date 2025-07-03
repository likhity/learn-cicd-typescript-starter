import { describe, it, expect } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("returns the API key if header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };

    const result = getAPIKey(headers);
    expect(result).toBe("my-secret-key");
  });

  it("returns null if authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  it("returns null if authorization does not start with 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey some-token",
    };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  it("returns null if authorization header is malformed", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKeyOnlyNoSpace",
    };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  it("is case-sensitive with 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey lower-case-should-fail",
    };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });
});
