"use client";

import { useState } from "react";
import { RaceEvent } from "@/types";
import { Button } from "@/components/ui/Button";
import { X, CheckCircle2, CreditCard, User, Ticket, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CheckoutOverlayProps {
  event: RaceEvent;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutOverlay({ event, isOpen, onClose }: CheckoutOverlayProps) {
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = async () => {
    if (step === "details") {
      setStep("payment");
    } else if (step === "payment") {
      setIsProcessing(true);
      // Simulate API call to process payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setStep("success");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-asphalt/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl bg-surface-elevated border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Checkout</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest">{event.title}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="flex px-8 pt-6 space-x-2">
          {["details", "payment", "success"].map((s, i) => (
            <div 
              key={s} 
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                step === s || (step === "payment" && i === 0) || (step === "success")
                  ? "bg-race-red" 
                  : "bg-white/10"
              )} 
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === "details" && (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</span>
                    <div className="mt-2 relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Lewis Hamilton"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-race-red outline-none transition-colors"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</span>
                    <input 
                      type="email" 
                      placeholder="lewis@mercedes-f1.com"
                      className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-race-red outline-none transition-colors"
                    />
                  </label>
                </div>
                
                <div className="bg-white/5 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center">
                    <Ticket className="w-5 h-5 text-electric-blue mr-3" />
                    <span className="font-bold">1x General Admission</span>
                  </div>
                  <span className="font-black italic">£{event.price.toFixed(2)}</span>
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="bg-electric-blue/10 border border-electric-blue/20 p-4 rounded-2xl text-sm text-electric-blue flex items-start">
                  <CreditCard className="w-5 h-5 mr-3 mt-0.5" />
                  <p>This is a demonstration of the Vivenu Headless API integration. No real charges will be made.</p>
                </div>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Card Number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-race-red outline-none transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-race-red outline-none transition-colors"
                    />
                    <input 
                      type="text" 
                      placeholder="CVC"
                      className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-race-red outline-none transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black italic uppercase mb-2">Race Ready!</h3>
                <p className="text-slate-400 mb-8">Your ticket has been confirmed. Check your email for details.</p>
                <Button size="lg" className="w-full" onClick={onClose}>Finish</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        {step !== "success" && (
          <div className="p-8 bg-white/5 flex items-center justify-between">
            <div className="text-xs text-slate-500 uppercase tracking-widest">
              Total: <span className="text-lg font-black italic text-white ml-2">£{event.price.toFixed(2)}</span>
            </div>
            <Button 
              size="lg" 
              onClick={handleNext}
              disabled={isProcessing}
              className="min-w-[140px]"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : step === "details" ? (
                "Next Step"
              ) : (
                "Pay Now"
              )}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
