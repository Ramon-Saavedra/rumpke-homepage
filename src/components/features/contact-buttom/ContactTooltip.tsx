'use client';

import styled from 'styled-components';
import { IoLogoInstagram, IoLogoFacebook, IoLogoWhatsapp, IoMailOutline, IoLogoLinkedin } from "react-icons/io5";
import { usePathname } from "next/navigation";
import SocialIcon from "@/components/ui/social-icon/SocialIcon";

const ContactTooltip = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <StyledWrapper>
      <ul className="flex justify-around example-1 pt-1 py-1 mr-2">
        <SocialIcon
          href="https://www.facebook.com/profile.php?id=61572884870790"
          ariaLabel="Facebook"
          dataSocial="facebook"
          target="_blank"
          icon={<IoLogoFacebook size={18} className='hover:bg-[#1877F3] rounded' />}
          tooltipText="Facebook"
          bgColor="#1877F3"
        />

        <SocialIcon
          href="https://wa.me/491723244468"
          ariaLabel="Whatsapp"
          dataSocial="whatsapp"
          target="_blank"
          icon={<IoLogoWhatsapp size={18} className='hover:bg-[#25D366] rounded' />}
          tooltipText="WhatsApp"
          bgColor="#25D366"
        />

        <SocialIcon
          href="/#"
          ariaLabel="Email"
          dataSocial="email"
          icon={<IoMailOutline size={18} className='hover:bg-[#2563EB] rounded' />}
          tooltipText="Kontakt"
          bgColor="#2563EB"
          className="hidden md:block"
          onClick={e => {
            if (window.location.pathname === '/' || window.location.pathname === '/index') {
              e.preventDefault();
              const el = document.getElementById('leadform');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        />

        <SocialIcon
          href="https://www.instagram.com/rumpkeimmobilien/"
          ariaLabel="Instagram"
          dataSocial="instagram"
          target="_blank"
          icon={<IoLogoInstagram size={18} className='hover:bg-[#E4405F] rounded' />}
          tooltipText="Instagram"
          bgColor="#E4405F"
        />

        <SocialIcon
          href="https://www.linkedin.com/company/rumpke-immobilien"
          ariaLabel="LinkedIn"
          dataSocial="linkedin"
          target="_blank"
          icon={<IoLogoLinkedin size={18} className='hover:bg-[#0A66C2] rounded' />}
          tooltipText="LinkedIn"
          bgColor="#0A66C2"
        />
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
    z-index: 50;
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

  }

`;

export default ContactTooltip;
