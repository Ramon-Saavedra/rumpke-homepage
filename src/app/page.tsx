import type { Metadata } from "next";
import ServicesSection from "@/components/sections/services-section/ServicesSection";
import HeroVideo from "@/components/hero/HeroVideo";
import WhyChooseRumpke from "@/components/sections/why-choose-rumpke/WhyChooseRumpke";
import WhatMattersNowSection from "@/components/sections/what-matters-now-section/WhatMattersNowSection";
import PropertyShowcaseSection from "@/components/properties/PropertyShowcaseSection";
import ContactForm from "@/components/features/contact-form/ContactForm";
import ContentPanel from "@/components/ui/content-panel/ContentPanel";
import PageContainer from "@/components/layout/page-container/PageContainer";
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
  siteName,
} from "@/lib/site-metadata";
import { JsonLd } from "@/components/seo/JsonLd";

const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Rumpke Immobilien",
  description:
    "Persönliche Immobilienberatung für Kauf, Verkauf und Vermietung in Bawinkel und dem Emsland.",
  url: "https://www.rumpke-immobilien.de",
  telephone: "+4959634599970",
  email: "info@rumpke-immobilien.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Römerstraße 9",
    addressLocality: "Lingen",
    postalCode: "40811",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Emsland, Niedersachsen",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61572884870790",
    "https://www.instagram.com/rumpkeimmobilien/",
    "https://www.linkedin.com/company/rumpke-immobilien",
  ],
};

export const metadata: Metadata = {
  title: siteName,
  description:
    "Persönliche Immobilienberatung für Kauf, Verkauf und Vermietung in Bawinkel und dem Emsland. Ehrliche Beratung, transparente Abläufe – Rumpke Immobilien.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: siteName,
    description:
      "Persönliche Immobilienberatung für Kauf, Verkauf und Vermietung in Bawinkel und dem Emsland. Ehrliche Beratung, transparente Abläufe – Rumpke Immobilien.",
    url: "/",
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: siteName,
    description:
      "Persönliche Immobilienberatung für Kauf, Verkauf und Vermietung in Bawinkel und dem Emsland.",
  },
};

export default function HomePage() {
  return (
    <div>
      <JsonLd data={realEstateAgentSchema} />

      <HeroVideo
        videoSrc="/media/heroVideo.mp4"
        alt="Rumpke Immobilien Hero Video"
      />
      <PropertyShowcaseSection />
      <PageContainer as="main" className="pb-12">
        <WhyChooseRumpke />
        <ServicesSection />
        <WhatMattersNowSection />
        <ContentPanel
          as="section"
          className="scroll-mt-28 mb-24 py-12 overflow-hidden rounded-sm"
        >
          <ContactForm formHeadingId="homepage-contact-heading" />
        </ContentPanel>
      </PageContainer>
    </div>
  );
}
