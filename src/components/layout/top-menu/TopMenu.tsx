import CategoryButton from '@/components/features/category-button/CategoryButton';
import LogoMobile from '@/components/branding/logo-mobile/LogoMobile';
import { ThemeSwitch } from '@/context/ThemeSwitsh';
import MenuButton from './MenuButton';

const Topmenu = () => {
  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-100 flex justify-between items-center w-full py-2 backdrop-blur-xl bg-background/80 dark:bg-background-dark/80'>
        <div className='flex flex-col items-center justify-center'>
          <LogoMobile />
        </div>
        <div>
          <ThemeSwitch />
        </div>
        <div className='flex gap-1'>
          <CategoryButton
            name="Kauf"
            href="/kauf"
            color="border-buy text-white font-bold"
            className=" bg-buy"
          />
          <CategoryButton
            name="Miete"
            href="/miete"
            color="border-rent text-white font-bold"
            className=" bg-rent"
          />

          <div className='flex items-center justify-center rounded-md md:h-8 '>
            <MenuButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default Topmenu
