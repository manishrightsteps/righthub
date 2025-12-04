"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const colorMap = {
  primary: {
    bg: "bg-white",
    border: "border-[#142C8E]/30",
    iconBg: "from-[#142C8E] to-[#1C2C4E]",
    checkBg: "bg-[#142C8E]",
    hover: "hover:border-[#142C8E]",
    accent: "text-[#142C8E]",
  },
  green: {
    bg: "bg-white",
    border: "border-[#00C38A]/30",
    iconBg: "from-[#00C38A] to-[#00A372]",
    checkBg: "bg-[#00C38A]",
    hover: "hover:border-[#00C38A]",
    accent: "text-[#00C38A]",
  },
  yellow: {
    bg: "bg-white",
    border: "border-[#FFC94A]/30",
    iconBg: "from-[#FFC94A] to-[#FFB520]",
    checkBg: "bg-[#FFC94A]",
    hover: "hover:border-[#FFC94A]",
    accent: "text-[#FFC94A]",
  },
  coral: {
    bg: "bg-white",
    border: "border-[#ED5C5C]/30",
    iconBg: "from-[#ED5C5C] to-[#E03E3E]",
    checkBg: "bg-[#ED5C5C]",
    hover: "hover:border-[#ED5C5C]",
    accent: "text-[#ED5C5C]",
  },
};

export function FeatureDetailCard({ title, sections, icon: Icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={`${colorMap[color].bg} ${colorMap[color].hover} rounded-xl p-5 border-2 ${colorMap[color].border} shadow-lg hover:shadow-xl transition-all duration-300 group`}
    >
      <div className="relative mb-4">
        <div className={`w-11 h-11 rounded-lg bg-linear-to-br ${colorMap[color].iconBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      <h3 className="text-base font-black text-[#1C2C4E] mb-4">{title}</h3>

      <div className="space-y-4">
        {sections?.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h4 className={`text-xs font-bold ${colorMap[color].accent} mb-2 uppercase tracking-wider`}>
              {section.label}
            </h4>
            <ul className="space-y-2">
              {section.items?.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + sectionIdx * 0.1 + idx * 0.05 }}
                  className="flex items-start gap-2 group/item"
                >
                  <div className={`${colorMap[color].checkBg} w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-105 transition-transform`}>
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-xs text-[#3D3D3D] font-medium leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
