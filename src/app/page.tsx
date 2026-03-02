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
      />
      <div className="text-center mt-12 md:mt-0 py-5 ">
        <Title variant="h1"
          align="center"
          size="xl"
          subtitle="– lore ipsum dolor sit amet –"
          className="">Lorem ipsum dolor sit amet</Title>
      </div>

      <main className="xl:px-20">
        <Sidebar />
        <TargetAudienceSection />
        <div className="grid lg:grid-cols-2">
          <WhyChooseRumpke />
          <ServicesSection />
        </div>
        <PersonalServiceCard />
      </main>
    </div>
  )
}

export default page
