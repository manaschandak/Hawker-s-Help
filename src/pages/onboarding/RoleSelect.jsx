import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HelperCharacter, EmployerCharacter } from '../../components/Characters';

export default function RoleSelect() {
  const { role, setRole, t } = useApp();
  const navigate = useNavigate();

  const handleSelect = (chosenRole) => {
    setRole(chosenRole);
  };

  const handleProceed = () => {
    navigate('/onboarding/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-[#0A0A0A]">
      <div className="w-full max-w-md bg-white rounded-[32px] border-4 border-[#0A0A0A] overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="bg-[#FDE047] p-6 text-center text-[#0A0A0A] border-b-3 border-[#0A0A0A]">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/onboarding/language')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0A] text-[#FDE047] text-xs font-black transition-transform active:scale-95"
            >
              <ArrowLeft size={16} className="stroke-[2.5]" />
              <span>{t('backBtn')}</span>
            </button>
            <span className="text-xs font-black bg-[#0A0A0A] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
              Step 2 of 3
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
            {t('roleTitle')}
          </h1>
          <p className="text-sm text-neutral-800 font-bold mt-1">
            {t('roleSub')}
          </p>
        </div>

        {/* Role Cards */}
        <div className="p-6 space-y-4">
          
          {/* Worker Card: With illustrated Worker Character */}
          <button
            type="button"
            onClick={() => handleSelect('worker')}
            className={`w-full p-5 rounded-[28px] text-left border-2 transition-all flex flex-col gap-3 group relative active:scale-[0.99] ${
              role === 'worker'
                ? 'border-[#0A0A0A] bg-[#FDE047] text-[#0A0A0A] shadow-md ring-2 ring-[#0A0A0A]'
                : 'border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelperCharacter className="w-14 h-14 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-black text-[#0A0A0A]">
                    {t('roleWorkerTitle')}
                  </h3>
                  <div className="text-xs font-bold text-neutral-700">
                    {t('iWantWork')}
                  </div>
                </div>
              </div>
              {role === 'worker' ? (
                <CheckCircle2 className="w-7 h-7 text-[#0A0A0A] stroke-[2.5]" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-[#0A0A0A]" />
              )}
            </div>

            <p className="text-xs text-neutral-800 font-semibold leading-relaxed">
              {t('roleWorkerDesc')}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Plumber', 'Electrician', 'Mason', 'Painter', 'Carpenter', 'Helper'].map((trade) => (
                <span
                  key={trade}
                  className="text-xs font-black px-2.5 py-1 rounded-full bg-white border border-[#0A0A0A] text-[#0A0A0A]"
                >
                  {trade}
                </span>
              ))}
            </div>
          </button>

          {/* Employer Card: With illustrated Employer Character */}
          <button
            type="button"
            onClick={() => handleSelect('employer')}
            className={`w-full p-5 rounded-[28px] text-left border-2 transition-all flex flex-col gap-3 group relative active:scale-[0.99] ${
              role === 'employer'
                ? 'border-[#0A0A0A] bg-[#FDE047] text-[#0A0A0A] shadow-md ring-2 ring-[#0A0A0A]'
                : 'border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EmployerCharacter className="w-14 h-14 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-black text-[#0A0A0A]">
                    {t('roleEmployerTitle')}
                  </h3>
                  <div className="text-xs font-bold text-neutral-700">
                    {t('iWantToHire')}
                  </div>
                </div>
              </div>
              {role === 'employer' ? (
                <CheckCircle2 className="w-7 h-7 text-[#0A0A0A] stroke-[2.5]" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-[#0A0A0A]" />
              )}
            </div>

            <p className="text-xs text-neutral-800 font-semibold leading-relaxed">
              {t('roleEmployerDesc')}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Homeowner', 'Civil Contractor', 'Renovation', 'Shop Owner'].map((cat) => (
                <span
                  key={cat}
                  className="text-xs font-black px-2.5 py-1 rounded-full bg-white border border-[#0A0A0A] text-[#0A0A0A]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </button>

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

        </div>

      </div>
    </div>
  );
}
