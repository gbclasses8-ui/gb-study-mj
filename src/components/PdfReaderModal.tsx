import React from 'react';
import { X, Download, ExternalLink, FileText, Share2 } from 'lucide-react';
import { ResolvedMedia } from '../types';

interface PdfReaderModalProps {
  media: ResolvedMedia | null;
  onClose: () => void;
}

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({ media, onClose }) => {
  if (!media) return null;

  const pdfUrl = media.file_url;

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `${media.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl h-[92vh] bg-[#121212] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#18181b] border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 truncate">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-amber-400/40 p-0.5 shrink-0">
              <img
                src="/logo.png"
                alt="GB STUDY"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="truncate">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">GB STUDY • PDF Notes</span>
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {media.title}
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {pdfUrl && (
              <>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-yellow-400 text-black text-xs font-bold rounded-xl btn-press shadow-sm"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl btn-press border border-white/5"
                  title="Open in new window"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open Tab</span>
                </a>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 bg-zinc-950 relative overflow-hidden flex flex-col items-center justify-center">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title={media.title}
              className="w-full h-full border-none"
            />
          ) : (
            <div className="text-center p-8 text-zinc-400 max-w-sm">
              <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white mb-1">PDF Document Protected or Not Available</h4>
              <p className="text-xs text-zinc-500 mb-4">The file URL could not be resolved from the cloud library.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-zinc-800 text-white rounded-xl text-xs font-semibold"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
