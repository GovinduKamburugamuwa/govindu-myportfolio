import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { 
  fadeInUp,  
  staggerContainer, 
  defaultTransition,
} from './AnimationConfig';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const isInView = useInView(sectionRef, { 
    once: false,
    amount: 0.3
  });
  
  const contactMethods = [
    { icon: <Mail />, text: "GovinduKamburugamuwa@gmail.com", label: "Email" },
    { icon: <Phone />, text: "+94 76 3413332", label: "Phone" },
    { icon: <MapPin />, text: "Borelasmagumwa,Colombo, Sri Lanka", label: "Location" }
  ];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    // API URL - use different URL based on environment
    const API_URL = process.env.NODE_ENV === 'production'
      ? 'https://govindu-portfolio-production.up.railway.app/api/contact' // Change this to your actual Railway URL
      : 'http://localhost:5000/api/contact';
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen w-full relative overflow-hidden"
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode ? 
            'bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20' : 
            'bg-gradient-to-br from-blue-100/50 via-white to-purple-100/50'
        }`} />
        <div className={`absolute w-96 h-96 rounded-full blur-3xl top-1/2 -left-20 
          ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200/40'}`} />
        <div className={`absolute w-96 h-96 rounded-full blur-3xl bottom-0 right-0 
          ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-200/40'}`} />
      </div>

      {/* Main Content */}
      <div className="relative py-20 px-4 sm:px-8 max-w-3xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          transition={defaultTransition}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Get in Touch
        </motion.h2>
        
        {/* Contact Form */}
        <motion.div 
          variants={fadeInUp}
          transition={defaultTransition}
          className={`p-8 rounded-2xl backdrop-blur-sm ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
          } shadow-xl transition-colors duration-300`}
        >
          <motion.form 
            className="space-y-6"
            variants={staggerContainer}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-4 mb-4 rounded-lg bg-green-50 dark:bg-green-900/30"
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className={isDarkMode ? "text-green-200" : "text-green-700"}>
                  Your message has been sent successfully!
                </span>
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-4 mb-4 rounded-lg bg-red-50 dark:bg-red-900/30"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className={isDarkMode ? "text-red-200" : "text-red-700"}>
                  {error}
                </span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp} transition={defaultTransition}>
                <label className={`block mb-2 text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                  className={`w-full px-4 py-3 rounded-lg outline-none ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 transition-all`}
                />
              </motion.div>
              <motion.div variants={fadeInUp} transition={defaultTransition}>
                <label className={`block mb-2 text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  required
                  className={`w-full px-4 py-3 rounded-lg outline-none ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 transition-all`}
                />
              </motion.div>
            </div>
            <motion.div variants={fadeInUp} transition={defaultTransition}>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="How can I help you?"
                required
                className={`w-full px-4 py-3 rounded-lg outline-none ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 transition-all`}
              />
            </motion.div>
            <motion.div variants={fadeInUp} transition={defaultTransition}>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                rows={5}
                required
                className={`w-full px-4 py-3 rounded-lg outline-none ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 transition-all`}
              />
            </motion.div>
            <motion.button
              variants={fadeInUp}
              transition={defaultTransition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 
                text-white font-semibold transition-all duration-300
                hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
      {/* Contact Methods (now below the form) */}
      <div className="w-full px-10 pb-10 flex justify-center">
        <motion.div 
          variants={staggerContainer}
          transition={{...defaultTransition, delayChildren: 0.3}}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{...defaultTransition, delay: index * 0.1}}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center p-4 rounded-xl backdrop-blur-sm ${
                isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
              } shadow-lg transition-all duration-300`}
            >
              <div className={`p-2 mr-3 rounded-full ${
                isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'
              }`}>
                {method.icon}
              </div>
              <div>
                <h3 className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {method.label}
                </h3>
                <p className={`text-sm font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {method.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;