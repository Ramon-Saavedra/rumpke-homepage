

import Link from "next/link";

interface CategoryButtonProps {
  name: string;
  href: string;
  color?: string;
  className?: string;
}

const CategoryButton = ({ name, href, color, className }: CategoryButtonProps) => {
  return (
    <Link href={href} className={`flex items-center justify-center ${color} ${className} text-sm bg-secondary dark:bg-secondary-dark rounded px-4 py-1 hover:opacity-90`}>
      {name}
    </Link>
  )
}

export default CategoryButton
