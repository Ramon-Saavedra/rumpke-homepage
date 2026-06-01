import { ReactNode } from "react";
import BackNav from "@/components/layout/back-nav/BackNav";

interface KaufLayoutProps {
  children: ReactNode;
}

export default function KaufLayout({ children }: KaufLayoutProps) {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-2 xl:px-0">
      <BackNav basePath="/kauf" backLabel="Zurück zu Kaufimmobilien" />
      {children}
    </div>
  );
}
