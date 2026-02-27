import Link from "next/link";

interface ContactButtonProps {
  text?: string;
  href?: string;
  className?: string;
}

export default function ContactButton({
  text = "Jetzt Kontakt aufnehmen",
  href = "/kontakt",
  className = ""
}: ContactButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block px-2 py-2 bg-primary dark:bg-primary-dark text-white rounded  shadow-sm hover:opacity-90 ${className}`}
    >
      {text}
    </Link>
  );
}
