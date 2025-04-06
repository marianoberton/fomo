"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Plan Card Component
export function PlanCard({ title, price, features, highlighted = false, color = "primary" }: { title: string; price: string; features: string[]; highlighted?: boolean; color?: string }) {
  return (
    <Card 
      className={`h-full transition-all overflow-hidden relative backdrop-blur-sm border-border/50 ${
        highlighted ? 'border-accent shadow-lg shadow-accent/10 scale-105 z-10' : 'hover:shadow-xl border-border/30'
      } hover:translate-y-[-8px] group`}
    >
      {highlighted && (
        <motion.div 
          className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent to-primary"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      )}
      
      {/* Background glow effect */}
      <motion.div 
        className={`absolute -z-10 inset-0 bg-gradient-to-br from-${color}/5 via-transparent to-${color}/10 opacity-0 group-hover:opacity-100`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Top circular decoration */}
      <motion.div 
        className={`absolute -top-32 -right-32 w-64 h-64 rounded-full bg-${color}/5 opacity-0 group-hover:opacity-100`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      
      <CardHeader className={`${highlighted ? `bg-${color}/10` : ''} relative`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CardTitle className="text-xl font-bold relative inline-flex">
            {title}
            <motion.span 
              className={`absolute -bottom-1 left-0 right-full h-[2px] bg-${color}/50`}
              initial={{ scaleX: 0, originX: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </CardTitle>
        </motion.div>
        
        <motion.div 
          className={`text-2xl font-bold mt-2 ${highlighted ? `text-${color}` : `text-${color}`}`}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 10, 
            delay: 0.4 
          }}
        >
          {price}
        </motion.div>
        
        {/* Subtle animated pattern */}
        <svg 
          className="absolute top-0 right-0 w-24 h-24 text-foreground/5 -z-10" 
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern 
            id={`plan-pattern-${title}`} 
            x="0" y="0" 
            width="10" height="10" 
            patternUnits="userSpaceOnUse"
          >
            <circle cx="5" cy="5" r="1" fill="currentColor" />
          </pattern>
          <motion.rect 
            width="100%" 
            height="100%" 
            fill={`url(#plan-pattern-${title})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </svg>
      </CardHeader>
      
      <CardContent>
        <motion.ul 
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start gap-2 group/item"
              variants={fadeIn}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <motion.div
                className={`h-5 w-5 text-${color} flex-shrink-0 mt-0.5`}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 10,
                  color: `hsl(var(--${highlighted ? 'accent' : color}))` 
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
              
              <motion.span 
                className="text-muted-foreground group-hover/item:text-foreground transition-colors"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature}
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
        
        {highlighted && (
          <motion.div 
            className="mt-6 pt-4 border-t border-border/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="text-sm text-accent font-medium">Plan Recomendado</span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

// Service Card Component
export function ServiceCard({ title, description, icon, color, pattern }: { title: string; description: string; icon: React.ReactNode; color: string; pattern: string }) {
  return (
    <Card className="h-full border border-border/40 bg-card/50 backdrop-blur-sm transition-all hover:shadow-xl hover:translate-y-[-5px] group relative overflow-hidden">
      {/* Decorative pattern SVG */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg viewBox="0 0 100 100" className={`text-${color}`}>
          <motion.path
            d={pattern}
            fill="currentColor"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </svg>
      </div>
      
      {/* Hover effect gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent to-primary/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <CardHeader>
        <motion.div 
          className={`text-${color} mb-4 group-hover:text-accent transition-colors duration-300 relative`}
          whileHover={{ 
            scale: 1.1,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          {/* Decorative circle behind the icon */}
          <motion.div 
            className={`absolute inset-0 bg-${color}/10 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100`}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          {/* Icon */}
          <motion.div
            initial={{ rotateY: 0 }}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {icon}
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardTitle className="text-xl font-bold relative inline-block">
            {title}
            <motion.div 
              className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-${color}/40 origin-left`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </CardTitle>
        </motion.div>
      </CardHeader>
      
      <CardContent>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </motion.div>
        
        <motion.div 
          className="mt-6 flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div 
            className={`text-${color} rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity`}
            whileHover={{ 
              scale: 1.2, 
              boxShadow: "0 0 10px rgba(0,102,255,0.3)" 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

export interface CaseStudyCardProps {
  title: string;
  description: string;
  result: string;
  icon: React.ReactNode;
  color: "primary" | "accent" | "blue" | "purple";
}

export function CaseStudyCard({ title, description, result, icon, color, ...props }: CaseStudyCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-xl hover:translate-y-[-8px] overflow-hidden group relative border border-border/50 bg-card/50 backdrop-blur-sm" {...props}>
      {/* Decorative circular background */}
      <motion.div 
        className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-${color}/5 z-0 opacity-0 group-hover:opacity-100`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      
      {/* Top image section */}
      <motion.div 
        className={`h-48 bg-gradient-to-br from-${color}/20 to-background/80 flex items-center justify-center relative overflow-hidden`}
        whileHover={{ 
          background: `linear-gradient(135deg, hsl(var(--${color}) / 0.3), hsl(var(--${color}) / 0.1))`
        }}
      >
        {/* Animated background pattern */}
        <svg className="absolute inset-0 w-full h-full text-foreground/5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id={`case-pattern-${title}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1" fill="currentColor" />
          </pattern>
          <motion.rect 
            width="100%" 
            height="100%" 
            fill={`url(#case-pattern-${title})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </svg>
        
        {/* Circular icon */}
        <motion.div 
          className={`relative z-10 w-24 h-24 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-${color} shadow-lg border border-${color}/20 group-hover:scale-110 transition-transform duration-300`}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 }}
          whileHover={{ 
            boxShadow: `0 0 30px hsla(var(--${color}) / 0.3)`,
            scale: 1.1
          }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
        </motion.div>
        
        {/* Light beam effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-y-12 z-0"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>
      
      <CardHeader className="pb-2">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardTitle className="text-xl font-bold relative inline-flex">
            {title}
            <motion.span 
              className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-${color}/50`}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
          </CardTitle>
        </motion.div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </motion.div>
        
        <motion.div 
          className={`pt-4 border-t border-border/50 text-${color} font-medium flex items-center gap-2`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, 10, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            <CheckCircle className="h-5 w-5" />
          </motion.div>
          <motion.p 
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {result}
          </motion.p>
        </motion.div>
      </CardContent>
    </Card>
  );
} 