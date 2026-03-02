'use client';


import Link from "next/link";
import { ReactNode, cloneElement, ReactElement, isValidElement } from "react";

interface NavItemProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;

}

const NavItem = ({ href, icon, children }: NavItemProps) => {


  const iconWithMargin = icon && isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ className?: string }>, {
      className: `${(icon as ReactElement<{ className?: string }>).props?.className || ''} mr-2`
    })
    : icon;
  return (
    <Link
      href={href}
      className={`flex items-center text-xs px-1 mb-4 md:mb-0 font-bold hover:text-cyan-500 dark:hover:text-cyan-700`}
    >
      {iconWithMargin}
      {children}
    </Link>
  );
}

export default NavItem;

