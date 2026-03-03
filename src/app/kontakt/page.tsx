'use client';


import BackHomeButton from "@/components/features/back-home-buttom/BackHomeButton";
import TrustBannerFoto from "@/components/features/trust-baner-foto/TrustBannerFoto";
import Image from "next/image";




export default function KontaktPage() {
  return (
    <section className="mx-auto md:p-10 py-8">
      <div>
        <BackHomeButton />
      </div>
      <div className="w-full mb-12">
        <div className="w-full  overflow-hidden flex items-center justify-center p-0">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/imgs/contact-our-office.jpg"
              alt="Unser Büro"
              width={800}
              height={600}
              className="object-cover  w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-80 md:h-[400px] lg:h-[480px] mx-auto"
              sizes="(max-width: 1024px) 100vw, 480px"
              loading="eager"
              preload={true}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          <div className="w-full rounded bg-secondary dark:bg-secondary-dark flex flex-col justify-center items-start p-4 md:p-6 shadow-sm overflow-hidden">
            <h1 className="text-xl font-bold text-primary mb-2 tracking-wide drop-shadow">Kontakt</h1>
            <p className="text-base font-medium tracking-wide text-primary-dark dark:text-primary/80 mb-4">Sie möchten Ihre Immobilie verkaufen, bewerten lassen oder vermieten?</p>
            <div className="space-y-1 mb-2">
              <p className="font-semibold text-sm tracking-wider">Rumpke Immobilien</p>
              <p className="text-sm tracking-wider">Ann-Christin Rumpke</p>
            </div>
            <div className="space-y-1 mb-2">
              <a href="mailto:info@rumpke-immobilien.de" className="text-primary underline text-sm tracking-wider">info@rumpke-immobilien.de</a>
              <p className="text-sm tracking-wider">0172 – 32 444 68</p>
              <p className="text-sm tracking-wider">05963 – 45 999 70</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm tracking-wider">Haselünner Straße 4-8</p>
              <p className="text-sm tracking-wider">49844 Bawinkel</p>
            </div>
          </div>

        </div>
      </div>
      <div className="hidden lg:block">
        <TrustBannerFoto
          title="Ihr direkter Draht zu Rumpke Immobilien"
        />
      </div>
    </section>
  );
}
