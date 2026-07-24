import Image from "next/image";
import Link from "next/link";

type RumpkeLogoVariant = "mark" | "full";

type RumpkeLogoProps = {
  /** `mark` = double-roof glyph (mobile/tablet); `full` = wordmark lockup (laptop+). */
  variant?: RumpkeLogoVariant;
  /** Flatten to 100% white for dark/over-video contexts. Never tinted, never shadowed. */
  onDark?: boolean;
  /** Height utility class(es), e.g. `h-6`. Width follows the aspect ratio. */
  className?: string;
  priority?: boolean;
};

const ASSETS: Record<RumpkeLogoVariant, { src: string; width: number; height: number }> = {
  mark: { src: "/imgs/logo-mark.png", width: 1119, height: 1213 },
  full: { src: "/imgs/logo-full.png", width: 3429, height: 1917 },
};

export default function RumpkeLogo({
  variant = "full",
  onDark = false,
  className,
  priority = false,
}: RumpkeLogoProps) {
  const asset = ASSETS[variant];

  return (
    <Link
      href="/"
      aria-label="Rumpke Immobilien — Startseite"
      className={`items-center ${className ?? ""}`}
    >
      <Image
        src={asset.src}
        alt="Rumpke Immobilien Logo"
        width={asset.width}
        height={asset.height}
        priority={priority}
        sizes={variant === "full" ? "(max-width: 1024px) 0px, 320px" : "48px"}
        className="h-full w-auto"
        style={onDark ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    </Link>
  );
}
