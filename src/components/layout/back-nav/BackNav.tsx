"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import BackHomeButton from "@/components/features/back-home-button/BackHomeButton";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

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
        className={buttonVariants({ variant: "secondary", size: "sm" })}
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>
    </div>
  );
}
