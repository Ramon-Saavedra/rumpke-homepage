

const CompanyTitle = () => {
  return (
    <div>
      <span
        className="font-semibold text-xs fixed bottom-2 right-2 select-none"
        style={{
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-dark), var(--color-primary))',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'rumpke-company-glow 8s linear infinite',
          fontWeight: 600,
          letterSpacing: '0.04em',
          borderRadius: '0.5em',
          display: 'inline-block',
        }}
      >
        Rumpke Immobilien
        <style>
          {`
            @keyframes rumpke-company-glow {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }
          `}
        </style>
      </span>
    </div>
  )
}

export default CompanyTitle
