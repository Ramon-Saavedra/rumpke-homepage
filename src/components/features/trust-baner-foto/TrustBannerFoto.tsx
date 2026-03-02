

import Image from "next/image";
import React from "react";

interface TrustBannerFotoProps {
  title: string;
}

const TrustBannerFoto: React.FC<TrustBannerFotoProps> = ({ title }) => {
  return (
    <section
      className="fixed left-0 top flex flex-col items-end justify-center gap-2 aspect-square py-7 px-4 max-w-60 dark:bg-secondary-dark bg-secondary shadow-md shadow-primary dark:shadow-primary-dark"
      style={{
        backdropFilter: 'blur(2px)',
        minWidth: 180,
        minHeight: 180,
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
      }}
    >
      <div className="w-full h-full flex items-center justify-center mb-1">
        <Image
          src="/imgs/personal-service-pic.jpeg"
          alt="Vertrauensbild"
          width={180}
          height={180}
          className="object-cover"
          style={{ width: '90%', height: 'auto', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)' }}
          priority
        />
      </div>
      <h3
        className="text-xs font-semibold text-center tracking-wide mb-2"
      >
        {title}
      </h3>
    </section>

  );
};

export default TrustBannerFoto;
