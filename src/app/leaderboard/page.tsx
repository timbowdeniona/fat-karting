"use client";

import { useState } from "react";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { Trophy, Globe2, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const LEAGUES = [
  { id: "Global", name: "Global Championship", icon: Globe2 },
  { id: "North America", name: "NA Regional", icon: Map },
  { id: "Europe", name: "EU Regional", icon: Map },
  { id: "Asia Pacific", name: "APAC Regional", icon: Map },
];

export default function LeaderboardPage() {
  const [activeLeague, setActiveLeague] = useState(LEAGUES[0].id);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-race-red/10 rounded-2xl mb-2">
            <Trophy className="w-8 h-8 text-race-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
            League <span className="text-race-red">Standings</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Track the world's fastest drivers across all FAT Karting leagues. 
            Points are updated live from every official race event.
          </p>
        </div>

        {/* League Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {LEAGUES.map((league) => {
            const Icon = league.icon;
            const isActive = activeLeague === league.id;
            
            return (
              <button
                key={league.id}
                onClick={() => setActiveLeague(league.id)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-full font-bold text-sm transition-all duration-300",
                  isActive 
                    ? "bg-race-red text-white shadow-[0_0_15px_rgba(255,51,102,0.5)]" 
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {league.name}
              </button>
            );
          })}
        </div>

        {/* Leaderboard Table */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" key={activeLeague}>
          <Leaderboard region={activeLeague} />
        </div>
      </div>
    </div>
  );
}
