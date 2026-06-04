
import { IoSearchOutline } from 'react-icons/io5'

const Input = () => {
  return (
    <div className="hidden md:block relative w-full mb-12 ">
      <IoSearchOutline
        size={20}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Suche..."
        className="w-full pl-8 pr-4 py-1 rounded-md border border-border-l dark:border-border-d bg-bgSecondary-l dark:bg-bgSecondary-d text-foreground focus:outline-none focus:ring-2 focus:ring-primary mx-auto"
      />
    </div>
  )
}

export default Input
