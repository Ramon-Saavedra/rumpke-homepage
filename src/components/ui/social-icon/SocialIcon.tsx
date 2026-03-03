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
    <li className={`icon-content hover:text-white  ${className}`}>
      <Link
        href={href}
        aria-label={ariaLabel}
        data-social={dataSocial}
        target={target}
        rel={rel}
        className="link"
        onClick={onClick}
      >
        {icon}
      </Link>
      <div className={`tooltip text-xs text-bg-l py-1 px-2 rounded`} style={{ backgroundColor: bgColor }}>
        {tooltipText}
      </div>
    </li>
  )
}

export default SocialIcon
