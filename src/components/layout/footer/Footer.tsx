import Link from "next/link"


const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs py-6">

      <Link
      href={'/'}
      >
        <span className="font-bold">Rumpke Immobilien </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

    </div>
  )
}

export default Footer
