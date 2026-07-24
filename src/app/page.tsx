import type { Metadata } from "next";
import PersonalServiceCard from "@/components/sections/personal-service-card/PersonalServiceCard"
import ServicesSection from "@/components/sections/services-section/ServicesSection"
import HeroVideo from "@/components/hero/HeroVideo"
import WhyChooseRumpke from "@/components/sections/why-choose-rumpke/WhyChooseRumpke"
import WhatMattersNowSection from "@/components/sections/what-matters-now-section/WhatMattersNowSection"
import Title from "@/components/ui/title/Title"
import SectionHeader from "@/components/ui/section-header/SectionHeader"
import PropertiesGrid from "@/components/properties/PropertiesGrid"
import ProcessFlowSection from "@/components/sections/process-flow/ProcessFlowSection"
import PropertyLegend from "@/components/properties/PropertyLegend"
import ContactForm from "@/components/features/contact-form/ContactForm"
import { defaultOpenGraphMetadata, defaultTwitterMetadata, siteName } from "@/lib/site-metadata"
import { JsonLd } from "@/components/seo/JsonLd"
import { getProperties } from "@/lib/property-client";
import type { PropertyCardDto } from "@/types/property-api";

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

export default async function HomePage() {
  let featuredProperties: readonly PropertyCardDto[] = [];
  let propertyError = false;

  try {
    const result = await getProperties(1, 12);
    featuredProperties = result.data;
  } catch {
    propertyError = true;
  }

  return (
    <div className="">
      <JsonLd data={realEstateAgentSchema} />
      <HeroVideo
        videoSrc="/media/heroVideo.mp4"
        alt="Rumpke Immobilien Hero Video"
      />
      <div className="text-center pt-10">
        <Title variant="h1"
          align="center"
          size="xl"
          subtitle="Ehrliche Beratung, transparente Abläufe."
          className="">Ankommen. Wohlfühlen. Zuhause sein.</Title>
      </div>

      <main className="p-2 xl:px-20 2xl:px-32 2xl:w-[80%] mx-auto">
        <section className="mb-24 px-4 sm:px-6 py-12">
          <div className="container mx-auto">
            <SectionHeader title="Ausgewählte Immobilien" className="mb-8" />
            <div className="mb-1">
              <PropertiesGrid properties={featuredProperties} />
              <PropertyLegend />
            </div>
            {propertyError && (
              <p className="text-center text-card-text-l dark:text-card-text-d text-sm mt-4">
                Immobilien sind derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.
              </p>
            )}
          </div>
        </section>
            <ProcessFlowSection />

        <WhatMattersNowSection />
        <WhyChooseRumpke />
        <ServicesSection />
        <PersonalServiceCard />

        <section
          id="contact-form"
          className="scroll-mt-28 mb-24 px-4 sm:px-6 py-12 border border-border-l dark:border-border-d overflow-hidden rounded-sm bg-bgSecondary-l dark:bg-bgSecondary-d"
        >
          <ContactForm formHeadingId="homepage-contact-heading" />
        </section>
      </main>
    </div>
  );
}
