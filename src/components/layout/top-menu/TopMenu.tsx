'use client'

import { IoMenuOutline } from 'react-icons/io5';
import CategoryButton from '@/components/features/category-button/CategoryButton';
import LogoMobile from '@/components/branding/logo-mobile/LogoMobile';
import { ThemeSwitch } from '@/context/ThemeSwitsh';
import { useUiStore } from '@/store/ui/ui-store';


const Topmenu = () => {
  const { openSidebar } = useUiStore();

  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-100 flex justify-between items-center w-full py-2 backdrop-blur-xl bg-background/80 dark:bg-background-dark/80 shadow-md'>
        <div className='flex flex-col items-center justify-center'>
          <LogoMobile />
        </div>
        <div>
          <ThemeSwitch />
        </div>
        <div className='flex gap-4'>
          <CategoryButton
            name="Kauf"
            href="/kauf"
            color="border-buy"
            className="hover:bg-buy hover:text-white mr-1 bg-buy"
          />
          <CategoryButton
            name="Miete"
            href="/miete"
            color="border-rent"
            className="hover:bg-rent hover:text-white mr-1 bg-rent"
          />

          <div className='flex items-center justify-center rounded-md md:h-8 '>
            <button
              data-testid="menu-btn"
              aria-label="Open navigation menu"
              onClick={openSidebar}
              className='mx-2 md:hidden p-1 rounded cursor-pointer hover:bg-primary/10 dark:hover:bg-primary-dark/20'>
              <IoMenuOutline size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Topmenu
