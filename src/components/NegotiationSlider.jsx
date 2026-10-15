import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, ArrowRightLeft, Sparkles, Plus, Minus } from 'lucide-react';

export default function NegotiationSlider({ job, onAcceptAgreedPay }) {
  const { workerProfile, language, AREA_BENCHMARKS, t } = useApp();

  // Benchmark for this trade
  const benchmark = AREA_BENCHMARKS[job.trade]?.rate || 700;

  // Initial state: Employer offer vs Worker's base ask
  const initialEmployerOffer = job.payOffer;
  const initialWorkerAsk = Math.max(job.payOffer, workerProfile.baseWageAsk || 700);

  const [employerOffer, setEmployerOffer] = useState(initialEmployerOffer);
  const [workerAsk, setWorkerAsk] = useState(initialWorkerAsk);
  const [negotiationLog, setNegotiationLog] = useState([
    {
      by: 'employer',
      amount: initialEmployerOffer,
      text: language === 'mr' ? `मालकाचा सुरुवातीचा प्रस्ताव: ₹${initialEmployerOffer}` : `Employer initial offer: ₹${initialEmployerOffer}`
    }
  ]);

  const gap = workerAsk - employerOffer;
  const isMatched = gap <= 0;
  const agreedPay = isMatched ? employerOffer : null;
  const midpoint = Math.round((workerAsk + employerOffer) / 2 / 50) * 50;

  // Worker nudges their ask
  const handleNudgeAsk = (delta) => {
    const nextAsk = Math.max(300, Math.min(2500, workerAsk + delta));
    setWorkerAsk(nextAsk);
  };

  // 1-Tap Split the Difference
  const handleSplitDifference = () => {
    setWorkerAsk(midpoint);
    setEmployerOffer(midpoint);
    setNegotiationLog(prev => [
      ...prev,
      {
        by: 'system',
        amount: midpoint,
        text: language === 'mr' ? `मध्यम मार्ग मान्य केला: ₹${midpoint}` : `Difference split at ₹${midpoint}`
      }
    ]);
  };

  // Send Counter Offer
  const handleSendCounter = () => {
    setNegotiationLog(prev => [
      ...prev,
      {
        by: 'worker',
        amount: workerAsk,
        text: language === 'mr' ? `तुम्ही नवीन दर सुचवला: ₹${workerAsk}` : `You proposed counter ask: ₹${workerAsk}`
      }
    ]);
  };

  // Quick accept at employer's offer
  const handleAcceptEmployerView = () => {
    setWorkerAsk(employerOffer);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-4">
      {/* Title & Help */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 text-[#B45309] rounded-xl font-bold">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              {t('startNegotiation')}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'mr' ? 'दोन्ही बाजूंचे दर स्पष्ट दिसतात' : 'Transparent wage agreement'}
            </p>
          </div>
        </div>

        {/* Naka Benchmark Badge */}
        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
            {language === 'mr' ? 'नाका सरासरी' : 'Naka Median'}
          </div>
          <div className="text-xs font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            ₹{benchmark} / {language === 'mr' ? 'दिवस' : 'day'}
          </div>
        </div>
      </div>

      {/* Visual Comparison Bar */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs font-black">
          {/* Employer Marker */}
          <div className="text-left">
            <div className="text-[11px] font-bold text-slate-500">
              {t('employerOffer')}
            </div>
            <div className="text-base font-black text-slate-900">
              ₹{employerOffer}
            </div>
          </div>

          {/* Status Badge in Center */}
          <div>
            {isMatched ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-black rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'दर पक्का झाला!' : 'Match!'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-[#B45309] text-[11px] font-bold rounded-full border border-amber-300">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? `तफावत: ₹${gap}` : `Gap: ₹${gap}`}</span>
              </span>
            )}
          </div>

          {/* Worker Ask Marker */}
          <div className="text-right">
            <div className="text-[11px] font-bold text-slate-500">
              {t('workerAsk')}
            </div>
            <div className="text-base font-black text-[#B45309]">
              ₹{workerAsk}
            </div>
          </div>
        </div>

        {/* Interactive Bar */}
        <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden flex">
          <div
            className={`h-full transition-all duration-300 ${
              isMatched ? 'bg-emerald-600 w-full' : 'bg-amber-500'
            }`}
            style={{ width: isMatched ? '100%' : `${Math.min(90, Math.max(10, (employerOffer / workerAsk) * 100))}%` }}
          />
        </div>
      </div>

      {/* Nudge Stepper Buttons for Worker */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>{language === 'mr' ? 'तुमची मागणी बदला (₹50 ने कमी-जास्त करा):' : 'Adjust your ask (by ₹50):'}</span>
          <span className="text-[#B45309] font-black">₹{workerAsk}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNudgeAsk(-50)}
            className="flex-1 py-2.5 px-3 bg-white border-2 border-slate-300 rounded-xl font-black text-slate-800 flex items-center justify-center gap-1 active:scale-95 touch-target"
            aria-label="Decrease wage ask by 50"
          >
            <Minus className="w-4 h-4 text-slate-600" />
            <span>- ₹50</span>
          </button>

          <button
            onClick={() => handleNudgeAsk(50)}
            className="flex-1 py-2.5 px-3 bg-white border-2 border-slate-300 rounded-xl font-black text-slate-800 flex items-center justify-center gap-1 active:scale-95 touch-target"
            aria-label="Increase wage ask by 50"
          >
            <Plus className="w-4 h-4 text-slate-600" />
            <span>+ ₹50</span>
          </button>
        </div>
      </div>

      {/* Action Shortcuts */}
      {!isMatched && (
        <div className="space-y-2">
          {/* Shortcut 1: Split Difference */}
          <button
            onClick={handleSplitDifference}
            className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 touch-target active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            <span>
              {language === 'mr'
                ? `दोघांच्या मध्यभागी मान्य करा: ₹${midpoint} / दिवस`
                : `Split Difference at ₹${midpoint} / day`}
            </span>
          </button>

          {/* Shortcut 2: Match employer's offer directly */}
          <button
            onClick={handleAcceptEmployerView}
            className="w-full py-2 px-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs touch-target"
          >
            {language === 'mr'
              ? `मालकाचा दर ₹${employerOffer} मान्य करा`
              : `Accept employer offer of ₹${employerOffer}`}
          </button>
        </div>
      )}

      {/* Ready to Commit Action */}
      {isMatched && (
        <div className="pt-1">
          <button
            onClick={() => onAcceptAgreedPay(workerAsk)}
            className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform text-sm"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {language === 'mr'
                ? `₹${workerAsk} दराने काम पक्के करा`
                : `Commit & Accept at ₹${workerAsk} / day`}
            </span>
          </button>
        </div>
      )}

      {/* Negotiation History Log */}
      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
        <div className="font-bold text-slate-700 text-xs">
          {language === 'mr' ? 'बोलणीचा इतिहास:' : 'Negotiation trail:'}
        </div>
        {negotiationLog.map((log, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>{log.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
