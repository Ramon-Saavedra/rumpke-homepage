'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { IoLogoInstagram, IoLogoFacebook, IoLogoWhatsapp, IoMailOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

const ContactTooltip = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return (
    <StyledWrapper>
      <ul className="flex justify-around example-1  pt-1 text-bg-l dark:text-card-text-d bg-primary dark:bg-primary-dark py-1 rounded-b px-2 dark:hover:shadow-primary hover:shadow-primary-dark shadow-md transform " >
        <li className="icon-content">
          <Link
            href="https://www.facebook.com/profile.php?id=61572884870790"
            aria-label="Facebook"
            data-social="facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <IoLogoFacebook size={20} className='hover:bg-[#1877F3] rounded' />
          </Link>
          <div className="tooltip text-xs text-bg-l dark:text-admin-border-l bg-[#1877F3] py-1 px-2 rounded">Facebook</div>
        </li>
        <li className="icon-content">
          <Link
            href="https://wa.me/491723244468"
            aria-label="Whatsapp"
            data-social="whatsapp"
            rel="noopener noreferrer"
            target="_blank"
            className="link"
          >
            <IoLogoWhatsapp size={20} className='hover:bg-[#25D366] rounded' />
          </Link>
          <div className="tooltip text-xs text-bg-l dark:text-admin-border-l bg-[#25D366] py-1 px-2 rounded">WhatsApp</div>
        </li>
        <li className="icon-content hidden md:block">
          <Link
            href="/#leadform"
            aria-label="Email"
            data-social="email"
            rel="noopener noreferrer"
            className="link "
            scroll={false}
            onClick={e => {
              if (window.location.pathname === '/' || window.location.pathname === '/index') {
                e.preventDefault();
                const el = document.getElementById('leadform');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            <IoMailOutline size={20} className='hover:bg-admin-border-d rounded' />
          </Link>
          <div className="tooltip text-xs text-bg-l dark:text-admin-border-l bg-admin-border-d py-1 px-2 rounded">Kontakt</div>
        </li>
        <li className="icon-content">
          <Link
            href="https://www.instagram.com/rumpkeimmobilien/"
            aria-label="Instagram"
            data-social="instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <IoLogoInstagram size={20} className='hover:bg-[#E4405F] rounded' />
          </Link>
          <div className="tooltip text-xs text-bg-l dark:text-admin-border-l bg-[#E4405F] py-1 px-2 rounded">Instagram</div>
        </li>
      </ul>
    </StyledWrapper>
  );
}



const StyledWrapper = styled.div`

  .example-1 .icon-content {
    margin: 0 6px;
    position: relative;
  }

  .example-1 .icon-content .tooltip {
    position: absolute;
    top: 38px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s cubic-bezier(0.4,0,0.2,1), top 0.25s cubic-bezier(0.4,0,0.2,1);
    pointer-events: none;
  }

  .example-1 .icon-content:hover .tooltip {
    opacity: 1;
    visibility: visible;
    top: 48px;
  }

  .example-1 .icon-content .link {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s ease-in-out;
  }

`;

export default ContactTooltip;
