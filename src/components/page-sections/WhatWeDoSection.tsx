"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Import ArrowRight

interface AreaCardProps {
  title: string;
  description: string;
  hoverBgColor: string; // e.g., 'hover:bg-amber-50'
  buttonBgColor: string; // e.g., 'bg-indigo-600'
  buttonIconColor: string; // e.g., 'text-white'
  // graphicPlaceholder?: React.ReactNode; // For a more complex placeholder
  animationDelay?: number;
}

const AreaCard: React.FC<AreaCardProps> = ({
  title,
  description,
  hoverBgColor,
  buttonBgColor,
  buttonIconColor,
  animationDelay = 0,
}) => {
  return (
    <motion.div
      className={`flex flex-col justify-between p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl bg-white border border-slate-200 hover:border-slate-300 ${hoverBgColor} transition-all duration-300 min-h-[380px] md:min-h-[420px]`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <div>
        <h3 className="text-3xl font-bold text-slate-800 mb-3">{title}</h3>
        <hr className="border-slate-400 my-4" />
        <p className="text-slate-700 text-base leading-relaxed">{description}</p>
      </div>
      <div className="mt-6 flex justify-between items-end">
        <motion.button
          className={`w-12 h-12 rounded-full flex items-center justify-center ${buttonBgColor} shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight className={`w-6 h-6 ${buttonIconColor}`} />
        </motion.button>
        {/* Placeholder for graphic */}
        <div className="w-20 h-20 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center text-slate-400 text-xs italic opacity-70">
          Graphic
        </div>
      </div>
    </motion.div>
  );
};

const WhatWeDoSection: React.FC = () => {
  const areasData = [
    {
      title: "Strategy",
      description:
        "Our strategies give a new business perspective. Including concrete digital initiatives, theirpotential value, and a roadmap on how to get there.",
      hoverBgColor: "hover:bg-amber-50",
      buttonBgColor: "bg-indigo-600",
      buttonIconColor: "text-white",
    },
    {
      title: "Execution",
      description:
        "We get things done. With a structured approach that's crucial in ensuring the success of digital initiatives. Making real impact and getting more and more people excited as we go.",
      hoverBgColor: "hover:bg-amber-50",
      buttonBgColor: "bg-indigo-600",
      buttonIconColor: "text-white",
    },
    {
      title: "Tech, data & AI",
      description:
        "Technology is a means to an end, it's never the goal. We combine concrete business insightswith tech, data and AI expertise to ensure tangible results.",
      hoverBgColor: "hover:bg-rose-100",
      buttonBgColor: "bg-slate-800",
      buttonIconColor: "text-white",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white text-slateText"> {/* Changed section background to white */}
      <div className="container mx-auto px-4 md:px-8">
        {/* Removed the main title and subtitle for the section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areasData.map((area, index) => (
            <AreaCard
              key={area.title}
              title={area.title}
              description={area.description}
              hoverBgColor={area.hoverBgColor}
              buttonBgColor={area.buttonBgColor}
              buttonIconColor={area.buttonIconColor}
              animationDelay={0.1 * (index + 1)} // Adjusted stagger
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection; 