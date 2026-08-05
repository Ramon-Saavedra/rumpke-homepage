import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

const BackHomeButton = () => {
  return (
    <div className="py-4">
      <Link
        href="/"
        className={buttonVariants({ variant: "secondary", size: "sm" })}
        style={{ minWidth: 0 }}
        aria-label="Zurück zur Startseite"
      >
        <IoHomeOutline size={18} />
        Startseite
      </Link>
    </div>
  );
};

export default BackHomeButton;
