import { getEvents } from "@/lib/contentful";
import { EventCard } from "@/components/events/EventCard";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Trophy, Zap, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const events = await getEvents();
  const upcomingEvents = events.filter(e => e.status !== "completed").slice(0, 3);

  return (
    <div className="relative overflow-hidden pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-52 overflow-hidden">
        <GlowEffect position="top" color="both" />
        
        {/* Background Image */}
        <div className="absolute inset-0 -z-30">
          <Image 
            src="/assets/hero.png" 
            alt="Racing" 
            fill 
            priority 
            className="object-cover opacity-40 grayscale-[0.5] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-asphalt/20 via-asphalt/60 to-asphalt" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="blue" className="mb-6 px-4 py-1.5 text-sm tracking-widest uppercase">Season 2026 Now Live</Badge>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-8 leading-[0.9]">
            Electro-Powered <br />
            <span className="electro-gradient-text">Karting League</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Join the UK's most competitive amateur karting circuit. Professional tracks, real-time data, and a community built on pure speed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Events <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Leaderboard
            </Button>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 -z-20"></div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 mb-32">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tight">Upcoming Races</h2>
            <p className="text-slate-500">Secure your spot on the starting grid</p>
          </div>
          <Link href="/events" className="hidden md:flex items-center text-race-red font-bold hover:underline">
            All Events <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Stats & Leaderboard */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-8 tracking-tight">The Chase is On</h2>
            <p className="text-lg text-slate-400 mb-12">
              Our real-time leaderboard tracks every point, every win, and every overtake across the season. Can you reach the top of the podium?
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              <div className="bg-surface-elevated p-6 rounded-2xl border border-white/5">
                <Trophy className="text-race-red w-8 h-8 mb-4" />
                <div className="text-2xl font-black italic">12</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Podiums Today</div>
              </div>
              <div className="bg-surface-elevated p-6 rounded-2xl border border-white/5">
                <Zap className="text-electric-blue w-8 h-8 mb-4" />
                <div className="text-2xl font-black italic">42.1s</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Fastest Lap</div>
              </div>
              <div className="bg-surface-elevated p-6 rounded-2xl border border-white/5">
                <Users className="text-slate-400 w-8 h-8 mb-4" />
                <div className="text-2xl font-black italic">850+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Active Drivers</div>
              </div>
            </div>
            
            <Button variant="secondary" size="lg">Join the Paddock</Button>
          </div>
          
          <Leaderboard limit={5} />
        </div>
      </section>
    </div>
  );
}
