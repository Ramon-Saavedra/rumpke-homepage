import { ReactNode } from "react";
import BackNav from "@/components/layout/back-nav/BackNav";
import PageContainer from "@/components/layout/page-container/PageContainer";

export default function DienstleistungenLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <BackNav basePath="/dienstleistungen" backLabel="Zurück zu Dienstleistungen" />
      {children}
    </PageContainer>
  );
}
