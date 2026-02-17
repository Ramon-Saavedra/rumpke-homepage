'use client';


import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { IoCloseOutline, IoSearchOutline, IoHomeOutline, IoBusinessOutline, IoDiamondOutline, IoMapOutline, IoChatbubbleEllipsesOutline, IoBriefcaseOutline, IoStarOutline, IoMailOutline, IoChevronForwardOutline } from "react-icons/io5"

import { ThemeSwitch } from "@/context/ThemeSwitsh";
import { IoLanguageOutline } from "react-icons/io5";
import { useUIStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import { IoAlbumsOutline } from "react-icons/io5";
import ContactTooltip from "../contact-buttom/ContactTooltip";



const Sidebar = () => {


  const isSidemenuOpen = useUIStore((state) => state.isSidemenuOpen);
  const closeSidemenu = useUIStore((state) => state.closeSidemenu);
  const [openDienstleistungen, setOpenDienstleistungen] = useState(false);

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
          "fixed p-3 right-0 top-0 w-[80%] h-screen bg-bg-l dark:bg-bg-d z-20 shadow-2xl",
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

        <div className="relative my-12">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2"
          />
          {/* <input
            type="text"
            placeholder="Suche..."
            className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#171717] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          /> */}
        </div>
        <SidebarItem href="/" icon={<IoAlbumsOutline size={20} />} >Start</SidebarItem>
        <SidebarItem href="/auf-karte-erkunden" icon={<IoMapOutline size={20} />} >Auf Karte erkunden</SidebarItem>
        <SidebarItem href="/kategorie/haus" icon={<IoHomeOutline size={20} className="mr-2" />}>Haus</SidebarItem>
        <SidebarItem href="/kategorie/wohnung" icon={<IoBusinessOutline size={20} className="mr-2" />}>Wohnung</SidebarItem>
        <SidebarItem href="/kategorie/gewerbe" icon={<IoBriefcaseOutline size={20} className="mr-2" />}>Gewerbe</SidebarItem>
        <SidebarItem href="/kategorie/grundstueck" icon={<IoMapOutline size={20} className="mr-2" />}>Grundstück</SidebarItem>
        <SidebarItem href="/kategorie/sonstige" icon={<IoAlbumsOutline size={20} className="mr-2" />}>Sonstige</SidebarItem>
        <button
          type="button"
          className="flex items-center mt-4 pl-1 py-1 w-full hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded transition-all cursor-pointer focus:outline-none"
          onClick={() => setOpenDienstleistungen((v) => !v)}
        >
          <IoBriefcaseOutline size={20} className="mr-2" />
          <span>Dienstleistungen</span>
          <IoChevronForwardOutline size={16} className={`ml-auto transition-transform ${openDienstleistungen ? 'rotate-90' : ''}`} />
        </button>
        {openDienstleistungen && (
          <div className="ml-8 mt-1 space-y-1">
            <SidebarItem href="/dienstleistungen/verkauf-vermietung" icon={<IoChevronForwardOutline size={14} className="mr-2 text-primary/80" />}>
              Verkauf & Vermietung
            </SidebarItem>
            <SidebarItem href="/dienstleistungen/immobilienbewertung" icon={<IoChevronForwardOutline size={14} className="mr-2 text-primary/80" />}>
              Immobilienbewertung
            </SidebarItem>
            <SidebarItem href="/dienstleistungen/immobilien-kauf" icon={<IoChevronForwardOutline size={14} className="mr-2 text-primary/80" />}>
              Immobilienkauf
            </SidebarItem>
          </div>
        )}
        <SidebarItem href="/ueber-uns" icon={<IoChatbubbleEllipsesOutline size={20} className="mr-2" />}>Über uns</SidebarItem>
        <SidebarItem href="/kontakt" icon={<IoMailOutline size={20} className="mr-2" />}>Kontakt</SidebarItem>
        <SidebarItem href="/blog" icon={<IoDiamondOutline size={20} className="mr-2" />}>Blog</SidebarItem>
        <div className="flex py-1 mt-3 justify-start items-center hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded">
          <ThemeSwitch />
        </div>
        <div className="mt-6">
          <ContactTooltip />
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
