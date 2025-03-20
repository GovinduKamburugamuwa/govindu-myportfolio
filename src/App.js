import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Publications from './components/Publications';
import PublicationDetail from './components/PublicationDetail';
import Contact from './components/Contact';
import { ThemeProvider, useTheme } from './components/ThemeContext';

const Navigation = ({ activeSection, setActiveSection }) => {
  const { isDarkMode } = useTheme();
   
  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-8 z-40">
      <motion.div
        className={`px-6 py-3 rounded-full ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-lg shadow-lg`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.5 }}
      >
        <ul className="flex space-x-8">
          {['home', 'projects', 'skills', 'publications', 'contact'].map((section) => (
            <motion.li
              key={section}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer"
              onClick={() => setActiveSection(section)}
            >
              <span className={`capitalize ${
                activeSection === section ? 'text-blue-500' : isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {section}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
   
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`fixed top-8 right-8 z-40 p-3 rounded-full ${
        isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-lg shadow-lg`}
    >
      {isDarkMode ? (
        <Sun className="w-6 h-6 text-white" />
      ) : (
        <Moon className="w-6 h-6 text-gray-900" />
      )}
    </motion.button>
  );
};

// Page transition wrapper
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function MainContent() {
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  
  // Only show navigation on main pages, not on detail pages
  const showNavigation = !location.pathname.includes('/publication/');
  
  // Scroll to section when navigation item is clicked
  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-500`}>
      {showNavigation && (
        <Navigation
          activeSection={activeSection}
          setActiveSection={scrollToSection}
        />
      )}
      <ThemeToggle />
      
      <PageTransition>
        <Routes>
          <Route path="/" element={
            <>
              <div id="home"><Hero /></div>
              <div id="projects"><Projects /></div>
              <div id="skills"><Skills /></div>
              <div id="publications"><Publications /></div>
              <div id="contact"><Contact /></div>
            </>
          } />
          <Route path="/publication/:id" element={<PublicationDetail />} />
        </Routes>
      </PageTransition>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;