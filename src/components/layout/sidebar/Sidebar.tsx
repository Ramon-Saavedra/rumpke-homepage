'use client';

import { IoCloseOutline, IoHomeOutline, IoBusinessOutline,  IoMapOutline, IoChatbubbleEllipsesOutline, IoBriefcaseOutline,  IoMailOutline } from "react-icons/io5"
import { IoAlbumsOutline } from "react-icons/io5";
import ContactTooltip from "@/components/features/contact-buttom/ContactTooltip";
import NavItem from "@/components/ui/nav-item/NavItem";


const Sidebar = () => {
  return (
    <div className="hidden">

      <nav>


        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
        />
        <NavItem href="/" icon={<IoAlbumsOutline size={20} />} >Start</NavItem>
        <NavItem href="/auf-karte-erkunden" icon={<IoMapOutline size={20} />} >Auf Karte erkunden</NavItem>
        <NavItem href="/kategorie/haus" icon={<IoHomeOutline size={20} className="mr-2" />}>Haus</NavItem>
        <NavItem href="/kategorie/wohnung" icon={<IoBusinessOutline size={20} className="mr-2" />}>Wohnung</NavItem>
        <NavItem href="/kategorie/gewerbe" icon={<IoBriefcaseOutline size={20} className="mr-2" />}>Gewerbe</NavItem>
        <NavItem href="/kategorie/grundstueck" icon={<IoMapOutline size={20} className="mr-2" />}>Grundstück</NavItem>
        <NavItem href="/kategorie/sonstige" icon={<IoAlbumsOutline size={20} className="mr-2" />}>Sonstige</NavItem>
        <NavItem href="/dienstleistungen" icon={<IoBriefcaseOutline size={20} className="mr-2" />}>Dienstleistungen</NavItem>
        <NavItem href="/ueber-uns" icon={<IoChatbubbleEllipsesOutline size={20} className="mr-2" />}>Über uns</NavItem>
        <NavItem href="/kontakt" icon={<IoMailOutline size={20} className="mr-2" />}>Kontakt</NavItem>
        <div className="mt-6">
          <ContactTooltip />
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
