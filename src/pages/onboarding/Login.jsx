import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Phone, ShieldCheck, KeyRound, Loader2, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-[#FAF8F5]">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200/90 space-y-6">
        
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (step === 'otp') {
                setStep('phone');
              } else {
                navigate('/onboarding/role');
              }
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{t('backBtn')}</span>
          </button>
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Step 3 of 3
          </span>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto text-2xl shadow-sm">
            {role === 'worker' ? '👷🏽‍♂️' : '🏢'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {step === 'phone' ? t('loginTitle') : t('verifyOtp')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {step === 'phone' ? t('loginSub') : `${t('otpSimulatedNote')} (+91 ${phone})`}
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Step 1: Phone Form */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700">
                {t('enterPhoneNumber')}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-xs font-black text-slate-400">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-[#B45309] focus:outline-none font-bold text-slate-900 text-sm tracking-wide"
                  placeholder="98XXXXXXXX"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-[#B45309] hover:bg-[#92400E] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 touch-target disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{t('sendOtp')}</span>
                  <ArrowRight size={18} />
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
                <label className="text-xs font-black text-slate-700">
                  {t('otpLabel')}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setOtp('1234');
                    showToast('Demo OTP 1234 filled!', 'info');
                  }}
                  className="text-[11px] font-bold text-[#B45309] hover:underline"
                >
                  Auto-fill 1234
                </button>
              </div>

              <div className="relative flex items-center">
                <KeyRound className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-[#B45309] focus:outline-none font-black text-slate-900 text-center text-lg tracking-widest"
                  placeholder="1234"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-[#B45309] hover:bg-[#92400E] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 touch-target disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{t('verifyOtp')}</span>
                  <ShieldCheck size={18} />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  showToast(language === 'mr' ? 'ओटीपी पुन्हा पाठवला: १२३४' : 'OTP re-sent: 1234', 'info');
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                {t('resendOtp')}
              </button>
            </div>
          </form>
        )}

        {/* Guest Skip Option */}
        <div className="pt-2 border-t border-slate-100 text-center space-y-2">
          <button
            type="button"
            onClick={handleGuestContinue}
            className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors touch-target"
          >
            {t('guestContinue')}
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>No password, no email, no Google required</span>
          </div>
        </div>

      </div>
    </div>
  );
}
