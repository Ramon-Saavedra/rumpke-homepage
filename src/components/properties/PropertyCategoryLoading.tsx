import ContentPanel from "@/components/ui/content-panel/ContentPanel";

export default function PropertyCategoryLoading() {
  return (
    <>
      <div className="mb-12 animate-pulse">
        <div className="h-10 bg-bgSecondary-l dark:bg-bgSecondary-d rounded mx-auto w-64 mb-4" />
        <div className="h-5 bg-bgSecondary-l dark:bg-bgSecondary-d rounded mx-auto w-80" />
      </div>

      <ContentPanel className="p-8 rounded animate-pulse">
        <div className="h-5 bg-bg-l dark:bg-bg-d rounded mx-auto w-96" />
      </ContentPanel>
    </>
  );
}
