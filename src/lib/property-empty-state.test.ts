import {
  categoryEmptyStateCopy,
  SERVICE_ERROR_COPY,
} from "./property-empty-state";
import { VALID_TYPES } from "@/types/property-types";

describe("categoryEmptyStateCopy", () => {
  describe("category routes without a transaction type", () => {
    it("names the property type in the headline", () => {
      expect(categoryEmptyStateCopy("haeuser").headline).toBe(
        "Aktuell keine Häuser verfügbar",
      );
    });

    it("uses the neutral category description", () => {
      expect(categoryEmptyStateCopy("haeuser").body).toBe(
        "Derzeit haben wir keine passenden Objekte in dieser Kategorie im Angebot. Gern unterstützen wir Sie persönlich bei Ihrer Suche.",
      );
    });
  });

  describe("purchase routes", () => {
    it("names property and transaction type", () => {
      expect(categoryEmptyStateCopy("wohnungen", "kauf").headline).toBe(
        "Aktuell keine Wohnungen zum Kauf verfügbar",
      );
      expect(categoryEmptyStateCopy("grundstueck", "kauf").headline).toBe(
        "Aktuell keine Grundstücke zum Kauf verfügbar",
      );
    });

    it("uses the purchase description", () => {
      expect(categoryEmptyStateCopy("wohnungen", "kauf").body).toContain(
        "zum Kauf im Angebot",
      );
    });
  });

  describe("rental routes", () => {
    it("names property and transaction type", () => {
      expect(categoryEmptyStateCopy("wohnungen", "miete").headline).toBe(
        "Aktuell keine Wohnungen zur Miete verfügbar",
      );
    });

    it("uses the rental description", () => {
      expect(categoryEmptyStateCopy("wohnungen", "miete").body).toContain(
        "zur Miete im Angebot",
      );
    });
  });

  it("produces copy for every valid property type", () => {
    for (const type of VALID_TYPES) {
      for (const marketingType of ["kauf", "miete", undefined] as const) {
        const copy = categoryEmptyStateCopy(type, marketingType);
        expect(copy.headline).toMatch(/^Aktuell keine \S.*verfügbar$/);
        expect(copy.body.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the service error copy distinct from zero-result copy", () => {
    expect(SERVICE_ERROR_COPY.headline).not.toContain("Aktuell keine");
    expect(SERVICE_ERROR_COPY.body).not.toBe(
      categoryEmptyStateCopy("haeuser").body,
    );
  });
});
