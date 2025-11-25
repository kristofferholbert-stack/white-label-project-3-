import React, { useRef } from 'react';

interface CompletionCertificateProps {
  courseName: string;
  userName: string;
  completionDate: Date;
  onClose: () => void;
}

export const CompletionCertificate: React.FC<CompletionCertificateProps> = ({
  courseName,
  userName,
  completionDate,
  onClose
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = () => {
    // In production, this would generate a PDF
    // For now, we'll just show the certificate
    alert('Certificate download will be available in production. You have successfully completed this course!');
  };

  const shareCertificate = () => {
    const text = `I just completed "${courseName}" 🎉`;
    if (navigator.share) {
      navigator.share({
        title: 'Course Completion',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="max-w-4xl w-full bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Certificate Display */}
        <div ref={certificateRef} className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-12">
          {/* Decorative Border */}
          <div className="absolute inset-4 border-4 border-emerald-500/30 rounded-lg"></div>
          <div className="absolute inset-6 border border-emerald-500/20 rounded-lg"></div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-6">
            {/* Badge */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>

            {/* Header */}
            <div>
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Certificate of Completion</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Congratulations!</h1>
            </div>

            {/* Body */}
            <div className="space-y-4">
              <p className="text-slate-300 text-lg">This certifies that</p>
              <p className="text-3xl md:text-4xl font-bold text-white">{userName}</p>
              <p className="text-slate-300 text-lg">has successfully completed</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-400">{courseName}</p>
            </div>

            {/* Date */}
            <div className="pt-6">
              <p className="text-slate-400 text-sm">
                Completed on {completionDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Signature Line */}
            <div className="pt-8 flex justify-center gap-16">
              <div className="text-center">
                <div className="border-t-2 border-slate-700 pt-2 px-8">
                  <p className="text-slate-400 text-sm font-medium">Stack Money Systems</p>
                  <p className="text-slate-500 text-xs">Authorized Signature</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-emerald-500/30 rounded-tl-lg"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-emerald-500/30 rounded-br-lg"></div>
        </div>

        {/* Actions */}
        <div className="bg-slate-900 border-t border-slate-800 p-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={downloadCertificate}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Certificate
          </button>
          <button
            onClick={shareCertificate}
            className="px-6 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Share Achievement
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Keyboard Shortcuts Helper
export const KeyboardShortcutsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
            <span className="text-slate-300">Next Lesson</span>
            <kbd className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm font-mono text-white">→</kbd>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
            <span className="text-slate-300">Previous Lesson</span>
            <kbd className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm font-mono text-white">←</kbd>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
            <span className="text-slate-300">Mark Complete</span>
            <kbd className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-sm font-mono text-white">Space</kbd>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
