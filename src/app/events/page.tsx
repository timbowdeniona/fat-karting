import { getEvents } from "@/lib/contentful";
import { EventCard } from "@/components/events/EventCard";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Events | FAT Karting",
  description: "View upcoming electric-powered FAT Karting events and races.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center justify-center p-3 bg-race-red/10 rounded-2xl mb-2">
            <Calendar className="w-8 h-8 text-race-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
            Race <span className="text-race-red">Events</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Find your next electric-powered race. Register for upcoming events, 
            join a league, and experience the thrill of high-performance karting.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        {events.length === 0 && (
          <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10 animate-in fade-in">
            <p className="text-slate-400 text-lg">No upcoming events at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
