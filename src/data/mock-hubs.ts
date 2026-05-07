import { Hub } from "@/types";

export const MOCK_HUBS: Hub[] = [
  {
    id: "h1",
    slug: "silverstone-karting",
    name: "Silverstone Karting",
    location: "Northamptonshire, UK",
    image: "https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&q=80&w=1200",
    description: "The home of British motor racing. Our karting track features a fast and technical layout used by future F1 stars.",
    trackLength: "1,200m",
    surface: "Asphalt"
  },
  {
    id: "h2",
    slug: "london-docklands-hub",
    name: "London Docklands Hub",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1200",
    description: "An urban racing oasis. High-grip surface and multi-level sections make this one of the most exciting tracks in Europe.",
    trackLength: "800m",
    surface: "Concrete / Resin"
  }
];
