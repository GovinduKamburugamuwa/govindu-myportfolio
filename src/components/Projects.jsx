import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTheme } from './ThemeContext';

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef(null);
  
  // Use useInView with once: false to detect visibility repeatedly
  const isInView = useInView(sectionRef, { 
    once: false,
    amount: 0.2
  });
  
  
  // Wrap projects array in useMemo to prevent recreation on every render
  const projects = useMemo(() => [
    {
      title: "AETHER STORE (Multi-Agent E-Commerce Platform)",
      description: "AETHER STORE is an innovative e-commerce platform that goes beyond traditional concepts by implementing a multi-agent system.",
      image: `${process.env.PUBLIC_URL}/projects/aethorestore.png`,
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/GovinduKamburugamuwa/AETHER-STORE--multiagent_ecommerce_platform?tab=readme-ov-file"
    },
    {
      title: "ShineSpy",
      description: "The ShineSpy app is designed to check the oiliness of our skin",
      image: `${process.env.PUBLIC_URL}/projects/ShineySpy.png`,
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/GovinduKamburugamuwa/shiny_spy"
    },
    {
      title: "TaskMate",
      description: "TaskMate is a cutting-edge mobile application aimed at revolutionizing Sri Lanka's freelance industry, with a focus on graphic design professionals, by streamlining job postings and project bidding processes.",
      image: `${process.env.PUBLIC_URL}/projects/TaskMate.png`, // You might want to update this one too
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/GovinduKamburugamuwa/taskmate"
    },    
    {
      title: "Daily Diary",
      description: "Daily Diary is an intuitive Android app designed to help you keep track of your daily activities and thoughts. With its simple and user-friendly interface developed using Java and Android Studio, you can easily add new diary entries, view past entries, and manage your diary settings",
      image: `${process.env.PUBLIC_URL}/projects/ShineySpy.png`, // You might want to update this one too
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/GovinduKamburugamuwa/Daily_Diary"
    }
  ], []); // Empty dependency array means this will only be created once

  // Create a "looped" array of projects to ensure smooth carousel rotation
  useEffect(() => {
    const totalProjects = projects.length;
    const loopedArray = [];
    
    for (let i = -2; i <= 2; i++) {
      // This ensures we always have enough projects to display (5 slots: -2, -1, 0, 1, 2)
      const index = (currentIndex + i + totalProjects) % totalProjects;
      // Store position information with each project
      loopedArray.push({
        ...projects[index],
        position: i,
        index: index
      });
    }
    
    setVisibleProjects(loopedArray);
  }, [currentIndex, projects]);

  const slideLeft = () => {
    if (isAnimating) return; // Prevent clicks during animation
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + projects.length) % projects.length
    );
  };

  const slideRight = () => {
    if (isAnimating) return; // Prevent clicks during animation
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % projects.length
    );
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  // Calculate scales based on position to avoid shrinking during transitions
  const getScale = (position) => {
    // Center project is largest, others are smaller
    return position === 0 ? 1 : 0.75;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
    className="min-h-screen w-full relative overflow-x-hidden"
    ref={sectionRef}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={containerVariants}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ?
            'bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20' :
            'bg-gradient-to-br from-blue-100/50 via-white to-purple-100/50'
          }`} />
        <div className={`absolute w-96 h-96 rounded-full blur-3xl top-1/3 -left-20
          ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200/40'}`} />
        <div className={`absolute w-96 h-96 rounded-full blur-3xl bottom-0 right-0 
          ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-200/40'}`} />
      </div>

      {/* Main Content */}
      <div className="relative py-16 px-4 md:px-8 lg:px-12">
        <motion.h2
          variants={itemVariants}
          className={`text-4xl md:text-5xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
        >
          Featured Projects
        </motion.h2>

        <motion.div 
          className="relative w-full max-w-7xl mx-auto"
          variants={itemVariants}
        >
          <motion.div 
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={slideLeft}
              disabled={isAnimating}
              className={`p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300
                hover:shadow-lg ${isAnimating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </motion.div>

          <motion.div 
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={slideRight}
              disabled={isAnimating}
              className={`p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300
                hover:shadow-lg ${isAnimating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>

          <motion.div 
            className="relative h-[550px] md:h-[650px] flex items-center justify-center"
            variants={itemVariants}
          >
            <AnimatePresence mode="popLayout" onExitComplete={handleAnimationComplete}>
              {visibleProjects.map((project) => {
                // Pre-calculate final scale to avoid animation jumps
                const initialScale = getScale(project.position + direction);
                const finalScale = getScale(project.position);
                
                return (
                  <motion.div
                    key={`${project.index}-${project.position}`}
                    className={`absolute w-[90%] max-w-2xl rounded-xl overflow-hidden ${isDarkMode
                        ? 'bg-gray-800/90 shadow-xl shadow-black/30'
                        : 'bg-white/90 shadow-xl shadow-gray-300/50'
                      }`}
                    initial={{
                      scale: initialScale,
                      x: (project.position + direction) * 45 + '%',
                      opacity: Math.abs(project.position + direction) >= 2 ? 0 : 1,
                      rotateY: (project.position + direction) * -20,
                      zIndex: 5 - Math.abs(project.position + direction),
                    }}
                    animate={{
                      scale: finalScale,
                      x: project.position * 45 + '%',
                      opacity: Math.abs(project.position) >= 2 ? 0 : 1,
                      rotateY: project.position * -20,
                      zIndex: 5 - Math.abs(project.position),
                    }}
                    exit={{
                      scale: getScale(project.position - direction),
                      x: (project.position - direction) * 45 + '%',
                      opacity: Math.abs(project.position - direction) >= 2 ? 0 : 1,
                      rotateY: (project.position - direction) * -20,
                      zIndex: 5 - Math.abs(project.position - direction),
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.19, 1.0, 0.22, 1.0], // cubic bezier easing for smooth motion
                      opacity: { duration: 0.4 }
                    }}
                    style={{
                      perspective: '1200px',
                      transformStyle: 'preserve-3d',
                      filter: project.position === 0 ? 'none' : 'brightness(0.7)'
                    }}
                  >
                    <motion.div 
                      className="relative overflow-hidden group"
                      whileHover="hover"
                    >
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6">
                          <motion.a 
                            href={project.link} 
                            className="text-white flex items-center gap-2 hover:text-blue-400 
                              transition-colors duration-300 font-medium text-lg"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Project <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        </div>
                      </motion.div>
                    </motion.div>

                    <div className="p-8">
                      <motion.h3 
                        className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className={`mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.description}
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-blue-500/20 text-blue-700'
                              }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            whileHover={{ 
                              scale: 1.05, 
                              backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.3)' 
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          
          {/* Project Progress Indicator */}
          <motion.div 
            className="flex justify-center gap-3 mt-6"
            variants={itemVariants}
          >
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (isAnimating) return; // Prevent clicks during animation
                  setIsAnimating(true);
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? isDarkMode ? 'bg-blue-400 scale-125' : 'bg-blue-600 scale-125' 
                    : isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label={`Go to project ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: currentIndex === index ? 1.25 : 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;