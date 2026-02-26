'use client';

import { useUIStore } from "@/store/ui/ui-store";
import Link from "next/link";
import { ReactNode, cloneElement, ReactElement, isValidElement } from "react";

interface NavItemProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;

}

const NavItem = ({ href, icon, children }: NavItemProps) => {

  const closeSidemenu = useUIStore((state) => state.closeSidemenu);
  const iconWithMargin = icon && isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ className?: string }>, {
      className: `${(icon as ReactElement<{ className?: string }>).props?.className || ''} mr-2`
    })
    : icon;
  return (
    <Link
      onClick={closeSidemenu}
      href={href}
      className={`flex items-center text-xs px-1 mb-4 md:mb-0 `}
    >
      {iconWithMargin}
      {children}
    </Link>
  );
}

export default NavItem;

