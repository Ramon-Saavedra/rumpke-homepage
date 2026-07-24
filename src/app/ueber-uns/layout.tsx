import BackHomeButton from "@/components/features/back-home-buttom/BackHomeButton";
import PageContainer from "@/components/layout/page-container/PageContainer";

export default function UeberUnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer>
      <BackHomeButton />
      {children}
    </PageContainer>
  );
}
