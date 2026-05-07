import { RaceEvent } from "@/types";

export const MOCK_EVENTS: RaceEvent[] = [
  {
    id: "1",
    slug: "summer-grand-prix",
    title: "Summer Grand Prix",
    date: "2026-07-15T18:00:00Z",
    hub: "Silverstone Karting",
    image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&q=80&w=1200",
    description: "The biggest event of the season. 45 drivers, one winner. High stakes racing under the floodlights.",
    status: "upcoming",
    ticketsAvailable: 12,
    price: 45.00
  },
  {
    id: "2",
    slug: "night-circuit-bash",
    title: "Night Circuit Bash",
    date: "2026-05-20T20:00:00Z",
    hub: "London Docklands Hub",
    image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=1200",
    description: "Experience the thrill of street-style karting in the heart of London. Fast corners and tight overtakes.",
    status: "live",
    ticketsAvailable: 0,
    price: 35.00
  },
  {
    id: "3",
    slug: "rookie-rumble",
    title: "Rookie Rumble",
    date: "2026-08-01T10:00:00Z",
    hub: "Manchester Velocity Park",
    image: "https://images.unsplash.com/photo-1605218403317-6e554fa63704?auto=format&fit=crop&q=80&w=1200",
    description: "Perfect for those new to the league. Come and show your skills in a friendly but competitive environment.",
    status: "upcoming",
    ticketsAvailable: 25,
    price: 25.00
  }
];
