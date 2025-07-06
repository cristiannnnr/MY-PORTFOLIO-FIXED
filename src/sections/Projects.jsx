import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';
import RobloxImage from '../assets/images/roblox.jpg';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: "E-commerce Moderno",
      description: "Plataforma de comercio electrónico con carrito de compras y pasarela de pago",
      tags: ["React", "Node.js", "MongoDB"],
      github: "#",
      demo: "#",
      image: RobloxImage
    },
    {
      title: "Task Manager App",
      description: "Aplicación para gestión de tareas con arrastrar y soltar",
      tags: ["React", "Firebase", "Tailwind CSS"],
      github: "#",
      demo: "#",
      image: RobloxImage
    },
    {
      title: "Weather Dashboard",
      description: "Panel de control meteorológico con pronóstico en tiempo real",
      tags: ["JavaScript", "API REST", "Chart.js"],
      github: "#",
      demo: "#",
      image: RobloxImage
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">

      {/* 🔮 Blobs animados */}
      <motion.div className="absolute top-0 right-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* 💻 Líneas tipo código flotando */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`code-bg-${i}`}
            className="absolute text-gray-800 font-mono text-xs whitespace-nowrap"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              opacity: 0
            }}
            animate={{
              x: [null, Math.random() * 1000],
              y: [null, Math.random() * 1000],
              opacity: 0.05
            }}
            transition={{
              duration: Math.random() * 40 + 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {`const project${i} = buildAwesome(${i * 3});`}
          </motion.div>
        ))}
      </div>

      {/* 🌟 Contenido principal */}
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mis Proyectos</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* ✨ Floating Element decorativo */}
      <motion.div
        className="absolute bottom-10 right-10 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </motion.div>
    </section>
  );
}
