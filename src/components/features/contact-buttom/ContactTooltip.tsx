'use client';

import { IoLogoInstagram, IoLogoFacebook, IoLogoWhatsapp, IoMailOutline, IoLogoLinkedin } from "react-icons/io5";
import { usePathname } from "next/navigation";
import SocialIcon from "@/components/ui/social-icon/SocialIcon";

const ContactTooltip = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <div>
      <ul className="flex justify-around pt-1 py-1 mr-2">
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
          href="/#contact-form"
          ariaLabel="Email"
          dataSocial="email"
          icon={<IoMailOutline size={18} className='hover:bg-[#2563EB] rounded' />}
          tooltipText="Kontakt"
          bgColor="#2563EB"
          className="hidden md:block"
          onClick={e => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
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
    </div>
  );
}

export default ContactTooltip;
