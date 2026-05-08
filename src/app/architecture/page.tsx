"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { Badge } from "@/components/ui/Badge";
import { 
  Server, 
  Cpu, 
  Database, 
  Globe, 
  Zap, 
  ShoppingBag, 
  MessageSquare,
  ArrowRight
} from "lucide-react";

const components = [
  {
    title: "Frontend Layer",
    icon: Globe,
    tech: "Next.js 15 (App Router)",
    desc: "Electro design system built with Tailwind CSS v4 and Framer Motion for high-performance interactions.",
    color: "blue",
    pos: "top"
  },
  {
    title: "CMS Layer",
    icon: Database,
    tech: "Contentful",
    desc: "Decoupled content management via GraphQL API for dynamic events and hub pages.",
    color: "blue",
    pos: "left"
  },
  {
    title: "Ticketing Layer",
    icon: ShoppingBag,
    tech: "Vivenu",
    desc: "Full headless integration for a seamless, branded checkout experience.",
    color: "red",
    pos: "right"
  },
  {
    title: "Backend Layer",
    icon: Server,
    tech: "GCP Services",
    desc: "Cloud Functions for race data processing and Firestore for real-time leaderboard sync.",
    color: "blue",
    pos: "bottom-left"
  },
  {
    title: "RAG Corpus",
    icon: Cpu,
    tech: "Vector Engine",
    desc: "AI-powered knowledge retrieval for real-time rulebook analysis and driver support.",
    color: "red",
    pos: "bottom-right"
  }
];

export default function ArchitecturePage() {
  return (
    <div className="relative min-h-screen pb-32">
      <GlowEffect color="both" position="top" className="opacity-30" />
      
      <section className="container mx-auto px-4 pt-20 mb-20 text-center">
        <Badge variant="outline" className="mb-6">System Overview</Badge>
        <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
          Electro <span className="electro-gradient-text">Architecture</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          A modern MACH-based solution engineered for speed, scalability, and seamless integration.
        </p>
      </section>

      {/* Visual Diagram */}
      <section className="container mx-auto px-4 relative mb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Lines (Desktop Only) */}
          <div className="hidden md:block absolute inset-0 -z-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, delay: 1 }}
                d="M500 100 L500 500 M167 500 L833 500 M500 500 L167 900 M500 500 L833 900" 
                stroke="white" 
                strokeWidth="2" 
                strokeDasharray="8 8"
              />
            </svg>
          </div>

          {/* Frontend (Top Center) */}
          <div className="md:col-start-2">
            <ArchNode item={components[0]} />
          </div>

          <div className="md:col-span-3 h-12" /> {/* Spacer */}

          {/* CMS (Middle Left) */}
          <ArchNode item={components[1]} />

          {/* Central Hub Decorative */}
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 bg-asphalt border-2 border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] relative group">
              <Zap className="w-10 h-10 text-race-red animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-race-red/20 blur-xl group-hover:bg-race-red/40 transition-colors" />
            </div>
          </div>

          {/* Ticketing (Middle Right) */}
          <ArchNode item={components[2]} />

          <div className="md:col-span-3 h-12" /> {/* Spacer */}

          {/* Backend (Bottom Left) */}
          <div className="md:col-start-1">
            <ArchNode item={components[3]} />
          </div>

          <div className="md:col-start-2 h-1" /> {/* Spacer */}

          {/* AI (Bottom Right) */}
          <div className="md:col-start-3">
            <ArchNode item={components[4]} />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { t: "Microservices", d: "Independent components for CMS, Ticketing, and Race Data." },
            { t: "API-First", d: "All data flow occurs via GraphQL and REST endpoints." },
            { t: "Cloud-Native", d: "Designed for resilient hosting on Google Cloud Platform." },
            { t: "Headless", d: "Frontend decoupled from back-office management layers." }
          ].map((p, i) => (
            <div key={i} className="p-8 bg-surface-elevated rounded-3xl border border-white/5">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3">{p.t}</h4>
              <p className="text-slate-500 text-sm">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ArchNode({ item }: { item: any }) {
  const Icon = item.icon;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 bg-surface-elevated border border-white/5 rounded-3xl relative group hover:border-white/20 transition-all shadow-xl"
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3",
        item.color === "red" ? "bg-race-red/10 text-race-red" : "bg-electric-blue/10 text-electric-blue"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
      <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 mb-4">{item.tech}</div>
      <p className="text-sm text-slate-500 leading-relaxed">
        {item.desc}
      </p>
      
      {/* Decorative Glow */}
      <div className={cn(
        "absolute -inset-px rounded-3xl -z-10 opacity-0 group-hover:opacity-10 transition-opacity blur-lg",
        item.color === "red" ? "bg-race-red" : "bg-electric-blue"
      )} />
    </motion.div>
  );
}
