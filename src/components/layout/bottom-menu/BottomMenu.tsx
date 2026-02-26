import Link from "next/link"


const Bottomwonungenu = () => {
  return (
    <nav className="hidden w-full sm:hidden fixed top-0 right-1/2 transform translate-x-1/2 bg-primary dark:bg-primary-dark text-white  justify-end items-center">

      <Link className="p-2 mr-2 text-xs" href={'/dienstleistungen'}>
        Dienstleistungen
      </Link>
      <Link className="p-2 mr-2 text-xs" href={'/blog'}>
        Blog
      </Link>
      <Link className="p-2 mr-2 text-xs" href={'/ueber-uns'}>
        Über uns
      </Link>
      <Link className="p-2 mr-2 text-xs" href={'/immobilien-bewerten'}>
        Immobilienbewertung
      </Link>
      <Link className="p-2 mr-2 text-xs" href={'/kontakt'}>
        Kontakt
      </Link>

    </nav>
  )
}

export default Bottomwonungenu
