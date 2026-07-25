export type RumpkeLogoVariant = "mark" | "full";

interface LogoAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

export const LOGO_ASSETS: Record<RumpkeLogoVariant, LogoAsset> = {
  mark: { src: "/imgs/logo-mark.png", width: 1119, height: 1213 },
  full: { src: "/imgs/logo-full.png", width: 3429, height: 1917 },
};
