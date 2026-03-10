"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import BackHomeButton from "@/components/features/back-home-buttom/BackHomeButton";

interface MieteLayoutProps {
  children: ReactNode;
}

export default function MieteLayout({ children }: MieteLayoutProps) {
  const pathname = usePathname();
  const isSubPage = pathname !== "/miete";

  return (
    <div className="container mx-auto  max-w-5xl py-12 px-2 xl:px-0">
      {!isSubPage && <BackHomeButton />}
      {isSubPage && (
        <div className="py-4">
          <Link
            href="/miete"
            className="inline-flex items-center gap-2 sm:px-4 sm:py-2 rounded border border-border-l dark:border-border-d bg-bgSecondary-l dark:bg-bgSecondary-d text-sm font-medium shadow-sm hover:bg-Bghover-l dark:hover:bg-Bghover-d"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu Mietimmobilien
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}
