
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

const NavItem = ({ href, icon, children, onClick, target, rel }: NavItemProps) => {


  const iconWithMargin = icon && isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ className?: string }>, {
      className: `${(icon as ReactElement<{ className?: string }>).props?.className || ''} mr-2`
    })
    : icon;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center text-xs px-2 mb-4 md:mb-0 font-extrabold hover:text-primary hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d rounded transition-colors`}
      {...(target ? { target } : {})}
      {...(rel ? { rel } : {})}
    >
      {iconWithMargin}
      {children}
    </Link>
  );
}

export default NavItem;

