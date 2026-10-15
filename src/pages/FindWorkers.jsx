import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  ShieldCheck,
  Star,
  Clock,
  Wrench,
  Phone,
  CheckCircle2,
  Users,
  Briefcase,
  AlertCircle,
  RotateCcw,
  MapPin,
  ChevronRight,
  ArrowLeft,
  X,
  Volume2,
  Camera,
  HardHat
} from 'lucide-react';
import { formatDistance } from '../utils/distance';
import { TradeCharacter, StateCharacter } from '../components/Characters';

// Trade categories with trade character references
const TRADE_CATEGORIES = [
  { id: 'all', trade: 'helper', name: { en: 'All Trades', hi: 'सभी कार्य', mr: 'सर्व व्यवसाय' }, count: 8 },
  { id: 'plumber', trade: 'plumber', name: { en: 'Plumber', hi: 'प्लंबर', mr: 'प्लंबर' }, count: 2 },
  { id: 'electrician', trade: 'electrician', name: { en: 'Electrician', hi: 'इलेक्ट्रीशियन', mr: 'इलेक्ट्रिशियन' }, count: 1 },
  { id: 'carpenter', trade: 'carpenter', name: { en: 'Carpenter', hi: 'बढ़ई', mr: 'सुतार' }, count: 1 },
  { id: 'painter', trade: 'painter', name: { en: 'Painter', hi: 'पेंटर', mr: 'पेंटर' }, count: 1 },
  { id: 'mason', trade: 'mason', name: { en: 'Mason (Mistri)', hi: 'राजमिस्त्री', mr: 'गवंडी' }, count: 1 },
  { id: 'helper', trade: 'helper', name: { en: 'General Helper', hi: 'हेल्पर / मजदूरी', mr: 'मदतनीस' }, count: 2 },
  { id: 'sweeper', trade: 'sweeper', name: { en: 'Deep Cleaner', hi: 'सफाईकर्मी', mr: 'सफाई कामगार' }, count: 1 }
];

export default function FindWorkers({ onOfferJob }) {
  const { workers, teams, INITIAL_WORKERS, INITIAL_TEAMS, language, showToast, t, speakText } = useApp();

  // Safely fallback to INITIAL arrays if state is momentarily undefined
  const safeWorkers = workers || INITIAL_WORKERS || [];
  const safeTeams = teams || INITIAL_TEAMS || [];

  const [activeTab, setActiveTab] = useState('individual'); // individual | teams
  const [selectedTrade, setSelectedTrade] = useState('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkerDetail, setSelectedWorkerDetail] = useState(null);
  const [hasError, setHasError] = useState(false);

  // Progressive Disclosure: Step 1 (category selected?), Step 2 (browsing workers), Step 3 (worker detail modal)
  const [viewStep, setViewStep] = useState('browse'); // 'categories' | 'browse'

  // Filtered workers
  const filteredWorkers = useMemo(() => {
    try {
      return safeWorkers.filter((worker) => {
        if (selectedTrade !== 'all' && worker.trade !== selectedTrade) {
          return false;
        }
        if (onlyAvailable && worker.availableStatus !== 'available') {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = worker.name.toLowerCase().includes(q);
          const matchNaka = worker.naka?.toLowerCase().includes(q) || false;
          const matchTrade = worker.trade.toLowerCase().includes(q);
          if (!matchName && !matchNaka && !matchTrade) return false;
        }
        return true;
      });
    } catch (err) {
      console.error('Error filtering workers:', err);
      setHasError(true);
      return [];
    }
  }, [safeWorkers, selectedTrade, onlyAvailable, searchQuery]);

  const handleSendOffer = (worker) => {
    showToast(
      language === 'mr'
        ? `${worker.name} यांना कामाचा प्रस्ताव पाठवला!`
        : `Direct job offer sent to ${worker.name}!`,
      'success'
    );
    if (onOfferJob) onOfferJob(worker);
  };

  const handleResetFilters = () => {
    setSelectedTrade('all');
    setOnlyAvailable(false);
    setSearchQuery('');
    setHasError(false);
  };

  // Error boundary fallback
  if (hasError) {
    return (
      <div className="p-8 text-center bg-white rounded-[32px] border-2 border-[#DC2626] shadow-md space-y-4 my-6 max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-[#DC2626] mx-auto" />
        <h2 className="text-xl font-black text-[#0A0A0A]">Unable to load worker directory</h2>
        <p className="text-xs text-neutral-600 font-bold">
          A temporary data mismatch occurred while loading profiles.
        </p>
        <button
          onClick={handleResetFilters}
          className="px-6 py-3 min-h-[48px] bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full text-xs flex items-center justify-center gap-2 mx-auto active:scale-95"
        >
          <RotateCcw size={16} />
          <span>{t('retryBtn')}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] text-xs font-black uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Naka Verified Wagers</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              {t('findWorkersTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-bold mt-1">
              {language === 'mr'
                ? 'खोपोली, खालापूर व कर्जत नाक्यावरील कुशल कारागीर — थेट संपर्क, ०% कमिशन'
                : 'Direct hire from Khopoli, Khalapur & Karjat chowks — 0% commission'}
            </p>
          </div>

          {/* Toggle: Individual Workers vs Pre-formed Teams */}
          <div className="flex bg-[#0A0A0A] p-1.5 rounded-full text-xs font-black border border-[#0A0A0A] shrink-0">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-4 py-2.5 rounded-full transition-all flex items-center gap-2 ${
                activeTab === 'individual'
                  ? 'bg-[#FDE047] text-[#0A0A0A] shadow-sm font-black'
                  : 'text-white hover:text-[#FDE047]'
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>{language === 'mr' ? 'वैयक्तिक कारागीर' : 'Individual Workers'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeTab === 'individual' ? 'bg-[#0A0A0A] text-[#FDE047]' : 'bg-neutral-800 text-white'
              }`}>
                {safeWorkers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('teams')}
              className={`px-4 py-2.5 rounded-full transition-all flex items-center gap-2 ${
                activeTab === 'teams'
                  ? 'bg-[#FDE047] text-[#0A0A0A] shadow-sm font-black'
                  : 'text-white hover:text-[#FDE047]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{language === 'mr' ? 'कामगार संघ' : 'Pre-formed Teams'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeTab === 'teams' ? 'bg-[#0A0A0A] text-[#FDE047]' : 'bg-neutral-800 text-white'
              }`}>
                {safeTeams.length}
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar & Fast Filters */}
        {activeTab === 'individual' && (
          <div className="pt-3 border-t-2 border-neutral-100 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder={
                  language === 'mr'
                    ? 'नाव, व्यवसाय किंवा नाका शोधा...'
                    : 'Search by worker name, trade, or naka...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-[#0A0A0A] bg-neutral-50 focus:bg-white text-xs font-bold text-[#0A0A0A] outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#0A0A0A]"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 text-xs font-black text-[#0A0A0A] cursor-pointer bg-[#FEF08A]/40 px-4 py-3 rounded-full border-2 border-[#0A0A0A] shrink-0">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 text-[#0A0A0A] rounded border-[#0A0A0A]"
              />
              <span>{language === 'mr' ? 'फक्त आज मोकळे असणारे' : 'Available Today Only'}</span>
            </label>
          </div>
        )}
      </div>

      {/* STEP 1: CATEGORY SELECTION CARDS (Progressive Disclosure) */}
      {activeTab === 'individual' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#0A0A0A] text-[#FDE047] text-xs font-black flex items-center justify-center">
                1
              </span>
              <h2 className="text-xs font-black text-[#0A0A0A] uppercase tracking-wide">
                {t('step1SelectCategory')}
              </h2>
            </div>
            {selectedTrade !== 'all' && (
              <button
                onClick={() => setSelectedTrade('all')}
                className="text-xs font-black text-[#0A0A0A] underline hover:text-neutral-700"
              >
                {t('clearFilters')}
              </button>
            )}
          </div>

          {/* Category Chips / Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {TRADE_CATEGORIES.map((cat) => {
              const isSelected = selectedTrade === cat.id;
              const title = cat.name[language] || cat.name.en;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTrade(cat.id)}
                  className={`p-3 rounded-[24px] text-center border-2 transition-all flex flex-col items-center justify-center gap-1.5 touch-target ${
                    isSelected
                      ? 'border-[#0A0A0A] bg-[#FEF08A] shadow-md ring-2 ring-[#0A0A0A]'
                      : 'border-neutral-200 bg-white hover:border-[#0A0A0A] hover:bg-neutral-50'
                  }`}
                >
                  <TradeCharacter trade={cat.trade} className="w-10 h-10" />
                  <span className="text-xs font-black text-[#0A0A0A] leading-tight mt-1">
                    {title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: WORKERS LIST / MULTI-COLUMN RESPONSIVE GRID */}
      {activeTab === 'individual' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#0A0A0A] text-[#FDE047] text-xs font-black flex items-center justify-center">
                2
              </span>
              <h2 className="text-xs font-black text-[#0A0A0A] uppercase tracking-wide">
                {t('step2ChooseWorker')} ({filteredWorkers.length})
              </h2>
            </div>
          </div>

          {/* Empty State */}
          {filteredWorkers.length === 0 ? (
            <div className="bg-white rounded-[32px] p-8 text-center border-2 border-dashed border-neutral-300 space-y-3">
              <StateCharacter state="thinking" className="w-20 h-20 mx-auto" />
              <h3 className="text-base font-black text-[#0A0A0A]">{t('noWorkersFound')}</h3>
              <p className="text-xs text-neutral-600 font-bold">
                Try switching to "All Trades" or unchecking "Available Today".
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 min-h-[48px] bg-[#0A0A0A] text-[#FDE047] font-black text-xs rounded-full hover:bg-neutral-800 transition-colors border-2 border-[#0A0A0A]"
              >
                {t('clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white rounded-[32px] border-2 border-[#0A0A0A] hover:border-[#FDE047] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  {/* Worker Card Top: Photo, Badge, Name, Trade */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-100 border-2 border-[#0A0A0A] flex items-center justify-center shrink-0">
                          <TradeCharacter trade={worker.trade} className="w-12 h-12" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-black text-[#0A0A0A] text-base leading-tight">
                              {worker.name}
                            </h3>
                            {worker.isAadhaarVerified && (
                              <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" title="Aadhaar Verified" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-600 font-bold flex items-center gap-1 mt-0.5">
                            <MapPin size={12} className="text-[#0A0A0A] shrink-0" />
                            <span className="truncate max-w-[140px]">{worker.naka}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-black text-[#0A0A0A] bg-[#FEF08A] px-2 py-0.5 rounded-full border border-[#0A0A0A] flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#0A0A0A]" />
                              <span>{worker.rating}</span>
                            </span>
                            <span className="text-[11px] text-neutral-600 font-bold">
                              {worker.experienceYears} {language === 'mr' ? 'वर्षे अनुभव' : 'yrs exp'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Wage Rate Tag */}
                      <div className="text-right shrink-0">
                        <div className="bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3 py-1 rounded-full text-xl font-black shadow-xs">
                          ₹{worker.baseWageAsk}
                        </div>
                        <div className="text-[10px] font-bold text-neutral-600 mt-0.5 pr-1">
                          /{language === 'mr' ? 'दिवस' : 'day'}
                        </div>
                      </div>
                    </div>

                    {/* Stats & Hours Worked */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t-2 border-neutral-100">
                      <div className="flex items-center gap-1.5 font-bold text-[#15803D] bg-[#DCFCE7] border border-[#15803D] px-2.5 py-1.5 rounded-full">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{worker.hoursWorkedTotal} hrs worked</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-neutral-800 bg-neutral-100 border border-neutral-300 px-2.5 py-1.5 rounded-full justify-end font-bold">
                        <Wrench className="w-3.5 h-3.5 shrink-0 text-neutral-700" />
                        <span className="truncate">{worker.ownedTools?.length || 0} tools</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {worker.tags && worker.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {worker.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Worker Card Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedWorkerDetail(worker)}
                      className="flex-1 py-3 min-h-[48px] bg-white hover:bg-neutral-100 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full text-xs transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>{t('viewProfile')}</span>
                    </button>

                    <button
                      onClick={() => handleSendOffer(worker)}
                      className="flex-1 py-3 min-h-[48px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Briefcase size={14} />
                      <span>{t('directHireBtn')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRE-FORMED TEAMS LIST */}
      {activeTab === 'teams' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeTeams.map((team) => (
              <div
                key={team.id}
                className="bg-white rounded-[32px] border-2 border-[#0A0A0A] hover:border-[#FDE047] p-5 shadow-sm space-y-4 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#0A0A0A]" />
                        <h3 className="font-black text-[#0A0A0A] text-base">
                          {team.name}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-600 font-bold mt-0.5">
                        {language === 'mr' ? 'प्रमुख:' : 'Leader:'} {team.leaderName}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3 py-1 rounded-full text-xl font-black shadow-xs">
                        ₹{team.totalTeamDailyRate}
                      </div>
                      <div className="text-[10px] font-bold text-neutral-600 mt-0.5 pr-1">
                        /{language === 'mr' ? 'संघ/दिवस' : 'crew/day'}
                      </div>
                    </div>
                  </div>

                  {/* Team Composition Breakdown */}
                  <div className="bg-neutral-50 p-4 rounded-[24px] border-2 border-neutral-200 space-y-2 text-xs">
                    <span className="font-black text-[#0A0A0A] text-[11px] uppercase tracking-wide">
                      {language === 'mr' ? 'संघातील कारागीर:' : 'Crew Roster:'}
                    </span>
                    {team.compositeTrades.map((comp, idx) => (
                      <div key={idx} className="flex justify-between text-neutral-800 text-xs">
                        <span className="font-medium">• {comp.workerName} ({comp.trade})</span>
                        <span className="font-black text-[#0A0A0A]">₹{comp.dailyRate}/day</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                    {team.description[language] || team.description.en}
                  </p>
                </div>

                <button
                  onClick={() => {
                    showToast(
                      language === 'mr'
                        ? `${team.name} संपूर्ण संघाला थेट कामाचा प्रस्ताव पाठवला!`
                        : `Crew booking request sent to ${team.name}!`,
                      'success'
                    );
                  }}
                  className="w-full min-h-[52px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full text-xs flex items-center justify-center gap-2 border-2 border-[#0A0A0A] shadow-md active:scale-95 transition-all touch-target"
                >
                  <Briefcase className="w-4 h-4 text-[#0A0A0A]" />
                  <span>{t('hireTeam')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WORKER DETAIL MODAL / PROGRESSIVE DISCLOSURE (Step 3) */}
      {selectedWorkerDetail && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[32px] p-6 sm:p-7 shadow-2xl border-2 border-[#0A0A0A] space-y-5 animate-slide-up my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b-2 border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 border-2 border-[#0A0A0A] flex items-center justify-center shrink-0">
                  <TradeCharacter trade={selectedWorkerDetail.trade} className="w-14 h-14" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-[#0A0A0A]">
                      {selectedWorkerDetail.name}
                    </h3>
                    {selectedWorkerDetail.isAadhaarVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] border border-[#15803D]">
                        <ShieldCheck size={12} /> Aadhaar Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 font-bold mt-0.5">
                    {selectedWorkerDetail.naka} • {selectedWorkerDetail.experienceYears} yrs experience
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedWorkerDetail(null)}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border-2 border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Audio Bio Voice Note */}
            {selectedWorkerDetail.audioBio && (
              <div className="p-4 bg-[#FEF08A]/40 rounded-[24px] border-2 border-[#0A0A0A] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-[#0A0A0A] tracking-wider">
                    Spoken Worker Intro (मराठी)
                  </span>
                  <p className="text-xs text-[#0A0A0A] font-bold italic">
                    "{selectedWorkerDetail.audioBio}"
                  </p>
                </div>
                <button
                  onClick={() => speakText(selectedWorkerDetail.audioBio)}
                  className="p-3 rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-neutral-800 shrink-0 shadow-sm"
                  title="Listen Voice Intro"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            )}

            {/* Work Photos Gallery */}
            {selectedWorkerDetail.workPhotos && selectedWorkerDetail.workPhotos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  {t('workPhotosTitle')} ({selectedWorkerDetail.workPhotos.length})
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedWorkerDetail.workPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="p-3 bg-neutral-50 rounded-[20px] border-2 border-[#0A0A0A] space-y-1.5"
                    >
                      <Camera className="w-6 h-6 text-[#0A0A0A]" />
                      <span className="text-xs font-black text-[#0A0A0A] block leading-tight">
                        {photo.label}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase">
                        {photo.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Owned Tools */}
            {selectedWorkerDetail.ownedTools && selectedWorkerDetail.ownedTools.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  {t('iHaveToolsTitle')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedWorkerDetail.ownedTools.map((tId) => (
                    <span
                      key={tId}
                      className="text-xs font-black px-3 py-1.5 rounded-full bg-neutral-100 border border-[#0A0A0A] text-[#0A0A0A] flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={12} className="text-[#15803D]" />
                      <span className="capitalize">{tId.replace('_', ' ')}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t-2 border-neutral-100 flex gap-2.5">
              <a
                href={`tel:${selectedWorkerDetail.phone}`}
                className="px-6 min-h-[56px] rounded-full bg-white hover:bg-neutral-100 border-2 border-[#0A0A0A] text-[#0A0A0A] font-black text-xs flex items-center justify-center gap-1.5 touch-target"
              >
                <Phone size={16} />
                <span>{t('contactWorker')}</span>
              </a>

              <button
                onClick={() => {
                  handleSendOffer(selectedWorkerDetail);
                  setSelectedWorkerDetail(null);
                }}
                className="flex-1 min-h-[56px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all touch-target"
              >
                <Briefcase size={16} />
                <span>{t('directHireBtn')} (₹{selectedWorkerDetail.baseWageAsk}/day)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
