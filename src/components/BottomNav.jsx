import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Users, Shield, User, Search, PlusCircle } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, onOpenPostJob }) {
  const { role, t, language } = useApp();

  if (role === 'employer') {
    return (
      <nav className="sticky bottom-0 bg-white border-t-2 border-slate-200 px-2 py-1.5 flex items-center justify-around z-30 shadow-lg">
        <button
          onClick={() => setActiveTab('employer_jobs')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all touch-target ${
            activeTab === 'employer_jobs'
              ? 'text-[#B45309] font-bold bg-amber-50'
              : 'text-slate-600 font-medium hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-5 h-5 mb-1" />
          <span className="text-[12px]">{t('navEmployerJobs')}</span>
        </button>

        {/* Big Post Job Action for Employer */}
        <button
          onClick={onOpenPostJob}
          className="flex flex-col items-center justify-center -mt-4 bg-[#B45309] hover:bg-[#92400E] text-white p-3 rounded-2xl shadow-lg border-2 border-white active:scale-95 transition-transform"
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-[11px] font-bold mt-0.5">
            {language === 'mr' ? 'काम द्या' : language === 'hi' ? 'काम दें' : 'Post Job'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('find_workers')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all touch-target ${
            activeTab === 'find_workers'
              ? 'text-[#B45309] font-bold bg-amber-50'
              : 'text-slate-600 font-medium hover:text-slate-900'
          }`}
        >
          <Search className="w-5 h-5 mb-1" />
          <span className="text-[12px]">{t('navFindWorkers')}</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all touch-target ${
            activeTab === 'profile'
              ? 'text-[#B45309] font-bold bg-amber-50'
              : 'text-slate-600 font-medium hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-[12px]">{t('navProfile')}</span>
        </button>
      </nav>
    );
  }

  // Worker Navigation
  return (
    <nav className="sticky bottom-0 bg-white border-t-2 border-slate-200 px-1 py-1 flex items-center justify-around z-30 shadow-lg">
      <button
        onClick={() => setActiveTab('jobs')}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all min-h-[52px] ${
          activeTab === 'jobs'
            ? 'text-[#B45309] font-bold bg-amber-50'
            : 'text-slate-600 font-medium hover:text-slate-900'
        }`}
      >
        <Briefcase className="w-5 h-5 mb-0.5" />
        <span className="text-[11px]">{t('navJobs')}</span>
      </button>

      <button
        onClick={() => setActiveTab('team')}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all min-h-[52px] ${
          activeTab === 'team'
            ? 'text-[#B45309] font-bold bg-amber-50'
            : 'text-slate-600 font-medium hover:text-slate-900'
        }`}
      >
        <Users className="w-5 h-5 mb-0.5" />
        <span className="text-[11px]">{t('navMyTeam')}</span>
      </button>

      <button
        onClick={() => setActiveTab('rights')}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all min-h-[52px] ${
          activeTab === 'rights'
            ? 'text-[#B45309] font-bold bg-amber-50'
            : 'text-slate-600 font-medium hover:text-slate-900'
        }`}
      >
        <Shield className="w-5 h-5 mb-0.5" />
        <span className="text-[11px]">{t('navRights')}</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all min-h-[52px] ${
          activeTab === 'profile'
            ? 'text-[#B45309] font-bold bg-amber-50'
            : 'text-slate-600 font-medium hover:text-slate-900'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-[11px]">{t('navProfile')}</span>
      </button>
    </nav>
  );
}
