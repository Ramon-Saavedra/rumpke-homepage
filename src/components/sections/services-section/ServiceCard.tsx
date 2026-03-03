import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

interface ServiceCardProps {
  title: string;
  text: string;
  link: string;
}

export default function ServiceCard({ title, text, link }: ServiceCardProps) {
  return (
    <div className="flex items-center w-full min-h-24 px-4 py-3 bg-bg-l dark:bg-bg-d border border-border-l dark:border-border-d">
      <div className="flex flex-col flex-1">
        <h2 className="font-semibold text-base mb-1 text-card-text-l dark:text-card-text-d">
          {title}
        </h2>
        <p className="text-sm text-secondary-l dark:text-secondary-d">
          {text}
        </p>
      </div>
      <div className="flex items-center ml-4">
        <Link href={link} aria-label={`Mehr über ${title}`}>
          <IoArrowForward
            size={20}
            className="text-primary hover:text-primary-dark cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}
