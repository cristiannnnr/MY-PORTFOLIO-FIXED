import { FiX, FiMoon, FiSun } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu({ isOpen, closeMenu, navItems, darkMode, setDarkMode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70"
          onClick={closeMenu}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-end">
              <button 
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <nav className="p-8 flex flex-col space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xl font-medium py-2 hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-8 mt-auto">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center text-lg font-medium"
                >
                  {darkMode ? (
                    <>
                      <FiSun className="mr-2 text-yellow-400" /> Modo claro
                    </>
                  ) : (
                    <>
                      <FiMoon className="mr-2" /> Modo oscuro
                    </>
                  )}
                </button>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}