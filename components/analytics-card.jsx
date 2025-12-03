"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Filter } from "lucide-react";

export function AnalyticsCard({ data, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-5 border-2 border-[#90B8F8]/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#90B8F8] group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-lg bg-linear-to-br from-[#90B8F8] to-[#142C8E] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-black text-[#1C2C4E]">Analytics & Insights</h3>
          <p className="text-xs text-[#7C7C7C] mt-1">Comprehensive platform analytics</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#90B8F8]" />
            <h4 className="text-xs font-bold text-[#90B8F8] uppercase tracking-wider">Metrics</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + idx * 0.05 }}
                className="bg-[#EBF1FF] px-3 py-2 rounded-lg text-xs text-[#1C2C4E] font-semibold"
              >
                {metric}
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-[#90B8F8]" />
            <h4 className="text-xs font-bold text-[#90B8F8] uppercase tracking-wider">Filtering Options</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.filtering.map((filter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.2 + idx * 0.05 }}
                className="px-3 py-1.5 bg-white border border-[#90B8F8] rounded-full text-xs font-semibold text-[#142C8E]"
              >
                {filter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
