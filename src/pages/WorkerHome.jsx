import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import AvailabilityCard from '../components/AvailabilityCard';
import NakaBanner from '../components/NakaBanner';
import JobCard from '../components/JobCard';
import { Filter, Volume2, Sparkles, CheckSquare } from 'lucide-react';

export default function WorkerHome({ onSelectJob }) {
  const { jobs, workerProfile, language, speakText, t } = useApp();

  const [timeFilter, setTimeFilter] = useState('all'); // all | today | tomorrow | long_term
  const [tradeFilter, setTradeFilter] = useState('all'); // all | plumber | electrician ...
  const [toolsOnlyFilter, setToolsOnlyFilter] = useState(false);

  // Filter jobs logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Time filter
      if (timeFilter === 'today' && job.startDate !== 'Today') return false;
      if (timeFilter === 'tomorrow' && job.startDate !== 'Tomorrow') return false;
      if (timeFilter === 'long_term' && (job.durationDays || 1) <= 1) return false;

      // Trade filter
      if (tradeFilter !== 'all' && job.trade !== tradeFilter) return false;

      // Owned Tools filter
      if (toolsOnlyFilter) {
        if (!job.toolsNeeded || job.toolsNeeded.length === 0) return true;
        const ownsAll = job.toolsNeeded.every(tId => workerProfile.ownedTools?.includes(tId));
        if (!ownsAll) return false;
      }

      return true;
    });
  }, [jobs, timeFilter, tradeFilter, toolsOnlyFilter, workerProfile.ownedTools]);

  const handleReadFeed = () => {
    const text = language === 'mr'
      ? `खोपोली आणि परिसरात ${filteredJobs.length} कामे उपलब्ध आहेत. पहिले काम: ${filteredJobs[0]?.title.mr || ''}, रोज: ₹${filteredJobs[0]?.payOffer || ''}.`
      : `There are ${filteredJobs.length} jobs available around Khopoli. First job: ${filteredJobs[0]?.title.en || ''}, pay: ₹${filteredJobs[0]?.payOffer || ''}.`;
    speakText(text);
  };

  return (
    <div className="space-y-4 pb-16">
      {/* 1. Global Worker Availability Card */}
      <AvailabilityCard />

      {/* 2. Naka Mode Presence Banner */}
      <NakaBanner />

      {/* 3. Filter Bar & Quick Tools Match */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-[#B45309]" />
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {language === 'mr' ? 'कामे निवडा' : 'Filters'}
            </span>
            <span className="text-xs bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded-full font-bold">
              {filteredJobs.length}
            </span>
          </div>

          {/* Audio Feed Readout */}
          <button
            onClick={handleReadFeed}
            className="text-[11px] font-bold text-[#B45309] flex items-center gap-1 hover:underline"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{t('speakReadAloud')}</span>
          </button>
        </div>

        {/* Time Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setTimeFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all touch-target ${
              timeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t('filterAll')}
          </button>
          <button
            onClick={() => setTimeFilter('today')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all touch-target ${
              timeFilter === 'today'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            ⚡ {t('filterToday')}
          </button>
          <button
            onClick={() => setTimeFilter('tomorrow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all touch-target ${
              timeFilter === 'tomorrow'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            🗓️ {t('filterTomorrow')}
          </button>
          <button
            onClick={() => setTimeFilter('long_term')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all touch-target ${
              timeFilter === 'long_term'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            🏗️ {language === 'mr' ? 'मोठी कामे (2+ दिवस)' : 'Long Term'}
          </button>
        </div>

        {/* Trade Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setTradeFilter('all')}
            className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap border ${
              tradeFilter === 'all'
                ? 'bg-[#B45309] text-white border-[#B45309]'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            {language === 'mr' ? 'सर्व व्यवसाय' : 'All Trades'}
          </button>
          <button
            onClick={() => setTradeFilter('plumber')}
            className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap border ${
              tradeFilter === 'plumber'
                ? 'bg-[#B45309] text-white border-[#B45309]'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            🔧 {language === 'mr' ? 'प्लंबर' : 'Plumber'}
          </button>
          <button
            onClick={() => setTradeFilter('electrician')}
            className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap border ${
              tradeFilter === 'electrician'
                ? 'bg-[#B45309] text-white border-[#B45309]'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            ⚡ {language === 'mr' ? 'इलेक्ट्रिशियन' : 'Electrician'}
          </button>
          <button
            onClick={() => setTradeFilter('carpenter')}
            className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap border ${
              tradeFilter === 'carpenter'
                ? 'bg-[#B45309] text-white border-[#B45309]'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            🪚 {language === 'mr' ? 'सुतार' : 'Carpenter'}
          </button>
          <button
            onClick={() => setTradeFilter('painter')}
            className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap border ${
              tradeFilter === 'painter'
                ? 'bg-[#B45309] text-white border-[#B45309]'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            🎨 {language === 'mr' ? 'पेंटर' : 'Painter'}
          </button>
          <button
            onClick={() => setTradeFilter('mason')}
            className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap border ${
              tradeFilter === 'mason'
                ? 'bg-[#B45309] text-white border-[#B45309]'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            🧱 {language === 'mr' ? 'गवंडी' : 'Mason'}
          </button>
          <button
            onClick={() => setTradeFilter('helper')}
            className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap border ${
              tradeFilter === 'helper'
                ? 'bg-[#B45309] text-white border-[#B45309]'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            👷 {language === 'mr' ? 'हेल्पर' : 'Helper'}
          </button>
        </div>

        {/* "Matches My Tools" Quick Toggle */}
        <button
          onClick={() => setToolsOnlyFilter(!toolsOnlyFilter)}
          className={`w-full py-2 px-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
            toolsOnlyFilter
              ? 'bg-amber-100 border-[#B45309] text-[#B45309]'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B45309]" />
            <span>{t('filterMatchesTools')} ({workerProfile.ownedTools?.length} {language === 'mr' ? 'अवजारे उपलब्ध' : 'tools'})</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] ${toolsOnlyFilter ? 'bg-[#B45309] text-white' : 'bg-slate-100 text-slate-600'}`}>
            {toolsOnlyFilter ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {/* 4. Jobs Feed List */}
      <div className="pt-1">
        {filteredJobs.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center space-y-2">
            <span className="text-4xl">🔍</span>
            <h3 className="font-black text-slate-800 text-sm">
              {language === 'mr' ? 'या फिल्टरनुसार कामे सापडली नाहीत' : 'No jobs matching these filters'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'mr' ? 'कृपया फिल्टर बदला किंवा सर्व कामे पहा' : 'Try resetting your filter to view all listings'}
            </p>
            <button
              onClick={() => {
                setTimeFilter('all');
                setTradeFilter('all');
                setToolsOnlyFilter(false);
              }}
              className="mt-2 px-5 py-2.5 bg-slate-900 text-white font-black text-xs rounded-xl shadow-md hover:bg-slate-800"
            >
              {language === 'mr' ? 'सर्व कामे दाखवा' : 'Show All Jobs'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onSelect={onSelectJob}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
