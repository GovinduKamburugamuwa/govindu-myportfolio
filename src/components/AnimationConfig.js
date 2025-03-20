// src/components/AnimationConfig.js
// This file provides shared animation configurations for consistent animations across components

// Standard animation variants
export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  export const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  };
  
  export const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };
  
  export const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  };
  
  export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  // Hover animations
  export const scaleOnHover = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  // Standard transition settings
  export const defaultTransition = {
    type: "spring",
    duration: 0.5,
    stiffness: 100,
    damping: 15
  };
  
  // Animation viewports
  export const defaultViewport = { once: true, amount: 0.2 };