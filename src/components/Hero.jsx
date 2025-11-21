import { Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  fadeInUp, 
  fadeInRight, 
  staggerContainer, 
  defaultTransition,
} from './AnimationConfig';

const roles = ["An Undergraduate", "Full Stack Developer", "Researcher"];

const Hero = () => {
  const { isDarkMode } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { 
    once: false, // Changed from true to false
    amount: 0.1  // Lowered threshold so it triggers more easily
  });
  
  useEffect(() => {
    if (!isTyping) {
      // When we're in erasing mode
      const currentText = displayText;
      if (currentText.length === 0) {
        // Done erasing, move to next role
        const nextIndex = (currentRoleIndex + 1) % roles.length;
        setCurrentRoleIndex(nextIndex);
        setIsTyping(true);
        return;
      }
      
      // Erase one character
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, -1));
      }, 50);
      
      return () => clearTimeout(timeout);
    } else {
      // When we're in typing mode
      const currentRole = roles[currentRoleIndex];
      
      if (displayText.length >= currentRole.length) {
        // Finished typing this role, pause before erasing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        
        return () => clearTimeout(timeout);
      }
      
      // Type the next character
      const timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [displayText, currentRoleIndex, isTyping]); // Removed 'roles' from dependencies

  return (
    <motion.section 
    id="hero"
    ref={sectionRef}
    className="min-h-screen w-full relative overflow-hidden"
    animate={isInView ? "visible" : "hidden"}
    initial="hidden"
    variants={staggerContainer}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode ? 
            'bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20' : 
            'bg-gradient-to-br from-blue-100/50 via-white to-purple-100/50'
        }`} />
        <div className={`absolute w-96 h-96 rounded-full blur-3xl top-1/3 -left-20 
          ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200/40'}`} />
        <div className={`absolute w-96 h-96 rounded-full blur-3xl bottom-0 right-0 
          ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-200/40'}`} />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-16 lg:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 items-center">
            {/* Left Content - Text & Info */}
            <motion.div 
              className="space-y-6 md:space-y-8 lg:col-span-3 order-2 md:order-1"
              variants={staggerContainer}
            >
              <motion.div 
                className="space-y-3"
                variants={staggerContainer}
              >
                <motion.h1 
                  className={`text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  variants={fadeInUp}
                  transition={defaultTransition}
                >
                  Hello
                </motion.h1>
                <motion.h2 
                  className={`text-3xl sm:text-4xl lg:text-6xl font-bold 
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  variants={fadeInUp}
                  transition={defaultTransition}
                >
                  I'm{' '}
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Govindu Kamburgamuwa
                  </span>
                </motion.h2>
                <motion.h3 
                  className={`text-xl sm:text-2xl lg:text-3xl font-semibold h-12 flex items-center
                    ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  variants={fadeInUp}
                  transition={defaultTransition}
                >
                  <span>{displayText}</span>
                  <span className="animate-pulse ml-1">|</span>
                </motion.h3>
                <motion.p 
                  className={`text-base sm:text-lg leading-relaxed max-w-2xl mt-4
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  variants={fadeInUp}
                  transition={defaultTransition}
                >
                  A passionate and motivated Computer Science undergraduate at Sir John Kotelawala Defense University with a keen interest in mobile and web application development. Proficient in foundational programming languages such as Java, Python, and SQL, with exposure to frameworks like React and Flutter.
                </motion.p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 pt-2"
                variants={fadeInUp}
                transition={defaultTransition}
              >
                <motion.a
                  href="#projects"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
                    hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact" 
                  className={`px-6 py-3 border rounded-lg transition-all duration-300 font-medium
                    ${isDarkMode ? 
                      'border-blue-500/30 text-white hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-400' : 
                      'border-blue-500/50 text-gray-900 hover:shadow-lg hover:shadow-blue-500/15 hover:border-blue-500'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex gap-5 pt-2"
                variants={fadeInUp}
                transition={defaultTransition}
              >
                <motion.a
                  href="https://github.com/govindukamburugamuwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 sm:p-4 rounded-xl backdrop-blur-sm
                    transition-all duration-300 
                    ${isDarkMode ? 
                      'bg-gray-800/70 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-gray-800' :
                      'bg-white/70 hover:shadow-lg hover:shadow-blue-500/15 hover:bg-white'
                    }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  variants={fadeInUp}
                  transition={{ ...defaultTransition, delay: 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                    rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Github className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 ${isDarkMode ? 
                    'text-gray-300 group-hover:text-blue-400' : 
                    'text-gray-600 group-hover:text-blue-500'}`} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/govindu-oshada/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 sm:p-4 rounded-xl backdrop-blur-sm
                    transition-all duration-300 
                    ${isDarkMode ? 
                      'bg-gray-800/70 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-gray-800' :
                      'bg-white/70 hover:shadow-lg hover:shadow-blue-500/15 hover:bg-white'
                    }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  variants={fadeInUp}
                  transition={{ ...defaultTransition, delay: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                    rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Linkedin className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 ${isDarkMode ? 
                    'text-gray-300 group-hover:text-blue-400' : 
                    'text-gray-600 group-hover:text-blue-500'}`} />
                </motion.a>
                <motion.a
                  href="#"
                  className={`group relative p-3 sm:p-4 rounded-xl backdrop-blur-sm
                    transition-all duration-300 
                    ${isDarkMode ? 
                      'bg-gray-800/70 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-gray-800' :
                      'bg-white/70 hover:shadow-lg hover:shadow-blue-500/15 hover:bg-white'
                    }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  variants={fadeInUp}
                  transition={{ ...defaultTransition, delay: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                    rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 ${isDarkMode ? 
                    'text-gray-300 group-hover:text-blue-400' : 
                    'text-gray-600 group-hover:text-blue-500'}`} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Content - Profile Image */}
            <motion.div 
              className="relative order-1 md:order-2 md:col-span-1 lg:col-span-2 flex justify-center"
              variants={fadeInRight}
              transition={defaultTransition}
            >
              <motion.div 
                className="relative group max-w-xs sm:max-w-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl 
                  opacity-75 group-hover:opacity-100 blur-md group-hover:blur-lg transition-all duration-700
                  animate-pulse-slow" />
                
                {/* Profile image container */}
                <div className={`relative flex items-center w-full aspect-[3/4] rounded-2xl overflow-hidden
                  ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} shadow-xl`}>
                  <motion.img
                    src={process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/profile.jpg` : '/govindu-myportfolio/profile.jpg'}
                    alt="Profile"
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 
                      transition-all duration-700"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                </div>
                
                {/* Floating experience badge */}
                <motion.div 
                  className={`absolute -top-4 -right-4 px-4 py-2 rounded-full 
                    shadow-lg backdrop-blur-md
                    ${isDarkMode ? 
                      'bg-gray-900/90 text-blue-400 border border-blue-500/30' : 
                      'bg-white/90 text-blue-600 border border-blue-300'}`}
                  variants={fadeInUp}
                  transition={{ ...defaultTransition, delay: 0.3 }}
                >
                  <span className="text-sm font-medium">CS Student</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
