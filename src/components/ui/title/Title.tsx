

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className}`}>
      <h1 className="antialiased py-1">{title}</h1>
      {subtitle && <h2 className="antialiased">{subtitle}</h2>}
    </div>
  )
}


