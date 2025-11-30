"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function ModuleCard({ module, icon: Icon, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-[#00C38A]",
          text: "text-white",
          glow: "shadow-[0_0_20px_rgba(0,195,138,0.3)]"
        };
      case "in_progress":
        return {
          bg: "bg-[#FFC94A]",
          text: "text-[#1C2C4E]",
          glow: "shadow-[0_0_20px_rgba(255,201,74,0.3)]"
        };
      default:
        return {
          bg: "bg-[#D9D9D9]",
          text: "text-[#3D3D3D]",
          glow: ""
        };
    }
  };

  const statusStyles = getStatusStyles(module.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-linear-to-r from-[#142C8E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      <div className="relative bg-white rounded-xl border border-[#D9D9D9] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div
          className="p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#142C8E] opacity-15 blur-lg rounded-lg" />
              <div className="relative w-12 h-12 rounded-lg bg-linear-to-br from-[#142C8E] to-[#1C2C4E] flex items-center justify-center shadow-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-black text-[#1C2C4E] mb-1.5">
                    {module.name}
                  </h3>
                  <code className="text-xs text-[#7C7C7C] bg-[#F5F6F7] px-2 py-1 rounded font-mono border border-[#D9D9D9]">
                    {module.path}
                  </code>
                </div>
                <Badge className={`${statusStyles.bg} ${statusStyles.text} ${statusStyles.glow} px-3 py-1 text-xs font-bold`}>
                  {module.status}
                </Badge>
              </div>

              <p className="text-sm text-[#7C7C7C] leading-relaxed mb-3">{module.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#142C8E]" />
                  <span className="text-xs font-bold text-[#142C8E]">
                    {module.endpoints?.length || module.subModules?.reduce((acc, sub) => acc + sub.endpoints.length, 0) || 0} endpoints
                  </span>
                </div>
                {module.subModules && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C38A]" />
                    <span className="text-xs font-semibold text-[#7C7C7C]">
                      {module.subModules.length} sub-modules
                    </span>
                  </div>
                )}
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#EBF1FF] flex items-center justify-center group-hover:bg-[#142C8E] group-hover:text-white transition-colors">
                <ChevronDown className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-[#D9D9D9]"
            >
              <div className="p-4 bg-[#F5F6F7]/30">
                {module.endpoints && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#1C2C4E] mb-3 flex items-center gap-1.5">
                      <div className="w-1 h-3 bg-[#142C8E] rounded-full" />
                      ENDPOINTS
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {module.endpoints.map((endpoint, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.02 }}
                          className="group/item bg-white px-3 py-2 rounded-lg text-xs font-semibold text-[#3D3D3D] hover:bg-[#142C8E] hover:text-white transition-all duration-200 cursor-pointer border border-[#D9D9D9] hover:border-[#142C8E] hover:shadow-md"
                        >
                          {endpoint}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {module.subModules && (
                  <div>
                    <h4 className="text-xs font-bold text-[#1C2C4E] mb-3 flex items-center gap-1.5">
                      <div className="w-1 h-3 bg-[#00C38A] rounded-full" />
                      SUB-MODULES
                    </h4>
                    <div className="space-y-3">
                      {module.subModules.map((subModule, subIdx) => (
                        <motion.div
                          key={subIdx}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIdx * 0.08 }}
                          className="bg-white rounded-lg p-4 border border-[#D9D9D9] hover:border-[#00C38A] transition-colors"
                        >
                          <h5 className="font-bold text-[#1C2C4E] mb-1.5 text-base">
                            {subModule.name}
                          </h5>
                          <p className="text-xs text-[#7C7C7C] mb-3">
                            {subModule.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {subModule.endpoints.map((endpoint, endIdx) => (
                              <div
                                key={endIdx}
                                className="bg-[#F5F6F7] px-2.5 py-1.5 rounded text-xs text-[#3D3D3D] font-medium"
                              >
                                {endpoint}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
