import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        } else if (!entry.isIntersecting && isVisible) {
          setIsVisible(false);
          setTimeout(() => setAnimationKey(prev => prev + 1), 100);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px',
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    setIsVisible(true);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white"
    >
      {/* Fondos animados tipo blob */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          key={`hero-blob1-${animationKey}`}
          className="absolute top-20 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isVisible
              ? {
                  scale: [1, 1.2, 1],
                  opacity: 0.3,
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          key={`hero-blob2-${animationKey}`}
          className="absolute top-40 left-10 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isVisible
              ? {
                  scale: [1, 1.1, 1],
                  opacity: 0.3,
                  x: [0, -40, 0],
                  y: [0, 20, 0],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Fondo con líneas tipo código */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`hero-code-bg-${i}-${animationKey}`}
            className="absolute text-gray-800 font-mono text-xs"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1000,
              opacity: 0,
            }}
            animate={
              isVisible
                ? {
                    x: typeof window !== 'undefined' ? [null, Math.random() * window.innerWidth] : [null, Math.random() * 1000],
                    y: typeof window !== 'undefined' ? [null, Math.random() * window.innerHeight] : [null, Math.random() * 1000],
                    opacity: 0.05,
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {`const hero${i} = new Developer(${Math.floor(Math.random() * 100)});`}
          </motion.div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <motion.h1
          key={`hero-title-${animationKey}`}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight"
        >
          Hola, soy <span className="text-purple-500">Cristian</span>
        </motion.h1>

        <motion.p
          key={`hero-subtitle-${animationKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl"
        >
          Desarrollador frontend apasionado por crear experiencias visuales impactantes y funcionales.
        </motion.p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <motion.a
            key={`hero-cta-${animationKey}`}
            href="#projects"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
          >
            Ver proyectos
            <FiArrowDown className="animate-bounce" />
          </motion.a>

          <motion.a
            key={`hero-cv-${animationKey}`}
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
          >
            Ver HV
            <svg
              className="w-5 h-5 text-purple-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </motion.a>
        </div>

        {/* Redes sociales */}
        <motion.div
          key={`hero-social-${animationKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex gap-6 text-2xl justify-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiLinkedin />
          </motion.a>
        </motion.div>
      </div>

      {/* Elemento decorativo flotante */}
      {isVisible && (
        <motion.div
          key={`hero-floating-element-${animationKey}`}
          className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            scale: { delay: 1.5, type: 'spring' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>
      )}

      {/* Indicador de scroll */}
      <motion.div
        key={`hero-scroll-indicator-${animationKey}`}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-gray-400"
        >
          <span className="text-sm mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-purple-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
