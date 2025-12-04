"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import {
  GitCommit,
  Bug,
  Sparkles,
  Zap,
  Settings,
  TestTube,
  FileCode,
  Shield,
  ArrowLeft
} from "lucide-react";
import changelogData from "@/lib/change-logs.json";
import Link from "next/link";

const typeIconMap = {
  feature: Sparkles,
  fix: Bug,
  refactor: FileCode,
  performance: Zap,
  config: Settings,
  testing: TestTube,
  security: Shield,
};

const typeColorMap = {
  feature: {
    bg: "bg-[#00C38A]",
    text: "text-white",
    border: "border-[#00C38A]",
    dot: "bg-[#00C38A]",
  },
  fix: {
    bg: "bg-[#ED5C5C]",
    text: "text-white",
    border: "border-[#ED5C5C]",
    dot: "bg-[#ED5C5C]",
  },
  refactor: {
    bg: "bg-[#90B8F8]",
    text: "text-white",
    border: "border-[#90B8F8]",
    dot: "bg-[#90B8F8]",
  },
  performance: {
    bg: "bg-[#FFC94A]",
    text: "text-[#1C2C4E]",
    border: "border-[#FFC94A]",
    dot: "bg-[#FFC94A]",
  },
  config: {
    bg: "bg-[#51A8DD]",
    text: "text-white",
    border: "border-[#51A8DD]",
    dot: "bg-[#51A8DD]",
  },
  testing: {
    bg: "bg-[#142C8E]",
    text: "text-white",
    border: "border-[#142C8E]",
    dot: "bg-[#142C8E]",
  },
  security: {
    bg: "bg-[#1C2C4E]",
    text: "text-white",
    border: "border-[#1C2C4E]",
    dot: "bg-[#1C2C4E]",
  },
};

function ChangeContent({ entry }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border-2 border-[#142C8E]/20 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-[#142C8E] text-white px-3 py-1 text-xs font-bold">
                v{entry.version}
              </Badge>
              <Badge className="bg-[#EBF1FF] text-[#142C8E] px-3 py-1 text-xs font-bold border border-[#142C8E]/30">
                {entry.category}
              </Badge>
            </div>
            <h4 className="text-xl font-black text-[#1C2C4E] mb-2">{entry.summary}</h4>
            <div className="flex items-center gap-4 text-xs text-[#7C7C7C]">
              <span className="flex items-center gap-1.5">
                <GitCommit className="w-3.5 h-3.5" />
                {entry.developer}
              </span>
              <span>{entry.date}</span>
            </div>
          </div>
        </div>

        {/* Changes */}
        <div className="space-y-4">
          {entry.changes?.map((change, idx) => {
            const Icon = typeIconMap[change.type] || GitCommit;
            const colors = typeColorMap[change.type] || typeColorMap.feature;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-[#F5F6F7] rounded-lg p-4 border-l-4 ${colors.border}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${colors.bg} w-8 h-8 rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${colors.bg} ${colors.text} px-2 py-0.5 text-[10px] font-bold uppercase`}>
                        {change.type}
                      </Badge>
                      <span className="text-xs font-bold text-[#51A8DD]">{change.module}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#1C2C4E] mb-2">{change.description}</p>

                    {change.details && (
                      <ul className="space-y-1.5 mb-3">
                        {change.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-[#3D3D3D]">
                            <div className={`${colors.dot} w-1.5 h-1.5 rounded-full mt-1.5 shrink-0`} />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {change.technicalNotes && (
                      <div className="bg-[#EBF1FF] rounded px-3 py-2 mt-2">
                        <p className="text-[10px] font-bold text-[#142C8E] mb-1">TECHNICAL NOTES</p>
                        <p className="text-xs text-[#1C2C4E]">{change.technicalNotes}</p>
                      </div>
                    )}

                    {change.testResults && (
                      <div className="bg-white rounded px-3 py-2 mt-2 border border-[#D9D9D9]">
                        <p className="text-[10px] font-bold text-[#00C38A] mb-2">TEST RESULTS</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                          {Object.entries(change.testResults).map(([key, value], tIdx) => (
                            <div key={tIdx} className="text-xs font-mono">
                              <span className="text-[#7C7C7C]">{key}: </span>
                              <span className="text-[#00C38A] font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bug Fixes */}
      {entry.bugFixes && entry.bugFixes.length > 0 && (
        <div className="bg-[#FFF5F5] rounded-xl p-4 border-2 border-[#ED5C5C]/20">
          <h5 className="text-sm font-bold text-[#ED5C5C] mb-3 flex items-center gap-2">
            <Bug className="w-4 h-4" />
            BUG FIXES
          </h5>
          <ul className="space-y-2">
            {entry.bugFixes.map((fix, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#3D3D3D]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ED5C5C] mt-1.5 shrink-0" />
                <span>{fix}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {entry.improvements && entry.improvements.length > 0 && (
        <div className="bg-[#E6F9F4] rounded-xl p-4 border-2 border-[#00C38A]/20">
          <h5 className="text-sm font-bold text-[#00C38A] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            IMPROVEMENTS
          </h5>
          <ul className="space-y-2">
            {entry.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#3D3D3D]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C38A] mt-1.5 shrink-0" />
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Deployment Info */}
      {entry.deployment && (
        <div className="bg-[#F5F6F7] rounded-xl p-4 border-2 border-[#D9D9D9]">
          <h5 className="text-sm font-bold text-[#1C2C4E] mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            DEPLOYMENT
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#7C7C7C]">Environment: </span>
              <span className="font-bold text-[#1C2C4E]">{entry.deployment.environment}</span>
            </div>
            <div>
              <span className="text-[#7C7C7C]">Requires Restart: </span>
              <span className="font-bold text-[#1C2C4E]">
                {entry.deployment.requiresRestart ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className="text-[#7C7C7C]">Requires Migration: </span>
              <span className="font-bold text-[#1C2C4E]">
                {entry.deployment.requiresMigration ? "Yes" : "No"}
              </span>
            </div>
          </div>
          {entry.deployment.envUpdates && entry.deployment.envUpdates.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] font-bold text-[#7C7C7C] mb-1.5">ENV UPDATES:</p>
              {entry.deployment.envUpdates.map((update, idx) => (
                <code key={idx} className="block text-xs bg-white px-2 py-1 rounded font-mono text-[#142C8E] mb-1">
                  {update}
                </code>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ChangelogPage() {
  const timelineData = changelogData.changelog.map((entry) => ({
    title: entry.date,
    content: <ChangeContent entry={entry} />,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
      >
        <div className="bg-white/70 backdrop-blur-2xl rounded-xl border border-[#D9D9D9]/50 shadow-xl shadow-[#142C8E]/5">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EBF1FF] hover:bg-[#142C8E] text-[#142C8E] hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-semibold">Back</span>
              </Link>
              <div className="h-6 w-px bg-[#D9D9D9]" />
              <div>
                <h1 className="text-base font-bold bg-linear-to-r from-[#142C8E] via-[#1C2C4E] to-[#142C8E] bg-clip-text text-transparent">
                  {changelogData.project.name}
                </h1>
                <p className="text-[10px] text-[#7C7C7C] font-medium">v{changelogData.project.version}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF1FF]/50 border border-[#142C8E]/20">
                <div className="w-1.5 h-1.5 bg-[#00C38A] rounded-full animate-pulse" />
                <span className="text-[10px] font-semibold text-[#142C8E]">Live</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#7C7C7C]">Last Updated</p>
                <p className="text-xs font-bold text-[#1C2C4E]">{changelogData.project.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-28 pb-6 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#EBF1FF] to-[#E6F9F4] border border-[#142C8E]/20 mb-6"
            >
              <GitCommit className="w-3.5 h-3.5 text-[#142C8E]" />
              <span className="text-xs font-semibold bg-linear-to-r from-[#142C8E] to-[#00C38A] bg-clip-text text-transparent">
                {changelogData.project.description}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-black mb-5 tracking-tight"
            >
              <span className="bg-linear-to-r from-[#1C2C4E] via-[#142C8E] to-[#1C2C4E] bg-clip-text text-transparent">
                Development Timeline
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-[#7C7C7C] max-w-2xl mx-auto"
            >
              Track our development journey with detailed change logs, bug fixes, and improvements
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline data={timelineData} />
    </div>
  );
}
