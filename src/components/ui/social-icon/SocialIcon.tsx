import Link from 'next/link'
import { ReactNode } from 'react'

interface SocialIconProps {
  href: string
  ariaLabel: string
  icon: ReactNode
  tooltipText: string
  bgColor: string
  dataSocial?: string
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
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
  className = ''
}: SocialIconProps) => {
  return (
    <li className={`group relative mx-1.5 hover:text-white ${className}`}>
      <Link
        href={href}
        aria-label={ariaLabel}
        data-social={dataSocial}
        target={target}
        rel={rel}
        className="flex justify-center items-center"
        onClick={onClick}
      >
        {icon}
      </Link>
      <div
        className="absolute top-[38px] left-1/2 -translate-x-1/2 opacity-0 invisible transition-[opacity,top] duration-[250ms] ease-in-out pointer-events-none z-50 text-xs text-bg-l py-1 px-2 rounded group-hover:opacity-100 group-hover:visible group-hover:top-[48px]"
        style={{ backgroundColor: bgColor }}
      >
        {tooltipText}
      </div>
    </li>
  )
}

export default SocialIcon
