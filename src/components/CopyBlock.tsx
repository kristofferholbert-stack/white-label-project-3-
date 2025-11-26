
import React, { useState } from 'react';

export const CopyBlock: React.FC<{ title: string, content: string | object, type?: 'text' | 'json' }> = ({ title, content, type = 'text' }) => {
    const [copied, setCopied] = useState(false);
    const textToCopy = typeof content === 'string' ? content : JSON.stringify(content, null, 2);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 my-4">
            <div className="bg-slate-900 px-4 py-2 flex justify-between items-center border-b border-slate-700">
                <span className="text-xs font-mono text-slate-400 uppercase">{title}</span>
                <button
                    onClick={handleCopy}
                    className={`text-xs px-2 py-1 rounded transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap">
                    {textToCopy}
                </pre>
            </div>
        </div>
    );
};
