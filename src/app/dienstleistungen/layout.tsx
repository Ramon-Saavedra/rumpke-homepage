import type { ReactNode } from "react";
import PageLayout from "@/components/layout/page-layout/PageLayout";

export default function DienstleistungenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PageLayout
      backNav={{
        basePath: "/dienstleistungen",
        backLabel: "Zurück zu Dienstleistungen",
      }}
    >
      {children}
    </PageLayout>
  );
}
