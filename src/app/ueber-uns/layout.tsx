import BackHomeButton from "@/components/features/back-home-button/BackHomeButton";
import PageContainer from "@/components/layout/page-container/PageContainer";

export default function UeberUnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="py-12">
      <BackHomeButton />
      {children}
    </PageContainer>
  );
}
