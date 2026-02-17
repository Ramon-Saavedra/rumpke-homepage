'use client'


import { useUIStore } from '@/store/ui/ui-store'


import { IoMenuOutline } from 'react-icons/io5';
import CategoryButton from '../category-button/CategoryButton';
import RumpkeLogo from '../logo/RumpkeLogo';
import LogoMobile from '../logo-mobile/LogoMobile';


const Topmenu = () => {

  const openSidemenu = useUIStore((state) => state.openSidemenu);


  return (
    <>
      <div className=' flex justify-between  items-center w-full py-2 mb-12'>
        <div className=''>
          <LogoMobile />
        </div>
        <div className='flex'>
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

          <div className='flex items-center justify-center transition-all  ease-out rounded-md md:h-8 '>
            <button
              onClick={openSidemenu}
              className='mx-2 md:hidden p-1 rounded cursor-pointer hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition'>
              <IoMenuOutline size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Topmenu
