import PersonalServiceCard from "@/components/sections/personal-service-card/PersonalServiceCard"
import ServicesSection from "@/components/sections/services-section/ServicesSection"
import TargetAudienceSection from "@/components/sections/target-audience-section/TargetAudienceSection"
import CategoryNav from "@/components/layout/category-nav/CategoryNav"
import Sidebar from "@/components/layout/sidebar/Sidebar"

import WhyChooseRumpke from "@/components/sections/why-choose-rumpke/WhyChooseRumpke"

const page = () => {
  return (
    <div>
      <CategoryNav />
      <Sidebar />
      <TargetAudienceSection />
      <WhyChooseRumpke />
      <ServicesSection />
      <PersonalServiceCard />
    </div>
  )
}

export default page
