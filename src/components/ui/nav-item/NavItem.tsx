'use client';

import { useUIStore } from "@/store/ui/ui-store";
import Link from "next/link";
import { ReactNode, cloneElement } from "react";

interface NavItemProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  color?: string;
  mt?: string;
}

const NavItem = ({ href, icon, children, color, mt }: NavItemProps) => {

  const closeSidemenu = useUIStore((state) => state.closeSidemenu);
  const iconWithMargin = icon && typeof icon === 'object' && 'type' in icon
    ? cloneElement(icon as any, { className: `${(icon as any).props?.className || ''} mr-2` })
    : icon;
  return (
    <Link
      onClick={closeSidemenu}
      href={href}
      className={`flex items-center hover:text-primary text-xs px-1 mb-4 md:mb-0`}
    >
      {iconWithMargin}
      {children}
    </Link>
  );
}

export default NavItem;
