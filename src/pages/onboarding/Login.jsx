import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Phone, ShieldCheck, KeyRound, Loader2 } from 'lucide-react';
import { HelperCharacter, EmployerCharacter } from '../../components/Characters';

export default function Login() {
  const { role, loginUser, loginGuest, t, showToast, language } = useApp();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('9822188921');
  const [otp, setOtp] = useState('1234');
  const [step, setStep] = useState('phone'); // phone | otp
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.trim().length < 10) {
      setErrorMessage(
        language === 'mr' ? 'कृपया १० अंकी मोबाईल नंबर टाका' : 'Please enter a valid 10-digit phone number'
      );
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      showToast(
        language === 'mr' ? 'डेमो ओटीपी पाठवला: १२३४' : 'Demo OTP sent: 1234',
        'info'
      );
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.trim().length !== 4) {
      setErrorMessage(
        language === 'mr' ? '४ अंकी ओटीपी टाका (उदा. १२३४)' : 'Enter 4-digit code (e.g. 1234)'
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(phone, role);
      showToast(
        language === 'mr' ? 'लॉगिन यशस्वी झाले! स्वागत आहे.' : 'Login verified successfully! Welcome.',
        'success'
      );
      if (role === 'employer') {
        navigate('/employer/jobs');
      } else {
        navigate('/jobs');
      }
    }, 600);
  };

  const handleGuestContinue = () => {
    loginGuest(role);
    showToast(
      language === 'mr' ? 'पाहुणे मोडमध्ये सुरू झाले' : 'Continuing as Guest',
      'info'
    );
    if (role === 'employer') {
      navigate('/employer/jobs');
    } else {
      navigate('/jobs');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-[#0A0A0A]">
      <div className="w-full max-w-md bg-white rounded-[32px] border-4 border-[#0A0A0A] overflow-hidden shadow-2xl">
        
        {/* Flat Cyber Yellow Hero */}
        <div className="bg-[#FDE047] p-6 text-center text-[#0A0A0A] border-b-3 border-[#0A0A0A]">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => {
                if (step === 'otp') {
                  setStep('phone');
                } else {
                  navigate('/onboarding/role');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0A] text-[#FDE047] text-xs font-black transition-transform active:scale-95"
            >
              <ArrowLeft size={16} className="stroke-[2.5]" />
              <span>{t('backBtn')}</span>
            </button>
            <span className="text-xs font-black bg-[#0A0A0A] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
              Step 3 of 3
            </span>
          </div>

          <div className="flex justify-center mb-2">
            {role === 'worker' ? (
              <HelperCharacter className="w-20 h-20 drop-shadow-sm" />
            ) : (
              <EmployerCharacter className="w-20 h-20 drop-shadow-sm" />
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
            {step === 'phone' ? t('loginTitle') : t('verifyOtp')}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-800 font-bold mt-1">
            {step === 'phone' ? t('loginSub') : `${t('otpSimulatedNote')} (+91 ${phone})`}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Error Notification */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-[#FEE2E2] border-2 border-[#DC2626] text-xs font-black text-[#991B1B]">
              {errorMessage}
            </div>
          )}

          {/* Step 1: Phone Form */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[#0A0A0A]">
                  {t('enterPhoneNumber')}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-sm font-black text-neutral-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full min-h-[56px] pl-14 pr-4 py-3 rounded-full border-2 border-[#0A0A0A] focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047] focus:outline-none font-black text-[#0A0A0A] text-base tracking-wide"
                    placeholder="98XXXXXXXX"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[56px] py-4 px-6 rounded-full font-black text-base text-[#0A0A0A] bg-[#FDE047] hover:bg-yellow-300 border-2 border-[#0A0A0A] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{t('sendOtp')}</span>
                    <ArrowRight size={20} className="stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP Form */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-[#0A0A0A]">
                    {t('otpLabel')}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setOtp('1234');
                      showToast('Demo OTP 1234 filled!', 'info');
                    }}
                    className="text-xs font-black text-[#0A0A0A] bg-[#FDE047] px-2.5 py-0.5 rounded-full border border-[#0A0A0A]"
                  >
                    Auto-fill 1234
                  </button>
                </div>

                <div className="relative flex items-center">
                  <KeyRound className="absolute left-4 w-5 h-5 text-neutral-400 stroke-[2.5]" />
                  <input
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full min-h-[56px] pl-12 pr-4 py-3 rounded-full border-2 border-[#0A0A0A] focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047] focus:outline-none font-black text-[#0A0A0A] text-center text-xl tracking-widest"
                    placeholder="1234"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[56px] py-4 px-6 rounded-full font-black text-base text-[#0A0A0A] bg-[#FDE047] hover:bg-yellow-300 border-2 border-[#0A0A0A] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{t('verifyOtp')}</span>
                    <ShieldCheck size={20} className="stroke-[2.5]" />
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    showToast(language === 'mr' ? 'ओटीपी पुन्हा पाठवला: १२३४' : 'OTP re-sent: 1234', 'info');
                  }}
                  className="text-xs font-bold text-neutral-600 hover:text-black underline"
                >
                  {t('resendOtp')}
                </button>
              </div>
            </form>
          )}

          {/* Guest Skip Option */}
          <div className="pt-2 border-t-2 border-neutral-100 text-center space-y-2.5">
            <button
              type="button"
              onClick={handleGuestContinue}
              className="w-full min-h-[52px] py-3 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200 border-2 border-[#0A0A0A] text-[#0A0A0A] font-black text-xs transition-colors active:scale-95"
            >
              {t('guestContinue')}
            </button>
            
            <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#15803D] stroke-[2.5]" />
              <span>No password, no email, no Google required</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
