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
import { TradeCharacter, StateCharacter } from './Characters';

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
      className="bg-white rounded-[32px] border-2 border-[#0A0A0A] hover:border-[#FDE047] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] space-y-3.5"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(job);
      }}
    >
      {/* Top Header: Trade, Pay & Safety Indicator */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <TradeCharacter trade={job.trade} className="w-13 h-13 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-black text-neutral-500 uppercase tracking-wider">
              {job.startDate === 'Today'
                ? (language === 'mr' ? 'आजचे काम' : 'Today')
                : (language === 'mr' ? 'उद्याचे काम' : 'Tomorrow')}
            </div>
            <h3 className="font-black text-[#0A0A0A] text-base leading-snug line-clamp-1">
              {titleText}
            </h3>
          </div>
        </div>

        {/* Big Pay Rate: 20px+ bold with solid Cyber Yellow background */}
        <div className="flex flex-col items-end flex-shrink-0">
          <div className="bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3 py-1 rounded-full text-xl font-black shadow-xs">
            ₹{job.payOffer}
          </div>
          <div className="text-[11px] font-bold text-neutral-600 mt-0.5 pr-1">
            /{language === 'mr' ? 'दिवस' : 'day'}
          </div>
        </div>
      </div>

      {/* Middle Key Facts: Location, Hours, Employer */}
      <div className="grid grid-cols-2 gap-2 text-sm text-neutral-700 pt-2 border-t-2 border-neutral-100">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-4 h-4 text-neutral-900 flex-shrink-0" />
          <span className="truncate font-medium">{job.locationName}</span>
        </div>

        <div className="flex items-center gap-1.5 justify-end">
          <Clock className="w-4 h-4 text-neutral-900 flex-shrink-0" />
          <span className="font-bold text-[#0A0A0A] text-sm">{job.hoursText}</span>
        </div>
      </div>

      {/* Safety Radar & Tools Row */}
      <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
        {/* Safety Badge - Solid Backgrounds */}
        {isSafe ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-[#DCFCE7] text-[#15803D] border-2 border-[#15803D]">
            <ShieldCheck className="w-4 h-4 text-[#15803D] stroke-[2.5]" />
            <span>{t('looksSafe')}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-[#FEE2E2] text-[#DC2626] border-2 border-[#DC2626]">
            <AlertTriangle className="w-4 h-4 text-[#DC2626] stroke-[2.5]" />
            <span>{t('beCareful')}</span>
          </span>
        )}

        {/* Tools Status */}
        <div className="flex items-center gap-1.5 text-xs">
          {toolsNeededCount === 0 ? (
            <span className="text-neutral-600 font-bold bg-neutral-100 border border-neutral-300 px-2.5 py-1 rounded-full">
              {language === 'mr' ? 'अवजारे मालक देणार' : 'Tools provided'}
            </span>
          ) : (
            <span
              className={`font-black px-2.5 py-1 rounded-full border-2 ${
                allToolsOwned
                  ? 'bg-[#DCFCE7] text-[#15803D] border-[#15803D]'
                  : 'bg-amber-100 text-[#0A0A0A] border-amber-400'
              }`}
            >
              {allToolsOwned
                ? (language === 'mr' ? 'तुमची अवजारे जुळतात ✓' : 'You have tools ✓')
                : `${ownedCount}/${toolsNeededCount} ${language === 'mr' ? 'अवजारे आहेत' : 'tools owned'}`}
            </span>
          )}

          <ChevronRight className="w-4 h-4 text-neutral-900" />
        </div>
      </div>

      {/* Warning Alert Note for Flagged Jobs */}
      {!isSafe && job.suspiciousFlags && (
        <div className="bg-[#FEE2E2] border-2 border-[#DC2626] rounded-2xl p-3 text-xs text-[#991B1B] font-bold flex items-center gap-3">
          <StateCharacter state="concerned" className="w-10 h-10 flex-shrink-0" />
          <span className="flex-1">⚠️ {job.suspiciousFlags[0][language] || job.suspiciousFlags[0].en}</span>
        </div>
      )}
    </div>
  );
}
