'use client';


import Link from "next/link";
import { ReactNode, cloneElement, ReactElement, isValidElement } from "react";

interface NavItemProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

const NavItem = ({ href, icon, children, onClick }: NavItemProps) => {


  const iconWithMargin = icon && isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ className?: string }>, {
      className: `${(icon as ReactElement<{ className?: string }>).props?.className || ''} mr-2`
    })
    : icon;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center text-xs px-1 mb-4 md:mb-0 text-white font-extrabold hover:text-primary`}
    >
      {iconWithMargin}
      {children}
    </Link>
  );
}

export default NavItem;

