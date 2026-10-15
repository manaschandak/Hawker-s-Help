import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  Wrench,
  Utensils
} from 'lucide-react';

export default function JobCard({ job, onSelect }) {
  const { language, workerProfile, t } = useApp();

  const isSafe = job.safetyStatus === 'safe';
  const titleText = job.title[language] || job.title.en;

  // Check how many required tools the worker owns
  const toolsNeededCount = job.toolsNeeded?.length || 0;
  const ownedCount = job.toolsNeeded?.filter(toolId => workerProfile.ownedTools?.includes(toolId))?.length || 0;
  const allToolsOwned = toolsNeededCount === 0 || ownedCount === toolsNeededCount;

  // Trade visual icon
  const getTradeIcon = (trade) => {
    switch (trade) {
      case 'plumber': return '🔧';
      case 'electrician': return '⚡';
      case 'carpenter': return '🪚';
      case 'painter': return '🎨';
      case 'mason': return '🧱';
      case 'sweeper': return '🧹';
      case 'helper': return '👷';
      default: return '🛠️';
    }
  };

  return (
    <div
      onClick={() => onSelect(job)}
      className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] space-y-3"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(job);
      }}
    >
      {/* Top Header: Trade, Pay & Safety Indicator */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl p-2 bg-slate-100 rounded-xl" aria-hidden="true">
            {getTradeIcon(job.trade)}
          </span>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {job.startDate === 'Today'
                ? (language === 'mr' ? 'आजचे काम' : 'Today')
                : (language === 'mr' ? 'उद्याचे काम' : 'Tomorrow')}
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-1">
              {titleText}
            </h3>
          </div>
        </div>

        {/* Big Pay Rate */}
        <div className="text-right flex-shrink-0">
          <div className="text-lg font-black text-[#B45309]">
            ₹{job.payOffer}
          </div>
          <div className="text-[10px] font-bold text-slate-500">
            /{language === 'mr' ? 'दिवस' : 'day'}
          </div>
        </div>
      </div>

      {/* Middle Key Facts: Location, Hours, Employer */}
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{job.locationName}</span>
        </div>

        <div className="flex items-center gap-1.5 justify-end">
          <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="font-semibold text-slate-800">{job.hoursText}</span>
        </div>
      </div>

      {/* Safety Radar & Tools Row */}
      <div className="flex items-center justify-between pt-1 gap-2">
        {/* Safety Badge */}
        {isSafe ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black bg-emerald-50 text-emerald-800 border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('looksSafe')}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black bg-red-50 text-red-800 border border-red-300 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>{t('beCareful')}</span>
          </span>
        )}

        {/* Tools Status */}
        <div className="flex items-center gap-1.5 text-[11px]">
          {toolsNeededCount === 0 ? (
            <span className="text-slate-500 font-medium">
              {language === 'mr' ? 'अवजारे मालक देणार' : 'Tools provided'}
            </span>
          ) : (
            <span
              className={`font-bold px-2 py-0.5 rounded-md ${
                allToolsOwned
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {allToolsOwned
                ? (language === 'mr' ? 'तुमची अवजारे जुळतात ✓' : 'You have tools ✓')
                : `${ownedCount}/${toolsNeededCount} ${language === 'mr' ? 'अवजारे आहेत' : 'tools owned'}`}
            </span>
          )}

          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Warning Alert Note for Flagged Jobs */}
      {!isSafe && job.suspiciousFlags && (
        <div className="bg-red-50/90 border border-red-200 rounded-xl p-2 text-[11px] text-red-800 font-medium">
          ⚠️ {job.suspiciousFlags[0][language] || job.suspiciousFlags[0].en}
        </div>
      )}
    </div>
  );
}
