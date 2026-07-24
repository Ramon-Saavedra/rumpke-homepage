export default function Loading() {
  return (
    <main className="w-full animate-pulse">
      <div className="w-full h-64 md:h-96 bg-bgSecondary-l dark:bg-bgSecondary-d" />

      <div className="container mx-auto px-4 py-12">
        <div className="h-10 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-2/3 mb-2" />
        <div className="h-5 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-1/3 mb-6" />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-bgSecondary-l dark:bg-bgSecondary-d p-6 rounded border border-border-l dark:border-border-d">
            <div className="h-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-32 mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-full" />
              <div className="h-4 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-5/6" />
              <div className="h-4 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-4/6" />
            </div>
          </div>

          <div className="bg-bgSecondary-l dark:bg-bgSecondary-d p-6 rounded border border-border-l dark:border-border-d">
            <div className="h-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-24 mb-4" />
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-24" />
                  <div className="h-4 bg-bgSecondary-l dark:bg-bgSecondary-d rounded w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
