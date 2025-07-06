import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FrontendProfessional = () => {
  const [codeIndex, setCodeIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed] = useState(2); // Velocidad de escritura en ms
  // Estados para manejar el cursor, línea activa y visibilidad del contenido
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeLine, setActiveLine] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [codeComplete, setCodeComplete] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Clave para forzar re-render
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const cursorTimerRef = useRef(null);
  
  const codeSnippets = [
    `function createExperience() {
  // Cada píxel cuenta
  design.pixelPerfect();
  
  // Cada interacción importa
  interactions.fluid();
  
  return experience.memorable();
}`,
    `const digitalExperience = () => {
  // Atención a los detalles
  implement.microInteractions();
  
  // Rendimiento óptimo
  optimize.performance();
  
  // Resultado final
  return user.delight();
}`,
    `class ProfessionalFrontend {
  constructor() {
    this.cleanCode = true;
    this.creativeDesign = true;
  }
  
  launch() {
    return "Experiencia digital memorable";
  }
}`
  ];

  // Función para resetear todo el estado de la animación
  const resetAnimation = () => {
    // Limpiar timers
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    if (cursorTimerRef.current) {
      clearInterval(cursorTimerRef.current);
      cursorTimerRef.current = null;
    }

    // Resetear estados
    setCodeIndex(0);
    setText('');
    setIsDeleting(false);
    setCursorVisible(true);
    setActiveLine(0);
    setShowContent(false);
    setCodeComplete(false);
    setAnimationKey(prev => prev + 1); // Forzar re-render de animaciones
  };

  // Intersection Observer mejorado para detectar entrada Y salida
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // El usuario entró a la sección
          if (!isVisible) {
            setIsVisible(true);
          }
        } else {
          // El usuario salió de la sección
          if (isVisible) {
            setIsVisible(false);
            // Resetear animación después de un pequeño delay
            setTimeout(() => {
              resetAnimation();
            }, 100);
          }
        }
      },
      { 
        threshold: 0.3, // Aumentamos el threshold para mejor detección
        rootMargin: '-50px 0px -50px 0px' // Margen para activar cuando esté más centrado
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      if (cursorTimerRef.current) {
        clearInterval(cursorTimerRef.current);
      }
    };
  }, [isVisible]);

  // Efecto principal de escritura
  useEffect(() => {
    if (!isVisible) return;

    const currentSnippet = codeSnippets[codeIndex];
    
    if (isDeleting) {
      // Borrando
      if (text.length > 0) {
        animationRef.current = setTimeout(() => {
          setText(currentSnippet.substring(0, text.length - 1));
        }, typingSpeed * 0.3);
      } else {
        // Terminó de borrar, pasar al siguiente snippet
        setIsDeleting(false);
        setCodeComplete(false);
        setCodeIndex((prev) => (prev + 1) % codeSnippets.length);
      }
    } else {
      // Escribiendo
      if (text.length < currentSnippet.length) {
        animationRef.current = setTimeout(() => {
          setText(currentSnippet.substring(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Terminó de escribir
        if (!codeComplete) {
          setCodeComplete(true);
          // Mostrar contenido después de completar el código
          setTimeout(() => setShowContent(true), 800);
        }
        // Esperar antes de borrar para disfrutar la animación
        animationRef.current = setTimeout(() => {
          setIsDeleting(true);
          setShowContent(false);
        }, 8000);
      }
    }

    // Actualizar línea activa
    const lines = text.split('\n').length;
    setActiveLine(lines - 1);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [text, isDeleting, codeIndex, codeSnippets, typingSpeed, isVisible, codeComplete]);

  // Efecto para cursor parpadeante
  useEffect(() => {
    if (!isVisible) {
      if (cursorTimerRef.current) {
        clearInterval(cursorTimerRef.current);
        cursorTimerRef.current = null;
      }
      return;
    }
    
    cursorTimerRef.current = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    
    return () => {
      if (cursorTimerRef.current) {
        clearInterval(cursorTimerRef.current);
      }
    };
  }, [isVisible]);

  // Función para resaltar la sintaxis
  const highlightSyntax = (line) => {
    return line
      .replace(/(function|const|class|return|true|false)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-emerald-400">$1</span>')
      .replace(/(".*")/g, '<span class="text-amber-300">$1</span>')
      .replace(/(\..*?)\(/g, '<span class="text-cyan-300">$1</span>(')
      .replace(/(\b\w+\.\w+\b)/g, '<span class="text-cyan-300">$1</span>')
      .replace(/(\b\w+\(\))/g, '<span class="text-green-400">$1</span>');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden p-4"
    >
      {/* Fondo animado tipo blob */}
      <div className="absolute inset-0 -z-10">    
        <motion.div 
          key={`blob1-${animationKey}`} // Key único para forzar re-render
          className="absolute top-20 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { 
            scale: [1, 1.2, 1], 
            opacity: 0.3,
            x: [0, 50, 0],
            y: [0, -30, 0]
          } : { scale: 0, opacity: 0 }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          key={`blob2-${animationKey}`} // Key único para forzar re-render
          className="absolute top-40 left-10 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { 
            scale: [1, 1.1, 1], 
            opacity: 0.3,
            x: [0, -40, 0],
            y: [0, 20, 0]
          } : { scale: 0, opacity: 0 }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Fondo con líneas de código sutiles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`code-bg-${i}-${animationKey}`} // Key único para forzar re-render
            className="absolute text-gray-800 font-mono text-xs"
            initial={{ 
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1000,
              opacity: 0
            }}
            animate={isVisible ? {
              x: typeof window !== 'undefined' ? [null, Math.random() * window.innerWidth] : [null, Math.random() * 1000],
              y: typeof window !== 'undefined' ? [null, Math.random() * window.innerHeight] : [null, Math.random() * 1000],
              opacity: 0.05
            } : { opacity: 0 }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {`const pixel${i} = new Pixel(${Math.floor(Math.random() * 100)});`}
          </motion.div>
        ))}
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl w-full flex items-center justify-center min-h-[80vh]">
        <div className="flex items-center justify-center w-full">
          {/* Panel de código */}
          <motion.div 
            key={`code-panel-${animationKey}`} // Key único para forzar re-render
            className="bg-gray-800/20 backdrop-blur-lg rounded-xl p-8 border border-gray-700 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 50,
              x: codeComplete && showContent ? -300 : 0,
              scale: codeComplete && showContent ? 0.9 : 1
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              y: { duration: 0.8 },
              x: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 1.2, ease: "easeInOut" }
            }}
          >
            <div className="flex items-center mb-6">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-400">frontend.js</div>
            </div>

            <div className="font-mono text-sm bg-gray-900/50 p-6 rounded-lg border border-gray-700 min-h-[350px] text-gray-100">
              <pre className="relative">
                {text.split('\n').map((line, index) => (
                  <motion.div 
                    key={`line-${index}-${animationKey}`}
                    className={`flex ${index === activeLine ? 'bg-gray-800/50' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="w-8 text-right pr-3 text-gray-500 select-none">{index + 1}</span>
                    <code 
                      className="flex-1"
                      dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
                    />
                  </motion.div>
                ))}
                {isVisible && (
                  <div className="flex">
                    <span className="w-8 text-right pr-3 text-gray-500 select-none">{text.split('\n').length + 1}</span>
                    <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} bg-purple-500 w-2 h-5 inline-block transition-opacity duration-100`}></span>
                  </div>
                )}
              </pre>
            </div>
          </motion.div>

          {/* Contenido de texto */}
          <AnimatePresence mode="wait">
            {showContent && (
              <motion.div
                key={`content-${animationKey}`} // Key único para forzar re-render
                className="absolute text-center"
                initial={{ opacity: 0, x: 0, scale: 0.8 }}
                animate={{ opacity: 1, x: 400, scale: 1 }}
                exit={{ opacity: 0, x: 0, scale: 0.8 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <motion.span 
                    className="block"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Cada píxel cuenta,
                  </motion.span>
                  <motion.span 
                    className="block"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    cada interacción importa.
                  </motion.span>
                </motion.h2>
                
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-6"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                />
                
                <motion.p 
                  className="text-lg md:text-xl text-purple-200 max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  Creo experiencias digitales memorables con atención meticulosa a cada detalle.
                </motion.p>

                <motion.div
                  className="mt-8 flex flex-wrap gap-4 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  {['UI/UX', 'React', 'Performance', 'Details'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-200 text-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Elemento decorativo flotante */}
      {isVisible && (
        <motion.div
          key={`floating-element-${animationKey}`} // Key único para forzar re-render
          className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            scale: { delay: 1.2, type: "spring" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
        </motion.div>
      )}
    </section>
  );
};

export default FrontendProfessional;