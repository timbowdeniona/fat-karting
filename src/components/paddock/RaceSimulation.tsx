"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Activity, 
  Gauge, 
  Thermometer, 
  Battery, 
  ChevronRight,
  X
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { TrackDiagram } from "./TrackDiagram";

interface Telemetry {
  speed: number;
  tyreTemp: {
    fl: number;
    fr: number;
    rl: number;
    rr: number;
  };
  battery: number;
  lap: number;
  progress: number;
}

export function RaceSimulation({ onComplete, onClose }: { onComplete: () => void; onClose: () => void }) {
  const [telemetry, setTelemetry] = useState<Telemetry>({
    speed: 0,
    tyreTemp: { fl: 20, fr: 20, rl: 20, rr: 20 },
    battery: 100,
    lap: 1,
    progress: 0,
  });

  const [isFinished, setIsFinished] = useState(false);

  const updateTelemetry = useCallback(() => {
    setTelemetry(prev => {
      if (prev.lap > 3) {
        setIsFinished(true);
        return prev;
      }

      // Simulate progress
      const newProgress = prev.progress + 0.5;
      const newLap = Math.floor(newProgress / 100) + 1;
      
      if (newLap > 3) {
        setIsFinished(true);
        return { ...prev, lap: 3, progress: 100, speed: 0 };
      }

      // Simulate speed (0 to 120 km/h)
      const baseSpeed = 80 + Math.sin(newProgress * 0.1) * 30;
      const speed = Math.min(120, Math.max(0, baseSpeed + (Math.random() - 0.5) * 10));

      // Simulate tyre temps (heat up then stabilize)
      const tempBase = 60 + Math.min(20, newProgress * 0.2);
      const tyreTemp = {
        fl: tempBase + (Math.random() - 0.5) * 5,
        fr: tempBase + (Math.random() - 0.5) * 5,
        rl: tempBase + 5 + (Math.random() - 0.5) * 5,
        rr: tempBase + 5 + (Math.random() - 0.5) * 5,
      };

      // Simulate battery drain
      const battery = Math.max(0, 100 - (newProgress / 3));

      return {
        speed,
        tyreTemp,
        battery,
        lap: newLap,
        progress: newProgress,
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateTelemetry, 100);
    return () => clearInterval(interval);
  }, [updateTelemetry]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-asphalt flex flex-col items-center justify-center overflow-hidden font-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,62,62,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 2000, opacity: 0 }}
            animate={{ 
              y: 2000, 
              opacity: [0, 0.2, 0] 
            }}
            transition={{ 
              duration: 1 + Math.random(), 
              repeat: Infinity, 
              delay: Math.random() 
            }}
            className="absolute w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
        <div className="flex items-center space-x-6">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Session</div>
            <div className="text-2xl font-black italic uppercase text-white">Live Race Sim</div>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Lap</div>
            <div className="text-2xl font-black italic uppercase text-race-red">
              {telemetry.lap} <span className="text-white/30 text-lg">/ 3</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-race-red/20 hover:border-race-red/50 transition-all group"
        >
          <X className="w-5 h-5 text-white/50 group-hover:text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center">
        
        {/* Track Diagram Overlay (Middle Left) */}
        <div className="absolute z-10 top-1/2 -translate-y-1/2 left-[5%] w-64 h-40 bg-surface-elevated/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          <TrackDiagram 
            progress={telemetry.progress % 100} 
            className="w-full h-full p-2"
          />
        </div>

        {/* Central Kart Diagram */}
        <div className="relative w-[60%] aspect-square">
          <motion.div 
            animate={{ 
              y: [0, -2, 0],
              rotate: [0, 0.2, -0.2, 0]
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="relative w-full h-full"
          >
            <Image 
              src="/assets/kart-schematic.png" 
              alt="Kart Schematic" 
              fill
              className="object-contain opacity-80"
              priority
            />
            
            {/* Tyre Temp Indicators */}
            <div className="absolute top-[22%] left-[23%] w-12 h-20 bg-race-red/20 rounded-lg blur-md" style={{ opacity: (telemetry.tyreTemp.fl - 20) / 80 }} />
            <div className="absolute top-[22%] right-[23%] w-12 h-20 bg-race-red/20 rounded-lg blur-md" style={{ opacity: (telemetry.tyreTemp.fr - 20) / 80 }} />
            <div className="absolute bottom-[22%] left-[23%] w-12 h-24 bg-race-red/20 rounded-lg blur-md" style={{ opacity: (telemetry.tyreTemp.rl - 20) / 80 }} />
            <div className="absolute bottom-[22%] right-[23%] w-12 h-24 bg-race-red/20 rounded-lg blur-md" style={{ opacity: (telemetry.tyreTemp.rr - 20) / 80 }} />
          </motion.div>
        </div>

        {/* Telemetry Overlays */}
        {/* Top Left: Speed */}
        <div className="absolute top-[10%] left-[5%] flex flex-col items-start">
          <div className="flex items-center space-x-2 text-slate-500 mb-2">
            <Gauge className="w-4 h-4" />
            <span className="text-xs uppercase font-black tracking-widest">Velocity</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-7xl font-black italic tabular-nums text-white leading-none">
              {Math.floor(telemetry.speed)}
            </span>
            <span className="text-xl font-black italic text-race-red uppercase">km/h</span>
          </div>
          <div className="w-48 h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-race-red shadow-[0_0_10px_#FF3E3E]"
              animate={{ width: `${(telemetry.speed / 120) * 100}%` }}
            />
          </div>
        </div>

        {/* Top Right: Battery */}
        <div className="absolute top-[10%] right-[5%] flex flex-col items-end">
          <div className="flex items-center space-x-2 text-slate-500 mb-2">
            <span className="text-xs uppercase font-black tracking-widest">Energy Core</span>
            <Battery className="w-4 h-4" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-black italic tabular-nums text-white leading-none">
              {telemetry.battery.toFixed(1)}
            </span>
            <span className="text-xl font-black italic text-electric-blue uppercase">%</span>
          </div>
          <div className="w-48 h-2 bg-white/10 mt-4 rounded-full overflow-hidden flex justify-end">
            <motion.div 
              className="h-full bg-electric-blue shadow-[0_0_10px_#2E5BFF]"
              animate={{ width: `${telemetry.battery}%` }}
            />
          </div>
        </div>

        {/* Bottom Left: Tyre Temps */}
        <div className="absolute bottom-[10%] left-[5%] grid grid-cols-2 gap-4">
          {[
            { label: "FL", val: telemetry.tyreTemp.fl },
            { label: "FR", val: telemetry.tyreTemp.fr },
            { label: "RL", val: telemetry.tyreTemp.rl },
            { label: "RR", val: telemetry.tyreTemp.rr },
          ].map((tyre, i) => (
            <div key={i} className="bg-surface-elevated/80 backdrop-blur-md p-4 rounded-xl border border-white/5 w-24">
              <div className="text-[10px] text-slate-500 uppercase font-black mb-1">{tyre.label}</div>
              <div className="text-xl font-black italic text-white">{Math.floor(tyre.val)}°C</div>
              <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300" 
                  style={{ 
                    width: `${Math.min(100, (tyre.val / 100) * 100)}%`,
                    backgroundColor: tyre.val > 80 ? "#FF3E3E" : tyre.val > 60 ? "#F59E0B" : "#2E5BFF"
                  }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Right: G-Force / Systems */}
        <div className="absolute bottom-[10%] right-[5%] flex flex-col items-end">
          <div className="bg-surface-elevated/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 space-y-4 w-64">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 uppercase font-black">Motor State</span>
              <Badge variant="green" className="h-4 text-[8px]">ACTIVE</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 uppercase font-black">Diff Lock</span>
              <span className="text-xs font-black text-white italic">HYPER</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 uppercase font-black">Brake Bias</span>
              <span className="text-xs font-black text-white italic">54/46</span>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <Activity className="w-4 h-4 text-race-red" />
              <div className="text-right">
                <div className="text-[8px] text-slate-500 uppercase font-black">Signal Strength</div>
                <div className="text-xs font-black text-white italic">99.8%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Progress */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4 text-[10px] text-slate-500 uppercase font-black tracking-widest">
            <span>Start / Finish</span>
            <span>Current Progress</span>
          </div>
          <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-race-red via-electric-blue to-race-red bg-[length:200%_100%] animate-[race-stripe_4s_linear_infinite]"
              animate={{ width: `${telemetry.progress % 100}%` }}
            />
            {/* Lap Dividers */}
            <div className="absolute inset-0 flex">
              <div className="flex-1 border-r border-white/20" />
              <div className="flex-1 border-r border-white/20" />
              <div className="flex-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Finish Overlay */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-50 bg-asphalt/90 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-24 h-24 bg-race-red rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_50px_rgba(255,62,62,0.5)]">
                <Activity className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4">Race Complete</h2>
              <p className="text-slate-400 max-w-md mb-12 mx-auto uppercase tracking-widest font-bold text-sm">
                Session data has been synchronized with the paddock. Your performance metrics are ready for review.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <button 
                  onClick={onComplete}
                  className="px-12 h-16 bg-white text-asphalt font-black italic uppercase rounded-2xl hover:bg-race-red hover:text-white transition-all transform hover:scale-105"
                >
                  Return to Paddock
                </button>
                <button 
                  onClick={() => {
                    setIsFinished(false);
                    setTelemetry({
                      speed: 0,
                      tyreTemp: { fl: 20, fr: 20, rl: 20, rr: 20 },
                      battery: 100,
                      lap: 1,
                      progress: 0,
                    });
                  }}
                  className="px-12 h-16 bg-white/5 border border-white/10 text-white font-black italic uppercase rounded-2xl hover:bg-white/10 transition-all transform hover:scale-105"
                >
                  Restart Sim
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
