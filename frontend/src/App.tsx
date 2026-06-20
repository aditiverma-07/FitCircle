import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Home, Users, Activity, User, PlusCircle } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import SocialFeed from "./pages/SocialFeed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import CheckInModal from "./components/CheckInModal";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function BottomNav({ onCheckIn }: { onCheckIn: () => void }) {
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/groups", icon: Users, label: "Groups" },
    { to: "/feed", icon: Activity, label: "Feed" },
    { to: "/profile", icon: User, label: "Profile" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-nav border-t-0 pb-safe pb-4 pt-2 px-6 z-40 lg:hidden rounded-t-[24px]">
      <div className="flex justify-between items-center relative">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          const Icon = link.icon;
          return (
            <Link 
              key={link.to} 
              to={link.to} 
              className={cn(
                "flex flex-col items-center p-2 rounded-xl transition-all",
                isActive ? "text-teal-400" : "text-slate-400 hover:text-teal-300"
              )}
            >
              <Icon size={24} className={isActive ? "fill-teal-400/20" : ""} />
              <span className="text-[10px] uppercase font-medium mt-1 tracking-wider">{link.label}</span>
            </Link>
          );
        })}
        {/* Floating Action Button */}
        <button 
          onClick={onCheckIn}
          className="absolute left-1/2 -top-8 -translate-x-1/2 bg-teal-500 hover:bg-teal-400 text-slate-950 p-4 rounded-full shadow-lg shadow-teal-500/30 transition-transform hover:scale-105 active:scale-95 border border-teal-400/50"
        >
          <PlusCircle size={28} />
        </button>
      </div>
    </nav>
  );
}

function Layout() {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check purely local mocked auth
    const authStatus = localStorage.getItem("fitcircle_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("fitcircle_auth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("fitcircle_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen text-slate-50 font-sans selection:bg-teal-500/30 relative">
        <div className="main-bg" />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-50 pb-24 lg:pb-0 font-sans selection:bg-teal-500/30">
      <div className="main-bg" />
      {/* Top Bar for Desktop */}
      <header className="hidden lg:flex items-center justify-between px-8 py-4 glass-nav border-b-0 border-x-0 border-t-0 border-b border-white/10 z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center text-slate-950 font-bold">F</div>
          <span className="font-bold text-xl tracking-tight text-white">FitCircle</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="font-medium text-slate-300 hover:text-teal-400">Dashboard</Link>
          <Link to="/groups" className="font-medium text-slate-300 hover:text-teal-400">Groups</Link>
          <Link to="/feed" className="font-medium text-slate-300 hover:text-teal-400">Feed</Link>
          <button 
            onClick={() => setIsCheckInOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-400/10 text-teal-400 font-semibold rounded-lg hover:bg-teal-400/20 border border-teal-400/30 transition-colors"
          >
            <PlusCircle size={18} />
            Check In
          </button>
          <Link to="/profile">
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-teal-400/50 flex flex-col items-center justify-center">
              <User size={20} className="text-teal-400" />
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto lg:max-w-5xl h-full pt-4 px-4 lg:px-8">
        <Routes>
          <Route path="/" element={<Dashboard onClickCheckIn={() => setIsCheckInOpen(true)} />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/feed" element={<SocialFeed />} />
          <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
        </Routes>
      </main>
      
      <BottomNav onCheckIn={() => setIsCheckInOpen(true)} />
      
      {isCheckInOpen && (
        <CheckInModal onClose={() => setIsCheckInOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
