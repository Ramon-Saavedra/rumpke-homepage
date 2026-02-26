import PersonalServiceCard from "@/components/sections/personal-service-card/PersonalServiceCard"
import ServicesSection from "@/components/sections/services-section/ServicesSection"
import TargetAudienceSection from "@/components/sections/target-audience-section/TargetAudienceSection"
import CategoryNav from "@/components/layout/category-nav/CategoryNav"
import Sidebar from "@/components/layout/sidebar/Sidebar"

import WhyChooseRumpke from "@/components/sections/why-choose-rumpke/WhyChooseRumpke"
import Title from "@/components/ui/title/Title"

const page = () => {
  return (
    <div className="">
      <div className="text-center mt-12 md:mt-0">
        <Title variant="h1"
        align="center"
          size="xl"
          subtitle="– Mehr als nur 4 Wände –"
          className="mb-4">Willkommen bei Rumpke Immobilien</Title>
      </div>

      <Sidebar />
      <TargetAudienceSection />
      <WhyChooseRumpke />
      <ServicesSection />
      <PersonalServiceCard />
    </div>
  )
}

export default page
