import { motion } from "framer-motion";
import { Users, UserPlus, Trophy, ChevronRight, Lock } from "lucide-react";

export default function Groups() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Your Groups</h1>
        <button className="text-teal-400 bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors border border-white/10">
          <UserPlus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Sample Group Card */}
        <div className="glass rounded-[24px] p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/20 rounded-bl-[100px] -z-0 blur-xl" />
          
          <div className="flex items-start justify-between relative z-10 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Lock size={14} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Private</span>
              </div>
              <h2 className="text-xl font-bold text-white">Roommate Shred</h2>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 z-${10-i}`} />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 z-0">
                +2
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-xs text-slate-400 mb-1">Group Goal</div>
              <div className="font-bold text-sm text-slate-300">-20 kg combined</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-orange-500/30">
              <div className="text-xs text-orange-400/70 mb-1">Top Streak</div>
              <div className="font-bold text-sm text-orange-400 flex items-center gap-1">
                <Trophy size={14} /> Alex (12 days)
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
            View Group <ChevronRight size={16} />
          </button>
        </div>

        {/* Empty State / Create New */}
        <div className="border-2 border-dashed border-white/20 rounded-[24px] p-8 text-center flex flex-col items-center bg-white/5">
          <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-teal-400 mb-4 border-teal-400/30">
            <Users size={32} />
          </div>
          <h3 className="font-bold text-white mb-2">Create a new circle</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-[200px]">Invite friends, set rules, and hold each other accountable.</p>
          <button className="glass bg-teal-500/20 text-teal-400 border border-teal-400/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-500/30 transition-colors">
            Create Group
          </button>
        </div>
      </div>
    </motion.div>
  );
}
