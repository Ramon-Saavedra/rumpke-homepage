import Link from 'next/link';
import { IoHomeOutline } from 'react-icons/io5';

const BackHomeButton = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-(--color-secondary) bg-white dark:bg-bg-d text-primary-dark dark:text-primary text-sm font-medium shadow-sm hover:bg-(--color-Bghover-l) dark:hover:bg-Bghover-d transition-colors duration-100"
      style={{ minWidth: 0 }}
      aria-label="Zurück zur Startseite"
    >
      <IoHomeOutline size={18} />
      Startseite
    </Link>
  );
};

export default BackHomeButton;
