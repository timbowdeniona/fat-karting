import { getEventBySlug } from "@/lib/contentful";
import { notFound } from "next/navigation";
import Image from "next/image";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Clock, Ticket, Info } from "lucide-react";
import { BuyTicketButton } from "@/components/ticketing/BuyTicketButton";

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="relative pb-32">
      {/* Event Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-12 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover -z-20 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent -z-10" />
        <GlowEffect color="red" position="bottom" className="opacity-30" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="live" className="mb-6">Registration Open</Badge>
            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-slate-300">
              <div className="flex items-center"><Calendar className="w-5 h-5 mr-2 text-race-red" /> {new Date(event.date).toLocaleDateString()}</div>
              <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-race-red" /> {event.hub}</div>
              <div className="flex items-center"><Clock className="w-5 h-5 mr-2 text-race-red" /> 18:00 BST</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold uppercase mb-6 flex items-center">
              <Info className="w-6 h-6 mr-3 text-electric-blue" />
              Event Details
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-slate-400">
              <p>{event.description}</p>
              <p>
                Get ready for an adrenaline-fueled experience. The FAT Karting League brings professional-grade timing and technical track layouts to the masses. Whether you're a seasoned pro or a first-timer, our events are designed to test your limits.
              </p>
              <h3 className="text-white mt-8 mb-4 font-bold">Race Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>10-minute Free Practice</li>
                <li>Qualifying Session (Best lap sets the grid)</li>
                <li>20-minute Main Race</li>
                <li>Podium Ceremony for Top 3</li>
              </ul>
            </div>
          </div>

          <aside>
            <div className="sticky top-32 bg-surface-elevated p-8 rounded-3xl border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Starting from</div>
                  <div className="text-4xl font-black italic">£{event.price.toFixed(2)}</div>
                </div>
                <div className="h-12 w-12 bg-race-red/10 rounded-full flex items-center justify-center">
                  <Ticket className="text-race-red w-6 h-6" />
                </div>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tickets Available</span>
                  <span className="font-bold text-white">{event.ticketsAvailable} / 45</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-race-red h-full transition-all duration-1000" 
                    style={{ width: `${(45 - event.ticketsAvailable) / 45 * 100}%` }}
                  />
                </div>
              </div>

              <BuyTicketButton event={event} />
              
              <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-tighter">
                Secure checkout powered by Vivenu
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
