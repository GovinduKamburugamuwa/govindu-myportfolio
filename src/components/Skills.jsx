import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

const Skills = () => {
  const { isDarkMode } = useTheme();
  
  const skills = [
    { name: "Frontend Development", level: 90, color: "#FF6B6B" },
    { name: "Backend Development", level: 85, color: "#4ECDC4" },
    { name: "UI/UX Design", level: 80, color: "#45B7D1" },
  ];
  
  const techStack = [
    { 
      name: "React", 
      imgSrc: "https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif",
      color: "#61DAFB"
    },
    { 
      name: "Node.js", 
      imgSrc: "https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif",
      color: "#68A063"
    },
    { 
      name: "ExpressJs", 
      imgSrc: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/1a797f46-efe4-41e6-9e75-5303e1bbcbfa",
      color: "#F05032"
    },
    { 
      name: "Python", 
      imgSrc: "https://user-images.githubusercontent.com/74038190/212257472-08e52665-c503-4bd9-aa20-f5a4dae769b5.gif",
      color: "#3776AB"
    },
    { 
      name: "GitHub", 
      imgSrc: "https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif",
      color: "#47A248"
    },
    { 
      name: "HTML/CSS", 
      imgSrc: "https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif",
      color: "#E34F26"
    },
    { 
      name: "Android Studio", 
      imgSrc: "https://user-images.githubusercontent.com/74038190/212281763-e6ecd7ef-c4aa-45b6-a97c-f33f6bb592bd.gif",
      color: "#2496ED"
    },
    { 
      name: "Git", 
      imgSrc: "https://user-images.githubusercontent.com/74038190/212281775-b468df30-4edc-4bf8-a4ee-f52e1aaddc86.gif",
      color: "#2496ED"
    },
    { 
      name: "Firebase", 
      imgSrc: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/3c16d4f2-b757-4c70-8f42-43d5dddd2c36",
      color: "#2496ED"
    },   { 
      name: "HTML", 
      imgSrc: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/29fd6286-4e7b-4d6c-818f-c4765d5e39a9",
      color: "#2496ED"
    },   { 
      name: "CSS", 
      imgSrc: "https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/67f477ed-6624-42da-99f0-1a7b1a16eecb",
      color: "#2496ED"
    }, 
    { 
      name: "JavaScript", 
      imgSrc: "https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif",
      color: "#F7DF1E"
    },

    
    
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
          Skills & Expertise
        </motion.h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {skill.name}
                </span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {skill.level}%
                </span>
              </div>
              <div className={`h-3 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Tech Stack Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <h3 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Tech Stack
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`flex flex-col items-center p-6 rounded-xl ${
                  isDarkMode ? 
                    'bg-gray-800/60 hover:bg-gray-800/80' : 
                    'bg-white/60 hover:bg-white/80'
                } backdrop-blur-sm border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-24 h-24 flex items-center justify-center rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={tech.imgSrc} 
                    alt={tech.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={`font-medium text-center ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;