import React from 'react';

const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

interface LockedOverlayProps {
    message?: string;
    onUpgrade: () => void;
}

export const LockedOverlay: React.FC<LockedOverlayProps> = ({ message = "This asset is reserved for Inner Circle members.", onUpgrade }) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl text-center shadow-2xl max-w-sm mx-4">
                <div className="inline-flex p-3 bg-orange-500/10 rounded-full mb-4">
                    <LockIcon />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Unlock This Blueprint</h3>
                <p className="text-slate-400 text-sm mb-6">{message}</p>
                <button
                    onClick={onUpgrade}
                    className="w-full py-3 bg-orange-gradient text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg bg-gradient-to-r from-orange-500 to-amber-500"
                >
                    Join Inner Circle
                </button>
            </div>
        </div>
    );
};
