

import Link from "next/link";
import { ReactNode } from "react";
import { OPERATION_TYPE_COLOR, OperationType } from '@/store/ui/ui-store';

interface CategoryButtonProps {
  name: string;
  href: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}


const CategoryButton = ({ name, href, color = "border-l-4 border-primary", className, style, onClick }: CategoryButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      window.location.href = href;
    }
  };
  return (
    <Link
      href={href}
      className={`
        relative flex items-center justify-center gap-2 px-4 py-1.5
        text-sm font-semibold tracking-wide
        bg-transparent
        transition-all duration-150
        focus:outline-none
        group
        ${className || ""}
      `}
      style={{
        position: 'relative',
        color:
          name === 'Kauf'
            ? OPERATION_TYPE_COLOR[OperationType.SELL]
            : name === 'Miete'
              ? OPERATION_TYPE_COLOR[OperationType.RENT]
              : 'var(--color-primary)',
        ...style
      }}
      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={e => (e.currentTarget.style.color =
        name === 'Kauf'
          ? OPERATION_TYPE_COLOR[OperationType.SELL]
          : name === 'Miete'
            ? OPERATION_TYPE_COLOR[OperationType.RENT]
            : 'var(--color-primary)')}
      onClick={handleClick}
    >
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderTopLeftRadius: 1,
          background:
            name === 'Kauf'
              ? OPERATION_TYPE_COLOR[OperationType.SELL]
              : name === 'Miete'
                ? OPERATION_TYPE_COLOR[OperationType.RENT]
                : 'var(--color-primary)',
          display: 'inline-block',
          zIndex: 2,
        }}
      />
      {name}
    </Link>
  );
}

export default CategoryButton;
