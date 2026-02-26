import { useEffect, useState } from 'react';
import { IoArrowUpOutline } from 'react-icons/io5';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-500 p-1 hover:shadow-primary rounded-full shadow-lg cursor-pointer
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        bg-secondary dark:bg-secondary-dark text-primary dark:text-primary-dark border border-border-l dark:border-border-d`}
    >
      <IoArrowUpOutline size={28} />
    </button>
  );
};

export default ScrollToTopButton;
