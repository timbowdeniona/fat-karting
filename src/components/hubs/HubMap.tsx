"use client";

import { motion } from "framer-motion";
import { Hub } from "@/types";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Abstract Map Component that uses a glowing grid and plotted nodes
export function HubMap({ hubs }: { hubs: Hub[] }) {
  // Approximate positions on an abstract grid for the two UK hubs
  const getCoordinates = (slug: string) => {
    switch (slug) {
      case "silverstone-karting":
        return { x: 45, y: 55 }; // More central
      case "london-docklands-hub":
        return { x: 60, y: 70 }; // South East
      default:
        return { x: 50, y: 50 };
    }
  };

  return (
    <div className="relative w-full aspect-video md:aspect-[21/9] bg-surface-elevated/30 rounded-3xl overflow-hidden border border-white/5 backdrop-blur-xl group shadow-2xl">
      {/* Abstract Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Connection Lines (Abstract paths between hubs) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff003c" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 45% 55% Q 55% 50% 60% 70%"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      {/* Nodes */}
      {hubs.map((hub, index) => {
        const { x, y } = getCoordinates(hub.slug);
        const isLondon = hub.slug.includes("london");
        
        return (
          <motion.div
            key={hub.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer z-10"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {/* Ping effect */}
            <div className={cn(
              "absolute inset-0 rounded-full animate-ping opacity-75",
              isLondon ? "bg-race-red" : "bg-electric-blue"
            )} />
            
            {/* Core point */}
            <div className={cn(
              "relative w-4 h-4 rounded-full border-2 border-surface flex items-center justify-center transition-transform hover:scale-150 duration-300",
              isLondon ? "bg-race-red shadow-[0_0_15px_#ff003c]" : "bg-electric-blue shadow-[0_0_15px_#00f0ff]"
            )}>
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 translate-y-2 group-hover/node:opacity-100 group-hover/node:translate-y-0 transition-all duration-300 pointer-events-none z-20 w-max">
              <div className="bg-surface-elevated/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-2xl flex items-center space-x-2">
                <MapPin className={cn("w-4 h-4", isLondon ? "text-race-red" : "text-electric-blue")} />
                <div>
                  <div className="text-white font-bold text-sm uppercase italic">{hub.name}</div>
                  <div className="text-slate-400 text-xs tracking-widest uppercase">{hub.location}</div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Scanning effect overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent h-1/4 w-full pointer-events-none"
        animate={{
          top: ["-25%", "125%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
