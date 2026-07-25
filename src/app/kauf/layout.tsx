import { ReactNode } from "react";
import BackNav from "@/components/layout/back-nav/BackNav";
import PageContainer from "@/components/layout/page-container/PageContainer";

export default function KaufLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer className="py-12">
      <BackNav basePath="/kauf" backLabel="Zurück zu Kaufimmobilien" />
      {children}
    </PageContainer>
  );
}
