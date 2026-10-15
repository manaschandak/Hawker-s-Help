import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';

export default function AvailabilityCard() {
  const { workerProfile, toggleAvailability, setFreeFrom, language, t } = useApp();
  const isAvailable = workerProfile.availableStatus === 'available';

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
      {/* Top Toggle Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-3.5 h-3.5 rounded-full ring-4 ${
              isAvailable
                ? 'bg-emerald-600 ring-emerald-100 animate-pulse'
                : 'bg-amber-600 ring-amber-100'
            }`}
          />
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('setAvailability')}
            </div>
            <div className="text-base font-black text-slate-900 flex items-center gap-1.5">
              <span>{isAvailable ? t('available') : t('busy')}</span>
              {isAvailable ? (
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {language === 'mr' ? 'कामे दिसतील' : 'Ready for calls'}
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {language === 'mr' ? 'कामावर आहे' : 'Booked'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Big Switch Button */}
        <button
          onClick={toggleAvailability}
          className={`px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition-all touch-target active:scale-95 ${
            isAvailable
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
          aria-label="Toggle availability"
        >
          {isAvailable ? (language === 'mr' ? 'व्यस्त करा' : 'Mark Busy') : (language === 'mr' ? 'उपलब्ध करा' : 'Mark Free')}
        </button>
      </div>

      {/* Free From Date Selector */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
        <span className="font-semibold text-slate-600 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{language === 'mr' ? 'कधीपासून मोकळा?' : 'Free from:'}</span>
        </span>

        <div className="flex gap-1.5">
          <button
            onClick={() => setFreeFrom('Today')}
            className={`px-2.5 py-1.5 rounded-lg font-bold border transition-colors ${
              workerProfile.freeFrom === 'Today'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {language === 'mr' ? 'आज' : 'Today'}
          </button>

          <button
            onClick={() => setFreeFrom('Tomorrow')}
            className={`px-2.5 py-1.5 rounded-lg font-bold border transition-colors ${
              workerProfile.freeFrom === 'Tomorrow'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {language === 'mr' ? 'उद्या' : 'Tomorrow'}
          </button>

          <button
            onClick={() => setFreeFrom('Next Monday')}
            className={`px-2 py-1.5 rounded-lg font-bold border transition-colors ${
              workerProfile.freeFrom === 'Next Monday'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {language === 'mr' ? 'सोमवार' : 'Mon'}
          </button>
        </div>
      </div>
    </div>
  );
}
