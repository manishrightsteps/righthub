"use client";

import { motion } from "framer-motion";

const colorMap = {
  primary: {
    gradient: "from-[#142C8E]/10 to-[#1C2C4E]/5",
    iconBg: "bg-[#142C8E]",
    border: "border-[#142C8E]/20",
    glow: "shadow-[#142C8E]/10",
  },
  green: {
    gradient: "from-[#00C38A]/10 to-[#00A372]/5",
    iconBg: "bg-[#00C38A]",
    border: "border-[#00C38A]/20",
    glow: "shadow-[#00C38A]/10",
  },
  yellow: {
    gradient: "from-[#FFC94A]/10 to-[#FFB520]/5",
    iconBg: "bg-[#FFC94A]",
    border: "border-[#FFC94A]/20",
    glow: "shadow-[#FFC94A]/10",
  },
  coral: {
    gradient: "from-[#ED5C5C]/10 to-[#E03E3E]/5",
    iconBg: "bg-[#ED5C5C]",
    border: "border-[#ED5C5C]/20",
    glow: "shadow-[#ED5C5C]/10",
  },
};

export function StatsCard({ title, value, icon: Icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative group bg-linear-to-br ${colorMap[color].gradient} backdrop-blur-sm rounded-xl p-4 border ${colorMap[color].border} shadow-lg ${colorMap[color].glow} overflow-hidden`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#7C7C7C] mb-1.5">{title}</p>
          <h3 className="text-2xl font-black text-[#1C2C4E]">{value}</h3>
        </div>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`${colorMap[color].iconBg} w-11 h-11 rounded-lg flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}
