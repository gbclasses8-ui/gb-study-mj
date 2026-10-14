import React from 'react';
import { BookOpen, BookmarkCheck, Send, Home } from 'lucide-react';
import { TELEGRAM_CHANNEL_URL } from '../data/fallbackData';

interface MobileBottomNavProps {
  currentView: 'home' | 'course' | 'player';
  activeTab: 'all' | 'jee' | 'neet' | 'live' | 'enrollments';
  onTabChange: (tab: 'all' | 'jee' | 'neet' | 'live' | 'enrollments') => void;
  onNavigateHome: () => void;
  enrolledCount: number;
  onOpenTelegram: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  activeTab,
  onTabChange,
  onNavigateHome,
  enrolledCount,
  onOpenTelegram,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-xl border-t border-white/10 lg:hidden px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home / Batches */}
        <button
          onClick={() => {
            if (currentView !== 'home') onNavigateHome();
            onTabChange('all');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors btn-press ${
            currentView === 'home' && activeTab === 'all'
              ? 'text-amber-400'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Batches</span>
        </button>

        {/* Live Classes (with pulsing red indicator) */}
        <button
          onClick={() => {
            if (currentView !== 'home') onNavigateHome();
            onTabChange('live');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors btn-press relative ${
            currentView === 'home' && activeTab === 'live'
              ? 'text-red-400'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <span className="w-5 h-5 flex items-center justify-center font-black text-xs text-red-500">●</span>
            <span className="animate-ping absolute -top-0.5 -right-0.5 inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
          </div>
          <span className="text-[10px] font-bold text-red-400">Live</span>
        </button>

        {/* JEE */}
        <button
          onClick={() => {
            if (currentView !== 'home') onNavigateHome();
            onTabChange('jee');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors btn-press ${
            currentView === 'home' && activeTab === 'jee'
              ? 'text-amber-400'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-bold">JEE</span>
        </button>

        {/* NEET */}
        <button
          onClick={() => {
            if (currentView !== 'home') onNavigateHome();
            onTabChange('neet');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors btn-press ${
            currentView === 'home' && activeTab === 'neet'
              ? 'text-amber-400'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <span className="w-5 h-5 flex items-center justify-center font-black text-xs">N</span>
          <span className="text-[10px] font-bold">NEET</span>
        </button>

        {/* Enrollments */}
        <button
          onClick={() => {
            if (currentView !== 'home') onNavigateHome();
            onTabChange('enrollments');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors relative btn-press ${
            currentView === 'home' && activeTab === 'enrollments'
              ? 'text-amber-400'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <div className="relative">
            <BookmarkCheck className="w-5 h-5" />
            {enrolledCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {enrolledCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Enrolled</span>
        </button>

        {/* Telegram */}
        <button
          onClick={onOpenTelegram}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-sky-400 hover:text-sky-300 btn-press"
        >
          <Send className="w-5 h-5" />
          <span className="text-[10px] font-bold">Telegram</span>
        </button>
      </div>
    </div>
  );
};
