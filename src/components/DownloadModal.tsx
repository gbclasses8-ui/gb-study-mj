import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, HardDrive } from 'lucide-react';
import { ResolvedMedia } from '../types';

interface DownloadModalProps {
  media: ResolvedMedia | null;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ media, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  if (!media) return null;

  const downloadUrls = media.download_urls || [];
  const primaryUrl = media.file_url;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-amber-400/40 p-0.5 shadow-md shadow-amber-400/10 shrink-0">
            <img
              src="/logo.png"
              alt="GB STUDY"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-syne">
              GB STUDY • Downloader
            </h3>
            <p className="text-xs text-zinc-400 truncate max-w-xs">
              {media.title}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {downloadUrls.length > 0 ? (
            downloadUrls.map((item, index) => (
              <div
                key={index}
                className="bg-[#18181b] border border-white/5 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-amber-400/30 transition-colors"
              >
                <div>
                  <span className="text-xs font-bold text-white block">
                    {item.title} Resolution
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    High-speed CloudFront CDN
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item.url)}
                    className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg text-xs font-semibold btn-press"
                    title="Copy Link"
                  >
                    {copiedUrl === item.url ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-yellow-400 text-black rounded-lg text-xs font-bold btn-press"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))
          ) : primaryUrl ? (
            <div className="bg-[#18181b] border border-white/5 rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">
                  Original Stream Link
                </span>
                <span className="text-[10px] text-zinc-500">
                  {primaryUrl.includes('.m3u8') ? 'HLS Stream (.m3u8)' : 'Direct Video File'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(primaryUrl)}
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg text-xs font-semibold btn-press"
                  title="Copy Stream Link"
                >
                  {copiedUrl === primaryUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-yellow-400 text-black rounded-lg text-xs font-bold btn-press"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open URL</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-zinc-500 text-xs">
              No direct download links available for this media item.
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
