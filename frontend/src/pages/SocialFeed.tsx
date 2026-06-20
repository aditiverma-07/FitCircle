import { motion } from "framer-motion";
import { MessageCircle, Heart, MoreHorizontal, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { FeedItem } from "../types";
import { formatDistanceToNow } from "date-fns";

export default function SocialFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(r => r.json())
      .then(data => setFeed(data.feed))
      .catch(console.error);
  }, []);

  const handleLike = async (id: string) => {
    try {
      await fetch(`/api/feed/${id}/like`, { method: "POST" });
      setFeed(feed.map(f => f.id === id ? { ...f, likes: f.likes + 1, hasLiked: true } : f));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Activity Feed</h1>
      </div>

      <div className="space-y-4">
        {feed.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No activity yet.</div>
        ) : (
          feed.map((item) => (
            <div key={item.id} className="glass p-5 rounded-[24px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center font-bold text-teal-400 border border-teal-400/30">
                    {item.userId === 'u1' ? 'A' : 'U'}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Alex</div>
                    <div className="text-xs text-slate-400">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</div>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-200">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-slate-300">{item.content}</p>
                {item.content.includes("streak") && (
                  <div className="mt-3 bg-white/5 border border-orange-500/30 p-3 rounded-xl flex items-center gap-3">
                    <div className="glass p-2 rounded-lg text-orange-400 border-none bg-orange-400/20">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-orange-300">Achievement Unlocked</div>
                      <div className="text-xs text-orange-400/80">Consistency is key!</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 pt-3 border-t border-white/10">
                <button 
                  onClick={() => handleLike(item.id)}
                  disabled={item.hasLiked}
                  className={`flex items-center gap-2 transition-colors group ${item.hasLiked ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'}`}
                >
                  <Heart size={18} className={`group-active:scale-125 transition-transform ${item.hasLiked ? 'fill-rose-400' : ''}`} />
                  <span className="text-xs font-medium">{item.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors">
                  <MessageCircle size={18} />
                  <span className="text-xs font-medium">{item.comments.length}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
