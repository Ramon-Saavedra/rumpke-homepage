
import NavItem from "@/components/ui/nav-item/NavItem"


const SecondaryNav = () => {
  return (

    <div className=" hidden md:flex justify-center mx-auto items-center py-3 px-3 text-white gap-5 bg-secondary dark:bg-secondary-dark shadow">
      <NavItem href="/dienstleistungen">Dienstleistungen</NavItem>
      <NavItem href="/ueber-uns">Über uns</NavItem>
      <NavItem href="/kontakt">Kontakt</NavItem>
    </div>

  )
}

export default SecondaryNav
