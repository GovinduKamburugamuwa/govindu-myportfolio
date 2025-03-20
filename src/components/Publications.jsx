import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  FileText, 
  Globe, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';

const Publications = () => {
  const { isDarkMode } = useTheme();
  
  const publications = [
    { 
      id: 1,
      title: "A Review on Evaluating the Effectiveness of mHealth Interventions Surrounding an Underserved and Stigmatized Population ",
      journal: "Review Paper of 5th Student Symposium of KDU",
      date: "6th of February 2025",
      abstract: "An exploration of emerging web development paradigms and their impact on modern applications.",
      category: "Mobile Health",
      icon: <Globe />,
      color: "#FF6B6B"
    } 
  ];
  
  return (
    <div className="min-h-screen w-full relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode ? 
            'bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20' : 
            'bg-gradient-to-br from-blue-100/50 via-white to-purple-100/50'
        }`} />
        <div className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] top-1/2 -left-32 
          ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200/40'}`} />
        <div className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] bottom-0 right-0 
          ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-200/40'}`} />
      </div>

      {/* Main Content */}
      <div className="relative py-20 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`text-5xl font-bold text-center mb-16 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Publications
        </motion.h2>
        
        <div className="max-w-4xl mx-auto grid gap-8">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className={`rounded-xl p-6 ${
                isDarkMode ? 
                  'bg-gray-800/60 hover:bg-gray-800/80' : 
                  'bg-white/60 hover:bg-white/80'
              } backdrop-blur-sm border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <Link to={`/publication/${publication.id}`} className="block">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${publication.color}20` }}
                  >
                    <div className="w-6 h-6" style={{ color: publication.color }}>
                      {publication.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full`}
                        style={{ 
                          backgroundColor: `${publication.color}20`,
                          color: publication.color 
                        }}
                      >
                        {publication.category}
                      </span>
                      
                      <div className={`flex items-center gap-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{publication.date}</span>
                      </div>
                    </div>
                    
                    <h3 className={`mt-2 text-xl font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {publication.title}
                    </h3>
                    
                    <p className={`mt-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {publication.abstract}
                    </p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <BookOpen className="w-4 h-4 inline mr-1" />
                        {publication.journal}
                      </span>
                      
                      <motion.div
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-1 text-blue-500"
                      >
                        <span className="text-sm font-medium">Read more</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;