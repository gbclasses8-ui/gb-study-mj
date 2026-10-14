import React from 'react';
import { X, CheckCircle, Calendar, ShieldCheck, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { CourseDetail, Batch } from '../types';

interface CourseOverviewModalProps {
  detail: CourseDetail | null;
  batch: Batch | null;
  onClose: () => void;
  onStudyClick: (id: string | number) => void;
}

export const CourseOverviewModal: React.FC<CourseOverviewModalProps> = ({
  detail,
  batch,
  onClose,
  onStudyClick,
}) => {
  if (!detail && !batch) return null;

  const currentTitle = detail?.title || batch?.title || 'Batch Details';
  const currentThumbnail = detail?.thumbnail || batch?.thumbnail || '';
  const currentDesc = detail?.description || batch?.description || '';
  const courseId = detail?.id || batch?.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-[#121212] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Banner with close */}
        <div className="relative h-44 sm:h-56 bg-zinc-950 overflow-hidden shrink-0">
          <img
            src={currentThumbnail}
            alt={currentTitle}
            className="w-full h-full object-cover opacity-85"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white rounded-full hover:bg-black/90 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 z-10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-md overflow-hidden bg-black border border-amber-400/40 p-0.5 inline-flex items-center justify-center">
                <img src="/logo.png" alt="GB" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-sm" />
              </div>
              <span className="text-[10px] bg-amber-400 text-black font-extrabold uppercase px-2 py-0.5 rounded tracking-wider inline-block">
                GB STUDY • Course Details
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white font-syne line-clamp-1">
              {currentTitle}
            </h3>
          </div>
        </div>

        {/* Scrollable Details Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-zinc-300 text-sm">
          {/* Key Batch Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#18181b] border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
              <BookOpen className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-xs font-bold text-white">Full Syllabus</span>
              <span className="text-[10px] text-zinc-500">Live & Recorded</span>
            </div>
            <div className="bg-[#18181b] border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
              <Layers className="w-5 h-5 text-emerald-400 mb-1" />
              <span className="text-xs font-bold text-white">DPP & Modules</span>
              <span className="text-[10px] text-zinc-500">Video Solutions</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-[#18181b] border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
              <ShieldCheck className="w-5 h-5 text-sky-400 mb-1" />
              <span className="text-xs font-bold text-white">100% Free</span>
              <span className="text-[10px] text-zinc-500">No Login Required</span>
            </div>
          </div>

          {/* Description Content */}
          <div className="bg-[#18181b]/50 border border-white/5 rounded-xl p-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-syne">
              Batch Curriculum & Schedule
            </h4>
            {currentDesc.includes('<') ? (
              <div 
                className="prose prose-invert prose-xs max-w-none text-zinc-300 leading-relaxed space-y-2 [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>img]:rounded-lg [&>img]:my-2"
                dangerouslySetInnerHTML={{ __html: currentDesc }} 
              />
            ) : (
              <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                {currentDesc}
              </p>
            )}
          </div>

          {/* Included Packages / Extras */}
          {detail?.packages && detail.packages.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-syne">
                Included Course Packages
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-[#18181b] border border-white/5 rounded-xl p-3 flex items-center gap-3"
                  >
                    <img
                      src={pkg.thumbnail}
                      alt={pkg.title}
                      className="w-12 h-12 rounded-lg object-cover bg-zinc-900 shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{pkg.title}</h5>
                      <span className="text-[10px] text-emerald-400 uppercase font-semibold">Included Free</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#18181b] border-t border-white/5 px-6 py-4 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white rounded-xl transition-colors"
          >
            Close
          </button>

          {courseId && (
            <button
              onClick={() => {
                onClose();
                onStudyClick(courseId);
              }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 btn-press shadow-md shadow-amber-400/20"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
