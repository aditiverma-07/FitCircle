import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, ChevronRight, User } from "lucide-react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate dummy login logic
    setTimeout(() => {
      // Just accept any valid email format and password
      if (email && password) {
        onLogin();
      } else {
        setError("Please enter a valid email and password.");
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass rounded-[32px] p-8 space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 rounded-bl-full -z-0 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-400/20 rounded-tr-full -z-0 blur-2xl" />
        
        <div className="relative z-10 text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-400 to-sky-400 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20 mb-6">
            <Target size={32} className="text-slate-950" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">FitCircle</h1>
          <p className="text-slate-400">Sign in to continue your journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5 mt-8">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-300 ml-1">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dummy@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-[16px] py-3 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-300">Password</label>
                <button type="button" className="text-xs text-teal-400 hover:text-teal-300 font-medium">Forgot?</button>
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                required
                className="w-full bg-white/5 border border-white/10 rounded-[16px] py-3 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-colors"
              />
            </div>
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-rose-400 text-sm font-medium text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3.5 glass text-white rounded-[16px] font-bold flex items-center justify-center gap-2 hover:bg-white/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-br from-teal-500/80 to-teal-700/80 border border-teal-400/50 mt-4"
          >
            {isSubmitting ? "Signing in..." : "Sign In"} <ChevronRight size={18} />
          </button>
        </form>

        <div className="relative z-10 text-center border-t border-white/10 pt-6">
          <p className="text-slate-400 text-sm">
            Don't have an account? <button type="button" onClick={() => { setEmail("dummy@example.com"); setPassword("dummy123"); }} className="text-teal-400 font-bold hover:text-teal-300">Use Dummy Form</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
