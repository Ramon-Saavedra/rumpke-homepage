'use client';

import { useEffect } from 'react';
import { IoCloseOutline, IoHomeOutline, IoBusinessOutline, IoMapOutline, IoChatbubbleEllipsesOutline, IoBriefcaseOutline, IoMailOutline, IoAlbumsOutline } from 'react-icons/io5';
import ContactTooltip from '@/components/features/contact-buttom/ContactTooltip';
import NavItem from '@/components/ui/nav-item/NavItem';
import { useUiStore } from '@/store/ui/ui-store';

const Sidebar = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div
        data-testid="sidebar-overlay"
        className={`fixed left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-40 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        style={{
          top: 'var(--topbar-height)',
          transition: 'opacity 300ms ease-in-out, visibility 300ms ease-in-out'
        }}
        onClick={closeSidebar}
        aria-hidden="true"
      />
      <aside
        data-testid="sidebar"
        className={`fixed right-0 w-4/5 max-w-sm bg-background dark:bg-background-dark shadow-2xl z-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{
          top: 'var(--topbar-height)',
          height: 'calc(100vh - var(--topbar-height))',
          transition: 'transform 300ms ease-in-out'
        }}
        aria-label="Navigation sidebar"
      >
        <nav className="flex flex-col h-full p-6 border-l bg-secondary dark:bg-secondary-dark border-primary">
          <button
            data-testid="close-sidebar-btn"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="absolute top-5 right-5 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary-dark/20 rounded p-1"
          >
            <IoCloseOutline size={30} className="text-text dark:text-text-dark" />
          </button>

          <div className="mb-8" />

          <NavItem href="/" icon={<IoAlbumsOutline size={20} />} onClick={closeSidebar}>
            Start
          </NavItem>
          <NavItem href="/auf-karte-erkunden" icon={<IoMapOutline size={20} />} onClick={closeSidebar}>
            Auf Karte erkunden
          </NavItem>
          <NavItem href="/kategorie/haus" icon={<IoHomeOutline size={20} />} onClick={closeSidebar}>
            Haus
          </NavItem>
          <NavItem href="/kategorie/wohnung" icon={<IoBusinessOutline size={20} />} onClick={closeSidebar}>
            Wohnung
          </NavItem>
          <NavItem href="/kategorie/gewerbeimmobilien" icon={<IoBriefcaseOutline size={20} />} onClick={closeSidebar}>
            Gewerbeimmobilien
          </NavItem>
          <NavItem href="/kategorie/grundstueck" icon={<IoMapOutline size={20} />} onClick={closeSidebar}>
            Grundstück
          </NavItem>
          <NavItem href="/kategorie/sonstige" icon={<IoAlbumsOutline size={20} />} onClick={closeSidebar}>
            Sonstige
          </NavItem>
          <NavItem href="/dienstleistungen" icon={<IoBriefcaseOutline size={20} />} onClick={closeSidebar}>
            Dienstleistungen
          </NavItem>
          <NavItem href="/ueber-uns" icon={<IoChatbubbleEllipsesOutline size={20} />} onClick={closeSidebar}>
            Über uns
          </NavItem>
          <NavItem href="/kontakt" icon={<IoMailOutline size={20} />} onClick={closeSidebar}>
            Kontakt
          </NavItem>

          <div className="mt-auto mb-6">
            <ContactTooltip />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
