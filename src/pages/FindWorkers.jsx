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
  Volume2
} from 'lucide-react';
import { formatDistance } from '../utils/distance';

// Trade categories with icons and descriptions
const TRADE_CATEGORIES = [
  { id: 'all', icon: '👷🏽‍♂️', name: { en: 'All Trades', hi: 'सभी कार्य', mr: 'सर्व व्यवसाय' }, count: 8 },
  { id: 'plumber', icon: '🔧', name: { en: 'Plumber', hi: 'प्लंबर', mr: 'प्लंबर' }, count: 2 },
  { id: 'electrician', icon: '⚡', name: { en: 'Electrician', hi: 'इलेक्ट्रीशियन', mr: 'इलेक्ट्रिशियन' }, count: 1 },
  { id: 'carpenter', icon: '🪚', name: { en: 'Carpenter', hi: 'बढ़ई', mr: 'सुतार' }, count: 1 },
  { id: 'painter', icon: '🎨', name: { en: 'Painter', hi: 'पेंटर', mr: 'पेंटर' }, count: 1 },
  { id: 'mason', icon: '🧱', name: { en: 'Mason (Mistri)', hi: 'राजमिस्त्री', mr: 'गवंडी' }, count: 1 },
  { id: 'helper', icon: '📦', name: { en: 'General Helper', hi: 'हेल्पर / मजदूरी', mr: 'मदतनीस' }, count: 2 },
  { id: 'sweeper', icon: '🧹', name: { en: 'Deep Cleaner', hi: 'सफाईकर्मी', mr: 'सफाई कामगार' }, count: 1 }
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
      <div className="p-8 text-center bg-white rounded-3xl border-2 border-red-200 shadow-md space-y-4 my-6 max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-black text-slate-900">Unable to load worker directory</h2>
        <p className="text-xs text-slate-600">
          A temporary data mismatch occurred while loading profiles.
        </p>
        <button
          onClick={handleResetFilters}
          className="px-5 py-2.5 bg-[#B45309] text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 mx-auto"
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
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#B45309] text-xs font-black uppercase tracking-wider mb-1">
              <span>Naka Verified Wagers</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('findWorkersTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {language === 'mr'
                ? 'खोपोली, खालापूर व कर्जत नाक्यावरील कुशल कारागीर — थेट संपर्क, ०% कमिशन'
                : 'Direct hire from Khopoli, Khalapur & Karjat chowks — 0% commission'}
            </p>
          </div>

          {/* Toggle: Individual Workers vs Pre-formed Teams */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-black border border-slate-200 shrink-0">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'individual'
                  ? 'bg-white text-slate-900 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👷🏽‍♂️</span>
              <span>{language === 'mr' ? 'वैयक्तिक कारागीर' : 'Individual Workers'}</span>
              <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded-full">
                {safeWorkers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('teams')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'teams'
                  ? 'bg-white text-slate-900 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👥</span>
              <span>{language === 'mr' ? 'कामगार संघ' : 'Pre-formed Teams'}</span>
              <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded-full">
                {safeTeams.length}
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar & Fast Filters */}
        {activeTab === 'individual' && (
          <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={
                  language === 'mr'
                    ? 'नाव, व्यवसाय किंवा नाका शोधा...'
                    : 'Search by worker name, trade, or naka...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#B45309] text-xs font-semibold text-slate-900 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 shrink-0">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 text-[#B45309] rounded border-slate-300 focus:ring-[#B45309]"
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
              <span className="w-6 h-6 rounded-full bg-[#B45309] text-white text-xs font-black flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                {t('step1SelectCategory')}
              </h2>
            </div>
            {selectedTrade !== 'all' && (
              <button
                onClick={() => setSelectedTrade('all')}
                className="text-xs font-bold text-[#B45309] hover:underline"
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
                  className={`p-3 rounded-2xl text-center border-2 transition-all flex flex-col items-center justify-center gap-1.5 touch-target ${
                    isSelected
                      ? 'border-[#B45309] bg-amber-50 shadow-md ring-2 ring-amber-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-black text-slate-900 leading-tight">
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
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                {t('step2ChooseWorker')} ({filteredWorkers.length})
              </h2>
            </div>
          </div>

          {/* Empty State */}
          {filteredWorkers.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border-2 border-dashed border-slate-200 space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="text-base font-black text-slate-900">{t('noWorkersFound')}</h3>
              <p className="text-xs text-slate-500">
                Try switching to "All Trades" or unchecking "Available Today".
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
              >
                {t('clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white rounded-3xl border-2 border-slate-200 hover:border-[#B45309] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  {/* Worker Card Top: Photo, Badge, Name, Trade */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shadow-inner shrink-0">
                          👨🏽‍🔧
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-black text-slate-900 text-base leading-tight">
                              {worker.name}
                            </h3>
                            {worker.isAadhaarVerified && (
                              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Aadhaar Verified" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                            <MapPin size={12} className="text-[#B45309] shrink-0" />
                            <span className="truncate max-w-[140px]">{worker.naka}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-black text-amber-950 bg-amber-100 px-2 py-0.5 rounded-md">
                              ★ {worker.rating}
                            </span>
                            <span className="text-[11px] text-slate-500 font-bold">
                              {worker.experienceYears} {language === 'mr' ? 'वर्षे अनुभव' : 'yrs exp'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Wage Rate Tag */}
                      <div className="text-right shrink-0">
                        <div className="text-xl font-black text-[#B45309]">
                          ₹{worker.baseWageAsk}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400">
                          /{language === 'mr' ? 'दिवस' : 'day'}
                        </div>
                      </div>
                    </div>

                    {/* Stats & Hours Worked */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-xl">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{worker.hoursWorkedTotal} hrs worked</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-xl justify-end">
                        <Wrench className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                        <span className="truncate">{worker.ownedTools?.length || 0} tools</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {worker.tags && worker.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {worker.tags.slice(0, 2).map((tg, i) => (
                          <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {tg}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions: View Details + Direct Hire */}
                  <div className="pt-2 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => setSelectedWorkerDetail(worker)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1 transition-colors touch-target"
                      title="View details"
                    >
                      <span>{t('viewProfileBtn')}</span>
                    </button>

                    <button
                      onClick={() => handleSendOffer(worker)}
                      className="flex-1 py-2.5 bg-[#B45309] hover:bg-[#92400E] text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all touch-target"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>{t('directHireBtn')}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PRE-FORMED TEAMS LIST */}
      {activeTab === 'teams' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {safeTeams.map((team) => (
              <div
                key={team.id}
                className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#B45309] p-5 shadow-sm space-y-4 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl">👥</span>
                        <h3 className="font-black text-slate-900 text-base">
                          {team.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        {language === 'mr' ? 'प्रमुख:' : 'Leader:'} {team.leaderName}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black text-[#B45309]">
                        ₹{team.totalTeamDailyRate}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">
                        /{language === 'mr' ? 'संघ/दिवस' : 'crew/day'}
                      </div>
                    </div>
                  </div>

                  {/* Team Composition Breakdown */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <span className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wide">
                      {language === 'mr' ? 'संघातील कारागीर:' : 'Crew Roster:'}
                    </span>
                    {team.compositeTrades.map((comp, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700 text-xs">
                        <span className="font-medium">• {comp.workerName} ({comp.trade})</span>
                        <span className="font-black text-slate-900">₹{comp.dailyRate}/day</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
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
                  className="w-full py-3 bg-slate-900 hover:bg-[#B45309] text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all touch-target"
                >
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>{t('hireTeam')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WORKER DETAIL MODAL / PROGRESSIVE DISCLOSURE (Step 3) */}
      {selectedWorkerDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-slate-200 space-y-5 animate-slide-up my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shadow-sm">
                  👨🏽‍🔧
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">
                      {selectedWorkerDetail.name}
                    </h3>
                    {selectedWorkerDetail.isAadhaarVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <ShieldCheck size={12} /> Aadhaar Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedWorkerDetail.naka} • {selectedWorkerDetail.experienceYears} yrs experience
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedWorkerDetail(null)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Audio Bio Voice Note */}
            {selectedWorkerDetail.audioBio && (
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase text-[#B45309] tracking-wider">
                    Spoken Worker Intro (मराठी)
                  </span>
                  <p className="text-xs text-slate-800 font-semibold italic">
                    "{selectedWorkerDetail.audioBio}"
                  </p>
                </div>
                <button
                  onClick={() => speakText(selectedWorkerDetail.audioBio)}
                  className="p-2.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white shrink-0 shadow-sm"
                  title="Listen Voice Intro"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            )}

            {/* Work Photos Gallery */}
            {selectedWorkerDetail.workPhotos && selectedWorkerDetail.workPhotos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {t('workPhotosTitle')} ({selectedWorkerDetail.workPhotos.length})
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedWorkerDetail.workPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 hover:border-[#B45309] transition-colors"
                    >
                      <div className="text-2xl">📸</div>
                      <span className="text-xs font-black text-slate-900 block leading-tight">
                        {photo.label}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
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
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {t('iHaveToolsTitle')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedWorkerDetail.ownedTools.map((tId) => (
                    <span
                      key={tId}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={12} className="text-[#B45309]" />
                      <span className="capitalize">{tId.replace('_', ' ')}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex gap-2.5">
              <a
                href={`tel:${selectedWorkerDetail.phone}`}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs flex items-center justify-center gap-1.5 touch-target"
              >
                <Phone size={16} />
                <span>{t('contactWorker')}</span>
              </a>

              <button
                onClick={() => {
                  handleSendOffer(selectedWorkerDetail);
                  setSelectedWorkerDetail(null);
                }}
                className="flex-1 py-3 bg-[#B45309] hover:bg-[#92400E] text-white font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all touch-target"
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
