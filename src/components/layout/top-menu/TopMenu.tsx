'use client'

import { useUIStore } from '@/store/ui/ui-store'
import { IoMenuOutline } from 'react-icons/io5';
import CategoryButton from '@/components/features/category-button/CategoryButton';
import LogoMobile from '@/components/branding/logo-mobile/LogoMobile';
import { ThemeSwitch } from '@/context/ThemeSwitsh';


const Topmenu = () => {

  const openSidemenu = useUIStore((state) => state.openSidemenu);


  return (
    <>
      <div className='fixed top-0 right-0 z-500 flex justify-between  items-center w-full py-2'>
        <div className='flex flex-col items-center justify-center'>
          <LogoMobile />
        </div>
        <div className='flex gap-4'>
          <ThemeSwitch />
          <CategoryButton
            name="Kauf"
            href="/kauf"
            color="border-buy"
            className="hover:bg-buy hover:text-white mr-1"
          />
          <CategoryButton
            name="Miete"
            href="/miete"
            color="border-rent"
            className="hover:bg-rent hover:text-white mr-1"
          />

          <div className='flex items-center justify-center rounded-md md:h-8 '>
            <button
              onClick={openSidemenu}
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
