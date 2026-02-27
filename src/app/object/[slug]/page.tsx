
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyObjectPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.trim() === "") {
    notFound();
  }

  return (
    <main className="flex-2 lg:basis-2/4 xl:basis-3/6 w-full max-w-full h-full overflow-y-auto sm:px-4 lg:px-1">
      <div className="container mx-auto py-8 bg-red-500 p-4">
        <h1 className="text-4xl font-bold mb-6">
          Detalle de Inmueble
        </h1>
        <p className="text-lg mb-4">
          Página desde object/[slug]
        </p>
        <div className="bg-background-secondary p-6 rounded-lg">
          <p className="text-primary">
            Slug: <span className="font-semibold">{slug}</span>
          </p>
        </div>
      </div>
    </main>
  );
}
