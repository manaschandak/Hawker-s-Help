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
    <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-4">
      {/* Title & Help */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-[#FDE047] border-2 border-[#0A0A0A] text-[#0A0A0A] rounded-2xl font-black">
            <ArrowRightLeft className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-black text-[#0A0A0A] text-base leading-tight">
              {t('startNegotiation')}
            </h3>
            <p className="text-xs text-neutral-600 font-bold">
              {language === 'mr' ? 'दोन्ही बाजूंचे दर स्पष्ट दिसतात' : 'Transparent wage agreement'}
            </p>
          </div>
        </div>

        {/* Naka Benchmark Badge */}
        <div className="text-right">
          <div className="text-[11px] font-black text-neutral-500 uppercase tracking-wide">
            {language === 'mr' ? 'नाका सरासरी' : 'Naka Median'}
          </div>
          <div className="text-xs font-black text-[#FDE047] bg-[#0A0A0A] px-3 py-1 rounded-full border border-[#0A0A0A]">
            ₹{benchmark} / {language === 'mr' ? 'दिवस' : 'day'}
          </div>
        </div>
      </div>

      {/* Visual Comparison Bar */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between font-black">
          {/* Employer Marker */}
          <div className="text-left">
            <div className="text-xs font-black text-neutral-500">
              {t('employerOffer')}
            </div>
            <div className="text-2xl font-black text-[#0A0A0A]">
              ₹{employerOffer}
            </div>
          </div>

          {/* Status Badge in Center */}
          <div>
            {isMatched ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-black rounded-full border-2 border-[#15803D]">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] stroke-[2.5]" />
                <span>{language === 'mr' ? 'दर पक्का झाला!' : 'Match!'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDE047] text-[#0A0A0A] text-xs font-black rounded-full border-2 border-[#0A0A0A]">
                <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                <span>{language === 'mr' ? `तफावत: ₹${gap}` : `Gap: ₹${gap}`}</span>
              </span>
            )}
          </div>

          {/* Worker Ask Marker */}
          <div className="text-right">
            <div className="text-xs font-black text-neutral-500">
              {t('workerAsk')}
            </div>
            <div className="text-2xl font-black text-[#0A0A0A]">
              ₹{workerAsk}
            </div>
          </div>
        </div>

        {/* Interactive Bar */}
        <div className="relative h-4 bg-neutral-200 rounded-full overflow-hidden flex border border-[#0A0A0A]">
          <div
            className={`h-full transition-all duration-300 ${
              isMatched ? 'bg-[#15803D] w-full' : 'bg-[#FDE047]'
            }`}
            style={{ width: isMatched ? '100%' : `${Math.min(90, Math.max(10, (employerOffer / workerAsk) * 100))}%` }}
          />
        </div>
      </div>

      {/* Nudge Stepper Buttons for Worker */}
      <div className="bg-neutral-100 border-2 border-[#0A0A0A] rounded-[24px] p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-black text-[#0A0A0A]">
          <span>{language === 'mr' ? 'तुमची मागणी बदला (₹50 ने कमी-जास्त करा):' : 'Adjust your ask (by ₹50):'}</span>
          <span className="text-base font-black text-[#0A0A0A]">₹{workerAsk}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNudgeAsk(-50)}
            className="flex-1 min-h-[56px] py-2.5 px-4 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-base text-[#0A0A0A] flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
            aria-label="Decrease wage ask by 50"
          >
            <Minus className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
            <span>- ₹50</span>
          </button>

          <button
            onClick={() => handleNudgeAsk(50)}
            className="flex-1 min-h-[56px] py-2.5 px-4 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-base text-[#0A0A0A] flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
            aria-label="Increase wage ask by 50"
          >
            <Plus className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
            <span>+ ₹50</span>
          </button>
        </div>
      </div>

      {/* Action Shortcuts */}
      {!isMatched && (
        <div className="space-y-2.5">
          {/* Shortcut 1: Split Difference */}
          <button
            onClick={handleSplitDifference}
            className="w-full min-h-[56px] py-3 px-4 bg-[#FDE047] hover:bg-yellow-300 border-2 border-[#0A0A0A] text-[#0A0A0A] font-black rounded-full text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
          >
            <Sparkles className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
            <span>
              {language === 'mr'
                ? `दोघांच्या मध्यभागी मान्य करा: ₹${midpoint} / दिवस`
                : `Split Difference at ₹${midpoint} / day`}
            </span>
          </button>

          {/* Shortcut 2: Match employer's offer directly */}
          <button
            onClick={handleAcceptEmployerView}
            className="w-full min-h-[52px] py-2.5 px-4 bg-white border-2 border-[#0A0A0A] hover:bg-neutral-100 text-[#0A0A0A] font-bold rounded-full text-xs active:scale-95 transition-all"
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
            className="w-full min-h-[56px] py-3.5 px-5 bg-[#15803D] hover:bg-[#166534] text-white font-black rounded-full shadow-lg border-2 border-[#0A0A0A] flex items-center justify-center gap-2 active:scale-95 transition-transform text-base"
          >
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            <span>
              {language === 'mr'
                ? `₹${workerAsk} दराने काम पक्के करा`
                : `Commit & Accept at ₹${workerAsk} / day`}
            </span>
          </button>
        </div>
      )}

      {/* Negotiation History Log */}
      <div className="pt-3 border-t-2 border-neutral-100 text-xs text-neutral-600 space-y-1.5">
        <div className="font-black text-[#0A0A0A] text-xs">
          {language === 'mr' ? 'बोलणीचा इतिहास:' : 'Negotiation trail:'}
        </div>
        {negotiationLog.map((log, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
            <span className="font-medium text-neutral-800">{log.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
