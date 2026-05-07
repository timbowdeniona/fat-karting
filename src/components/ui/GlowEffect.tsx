import * as React from "react";
import { cn } from "@/lib/utils";

interface GlowEffectProps {
  className?: string;
  color?: "red" | "blue" | "both";
  position?: "top" | "bottom" | "center";
}

export function GlowEffect({ 
  className, 
  color = "both", 
  position = "center" 
}: GlowEffectProps) {
  const gradients = {
    red: "from-race-red/20 to-transparent",
    blue: "from-electric-blue/20 to-transparent",
    both: "from-race-red/10 via-electric-blue/10 to-transparent",
  };

  const positions = {
    top: "-top-[20%] left-1/2 -translate-x-1/2",
    bottom: "-bottom-[20%] left-1/2 -translate-x-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={cn(
        "absolute pointer-events-none -z-10 h-[600px] w-[800px] rounded-full bg-gradient-radial blur-[120px] opacity-50",
        gradients[color],
        positions[position],
        className
      )}
    />
  );
}
