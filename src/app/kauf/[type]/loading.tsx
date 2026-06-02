export default function Loading() {
  return (
    <>
      <div className="mb-12 animate-pulse">
        <div className="h-10 bg-bgSecondary-l dark:bg-bgSecondary-d rounded mx-auto w-64 mb-4" />
        <div className="h-5 bg-bgSecondary-l dark:bg-bgSecondary-d rounded mx-auto w-80" />
      </div>

      <div className="p-8 bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d rounded animate-pulse">
        <div className="h-5 bg-bg-l dark:bg-bg-d rounded mx-auto w-96" />
      </div>
    </>
  )
}
