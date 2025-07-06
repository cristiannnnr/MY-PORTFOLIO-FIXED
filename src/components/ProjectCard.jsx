import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useState, useRef } from 'react';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  const [isHovered, setIsHovered] = useState(false);
  
  // Gradientes basados en el índice
  const gradients = [
    'linear-gradient(135deg, #8a2be2, #00bfff)',
    'linear-gradient(135deg, #ff416c, #ff4b2b)',
    'linear-gradient(135deg, #11998e, #38ef7d)',
    'linear-gradient(135deg, #654ea3, #da98b4)',
    'linear-gradient(135deg, #ff5e62, #ff9966)'
  ];
  
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring", 
        stiffness: 100 
      }}
      whileHover={{ 
        y: -15,
        transition: { duration: 0.3 }
      }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="relative group rounded-2xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Luz de fondo dinámica */}
      <motion.div 
        className="absolute inset-0 opacity-20 rounded-2xl"
        style={{
          background: gradients[index % gradients.length],
          x: useTransform(x, [-100, 100], [-30, 30]),
          y: useTransform(y, [-100, 100], [-30, 30]),
          scale: isHovered ? 1.2 : 1,
          transition: 'all 0.5s ease',
        }}
      />
      
      {/* Tarjeta con efecto vidrio */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        className="bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-2xl h-full flex flex-col overflow-hidden"
      >
        {/* Cabecera con IMAGEN REAL */}
        <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
          {/* Contenedor de imagen */}
          <div className="absolute inset-0">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover rounded-xl"
              />
            ) : ( 
              // Fallback si no hay imagen
              <div className="bg-gray-700 w-full h-full flex items-center justify-center rounded-xl">
                <span className="text-gray-400 text-xl">No image</span>
              </div>
            )}
          </div>
          
          {/* Overlay de color para mejorar contraste */}
          <div 
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)'
            }}
          />
          
          {/* Efecto de luz */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)'
            }}
          />
          
          {/* Botones flotantes */}
          <motion.div 
            className="absolute bottom-4 right-4 flex space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.3 }}
          >
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg border border-white/20"
            >
              <FiGithub className="text-gray-800 text-xl" />
            </a>
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg border border-white/20"
            >
              <FiExternalLink className="text-gray-800 text-xl" />
            </a>
          </motion.div>
        </div>
        
        {/* Contenido */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3 text-white">
            {project.title}
            <motion.span 
              className="ml-2 inline-block h-1 w-8 bg-current"
              animate={{ 
                width: isHovered ? 40 : 32,
                opacity: isHovered ? 1 : 0.7
              }}
              transition={{ duration: 0.3 }}
            />
          </h3>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.span  
                key={i}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                }}
                className="px-3 py-1.5 bg-gray-800/40 text-gray-200 text-sm rounded-full font-medium backdrop-blur-sm border border-gray-700 transition-all"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Efecto de borde luminoso */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-white/20 transition-all duration-500" />
        
        {/* Partículas flotantes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${10 + i * 15}%`,
              left: `${5 + i * 10}%`,
              opacity: 0.3
            }}
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 2 + i, 
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>
      
      {/* Sombra dinámica */}
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-black/30 -z-10"
        animate={{ 
          scale: isHovered ? 0.95 : 0.9,
          opacity: isHovered ? 0.6 : 0.4
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}