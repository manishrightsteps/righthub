"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  CreditCard,
  Upload,
  Users,
  Bell,
  MessageSquare,
  Activity,
  Database,
  Lock,
  Zap,
  Server,
  FileCode,
  ChevronRight,
  Sparkles,
  FileType,
  UserCheck,
  Wallet
} from "lucide-react";
import { useRef } from "react";
import apiData from "@/lib/api.json";
import { ModuleCard } from "@/components/module-card";
import { StatsCard } from "@/components/stats-card";
import { FeatureCard } from "@/components/feature-card";
import { FeatureDetailCard } from "@/components/feature-detail-card";
import { ArchitectureCard } from "@/components/architecture-card";
import { AnalyticsCard } from "@/components/analytics-card";
import { EmailSystemCard } from "@/components/email-system-card";
import { AnimatedBackground } from "@/components/animated-background";

const iconMap = {
  "Auth Module": Shield,
  "Profile Module": Users,
  "Subscription Module": CreditCard,
  "Upload Module": Upload,
  "Admin Module": Activity,
  "Notification Module": Bell,
  "Community Module": MessageSquare,
  "Health Module": Activity,
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);

  const totalEndpoints = apiData.modules.reduce((acc, module) => {
    const directEndpoints = module.endpoints?.length || 0;
    const subModuleEndpoints = module.subModules?.reduce(
      (subAcc, sub) => subAcc + (sub.endpoints?.length || 0),
      0
    ) || 0;
    return acc + directEndpoints + subModuleEndpoints;
  }, 0);

  const completedModules = apiData.modules.filter(m => m.status === "completed").length;

  return (
    <div ref={containerRef} className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />

      {/* Floating Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/70 backdrop-blur-2xl rounded-xl border border-[#D9D9D9]/50 shadow-xl shadow-[#142C8E]/5"
        >
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#142C8E] to-[#90B8F8] opacity-15 blur-lg rounded-full" />
                <svg width="36" height="36" viewBox="0 0 600 400" className="relative">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: "#142C8E"}} />
                      <stop offset="50%" style={{stopColor: "#51A8DD"}} />
                      <stop offset="100%" style={{stopColor: "#90B8F8"}} />
                    </linearGradient>
                  </defs>
                  <polygon points="60,60 200,200 60,340" fill="url(#logoGradient)"/>
                  <polygon points="140,60 280,200 140,340" fill="url(#logoGradient)" opacity="0.7"/>
                  <polygon points="220,60 360,200 220,340" fill="url(#logoGradient)" opacity="0.4"/>
                  <rect x="340" y="90" width="20" height="20" fill="#51A8DD" rx="4"/>
                </svg>
              </motion.div>
              <div>
                <h1 className="text-base font-bold bg-linear-to-r from-[#142C8E] via-[#1C2C4E] to-[#142C8E] bg-clip-text text-transparent">
                  Rightsteps
                </h1>
                <p className="text-[10px] text-[#7C7C7C] font-medium">API Inventory v{apiData.project.version}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF1FF]/50 border border-[#142C8E]/20">
                <div className="w-1.5 h-1.5 bg-[#00C38A] rounded-full animate-pulse" />
                <span className="text-[10px] font-semibold text-[#142C8E]">Live</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#7C7C7C]">Last Updated</p>
                <p className="text-xs font-bold text-[#1C2C4E]">{apiData.project.lastUpdated}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, scale: heroScale }}
        className="relative pt-28 pb-8 px-6"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#EBF1FF] to-[#E6F9F4] border border-[#142C8E]/20 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#142C8E]" />
              <span className="text-xs font-semibold bg-linear-to-r from-[#142C8E] to-[#00C38A] bg-clip-text text-transparent">
                {apiData.project.description}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-black mb-5 tracking-tight"
            >
              <span className="bg-linear-to-r from-[#1C2C4E] via-[#142C8E] to-[#1C2C4E] bg-clip-text text-transparent">
                {apiData.project.name.split(' ')[0]}
              </span>
              <span className="text-[#142C8E]"> {apiData.project.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-3"
            >
              <button
                onClick={() => {
                  document.getElementById('api-modules')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#142C8E] text-white rounded-full hover:scale-105 transition-transform cursor-pointer group text-sm"
              >
                <span className="font-semibold">Explore APIs</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://documenter.getpostman.com/view/47127064/2sB3dLUXer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white border-2 border-[#142C8E] text-[#142C8E] rounded-full hover:bg-[#EBF1FF] transition-colors cursor-pointer font-semibold text-sm"
              >
                Documentation
              </a>
            </motion.div>
          </div>

          {/* Stats Grid - Bento Style */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatsCard
              title="Modules"
              value={apiData.modules.length}
              icon={Server}
              color="primary"
              delay={0.5}
            />
            <StatsCard
              title="Endpoints"
              value={totalEndpoints}
              icon={Zap}
              color="green"
              delay={0.6}
            />
            <StatsCard
              title="Complete"
              value={`${Math.round((completedModules/apiData.modules.length)*100)}%`}
              icon={Activity}
              color="yellow"
              delay={0.7}
            />
            <StatsCard
              title="Version"
              value={apiData.project.version}
              icon={FileCode}
              color="coral"
              delay={0.8}
            />
          </div>
        </div>
      </motion.section>

      {/* API Modules Section */}
      <section id="api-modules" className="relative py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block px-3 py-1.5 rounded-full bg-[#142C8E]/10 mb-3">
              <span className="text-xs font-bold text-[#142C8E]">AVAILABLE MODULES</span>
            </div>
            <h2 className="text-3xl font-black text-[#1C2C4E] mb-2">
              API Architecture
            </h2>
            <p className="text-sm text-[#7C7C7C] max-w-2xl mx-auto">
              Modular, scalable, and enterprise-ready API infrastructure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {apiData.modules.map((module, index) => (
              <ModuleCard
                key={module.name}
                module={module}
                icon={iconMap[module.name]}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-12 px-6 bg-linear-to-b from-[#F5F6F7] to-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block px-3 py-1.5 rounded-full bg-[#00C38A]/10 mb-3">
              <span className="text-xs font-bold text-[#00C38A]">PLATFORM CAPABILITIES</span>
            </div>
            <h2 className="text-3xl font-black text-[#1C2C4E]">
              Enterprise Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              title="Authentication"
              items={apiData.features.authentication.methods}
              icon={Lock}
              color="primary"
              delay={0.2}
            />
            <FeatureCard
              title="Payments"
              items={apiData.features.payments.gateways}
              icon={CreditCard}
              color="green"
              delay={0.3}
            />
            <FeatureCard
              title="Storage"
              items={apiData.features.storage.providers}
              icon={Database}
              color="yellow"
              delay={0.4}
            />
            <FeatureCard
              title="Roles"
              items={apiData.features.userTypes.roles}
              icon={Users}
              color="coral"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="relative py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block px-3 py-1.5 rounded-full bg-[#142C8E]/10 mb-3">
              <span className="text-xs font-bold text-[#142C8E]">ADVANCED FEATURES</span>
            </div>
            <h2 className="text-3xl font-black text-[#1C2C4E] mb-2">
              Feature Deep Dive
            </h2>
            <p className="text-sm text-[#7C7C7C] max-w-2xl mx-auto">
              Comprehensive feature set with security, payment methods, and user management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <FeatureDetailCard
              title="Authentication Security"
              sections={[
                {
                  label: "Security Features",
                  items: apiData.features.authentication.security
                }
              ]}
              icon={Shield}
              color="primary"
              delay={0.2}
            />
            <FeatureDetailCard
              title="Payment Methods"
              sections={[
                {
                  label: "Integration Methods",
                  items: apiData.features.payments.methods
                }
              ]}
              icon={Wallet}
              color="green"
              delay={0.3}
            />
            <FeatureDetailCard
              title="Storage & File Types"
              sections={[
                {
                  label: "Supported Files",
                  items: apiData.features.storage.fileTypes
                }
              ]}
              icon={FileType}
              color="yellow"
              delay={0.4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureDetailCard
              title="User Management"
              sections={[
                {
                  label: "Profile Types",
                  items: apiData.features.userTypes.profiles
                },
                {
                  label: "Verification",
                  items: apiData.features.userTypes.verification
                }
              ]}
              icon={UserCheck}
              color="coral"
              delay={0.5}
            />
            <AnalyticsCard
              data={apiData.features.analytics}
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Email System Section */}
      <section className="relative py-12 px-6 bg-linear-to-b from-[#F5F6F7] to-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block px-3 py-1.5 rounded-full bg-[#51A8DD]/10 mb-3">
              <span className="text-xs font-bold text-[#51A8DD]">COMMUNICATION</span>
            </div>
            <h2 className="text-3xl font-black text-[#1C2C4E]">
              Email System
            </h2>
          </motion.div>

          <EmailSystemCard
            data={apiData.features.emailSystem}
            delay={0.2}
          />
        </div>
      </section>

      {/* Architecture */}
      <section className="relative py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block px-3 py-1.5 rounded-full bg-[#90B8F8]/20 mb-3">
              <span className="text-xs font-bold text-[#142C8E]">TECH STACK</span>
            </div>
            <h2 className="text-3xl font-black text-[#1C2C4E]">
              Built With Modern Tech
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ArchitectureCard title="Database" value={apiData.architecture.database} delay={0.2} />
            <ArchitectureCard title="Caching" value={apiData.architecture.caching} delay={0.3} />
            <ArchitectureCard title="Validation" value={apiData.architecture.validation} delay={0.4} />
            <ArchitectureCard title="Logging" value={apiData.architecture.logging} delay={0.5} />
            <ArchitectureCard title="Pattern" value={apiData.architecture.pattern} delay={0.6} />
            <ArchitectureCard title="Error Handling" value={apiData.architecture.errorHandling} delay={0.7} />
            <ArchitectureCard title="Queue" value={apiData.architecture.queue} delay={0.8} />
            <ArchitectureCard title="Socket" value={apiData.architecture.socket} delay={0.9} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#D9D9D9] bg-[#F5F6F7] py-8 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <svg width="32" height="32" viewBox="0 0 600 400">
                <polygon points="60,60 200,200 60,340" fill="#142C8E"/>
                <polygon points="140,60 280,200 140,340" fill="#51A8DD" opacity="0.7"/>
                <polygon points="220,60 360,200 220,340" fill="#90B8F8" opacity="0.4"/>
              </svg>
              <div>
                <p className="font-bold text-[#1C2C4E]">Rightsteps</p>
                <p className="text-xs text-[#7C7C7C]">© 2024 All rights reserved</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#7C7C7C]">Base URL:</span>
              <code className="px-4 py-2 bg-white border border-[#D9D9D9] rounded-lg text-sm font-mono text-[#142C8E]">
                {apiData.project.baseUrl}
              </code>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
