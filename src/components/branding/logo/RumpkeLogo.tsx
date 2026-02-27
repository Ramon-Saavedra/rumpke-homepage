


import Image from "next/image";
import Link from "next/link";

export default function RumpkeLogo(props: { style?: React.CSSProperties; className?: string }) {
  return (
    <Link href="/" style={{ display: "block", width: "260px", height: "150px" }}>
      <div style={{ position: 'relative', width: '260px', height: '150px' }}>
        <Image
          src="/imgs/logo-truncated.png"
          alt="Rumpke Immobilien Logo"
          fill
          sizes="(max-width: 768px) 160px, 320px"
          style={{ objectFit: 'cover', ...props.style }}
          className={props.className}
          priority
        />
      </div>
    </Link>
  );
}
