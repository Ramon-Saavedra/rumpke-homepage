import Link from "next/link";
import { ReactNode } from "react";

interface SocialIconProps {
  href: string;
  ariaLabel: string;
  icon: ReactNode;
  tooltipText: string;
  bgColor: string;
  dataSocial?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

const SocialIcon = ({
  href,
  ariaLabel,
  icon,
  tooltipText,
  bgColor,
  dataSocial,
  target,
  rel = "noopener noreferrer",
  onClick,
  className = "",
}: SocialIconProps) => {
  return (
    <li className={`group relative mx-1.5 hover:text-white ${className}`}>
      <Link
        href={href}
        aria-label={ariaLabel}
        data-social={dataSocial}
        target={target}
        rel={rel}
        className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={onClick}
      >
        {icon}
      </Link>
      <div
        className="pointer-events-none invisible absolute top-[38px] left-1/2 z-50 -translate-x-1/2 rounded-md px-2 py-1 text-xs text-bg-l opacity-0 transition-[opacity,top] duration-[250ms] ease-in-out group-hover:visible group-hover:top-[48px] group-hover:opacity-100"
        style={{ backgroundColor: bgColor }}
      >
        {tooltipText}
      </div>
    </li>
  );
};

export default SocialIcon;
