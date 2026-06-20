import { motion } from "framer-motion";
import { Settings, LogOut, Award, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "../types";

export default function Profile({ onLogout }: { onLogout?: () => void }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/user/me")
      .then(r => r.json())
      .then(setUser)
      .catch(console.error);
  }, []);

  if (!user) return <div className="p-8 text-center text-slate-400">Loading profile...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <button className="text-slate-400 hover:text-white p-2">
          <Settings size={24} />
        </button>
      </div>

      <div className="flex flex-col items-center pt-4 pb-8">
        <div className="w-24 h-24 rounded-full bg-teal-500 border-4 border-slate-900 shadow-lg mb-4 flex items-center justify-center text-3xl font-bold text-slate-950">
          {user.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold text-white">{user.name}</h2>
        <p className="text-slate-400 text-sm mb-4">{user.email}</p>
        
        <div className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 flex items-center gap-2">
          <Award size={16} className="text-yellow-500" />
          <span className="text-sm font-bold text-slate-300">Level 5 &bull; {user.xp} XP</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-300 text-sm px-2 uppercase tracking-wider">Account</h3>
        
        <div className="glass rounded-[24px] overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/10">
            <div className="font-medium text-slate-300">Personal Info</div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/10">
            <div className="font-medium text-slate-300">Fitness Goals</div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
            <div className="font-medium text-slate-300">Notification Preferences</div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="pt-6">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-4 text-rose-400 font-bold glass rounded-[24px] hover:bg-rose-500/10 transition-colors border border-rose-500/30"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </motion.div>
  );
}
