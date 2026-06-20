import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "../App";

export default function CheckInModal({ onClose }: { onClose: () => void }) {
  const [weight, setWeight] = useState("");
  const [mood, setMood] = useState("");
  const [water, setWater] = useState(0);
  const [workout, setWorkout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { emoji: "😩", label: "Stressed" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😐", label: "Okay" },
    { emoji: "😃", label: "Good" },
    { emoji: "🔥", label: "Energized" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentWeight: parseFloat(weight),
          mood,
          water,
          workout
        })
      });
      // Force reload for simple MVP
      window.location.reload();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 pb-0 sm:pb-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
          <motion.div 
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md glass rounded-t-[24px] sm:rounded-[24px] overflow-hidden max-h-[90vh] flex flex-col bg-slate-900/80"
        >
          <div className="sticky top-0 bg-white/5 backdrop-blur-md z-10 px-6 py-4 flex items-center justify-between border-b border-white/10">
            <h2 className="font-bold text-lg text-white">Daily Check-In</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-slate-400 hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-6 pb-safe">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Weight */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-300">Today's Weight</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full text-3xl font-bold bg-white/5 border border-white/10 rounded-[20px] py-4 px-6 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-colors placeholder:text-slate-600 text-white"
                    placeholder="0.0"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">kg</span>
                </div>
              </div>

              {/* Mood */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-300">How do you feel?</label>
                <div className="flex justify-between gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setMood(m.label)}
                      className={cn(
                        "flex-1 aspect-square rounded-[20px] border flex flex-col items-center justify-center gap-1 transition-all",
                        mood === m.label 
                          ? "border-teal-400 bg-teal-400/20" 
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      )}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <span className={cn(
                        "text-[10px] font-bold uppercase",
                        mood === m.label ? "text-teal-400" : "text-slate-500"
                      )}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Habits Toggle */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-300">Quick Log</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-[20px] border border-white/10 bg-white/5">
                    <div>
                      <div className="font-bold text-slate-300">Water (Liters)</div>
                      <div className="text-xs text-slate-500 mt-0.5">Stay hydrated!</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setWater(Math.max(0, water - 1))} className="w-8 h-8 rounded-full border border-slate-500 flex items-center justify-center text-slate-300 hover:bg-white/10">-</button>
                      <span className="font-bold text-white w-4 text-center">{water}</span>
                      <button type="button" onClick={() => setWater(water + 1)} className="w-8 h-8 rounded-full border border-slate-500 flex items-center justify-center text-slate-300 hover:bg-white/10">+</button>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setWorkout(!workout)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-[20px] border transition-all text-left",
                      workout ? "border-teal-400 bg-teal-400/20" : "border-white/10 bg-white/5"
                    )}
                  >
                    <div>
                      <div className={cn("font-bold", workout ? "text-teal-300" : "text-slate-300")}>Completed Workout</div>
                      <div className="text-xs text-slate-500 mt-0.5">30+ minutes of activity</div>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-md border flex items-center justify-center transition-colors",
                      workout ? "border-teal-400 bg-teal-400 text-slate-950" : "border-slate-600 bg-transparent"
                    )}>
                      {workout && <Check size={14} className="text-slate-950" />}
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4 pb-8">
                <button 
                  type="submit"
                  disabled={isSubmitting || !weight || !mood}
                  className="w-full py-4 glass text-white rounded-[20px] font-bold flex items-center justify-center gap-2 hover:bg-white/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-br from-teal-500/80 to-teal-700/80 border border-teal-400/50"
                >
                  {isSubmitting ? "Logging..." : "Save Check-In"}
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
