import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "red" | "blue" | "live";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white",
    outline: "border border-white/20 text-white",
    red: "bg-race-red/20 text-race-red border border-race-red/30",
    blue: "bg-electric-blue/20 text-electric-blue border border-electric-blue/30",
    live: "bg-race-red text-white animate-pulse shadow-[0_0_10px_rgba(255,62,62,0.5)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
