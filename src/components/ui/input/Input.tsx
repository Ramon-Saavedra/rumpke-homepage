
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
        className="w-full pl-8 pr-4 py-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#171717] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition-all  mx-auto"
      />
    </div>
  )
}

export default Input
