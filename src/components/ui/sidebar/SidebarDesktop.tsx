'use client';


import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { IoHomeOutline, IoBusinessOutline, IoMapOutline, IoChatbubbleEllipsesOutline, IoBriefcaseOutline, IoStarOutline, IoMailOutline, IoAlbumsOutline, IoChevronForwardOutline } from "react-icons/io5"
import { ThemeSwitch } from "@/context/ThemeSwitsh";
import { IoLanguageOutline } from "react-icons/io5";
import { Title } from "../title/Title";
import Link from "next/link";
import RumpkeLogo from "../logo/RumpkeLogo";




const SidebarDesktop = () => {


  const [openDienstleistungen, setOpenDienstleistungen] = useState(false);

  return (
    <nav className="hidden md:block h-screen sticky top-0 w-full border-r dark:border-primary-dark/30 border-primary/30 ">
      <div className="h-full">
        <Link href={'/'}>
          <div className="p-4">
            <RumpkeLogo aria-label="Rumpke Immobilien Logo" />
          </div>
        </Link>
        <div className="h-full flex flex-col  items-start px-4 space-y-2">
          <div className="sticky top-0 z-20 ">
            <Title
              title="Rumpke Immobilien"
              subtitle="- Mehr als nur 4 Wände -"
              className='flex-1  text-primary'
            />
          </div>

          <SidebarItem href="/" icon={<IoAlbumsOutline size={20} />} >Start</SidebarItem>
          <SidebarItem href="/auf-karte-erkunden" icon={<IoMapOutline size={20} />} >Auf Karte erkunden</SidebarItem>
          <SidebarItem href="/kategorie/haus" icon={<IoHomeOutline size={20} />} >Haus</SidebarItem>
          <SidebarItem href="/kategorie/wohnung" icon={<IoBusinessOutline size={20} />} >Wohnung</SidebarItem>
          <SidebarItem href="/kategorie/gewerbe" icon={<IoBriefcaseOutline size={20} />} >Gewerbe</SidebarItem>
          <SidebarItem href="/kategorie/grundstueck" icon={<IoMapOutline size={20} />} >Grundstück</SidebarItem>
          <SidebarItem href="/kategorie/sonstige" icon={<IoAlbumsOutline size={20} />} >Sonstige</SidebarItem>
          <button
            type="button"
            className="flex items-center mt-4 pl-1 py-1 w-full hover:bg-primary/50 hover:text-black dark:hover:text-white dark:hover:bg-primary-dark/50 rounded transition-all cursor-pointer focus:outline-none"
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
          <SidebarItem href="/ueber-uns" icon={<IoChatbubbleEllipsesOutline size={20} />} >Über uns</SidebarItem>
          <SidebarItem href="/kontakt" icon={<IoMailOutline size={20} />} >Kontakt</SidebarItem>
          <div className="flex py-1 mt-3 justify-start items-center hover:bg-primary/50 hover:text-black w-full dark:hover:text-white dark:hover:bg-primary-dark/50 rounded">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>

  )
}

export default SidebarDesktop;
