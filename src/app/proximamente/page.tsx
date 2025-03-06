"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ComingSoon() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're coming from the root URL
    const params = new URLSearchParams(window.location.search);
    if (!params.get('from')) {
      router.replace('/proximamente?from=root');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center p-8"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          FOMO
        </h1>
        <p className="text-xl md:text-2xl text-white/90">
          Próximamente
        </p>
      </motion.div>
    </div>
  );
}