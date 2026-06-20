import { useEffect, useState } from "react";
import { User, DashboardData } from "../types";
import { Activity, Flame, Target, ChevronRight, Droplets, Footprints, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const MOCK_CHART_DATA = [
  { name: "Mon", weight: 76.5 },
  { name: "Tue", weight: 76.2 },
  { name: "Wed", weight: 76.0 },
  { name: "Thu", weight: 75.8 },
  { name: "Fri", weight: 75.5 },
  { name: "Sat", weight: 75.2 },
  { name: "Sun", weight: 75.0 },
];

const BADGES = [
  { id: 1, name: "First Steps", icon: "👟", color: "from-sky-500/20 to-sky-600/20", borderColor: "border-sky-500/30", iconColor: "text-sky-400" },
  { id: 2, name: "7 Day Streak", icon: "🔥", color: "from-orange-500/20 to-orange-600/20", borderColor: "border-orange-500/30", iconColor: "text-orange-400" },
  { id: 3, name: "Early Bird", icon: "🌅", color: "from-yellow-500/20 to-yellow-600/20", borderColor: "border-yellow-500/30", iconColor: "text-yellow-400" },
];

export default function Dashboard({ onClickCheckIn }: { onClickCheckIn: () => void }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [water, setWater] = useState(1);
  const [workout, setWorkout] = useState(false);
  const [steps, setSteps] = useState(4230);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-8 text-center animate-pulse text-slate-400">Loading dashboard...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-8 space-y-6"
    >
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white">Good morning, {data.user.name}</h1>
        <p className="text-slate-400 text-sm mt-1">Ready to crush your goals today?</p>
      </div>

      {/* Streak Widget */}
      <div className="glass p-6 rounded-[24px] flex items-center justify-between bg-gradient-to-br from-orange-500/10 via-transparent to-slate-900/50 border border-orange-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-xs text-orange-400 uppercase tracking-wider font-bold mb-1">Current Streak</div>
          <div className="text-4xl font-bold text-white flex items-baseline gap-1">
            {data.user.streak} <span className="text-base font-normal text-slate-400">days</span>
          </div>
          <div className="text-sm text-slate-300 mt-1">You're on fire! Keep it up.</div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [-5, 5, -5] 
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
          >
            <Flame size={32} className="text-orange-400 fill-orange-400" />
          </motion.div>
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-orange-500/40 rounded-full blur-xl -z-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-[24px]">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Current</div>
          <div className="text-2xl font-bold text-white">{data.user.currentWeight} <span className="text-sm font-normal text-slate-400">kg</span></div>
        </div>
        <div className="glass p-4 rounded-[24px]">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Target</div>
          <div className="text-2xl font-bold text-white">{data.user.targetWeight} <span className="text-sm font-normal text-slate-400">kg</span></div>
        </div>
      </div>

      <div className="glass p-5 rounded-[24px] overflow-hidden relative">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h3 className="font-bold text-white">Progress</h3>
          <button className="text-teal-400 text-sm font-medium hover:underline">View details</button>
        </div>
        <div className="h-40 -mx-5 -mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_CHART_DATA}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(2, 6, 23, 0.8)', color: '#fff', backdropFilter: 'blur(16px)' }}
              />
              <Area type="monotone" dataKey="weight" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-bold text-white">Achievements</h3>
          <button className="text-teal-400 text-sm font-medium hover:underline">View all</button>
        </div>
        <div className="glass p-5 rounded-[24px] space-y-5">
          {/* Level & XP */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Current Level</div>
                <div className="text-xl font-bold text-white">Level {Math.floor(data.user.xp / 500) + 1}</div>
              </div>
              <div className="text-sm text-teal-400 font-bold">
                {data.user.xp} <span className="text-slate-500 font-normal">/ {(Math.floor(data.user.xp / 500) + 1) * 500} XP</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="h-3 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(data.user.xp % 500) / 500 * 100}%` }}
              />
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-3">Recent Badges</div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x hide-scrollbar">
              {BADGES.map(badge => (
                <div key={badge.id} className={`snap-center shrink-0 w-24 flex flex-col items-center p-3 rounded-[16px] bg-gradient-to-br ${badge.color} border ${badge.borderColor}`}>
                  <div className={`text-2xl mb-2 ${badge.iconColor}`}>{badge.icon}</div>
                  <div className="text-[10px] font-bold text-slate-300 text-center leading-tight">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-white mb-4 px-1">Today's Habits</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 glass rounded-[24px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-white/10 flex items-center justify-center text-sky-400 border-t-sky-400" style={{ transform: `rotate(${water * 120}deg)` }}>
                <div style={{ transform: `rotate(-${water * 120}deg)` }}><Droplets size={20} /></div>
              </div>
              <div>
                <p className="font-bold text-white text-sm">Drink Water</p>
                <p className="text-xs text-slate-400">{water} / 3 Liters</p>
              </div>
            </div>
            <button 
              onClick={() => setWater(w => Math.min(w + 1, 3))}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${water >= 3 ? 'bg-sky-500 border-sky-500 text-slate-950' : 'border-white/20 hover:bg-white/5'}`}
            >
              {water >= 3 ? '✓' : '+'}
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 glass rounded-[24px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-white/10 flex items-center justify-center text-teal-400" style={{ borderTopColor: steps >= 10000 ? '#2dd4bf' : 'rgba(255,255,255,0.1)' }}>
                <Footprints size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Steps</p>
                <p className="text-xs text-slate-400">{steps.toLocaleString()} / 10k</p>
              </div>
            </div>
            <button 
              onClick={() => setSteps(s => Math.min(s + 2000, 10000))}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${steps >= 10000 ? 'bg-teal-400 border-teal-400 text-slate-950' : 'border-white/20 hover:bg-white/5'}`}
            >
              {steps >= 10000 ? '✓' : '+'}
            </button>
          </div>

          <div className={`flex items-center justify-between p-4 glass rounded-[24px] ${workout ? 'bg-gradient-to-br from-teal-900/40 to-slate-900 border-teal-400/30' : ''}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-white/10 flex items-center justify-center text-yellow-500 border-t-yellow-500">
                <Dumbbell size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Workout</p>
                <p className="text-xs text-slate-400">45 mins</p>
              </div>
            </div>
            <button 
              onClick={() => setWorkout(w => !w)}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm transition-colors ${workout ? 'bg-teal-400 border-teal-400 text-slate-950' : 'border-white/20 hover:bg-white/5 text-transparent'}`}
            >
              <span className={workout ? "text-slate-950" : "text-transparent"}>✓</span>
            </button>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onClickCheckIn}
        className="w-full mt-4 py-4 glass text-white rounded-[24px] font-bold flex items-center justify-center gap-2 hover:bg-white/10 active:scale-[0.98] transition-all bg-gradient-to-br from-teal-900/60 to-slate-900/60 border border-teal-400/50"
      >
        Complete Daily Check-In <ChevronRight size={18} />
      </button>

    </motion.div>
  );
}
