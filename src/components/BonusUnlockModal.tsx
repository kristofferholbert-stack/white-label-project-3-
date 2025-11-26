import React, { useState } from 'react';

interface BonusAsset {
  id: string;
  title: string;
  description: string;
  asset_type: string;
  estimated_value: number;
}

interface LaunchKit {
  id: string;
  title: string;
  description: string;
  total_value: number;
  access_tier: string;
}

interface BonusUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  launchKit: LaunchKit;
  bonusAssets: BonusAsset[];
  affiliateUrl: string;
  onVerifyTrial: (screenshot: string) => void;
  onComplete?: () => void;
}

const GiftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;

export const BonusUnlockModal: React.FC<BonusUnlockModalProps> = ({
  isOpen,
  onClose,
  launchKit,
  bonusAssets,
  affiliateUrl,
  onVerifyTrial,
  onComplete
}) => {
  const [step, setStep] = useState<'preview' | 'verify' | 'unlocked'>('preview');
  const [screenshot, setScreenshot] = useState<string>('');

  if (!isOpen) return null;

  const handleStartTrial = () => {
    window.open(affiliateUrl, '_blank');
    setStep('verify');
  };

  const handleVerify = () => {
    if (screenshot) {
      onVerifyTrial(screenshot);
      setStep('unlocked');
    }
  };

  const requiresVerification = launchKit.access_tier === 'verified_trial';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-orange-500/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {step === 'preview' && (
          <>
            <div className="sticky top-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-b-2 border-orange-500/30 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-orange-400">
                    <GiftIcon />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-orange-400 uppercase tracking-wide">Exclusive Bonus</div>
                    <h3 className="text-2xl font-bold text-white">{launchKit.title}</h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 border border-orange-500/30">
                <div className="text-center">
                  <div className="text-4xl font-black text-white mb-1">
                    ${(launchKit.total_value / 100).toFixed(0)}
                  </div>
                  <div className="text-sm text-orange-400 font-bold uppercase">Total Value</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-slate-300 mb-6">{launchKit.description}</p>

              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">What's Included:</h4>
                {bonusAssets.map(asset => (
                  <div key={asset.id} className="flex items-start gap-3 bg-slate-800 rounded-lg p-4">
                    <div className="mt-1 text-emerald-400">
                      <CheckIcon />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h5 className="font-bold text-white">{asset.title}</h5>
                        <span className="text-xs font-bold text-orange-400 whitespace-nowrap">
                          ${(asset.estimated_value / 100).toFixed(0)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{asset.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {requiresVerification ? (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h5 className="font-bold text-amber-400 mb-1">Quick Verification Required</h5>
                      <p className="text-sm text-slate-300">
                        Start a free trial and upload a screenshot of your trial confirmation to unlock these bonuses instantly.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <button
                onClick={requiresVerification ? handleStartTrial : () => setStep('unlocked')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:brightness-110 transition-all shadow-lg text-lg"
              >
                {requiresVerification ? 'Start Free Trial & Unlock Bonuses' : 'Unlock Bonuses Now'}
              </button>
            </div>
          </>
        )}

        {step === 'verify' && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold text-white mb-2">Quick Verification</h3>
              <p className="text-slate-400">
                Upload a screenshot of your trial confirmation email or dashboard
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <label className="block mb-4">
                <span className="text-sm font-bold text-white mb-2 block">Screenshot URL or Description</span>
                <textarea
                  value={screenshot}
                  onChange={(e) => setScreenshot(e.target.value)}
                  placeholder="Paste image URL or describe your trial confirmation..."
                  className="w-full bg-slate-900 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                />
              </label>
              <div className="text-xs text-slate-500">
                We verify within 2 hours during business hours. Most verifications happen instantly!
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('preview')}
                className="flex-1 bg-slate-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-700 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleVerify}
                disabled={!screenshot}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:brightness-110 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <UploadIcon />
                Verify & Unlock
              </button>
            </div>
          </div>
        )}

        {step === 'unlocked' && (
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-white mb-2">Bonuses Unlocked!</h3>
            <p className="text-lg text-slate-400 mb-6">
              Check your email for download links to all ${(launchKit.total_value / 100).toFixed(0)} worth of assets
            </p>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold">
                <CheckIcon />
                <span>Verification Complete</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (onComplete) onComplete();
                onClose();
              }}
              className="w-full bg-slate-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-700 transition-all"
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
