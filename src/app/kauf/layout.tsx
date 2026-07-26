import type { ReactNode } from "react";
import PageLayout from "@/components/layout/page-layout/PageLayout";

export default function KaufLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout
      backNav={{ basePath: "/kauf", backLabel: "Zurück zu Kaufimmobilien" }}
    >
      {children}
    </PageLayout>
  );
}
