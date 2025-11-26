import React, { useState, useEffect } from 'react';
import { ROI_PROTOCOL_PRODUCT } from '../constants/constants';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

interface TripwireCardProps {
    className?: string;
    headline?: string;
    subhead?: string;
    contextQuote?: string;
}

export const TripwireCard: React.FC<TripwireCardProps> = ({
    className,
    headline = "Wait! Not ready to commit to software?",
    subhead = "Calculate your profit potential first. Get the light at the end of the tunnel.",
    contextQuote = "The first thing you should ask is: What is the ROI? Use this kit to answer that question before you build."
}) => {
    const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes in seconds
    const [isExpired, setIsExpired] = useState(false);
    const [price, setPrice] = useState(ROI_PROTOCOL_PRODUCT.price);

    useEffect(() => {
        const storedEndTime = localStorage.getItem('oto_timer_end');
        const now = Date.now();

        if (storedEndTime) {
            const remaining = Math.floor((parseInt(storedEndTime) - now) / 1000);
            if (remaining <= 0) {
                setTimeLeft(0);
                setIsExpired(true);
                setPrice('$97');
            } else {
                setTimeLeft(remaining);
            }
        } else {
            const endTime = now + 15 * 60 * 1000;
            localStorage.setItem('oto_timer_end', endTime.toString());
        }
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            setPrice('$97');
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className={`bg-slate-900 border-2 border-orange-500 rounded-2xl p-6 shadow-xl shadow-orange-500/10 relative overflow-hidden ${className || ''}`}>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                         <h3 className="text-xl font-bold text-white">{headline}</h3>
                         <p className="text-slate-400 text-sm mt-1">{subhead}</p>
                    </div>
                    <div className={`text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-2 ${isExpired ? 'bg-slate-600' : 'bg-orange-500 animate-pulse'}`}>
                        {isExpired ? 'Offer Expired' : (
                            <>
                                <span>Offer Ends In:</span>
                                <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="my-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <ul className="space-y-3">
                        {ROI_PROTOCOL_PRODUCT.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                <CheckIcon />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="text-center sm:text-left">
                        <span className="block text-slate-400 text-xs line-through">{ROI_PROTOCOL_PRODUCT.originalPrice}</span>
                        <span className={`text-3xl font-extrabold ${isExpired ? 'text-slate-300' : 'text-white'}`}>{price}</span>
                    </div>
                    <a
                        href={ROI_PROTOCOL_PRODUCT.stripeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full sm:w-auto flex-1 font-bold py-3 px-6 rounded-lg text-center transition-all transform shadow-lg ${isExpired ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:scale-105'}`}
                    >
                        {isExpired ? 'Missed Offer' : 'Download the Protocol'}
                    </a>
                </div>

                <p className="text-center text-xs text-slate-500 mt-4">
                    "{contextQuote}"
                </p>
            </div>
        </div>
    );
};
