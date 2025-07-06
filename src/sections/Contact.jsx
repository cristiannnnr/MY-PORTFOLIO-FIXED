import AnimatedSection from '../components/AnimatedSection';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Contact() {
  const words = ["Contact", "Contacto", "Contato"];
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);
      setDisplayedText(updatedText);
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  const contactInfo = [
    {
      icon: <div className="bg-violet-500/10 p-4 rounded-2xl border border-violet-500/30">
        <FiMail className="text-3xl text-violet-300" />
      </div>,
      title: 'Correo Electrónico',
      value: '',
      action: 'mailto:cdromerog@udistrital.edu.co'
    },
    {
      icon: <div className="bg-cyan-500/10 p-4 rounded-2xl border border-cyan-500/30">
        <FiPhone className="text-3xl text-cyan-300" />
      </div>,
      title: 'Teléfono',
      value: '',
      action: 'tel:+573209599442'
    },
    {
      icon: <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/30">
        <FiMapPin className="text-3xl text-indigo-300" />
      </div>,
      title: 'Ubicación',
      value: 'Bogotá, Colombia',
      action: null
    }
  ];

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-20">
      {/* Fondos decorativos suaves */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-indigo-500/10 rounded-full blur-[80px] animate-pulse-slow animation-delay-4000"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.02]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg blur opacity-40 scale-95"></div>
                <div className="relative bg-gray-900 px-8 py-3 rounded-lg border border-gray-800">
                  <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent min-h-[3rem]">
                    {displayedText}
                    <span className="animate-pulse text-violet-300">|</span>
                  </h2>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-slate-300 max-w-2xl mx-auto text-xl"
            >
              Conectemos para oportunidades profesionales y proyectos innovadores.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Tarjetas de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <AnimatedSection key={index} delay={0.2 + index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-800 shadow-lg h-full transition-all relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
                <div className="flex flex-col items-start">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-slate-300 text-lg mb-6">{item.value}</p>
                  {item.action && (
                    <a
                      href={item.action}
                      className="mt-auto px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-violet-600/20 to-cyan-600/10 border border-violet-500/30 rounded-lg text-violet-200 hover:bg-violet-600/20 transition-colors flex items-center"
                    >
                      Contactar
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Elemento flotante animado */}
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 flex items-center justify-center shadow-xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </motion.div>
    </section>
  );
}
