import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Volume2, CheckCircle2, ArrowRight } from 'lucide-react';
import { StateCharacter } from '../../components/Characters';

export default function LanguageSelect() {
  const { language, setLanguage, speakText, t } = useApp();
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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-[#0A0A0A]">
      <div className="w-full max-w-md bg-white rounded-[32px] border-4 border-[#0A0A0A] overflow-hidden shadow-2xl">
        
        {/* Flat Cyber Yellow Hero with Waving Worker Character */}
        <div className="bg-[#FDE047] p-6 text-center text-[#0A0A0A] border-b-3 border-[#0A0A0A]">
          <div className="flex justify-center mb-2">
            <StateCharacter state="waving" className="w-28 h-28 drop-shadow-md" />
          </div>
          <div className="inline-block bg-[#0A0A0A] text-[#FDE047] px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase mb-2">
            NAKA • नाका
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
            {t('onboardingTitle')}
          </h1>
          <p className="text-sm text-neutral-800 font-bold mt-1">
            {t('onboardingSub')}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Language Cards */}
          <div className="space-y-3">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full min-h-[56px] p-4 rounded-[24px] text-left border-2 transition-all flex items-center justify-between active:scale-[0.99] ${
                    isSelected
                      ? 'border-[#0A0A0A] bg-[#FDE047] text-[#0A0A0A] shadow-md ring-2 ring-[#0A0A0A]'
                      : 'border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl border-2 border-[#0A0A0A] flex items-center justify-center text-sm font-black transition-colors ${
                        isSelected ? 'bg-[#0A0A0A] text-[#FDE047]' : 'bg-neutral-100 text-[#0A0A0A]'
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-[#0A0A0A]">
                          {lang.name}
                        </span>
                        <span className="text-xs font-bold text-neutral-600">
                          ({lang.englishName})
                        </span>
                      </div>
                      <p className="text-xs text-neutral-700 font-semibold mt-0.5">
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
                      className="w-10 h-10 rounded-full border border-neutral-300 hover:border-[#0A0A0A] bg-white text-[#0A0A0A] flex items-center justify-center"
                      title="Listen pronunciation"
                      aria-label={`Listen ${lang.name} greeting`}
                    >
                      <Volume2 size={18} className="stroke-[2.5]" />
                    </button>
                    {isSelected ? (
                      <CheckCircle2 className="w-6 h-6 text-[#0A0A0A] stroke-[2.5]" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#0A0A0A]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continue Button: Pill button min 56px */}
          <div className="pt-2">
            <button
              onClick={handleProceed}
              className="w-full min-h-[56px] py-4 px-6 rounded-full font-black text-base text-[#0A0A0A] bg-[#FDE047] hover:bg-yellow-300 border-2 border-[#0A0A0A] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('continueBtn')}</span>
              <ArrowRight size={20} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Helper Note */}
          <p className="text-xs text-center text-neutral-500 font-bold">
            You can change the language anytime from the top bar.
          </p>
        </div>

      </div>
    </div>
  );
}
