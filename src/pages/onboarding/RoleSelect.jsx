import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle2, UserCheck, HardHat, Building2 } from 'lucide-react';

export default function RoleSelect() {
  const { role, setRole, t, language } = useApp();
  const navigate = useNavigate();

  const handleSelect = (chosenRole) => {
    setRole(chosenRole);
  };

  const handleProceed = () => {
    navigate('/onboarding/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-[#FAF8F5]">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200/90 space-y-6">
        
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/onboarding/language')}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{t('backBtn')}</span>
          </button>
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Step 2 of 3
          </span>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('roleTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {t('roleSub')}
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          
          {/* Worker Card */}
          <button
            type="button"
            onClick={() => handleSelect('worker')}
            className={`w-full p-5 rounded-3xl text-left border-2 transition-all flex flex-col gap-3 group relative touch-target ${
              role === 'worker'
                ? 'border-[#B45309] bg-amber-50/60 shadow-lg ring-2 ring-amber-200'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-sm">
                👷🏽‍♂️
              </div>
              {role === 'worker' ? (
                <CheckCircle2 className="w-6 h-6 text-[#B45309]" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
              )}
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t('roleWorkerTitle')}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                {t('roleWorkerDesc')}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Plumber', 'Electrician', 'Mason', 'Painter', 'Carpenter'].map((trade) => (
                <span key={trade} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  {trade}
                </span>
              ))}
            </div>
          </button>

          {/* Employer Card */}
          <button
            type="button"
            onClick={() => handleSelect('employer')}
            className={`w-full p-5 rounded-3xl text-left border-2 transition-all flex flex-col gap-3 group relative touch-target ${
              role === 'employer'
                ? 'border-[#B45309] bg-amber-50/60 shadow-lg ring-2 ring-amber-200'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-2xl shadow-sm">
                🏢
              </div>
              {role === 'employer' ? (
                <CheckCircle2 className="w-6 h-6 text-[#B45309]" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
              )}
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t('roleEmployerTitle')}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                {t('roleEmployerDesc')}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Homeowner', 'Civil Contractor', 'Interior Work', 'Factory Midc'].map((cat) => (
                <span key={cat} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  {cat}
                </span>
              ))}
            </div>
          </button>

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

      </div>
    </div>
  );
}
