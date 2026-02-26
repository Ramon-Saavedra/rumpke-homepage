
import NavItem from "@/components/ui/nav-item/NavItem"


const SecondaryNav = () => {
  return (

    <div className="fixed bottom-0 left-0 hidden md:flex w-fit mx-auto items-center py-2 px-3  rounded-tr-md gap-5 bg-primary dark:bg-primary-dark text-white">
      <NavItem href="/dienstleistungen">Dienstleistungen</NavItem>
      <NavItem href="/ueber-uns">Über uns</NavItem>
      <NavItem href="/kontakt">Kontakt</NavItem>
    </div>

  )
}

export default SecondaryNav
