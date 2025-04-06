"use client";

import React from "react";
import { motion } from "framer-motion";

interface PlaceholderImageProps {
  className?: string;
  width?: number;
  height?: number;
  name?: string;
  color?: string;
  animationDelay?: number;
}

export function PlaceholderImage({
  className = "",
  width = 500,
  height = 500,
  name = "Illustration",
  color = "hsl(var(--primary))",
  animationDelay = 0
}: PlaceholderImageProps) {
  return (
    <div 
      className={`relative rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      {/* Background grid pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10">
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
      
      {/* Animated elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: animationDelay }}
      >
        {/* Decorative circle */}
        <motion.div 
          className="absolute"
          style={{ 
            top: '25%', 
            left: '60%', 
            width: width * 0.3, 
            height: width * 0.3, 
            borderRadius: '50%',
            background: `${color}20`,
            filter: 'blur(20px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: animationDelay + 0.5
          }}
        />
        
        {/* Abstract shape */}
        <motion.div 
          className="absolute"
          style={{ 
            bottom: '20%', 
            left: '15%', 
            width: width * 0.25, 
            height: width * 0.25, 
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            background: `${color}15`,
            filter: 'blur(15px)'
          }}
          animate={{
            borderRadius: [
              '30% 70% 70% 30% / 30% 30% 70% 70%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 70% 70% 30% / 30% 30% 70% 70%'
            ],
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: animationDelay + 1
          }}
        />
      </motion.div>
      
      {/* Main illustration */}
      <motion.svg
        width={width * 0.7}
        height={height * 0.7}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: animationDelay + 0.3 }}
      >
        {/* Abstract illustration */}
        <g fill="none" stroke={color} strokeWidth="2">
          <motion.circle 
            cx="100" cy="100" r="40" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: animationDelay + 0.4 }}
          />
          
          <motion.rect 
            x="80" y="80" width="40" height="40" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: animationDelay + 0.6 }}
          />
          
          <motion.path 
            d="M60,60 L140,60 L140,140 L60,140 Z" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: animationDelay + 0.8 }}
          />
          
          <motion.path 
            d="M40,100 C40,70 70,40 100,40 C130,40 160,70 160,100 C160,130 130,160 100,160 C70,160 40,130 40,100 Z" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: animationDelay + 1 }}
          />
        </g>
        
        {/* Tech-themed elements */}
        <g fill={color} opacity="0.8">
          <motion.circle 
            cx="70" cy="70" r="3" 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: animationDelay + 1.2
            }}
          />
          <motion.circle 
            cx="130" cy="70" r="3" 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: animationDelay + 1.5
            }}
          />
          <motion.circle 
            cx="70" cy="130" r="3" 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: animationDelay + 1.8
            }}
          />
          <motion.circle 
            cx="130" cy="130" r="3" 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: animationDelay + 2.1
            }}
          />
        </g>
        
        {/* Connection lines */}
        <g stroke={color} strokeWidth="1" opacity="0.5">
          <motion.path 
            d="M70,70 L130,70" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: animationDelay + 2.2 }}
          />
          <motion.path 
            d="M70,130 L130,130" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: animationDelay + 2.3 }}
          />
          <motion.path 
            d="M70,70 L70,130" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: animationDelay + 2.4 }}
          />
          <motion.path 
            d="M130,70 L130,130" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: animationDelay + 2.5 }}
          />
          <motion.path 
            d="M70,70 L130,130" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: animationDelay + 2.6 }}
          />
          <motion.path 
            d="M130,70 L70,130" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: animationDelay + 2.7 }}
          />
        </g>
      </motion.svg>
      
      {/* Label */}
      <div className="absolute bottom-4 left-4 right-4 bg-background/70 backdrop-blur-sm p-2 rounded text-center text-xs opacity-80">
        {name}
      </div>
    </div>
  );
} 