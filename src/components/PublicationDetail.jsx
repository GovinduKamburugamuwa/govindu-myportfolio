import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  FileText, 
  Globe, 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft,
  ExternalLink,
  FileDown,
  Share2
} from 'lucide-react';

const PublicationDetail = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  
  // This would typically come from an API or database
  // For this example, we'll use a static object
  const publications = [
    { 
      id: 1,
      title: "A Review on Evaluating the Effectiveness of mHealth Interventions Surrounding an Underserved and Stigmatized Population ",
      journal: "Review Paper of 5th Student Symposium of KDU",
      date: "6th of February 2025",
      category: "Mobile HealthCare",
      icon: <Globe />,
      color: "#FF6B7B",
      authors: ["GO Kamburugamuwa", "RPS Kathrinarachchi"],
      image: "/Publication.jpg",
      abstract: `Mobile Health (mHealth) applications have 
become a feasible solution for handling depression by 
offering scalable and accessible mental health care in 
recent years. However, there still remains a significant 
gap in the systematic evaluation of their effectiveness, 
particularly for underserved populations and people 
who face stigma or social dysfunction. The systematic 
review was conducted by using PRISMA framework to 
examine how mHealth interventions for depression 
highlight diversity of approaches, including chatbots, 
cognitive-behavioral therapy (CBT) modules, mood 
tracking, and gamification features. Even with their 
potential, lots of studies depend on user engagement 
metrics and their subjective feedback, lacking 
standardized clinical outcome measures to track long
term improvements in depression symptoms. 
The findings reveal that the use of mHealth tools 
increase accessibility, particularly for vulnerable 
groups, but their therapeutic impact and the 
effectiveness remains unclear due to the absence of 
validated clinical assessments. Future research should 
be conducted on developing a multimodal evaluation 
framework that combines clinical, behavioral and 
qualitative data to provide a deep understanding about 
the effectiveness of their interventions. Furthermore, 
addressing specific needs including digital literacy and 
stigma reduction of the population that was targeted is 
necessary for ensuring that mHealth applications reach 
their possibilities in improving mental health outcomes 
all around the world.`,
      keywords: ["mHealth for Depression", "Effectiveness, Gamification", "Multi modal Framework ", "Underserved Popultion"]
    }
  ];
  
  const publication = publications.find(pub => pub.id === parseInt(id));
  
  if (!publication) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Publication not found
          </h2>
          <Link to="/" className="mt-4 text-blue-500 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to publications
          </Link>
        </div>
      </div>
    );
  }
  
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/" className={`inline-flex items-center ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            } transition-colors`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to publications
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-xl ${
              isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
            } backdrop-blur-sm border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } shadow-lg`}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium`}
                  style={{ 
                    backgroundColor: `${publication.color}20`,
                    color: publication.color 
                  }}
                >
                  {publication.category}
                </span>
                <span className={`flex items-center gap-1 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Calendar className="w-4 h-4" />
                  {publication.date}
                </span>
              </div>
              
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {publication.title}
              </h1>
              
              {/* Publication Image */}
              <div className="mb-6">
                <img 
                  src={`${process.env.PUBLIC_URL}/Publication.jpg`} 
                  alt={publication.title}
                  className="w-full h-auto rounded-lg object-cover shadow-md"
                />
              </div>
              
              <div className={`mt-6 flex flex-wrap gap-x-8 gap-y-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{publication.journal}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{publication.authors.join(", ")}</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
              >
                <FileDown className="w-4 h-4" />
                Download PDF
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isDarkMode ? 
                    'bg-gray-700 hover:bg-gray-600 text-white' : 
                    'bg-gray-200 hover:bg-gray-300 text-gray-800'
                } transition-colors`}
              >
    <a href="https://www.researchgate.net/publication/389747472_A_Review_on_Evaluating_the_Effectiveness_of_mHealth_Interventions_Surrounding_an_Underserved_and_Stigmatized_Population" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white-600 hover:text-white-800">
      <ExternalLink className="w-4 h-4" />
      View on Publisher Site
    </a>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isDarkMode ? 
                    'bg-gray-700 hover:bg-gray-600 text-white' : 
                    'bg-gray-200 hover:bg-gray-300 text-gray-800'
                } transition-colors`}
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
            </div>
            
            {/* Abstract */}
            <div className="mb-6">
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Abstract
              </h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                {publication.abstract}
              </p>
            </div>
            
            {/* Keywords (moved under Abstract) */}
            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {publication.keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? 
                        'bg-gray-700 text-gray-300' : 
                        'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;