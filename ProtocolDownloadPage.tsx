import React, { useState, useMemo } from 'react';
import { CALCULATOR_LOGIC, EMAIL_SCRIPT, NICHE_LIST, VIDEO_SCRIPT } from '../tripwire-content';
import { CopyBlock } from '../components/CopyBlock';

interface ProtocolDownloadPageProps {
  onNavigate?: (page: any) => void;
}

export const ProtocolDownloadPage: React.FC<ProtocolDownloadPageProps> = ({ onNavigate }) => {
  // Calculator State
  const [revenueGoal, setRevenueGoal] = useState(CALCULATOR_LOGIC.inputs[0].default);
  const [retainerPrice, setRetainerPrice] = useState(CALCULATOR_LOGIC.inputs[1].default);
  const [closeRate, setCloseRate] = useState(CALCULATOR_LOGIC.inputs[2].default);
  const [showUpRate, setShowUpRate] = useState(CALCULATOR_LOGIC.inputs[3].default);

  const calculatorResults = useMemo(() => {
    const clientsNeeded = revenueGoal / retainerPrice;
    const dealsClosedPerMonth = clientsNeeded;
    const meetingsNeeded = dealsClosedPerMonth / closeRate;
    // outreach_needed not used in output script but part of logic

    return {
      clientsNeeded,
      meetingsNeeded
    };
  }, [revenueGoal, retainerPrice, closeRate, showUpRate]);

  const handleDownloadCsv = () => {
     const headers = ['Metric', 'Value'];
     const rows = [
         ['Monthly Income Goal', revenueGoal],
         ['Avg. Service Retainer', retainerPrice],
         ['Closing Rate', `${(closeRate * 100).toFixed(1)}%`],
         ['Show Up Rate', `${(showUpRate * 100).toFixed(1)}%`],
         ['Clients Needed', Math.ceil(calculatorResults.clientsNeeded)],
         ['Meetings Needed (Monthly)', Math.ceil(calculatorResults.meetingsNeeded)],
         ['Meetings Needed (Weekly)', Math.ceil(calculatorResults.meetingsNeeded / 4)]
     ];

     const csvContent = "data:text/csv;charset=utf-8,"
         + headers.join(",") + "\n"
         + rows.map(e => e.join(",")).join("\n");

     const encodedUri = encodeURI(csvContent);
     const link = document.createElement("a");
     link.setAttribute("href", encodedUri);
     link.setAttribute("download", "10k_roadmap.csv");
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Agency ROI Protocol</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Welcome to the other side. Below are the exact tools, scripts, and mathematics you need to hit $10k/month.
          </p>
        </div>

        {/* 1. The Calculator */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{CALCULATOR_LOGIC.title}</h2>
          <p className="text-slate-600 mb-8">{CALCULATOR_LOGIC.intro}</p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <label htmlFor={CALCULATOR_LOGIC.inputs[0].id} className="block text-sm font-medium text-slate-700 mb-1">
                  {CALCULATOR_LOGIC.inputs[0].label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                  <input
                    id={CALCULATOR_LOGIC.inputs[0].id}
                    type="number"
                    value={revenueGoal}
                    onChange={(e) => setRevenueGoal(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 bg-amber-50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={CALCULATOR_LOGIC.inputs[1].id} className="block text-sm font-medium text-slate-700 mb-1">
                  {CALCULATOR_LOGIC.inputs[1].label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                  <input
                    id={CALCULATOR_LOGIC.inputs[1].id}
                    type="number"
                    value={retainerPrice}
                    onChange={(e) => setRetainerPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 bg-amber-50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={CALCULATOR_LOGIC.inputs[2].id} className="block text-sm font-medium text-slate-700 mb-1">
                  {CALCULATOR_LOGIC.inputs[2].label} (Decimal: 0.2 = 20%)
                </label>
                <input
                  id={CALCULATOR_LOGIC.inputs[2].id}
                  type="number"
                  step="0.01"
                  max="1"
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor={CALCULATOR_LOGIC.inputs[3].id} className="block text-sm font-medium text-slate-700 mb-1">
                  {CALCULATOR_LOGIC.inputs[3].label} (Decimal: 0.7 = 70%)
                </label>
                <input
                  id={CALCULATOR_LOGIC.inputs[3].id}
                  type="number"
                  step="0.01"
                  max="1"
                  value={showUpRate}
                  onChange={(e) => setShowUpRate(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <button
                onClick={handleDownloadCsv}
                className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Roadmap CSV
              </button>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-xl flex flex-col justify-center">
               <div className="prose prose-invert">
                 <p className="text-lg leading-relaxed whitespace-pre-line">
                   {CALCULATOR_LOGIC.output_script(calculatorResults.clientsNeeded, calculatorResults.meetingsNeeded)}
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* 2. The Email Script */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <div className="mb-8">
             <h2 className="text-2xl font-bold text-slate-900 mb-2">{EMAIL_SCRIPT.title}</h2>
             <p className="text-slate-600">{EMAIL_SCRIPT.strategy}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
               <CopyBlock
                 text={EMAIL_SCRIPT.body}
                 className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm font-mono whitespace-pre-wrap"
               />
            </div>
            <div className="bg-primary-50 p-6 rounded-xl h-fit">
               <h3 className="font-bold text-primary-900 mb-4">Why this works</h3>
               <ul className="space-y-3">
                 {EMAIL_SCRIPT.why_it_works.map((point, idx) => (
                   <li key={idx} className="text-sm text-primary-800 flex items-start">
                     <span className="mr-2">•</span>
                     <span>{point}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </section>

        {/* 3. Niche List */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Top 50 High-Margin Niches</h2>
          <p className="text-slate-600 mb-8">Cure "Analysis Paralysis." We categorize them by Difficulty and Wallet Size.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {NICHE_LIST.map((category, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900">{category.category}</h3>
                  <p className="text-xs text-slate-500 mt-1">{category.description}</p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {category.niches.map((niche, nIdx) => (
                      <span key={nIdx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                        {niche}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Video Masterclass */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
           <h2 className="text-2xl font-bold text-slate-900 mb-2">Video Masterclass: {VIDEO_SCRIPT.title}</h2>
           <p className="text-slate-600 mb-8">Reframing from "Fake" to "Broker."</p>

           <div className="aspect-w-16 aspect-h-9 bg-slate-900 rounded-xl flex items-center justify-center mb-8 min-h-[400px]">
             <div className="text-center p-8">
               <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                 <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                 </svg>
               </div>
               <p className="text-white font-medium">Masterclass Video Placeholder</p>
               <p className="text-slate-400 text-sm mt-2">Video will be embedded here</p>
             </div>
           </div>

           <div className="space-y-4">
              {VIDEO_SCRIPT.outline.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="flex-shrink-0 w-16 text-sm font-mono text-slate-500 pt-1">{item.time}</span>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.content}</p>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* CTA */}
        <div className="text-center pb-12">
           <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to execute?</h2>
           <button
             onClick={() => onNavigate && onNavigate('search')}
             className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
           >
             I have my niche. I have my math. I am ready to build.
             <svg className="ml-2 -mr-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
             </svg>
           </button>
        </div>

      </div>
    </div>
  );
};
