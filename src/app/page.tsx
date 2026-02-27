import PersonalServiceCard from "@/components/sections/personal-service-card/PersonalServiceCard"
import ServicesSection from "@/components/sections/services-section/ServicesSection"
import TargetAudienceSection from "@/components/sections/target-audience-section/TargetAudienceSection"
import Sidebar from "@/components/layout/sidebar/Sidebar"
import HeroVideo from "@/components/hero/HeroVideo"

import WhyChooseRumpke from "@/components/sections/why-choose-rumpke/WhyChooseRumpke"
import Title from "@/components/ui/title/Title"

const page = () => {
  return (
    <div className="">
      <HeroVideo
        videoSrc="/media/heroVideo.mp4"
        alt="Rumpke Immobilien Hero Video"
        poster="/media/hero-poster.jpg"
      />
      <div className="text-center mt-12 md:mt-0 py-5 ">
        <Title variant="h1"
          align="center"
          size="xl"
          subtitle="– Mehr als nur 4 Wände –"
          className="">Willkommen bei Rumpke Immobilien Rumpke Immobilien</Title>
      </div>

      <main className="">
        <Sidebar />
        <TargetAudienceSection />
        <WhyChooseRumpke />
        <ServicesSection />
        <PersonalServiceCard />
      </main>
    </div>
  )
}

export default page
