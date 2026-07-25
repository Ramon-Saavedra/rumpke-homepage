import Image from "next/image";
import { LOGO_ASSETS } from "@/components/branding/logo/logo-assets";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  readonly label: string;
  readonly className?: string;
}

export default function ImagePlaceholder({
  label,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center overflow-hidden bg-Bghover-l dark:bg-Bghover-d",
        className,
      )}
    >
      <Image
        src={LOGO_ASSETS.full.src}
        alt=""
        aria-hidden="true"
        width={LOGO_ASSETS.full.width}
        height={LOGO_ASSETS.full.height}
        sizes="220px"
        className="h-auto w-[55%] min-w-24 max-w-55 opacity-40 dark:opacity-40 dark:brightness-200"
      />
    </div>
  );
}
