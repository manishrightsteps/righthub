"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Palette, Code2, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";

export function EmailSystemCard({ data, delay = 0 }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-5 border-2 border-[#51A8DD]/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#51A8DD]"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-lg bg-linear-to-br from-[#51A8DD] to-[#142C8E] flex items-center justify-center shadow-md">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-black text-[#1C2C4E]">Email System</h3>
          <p className="text-xs text-[#7C7C7C] mt-1">{data.description}</p>
          <code className="text-[10px] text-[#51A8DD] bg-[#EBF1FF] px-2 py-1 rounded mt-2 inline-block font-mono">
            {data.location}
          </code>
        </div>
      </div>

      {/* Architecture */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-4 h-4 text-[#51A8DD]" />
          <h4 className="text-xs font-bold text-[#51A8DD] uppercase tracking-wider">Architecture</h4>
        </div>
        <div className="space-y-1.5">
          {data.architecture.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + idx * 0.05 }}
              className="flex items-start gap-2 text-xs text-[#3D3D3D]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#51A8DD] mt-1.5 shrink-0" />
              <span className="font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Branding Colors */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('branding')}
          className="w-full flex items-center justify-between mb-2 group"
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#51A8DD]" />
            <h4 className="text-xs font-bold text-[#51A8DD] uppercase tracking-wider">Branding Colors</h4>
          </div>
          <motion.div
            animate={{ rotate: expandedSection === 'branding' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4 text-[#51A8DD]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSection === 'branding' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-2">
                <div>
                  <p className="text-[10px] font-bold text-[#7C7C7C] mb-1.5">Primary</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: data.branding.colors.primary }} />
                    <span className="text-xs text-[#3D3D3D] font-mono">{data.branding.colors.primary}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[#7C7C7C] mb-1.5">Secondary</p>
                  <div className="flex flex-wrap gap-2">
                    {data.branding.colors.secondary.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: color.split(' ')[0] }} />
                        <span className="text-[10px] text-[#3D3D3D] font-mono">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[#7C7C7C] mb-1.5">Accent</p>
                  <div className="flex flex-wrap gap-2">
                    {data.branding.colors.accent.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: color.split(' ')[0] }} />
                        <span className="text-[10px] text-[#3D3D3D] font-mono">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Templates */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('templates')}
          className="w-full flex items-center justify-between mb-2 group"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#51A8DD]" />
            <h4 className="text-xs font-bold text-[#51A8DD] uppercase tracking-wider">Email Templates</h4>
          </div>
          <motion.div
            animate={{ rotate: expandedSection === 'templates' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4 text-[#51A8DD]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSection === 'templates' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-2">
                {Object.entries(data.templates).map(([category, templates], idx) => (
                  <div key={idx}>
                    <p className="text-[10px] font-bold text-[#51A8DD] mb-1.5 uppercase">{category}</p>
                    <div className="space-y-1.5">
                      {templates.map((template, tIdx) => (
                        <div
                          key={tIdx}
                          className="bg-[#EBF1FF] px-2.5 py-1.5 rounded-lg text-[10px] text-[#1C2C4E] font-medium"
                        >
                          {template}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper Functions */}
      <div className="bg-[#F5F6F7] p-3 rounded-lg">
        <p className="text-[10px] font-bold text-[#7C7C7C] mb-1">Helper Functions</p>
        <code className="text-[10px] text-[#1C2C4E] font-mono">{data.helperFunctions}</code>
      </div>
    </motion.div>
  );
}
