import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyGallery from "./PropertyGallery";
import type { PropertyImageDto } from "@/types/property-api";

jest.mock("lucide-react", () => ({
  Images: () => null,
  Maximize2: () => null,
  ChevronLeft: () => null,
  ChevronRight: () => null,
  X: () => null,
}));

function makeImages(count: number): readonly PropertyImageDto[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `img-${index}`,
    url: `https://image.onoffice.de/photo${index}.jpg`,
    title: `Bild ${index}`,
    type: "Foto",
    position: index,
  }));
}

describe("PropertyGallery", () => {
  it("renders a placeholder when there are no images", () => {
    render(<PropertyGallery images={[]} alt="Stadtvilla" />);

    expect(
      screen.getByRole("img", {
        name: "Für dieses Objekt sind aktuell keine Fotos hinterlegt",
      }),
    ).toBeInTheDocument();
  });

  it("labels the trigger with the image count", () => {
    render(<PropertyGallery images={makeImages(6)} alt="Stadtvilla" />);

    expect(
      screen.getByRole("button", { name: "Alle Bilder ansehen (6)" }),
    ).toBeInTheDocument();
  });

  it("offers a zoom trigger for a single image", () => {
    render(<PropertyGallery images={makeImages(1)} alt="Stadtvilla" />);

    expect(
      screen.getByRole("button", { name: "Bild vergrößern" }),
    ).toBeInTheDocument();
  });

  it("opens the lightbox on the selected image and closes it again", () => {
    render(<PropertyGallery images={makeImages(6)} alt="Stadtvilla" />);

    fireEvent.click(
      screen.getAllByRole("button", { name: "Bild 3 von 6 vergrößern" })[0],
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("3 / 6")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Galerie schließen" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("steps through images with the arrow keys and closes on escape", () => {
    render(<PropertyGallery images={makeImages(3)} alt="Stadtvilla" />);

    fireEvent.click(
      screen.getByRole("button", { name: "Titelbild vergrößern" }),
    );
    expect(screen.getByText("1 / 3")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("3 / 3")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByText("1 / 3")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
