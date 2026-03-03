
import Image from 'next/image';
import Link from 'next/link';

const LogoMobile = () => {
  return (
    <Link
      href="/"
    >
      <div className="flex items-center w-20 h-10">
        <Image
          src="/imgs/RUMPKE-mobile-logo.png"
          alt="Rumpke Logo"
          width={80}
          height={40}
          style={{ objectFit: 'contain', height: 'auto', maxHeight: '100%' }}
          loading="eager"
          preload={true}
          title='Rumpke Immobilien'
        />
      </div>
    </Link>
  );
};

export default LogoMobile;
