import Link from "next/link";
import { ReactNode } from "react";

interface IconCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  link: string;
  className?: string;
}

export default function IconCard({ icon, title, text, link, className = "" }: IconCardProps) {
  return (
    <Link href={link} className={`block group ${className}`}>
      <div className="flex items-center w-full h-full min-h-28 px-6 py-5 bg-card-l dark:bg-card-d border border-border-l dark:border-border-d rounded hover:shadow dark:hover:shadow-primary-dark">
        <div className="shrink-0 w-14 h-14 rounded-full bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="flex flex-col flex-1 ml-5">
          <h3 className="font-semibold text-lg mb-1 text-card-text-l dark:text-card-text-d">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-secondary-l dark:text-secondary-d">
            {text}
          </p>
        </div>
      </div>
    </Link>
  );
}
