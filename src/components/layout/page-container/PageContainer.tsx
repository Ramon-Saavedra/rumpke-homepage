import type { ReactNode } from "react";

interface PageContainerProps {
  readonly as?: "section" | "main" | "div" | "footer";
  readonly className?: string;
  readonly children: ReactNode;
}

export default function PageContainer({
  as: Tag = "div",
  className = "",
  children,
}: PageContainerProps) {
  return (
    <Tag className={`w-full ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </Tag>
  );
}
