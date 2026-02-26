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
      className={`inline-block px-8 py-3 bg-primary dark:bg-primary-dark text-white rounded font-semibold shadow-sm hover:opacity-90 ${className}`}
    >
      {text}
    </Link>
  );
}
