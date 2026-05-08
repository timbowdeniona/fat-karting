"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrackDiagramProps {
  progress: number; // 0 to 100
  className?: string;
}

export function TrackDiagram({ progress, className }: TrackDiagramProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });

  // A sleek, premium circuit path
  const circuitPath = "M150 100 C200 100 250 50 350 50 C450 50 550 100 550 200 C550 300 450 350 300 350 C150 350 50 300 50 200 C50 100 100 100 150 100";

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      const p = pathRef.current.getPointAtLength((progress / 100) * length);
      setPoint({ x: p.x, y: p.y });
    }
  }, [progress]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 p-4">
        <div className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Circuit</div>
        <div className="text-xs font-black italic uppercase text-white">Neon GP</div>
      </div>

      <svg
        viewBox="0 0 600 400"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Track Outer Glow */}
        <path
          d={circuitPath}
          stroke="#FF3E3E"
          strokeWidth="12"
          strokeLinecap="round"
          className="opacity-5 blur-xl"
        />
        
        {/* Track Base Layer */}
        <path
          d={circuitPath}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Dynamic Track Progress Trace */}
        <motion.path
          d={circuitPath}
          stroke="url(#trackGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-20"
        />

        {/* Start/Finish Line Indicator */}
        <g transform="translate(150, 100) rotate(90)">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="1" className="opacity-30" />
          <text x="10" y="3" fill="white" className="text-[8px] font-black opacity-20 uppercase tracking-tighter">S/F</text>
        </g>

        {/* Hidden path for length calculation */}
        <path
          ref={pathRef}
          d={circuitPath}
          stroke="transparent"
          strokeWidth="1"
        />

        {/* Moving Marker */}
        <motion.g
          animate={{ x: point.x, y: point.y }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            mass: 0.5
          }}
        >
          {/* Marker Glow */}
          <circle r="10" fill="#FF3E3E" className="opacity-20 blur-md" />
          <circle r="6" fill="#FF3E3E" className="opacity-40 blur-sm" />
          
          {/* Marker Core */}
          <circle 
            r="4" 
            fill="#FF3E3E" 
            className="shadow-[0_0_15px_#FF3E3E]" 
            stroke="white" 
            strokeWidth="1"
          />
          
          {/* Pulse Effect */}
          <motion.circle
            r="4"
            stroke="#FF3E3E"
            strokeWidth="1"
            fill="transparent"
            animate={{ 
              scale: [1, 2.5],
              opacity: [0.5, 0]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.g>

        <defs>
          <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF3E3E" />
            <stop offset="50%" stopColor="#2E5BFF" />
            <stop offset="100%" stopColor="#FF3E3E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
