import { getHubs } from "@/lib/contentful";
import Image from "next/image";
import Link from "next/link";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { Badge } from "@/components/ui/Badge";
import { MapPin, ArrowRight, Route, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { HubMap } from "@/components/hubs/HubMap";

export default async function HubsIndexPage() {
  const hubs = await getHubs();

  return (
    <div className="relative pb-32">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-asphalt -z-20" />
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-20 -z-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <GlowEffect color="blue" position="top-left" className="opacity-40" />
        <GlowEffect color="red" position="bottom-right" className="opacity-30" />
        
        <div className="container mx-auto px-4 text-center z-10">
          <Badge variant="blue" className="mb-6">Global Network</Badge>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Race Hubs
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Experience the future of high-performance electric karting at our FIA-grade facilities across the globe.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 -mt-20 relative z-20 mb-32">
        <HubMap hubs={hubs} />
      </section>

      {/* Hubs Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black italic uppercase flex items-center">
            <Zap className="w-8 h-8 text-electric-blue mr-3" />
            Active Locations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hubs.map((hub) => (
            <Link key={hub.id} href={`/hubs/${hub.slug}`} className="block group">
              <Card className="bg-surface-card border-white/5 overflow-hidden hover:border-electric-blue/50 transition-all duration-500 h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={hub.image}
                    alt={hub.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Online</span>
                  </div>
                </div>
                
                <CardContent className="p-8 relative -mt-10">
                  <div className="bg-surface-elevated/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl group-hover:border-white/20 transition-colors">
                    <div className="flex items-center text-electric-blue mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-sm font-bold uppercase tracking-widest">{hub.location}</span>
                    </div>
                    
                    <h3 className="text-2xl font-black italic uppercase mb-2 group-hover:text-electric-blue transition-colors">
                      {hub.name}
                    </h3>
                    
                    <p className="text-slate-400 mb-6 line-clamp-2">
                      {hub.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-slate-300">
                          <Route className="w-4 h-4 mr-2 text-slate-500" />
                          <span className="text-sm font-mono">{hub.trackLength}</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-electric-blue group-hover:text-asphalt transition-all duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
