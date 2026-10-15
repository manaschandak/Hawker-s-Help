import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, Globe, Volume2 } from 'lucide-react';

export default function LanguageSelect() {
  const { language, setLanguage, t, speakText } = useApp();
  const navigate = useNavigate();

  const languages = [
    {
      code: 'mr',
      name: 'मराठी',
      englishName: 'Marathi',
      tagline: 'महाराष्ट्र नाका कामगार व मालकांसाठी प्राधान्य',
      sampleGreeting: 'नमस्कार! नाका ॲपमध्ये आपले स्वागत आहे.'
    },
    {
      code: 'hi',
      name: 'हिन्दी',
      englishName: 'Hindi',
      tagline: 'दैनिक मजदूर और नियोक्ताओं के लिए सरल इंटरफ़ेस',
      sampleGreeting: 'नमस्ते! नाका में आपका स्वागत है।'
    },
    {
      code: 'en',
      name: 'English',
      englishName: 'English',
      tagline: 'Standard interface for contractors & urban employers',
      sampleGreeting: 'Welcome to NAKA. Work finds you.'
    }
  ];

  const handleSelect = (code) => {
    setLanguage(code);
    const chosen = languages.find(l => l.code === code);
    if (chosen) {
      speakText(chosen.sampleGreeting);
    }
  };

  const handleProceed = () => {
    navigate('/onboarding/role');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-[#FAF8F5]">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200/90 space-y-6">
        
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto text-3xl shadow-sm">
            🔨
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('onboardingTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {t('onboardingSub')}
          </p>
        </div>

        {/* Language Cards */}
        <div className="space-y-3">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between group touch-target ${
                  isSelected
                    ? 'border-[#B45309] bg-amber-50/70 shadow-md ring-2 ring-amber-200'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors ${
                      isSelected ? 'bg-[#B45309] text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-900">
                        {lang.name}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        ({lang.englishName})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {lang.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(lang.sampleGreeting);
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#B45309] hover:bg-white"
                    title="Listen pronunciation"
                  >
                    <Volume2 size={18} />
                  </button>
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-[#B45309]" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="pt-2">
          <button
            onClick={handleProceed}
            className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-[#B45309] hover:bg-[#92400E] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 touch-target"
          >
            <span>{t('continueBtn')}</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Helper Note */}
        <p className="text-[11px] text-center text-slate-400 font-medium">
          You can change the language anytime from the menu top bar.
        </p>

      </div>
    </div>
  );
}
