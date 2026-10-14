import React from 'react';
import { Send, Heart, BookOpen, Sparkles, Shield, ExternalLink } from 'lucide-react';
import { TELEGRAM_CHANNEL_URL } from '../data/fallbackData';

interface FooterProps {
  onNavigateTab: (tab: 'all' | 'jee' | 'neet' | 'live' | 'enrollments') => void;
  onOpenTelegram: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenTelegram }) => {
  return (
    <footer className="w-full bg-[#0d0d10] border-t border-white/5 py-12 px-4 sm:px-6 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
        {/* Brand column */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-amber-400/40 p-0.5 shadow-md shadow-amber-400/10">
              <img
                src="/logo.png"
                alt="GB STUDY"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xl font-black tracking-wider text-white font-syne">
              GB <span className="text-amber-400">STUDY</span>
            </span>
          </div>

          <p className="text-zinc-400 leading-relaxed mb-4">
            GB STUDY is a free, high-performance educational platform providing complete video lectures, DPPs, tests, and chapter-wise study materials for Class 11th JEE and NEET students.
          </p>

          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 rounded-xl font-bold text-xs transition-colors btn-press"
          >
            <Send className="w-4 h-4" />
            <span>Join @GBFreestudy Telegram</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-8">
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3 text-xs font-syne">
              Course Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTab('all')}
                  className="hover:text-amber-400 transition-colors"
                >
                  All Batches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('live')}
                  className="hover:text-red-400 text-red-400 flex items-center gap-1.5 font-bold transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                  <span>Live Classes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('jee')}
                  className="hover:text-amber-400 transition-colors"
                >
                  JEE Main & Advanced 2028
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('neet')}
                  className="hover:text-amber-400 transition-colors"
                >
                  NEET Medical 2028
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('enrollments')}
                  className="hover:text-amber-400 transition-colors"
                >
                  My Enrollments
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3 text-xs font-syne">
              Study Resources
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-zinc-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Full Video Lectures</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>DPPs & Practice Sheets</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>100% Free - No Sign Up</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
        <div>
          © {new Date().getFullYear()} GB STUDY. All educational content curated for students.
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onOpenTelegram} className="text-sky-400 hover:underline">
            Telegram Community
          </button>
        </div>
      </div>
    </footer>
  );
};
