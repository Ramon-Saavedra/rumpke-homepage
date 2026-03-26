import PersonalServiceCard from "@/components/sections/personal-service-card/PersonalServiceCard"
import ServicesSection from "@/components/sections/services-section/ServicesSection"
import TargetAudienceSection from "@/components/sections/target-audience-section/TargetAudienceSection"
import HeroVideo from "@/components/hero/HeroVideo"
import WhyChooseRumpke from "@/components/sections/why-choose-rumpke/WhyChooseRumpke"
import Title from "@/components/ui/title/Title"
import PropertiesGrid from "@/components/properties/PropertiesGrid"
import { MOCK_FEATURED_PROPERTIES } from "@/data/mock-properties"
import SecondaryNav from "@/components/layout/secondary-nav/SecondaryNav"
import { Home, Sidebar } from "lucide-react"

const page = () => {
  return (
    <div className="">
      <HeroVideo
        videoSrc="/media/heroVideo.mp4"
        alt="Rumpke Immobilien Hero Video"
      />
      <SecondaryNav />
      <div className="text-center mt-12 md:mt-0 border-b border-border-l dark:border-border-d mb-4">
        <Title variant="h1"
          align="center"
          size="xl"
          subtitle="– lore ipsum dolor sit amet –"
          className="">Lorem ipsum dolor sit amet</Title>
      </div>

      <main className="p-2 xl:px-20 2xl:px-32 2xl:w-[80%] mx-auto">
        <section className="mb-12">
          <div className="container mx-auto">
            <Title variant="h2" align="left" className="mb-8 px-2 rounded" size="xl">
              Ausgewählte Immobilien
            </Title>
            <div className="mb-1">
              <PropertiesGrid properties={MOCK_FEATURED_PROPERTIES} />
            </div>
            <div className="flex gap-4 px-2 border rounded mb-2 py-1 border-border-l dark:border-border-d">
              <div className="flex flex-col items-center gap-2">
                <Home className="text-buy" size={14} />
                <span className="text-xs font-medium text-buy">Kauf</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Home className="text-rent" size={14} />
                <span className="text-xs font-medium text-rent">Miete</span>
              </div>
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
