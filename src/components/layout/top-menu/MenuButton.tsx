'use client';

import { IoMenuOutline } from 'react-icons/io5';
import { useUiStore } from '@/store/ui/ui-store';

export default function MenuButton() {
  const { openSidebar } = useUiStore();

  return (
    <button
      data-testid="menu-btn"
      aria-label="Open navigation menu"
      onClick={openSidebar}
      className="mx-2 md:hidden p-1 rounded cursor-pointer hover:bg-primary/10 dark:hover:bg-primary-dark/20"
    >
      <IoMenuOutline size={28} />
    </button>
  );
}
