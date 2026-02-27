"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import BackHomeButton from "@/components/features/back-home-buttom/BackHomeButton";

interface DienstleistungenLayoutProps {
  children: ReactNode;
}

export default function DienstleistungenLayout({ children }: DienstleistungenLayoutProps) {
  const pathname = usePathname();
  const isSubPage = pathname !== "/dienstleistungen";

  return (
    <div className="container mx-auto px-4  min-h-screen">
      {
        !isSubPage && (<BackHomeButton/> )
      }
      {isSubPage && (
        <div className="py-4">
          <Link
            href="/dienstleistungen"
            className="inline-flex items-center gap-2 sm:px-4 sm:py-2 rounded border border-border-l dark:border-border-d bg-secondary dark:bg-secondary-dark text-sm font-medium shadow-sm hover:bg-Bghover-l dark:hover:bg-Bghover-d"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu Dienstleistungen
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}
