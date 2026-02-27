import Link from 'next/link';
import { IoHomeOutline } from 'react-icons/io5';

const BackHomeButton = () => {
  return (
    <div className='py-4'>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-border-l dark:border-border-d bg-white dark:bg-bg-d  text-sm font-medium shadow-sm hover:bg-Bghover-l dark:hover:bg-Bghover-d"
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
