"use client";

import { useState } from "react";
import { RaceEvent } from "@/types";
import { Button } from "@/components/ui/Button";
import { Ticket } from "lucide-react";
import { CheckoutOverlay } from "./CheckoutOverlay";
import { AnimatePresence } from "framer-motion";

export function BuyTicketButton({ event }: { event: RaceEvent }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  if (event.ticketsAvailable === 0) {
    return (
      <Button size="lg" variant="outline" className="w-full opacity-50 cursor-not-allowed" disabled>
        Sold Out
      </Button>
    );
  }

  return (
    <>
      <Button 
        size="lg" 
        className="w-full" 
        onClick={() => setIsOverlayOpen(true)}
      >
        <Ticket className="mr-2 w-5 h-5" />
        Buy Tickets
      </Button>

      <AnimatePresence>
        {isOverlayOpen && (
          <CheckoutOverlay 
            event={event} 
            isOpen={isOverlayOpen} 
            onClose={() => setIsOverlayOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
