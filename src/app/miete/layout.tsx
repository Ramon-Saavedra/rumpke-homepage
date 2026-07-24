import { ReactNode } from "react";
import BackNav from "@/components/layout/back-nav/BackNav";
import PageContainer from "@/components/layout/page-container/PageContainer";

export default function MieteLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <BackNav basePath="/miete" backLabel="Zurück zu Mietimmobilien" />
      {children}
    </PageContainer>
  );
}
