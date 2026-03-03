import BackHomeButton from "@/components/features/back-home-buttom/BackHomeButton";

export default function KategorieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-2 lg:basis-2/4 xl:basis-3/6 w-full max-w-full h-full overflow-y-auto sm:px-4 lg:px-1">
      <div className="container mx-auto min-h-screen">
        <BackHomeButton />
        {children}
      </div>
    </main>
  );
}
