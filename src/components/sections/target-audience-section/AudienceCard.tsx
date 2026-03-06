import IconCard from "@/components/ui/icon-card/IconCard";
import { ReactNode } from "react";

interface AudienceCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  linkHref?: string;
}

export default function AudienceCard({
  icon,
  title,
  text,
  linkHref = "/kontakt"
}: AudienceCardProps) {
  return (
    <IconCard
      icon={icon}
      title={title}
      text={text}
      link={linkHref}
    />
  );
}
