import PageLayout from "@/components/layout/page-layout/PageLayout";

export default function KategorieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout showHomeButton>{children}</PageLayout>;
}
