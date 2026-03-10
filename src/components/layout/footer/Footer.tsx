import Link from "next/link";
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoWhatsapp, IoMailOutline, IoCallOutline, IoLocationOutline } from "react-icons/io5";
import FooterCollapsibleSection from "./FooterCollapsibleSection";

const Footer = () => {
  return (
    <footer className="w-full bg-third">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Columna 1: Sobre Rumpke */}
          <FooterCollapsibleSection title="Rumpke Immobilien">
            <p className="text-white mb-4 ">
              Ihr vertrauensvoller Partner für Immobilien in der Region.
            </p>
            <ul className="space-y-2 ">
              <li>
                <Link href="/ueber-uns" className="text-card-text-d hover:text-primary">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-card-text-d hover:text-primary">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/auf-karte-erkunden" className="text-card-text-d hover:text-primary">
                  Auf Karte erkunden
                </Link>
              </li>
            </ul>
          </FooterCollapsibleSection>

          {/* Columna 2: Immobilien */}
          <FooterCollapsibleSection title="Immobilien">
            <div className="mb-4 ">
              <p className="font-medium mb-2 text-white">Kaufen</p>
              <ul className="space-y-2 sm:ml-4">
                <li>
                  <Link href="/kauf" className="text-card-text-d hover:text-primary">
                    Alle Kaufimmobilien
                  </Link>
                </li>
                <li>
                  <Link href="/kauf/haus" className="text-card-text-d hover:text-primary">
                    Häuser kaufen
                  </Link>
                </li>
                <li>
                  <Link href="/kauf/wohnung" className="text-card-text-d hover:text-primary">
                    Wohnungen kaufen
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <p className="font-medium mb-2 text-white">Mieten</p>
              <ul className="space-y-2 sm:ml-4">
                <li>
                  <Link href="/miete" className="text-card-text-d hover:text-primary">
                    Alle Mietimmobilien
                  </Link>
                </li>
                <li>
                  <Link href="/miete/haus" className="text-card-text-d hover:text-primary">
                    Häuser mieten
                  </Link>
                </li>
                <li>
                  <Link href="/miete/wohnung" className="text-card-text-d hover:text-primary">
                    Wohnungen mieten
                  </Link>
                </li>
              </ul>
            </div>
          </FooterCollapsibleSection>

          {/* Columna 3: Dienstleistungen */}
          <FooterCollapsibleSection title="Dienstleistungen">
            <ul className="space-y-2">
              <li>
                <Link href="/dienstleistungen" className="text-card-text-d hover:text-primary">
                  Alle Dienstleistungen
                </Link>
              </li>
              <li>
                <Link href="/dienstleistungen/immobilien-kauf" className="text-card-text-d hover:text-primary">
                  Immobilien Kauf
                </Link>
              </li>
              <li>
                <Link href="/dienstleistungen/verkauf-vermietung" className="text-card-text-d hover:text-primary">
                  Verkauf & Vermietung
                </Link>
              </li>
              <li>
                <Link href="/dienstleistungen/immobilienbewertung" className="text-card-text-d hover:text-primary">
                  Immobilienbewertung
                </Link>
              </li>
            </ul>
          </FooterCollapsibleSection>

          {/* Columna 4: Kontakt Info */}
          <div>
            <FooterCollapsibleSection title="Kontaktieren Sie uns">
              <ul className="space-y-3 ">
                <li className="flex items-start gap-2 justify-center sm:justify-start">
                  <IoLocationOutline size={20} className="text-primary mt-1" />
                  <span className="text-card-text-d">
                    Musterstraße 123<br />12345 Musterstadt
                  </span>
                </li>
                <li className="flex items-center gap-2 justify-center sm:justify-start">
                  <IoCallOutline size={20} className="text-primary" />
                  <a href="tel:+491234567890" className="text-card-text-d hover:text-primary">
                    +49 123 456 7890
                  </a>
                </li>
                <li className="flex items-center gap-2 justify-center sm:justify-start">
                  <IoMailOutline size={20} className="text-primary" />
                  <a href="mailto:info@rumpke-immobilien.de" className="text-card-text-d hover:text-primary">
                    info@rumpke-immobilien.de
                  </a>
                </li>
              </ul>
            </FooterCollapsibleSection>

            {/* Redes Sociales - Siempre visible */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-primary">Folgen Sie uns</h4>
              <div className="flex gap-4 justify-center sm:justify-start">
                <a
                  href="https://www.facebook.com/profile.php?id=61572884870790"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1877F3] hover:opacity-80"
                  aria-label="Facebook"
                >
                  <IoLogoFacebook size={18} />
                </a>
                <a
                  href="https://wa.me/491723244468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:opacity-80"
                  aria-label="WhatsApp"
                >
                  <IoLogoWhatsapp size={18} />
                </a>
                <a
                  href="https://www.instagram.com/rumpkeimmobilien/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E4405F] hover:opacity-80"
                  aria-label="Instagram"
                >
                  <IoLogoInstagram size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/company/rumpke-immobilien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:opacity-80"
                  aria-label="LinkedIn"
                >
                  <IoLogoLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8">
          <div className="w-full h-px bg-border-d mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-card-text-d text-sm">
              <Link href="/" className="font-bold hover:text-primary">
                Rumpke Immobilien
              </Link>
              <span> © {new Date().getFullYear()} - Alle Rechte vorbehalten</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/impressum" className="text-card-text-d hover:text-primary">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-card-text-d hover:text-primary">
                Datenschutz
              </Link>
              <Link href="/agb" className="text-card-text-d hover:text-primary">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
