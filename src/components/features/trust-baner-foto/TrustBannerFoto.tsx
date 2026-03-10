

import Image from "next/image";
import React from "react";

interface TrustBannerFotoProps {
  title: string;
}

const TrustBannerFoto: React.FC<TrustBannerFotoProps> = ({ title }) => {
  return (
    <section
      className="fixed left-0 bg-bgSecondary-l dark:bg-bgSecondary-d  shadow shadow-primary"
      style={{
        minWidth: 180,
        minHeight: 180,
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
      }}
    >
      <div className="flex flex-col h-full p-4 gap-3 ">
        <div className="relative w-full aspect-square overflow-hidden rounded border-2 border-primary dark:border-primary-dark">
          <Image
            src="/imgs/personal-service-pic.jpeg"
            alt="Vertrauensbild"
            fill
            className="object-cover"
            sizes="180px"
            loading="eager"
            priority
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xs font-bold text-center text-text dark:text-text-dark leading-tight">
            {title}
          </h2>
          <div className="w-12 h-0.5 bg-primary dark:bg-primary-dark mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default TrustBannerFoto;
