import type { ReactNode } from "react";
import PageLayout from "@/components/layout/page-layout/PageLayout";

export default function MieteLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout
      backNav={{ basePath: "/miete", backLabel: "Zurück zu Mietimmobilien" }}
    >
      {children}
    </PageLayout>
  );
}
