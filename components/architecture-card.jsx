"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";

export function ArchitectureCard({ title, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="relative group bg-white rounded-xl p-4 border border-[#D9D9D9] shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[#EBF1FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-10 h-10 rounded-lg bg-linear-to-br from-[#90B8F8] to-[#142C8E] flex items-center justify-center flex-shrink-0 shadow-md"
        >
          <Code className="w-5 h-5 text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[10px] font-bold text-[#7C7C7C] mb-1 uppercase tracking-wider">{title}</h3>
          <p className="text-sm font-bold text-[#1C2C4E] leading-tight">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
