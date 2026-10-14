import React from 'react';
import { Search, X, Send, BookOpen, BookmarkCheck, ArrowLeft, GraduationCap } from 'lucide-react';
import { TELEGRAM_CHANNEL_URL } from '../data/fallbackData';

interface NavbarProps {
  currentView: 'home' | 'course' | 'player';
  onNavigateHome: () => void;
  onGoBack?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  enrolledCount: number;
  activeTab: 'all' | 'jee' | 'neet' | 'live' | 'enrollments';
  onTabChange: (tab: 'all' | 'jee' | 'neet' | 'live' | 'enrollments') => void;
  onOpenTelegramModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateHome,
  onGoBack,
  searchQuery,
  onSearchChange,
  enrolledCount,
  activeTab,
  onTabChange,
  onOpenTelegramModal,
}) => {
  return (
    <nav className="w-full z-40 nav-glass h-[70px] sticky top-0 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Back Button (if not home) + Logo */}
        <div className="flex items-center gap-3">
          {currentView !== 'home' && (
            <button
              onClick={onGoBack || onNavigateHome}
              className="p-2 -ml-1 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 btn-press transition-colors flex items-center gap-1.5"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold hidden md:inline">Back</span>
            </button>
          )}

          <div
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer btn-press group"
          >
            {/* Official GB STUDY 3D Logo Badge */}
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-amber-400/40 p-0.5 shadow-lg shadow-amber-400/10 group-hover:border-amber-400 transition-all shrink-0">
              <img
                src="/logo.png"
                alt="GB STUDY"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-black tracking-wider text-white font-syne">GB</span>
                <span className="text-lg sm:text-xl font-black tracking-wider text-amber-400 font-syne">STUDY</span>
              </div>
              <span className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase hidden sm:block -mt-1">
                Official Portal
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Global Search Input */}
        <div className="flex-1 max-w-md mx-2 relative">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search batches, lectures, chapters..."
              className="w-full bg-[#121212] border border-white/10 text-white text-xs sm:text-sm rounded-xl pl-9 pr-9 py-2 sm:py-2.5 transition-all placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/60 focus:bg-[#18181b]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5 rounded-full hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Desktop Navigation Links & Telegram CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => {
              if (currentView !== 'home') onNavigateHome();
              onTabChange('all');
            }}
            className={`text-sm font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
              activeTab === 'all' && currentView === 'home'
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Batches</span>
          </button>

          {/* Live Classes Button */}
          <button
            onClick={() => {
              if (currentView !== 'home') onNavigateHome();
              onTabChange('live');
            }}
            className={`text-sm font-semibold transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              activeTab === 'live' && currentView === 'home'
                ? 'text-red-400 bg-red-500/15 border border-red-500/30'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-bold">Live Classes</span>
          </button>

          <button
            onClick={() => {
              if (currentView !== 'home') onNavigateHome();
              onTabChange('enrollments');
            }}
            className={`text-sm font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg relative ${
              activeTab === 'enrollments' && currentView === 'home'
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>My Enrollments</span>
            {enrolledCount > 0 && (
              <span className="ml-1 bg-amber-400 text-black text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {enrolledCount}
              </span>
            )}
          </button>

          <div className="w-px h-5 bg-white/10" />

          {/* Telegram Channel Button */}
          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#18181b] hover:bg-[#222226] text-sky-400 border border-sky-500/20 hover:border-sky-500/40 rounded-xl text-xs font-bold transition-all btn-press shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Join Telegram</span>
          </a>
        </div>

        {/* Mobile Quick Telegram Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenTelegramModal}
            className="p-2 text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-xl btn-press"
            title="Join Telegram"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </nav>
  );
};
