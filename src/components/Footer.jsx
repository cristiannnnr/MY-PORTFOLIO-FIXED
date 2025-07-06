import { FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiGithub, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden p-4">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-950 to-transparent z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] -z-0"></div>
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-900/10 rounded-full blur-[100px] -z-0"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Columna izquierda: Branding y newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h2 className="text-3xl font-bold ml-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Nexus</h2>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
              Transformamos visiones en soluciones digitales innovadoras que impulsan el crecimiento empresarial en la era digital.
            </p>
            
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-white">Suscríbete a nuestro newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 flex-grow"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                >
                  <FiSend className="text-lg" />
                  Suscribirse
                </motion.button>
              </div>
            </div>
            
            <div className="flex space-x-5">
              <motion.a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FiLinkedin className="text-xl" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FiTwitter className="text-xl" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FiInstagram className="text-xl" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FiYoutube className="text-xl" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FiGithub className="text-xl" />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Columna derecha: Enlaces y contacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Enlaces rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">Navegación</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Inicio</span>
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Sobre Nosotros</span>
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Servicios</span>
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Proyectos</span>
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Contacto</span>
                  </a>
                </li>
              </ul>
            </motion.div>
            
            {/* Servicios */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">Servicios</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Desarrollo Web</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Diseño UI/UX</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Apps Móviles</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">Consultoría TI</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">E-commerce</span>
                  </a>
                </li>
              </ul>
            </motion.div>
            
            {/* Contacto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">Contacto</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-gray-800/50 p-3 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-gray-400">contacto@nexus.com</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-800/50 p-3 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-800/50 p-3 rounded-xl mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-400">1234 Calle Ficticia, Ciudad, País</span>
                                </li>
                              </ul>
                            </motion.div>
                          </div>
          </div>
          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm relative z-20">
            © {new Date().getFullYear()} Nexus. Todos los derechos reservados.
          </div>
        </div>
      </footer>
  );
}