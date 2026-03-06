

import ContactTooltip from "@/components/features/contact-buttom/ContactTooltip";
import NavItem from "@/components/ui/nav-item/NavItem";


const CategoryNav = () => {


  return (
    <nav className="hidden md:flex items-center py-2 bg-secondary dark:bg-secondary-dark sticky top-(--topbar-height) z-30">
      <div className="flex w-full justify-between items-center max-w-xl mx-auto">
        <NavItem href="/auf-karte-erkunden">Auf Karte erkunden</NavItem>
        <NavItem href="/kategorie/haus">Haus</NavItem>
        <NavItem href="/kategorie/wohnung">Wohnung</NavItem>
        <NavItem href="/kategorie/gewerbe">Gewerbe</NavItem>
        <NavItem href="/kategorie/grundstueck">Grundstück</NavItem>
        <NavItem href="/kategorie/sonstige">Sonstige</NavItem>
      </div>
      <div className="mr-4">
        <ContactTooltip />
      </div>
    </nav>

  )
}

export default CategoryNav;
