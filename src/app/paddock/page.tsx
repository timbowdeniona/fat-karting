import { GlowEffect } from "@/components/ui/GlowEffect";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Trophy, 
  Settings, 
  ChevronRight, 
  Zap, 
  BarChart3, 
  History, 
  Bell,
  Star,
  User,
  Calendar
} from "lucide-react";
import Image from "next/image";

export default function PaddockPage() {
  return (
    <div className="relative min-h-screen pb-32">
      <GlowEffect color="blue" position="top" className="opacity-20" />
      
      {/* Header / Profile */}
      <div className="container mx-auto px-4 pt-12 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-race-red">
              <Image 
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=200" 
                alt="Profile" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black italic uppercase tracking-tighter">Alex Apex</h1>
              <div className="flex items-center space-x-2">
                <Badge variant="red" className="px-1.5 h-5">PRO</Badge>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Lvl 42</span>
              </div>
            </div>
          </div>
          <button className="w-12 h-12 bg-surface-elevated rounded-xl flex items-center justify-center border border-white/5 relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-race-red rounded-full shadow-[0_0_8px_#FF3E3E]" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-surface-elevated border-white/5">
            <CardContent className="p-4">
              <Trophy className="w-4 h-4 text-yellow-400 mb-2" />
              <div className="text-xl font-black italic">1st</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">League Rank</div>
            </CardContent>
          </Card>
          <Card className="bg-surface-elevated border-white/5">
            <CardContent className="p-4">
              <Zap className="w-4 h-4 text-electric-blue mb-2" />
              <div className="text-xl font-black italic">485</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Pts</div>
            </CardContent>
          </Card>
          <Card className="bg-surface-elevated border-white/5">
            <CardContent className="p-4">
              <BarChart3 className="w-4 h-4 text-race-red mb-2" />
              <div className="text-xl font-black italic">12.4%</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Win Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-surface-elevated border-white/5">
            <CardContent className="p-4">
              <Star className="w-4 h-4 text-emerald-400 mb-2" />
              <div className="text-xl font-black italic">8</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Podiums</div>
            </CardContent>
          </Card>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter mb-4 flex items-center">
                <History className="w-5 h-5 mr-2 text-race-red" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  { race: "London Docklands Hub", pos: "1st", pts: "+25", date: "2 days ago" },
                  { race: "Silverstone Grand Prix", pos: "3rd", pts: "+15", date: "1 week ago" },
                  { race: "Manchester Velocity", pos: "2nd", pts: "+18", date: "2 weeks ago" },
                ].map((item, i) => (
                  <div key={i} className="bg-surface-elevated/50 p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-asphalt rounded-xl flex items-center justify-center font-black italic text-race-red">
                        {item.pos}
                      </div>
                      <div>
                        <div className="font-bold">{item.race}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{item.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black italic text-emerald-400">{item.pts}</div>
                      <ChevronRight className="w-4 h-4 text-slate-700 inline-block ml-2 group-hover:text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button variant="outline" className="w-full h-16 border-dashed border-2 hover:bg-white/5">
              View All Results
            </Button>
          </div>

          {/* Sidebar / Tools */}
          <div className="space-y-8">
            <Card className="bg-race-red/10 border-race-red/20 shadow-[0_0_30px_rgba(255,62,62,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg">Next Race</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black italic uppercase mb-2">Night Circuit Bash</div>
                <div className="text-xs text-race-red font-bold uppercase tracking-widest mb-6">Starts in: 04d 12h 30m</div>
                <Button className="w-full">Race Briefing</Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Settings</h3>
              <Button variant="ghost" className="w-full justify-between h-14 bg-surface-elevated px-6 hover:bg-white/5">
                <span className="flex items-center"><User className="w-4 h-4 mr-3" /> Profile Settings</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Button>
              <Button variant="ghost" className="w-full justify-between h-14 bg-surface-elevated px-6 hover:bg-white/5">
                <span className="flex items-center"><Settings className="w-4 h-4 mr-3" /> Notification Preferences</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Nav (Simulated) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-asphalt/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-6 z-50">
        <div className="flex flex-col items-center space-y-1 text-race-red">
          <Zap className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Dashboard</span>
        </div>
        <div className="flex flex-col items-center space-y-1 text-slate-500">
          <Trophy className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Standings</span>
        </div>
        <div className="flex flex-col items-center space-y-1 text-slate-500">
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Events</span>
        </div>
        <div className="flex flex-col items-center space-y-1 text-slate-500">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </div>
      </div>
    </div>
  );
}
