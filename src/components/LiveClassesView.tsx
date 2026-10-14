import React, { useState } from 'react';
import { 
  Radio, Play, Users, Clock, Calendar, BookOpen, 
  Send, Bell, Sparkles, ArrowRight, FileText, CheckCircle2 
} from 'lucide-react';
import { LiveClass, ResolvedMedia } from '../types';
import { TELEGRAM_CHANNEL_URL, GB_STUDY_LOGO } from '../data/fallbackData';

interface LiveClassesViewProps {
  liveClasses: LiveClass[];
  onJoinLiveClass: (liveClass: LiveClass) => void;
  onOpenPdf?: (media: ResolvedMedia) => void;
}

export const LiveClassesView: React.FC<LiveClassesViewProps> = ({
  liveClasses,
  onJoinLiveClass,
  onOpenPdf,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming'>('all');
  const [reminderSetIds, setReminderSetIds] = useState<string[]>([]);

  const liveNowClasses = liveClasses.filter(c => c.status === 'live');
  const upcomingClasses = liveClasses.filter(c => c.status === 'upcoming');

  const handleToggleReminder = (id: string) => {
    setReminderSetIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const displayedLive = activeTab === 'upcoming' ? [] : liveNowClasses;
  const displayedUpcoming = activeTab === 'live' ? [] : upcomingClasses;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-950/40 via-zinc-900 to-black border border-red-500/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>GB STUDY Live Broadcast Hub</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-syne leading-tight">
              Interactive Live Classes
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Study directly with expert educators with live doubt clearance, concept breakdowns, real-time live chat and downloadable class notes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-sky-400 rounded-xl text-xs font-bold btn-press transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Live Class Telegram Alerts</span>
            </a>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/5">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-press ${
              activeTab === 'all'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-[#18181b] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            All Classes ({liveClasses.length})
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-press flex items-center gap-2 ${
              activeTab === 'live'
                ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                : 'bg-[#18181b] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            <span>Live Now ({liveNowClasses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-press ${
              activeTab === 'upcoming'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-[#18181b] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            Upcoming Schedule ({upcomingClasses.length})
          </button>
        </div>
      </div>

      {/* SECTION 1: LIVE NOW */}
      {displayedLive.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h3 className="text-xl font-black text-white font-syne">
              Currently Live Now
            </h3>
            <span className="text-xs text-red-400 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full ml-1">
              Active Sessions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedLive.map((item) => (
              <div
                key={item.id}
                className="card-dark rounded-2xl overflow-hidden group flex flex-col border border-red-500/30 hover:border-red-500/60 transition-all duration-300"
              >
                {/* Thumbnail banner */}
                <div 
                  className="relative w-full aspect-[16/9] bg-zinc-950 overflow-hidden cursor-pointer"
                  onClick={() => onJoinLiveClass(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />

                  {/* Pulsing Live Badge */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg shadow-red-600/40">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>LIVE NOW</span>
                  </div>

                  {/* Viewers count */}
                  {item.viewers_count && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                      <Users className="w-3 h-3 text-red-400" />
                      <span>{item.viewers_count.toLocaleString()} watching</span>
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/50 transform scale-75 group-hover:scale-100 transition-transform pl-0.5">
                      <Play className="w-6 h-6 fill-white" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold px-2 py-0.5 rounded">
                      {item.subject}
                    </span>
                    <span className="text-[10px] text-zinc-500 truncate">
                      {item.course_title}
                    </span>
                  </div>

                  <h4 
                    onClick={() => onJoinLiveClass(item)}
                    className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
                  >
                    {item.title}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                    Faculty: <span className="text-zinc-200 font-semibold">{item.educator}</span>
                    {item.description ? ` • ${item.description}` : ''}
                  </p>

                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onJoinLiveClass(item)}
                      className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 btn-press transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Join Live Class</span>
                    </button>

                    {item.notes_url && onOpenPdf && (
                      <button
                        onClick={() => onOpenPdf({
                          contentId: item.id,
                          courseId: String(item.course_id),
                          title: `${item.title} - Live Notes`,
                          file_url: item.notes_url!,
                          file_type: 'pdf',
                        })}
                        className="p-2.5 bg-[#18181b] hover:bg-[#222226] text-amber-400 border border-white/10 rounded-xl text-xs font-bold btn-press"
                        title="Download Live Notes"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: UPCOMING SCHEDULE */}
      {displayedUpcoming.length > 0 && (
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-black text-white font-syne">
              Upcoming Live Classes Timetable
            </h3>
            <span className="text-xs text-amber-400 font-bold bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full ml-1">
              Class 11 JEE & NEET
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedUpcoming.map((item) => {
              const hasReminder = reminderSetIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="card-dark rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400/30 transition-all duration-300"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold px-2 py-0.5 rounded">
                          {item.subject}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium">
                          {item.course_title}
                        </span>
                      </div>
                      <span className="text-[10px] bg-white/5 text-zinc-300 px-2 py-0.5 rounded border border-white/5 font-mono">
                        {item.scheduled_time}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Educator: <span className="text-zinc-200 font-semibold">{item.educator}</span>
                      {item.description ? ` • ${item.description}` : ''}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleReminder(item.id)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 btn-press transition-colors ${
                        hasReminder
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-[#18181b] hover:bg-[#222226] text-zinc-300 border border-white/10'
                      }`}
                    >
                      {hasReminder ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Reminder Set</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5 text-amber-400" />
                          <span>Set Reminder</span>
                        </>
                      )}
                    </button>

                    <a
                      href={TELEGRAM_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20 rounded-xl text-xs btn-press"
                      title="Telegram Live Link"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
