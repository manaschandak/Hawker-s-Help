import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, RefreshCw, HardHat, Building2 } from 'lucide-react';

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
    <header className="sticky top-0 bg-[#FDE047] border-b-2 border-[#0A0A0A] px-3.5 py-2.5 flex items-center justify-between z-30 shadow-sm">
      {/* Brand & Audio Speaker */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSpeakHeader}
          className="p-2.5 rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-neutral-800 active:scale-95 transition-transform"
          aria-label="Listen page summary"
          title={t('speakReadAloud')}
        >
          <Volume2 className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-black text-[#0A0A0A] text-lg leading-tight flex items-center gap-1.5">
            <span>{t('appTitle')}</span>
            <span className="text-[11px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white">
              {role === 'worker' ? (language === 'mr' ? 'कामगार' : 'Worker') : (language === 'mr' ? 'मालक' : 'Employer')}
            </span>
          </h1>
          <p className="text-xs text-[#0A0A0A]/80 font-bold truncate max-w-[170px]">
            खोपोली नाका (Khopoli)
          </p>
        </div>
      </div>

      {/* Right Controls: Language & Role Switch */}
      <div className="flex items-center gap-1.5">
        {/* Language Pill */}
        <div className="flex bg-[#0A0A0A] p-1 rounded-full text-xs font-black text-white">
          <button
            onClick={() => setLanguage('mr')}
            className={`px-2 py-1 rounded-full transition-colors ${
              language === 'mr' ? 'bg-[#FDE047] text-[#0A0A0A]' : 'text-white hover:text-[#FDE047]'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-2 py-1 rounded-full transition-colors ${
              language === 'hi' ? 'bg-[#FDE047] text-[#0A0A0A]' : 'text-white hover:text-[#FDE047]'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded-full transition-colors ${
              language === 'en' ? 'bg-[#FDE047] text-[#0A0A0A]' : 'text-white hover:text-[#FDE047]'
            }`}
          >
            EN
          </button>
        </div>

        {/* Quick Role Switcher Button */}
        <button
          onClick={() => setRole(role === 'worker' ? 'employer' : 'worker')}
          className="px-3 py-2 rounded-full bg-[#0A0A0A] text-white text-xs font-bold hover:bg-neutral-800 active:scale-95 flex items-center gap-1.5 border border-[#0A0A0A]"
          title="Switch view between Worker and Employer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#FDE047]" />
          <span>
            {role === 'worker' ? (
              <HardHat className="w-4 h-4 text-[#FDE047]" />
            ) : (
              <Building2 className="w-4 h-4 text-[#FDE047]" />
            )}
          </span>
        </button>
      </div>
    </header>
  );
}
