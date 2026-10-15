import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Phone, ArrowRight, ShieldCheck, UserCheck, Briefcase, Volume2 } from 'lucide-react';
import { TradeCharacter, EmployerCharacter, StateCharacter } from './Characters';

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
    <div className="fixed inset-0 z-50 bg-[#0A0A0A]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-[32px] sm:rounded-[32px] border-2 border-[#0A0A0A] shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-4">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#0A0A0A] text-[#FDE047] flex items-center justify-center text-xs font-black">
              {step}
            </span>
            <span className="text-xs font-black text-[#0A0A0A]">
              {step === 1 ? 'पायरी 1/3: भाषा' : step === 2 ? 'पायरी 2/3: भूमिका' : 'पायरी 3/3: मोबाईल प्रवेश'}
            </span>
          </div>

          <button
            onClick={() => handleFinishLogin(true)}
            className="text-xs font-black text-neutral-600 hover:text-[#0A0A0A] underline"
          >
            {language === 'mr' ? 'वगळा (Skip)' : 'Skip / Guest'}
          </button>
        </div>

        {/* STEP 1: Language Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <StateCharacter state="waving" className="w-16 h-16 mx-auto" />
              <h2 className="text-xl font-black text-[#0A0A0A]">
                आपली भाषा निवडा
              </h2>
              <p className="text-xs text-neutral-600 font-bold">
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
                className={`w-full p-4 rounded-[24px] border-2 flex items-center justify-between transition-all touch-target ${
                  language === 'mr'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] shadow-xs text-[#0A0A0A] font-black'
                    : 'border-neutral-200 bg-white hover:border-[#0A0A0A]'
                }`}
              >
                <div className="text-left">
                  <div className="text-lg font-black text-[#0A0A0A]">मराठी</div>
                  <div className="text-xs text-neutral-600 font-medium">महाराष्ट्रातील नाका कामगारांसाठी</div>
                </div>
                {language === 'mr' && <Check className="w-6 h-6 text-[#0A0A0A] stroke-[3]" />}
              </button>

              {/* Hindi */}
              <button
                onClick={() => {
                  setLanguage('hi');
                  speakText('हिंदी भाषा चुनी गई');
                }}
                className={`w-full p-4 rounded-[24px] border-2 flex items-center justify-between transition-all touch-target ${
                  language === 'hi'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] shadow-xs text-[#0A0A0A] font-black'
                    : 'border-neutral-200 bg-white hover:border-[#0A0A0A]'
                }`}
              >
                <div className="text-left">
                  <div className="text-lg font-black text-[#0A0A0A]">हिंदी</div>
                  <div className="text-xs text-neutral-600 font-medium">सरल हिंदी में काम और अधिकार</div>
                </div>
                {language === 'hi' && <Check className="w-6 h-6 text-[#0A0A0A] stroke-[3]" />}
              </button>

              {/* English */}
              <button
                onClick={() => {
                  setLanguage('en');
                  speakText('English selected');
                }}
                className={`w-full p-4 rounded-[24px] border-2 flex items-center justify-between transition-all touch-target ${
                  language === 'en'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] shadow-xs text-[#0A0A0A] font-black'
                    : 'border-neutral-200 bg-white hover:border-[#0A0A0A]'
                }`}
              >
                <div className="text-left">
                  <div className="text-lg font-black text-[#0A0A0A]">English</div>
                  <div className="text-xs text-neutral-600 font-medium">Simple English for all users</div>
                </div>
                {language === 'en' && <Check className="w-6 h-6 text-[#0A0A0A] stroke-[3]" />}
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 min-h-[56px] px-6 bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full shadow-lg border-2 border-[#0A0A0A] flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
            >
              <span>{language === 'mr' ? 'पुढे चला' : language === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* STEP 2: Role Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-[#0A0A0A]">
                {language === 'mr' ? 'तुम्हाला काय करायचे आहे?' : language === 'hi' ? 'आप क्या करना चाहते हैं?' : 'What do you want to do?'}
              </h2>
              <p className="text-xs text-neutral-600 font-bold">
                {language === 'mr' ? 'कामासाठी किंवा कारागीर शोधण्यासाठी निवडा' : 'Choose to work or to hire'}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Option A: Worker */}
              <button
                onClick={() => {
                  setRole('worker');
                }}
                className={`w-full p-4 rounded-[28px] border-2 flex items-start gap-3.5 transition-all touch-target ${
                  role === 'worker'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-[#0A0A0A]'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#0A0A0A] flex items-center justify-center shrink-0">
                  <TradeCharacter trade="helper" className="w-12 h-12" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-base font-black text-[#0A0A0A] flex items-center justify-between">
                    <span>{t('iWantWork')}</span>
                    {role === 'worker' && <Check className="w-5 h-5 text-[#0A0A0A] stroke-[3]" />}
                  </div>
                  <p className="text-xs text-neutral-700 font-medium mt-1">
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
                className={`w-full p-4 rounded-[28px] border-2 flex items-start gap-3.5 transition-all touch-target ${
                  role === 'employer'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-[#0A0A0A]'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#0A0A0A] flex items-center justify-center shrink-0">
                  <EmployerCharacter className="w-12 h-12" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-base font-black text-[#0A0A0A] flex items-center justify-between">
                    <span>{t('iWantToHire')}</span>
                    {role === 'employer' && <Check className="w-5 h-5 text-[#0A0A0A] stroke-[3]" />}
                  </div>
                  <p className="text-xs text-neutral-700 font-medium mt-1">
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
                className="min-h-[56px] px-5 border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] bg-white hover:bg-neutral-100 touch-target"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 min-h-[56px] px-6 bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full shadow-lg border-2 border-[#0A0A0A] flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
              >
                <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Phone Number + Simulated OTP */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-[#0A0A0A]">
                {t('loginWithPhone')}
              </h2>
              <p className="text-xs text-neutral-600 font-bold">
                {language === 'mr'
                  ? 'ईमेलची गरज नाही. फक्त फोन नंबर पुरेसा आहे.'
                  : 'No email required. Fast phone login.'}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-black text-[#0A0A0A] mb-1.5">
                  {t('enterPhoneNumber')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 font-black text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    placeholder="98221 XXXXX"
                    className="w-full pl-14 pr-4 py-3.5 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-base text-[#0A0A0A] focus:bg-[#FEF08A]/20 focus:outline-none"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="w-full min-h-[56px] bg-[#0A0A0A] hover:bg-neutral-800 text-[#FDE047] font-black rounded-full shadow-md touch-target active:scale-95 transition-transform"
                >
                  {language === 'mr' ? 'ओटीपी कोड पाठवा' : language === 'hi' ? 'ओटीपी भेजें' : 'Send OTP'}
                </button>
              ) : (
                <div className="space-y-3 bg-[#FEF08A]/30 p-4 rounded-[28px] border-2 border-[#0A0A0A]">
                  <div className="flex items-center justify-between text-xs font-black text-[#0A0A0A]">
                    <span>{language === 'mr' ? '4 अंकी कोड टाका' : 'Enter 4-Digit OTP'}</span>
                    <span className="text-[#0A0A0A] text-[11px] font-bold bg-[#FDE047] px-2 py-0.5 rounded-full border border-[#0A0A0A]">
                      {t('otpSimulatedNote')}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    className="w-full text-center py-3 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-2xl tracking-[0.5em] text-[#0A0A0A]"
                  />

                  <button
                    type="button"
                    onClick={() => handleFinishLogin(false)}
                    className="w-full min-h-[56px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full shadow-lg border-2 border-[#0A0A0A] flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
                  >
                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                    <span>{t('verifyOtp')}</span>
                  </button>
                </div>
              )}

              {/* Guest Login Fallback */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => handleFinishLogin(true)}
                  className="w-full min-h-[52px] border-2 border-[#0A0A0A] hover:bg-neutral-100 bg-white text-[#0A0A0A] font-black text-xs rounded-full touch-target"
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
