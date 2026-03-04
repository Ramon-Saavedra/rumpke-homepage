import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { ReactNode } from "react";

interface AudienceCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  linkHref?: string;
}

export default function AudienceCard({
  icon,
  title,
  text,
  linkHref = "/kontakt"
}: AudienceCardProps) {
  return (
    <div className="group flex items-center w-full h-full px-6 py-5 bg-bg-l dark:bg-bg-d border min-h-24 border-border-l dark:border-border-d rounded">
      <div className="flex items-center justify-center min-w-14 min-h-14 bg-primary/10 rounded-full text-primary">
        {icon}
      </div>
      <div className="flex flex-col flex-1 ml-5">
        <h2 className="font-semibold text-lg mb-1 text-card-text-l dark:text-card-text-d">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-secondary-l dark:text-secondary-d">
          {text}
        </p>
      </div>
      <div className="flex items-center ml-4">
        <Link
          href={linkHref}
          aria-label={`Kontakt aufnehmen für ${title}`}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10"
        >
          <IoArrowForward
            size={20}
            className="text-primary group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
