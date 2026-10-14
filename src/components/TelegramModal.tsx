import React from 'react';
import { Send, X, Bell, ExternalLink, CheckCircle } from 'lucide-react';
import { TELEGRAM_CHANNEL_URL, TELEGRAM_POPUP_TITLE, TELEGRAM_POPUP_DESC } from '../data/fallbackData';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramModal: React.FC<TelegramModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleJoin = () => {
    window.open(TELEGRAM_CHANNEL_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          {/* Official Logo & Telegram Icon Badge */}
          <div className="relative mb-4 flex items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black border-2 border-amber-400/50 shadow-xl shadow-amber-400/20 p-0.5 transform -rotate-3 transition-transform hover:rotate-0">
              <img
                src="/logo.png"
                alt="GB STUDY"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white transform rotate-3 transition-transform hover:rotate-0">
              <Send className="w-7 h-7 transform translate-x-0.5 -translate-y-0.5" />
            </div>
            <span className="absolute -top-1 right-24 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide font-syne mb-2">
            {TELEGRAM_POPUP_TITLE}
          </h3>

          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mb-6">
            {TELEGRAM_POPUP_DESC}
          </p>

          {/* Quick Perks List */}
          <div className="w-full bg-[#18181b]/80 border border-white/5 rounded-xl p-3.5 mb-6 text-left space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant alerts for new JEE & NEET lectures</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct downloadable DPP sheets & Chapter notes</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Free access with no login or subscriptions</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleJoin}
              className="flex-1 py-3 px-5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 btn-press cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Join Telegram</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-sm rounded-xl border border-white/5 btn-press cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
