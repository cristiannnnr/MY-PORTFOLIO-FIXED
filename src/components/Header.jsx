import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Actualizar sección activa
      const sections = ['hero', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(
          currentSection === 'hero' ? 'Inicio' : 
          currentSection === 'about' ? 'Sobre mí' : 
          currentSection === 'projects' ? 'Proyectos' : 
          'Contacto'
        );
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-xl' 
          : 'py-5 bg-transparent'
      }`}
      style={{
        background: scrolled 
          ? 'linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85))' 
          : 'transparent'
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a
          href="#"
          className="text-2xl font-bold flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Portfolio
          </span>
          <motion.span 
            className="ml-2 w-2 h-2 rounded-full bg-cyan-500"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity 
            }}
          />
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`relative font-medium transition-colors ${
                activeSection === item.name 
                  ? 'text-cyan-400' 
                  : 'text-gray-300 hover:text-cyan-300'
              }`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setActiveSection(item.name)}
            >
              {item.name}
              {activeSection === item.name && (
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-500"
                  layoutId="activeIndicator"
                />
              )}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
          whileTap={{ scale: 0.9 }}
        >
          <FiMenu size={24} className="text-cyan-400" />
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center">
                  <a href="#" className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Portfolio
                    </span>
                  </a>
                  <button 
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Cerrar menú"
                  >
                    <FiX size={24} className="text-gray-300" />
                  </button>
                </div>
                
                <nav className="mt-16 flex flex-col space-y-8">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`text-2xl font-medium py-3 px-4 rounded-lg transition-colors ${
                        activeSection === item.name 
                          ? 'bg-cyan-900/30 text-cyan-400' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => {
                        setActiveSection(item.name);
                        setMobileOpen(false);
                      }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
                
                <motion.div 
                  className="absolute bottom-8 left-0 right-0 text-center text-gray-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Desarrollado con React y Tailwind CSS
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}