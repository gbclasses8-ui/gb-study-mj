import React from 'react';
import { Play, Check, Plus, BookOpen, Layers, Info, ArrowRight } from 'lucide-react';
import { Batch } from '../types';

interface BatchCardProps {
  batch: Batch;
  isEnrolled: boolean;
  onToggleEnroll: (e: React.MouseEvent, id: string | number) => void;
  onStudyClick: (id: string | number) => void;
  onOverviewClick?: (batch: Batch) => void;
}

export const BatchCard: React.FC<BatchCardProps> = ({
  batch,
  isEnrolled,
  onToggleEnroll,
  onStudyClick,
  onOverviewClick,
}) => {
  return (
    <div className="card-dark rounded-2xl overflow-hidden group flex flex-col relative transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail Container */}
      <div 
        className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 border-b border-white/5 cursor-pointer"
        onClick={() => onStudyClick(batch.id)}
      >
        <img
          src={batch.thumbnail}
          alt={batch.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          onError={(e) => {
            // Fallback graphic if image fails
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />

        {/* Free Tag */}
        <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center justify-center z-10 shadow-sm">
          <span className="text-emerald-400 text-[10px] font-black tracking-widest uppercase">FREE</span>
        </div>

        {/* Category Tag */}
        {batch.category && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg z-10">
            <span className="text-amber-400 text-[10px] font-bold tracking-wider uppercase">
              {batch.category}
            </span>
          </div>
        )}

        {/* Quick Play Hover Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
          <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg shadow-amber-400/40 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-black ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 relative z-20">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 
            onClick={() => onStudyClick(batch.id)}
            className="text-zinc-100 font-bold text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors cursor-pointer"
          >
            {batch.title}
          </h3>
          {onOverviewClick && (
            <button
              onClick={() => onOverviewClick(batch)}
              className="p-1 text-zinc-500 hover:text-zinc-300 rounded hover:bg-white/5 transition-colors shrink-0"
              title="Batch Overview & Info"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>

        {batch.description && (
          <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
            {batch.description.replace(/<[^>]*>?/gm, '')}
          </p>
        )}

        {/* Features / Meta Pills */}
        <div className="flex items-center gap-3 text-[11px] text-zinc-400 mb-5 mt-auto">
          <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
            <Layers className="w-3 h-3 text-amber-400" />
            <span>Full Syllabus</span>
          </span>
          <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
            <BookOpen className="w-3 h-3 text-emerald-400" />
            <span>PDF Notes & DPP</span>
          </span>
        </div>

        {/* Card Actions */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5">
          {/* Enroll Button */}
          <button
            onClick={(e) => onToggleEnroll(e, batch.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all btn-press ${
              isEnrolled
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
            }`}
          >
            {isEnrolled ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ENROLLED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>ENROLL</span>
              </>
            )}
          </button>

          {/* Let's Study Button */}
          <button
            onClick={() => onStudyClick(batch.id)}
            className="bg-amber-400 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all btn-press shadow-md shadow-amber-400/20"
          >
            <span>Let's Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
