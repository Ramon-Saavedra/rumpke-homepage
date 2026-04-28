import { Mail } from "lucide-react";
import Link from "next/link";

interface ContactButtonProps {
  text?: string;
  href?: string;
  className?: string;
}

export default function ContactButton({
  text = "Kontakt",
  href = "/kontakt",
  className = ""
}: ContactButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-primary-dark  font-medium rounded-md shadow-sm hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white ${className}`}
      style={{ letterSpacing: "0.01em" }}
    >
      <Mail size={18} strokeWidth={2} />
      <span>{text}</span>
    </Link>
  );
}
