"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X, Trophy, Calendar, MapPin, User, Layers } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Hubs", href: "/hubs", icon: MapPin },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Architecture", href: "/architecture", icon: Layers },
  { name: "Paddock", href: "/paddock", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-asphalt/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-race-red rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-white font-black italic text-xl">F</span>
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">
              FAT <span className="text-race-red">KARTING</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-race-red",
                  pathname === link.href ? "text-race-red" : "text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button size="sm">Join League</Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-asphalt md:hidden">
          <nav className="flex flex-col p-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-4 text-xl font-bold uppercase",
                  pathname === link.href ? "text-race-red" : "text-white"
                )}
              >
                <link.icon className="w-6 h-6" />
                <span>{link.name}</span>
              </Link>
            ))}
            <Button size="lg" className="w-full">Join League</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
