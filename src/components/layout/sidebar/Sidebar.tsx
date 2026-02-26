'use client';


import SidebarItem from "@/components/ui/nav-item/NavItem";
import { IoCloseOutline, IoSearchOutline, IoHomeOutline, IoBusinessOutline, IoDiamondOutline, IoMapOutline, IoChatbubbleEllipsesOutline, IoBriefcaseOutline, IoStarOutline, IoMailOutline } from "react-icons/io5"

import { useUIStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import { IoAlbumsOutline } from "react-icons/io5";
import ContactTooltip from "@/components/features/contact-buttom/ContactTooltip";
import NavItem from "@/components/ui/nav-item/NavItem";



const Sidebar = () => {


  const isSidemenuOpen = useUIStore((state) => state.isSidemenuOpen);
  const closeSidemenu = useUIStore((state) => state.closeSidemenu);

  return (
    <div className="md:hidden">

      {
        isSidemenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
        )
      }

      {
        isSidemenuOpen && (
          <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xs" />
        )
      }


      <nav className={
        clsx(
          "fixed p-3 right-0 top-0 w-[80%] h-screen bg-bg-l dark:bg-bg-d z-20 shadow-2xl pt-20",
          {
            "translate-x-full": !isSidemenuOpen,
          }
        )
      }>


        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSidemenu}
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
