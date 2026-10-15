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
  Minus
} from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-2 border-[#B45309] shadow-2xl p-5 overflow-y-auto max-h-[92vh] space-y-4">
        
        {/* Header with Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#B45309] text-white flex items-center justify-center text-xs font-black">
              {step}/4
            </span>
            <h2 className="font-black text-slate-900 text-sm">
              {step === 1 && (language === 'mr' ? 'पायरी 1: व्यवसाय निवडा' : 'Step 1: Select Trade')}
              {step === 2 && (language === 'mr' ? 'पायरी 2: वेळ व तारीख' : 'Step 2: Hours & Date')}
              {step === 3 && (language === 'mr' ? 'पायरी 3: मजुरी दर ठरवा' : 'Step 3: Set Pay Offer')}
              {step === 4 && (language === 'mr' ? 'पायरी 4: अटी व पुष्टी' : 'Step 4: Terms & Post')}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Select Trade */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 font-medium">
              {language === 'mr' ? 'तुम्हाला कोणत्या कामासाठी कारागीर हवा आहे?' : 'What kind of work do you need done?'}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: 'plumber', label: language === 'mr' ? 'प्लंबर' : 'Plumber', icon: '🔧' },
                { id: 'electrician', label: language === 'mr' ? 'इलेक्ट्रिशियन' : 'Electrician', icon: '⚡' },
                { id: 'carpenter', label: language === 'mr' ? 'सुतार' : 'Carpenter', icon: '🪚' },
                { id: 'painter', label: language === 'mr' ? 'पेंटर' : 'Painter', icon: '🎨' },
                { id: 'mason', label: language === 'mr' ? 'गवंडी' : 'Mason', icon: '🧱' },
                { id: 'helper', label: language === 'mr' ? 'मदतनीस (हेल्पर)' : 'Helper', icon: '👷' },
                { id: 'sweeper', label: language === 'mr' ? 'सफाई कामगार' : 'Cleaner', icon: '🧹' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleTradeSelect(item.id)}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 text-left transition-all touch-target active:scale-95 ${
                    trade === item.id
                      ? 'border-[#B45309] bg-amber-50 shadow-sm font-black text-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-semibold'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-3 py-3.5 bg-[#B45309] text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95"
            >
              <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: Hours & Date */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === 'mr' ? 'कामाची तारीख:' : 'Start Date:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStartDate('Today')}
                  className={`py-3 rounded-xl border-2 font-bold text-xs touch-target ${
                    startDate === 'Today'
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  ⚡ {language === 'mr' ? 'आजपासूनच (तातडीचे)' : 'Today'}
                </button>
                <button
                  onClick={() => setStartDate('Tomorrow')}
                  className={`py-3 rounded-xl border-2 font-bold text-xs touch-target ${
                    startDate === 'Tomorrow'
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  🗓️ {language === 'mr' ? 'उद्यापासून' : 'Tomorrow'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === 'mr' ? 'कामाचे दिवस (कालावधी):' : 'Duration (Days):'}
              </label>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                <button
                  onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                  className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-800 touch-target"
                >
                  -
                </button>
                <span className="font-black text-slate-900 text-sm">
                  {durationDays} {language === 'mr' ? 'दिवस' : 'day(s)'}
                </span>
                <button
                  onClick={() => setDurationDays(durationDays + 1)}
                  className="w-10 h-10 bg-white border border-slate-300 rounded-lg font-black text-slate-800 touch-target"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === 'mr' ? 'कामाची वेळ:' : 'Working Hours:'}
              </label>
              <select
                value={hoursText}
                onChange={(e) => setHoursText(e.target.value)}
                className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-xs text-slate-900"
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
                className="py-3 px-4 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 bg-[#B45309] text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-2 touch-target"
              >
                <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Set Pay Offer */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-900">
                {language === 'mr' ? 'खोपोली नाका सरासरी दर:' : 'Khopoli Naka Median:'}
              </span>
              <span className="font-black text-[#B45309] text-sm">
                ₹{benchmark} / {language === 'mr' ? 'दिवस' : 'day'}
              </span>
            </div>

            <div className="space-y-2 text-center">
              <label className="block text-xs font-bold text-slate-700">
                {language === 'mr' ? 'तुमचा प्रस्तावित रोज (मजुरी):' : 'Your Daily Wage Offer:'}
              </label>

              <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-200 p-3.5 rounded-2xl">
                <button
                  onClick={() => handleNudgePay(-50)}
                  className="w-12 h-12 bg-white border-2 border-slate-300 rounded-xl font-black text-xl text-slate-800 shadow-sm touch-target"
                >
                  <Minus className="w-5 h-5 mx-auto" />
                </button>

                <div>
                  <div className="text-3xl font-black text-[#B45309]">
                    ₹{payOffer}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500">
                    /{language === 'mr' ? 'दिवस' : 'day'}
                  </div>
                </div>

                <button
                  onClick={() => handleNudgePay(50)}
                  className="w-12 h-12 bg-white border-2 border-slate-300 rounded-xl font-black text-xl text-slate-800 shadow-sm touch-target"
                >
                  <Plus className="w-5 h-5 mx-auto" />
                </button>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                {language === 'mr'
                  ? 'योग्य दर दिल्यास अनुभवी व कुशल कारागीर लवकर काम स्वीकारतात.'
                  : 'Fair wages attract verified and experienced craftsmen quickly.'}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-4 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 bg-[#B45309] text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-2 touch-target"
              >
                <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Terms & Post Confirmation */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'mr' ? 'कामाचे ठिकाण (पत्ता):' : 'Worksite Address:'}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-xs text-slate-900"
              />
            </div>

            {/* Payment Terms Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === 'mr' ? 'पैसे देण्याची पद्धत:' : 'Payment Mode:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMode('cash_end_of_day')}
                  className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left touch-target ${
                    paymentMode === 'cash_end_of_day'
                      ? 'border-[#B45309] bg-amber-50 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  💵 {language === 'mr' ? 'संध्याकाळी रोख (Cash)' : 'Cash Evening'}
                </button>
                <button
                  onClick={() => setPaymentMode('upi_spot')}
                  className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left touch-target ${
                    paymentMode === 'upi_spot'
                      ? 'border-[#B45309] bg-amber-50 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  📱 {language === 'mr' ? 'जागेवर ऑनलाइन UPI' : 'Instant UPI'}
                </button>
              </div>
            </div>

            {/* Checkboxes: Food & Tools */}
            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFoodProvided}
                  onChange={(e) => setIsFoodProvided(e.target.checked)}
                  className="w-4 h-4 text-[#B45309] rounded"
                />
                <span className="text-xs font-semibold text-slate-800">
                  ☕ {language === 'mr' ? 'कामाच्या ठिकाणी चहा व जेवणाची सोय असेल' : 'Tea & Drinking water provided'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={toolsProvided}
                  onChange={(e) => setToolsProvided(e.target.checked)}
                  className="w-4 h-4 text-[#B45309] rounded"
                />
                <span className="text-xs font-semibold text-slate-800">
                  🧰 {language === 'mr' ? 'सर्व अवजारे मी देणार (कामगाराने आणण्याची गरज नाही)' : 'Tools will be provided by employer'}
                </span>
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(3)}
                className="py-3 px-4 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={handleSubmitJob}
                className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{language === 'mr' ? 'नाक्यावर काम प्रसिद्ध करा' : 'Publish Job to Naka'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
