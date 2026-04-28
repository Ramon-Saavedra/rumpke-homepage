

import ContactTooltip from "@/components/features/contact-buttom/ContactTooltip";
import NavItem from "@/components/ui/nav-item/NavItem";

const CategoryNav = () => {
  return (
    <nav
      aria-label="Property categories"
      className="sticky top-(--topbar-height) z-30 hidden bg-secondary py-2 text-white dark:bg-secondary-dark md:flex"
    >
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-4">
        <div aria-hidden="true" />
        <div className="flex max-w-xl items-center justify-center gap-1 lg:gap-2">
          <NavItem href="/kategorie/haeuser">Häuser</NavItem>
          <NavItem href="/kategorie/wohnungen">Wohnungen</NavItem>
          <NavItem href="/kategorie/gewerbeimmobilien">Gewerbeimmobilien</NavItem>
          <NavItem href="/kategorie/grundstueck">Grundstück</NavItem>
          <NavItem href="/kontakt">Kontakt</NavItem>
          <NavItem href="https://www.ichschenkedirwas.de/" target="_blank" rel="noopener noreferrer">Werde Tippgeber</NavItem>
        </div>
        <div className="mr-4 justify-self-end">
          <ContactTooltip />
        </div>
      </div>
    </nav>
  )
}

export default CategoryNav;
