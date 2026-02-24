
import SidebarDesktop from "@/components/ui/sidebar/SidebarDesktop";
import ImmobilienClientPage from "./ImmobilienClientPage";
import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import Button from "@/components/ui/Button";
import TargetAudienceSection from "@/components/target-audience-section/TargetAudienceSection";
import WhyChooseRumpke from "@/components/why-choose-rumpke/WhyChooseRumpke";
import ServicesSection from "@/components/services-section/ServicesSection";
import PersonalServiceCard from "@/components/personal-service-card/PersonalServiceCard";
import ClientOnly from "@/components/form/ClientOnly";
import LeadForm from "@/components/form/LeadForm";
import ContactAside from "@/components/form/ContactAside";
import ScrollToTopButton from "@/components/ui/scroll-to-top/ScrollToTopButton";
import Topmenu from "@/components/ui/top-menu/TopMenu";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import Footer from "@/components/ui/footer/Footer";


export default function Page() {


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar izquierdo */}

      <aside className="hidden lg:flex flex-col flex-1 lg:basis-1/4 xl:basis-1/6 max-w-2xs poem h-screen sticky top-0 lg:overflow-auto">
        <ImmobilienClientPage />
      </aside>
      {/* Contenido principal */}
      <main className="poem flex-2 lg:basis-2/4 xl:basis-3/6 w-full max-w-full h-full overflow-y-auto sm:px-4 lg:px-1 pb-6">
        <Topmenu />
        <div className="xl:px-10 2xl:px-40">
          <Title
            title="Immobilien. Persönlich. Durchdacht."
            className="px-1 sm:px-0 mb-6 text-center text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
          />
          <Title
            title="Wir begleiten Sie beim Kauf, Verkauf und der Vermietung von Immobilien – persönlich, transparent und mit regionaler Expertise."
            className="px-2 sm:px-0 mb-16  sm:w-[70%] mx-auto sm:text-center text-base  text-card-text-l dark:text-card-text-d"
          />
          <div className='flex w-fit mx-auto gap-4 mb-12'>
            <Link href="/contact?subject=Immobilienberatung" className="mx-auto block">
              <Button variant="primary">
                Kostenlose Bewertung
              </Button>
            </Link>
            <Link href="/kontakt" className="mx-auto block">
              <Button variant="primary">
                Kontakt aufnehmen
              </Button>
            </Link>
          </div>
          <TargetAudienceSection />
          <div className="lg:hidden">
            <ImmobilienClientPage />
          </div>
          <WhyChooseRumpke />
          <ServicesSection />
          <PersonalServiceCard />
          <div className="grid gap-2 xl:grid-cols-2">
            <ClientOnly>
              <LeadForm type="CONTACT" propertyId="" source="web" />
            </ClientOnly>
            <div className="">
              <ContactAside />
            </div>
          </div>
        </div>
        {/* <ScrollToTopButton /> */}
      </main>
      <Sidebar />
      <div className="flex flex-col lg:flex-1 lg:basis-1/4 xl:basis-1/6 max-w-2xs">
        <SidebarDesktop />
      </div>
    </div>
  )
}

