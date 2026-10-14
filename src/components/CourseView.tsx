import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Folder, Play, FileText, Download, ChevronRight, 
  Search, X, Loader2, Sparkles, BookOpen, Layers, Check, Plus, 
  ExternalLink, Info, Filter, ArrowUpRight
} from 'lucide-react';
import { ContentItem, CourseDetail, Batch, FolderHistoryItem, ResolvedMedia } from '../types';
import { studyApi } from '../services/studyApi';

interface CourseViewProps {
  courseId: string | number;
  batchInfo?: Batch;
  onBack: () => void;
  onPlayVideo: (media: ResolvedMedia, playlistItems: ContentItem[]) => void;
  onOpenPdf: (media: ResolvedMedia) => void;
  onOpenDownload: (media: ResolvedMedia) => void;
  isEnrolled: boolean;
  onToggleEnroll: (e: React.MouseEvent, id: string | number) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({
  courseId,
  batchInfo,
  onBack,
  onPlayVideo,
  onOpenPdf,
  onOpenDownload,
  isEnrolled,
  onToggleEnroll,
}) => {
  const [folderHistory, setFolderHistory] = useState<FolderHistoryItem[]>([
    { id: "0", title: "Course Content" }
  ]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'videos' | 'pdfs' | 'folders'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [overview, setOverview] = useState<CourseDetail | null>(null);
  const [showOverviewTab, setShowOverviewTab] = useState(false);

  const currentFolder = folderHistory[folderHistory.length - 1];

  // Load Overview
  useEffect(() => {
    let isMounted = true;
    studyApi.getCourseOverview(courseId).then(data => {
      if (isMounted && data) setOverview(data);
    });
    return () => { isMounted = false; };
  }, [courseId]);

  // Load Folder Content
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    studyApi.getCourseContent(courseId, currentFolder.id)
      .then(items => {
        if (isMounted) {
          setContentItems(items);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setContentItems([]);
          setIsLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [courseId, currentFolder.id]);

  const handleOpenFolder = (folderId: string, folderTitle: string) => {
    setSearchQuery('');
    setFolderHistory(prev => [...prev, { id: folderId, title: folderTitle }]);
  };

  const handleNavigateBreadcrumb = (index: number) => {
    setSearchQuery('');
    setFolderHistory(prev => prev.slice(0, index + 1));
  };

  const handleItemClick = async (item: ContentItem) => {
    if (item.type === 'folder') {
      handleOpenFolder(item.entity_id, item.title);
      return;
    }

    if (item.type === 'file') {
      const isVideo = item.data?.file_type === 2 || (item.data?.video_type ?? 0) > 0;
      setResolvingId(item.entity_id);

      try {
        const resolved = await studyApi.resolveMedia(courseId, item.entity_id, item);
        setResolvingId(null);

        if (!resolved) {
          alert("Media could not be loaded. Please try again.");
          return;
        }

        if (isVideo) {
          // Playlist items from the same folder
          const playlist = contentItems.filter(i => i.type === 'file');
          onPlayVideo(resolved, playlist);
        } else {
          onOpenPdf(resolved);
        }
      } catch (err) {
        setResolvingId(null);
        alert("Unable to open media item.");
      }
    }
  };

  const handleDownloadClick = async (e: React.MouseEvent, item: ContentItem) => {
    e.stopPropagation();
    setResolvingId(item.entity_id);
    const resolved = await studyApi.resolveMedia(courseId, item.entity_id, item);
    setResolvingId(null);
    if (resolved) {
      onOpenDownload(resolved);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds || isNaN(seconds)) return null;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const mStr = m.toString().padStart(2, '0');
    const sStr = s.toString().padStart(2, '0');
    return h > 0 ? `${h}:${mStr}:${sStr}` : `${mStr}:${sStr}`;
  };

  // Filter items
  const filteredItems = contentItems.filter(item => {
    // Search query filter
    if (searchQuery.trim()) {
      const match = item.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
      if (!match) return false;
    }

    // Type filter
    if (filterType === 'folders') return item.type === 'folder';
    if (filterType === 'videos') {
      return item.type === 'file' && (item.data?.file_type === 2 || (item.data?.video_type ?? 0) > 0);
    }
    if (filterType === 'pdfs') {
      return item.type === 'file' && (item.data?.file_type === 1 || item.data?.file_type !== 2);
    }

    return true;
  });

  const courseTitle = overview?.title || batchInfo?.title || `Batch #${courseId}`;
  const courseThumbnail = overview?.thumbnail || batchInfo?.thumbnail;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col pb-24">
      {/* Course Hero Header Banner */}
      <div className="relative bg-zinc-950 border-b border-white/5 overflow-hidden">
        {/* Ambient background image blur */}
        {courseThumbnail && (
          <div className="absolute inset-0 opacity-15 overflow-hidden pointer-events-none">
            <img src={courseThumbnail} alt="" className="w-full h-full object-cover blur-2xl scale-110" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <button
                onClick={onBack}
                className="mt-1 p-2 bg-[#121212] border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl btn-press transition-colors"
                title="Back to Batches"
              >
                <ArrowLeft className="w-5 h-5 text-amber-400" />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md overflow-hidden bg-black border border-amber-400/40 p-0.5 inline-flex items-center justify-center">
                    <img src="/logo.png" alt="GB" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-sm" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-400">GB STUDY</span>
                  <span className="text-zinc-600">•</span>
                  <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                    {batchInfo?.category || "Course"}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                    FREE ACCESS
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-syne leading-tight">
                  {courseTitle}
                </h1>
                
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl line-clamp-2">
                  {overview?.description ? overview.description.replace(/<[^>]*>?/gm, '') : batchInfo?.description}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0 pl-12 md:pl-0">
              <button
                onClick={(e) => onToggleEnroll(e, courseId)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 btn-press transition-all ${
                  isEnrolled
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
                }`}
              >
                {isEnrolled ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ENROLLED</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>ENROLL BATCH</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowOverviewTab(!showOverviewTab)}
                className="px-3.5 py-2.5 bg-[#18181b] hover:bg-[#222226] border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 btn-press transition-colors"
              >
                <Info className="w-4 h-4 text-amber-400" />
                <span>{showOverviewTab ? 'Hide Syllabus' : 'Curriculum Info'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        
        {/* Syllabus / Overview Collapsible Panel */}
        {showOverviewTab && overview && (
          <div className="mb-6 bg-[#121212] border border-amber-400/20 rounded-2xl p-5 sm:p-6 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-syne">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Course Syllabus & Schedule Breakdown
              </h3>
              <button
                onClick={() => setShowOverviewTab(false)}
                className="text-xs text-zinc-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div 
              className="prose prose-invert prose-xs sm:prose-sm max-w-none text-zinc-300 leading-relaxed [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>img]:rounded-lg [&>img]:my-2"
              dangerouslySetInnerHTML={{ __html: overview.description }}
            />
          </div>
        )}

        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-[#121212] p-3 sm:p-4 rounded-2xl border border-white/5">
          {/* Breadcrumb Trail */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs">
            {folderHistory.map((folder, idx) => {
              const isLast = idx === folderHistory.length - 1;
              return (
                <div key={folder.id} className="flex items-center">
                  <button
                    onClick={() => handleNavigateBreadcrumb(idx)}
                    disabled={isLast}
                    className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 font-semibold ${
                      isLast
                        ? 'text-amber-400 bg-amber-400/10 cursor-default'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer'
                    }`}
                  >
                    {idx === 0 && <BookOpen className="w-3.5 h-3.5" />}
                    <span>{folder.title}</span>
                  </button>
                  {!isLast && (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 mx-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Search & Filter Controls */}
          <div className="flex items-center gap-2">
            {/* Filter Buttons */}
            <div className="flex items-center bg-[#18181b] p-1 rounded-xl border border-white/5 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  filterType === 'all' ? 'bg-amber-400 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('videos')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  filterType === 'videos' ? 'bg-amber-400 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setFilterType('pdfs')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  filterType === 'pdfs' ? 'bg-amber-400 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Notes
              </button>
            </div>

            {/* Folder search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter folder..."
                className="bg-[#18181b] border border-white/10 text-white text-xs rounded-xl pl-8 pr-7 py-1.5 placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50 w-36 sm:w-44"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Items Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Loader2 className="w-9 h-9 animate-spin text-amber-400 mb-3" />
            <p className="text-zinc-400 font-semibold text-sm">Loading course contents...</p>
            <span className="text-[11px] text-zinc-600 mt-1">Connecting to GB STUDY library</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#121212] border border-white/5 rounded-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Folder className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 font-syne">
              No Content in this Folder
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mb-4">
              {searchQuery ? `No items match "${searchQuery}". Try a different search.` : "This chapter folder has no items currently uploaded."}
            </p>
            {folderHistory.length > 1 && (
              <button
                onClick={() => handleNavigateBreadcrumb(folderHistory.length - 2)}
                className="px-4 py-2 bg-[#18181b] hover:bg-[#222226] text-amber-400 text-xs font-bold rounded-xl border border-white/10 btn-press"
              >
                Go Back One Level
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredItems.map((item, index) => {
              const isFolder = item.type === 'folder';
              const isResolving = resolvingId === item.entity_id;
              
              if (isFolder) {
                const counts = item.data?.content_counts || {};
                const fCount = counts.folders?.total || 0;
                const vCount = (counts.video?.paid || 0) + (counts.video?.free || 0);
                const pCount = (counts.pdf?.paid || 0) + (counts.pdf?.free || 0);

                let badges: string[] = [];
                if (vCount > 0) badges.push(`${vCount} Videos`);
                if (pCount > 0) badges.push(`${pCount} Notes`);
                if (fCount > 0) badges.push(`${fCount} Subfolders`);

                return (
                  <div
                    key={item.entity_id || index}
                    onClick={() => handleItemClick(item)}
                    className="card-dark rounded-2xl p-4 cursor-pointer group flex flex-col justify-between h-[180px] btn-press relative overflow-hidden"
                  >
                    {/* Folder Icon / Banner */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors duration-300">
                        <Folder className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] text-zinc-500 group-hover:text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors">
                        <span>Open</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-zinc-100 font-bold text-sm leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        {badges.length > 0 ? (
                          badges.map((b, bIdx) => (
                            <span 
                              key={bIdx}
                              className="text-[10px] bg-white/5 border border-white/5 text-zinc-400 px-2 py-0.5 rounded font-medium"
                            >
                              {b}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-zinc-500 uppercase font-semibold">
                            Folder
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              // File / Lecture / PDF Card
              const fileType = item.data?.file_type;
              const isVideo = fileType === 2 || (item.data?.video_type ?? 0) > 0;
              const durationStr = formatDuration(item.data?.duration);
              const thumbnail = item.data?.thumbnail?.trim() 
                ? item.data.thumbnail 
                : isVideo 
                ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
                : null;

              return (
                <div
                  key={item.entity_id || index}
                  onClick={() => handleItemClick(item)}
                  className="card-dark rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-[230px] btn-press relative"
                >
                  {/* Top Thumbnail / Icon */}
                  <div className="relative h-[130px] w-full bg-zinc-950 overflow-hidden border-b border-white/5 flex items-center justify-center">
                    {isVideo && thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#151518]">
                        <FileText className="w-10 h-10 text-red-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] text-red-400/80 font-bold uppercase mt-1">
                          PDF Notes
                        </span>
                      </div>
                    )}

                    {/* Tag Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      {isVideo ? (
                        <span className="bg-black/70 backdrop-blur-md text-amber-400 text-[10px] font-black px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current" /> VIDEO
                        </span>
                      ) : (
                        <span className="bg-red-500/20 backdrop-blur-md text-red-400 text-[10px] font-black px-2 py-0.5 rounded border border-red-500/20">
                          PDF
                        </span>
                      )}
                    </div>

                    {/* Duration badge if video */}
                    {durationStr && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-medium z-10">
                        {durationStr}
                      </div>
                    )}

                    {/* Play Hover Overlay */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-11 h-11 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform pl-0.5">
                          {isResolving ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Play className="w-5 h-5 fill-black" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Content */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#121212] group-hover:bg-[#18181b] transition-colors">
                    <h4 className="text-zinc-200 font-semibold text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1">
                      <span className="text-[10px] text-zinc-500 font-medium">
                        {isVideo ? 'Click to Watch' : 'Click to Read'}
                      </span>

                      {isVideo && (
                        <button
                          onClick={(e) => handleDownloadClick(e, item)}
                          className="p-1 text-zinc-500 hover:text-amber-400 rounded hover:bg-white/5 transition-colors"
                          title="Download Video"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
