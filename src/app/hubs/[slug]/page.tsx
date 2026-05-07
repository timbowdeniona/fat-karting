import { getHubBySlug } from "@/lib/contentful";
import { notFound } from "next/navigation";
import Image from "next/image";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Maximize2, Layers, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { getEvents } from "@/lib/contentful";

export default async function HubPage({ params }: { params: { slug: string } }) {
  const hub = await getHubBySlug(params.slug);
  const events = await getEvents();
  const hubEvents = events.filter(e => e.hub === hub?.name);

  if (!hub) {
    notFound();
  }

  return (
    <div className="relative pb-32">
      {/* Hub Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src={hub.image}
          alt={hub.name}
          fill
          priority
          className="object-cover -z-20 brightness-50"
        />
        <div className="absolute inset-0 bg-asphalt/60 -z-10" />
        <GlowEffect color="blue" position="center" className="opacity-40" />
        
        <div className="container mx-auto px-4 text-center">
          <Badge variant="blue" className="mb-6">Partner Track</Badge>
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            {hub.name}
          </h1>
          <div className="flex items-center justify-center text-slate-300 font-medium">
            <MapPin className="w-5 h-5 mr-2 text-electric-blue" />
            {hub.location}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-card border border-white/10 rounded-2xl p-6 flex items-center space-x-4 shadow-xl">
            <div className="w-12 h-12 bg-electric-blue/10 rounded-xl flex items-center justify-center">
              <Maximize2 className="text-electric-blue w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Track Length</div>
              <div className="text-xl font-black italic">{hub.trackLength}</div>
            </div>
          </div>
          <div className="bg-surface-card border border-white/10 rounded-2xl p-6 flex items-center space-x-4 shadow-xl">
            <div className="w-12 h-12 bg-race-red/10 rounded-xl flex items-center justify-center">
              <Layers className="text-race-red w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Surface</div>
              <div className="text-xl font-black italic">{hub.surface}</div>
            </div>
          </div>
          <div className="bg-surface-card border border-white/10 rounded-2xl p-6 flex items-center space-x-4 shadow-xl">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
              <Calendar className="text-white w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Events Hosted</div>
              <div className="text-xl font-black italic">{hubEvents.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-black italic uppercase mb-8">About the Hub</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {hub.description}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-2">Facilities</h4>
                <ul className="text-slate-500 text-sm space-y-2">
                  <li>• Professional Paddock</li>
                  <li>• Live Timing Screens</li>
                  <li>• On-site Café</li>
                  <li>• Briefing Rooms</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Specifications</h4>
                <ul className="text-slate-500 text-sm space-y-2">
                  <li>• FIA Grade Karting</li>
                  <li>• Floodlit for Night Racing</li>
                  <li>• 12 Challenging Turns</li>
                  <li>• Top Speeds up to 50mph</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black italic uppercase mb-8">Upcoming Here</h2>
            <div className="space-y-4">
              {hubEvents.length > 0 ? (
                hubEvents.map(event => (
                  <Link key={event.id} href={`/events/${event.slug}`} className="block group">
                    <Card className="bg-surface-elevated/50 border-white/5 group-hover:border-race-red/30 transition-colors">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-race-red font-bold uppercase mb-1">{new Date(event.date).toLocaleDateString()}</div>
                          <h4 className="text-xl font-bold">{event.title}</h4>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-race-red group-hover:translate-x-1 transition-all" />
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="p-12 border-2 border-dashed border-white/5 rounded-3xl text-center text-slate-600 uppercase tracking-widest text-sm">
                  No scheduled events
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
