import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Wrench,
  Utensils,
  Plus,
  Minus,
  Zap,
  Banknote,
  Smartphone,
  Coffee
} from 'lucide-react';
import { TradeCharacter } from '../components/Characters';

export default function PostJobModal({ isOpen, onClose }) {
  const { postNewJob, AREA_BENCHMARKS, COMMON_TOOLS, language, t } = useApp();

  const [step, setStep] = useState(1); // 1: Trade, 2: Hours/Date, 3: Wage, 4: Terms & Post

  const [trade, setTrade] = useState('plumber');
  const [location, setLocation] = useState('Khopoli Station Road');
  const [startDate, setStartDate] = useState('Today');
  const [durationDays, setDurationDays] = useState(1);
  const [hoursText, setHoursText] = useState('9:00 AM - 5:00 PM (8 तास)');
  const [payOffer, setPayOffer] = useState(700);
  const [isFoodProvided, setIsFoodProvided] = useState(true);
  const [toolsProvided, setToolsProvided] = useState(false);
  const [paymentMode, setPaymentMode] = useState('cash_end_of_day');

  if (!isOpen) return null;

  const benchmark = AREA_BENCHMARKS[trade]?.rate || 700;

  const handleTradeSelect = (selectedTrade) => {
    setTrade(selectedTrade);
    setPayOffer(AREA_BENCHMARKS[selectedTrade]?.rate || 700);
  };

  const handleNudgePay = (delta) => {
    setPayOffer(prev => Math.max(300, Math.min(3000, prev + delta)));
  };

  const handleSubmitJob = () => {
    postNewJob({
      trade,
      location,
      startDate,
      durationDays,
      hoursText,
      payOffer,
      isFoodProvided,
      toolsNeeded: toolsProvided ? [] : (trade === 'plumber' ? ['pipe_wrench'] : trade === 'electrician' ? ['tester', 'drill'] : ['hammer']),
      paymentTermsMr: paymentMode === 'cash_end_of_day' ? 'दररोज संध्याकाळी रोख मजुरी हातात दिली जाईल' : 'काम पूर्ण होताच तात्काळ UPI द्वारे पेमेंट',
      paymentTermsEn: paymentMode === 'cash_end_of_day' ? 'Cash paid in hand every evening upon completion' : 'Instant UPI transfer upon daily inspection'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] border-2 border-[#0A0A0A] shadow-2xl p-6 overflow-y-auto max-h-[92vh] space-y-4">
        
        {/* Header with Step Indicator */}
        <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#0A0A0A] text-[#FDE047] flex items-center justify-center text-xs font-black">
              {step}/4
            </span>
            <h2 className="font-black text-[#0A0A0A] text-sm">
              {step === 1 && (language === 'mr' ? 'पायरी 1: व्यवसाय निवडा' : 'Step 1: Select Trade')}
              {step === 2 && (language === 'mr' ? 'पायरी 2: वेळ व तारीख' : 'Step 2: Hours & Date')}
              {step === 3 && (language === 'mr' ? 'पायरी 3: मजुरी दर ठरवा' : 'Step 3: Set Pay Offer')}
              {step === 4 && (language === 'mr' ? 'पायरी 4: अटी व पुष्टी' : 'Step 4: Terms & Post')}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: Select Trade */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs text-neutral-600 font-bold">
              {language === 'mr' ? 'तुम्हाला कोणत्या कामासाठी कारागीर हवा आहे?' : 'What kind of work do you need done?'}
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {[
                { id: 'plumber', label: language === 'mr' ? 'प्लंबर' : 'Plumber' },
                { id: 'electrician', label: language === 'mr' ? 'इलेक्ट्रिशियन' : 'Electrician' },
                { id: 'carpenter', label: language === 'mr' ? 'सुतार' : 'Carpenter' },
                { id: 'painter', label: language === 'mr' ? 'पेंटर' : 'Painter' },
                { id: 'mason', label: language === 'mr' ? 'गवंडी' : 'Mason' },
                { id: 'helper', label: language === 'mr' ? 'मदतनीस (हेल्पर)' : 'Helper' },
                { id: 'sweeper', label: language === 'mr' ? 'सफाई कामगार' : 'Cleaner' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleTradeSelect(item.id)}
                  className={`p-3 rounded-[24px] border-2 flex items-center gap-2.5 text-left transition-all touch-target active:scale-95 ${
                    trade === item.id
                      ? 'border-[#0A0A0A] bg-[#FEF08A] shadow-sm font-black text-[#0A0A0A]'
                      : 'border-neutral-200 bg-white hover:border-[#0A0A0A] text-neutral-800 font-bold'
                  }`}
                >
                  <TradeCharacter trade={item.id} className="w-10 h-10 shrink-0" />
                  <span className="text-xs font-black">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 min-h-[56px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95"
            >
              <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* STEP 2: Hours & Date */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-[#0A0A0A] mb-1.5">
                {language === 'mr' ? 'कामाची तारीख:' : 'Start Date:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStartDate('Today')}
                  className={`min-h-[52px] rounded-full border-2 font-black text-xs touch-target flex items-center justify-center gap-1.5 ${
                    startDate === 'Today'
                      ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#FDE047]'
                      : 'border-neutral-300 bg-white text-neutral-800'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{language === 'mr' ? 'आजपासूनच (तातडीचे)' : 'Today'}</span>
                </button>
                <button
                  onClick={() => setStartDate('Tomorrow')}
                  className={`min-h-[52px] rounded-full border-2 font-black text-xs touch-target flex items-center justify-center gap-1.5 ${
                    startDate === 'Tomorrow'
                      ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#FDE047]'
                      : 'border-neutral-300 bg-white text-neutral-800'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'mr' ? 'उद्यापासून' : 'Tomorrow'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#0A0A0A] mb-1.5">
                {language === 'mr' ? 'कामाचे दिवस (कालावधी):' : 'Duration (Days):'}
              </label>
              <div className="flex items-center justify-between bg-neutral-50 border-2 border-neutral-200 p-3 rounded-full">
                <button
                  onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                  className="w-10 h-10 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-[#0A0A0A] touch-target flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-black text-[#0A0A0A] text-sm">
                  {durationDays} {language === 'mr' ? 'दिवस' : 'day(s)'}
                </span>
                <button
                  onClick={() => setDurationDays(durationDays + 1)}
                  className="w-10 h-10 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-[#0A0A0A] touch-target flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#0A0A0A] mb-1.5">
                {language === 'mr' ? 'कामाची वेळ:' : 'Working Hours:'}
              </label>
              <select
                value={hoursText}
                onChange={(e) => setHoursText(e.target.value)}
                className="w-full p-3.5 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-xs text-[#0A0A0A] outline-none"
              >
                <option value="9:00 AM - 5:00 PM (8 तास)">9:00 AM - 5:00 PM (8 तास / सामान्य वेळ)</option>
                <option value="8:30 AM - 4:30 PM (7 तास)">8:30 AM - 4:30 PM (7 तास)</option>
                <option value="10:00 AM - 6:00 PM (8 तास)">10:00 AM - 6:00 PM (8 तास)</option>
                <option value="1:00 PM - 5:00 PM (4 तास)">1:00 PM - 5:00 PM (4 तास / अर्धा दिवस)</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="min-h-[56px] px-6 border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] bg-white hover:bg-neutral-100"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 min-h-[56px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full shadow-lg flex items-center justify-center gap-2 touch-target"
              >
                <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Set Pay Offer */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-[#FEF08A]/40 p-3.5 rounded-[24px] border-2 border-[#0A0A0A] flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-800">
                {language === 'mr' ? 'खोपोली नाका सरासरी दर:' : 'Khopoli Naka Median:'}
              </span>
              <span className="font-black text-[#0A0A0A] text-sm">
                ₹{benchmark} / {language === 'mr' ? 'दिवस' : 'day'}
              </span>
            </div>

            <div className="space-y-2 text-center">
              <label className="block text-xs font-black text-[#0A0A0A]">
                {language === 'mr' ? 'तुमचा प्रस्तावित रोज (मजुरी):' : 'Your Daily Wage Offer:'}
              </label>

              <div className="flex items-center justify-between bg-neutral-50 border-2 border-[#0A0A0A] p-4 rounded-[28px]">
                <button
                  onClick={() => handleNudgePay(-50)}
                  className="w-12 h-12 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-xl text-[#0A0A0A] shadow-sm touch-target flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div>
                  <div className="text-3xl font-black text-[#0A0A0A]">
                    ₹{payOffer}
                  </div>
                  <div className="text-[10px] font-bold text-neutral-600">
                    /{language === 'mr' ? 'दिवस' : 'day'}
                  </div>
                </div>

                <button
                  onClick={() => handleNudgePay(50)}
                  className="w-12 h-12 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-xl text-[#0A0A0A] shadow-sm touch-target flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[11px] text-neutral-600 font-bold italic">
                {language === 'mr'
                  ? 'योग्य दर दिल्यास अनुभवी व कुशल कारागीर लवकर काम स्वीकारतात.'
                  : 'Fair wages attract verified and experienced craftsmen quickly.'}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="min-h-[56px] px-6 border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] bg-white hover:bg-neutral-100"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 min-h-[56px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full shadow-lg flex items-center justify-center gap-2 touch-target"
              >
                <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Terms & Post Confirmation */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-[#0A0A0A] mb-1">
                {language === 'mr' ? 'कामाचे ठिकाण (पत्ता):' : 'Worksite Address:'}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3.5 bg-white border-2 border-[#0A0A0A] rounded-full font-bold text-xs text-[#0A0A0A] outline-none"
              />
            </div>

            {/* Payment Terms Toggle */}
            <div>
              <label className="block text-xs font-black text-[#0A0A0A] mb-1.5">
                {language === 'mr' ? 'पैसे देण्याची पद्धत:' : 'Payment Mode:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMode('cash_end_of_day')}
                  className={`p-3 rounded-[24px] border-2 text-xs font-black text-left touch-target flex items-center gap-1.5 ${
                    paymentMode === 'cash_end_of_day'
                      ? 'border-[#0A0A0A] bg-[#FEF08A] text-[#0A0A0A]'
                      : 'border-neutral-300 bg-white text-neutral-700'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#0A0A0A] shrink-0" />
                  <span>{language === 'mr' ? 'संध्याकाळी रोख (Cash)' : 'Cash Evening'}</span>
                </button>
                <button
                  onClick={() => setPaymentMode('upi_spot')}
                  className={`p-3 rounded-[24px] border-2 text-xs font-black text-left touch-target flex items-center gap-1.5 ${
                    paymentMode === 'upi_spot'
                      ? 'border-[#0A0A0A] bg-[#FEF08A] text-[#0A0A0A]'
                      : 'border-neutral-300 bg-white text-neutral-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#0A0A0A] shrink-0" />
                  <span>{language === 'mr' ? 'जागेवर ऑनलाइन UPI' : 'Instant UPI'}</span>
                </button>
              </div>
            </div>

            {/* Checkboxes: Food & Tools */}
            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2.5 p-3 bg-neutral-50 border-2 border-neutral-200 rounded-[20px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFoodProvided}
                  onChange={(e) => setIsFoodProvided(e.target.checked)}
                  className="w-4 h-4 text-[#0A0A0A] rounded border-[#0A0A0A]"
                />
                <Coffee className="w-4 h-4 text-[#0A0A0A] shrink-0" />
                <span className="text-xs font-bold text-neutral-800">
                  {language === 'mr' ? 'कामाच्या ठिकाणी चहा व जेवणाची सोय असेल' : 'Tea & Drinking water provided'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-neutral-50 border-2 border-neutral-200 rounded-[20px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={toolsProvided}
                  onChange={(e) => setToolsProvided(e.target.checked)}
                  className="w-4 h-4 text-[#0A0A0A] rounded border-[#0A0A0A]"
                />
                <Wrench className="w-4 h-4 text-[#0A0A0A] shrink-0" />
                <span className="text-xs font-bold text-neutral-800">
                  {language === 'mr' ? 'सर्व अवजारे मी देणार (कामगाराने आणण्याची गरज नाही)' : 'Tools will be provided by employer'}
                </span>
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(3)}
                className="min-h-[56px] px-6 border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] bg-white hover:bg-neutral-100"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={handleSubmitJob}
                className="flex-1 min-h-[56px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{language === 'mr' ? 'नाक्यावर काम प्रसिद्ध करा' : 'Publish Job to Naka'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
