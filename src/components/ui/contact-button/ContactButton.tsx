import { Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button/buttonVariants";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  text?: string;
  href?: string;
  className?: string;
}

export default function ContactButton({
  text = "Kontakt",
  href = "/kontakt",
  className = "",
}: ContactButtonProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "primary" }), className)}
      style={{ letterSpacing: "0.01em" }}
    >
      <Mail size={18} strokeWidth={2} />
      <span>{text}</span>
    </Link>
  );
}
