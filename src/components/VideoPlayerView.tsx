import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Maximize, Minimize, ArrowLeft, Download, ExternalLink, 
  Settings, Check, ChevronRight, FileText, Share2, AlertCircle
} from 'lucide-react';
import { ResolvedMedia, ContentItem } from '../types';

interface VideoPlayerViewProps {
  media: ResolvedMedia;
  courseTitle: string;
  onBack: () => void;
  playlistItems?: ContentItem[];
  onSelectPlaylistItem?: (item: ContentItem) => void;
  onOpenDownloadModal?: () => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  media,
  courseTitle,
  onBack,
  playlistItems = [],
  onSelectPlaylistItem,
  onOpenDownloadModal,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const controlsTimeoutRef = useRef<any>(null);

  const isYouTube = media.file_type === 'youtube' || 
    media.file_url.includes('youtube.com') || 
    media.file_url.includes('youtu.be');

  // Extract YouTube ID if needed
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    if (isYouTube) return;

    const video = videoRef.current;
    if (!video) return;

    setErrorMessage(null);
    const streamUrl = media.file_url;

    if (!streamUrl) {
      setErrorMessage("No video stream URL available for this lecture.");
      return;
    }

    if (streamUrl.includes('.m3u8')) {
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        });
        hlsRef.current = hls;

        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            // Autoplay blocked by browser policy
            setIsPlaying(false);
          });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                setErrorMessage("Unable to load video stream. You may download it below.");
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS (Safari/iOS)
        video.src = streamUrl;
        video.play().catch(() => setIsPlaying(false));
      }
    } else {
      // Direct MP4
      video.src = streamUrl;
      video.play().catch(() => setIsPlaying(false));
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [media.file_url, isYouTube]);

  // Video event listeners
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seek = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    const mStr = m.toString().padStart(2, '0');
    const sStr = s.toString().padStart(2, '0');
    return h > 0 ? `${h}:${mStr}:${sStr}` : `${mStr}:${sStr}`;
  };

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setIsControlsVisible(false);
    }, 3000);
  };

  const [activeSidebarTab, setActiveSidebarTab] = useState<'playlist' | 'livechat'>(media.is_live ? 'livechat' : 'playlist');
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; user: string; text: string; time: string; isTeacher?: boolean }>>([
    { id: '1', user: 'Rahul Verma (Class 11)', text: 'Good evening sir! Present for today’s live lecture.', time: 'Live' },
    { id: '2', user: 'Priya Sharma (NEET)', text: 'Sir question 4 ka approach crystal clear ho gaya!', time: 'Live' },
    { id: '3', user: 'GB STUDY Faculty', text: 'Welcome everyone! Focus on notes and solve DPP right after class.', time: 'Live', isTeacher: true },
    { id: '4', user: 'Aman Deep', text: 'Notes planner PDF tab me available hai na?', time: 'Live' },
    { id: '5', user: 'Sneha Patel', text: 'Yes Aman, notes tab me already uploaded hai.', time: 'Live' },
  ]);
  const [myChatInput, setMyChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myChatInput.trim()) return;
    const newMsg = {
      id: String(Date.now()),
      user: 'You (Student)',
      text: myChatInput.trim(),
      time: 'Just now',
    };
    setChatMessages(prev => [...prev, newMsg]);
    setMyChatInput('');
  };

  const youtubeId = isYouTube ? getYouTubeId(media.file_url) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 text-zinc-100 flex flex-col">
      {/* Top Header */}
      <div className="bg-[#121212] border-b border-white/5 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 btn-press transition-colors text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Back</span>
            </button>

            {/* Official GB STUDY Logo in Player */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-amber-400/40 p-0.5 shadow-md shadow-amber-400/10">
                <img
                  src="/logo.png"
                  alt="GB STUDY"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <span className="text-sm font-black text-white font-syne">
                GB <span className="text-amber-400">STUDY</span>
              </span>
            </div>
          </div>

          <div className="text-center truncate flex-1 px-2">
            <div className="flex items-center justify-center gap-2">
              {media.is_live && (
                <span className="bg-red-600 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-md shadow-red-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              )}
              <span className="text-[11px] text-amber-400 font-bold tracking-wider uppercase truncate max-w-xs">
                {courseTitle}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white truncate">
              {media.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {media.file_url && (
              <a
                href={media.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/5 transition-colors"
                title="Direct Stream Link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Stream</span>
              </a>
            )}
            {onOpenDownloadModal && (
              <button
                onClick={onOpenDownloadModal}
                className="flex items-center gap-1.5 bg-amber-400 hover:bg-yellow-400 text-black px-3.5 py-1.5 rounded-xl text-xs font-bold btn-press shadow-md shadow-amber-400/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* Left: Video Player & Controls */}
        <div className="flex-1 flex flex-col">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center group"
          >
            {isYouTube ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={media.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : errorMessage ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-zinc-400">
                <AlertCircle className="w-10 h-10 text-amber-400 mb-3" />
                <p className="text-sm font-medium mb-4">{errorMessage}</p>
                {media.file_url && (
                  <a
                    href={media.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-amber-400 text-black text-xs font-bold rounded-xl flex items-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in External Player</span>
                  </a>
                )}
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-contain cursor-pointer"
                  playsInline
                  poster={media.thumbnail}
                />

                {/* Big Center Play Button (when paused) */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] cursor-pointer"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.5)] transform hover:scale-110 transition-transform pl-1">
                      <Play className="w-8 h-8 fill-black" />
                    </div>
                  </div>
                )}

                {/* Video Controls Bar */}
                <div
                  className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 sm:p-5 flex flex-col gap-2 transition-opacity duration-300 ${
                    isControlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {/* Progress Seek Bar */}
                  <div className="flex items-center gap-3 w-full">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeekChange}
                      className="w-full h-1.5 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:h-2 transition-all"
                    />
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center justify-between gap-2 mt-1">
                    {/* Left Controls */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-2 text-white hover:text-amber-400 transition-colors"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                      </button>

                      <button
                        onClick={() => seek(-10)}
                        className="p-1.5 text-zinc-300 hover:text-white transition-colors"
                        title="Rewind 10 seconds"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => seek(10)}
                        className="p-1.5 text-zinc-300 hover:text-white transition-colors"
                        title="Forward 10 seconds"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>

                      {/* Volume Slider */}
                      <div className="flex items-center gap-1.5 group/vol">
                        <button
                          onClick={toggleMute}
                          className="p-1.5 text-zinc-300 hover:text-white transition-colors"
                        >
                          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-400 hidden sm:block"
                        />
                      </div>

                      {/* Time Display */}
                      <div className="text-[11px] sm:text-xs text-zinc-300 font-mono font-medium ml-1">
                        <span>{formatTime(currentTime)}</span>
                        <span className="text-zinc-600 mx-1">/</span>
                        <span className="text-zinc-400">{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2 relative">
                      {/* Speed Control Button */}
                      <button
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        className="px-2 py-1 text-xs font-bold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-1"
                      >
                        <span>{playbackSpeed}x</span>
                      </button>

                      {/* Speed Dropdown Menu */}
                      {showSpeedMenu && (
                        <div className="absolute bottom-10 right-8 bg-[#18181b] border border-white/10 rounded-xl p-1.5 shadow-2xl flex flex-col gap-0.5 z-50 min-w-[90px]">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((spd) => (
                            <button
                              key={spd}
                              onClick={() => changeSpeed(spd)}
                              className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                                playbackSpeed === spd ? 'bg-amber-400 text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                              }`}
                            >
                              <span>{spd}x</span>
                              {playbackSpeed === spd && <Check className="w-3 h-3 ml-2" />}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="p-1.5 text-zinc-300 hover:text-white transition-colors"
                        title="Fullscreen"
                      >
                        {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Video Information & Actions */}
          <div className="mt-5 p-5 bg-[#121212] border border-white/5 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  Full Video Lecture
                </span>
                <h1 className="text-lg sm:text-xl font-bold text-white mt-1.5 font-syne">
                  {media.title}
                </h1>
              </div>

              {onOpenDownloadModal && (
                <button
                  onClick={onOpenDownloadModal}
                  className="self-start sm:self-auto flex items-center gap-2 bg-[#18181b] hover:bg-[#222226] border border-white/10 text-zinc-200 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all btn-press"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Options</span>
                </button>
              )}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                GB STUDY High-Definition Streaming
              </span>
              <span>•</span>
              <span>100% Free Access</span>
              <span>•</span>
              <span>No login needed</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Related Lectures / Live Chat */}
        <div className="w-full lg:w-80 flex flex-col shrink-0">
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex flex-col h-[520px]">
            {/* Tab switchers if both available */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                {media.is_live && (
                  <button
                    onClick={() => setActiveSidebarTab('livechat')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      activeSidebarTab === 'livechat'
                        ? 'bg-red-500 text-white'
                        : 'text-zinc-400 hover:text-white bg-white/5'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Live Chat</span>
                  </button>
                )}

                {playlistItems.length > 0 && (
                  <button
                    onClick={() => setActiveSidebarTab('playlist')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      activeSidebarTab === 'playlist'
                        ? 'bg-amber-400 text-black'
                        : 'text-zinc-400 hover:text-white bg-white/5'
                    }`}
                  >
                    <span>Lectures ({playlistItems.length})</span>
                  </button>
                )}
              </div>

              {media.is_live && (
                <span className="text-[10px] text-red-400 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                  Live Stream
                </span>
              )}
            </div>

            {/* TAB CONTENT: LIVE CHAT */}
            {activeSidebarTab === 'livechat' ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mb-3 text-xs">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`p-2.5 rounded-xl border leading-relaxed ${
                        msg.isTeacher 
                          ? 'bg-amber-400/10 border-amber-400/30' 
                          : msg.user.startsWith('You') 
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-[#18181b] border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`font-bold truncate text-[11px] ${
                          msg.isTeacher 
                            ? 'text-amber-400' 
                            : msg.user.startsWith('You')
                            ? 'text-emerald-400'
                            : 'text-zinc-300'
                        }`}>
                          {msg.user}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-zinc-200 text-xs">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendChat} className="pt-2 border-t border-white/5 flex gap-2">
                  <input
                    type="text"
                    value={myChatInput}
                    onChange={(e) => setMyChatInput(e.target.value)}
                    placeholder="Ask doubt or chat live..."
                    className="flex-1 bg-[#18181b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold btn-press"
                    title="Send"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* TAB CONTENT: PLAYLIST */
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {playlistItems.map((item, idx) => {
                  const isCurrent = String(item.entity_id) === String(media.contentId);
                  const isVideo = item.type === 'file' && (item.data?.file_type === 2 || (item.data?.video_type ?? 0) > 0);

                  return (
                    <div
                      key={item.entity_id || idx}
                      onClick={() => onSelectPlaylistItem && onSelectPlaylistItem(item)}
                      className={`p-3 rounded-xl cursor-pointer flex items-center gap-3 transition-all btn-press ${
                        isCurrent
                          ? 'bg-amber-400/10 border border-amber-400/30 text-white'
                          : 'bg-[#18181b]/60 hover:bg-[#18181b] border border-transparent text-zinc-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isCurrent ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {isVideo ? <Play className="w-3.5 h-3.5 fill-current ml-0.5" /> : <FileText className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-amber-400' : 'text-zinc-200'}`}>
                          {item.title}
                        </p>
                        <span className="text-[10px] text-zinc-500">
                          {isVideo ? 'Video Lecture' : 'PDF Document'}
                        </span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
