import { cn } from "@/lib/utils";
import { SKELETON_BLOCK } from "@/lib/skeleton-classes";

const CARD_SLOTS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function PropertyCategoryLoading() {
  return (
    <div aria-hidden="true">
      <div className="mb-8 sm:mb-10">
        <div className={cn("h-9 w-64 max-w-full", SKELETON_BLOCK)} />
        <div className={cn("mt-4 h-4 w-72 max-w-full", SKELETON_BLOCK)} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CARD_SLOTS.map((slot) => (
          <div
            key={slot}
            className="flex flex-col overflow-hidden rounded border border-border-l bg-bgSecondary-l shadow-md dark:border-border-d dark:bg-bgSecondary-d"
          >
            <div className={cn("aspect-4/3 w-full", SKELETON_BLOCK)} />
            <div className="flex flex-1 flex-col p-3.5">
              <div className={cn("h-4 w-3/4", SKELETON_BLOCK)} />
              <div className={cn("mt-2 h-3 w-2/5", SKELETON_BLOCK)} />
              <div className={cn("mt-3.5 h-3 w-1/2", SKELETON_BLOCK)} />
              <div className="mt-6 flex items-center justify-between border-t border-border-l pt-3 dark:border-border-d">
                <div className={cn("h-3.5 w-1/3", SKELETON_BLOCK)} />
                <div className={cn("h-3.5 w-1/5", SKELETON_BLOCK)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
