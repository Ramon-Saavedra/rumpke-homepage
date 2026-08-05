export type ProcessStep = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
};

export default function ProcessSteps({
  steps,
}: {
  readonly steps: readonly ProcessStep[];
}) {
  return (
    <ol className="space-y-6">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="flex gap-4 rounded-lg border border-border-l bg-bgSecondary-l p-6 dark:border-border-d dark:bg-bgSecondary-d"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
            {index + 1}
          </span>
          <div>
            <h3 className="mb-2 font-serif text-lg font-semibold">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-card-text-l dark:text-card-text-d">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
