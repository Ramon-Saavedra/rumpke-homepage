import Link from "next/link";
import type { ReactNode } from "react";
import BackHomeButton from "@/components/features/back-home-button/BackHomeButton";
import PageContainer from "@/components/layout/page-container/PageContainer";

type LegalTocItem = {
  readonly id: string;
  readonly label: string;
};

type LegalDocumentLayoutProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly effectiveDate: string;
  readonly readingTime: string;
  readonly toc: readonly LegalTocItem[];
  readonly children: ReactNode;
};

type LegalSectionProps = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
};

export function LegalSection({
  id,
  title,
  description,
  children,
}: LegalSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-32 rounded-lg border border-border-l bg-bgSecondary-l p-5 dark:border-border-d dark:bg-bgSecondary-d sm:p-6 lg:p-8"
    >
      <div className="mb-6 space-y-3">
        <div className="h-1 w-16 bg-primary" aria-hidden="true" />
        <div className="space-y-2">
          <h2
            id={`${id}-title`}
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="max-w-3xl text-sm leading-7 text-card-text-l dark:text-card-text-d sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="space-y-5 text-sm leading-7 text-card-text-l dark:text-card-text-d sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function LegalDocumentLayout({
  eyebrow,
  title,
  description,
  effectiveDate,
  readingTime,
  toc,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,_rgb(1_128_99/0.16),_transparent_40%),radial-gradient(circle_at_top_right,_rgb(68_85_68/0.12),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgb(1_128_99/0.22),_transparent_42%),radial-gradient(circle_at_top_right,_rgb(252_201_132/0.10),_transparent_34%)]"
      />

      <section className="border-b border-border-l dark:border-border-d">
        <PageContainer className="pb-10 pt-12 lg:pb-14 lg:pt-16">
          <BackHomeButton />

          <div className="rounded-lg border border-border-l bg-bgSecondary-l/90 p-6 backdrop-blur-sm dark:border-border-d dark:bg-bgSecondary-d/90 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  {eyebrow}
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-card-text-l dark:text-card-text-d sm:text-lg">
                  {description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem]">
                <div className="border border-border-l bg-bg-l px-4 py-4 dark:border-border-d dark:bg-bg-d">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Stand
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground sm:text-base">
                    {effectiveDate}
                  </p>
                </div>
                <div className="border border-border-l bg-bg-l px-4 py-4 dark:border-border-d dark:bg-bg-d">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Orientierung
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground sm:text-base">
                    {readingTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)]">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-label="Inhaltsverzeichnis"
              className="rounded-lg border border-border-l bg-bgSecondary-l p-5 dark:border-border-d dark:bg-bgSecondary-d"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Inhaltsverzeichnis
              </p>
              <ul className="mt-4 space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-start gap-3 border border-transparent px-3 py-2 text-sm text-card-text-l transition-colors hover:border-border-l hover:bg-bg-l hover:text-foreground dark:text-card-text-d dark:hover:border-border-d dark:hover:bg-bg-d dark:hover:text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-primary transition-transform group-hover:scale-125"
                      />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-lg border border-border-l bg-third p-5 text-white dark:border-border-d">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-on-dark-accent">
                Kontakt
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                Wenn Sie Fragen zu diesen Angaben haben, erreichen Sie uns
                direkt per E-Mail oder über die Kontaktseite.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="mailto:info@rumpke-immobilien.de"
                  className="rounded-md border border-on-dark-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-on-dark-accent hover:text-bg-d focus-visible:ring-on-dark-accent"
                >
                  info@rumpke-immobilien.de
                </a>
                <Link
                  href="/kontakt"
                  className="rounded-md border border-white/40 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:ring-white"
                >
                  Zur Kontaktseite
                </Link>
              </div>
            </div>
          </aside>

          <article className="space-y-6">{children}</article>
        </div>
      </PageContainer>
    </div>
  );
}
