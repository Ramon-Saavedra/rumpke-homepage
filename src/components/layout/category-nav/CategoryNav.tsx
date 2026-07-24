import ContactTooltip from "@/components/features/contact-buttom/ContactTooltip";
import NavItem from "@/components/ui/nav-item/NavItem";
import { CATEGORY_NAV_LINKS } from '@/constants/navigation';

const CategoryNav = () => {
  return (
    <nav
      aria-label="Property categories"
      className="sticky top-(--topbar-height) z-30 hidden bg-secondary py-2 text-white dark:bg-secondary-dark md:flex lg:hidden"
    >
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-4">
        <div aria-hidden="true" />
        <div className="flex max-w-xl items-center justify-center gap-1 lg:gap-2">
          {CATEGORY_NAV_LINKS.map((link) => (
            link.external ? (
              <NavItem key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </NavItem>
            ) : (
              <NavItem key={link.href} href={link.href}>
                {link.label}
              </NavItem>
            )
          ))}
        </div>
        <div className="mr-4 justify-self-end">
          <ContactTooltip />
        </div>
      </div>
    </nav>
  )
}

export default CategoryNav;
