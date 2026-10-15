import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Users, Shield, User, Search, PlusCircle, Clock } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, onOpenPostJob }) {
  const { role, t, language } = useApp();

  if (role === 'employer') {
    return (
      <nav className="sticky bottom-0 bg-[#0A0A0A] border-t-2 border-[#262626] px-2 py-2 flex items-center justify-around z-30 shadow-2xl">
        <button
          onClick={() => setActiveTab('employer_jobs')}
          className={`flex flex-col items-center justify-center min-h-[56px] px-3.5 py-1.5 rounded-full transition-all active:scale-95 ${
            activeTab === 'employer_jobs'
              ? 'bg-[#FDE047] text-[#0A0A0A] font-black shadow-md'
              : 'text-neutral-400 font-semibold hover:text-white'
          }`}
          aria-label={t('navEmployerJobs')}
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span className="text-[12px]">{t('navEmployerJobs')}</span>
        </button>

        {/* Big Post Job Action for Employer */}
        <button
          onClick={onOpenPostJob}
          className="flex flex-col items-center justify-center -mt-5 bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] min-h-[56px] px-4 py-2 rounded-full shadow-2xl border-2 border-[#0A0A0A] ring-4 ring-[#0A0A0A] active:scale-95 transition-all"
          aria-label="Post Job"
        >
          <PlusCircle className="w-6 h-6 stroke-[2.5]" />
          <span className="text-[12px] font-black mt-0.5">
            {language === 'mr' ? 'काम द्या' : language === 'hi' ? 'काम दें' : 'Post Job'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('find_workers')}
          className={`flex flex-col items-center justify-center min-h-[56px] px-3.5 py-1.5 rounded-full transition-all active:scale-95 ${
            activeTab === 'find_workers'
              ? 'bg-[#FDE047] text-[#0A0A0A] font-black shadow-md'
              : 'text-neutral-400 font-semibold hover:text-white'
          }`}
          aria-label={t('navFindWorkers')}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[12px]">{t('navFindWorkers')}</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center min-h-[56px] px-3.5 py-1.5 rounded-full transition-all active:scale-95 ${
            activeTab === 'profile'
              ? 'bg-[#FDE047] text-[#0A0A0A] font-black shadow-md'
              : 'text-neutral-400 font-semibold hover:text-white'
          }`}
          aria-label={t('navProfile')}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[12px]">{t('navProfile')}</span>
        </button>
      </nav>
    );
  }

  // Worker Navigation: 5 tabs with Work & Hours included!
  return (
    <nav className="sticky bottom-0 bg-[#0A0A0A] border-t-2 border-[#262626] px-1.5 py-1.5 flex items-center justify-around z-30 shadow-2xl">
      <button
        onClick={() => setActiveTab('jobs')}
        className={`flex-1 flex flex-col items-center justify-center min-h-[54px] py-1 mx-0.5 rounded-full transition-all active:scale-95 ${
          activeTab === 'jobs'
            ? 'bg-[#FDE047] text-[#0A0A0A] font-black shadow-md'
            : 'text-neutral-400 font-semibold hover:text-white'
        }`}
        aria-label={t('navJobs')}
      >
        <Briefcase className="w-4 h-4 mb-0.5" />
        <span className="text-[11px] leading-tight">{language === 'mr' ? 'कामे' : 'Jobs'}</span>
      </button>

      <button
        onClick={() => setActiveTab('work_hours')}
        className={`flex-1 flex flex-col items-center justify-center min-h-[54px] py-1 mx-0.5 rounded-full transition-all active:scale-95 ${
          activeTab === 'work_hours'
            ? 'bg-[#FDE047] text-[#0A0A0A] font-black shadow-md'
            : 'text-neutral-400 font-semibold hover:text-white'
        }`}
        aria-label={language === 'mr' ? 'हजेरी' : 'Work & Hours'}
      >
        <Clock className="w-4 h-4 mb-0.5" />
        <span className="text-[11px] leading-tight">{language === 'mr' ? 'हजेरी' : 'Hours'}</span>
      </button>

      <button
        onClick={() => setActiveTab('team')}
        className={`flex-1 flex flex-col items-center justify-center min-h-[54px] py-1 mx-0.5 rounded-full transition-all active:scale-95 ${
          activeTab === 'team'
            ? 'bg-[#FDE047] text-[#0A0A0A] font-black shadow-md'
            : 'text-neutral-400 font-semibold hover:text-white'
        }`}
        aria-label={t('navMyTeam')}
      >
        <Users className="w-4 h-4 mb-0.5" />
        <span className="text-[11px] leading-tight">{t('navMyTeam')}</span>
      </button>

      <button
        onClick={() => setActiveTab('rights')}
        className={`flex-1 flex flex-col items-center justify-center min-h-[54px] py-1 mx-0.5 rounded-full transition-all active:scale-95 ${
          activeTab === 'rights'
            ? 'bg-[#FDE047] text-[#0A0A0A] font-black shadow-md'
            : 'text-neutral-400 font-semibold hover:text-white'
        }`}
        aria-label={t('navRights')}
      >
        <Shield className="w-4 h-4 mb-0.5" />
        <span className="text-[11px] leading-tight">{t('navRights')}</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex-1 flex flex-col items-center justify-center min-h-[54px] py-1 mx-0.5 rounded-full transition-all active:scale-95 ${
          activeTab === 'profile'
            ? 'bg-[#FDE047] text-[#0A0A0A] font-black shadow-md'
            : 'text-neutral-400 font-semibold hover:text-white'
        }`}
        aria-label={t('navProfile')}
      >
        <User className="w-4 h-4 mb-0.5" />
        <span className="text-[11px] leading-tight">{t('navProfile')}</span>
      </button>
    </nav>
  );
}
