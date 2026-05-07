"use client";

import { useEffect, useState } from "react";
import { Driver } from "@/types";
import { subscribeToLeaderboard } from "@/lib/gcp-mock";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Leaderboard({ limit }: { limit?: number }) {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((data) => {
      setDrivers(limit ? data.slice(0, limit) : data);
    });
    return () => unsubscribe();
  }, [limit]);

  return (
    <Card className="bg-surface-elevated/50 backdrop-blur-xl border-white/5 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
        <CardTitle className="text-lg flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-race-red" />
          Season Standings
        </CardTitle>
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">Live</span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="px-6 py-3 font-medium">Pos</th>
                <th className="px-6 py-3 font-medium">Driver</th>
                <th className="px-6 py-3 font-medium">Trend</th>
                <th className="px-6 py-3 font-medium text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {drivers.map((driver, index) => (
                <tr key={driver.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className={cn(
                      "font-black italic text-lg",
                      index === 0 ? "text-yellow-400" : index === 1 ? "text-slate-300" : index === 2 ? "text-amber-600" : "text-slate-500"
                    )}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white group-hover:text-race-red transition-colors">{driver.name}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{driver.wins} Wins • {driver.podiums} Podiums</div>
                  </td>
                  <td className="px-6 py-4">
                    {driver.trend === "up" && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                    {driver.trend === "down" && <TrendingDown className="w-4 h-4 text-race-red" />}
                    {driver.trend === "neutral" && <Minus className="w-4 h-4 text-slate-600" />}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono font-bold text-electric-blue">{driver.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
