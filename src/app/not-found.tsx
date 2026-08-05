import Link from "next/link";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

export default function NotFound() {
  return (
    <>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 font-serif text-4xl font-semibold">
          404 - Seite nicht gefunden
        </h1>
        <p className="mb-8 text-lg">Die angeforderte Seite existiert nicht.</p>
        <Link href="/" className={buttonVariants({ variant: "primary" })}>
          Zur Startseite zurückkehren
        </Link>
      </div>
    </>
  );
}
