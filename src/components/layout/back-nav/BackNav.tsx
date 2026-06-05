"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import BackHomeButton from "@/components/features/back-home-buttom/BackHomeButton";

interface BackNavProps {
  basePath: string;
  backLabel: string;
}

export default function BackNav({ basePath, backLabel }: BackNavProps) {
  const pathname = usePathname();
  const isSubPage = pathname !== basePath;

  if (!isSubPage) {
    return <BackHomeButton />;
  }

  return (
    <div className="py-4">
      <Link
        href={basePath}
        className="inline-flex items-center gap-2 sm:px-4 sm:py-2 rounded border border-border-l dark:border-border-d bg-bgSecondary-l dark:bg-bgSecondary-d text-sm font-medium shadow-sm hover:bg-Bghover-l dark:hover:bg-Bghover-d transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>
    </div>
  );
}
