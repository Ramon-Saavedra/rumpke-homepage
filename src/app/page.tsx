import PersonalServiceCard from "@/components/sections/personal-service-card/PersonalServiceCard"
import ServicesSection from "@/components/sections/services-section/ServicesSection"
import TargetAudienceSection from "@/components/sections/target-audience-section/TargetAudienceSection"
import HeroVideo from "@/components/hero/HeroVideo"
import WhyChooseRumpke from "@/components/sections/why-choose-rumpke/WhyChooseRumpke"
import Title from "@/components/ui/title/Title"
import PropertiesGrid from "@/components/properties/PropertiesGrid"
import { MOCK_FEATURED_PROPERTIES } from "@/data/mock-properties"

const page = () => {
  return (
    <div className="">
      <HeroVideo
        videoSrc="/media/heroVideo.mp4"
        alt="Rumpke Immobilien Hero Video"
      />
      <div className="text-center mt-12 md:mt-0 py-5 bg-bgSecondary-l dark:bg-bgSecondary-d mb-12">
        <Title variant="h1"
          align="center"
          size="xl"
          subtitle="– lore ipsum dolor sit amet –"
          className="">Lorem ipsum dolor sit amet</Title>
      </div>

      <main className="p-2 xl:px-20 2xl:px-32 2xl:w-[80%] mx-auto">
        <section className="mb-12">
          <div className="container mx-auto">
            <Title variant="h2" align="left" className="mb-8 py-4 px-2 rounded" size="xl">
              Ausgewählte Immobilien
            </Title>
            <div className="">
              <PropertiesGrid properties={MOCK_FEATURED_PROPERTIES} />
            </div>
          </div>
        </section>

        <TargetAudienceSection />
        <WhyChooseRumpke />
        <ServicesSection />
        <PersonalServiceCard />
      </main>
    </div>
  )
}

export default page
