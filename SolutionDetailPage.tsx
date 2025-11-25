
import React, { useState } from 'react';
import type { Solution, Review, AgencyReadiness, Page } from '../types';
import { CURATED_STACKS } from '../constants';
import { useAuth } from '../contexts/AuthProvider';
import { supabase } from '../lib/supabase';

// SVG Icons for the new design
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const StarIcon: React.FC<{ filled?: boolean; className?: string; }> = ({ filled = true, className = 'text-amber-400' }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const FavoriteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const CompareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V4M6 20V12"></path></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>;
const IconBase: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-100 text-primary-600 rounded-lg">{children}</div>;
const AboutIcon: React.FC = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg></IconBase>;
const KeyFeaturesIcon: React.FC = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg></IconBase>;
const ValueAddIcon: React.FC = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5 12 2z"/></svg></IconBase>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
const ReviewsIcon: React.FC = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></IconBase>;
const AgencyReadinessIcon: React.FC = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></IconBase>;
const SystemsIcon: React.FC = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></IconBase>;

const StatIconBase: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-500">{children}</div>;
const MarginIcon = () => <StatIconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></StatIconBase>;
const PriceIcon = () => <StatIconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></StatIconBase>;
const TimeIcon = () => <StatIconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></StatIconBase>;
const WhitelabelIcon = () => <StatIconBase><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></StatIconBase>;

interface DetailSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const DetailSection: React.FC<DetailSectionProps> = ({ icon, title, children }) => (
  <div className="flex items-start gap-5">
    {icon}
    <div className="flex-1">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <div className="mt-2 text-slate-600 prose prose-slate max-w-none">{children}</div>
    </div>
  </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-slate-800">{review.title}</h4>
                <p className="text-sm text-slate-500">by <span className="font-semibold">{review.agencyName}</span></p>
            </div>
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}
            </div>
        </div>
        <p className="mt-3 text-sm text-slate-600 italic">"{review.comment}"</p>
         <div className="mt-3 pt-2 border-t border-slate-200 text-right">
            <span className="text-xs font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-md">AGENCY REVIEW</span>
        </div>
    </div>
);


interface SolutionDetailPageProps {
    solution: Solution;
    onBack: () => void;
    onNavigate: (page: Page, context?: any) => void;
    isSelected?: boolean;
    onToggleCompare?: (id: string) => void;
}

const calculatePartnerProgramScore = (solution: Solution) => {
    const readinessScore = Object.values(solution.agencyReadiness).filter(Boolean).length;
    const trustScore = Object.values(solution.vendorTrust).filter(Boolean).length;
    // Total possible points: 4 (readiness) + 3 (trust) = 7
    return ((readinessScore + trustScore) / 7) * 100;
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; valueClassName?: string }> = ({ icon, label, value, valueClassName }) => (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
        {icon}
        <div>
            <dt className="text-xs text-slate-500">{label}</dt>
            <dd className={`font-semibold text-slate-800 ${valueClassName || ''}`}>{value}</dd>
        </div>
    </div>
);

export const SolutionDetailPage: React.FC<SolutionDetailPageProps> = ({ solution, onBack, onNavigate, isSelected, onToggleCompare }) => {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const partnerProgramScore = Math.round(calculatePartnerProgramScore(solution));
    const readinessCriteria = [
        { key: 'hasCustomDomain', label: 'Custom Domain Support' },
        { key: 'canRemoveBranding', label: '100% Branding Removal' },
        { key: 'hasWhiteLabelMobileApp', label: 'White-Label Mobile App' },
        { key: 'hasResellerBilling', label: 'Built-in Reseller Billing' },
        { key: 'hasPublicRoadmap', label: 'Public Feature Roadmap' },
        { key: 'hasSLA', label: 'Service Level Agreement (SLA)' },
        { key: 'hasDataMigration', label: 'Data Migration Options' },
    ];
    
    const getCriterionValue = (key: string) => {
        if (key in solution.agencyReadiness) {
            return solution.agencyReadiness[key as keyof AgencyReadiness];
        }
        if (key in solution.vendorTrust) {
            return solution.vendorTrust[key as keyof Solution['vendorTrust']];
        }
        return false;
    }
    
    const partOfStacks = CURATED_STACKS.filter(stack => stack.solutionIds.includes(solution.id));

    useEffect(() => {
        const checkBookmark = async () => {
            if (user) {
                const { data } = await supabase
                    .from('saved_items')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('item_id', solution.id)
                    .eq('item_type', 'solution')
                    .maybeSingle();
                setIsFavorite(!!data);
            }
        };
        checkBookmark();
    }, [user, solution.id]);

    const handleToggleBookmark = async () => {
        if (!user) {
            alert("Please log in to bookmark.");
            return;
        }
        if (isFavorite) {
            const { error } = await supabase.from('saved_items').delete().eq('user_id', user.id).eq('item_id', solution.id).eq('item_type', 'solution');
            if (!error) setIsFavorite(false);
        } else {
            const { error } = await supabase.from('saved_items').insert({ user_id: user.id, item_id: solution.id, item_type: 'solution' });
            if (!error) setIsFavorite(true);
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => alert("Link copied to clipboard!"));
    };

    return (
        <main className="flex-grow bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 mb-6">
                    <BackArrowIcon /> Back to Search Results
                </button>

                {/* Header */}
                <header className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <img src={solution.logo} alt={`${solution.name} logo`} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1">
                            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{solution.name}</h1>
                            <p className="mt-2 text-lg text-slate-600">{solution.tagline}</p>
                            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(solution.rating)} />)}
                                    <span className="font-semibold text-slate-700 ml-1">{solution.rating.toFixed(1)}</span>
                                    <span>({solution.reviews.length} reviews)</span>
                                </div>
                                <span><span className="font-semibold text-slate-700">{solution.implementations.toLocaleString()}</span> implementations</span>
                                <span className="font-semibold text-slate-700">{solution.primaryCategory} / {solution.subCategory}</span>
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-auto">
                            <a href={solution.companyWebsite} target="_blank" rel="noopener noreferrer" className="w-full inline-block text-center px-6 py-3 border border-transparent bg-primary-600 text-base font-semibold rounded-lg text-white hover:bg-primary-700 transition-colors">
                                Request Demo
                            </a>
                            <div className="mt-3 flex items-center justify-center gap-2">
                                <button onClick={handleToggleBookmark} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium transition-colors ${isFavorite ? 'bg-secondary-100 text-secondary-700 border-secondary-200' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}>
                                    <FavoriteIcon /> {isFavorite ? 'Saved' : 'Save'}
                                </button>
                                {onToggleCompare && (
                                    <button
                                        onClick={() => onToggleCompare(solution.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium transition-colors ${isSelected ? 'bg-primary-50 border-primary-200 text-primary-600' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        <CompareIcon /> {isSelected ? 'Added' : 'Compare'}
                                    </button>
                                )}
                                <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 bg-white text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 transition-colors">
                                    <ShareIcon /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <DetailSection icon={<AboutIcon />} title="About the Solution">
                            <p>{solution.detailedDescription}</p>
                        </DetailSection>
                        
                        <DetailSection icon={<KeyFeaturesIcon />} title="Key Features">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {solution.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0"><CheckCircleIcon /></div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </DetailSection>

                        {solution.valueAddons.length > 0 && (
                            <DetailSection icon={<ValueAddIcon />} title="Differentiation & Value-Adds">
                                <p className="mb-4">These features help you avoid the "clone trap" by offering unique value beyond basic branding, allowing you to compete on value, not just price.</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                    {solution.valueAddons.map(addon => (
                                        <li key={addon} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0"><CheckCircleIcon /></div>
                                            <span className="font-semibold">{addon}</span>
                                        </li>
                                    ))}
                                </ul>
                            </DetailSection>
                        )}
                         
                        <DetailSection icon={<AgencyReadinessIcon />} title="Partner Program Breakdown">
                            <p className="mb-4">This breakdown shows how well this partner is set up to help your agency succeed, covering key areas from branding to support and vendor transparency.</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {readinessCriteria.map(criterion => (
                                    <li key={criterion.key} className="flex items-center gap-3">
                                        {getCriterionValue(criterion.key) ? <CheckCircleIcon /> : <XCircleIcon />}
                                        <span className={getCriterionValue(criterion.key) ? 'text-slate-800' : 'text-slate-500'}>{criterion.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </DetailSection>

                        <DetailSection icon={<ReviewsIcon />} title="Agency Reviews">
                            <div className="space-y-4">
                                {solution.reviews.length > 0 ? (
                                    solution.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                                ) : (
                                    <p className="text-slate-500">No reviews yet. Be the first to share your experience!</p>
                                )}
                            </div>
                        </DetailSection>
                    </div>
                    
                    <aside className="space-y-8">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                             <h3 className="text-lg font-bold text-slate-800 mb-4">Agency Snapshot</h3>
                             <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <StatCard icon={<MarginIcon />} label="Agency Margin" value={`Up to ${solution.agencyMargin}%`} valueClassName="text-emerald-600" />
                                <StatCard icon={<PriceIcon />} label="Starting Price" value={solution.startingPrice} />
                                <StatCard icon={<TimeIcon />} label="Implementation" value={solution.implementationTime} />
                                <StatCard icon={<WhitelabelIcon />} label="White Label Type" value={solution.whitelabelType} />
                             </dl>
                             <div className="pt-4 mt-4 border-t border-slate-200">
                                <dt className="text-sm text-slate-500 mb-1">Partner Program Score</dt>
                                <dd className="flex items-center gap-2">
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 flex-1"><div className="bg-secondary-500 h-2.5 rounded-full" style={{ width: `${partnerProgramScore}%` }}></div></div>
                                    <span className="font-bold text-secondary-600">{partnerProgramScore}%</span>
                                </dd>
                            </div>
                        </div>
                        {partOfStacks.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <DetailSection icon={<SystemsIcon />} title="Part of These Systems">
                                    <div className="space-y-3 mt-2">
                                        {partOfStacks.map(stack => (
                                            <button key={stack.id} onClick={() => onNavigate('systemDetail', { stack })} className="w-full text-left p-3 bg-slate-50 rounded-lg hover:bg-slate-100 hover:ring-1 hover:ring-primary-500">
                                                <p className="font-bold text-slate-800">{stack.name}</p>
                                                <p className="text-xs text-slate-500">{stack.targetNiche}</p>
                                            </button>
                                        ))}
                                    </div>
                                </DetailSection>
                            </div>
                        )}
                        {solution.matchScore && (
                            <div className="bg-primary-50 p-6 rounded-2xl border border-primary-200">
                                <h3 className="text-lg font-bold text-primary-800 mb-2">AI Match Analysis</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-full bg-primary-200 rounded-full h-2.5 flex-1">
                                        <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${solution.matchScore}%` }}></div>
                                    </div>
                                    <span className="text-xl font-bold text-primary-600">{solution.matchScore}%</span>
                                </div>
                                <p className="text-sm text-primary-700">{solution.matchReasoning}</p>
                            </div>
                        )}
                         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Leave a Review</h3>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your review!'); (e.target as HTMLFormElement).reset(); }} className="space-y-3">
                                <div>
                                    <label htmlFor="rating" className="text-sm font-medium text-slate-700">Your Rating</label>
                                    <div className="flex items-center gap-1 mt-1">
                                         {[...Array(5)].map((_, i) => <StarIcon key={i} className="text-slate-300 hover:text-amber-400 cursor-pointer w-6 h-6" />)}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="title" className="text-sm font-medium text-slate-700">Review Title</label>
                                    <input type="text" id="title" required className="mt-1 w-full border border-slate-300 rounded-md py-2 px-3 text-sm" placeholder="e.g., A total game-changer!" />
                                </div>
                                <div>
                                    <label htmlFor="comment" className="text-sm font-medium text-slate-700">Your Comment</label>
                                    <textarea id="comment" rows={3} required className="mt-1 w-full border border-slate-300 rounded-md py-2 px-3 text-sm" placeholder="Share your experience..."></textarea>
                                </div>
                                <button type="submit" className="w-full bg-secondary-600 text-white font-semibold py-2 rounded-lg hover:bg-secondary-700 transition-colors">Submit Review</button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};
