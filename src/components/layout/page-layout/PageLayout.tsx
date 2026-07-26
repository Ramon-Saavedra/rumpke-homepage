import type { ReactNode } from "react";
import BackNav from "@/components/layout/back-nav/BackNav";
import BackHomeButton from "@/components/features/back-home-button/BackHomeButton";
import PageContainer from "@/components/layout/page-container/PageContainer";

interface PageLayoutProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly backNav?: { basePath: string; backLabel: string };
  readonly showHomeButton?: boolean;
}

export default function PageLayout({
  children,
  className = "py-12",
  backNav,
  showHomeButton = false,
}: PageLayoutProps) {
  const nav = backNav ? (
    <BackNav basePath={backNav.basePath} backLabel={backNav.backLabel} />
  ) : showHomeButton ? (
    <BackHomeButton />
  ) : null;

  return (
    <PageContainer className={className}>
      {nav}
      {children}
    </PageContainer>
  );
}
