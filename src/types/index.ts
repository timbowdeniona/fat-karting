export interface RaceEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  hub: string;
  image: string;
  description: string;
  status: "upcoming" | "live" | "completed";
  ticketsAvailable: number;
  price: number;
}

export interface Hub {
  id: string;
  slug: string;
  name: string;
  location: string;
  image: string;
  description: string;
  trackLength: string;
  surface: string;
}

export interface Driver {
  id: string;
  name: string;
  rank: number;
  points: number;
  trend: "up" | "down" | "neutral";
  wins: number;
  podiums: number;
  region: string;
  avatar?: string;
}
