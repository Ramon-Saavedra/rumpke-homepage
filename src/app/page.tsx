import type { Metadata } from "next";
import PersonalServiceCard from "@/components/sections/personal-service-card/PersonalServiceCard"
import ServicesSection from "@/components/sections/services-section/ServicesSection"
import HeroVideo from "@/components/hero/HeroVideo"
import WhyChooseRumpke from "@/components/sections/why-choose-rumpke/WhyChooseRumpke"
import WhatMattersNowSection from "@/components/sections/what-matters-now-section/WhatMattersNowSection"
import Title from "@/components/ui/title/Title"
import SectionHeader from "@/components/ui/section-header/SectionHeader"
import PropertiesGrid from "@/components/properties/PropertiesGrid"
import { MOCK_FEATURED_PROPERTIES } from "@/data/mock-properties"
import SecondaryNav from "@/components/layout/secondary-nav/SecondaryNav"
import ProcessFlowSection from "@/components/sections/process-flow/ProcessFlowSection"
import PropertyLegend from "@/components/properties/PropertyLegend"
import ContactForm from "@/components/features/contact-form/ContactForm"
import { defaultOpenGraphMetadata, defaultTwitterMetadata, siteName } from "@/lib/site-metadata"

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


const HomePage = () => {
  return (
    <div className="">
      <HeroVideo
        videoSrc="/media/heroVideo.mp4"
        alt="Rumpke Immobilien Hero Video"
      />
      <SecondaryNav />
      <div className="text-center mt-12 md:mt-0 md:py-8 lg:py-12">
        <Title variant="h1"
          align="center"
          size="xl"
          subtitle="Ehrliche Beratung, transparente Abläufe."
          className="">Ankommen. Wohlfühlen. Zuhause sein.</Title>
      </div>

      <main className="p-2 xl:px-20 2xl:px-32 2xl:w-[80%] mx-auto">
        <ProcessFlowSection />
        <section className="mb-24 px-4 sm:px-6 py-12">
          <div className="container mx-auto">
            <SectionHeader title="Ausgewählte Immobilien" className="mb-8" />
            <div className="mb-1">
              <PropertiesGrid properties={MOCK_FEATURED_PROPERTIES} />
              <PropertyLegend />
            </div>
          </div>
        </section>

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
  )
}

export default HomePage
