import Link from "next/link";
import Image from "next/image";
import { RaceEvent } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export function EventCard({ event }: { event: RaceEvent }) {
  return (
    <Link href={`/events/${event.slug}`} className="group">
      <Card className="h-full nitro-border-glow transition-all duration-500 hover:-translate-y-2">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            {event.status === "live" ? (
              <Badge variant="live">LIVE NOW</Badge>
            ) : (
              <Badge variant="red">UPCOMING</Badge>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center text-xs text-slate-400 mb-2 space-x-4">
            <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(event.date).toLocaleDateString()}</span>
            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.hub}</span>
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-race-red transition-colors">{event.title}</h3>
          <p className="text-sm text-slate-400 line-clamp-2 mb-4">
            {event.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-black italic">£{event.price.toFixed(2)}</span>
            <span className="text-race-red font-bold flex items-center text-sm">
              Tickets <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
