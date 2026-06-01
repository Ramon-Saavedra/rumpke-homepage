import { ReactNode } from "react";
import BackNav from "@/components/layout/back-nav/BackNav";

interface MieteLayoutProps {
  children: ReactNode;
}

export default function MieteLayout({ children }: MieteLayoutProps) {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-2 xl:px-0">
      <BackNav basePath="/miete" backLabel="Zurück zu Mietimmobilien" />
      {children}
    </div>
  );
}
