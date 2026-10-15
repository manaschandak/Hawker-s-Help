import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, RefreshCw } from 'lucide-react';

export default function Header({ onOpenOnboarding }) {
  const { language, setLanguage, role, setRole, speakText, t } = useApp();

  const handleSpeakHeader = () => {
    const text = language === 'mr'
      ? 'नाका ॲप. काम तुम्हाला शोधेल. नाक्यावरील उपलब्ध कामे.'
      : language === 'hi'
      ? 'नाका ॲप. काम आपको खोजेगा. नाके पर उपलब्ध काम.'
      : "NAKA. Work finds you. Nearby naka jobs.";
    speakText(text);
  };

  return (
    <header className="sticky top-0 bg-white border-b-2 border-slate-200 px-3.5 py-2.5 flex items-center justify-between z-30 shadow-sm">
      {/* Brand & Audio Speaker */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSpeakHeader}
          className="p-2 rounded-xl bg-amber-50 text-[#B45309] border border-amber-200 hover:bg-amber-100 active:scale-95 transition-transform"
          aria-label="Listen page summary"
          title={t('speakReadAloud')}
        >
          <Volume2 className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-black text-slate-900 text-base leading-tight flex items-center gap-1.5">
            <span>{t('appTitle')}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-[#B45309]">
              {role === 'worker' ? (language === 'mr' ? 'कामगार' : 'Worker') : (language === 'mr' ? 'मालक' : 'Employer')}
            </span>
          </h1>
          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[170px]">
            खोपोली नाका (Khopoli)
          </p>
        </div>
      </div>

      {/* Right Controls: Language & Role Switch */}
      <div className="flex items-center gap-1.5">
        {/* Language Pill */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700">
          <button
            onClick={() => setLanguage('mr')}
            className={`px-1.5 py-1 rounded transition-colors ${
              language === 'mr' ? 'bg-[#B45309] text-white shadow-sm' : 'hover:text-black'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-1.5 py-1 rounded transition-colors ${
              language === 'hi' ? 'bg-[#B45309] text-white shadow-sm' : 'hover:text-black'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-1.5 py-1 rounded transition-colors ${
              language === 'en' ? 'bg-[#B45309] text-white shadow-sm' : 'hover:text-black'
            }`}
          >
            EN
          </button>
        </div>

        {/* Quick Role Switcher Button */}
        <button
          onClick={() => setRole(role === 'worker' ? 'employer' : 'worker')}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 active:scale-95 flex items-center gap-1"
          title="Switch view between Worker and Employer"
        >
          <RefreshCw className="w-3 h-3 text-amber-400" />
          <span>{role === 'worker' ? '👷' : '🏢'}</span>
        </button>
      </div>
    </header>
  );
}
