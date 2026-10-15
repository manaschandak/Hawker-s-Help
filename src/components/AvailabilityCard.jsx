import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';

export default function AvailabilityCard() {
  const { workerProfile, toggleAvailability, setFreeFrom, language, t } = useApp();
  const isAvailable = workerProfile.availableStatus === 'available';

  return (
    <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-4">
      {/* Top Toggle Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-4 h-4 rounded-full ring-4 ${
              isAvailable
                ? 'bg-[#15803D] ring-emerald-200 animate-pulse'
                : 'bg-amber-500 ring-amber-200'
            }`}
          />
          <div>
            <div className="text-[12px] font-black text-neutral-500 uppercase tracking-wider">
              {t('setAvailability')}
            </div>
            <div className="text-base font-black text-[#0A0A0A] flex items-center gap-2 mt-0.5">
              <span>{isAvailable ? t('available') : t('busy')}</span>
              {isAvailable ? (
                <span className="text-xs font-black text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border border-[#15803D]">
                  {language === 'mr' ? 'कामे दिसतील' : 'Ready for calls'}
                </span>
              ) : (
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-400">
                  {language === 'mr' ? 'कामावर आहे' : 'Booked'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Big Switch Button: Pill button min 56px */}
        <button
          onClick={toggleAvailability}
          className={`min-h-[56px] px-5 py-2.5 rounded-full font-black text-sm shadow-md transition-all active:scale-95 border-2 border-[#0A0A0A] flex items-center justify-center ${
            isAvailable
              ? 'bg-[#15803D] hover:bg-[#166534] text-white'
              : 'bg-[#0A0A0A] hover:bg-[#171717] text-[#FDE047]'
          }`}
          aria-label="Toggle availability"
        >
          {isAvailable ? (language === 'mr' ? 'व्यस्त करा' : 'Mark Busy') : (language === 'mr' ? 'उपलब्ध करा' : 'Mark Free')}
        </button>
      </div>

      {/* Free From Date Selector */}
      <div className="pt-3 border-t-2 border-neutral-100 flex items-center justify-between gap-2 text-sm">
        <span className="font-bold text-neutral-700 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-neutral-900" />
          <span>{language === 'mr' ? 'कधीपासून मोकळा?' : 'Free from:'}</span>
        </span>

        <div className="flex gap-1.5">
          <button
            onClick={() => setFreeFrom('Today')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full font-black border-2 transition-all active:scale-95 ${
              workerProfile.freeFrom === 'Today'
                ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A] shadow-xs'
                : 'bg-neutral-100 text-[#0A0A0A] border-neutral-300 hover:bg-neutral-200'
            }`}
          >
            {language === 'mr' ? 'आज' : 'Today'}
          </button>

          <button
            onClick={() => setFreeFrom('Tomorrow')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full font-black border-2 transition-all active:scale-95 ${
              workerProfile.freeFrom === 'Tomorrow'
                ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A] shadow-xs'
                : 'bg-neutral-100 text-[#0A0A0A] border-neutral-300 hover:bg-neutral-200'
            }`}
          >
            {language === 'mr' ? 'उद्या' : 'Tomorrow'}
          </button>

          <button
            onClick={() => setFreeFrom('Next Monday')}
            className={`min-h-[44px] px-3 py-1.5 rounded-full font-black border-2 transition-all active:scale-95 ${
              workerProfile.freeFrom === 'Next Monday'
                ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A] shadow-xs'
                : 'bg-neutral-100 text-[#0A0A0A] border-neutral-300 hover:bg-neutral-200'
            }`}
          >
            {language === 'mr' ? 'सोमवार' : 'Mon'}
          </button>
        </div>
      </div>
    </div>
  );
}
