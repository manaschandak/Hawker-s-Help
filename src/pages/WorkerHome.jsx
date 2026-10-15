import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AvailabilityCard from '../components/AvailabilityCard';
import NakaBanner from '../components/NakaBanner';
import JobCard from '../components/JobCard';
import { Filter, Volume2, Sparkles, Zap, Calendar, Building, Wrench, Paintbrush, Hammer, HardHat, CheckCircle2, Users, ArrowRight } from 'lucide-react';
import { StateCharacter, TradeCharacter } from '../components/Characters';

export default function WorkerHome({ onSelectJob }) {
  const { jobs, workerProfile, language, speakText, t, teams } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [timeFilter, setTimeFilter] = useState('all'); // all | today | tomorrow | long_term
  const [tradeFilter, setTradeFilter] = useState('all'); // all | plumber | electrician ...
  const [toolsOnlyFilter, setToolsOnlyFilter] = useState(false);

  // Read search params on load or change (e.g. from CardNav "Urgent Today Jobs" or "Tool Matched Jobs")
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'today') {
      setTimeFilter('today');
    } else if (filterParam === 'tools') {
      setToolsOnlyFilter(true);
    } else if (filterParam === 'tomorrow') {
      setTimeFilter('tomorrow');
    } else if (filterParam === 'all') {
      setTimeFilter('all');
      setToolsOnlyFilter(false);
    }

    if (filterParam || window.location.hash === '#job-feed-list') {
      setTimeout(() => {
        const el = document.getElementById('job-feed-list');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [searchParams]);

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
    <div className="space-y-4 pb-20">
      {/* 1. Global Worker Availability Card */}
      <AvailabilityCard />

      {/* 2. Naka Mode Presence Banner */}
      <NakaBanner />

      {/* 2.5 My Team Quick Access Banner */}
      <div className="bg-[#0A0A0A] text-white rounded-[32px] p-4 border-2 border-[#0A0A0A] shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FDE047] text-[#0A0A0A] flex items-center justify-center shrink-0 border-2 border-[#0A0A0A] shadow-xs">
            <Users className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#FDE047]">
                {language === 'mr' ? 'माझा कामगार संघ' : 'My Worker Team'}
              </span>
              <span className="text-[10px] bg-[#15803D] text-white px-2 py-0.5 rounded-full font-black">
                {language === 'mr' ? 'सक्रिय' : 'Active'}
              </span>
            </div>
            <div className="text-sm font-black text-white truncate max-w-[170px] sm:max-w-xs">
              {teams?.[0]?.name?.[language] || teams?.[0]?.name?.en || 'खोपोली प्लंबिंग गँग'}
            </div>
            <div className="text-[11px] text-neutral-300 font-bold">
              4 {language === 'mr' ? 'सहकारी' : 'Members'} • ₹3,800/{language === 'mr' ? 'दिवस' : 'day'}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/team')}
          className="min-h-[46px] px-3.5 sm:px-4 py-2 bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black text-xs rounded-full border-2 border-[#0A0A0A] flex items-center gap-1 active:scale-95 transition-all shrink-0 cursor-pointer shadow-xs"
        >
          <span>{language === 'mr' ? 'संघ पहा' : 'View Team'}</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* 3. Filter Bar & Quick Tools Match */}
      <div id="job-feed-list" className="space-y-3 pt-2 scroll-mt-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#0A0A0A] stroke-[2.5]" />
            <span className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider">
              {language === 'mr' ? 'कामे निवडा' : 'Filters'}
            </span>
            <span className="text-xs bg-[#0A0A0A] text-[#FDE047] px-2.5 py-0.5 rounded-full font-black">
              {filteredJobs.length}
            </span>
          </div>

          {/* Audio Feed Readout */}
          <button
            onClick={handleReadFeed}
            className="text-xs font-black text-[#0A0A0A] bg-[#FDE047] border border-[#0A0A0A] px-3 py-1 rounded-full flex items-center gap-1.5 active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{t('speakReadAloud')}</span>
          </button>
        </div>

        {/* Time Filter Chips: Pill buttons min 44px */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setTimeFilter('all')}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all border-2 active:scale-95 ${
              timeFilter === 'all'
                ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A] shadow-xs'
                : 'bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-neutral-100'
            }`}
          >
            {t('filterAll')}
          </button>
          <button
            onClick={() => setTimeFilter('today')}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all border-2 active:scale-95 flex items-center gap-1.5 ${
              timeFilter === 'today'
                ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A] shadow-xs'
                : 'bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-neutral-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5 stroke-[2.5] text-amber-500" />
            <span>{t('filterToday')}</span>
          </button>
          <button
            onClick={() => setTimeFilter('tomorrow')}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all border-2 active:scale-95 flex items-center gap-1.5 ${
              timeFilter === 'tomorrow'
                ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A] shadow-xs'
                : 'bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-neutral-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 stroke-[2.5] text-blue-500" />
            <span>{t('filterTomorrow')}</span>
          </button>
          <button
            onClick={() => setTimeFilter('long_term')}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all border-2 active:scale-95 flex items-center gap-1.5 ${
              timeFilter === 'long_term'
                ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A] shadow-xs'
                : 'bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-neutral-100'
            }`}
          >
            <Building className="w-3.5 h-3.5 stroke-[2.5] text-purple-500" />
            <span>{t('filterLongTerm')}</span>
          </button>
        </div>

        {/* Trade Category Horizontal Pill Selector with Trade Characters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setTradeFilter('all')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap border-2 transition-all active:scale-95 ${
              tradeFilter === 'all'
                ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A]'
                : 'bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-neutral-100'
            }`}
          >
            {language === 'mr' ? 'सर्व ट्रेड' : 'All Trades'}
          </button>
          {[
            { id: 'plumber', label: language === 'mr' ? 'प्लंबर' : 'Plumber' },
            { id: 'electrician', label: language === 'mr' ? 'इलेक्ट्रिशियन' : 'Electrician' },
            { id: 'carpenter', label: language === 'mr' ? 'सुतार' : 'Carpenter' },
            { id: 'painter', label: language === 'mr' ? 'पेंटर' : 'Painter' },
            { id: 'mason', label: language === 'mr' ? 'गवंडी' : 'Mason' },
            { id: 'helper', label: language === 'mr' ? 'हेल्पर' : 'Helper' },
            { id: 'sweeper', label: language === 'mr' ? 'सफाई' : 'Cleaner' }
          ].map(tradeItem => (
            <button
              key={tradeItem.id}
              onClick={() => setTradeFilter(tradeItem.id)}
              className={`min-h-[44px] px-3 py-1 rounded-full text-xs font-black whitespace-nowrap border-2 flex items-center gap-1.5 transition-all active:scale-95 ${
                tradeFilter === tradeItem.id
                  ? 'bg-[#0A0A0A] text-[#FDE047] border-[#0A0A0A]'
                  : 'bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-neutral-100'
              }`}
            >
              <TradeCharacter trade={tradeItem.id} className="w-6 h-6 flex-shrink-0" />
              <span>{tradeItem.label}</span>
            </button>
          ))}
        </div>

        {/* "Matches My Tools" Quick Toggle */}
        <button
          onClick={() => setToolsOnlyFilter(!toolsOnlyFilter)}
          className={`w-full min-h-[52px] py-2.5 px-4 rounded-full border-2 border-[#0A0A0A] flex items-center justify-between text-xs font-black transition-all active:scale-[0.99] ${
            toolsOnlyFilter
              ? 'bg-[#FDE047] text-[#0A0A0A] shadow-sm'
              : 'bg-white text-[#0A0A0A] hover:bg-neutral-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0A0A0A] stroke-[2.5]" />
            <span>{t('filterMatchesTools')} ({workerProfile.ownedTools?.length} {language === 'mr' ? 'अवजारे उपलब्ध' : 'tools'})</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border border-[#0A0A0A] ${toolsOnlyFilter ? 'bg-[#0A0A0A] text-[#FDE047]' : 'bg-neutral-100 text-[#0A0A0A]'}`}>
            {toolsOnlyFilter ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {/* 4. Jobs Feed List */}
      <div className="pt-1">
        {filteredJobs.length === 0 ? (
          <div className="bg-white border-3 border-dashed border-[#0A0A0A] rounded-[32px] p-8 text-center space-y-3 shadow-sm">
            <StateCharacter state="thinking" className="w-24 h-24 mx-auto" />
            <h3 className="font-black text-[#0A0A0A] text-base">
              {language === 'mr' ? 'या फिल्टरनुसार कामे सापडली नाहीत' : 'No jobs matching these filters'}
            </h3>
            <p className="text-xs text-neutral-600 font-semibold max-w-xs mx-auto">
              {language === 'mr' ? 'कृपया फिल्टर बदला किंवा सर्व कामे पहा' : 'Try resetting your filter to view all listings'}
            </p>
            <button
              onClick={() => {
                setTimeFilter('all');
                setTradeFilter('all');
                setToolsOnlyFilter(false);
              }}
              className="mt-2 min-h-[56px] px-6 py-3 bg-[#FDE047] text-[#0A0A0A] font-black text-sm rounded-full border-2 border-[#0A0A0A] shadow-md hover:bg-yellow-300 active:scale-95"
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
