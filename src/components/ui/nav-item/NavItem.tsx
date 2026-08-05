import Link from "next/link";
import { ReactNode, cloneElement, ReactElement, isValidElement } from "react";

interface NavItemProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const NavItem = ({
  href,
  icon,
  children,
  onClick,
  target,
  rel,
}: NavItemProps) => {
  const iconWithMargin =
    icon && isValidElement(icon)
      ? cloneElement(icon as ReactElement<{ className?: string }>, {
          className: `${(icon as ReactElement<{ className?: string }>).props?.className || ""} mr-2`,
        })
      : icon;
  return (
    <Link
      href={href}
      onClick={onClick}
      className="mb-4 flex min-h-11 items-center rounded-md px-3 text-xs font-bold transition-colors hover:text-primary md:mb-0"
      {...(target ? { target } : {})}
      {...(rel ? { rel } : {})}
    >
      {iconWithMargin}
      {children}
    </Link>
  );
};

export default NavItem;
