import {
  getApiUrl,
  submitContactForm,
  API_ENDPOINTS,
  LEADS_ENDPOINTS,
} from "./api-client";
import { ContactSubmitError } from "@/types/contact";
import type { ContactFormPayload } from "@/types/contact";

const validPayload: ContactFormPayload = {
  firstName: "Anna",
  lastName: "Müller",
  email: "anna@example.de",
  message: "Das ist eine Testnachricht für das Formular.",
  consentAccepted: true,
};

function makeFetchResponse(status: number, body: unknown = {}): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

describe("getApiUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("uses NEXT_PUBLIC_API_URL when defined", () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com/api";
    expect(getApiUrl(API_ENDPOINTS.PROPERTIES)).toBe(
      "https://api.example.com/api/v1/properties",
    );
  });

  it("falls back to localhost:3001 when env is not defined", () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    expect(getApiUrl(LEADS_ENDPOINTS.CONTACT)).toBe(
      "http://localhost:3001/api/v1/leads/contact",
    );
  });

  it("constructs URL with property details endpoint", () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.test.com/api";
    expect(getApiUrl(API_ENDPOINTS.PROPERTIES)).toBe(
      "https://api.test.com/api/v1/properties",
    );
  });
});

describe("submitContactForm", () => {
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("resolves without throwing when response is 200 ok", async () => {
    mockFetch.mockResolvedValueOnce(makeFetchResponse(200));
    await expect(submitContactForm(validPayload)).resolves.toBeUndefined();
  });

  it("calls fetch with POST method and JSON body", async () => {
    mockFetch.mockResolvedValueOnce(makeFetchResponse(200));
    await submitContactForm(validPayload);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      }),
    );
  });

  it("throws ContactSubmitError with statusCode 0 on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    try {
      await submitContactForm(validPayload);
      throw new Error("Expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      expect((err as ContactSubmitError).statusCode).toBe(0);
    }
  });

  it("throws ContactSubmitError with fieldErrors on 400 custom format", async () => {
    mockFetch.mockResolvedValueOnce(
      makeFetchResponse(400, {
        statusCode: 400,
        message: "Validation failed",
        fieldErrors: { email: ["Ungültige E-Mail-Adresse"] },
      }),
    );
    try {
      await submitContactForm(validPayload);
      throw new Error("Expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      expect((err as ContactSubmitError).statusCode).toBe(400);
      expect((err as ContactSubmitError).fieldErrors).toEqual({
        email: ["Ungültige E-Mail-Adresse"],
      });
    }
  });

  it("parses fieldErrors from NestJS default array message format on 400", async () => {
    mockFetch.mockResolvedValueOnce(
      makeFetchResponse(400, {
        statusCode: 400,
        message: ["email must be an email", "firstName must not be empty"],
      }),
    );
    try {
      await submitContactForm(validPayload);
      throw new Error("Expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      const fieldErrors = (err as ContactSubmitError).fieldErrors;
      expect(fieldErrors).toBeDefined();
      expect(fieldErrors?.email).toContain("email must be an email");
      expect(fieldErrors?.firstName).toContain("firstName must not be empty");
    }
  });

  it("throws ContactSubmitError with statusCode 429 on rate limit", async () => {
    mockFetch.mockResolvedValueOnce(makeFetchResponse(429, {}));
    try {
      await submitContactForm(validPayload);
      throw new Error("Expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      expect((err as ContactSubmitError).statusCode).toBe(429);
      expect((err as ContactSubmitError).globalError).toContain("Zu viele");
    }
  });

  it("throws ContactSubmitError with statusCode 500 on server error", async () => {
    mockFetch.mockResolvedValueOnce(makeFetchResponse(500, {}));
    try {
      await submitContactForm(validPayload);
      throw new Error("Expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(ContactSubmitError);
      expect((err as ContactSubmitError).statusCode).toBe(500);
    }
  });

  it("throws ContactSubmitError when res.json() fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as Response);
    await expect(submitContactForm(validPayload)).rejects.toBeInstanceOf(
      ContactSubmitError,
    );
  });
});
