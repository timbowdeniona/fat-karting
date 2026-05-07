"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Sparkles, X, MessageSquare, Send, BookOpen, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function RaceEngineerSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [rulebookUrl, setRulebookUrl] = useState("");
  const [isIngested, setIsIngested] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-electric-blue rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
      >
        <Sparkles className="text-white w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-asphalt/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-surface-elevated border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-electric-blue w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black italic uppercase tracking-tighter">RAG Corpus</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Powered by Vector Knowledge</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Source Ingestion */}
              {!isIngested ? (
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="text-center mb-10">
                    <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                    <h4 className="text-xl font-bold mb-3 uppercase italic">Initialize RAG Corpus</h4>
                    <p className="text-slate-500 text-sm">
                      Provide a source URL (e.g., League Rulebook) to give the RAG Corpus the necessary knowledge.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <input
                      type="url"
                      placeholder="https://fat-karting.com/rulebook.pdf"
                      value={rulebookUrl}
                      onChange={(e) => setRulebookUrl(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-electric-blue outline-none transition-colors"
                    />
                    <Button 
                      className="w-full bg-electric-blue hover:bg-electric-blue/90" 
                      onClick={() => setIsIngested(true)}
                      disabled={!rulebookUrl}
                    >
                      Ingest Source <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Chat Interface Placeholder */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    <div className="flex flex-col items-start space-y-2">
                      <div className="text-[10px] text-slate-500 uppercase px-1">RAG Corpus</div>
                      <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[90%] text-sm">
                        Source ingested: <span className="text-electric-blue underline truncate block">{rulebookUrl}</span>
                        <br />
                        I'm ready. You can ask me about race rules, flag meanings, or technical specifications.
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-[10px] text-slate-500 uppercase px-1">Driver</div>
                      <div className="bg-electric-blue p-4 rounded-2xl rounded-tr-none max-w-[90%] text-sm font-medium">
                        What happens if I exceed track limits during qualifying?
                      </div>
                    </div>

                    <div className="flex flex-col items-start space-y-2">
                      <div className="text-[10px] text-slate-500 uppercase px-1">RAG Corpus</div>
                      <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[90%] text-sm">
                        Based on the rulebook, your current lap time will be deleted. Repeat offenses may lead to a grid penalty for the main race.
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-6 border-t border-white/5 bg-white/5">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Query the RAG Corpus..."
                        className="w-full bg-asphalt border border-white/10 rounded-full py-3 pl-6 pr-14 focus:border-electric-blue outline-none transition-colors"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
