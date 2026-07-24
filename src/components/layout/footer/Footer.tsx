import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoWhatsapp,
  IoMailOutline, IoCallOutline, IoLocationOutline,
} from 'react-icons/io5';
import { ThemeSwitch } from '@/context/theme-switch';
import {
  FOOTER_BUY_LINKS,
  FOOTER_RENT_LINKS,
  FOOTER_SERVICES_LINKS,
  FOOTER_COMPANY_LINKS,
} from '@/constants/navigation';

type NavLink = { label: string; href: string };

function FooterNavSection({ title, links }: { title: string; links: readonly NavLink[] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4">
        {title}
      </p>
      <ul className="space-y-2.5 pl-3 border-l border-border-l dark:border-border-d">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-card-text-l dark:text-card-text-d hover:text-primary"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSocialLink({ href, label, hoverColor, children }: {
  href: string;
  label: string;
  hoverColor: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-card-text-l dark:text-card-text-d ${hoverColor}`}
      aria-label={label}
    >
      {children}
    </a>
  );
}

function FooterContactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 justify-center md:justify-start">
      <span className="text-primary mt-0.5 shrink-0">{icon}</span>
      <span className="text-sm text-card-text-l dark:text-card-text-d text-left">{children}</span>
    </li>
  );
}

const Footer = () => {
  return (
    <footer className="w-full border-t border-border-l dark:border-border-d bg-bgSecondary-l dark:bg-bgSecondary-d">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 mb-12 text-center md:text-left">

          <div>
            <p className="text-base font-bold tracking-wide mb-3">
              Rumpke Immobilien
            </p>
            <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed mb-8">
              Ihr vertrauensvoller Partner für Immobilien in der Region.
            </p>

            <ul className="space-y-3 mb-8">
              <FooterContactItem icon={<IoLocationOutline size={15} />}>
                Römerstraße 9<br />40811 Lingen
              </FooterContactItem>
              <FooterContactItem icon={<IoCallOutline size={15} />}>
                <a href="tel:+4959634599970" className="hover:text-primary">05963 – 45 999 70</a>
              </FooterContactItem>
              <FooterContactItem icon={<IoMailOutline size={15} />}>
                <a href="mailto:info@rumpke-immobilien.de" className="hover:text-primary">info@rumpke-immobilien.de</a>
              </FooterContactItem>
            </ul>

            <div className="flex items-center gap-5 justify-center md:justify-start">
              <FooterSocialLink href="https://www.facebook.com/profile.php?id=61572884870790" label="Facebook" hoverColor="hover:text-[#1877F3]">
                <IoLogoFacebook size={18} />
              </FooterSocialLink>
              <FooterSocialLink href="https://wa.me/491723244468" label="WhatsApp" hoverColor="hover:text-[#25D366]">
                <IoLogoWhatsapp size={18} />
              </FooterSocialLink>
              <FooterSocialLink href="https://www.instagram.com/rumpkeimmobilien/" label="Instagram" hoverColor="hover:text-[#E4405F]">
                <IoLogoInstagram size={18} />
              </FooterSocialLink>
              <FooterSocialLink href="https://www.linkedin.com/company/rumpke-immobilien" label="LinkedIn" hoverColor="hover:text-[#0A66C2]">
                <IoLogoLinkedin size={18} />
              </FooterSocialLink>
            </div>
          </div>

          <div className="space-y-8">
            <FooterNavSection
              title="Kaufen"
              links={FOOTER_BUY_LINKS}
            />
            <FooterNavSection
              title="Mieten"
              links={FOOTER_RENT_LINKS}
            />
          </div>

          <div className="space-y-8">
            <FooterNavSection
              title="Dienstleistungen"
              links={FOOTER_SERVICES_LINKS}
            />
            <FooterNavSection
              title="Unternehmen"
              links={FOOTER_COMPANY_LINKS}
            />
          </div>
        </div>
        <div className="border-t border-border-l dark:border-border-d pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-card-text-l dark:text-card-text-d">
            <Link href="/" className="font-semibold hover:text-primary">
              Rumpke Immobilien
            </Link>
            <span> &copy; {new Date().getFullYear()} – Alle Rechte vorbehalten</span>
          </p>
          <div className="flex items-center gap-6">
            <Link href="/impressum" className="text-sm text-card-text-l dark:text-card-text-d hover:text-primary">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-sm text-card-text-l dark:text-card-text-d hover:text-primary">
              Datenschutz
            </Link>
            <ThemeSwitch />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
