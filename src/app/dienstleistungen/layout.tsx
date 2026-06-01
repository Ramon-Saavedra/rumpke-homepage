import { ReactNode } from "react";
import BackNav from "@/components/layout/back-nav/BackNav";

interface DienstleistungenLayoutProps {
  children: ReactNode;
}

export default function DienstleistungenLayout({ children }: DienstleistungenLayoutProps) {
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <BackNav basePath="/dienstleistungen" backLabel="Zurück zu Dienstleistungen" />
      {children}
    </div>
  );
}
