import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Phone, ArrowRight, ShieldCheck, UserCheck, Briefcase, Volume2 } from 'lucide-react';

export default function OnboardingModal({ isOpen, onClose }) {
  const { language, setLanguage, role, setRole, setAuth, speakText, t } = useApp();
  const [step, setStep] = useState(1); // 1: Language, 2: Role, 3: Phone/OTP
  const [phone, setPhone] = useState('9822188921');
  const [otp, setOtp] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  const handleFinishLogin = (isGuest = false) => {
    setAuth({
      isLoggedIn: true,
      isGuest,
      phone: isGuest ? '' : phone,
      name: role === 'worker' ? 'Ramesh Shinde' : 'Sunita Joshi'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-2 border-amber-500 shadow-2xl p-5 overflow-y-auto max-h-[90vh]">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-full bg-[#B45309] text-white flex items-center justify-center text-xs font-bold">
              {step}
            </span>
            <span className="text-xs font-bold text-slate-700">
              {step === 1 ? 'पायरी 1/3: भाषा' : step === 2 ? 'पायरी 2/3: तुमची भूमिका' : 'पायरी 3/3: मोबाईल प्रवेश'}
            </span>
          </div>

          <button
            onClick={() => handleFinishLogin(true)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
          >
            {language === 'mr' ? 'वगळा (Skip)' : 'Skip / Guest'}
          </button>
        </div>

        {/* STEP 1: Language Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                आपली भाषा निवडा
              </h2>
              <p className="text-xs text-slate-600">
                अपनी पसंदीदा भाषा चुनें / Choose your language
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {/* Marathi */}
              <button
                onClick={() => {
                  setLanguage('mr');
                  speakText('मराठी भाषा निवडली');
                }}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all touch-target ${
                  language === 'mr'
                    ? 'border-[#B45309] bg-amber-50 shadow-md text-slate-950 font-black'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-left">
                  <div className="text-lg font-bold">मराठी</div>
                  <div className="text-xs text-slate-500">महाराष्ट्रातील नाका कामगारांसाठी</div>
                </div>
                {language === 'mr' && <Check className="w-6 h-6 text-[#B45309]" />}
              </button>

              {/* Hindi */}
              <button
                onClick={() => {
                  setLanguage('hi');
                  speakText('हिंदी भाषा चुनी गई');
                }}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all touch-target ${
                  language === 'hi'
                    ? 'border-[#B45309] bg-amber-50 shadow-md text-slate-950 font-black'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-left">
                  <div className="text-lg font-bold">हिंदी</div>
                  <div className="text-xs text-slate-500">सरल हिंदी में काम और अधिकार</div>
                </div>
                {language === 'hi' && <Check className="w-6 h-6 text-[#B45309]" />}
              </button>

              {/* English */}
              <button
                onClick={() => {
                  setLanguage('en');
                  speakText('English selected');
                }}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all touch-target ${
                  language === 'en'
                    ? 'border-[#B45309] bg-amber-50 shadow-md text-slate-950 font-black'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-left">
                  <div className="text-lg font-bold">English</div>
                  <div className="text-xs text-slate-500">Simple English for all users</div>
                </div>
                {language === 'en' && <Check className="w-6 h-6 text-[#B45309]" />}
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 py-3.5 px-4 bg-[#B45309] hover:bg-[#92400E] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
            >
              <span>{language === 'mr' ? 'पुढे चला' : language === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: Role Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                {language === 'mr' ? 'तुम्हाला काय करायचे आहे?' : language === 'hi' ? 'आप क्या करना चाहते हैं?' : 'What do you want to do?'}
              </h2>
              <p className="text-xs text-slate-600">
                {language === 'mr' ? 'कामासाठी किंवा कारागीर शोधण्यासाठी निवडा' : 'Choose to work or to hire'}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Option A: Worker */}
              <button
                onClick={() => {
                  setRole('worker');
                }}
                className={`w-full p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all touch-target ${
                  role === 'worker'
                    ? 'border-[#B45309] bg-amber-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="p-3 bg-amber-200/60 rounded-2xl text-2xl">👷</div>
                <div className="text-left flex-1">
                  <div className="text-base font-black text-slate-950 flex items-center justify-between">
                    <span>{t('iWantWork')}</span>
                    {role === 'worker' && <Check className="w-5 h-5 text-[#B45309]" />}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === 'mr'
                      ? 'प्लंबर, सुतार, इलेक्ट्रिशियन, पेंटर, हेल्पर, गवंडी'
                      : language === 'hi'
                      ? 'प्लंबर, बढ़ई, इलेक्ट्रीशियन, पेंटर, मजदूर, राजमिस्त्री'
                      : 'Plumber, carpenter, electrician, painter, helper, mason'}
                  </p>
                </div>
              </button>

              {/* Option B: Employer */}
              <button
                onClick={() => {
                  setRole('employer');
                }}
                className={`w-full p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all touch-target ${
                  role === 'employer'
                    ? 'border-[#B45309] bg-amber-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="p-3 bg-blue-100 rounded-2xl text-2xl">🏢</div>
                <div className="text-left flex-1">
                  <div className="text-base font-black text-slate-950 flex items-center justify-between">
                    <span>{t('iWantToHire')}</span>
                    {role === 'employer' && <Check className="w-5 h-5 text-[#B45309]" />}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === 'mr'
                      ? 'घरमालक, दुकानदार किंवा कंत्राटदार - काम द्या'
                      : language === 'hi'
                      ? 'घरमालिक, दुकानदार या ठेकेदार - काम दें'
                      : 'Homeowner, shopkeeper, or contractor - hire trusted hands'}
                  </p>
                </div>
              </button>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 border border-slate-300 rounded-2xl text-xs font-bold text-slate-700 bg-white touch-target"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-4 bg-[#B45309] hover:bg-[#92400E] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
              >
                <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Phone Number + Simulated OTP */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                {t('loginWithPhone')}
              </h2>
              <p className="text-xs text-slate-600">
                {language === 'mr'
                  ? 'ईमेलची गरज नाही. फक्त फोन नंबर पुरेसा आहे.'
                  : 'No email required. Fast phone login.'}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('enterPhoneNumber')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    placeholder="98221 XXXXX"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-300 rounded-2xl font-bold text-base text-slate-900 focus:border-[#B45309] focus:outline-none"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-md touch-target active:scale-95 transition-transform"
                >
                  {language === 'mr' ? 'ओटीपी कोड पाठवा' : language === 'hi' ? 'ओटीपी भेजें' : 'Send OTP'}
                </button>
              ) : (
                <div className="space-y-2.5 bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>{language === 'mr' ? '4 अंकी कोड टाका' : 'Enter 4-Digit OTP'}</span>
                    <span className="text-[#B45309] text-[11px] font-semibold">
                      {t('otpSimulatedNote')}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    className="w-full text-center py-3 bg-white border-2 border-[#B45309] rounded-xl font-black text-2xl tracking-[0.5em] text-slate-900"
                  />

                  <button
                    type="button"
                    onClick={() => handleFinishLogin(false)}
                    className="w-full py-3.5 bg-[#B45309] hover:bg-[#92400E] text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>{t('verifyOtp')}</span>
                  </button>
                </div>
              )}

              {/* Guest Login Fallback */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => handleFinishLogin(true)}
                  className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold text-xs rounded-2xl touch-target"
                >
                  {t('guestContinue')}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
