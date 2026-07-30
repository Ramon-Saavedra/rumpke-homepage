import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyInquiryPanel from "./PropertyInquiryPanel";
import PropertyInquiryProvider from "./PropertyInquiryContext";
import { submitContactForm } from "@/lib/api-client";
import type { PropertyDetailDto } from "@/types/property-api";

jest.mock("lucide-react", () => ({
  CheckCircle: () => null,
  Loader2: () => null,
  Send: () => null,
}));

jest.mock("@/lib/api-client", () => ({
  submitContactForm: jest.fn(),
}));

const submitContactFormMock = submitContactForm as jest.MockedFunction<
  typeof submitContactForm
>;

const property: PropertyDetailDto = {
  id: "2026-0006",
  title: "Klassische Stadtvilla",
  description: null,
  locationDescription: null,
  furnishingDescription: null,
  price: {
    salePrice: 1890000,
    coldRent: null,
    warmRent: null,
    hoaFee: null,
    additionalCosts: null,
    brokerageFree: false,
  },
  area: { livingArea: null, usableArea: null, plotArea: null },
  rooms: { total: null, bedrooms: null, bathrooms: null },
  address: {
    city: null,
    zip: null,
    street: null,
    houseNumber: null,
    country: null,
    latitude: null,
    longitude: null,
  },
  propertyType: null,
  propertySubType: null,
  marketingType: "kauf",
  yearBuilt: null,
  floor: null,
  totalFloors: null,
  condition: null,
  balcony: false,
  terrace: false,
  energyCertificateType: null,
  images: [],
};

function renderPanel() {
  return render(
    <PropertyInquiryProvider>
      <PropertyInquiryPanel property={property} />
    </PropertyInquiryProvider>,
  );
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/Vorname/), {
    target: { value: "Anna" },
  });
  fireEvent.change(screen.getByLabelText(/Nachname/), {
    target: { value: "Muster" },
  });
  fireEvent.change(screen.getByLabelText(/E-Mail-Adresse/), {
    target: { value: "anna@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Telefonnummer/), {
    target: { value: "+49123456789" },
  });
  fireEvent.click(screen.getByLabelText(/Datenschutzerklärung/));
}

describe("PropertyInquiryPanel", () => {
  beforeEach(() => {
    submitContactFormMock.mockReset();
    submitContactFormMock.mockResolvedValue(undefined);
  });

  it("names the property the inquiry refers to", () => {
    renderPanel();
    expect(
      screen.getByText("Klassische Stadtvilla · Ref. 2026-0006"),
    ).toBeInTheDocument();
  });

  it("prefills the viewing message and swaps it with the request type", () => {
    renderPanel();
    const message = screen.getByLabelText(
      /Ihre Nachricht/,
    ) as HTMLTextAreaElement;

    expect(message.value).toContain("Besichtigungstermin");

    fireEvent.click(screen.getByRole("button", { name: "Exposé" }));

    expect(message.value).toContain("Exposé");
    expect(screen.getByRole("button", { name: "Exposé" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("submits the inquiry with the property as source page", async () => {
    renderPanel();
    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: /Anfrage senden/ }));

    await waitFor(() => {
      expect(submitContactFormMock).toHaveBeenCalledTimes(1);
    });
    expect(submitContactFormMock.mock.calls[0][0]).toMatchObject({
      firstName: "Anna",
      lastName: "Muster",
      email: "anna@example.com",
      consentAccepted: true,
      sourcePage: "/objekt/2026-0006",
    });

    expect(
      await screen.findByText("Vielen Dank für Ihre Anfrage"),
    ).toBeInTheDocument();
  });

  it("keeps the form open and reports missing consent", async () => {
    renderPanel();
    fireEvent.change(screen.getByLabelText(/Vorname/), {
      target: { value: "Anna" },
    });
    fireEvent.change(screen.getByLabelText(/Nachname/), {
      target: { value: "Muster" },
    });
    fireEvent.change(screen.getByLabelText(/E-Mail-Adresse/), {
      target: { value: "anna@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Anfrage senden/ }));

    expect(
      await screen.findByText("Bitte stimmen Sie der Datenschutzerklärung zu."),
    ).toBeInTheDocument();
    expect(submitContactFormMock).not.toHaveBeenCalled();
  });
});
