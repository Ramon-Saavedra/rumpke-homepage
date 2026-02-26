

import ContactTooltip from "@/components/features/contact-buttom/ContactTooltip";
import NavItem from "@/components/ui/nav-item/NavItem";


const CategoryNav = () => {


  return (
    <div className="hidden md:flex items-center py-2 bg-secondary dark:bg-secondary-dark mb-12">
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
    </div>

  )
}

export default CategoryNav;
