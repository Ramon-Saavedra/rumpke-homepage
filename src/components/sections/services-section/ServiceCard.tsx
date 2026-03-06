import IconCard from "@/components/ui/icon-card/IconCard";
import { Home, Key, Building2 } from "lucide-react";

interface ServiceCardProps {
  title: string;
  text: string;
  link: string;
}

const renderIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  const iconProps = { className: "w-6 h-6 text-white", strokeWidth: 2 };

  if (titleLower.includes('verkauf')) return <Home {...iconProps} />;
  if (titleLower.includes('kauf')) return <Key {...iconProps} />;
  if (titleLower.includes('vermiet')) return <Building2 {...iconProps} />;
  return <Home {...iconProps} />;
};

export default function ServiceCard({ title, text, link }: ServiceCardProps) {
  return (
    <IconCard
      icon={renderIcon(title)}
      title={title}
      text={text}
      link={link}
    />
  );
}
