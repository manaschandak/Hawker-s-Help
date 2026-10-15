import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Users, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function NakaBanner() {
  const { language, t } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const nakaWorkersSummary = [
    { trade: 'Plumbers', count: 3, icon: '🔧' },
    { trade: 'Electricians', count: 2, icon: '⚡' },
    { trade: 'Painters', count: 3, icon: '🎨' },
    { trade: 'Masons', count: 2, icon: '🧱' },
    { trade: 'Helpers', count: 4, icon: '👷' },
  ];

  return (
    <div className="bg-[#FDE047] border-2 border-[#0A0A0A] rounded-[32px] p-4 text-[#0A0A0A] shadow-md">
      <div
        className="flex items-center justify-between cursor-pointer min-h-[48px]"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#0A0A0A] text-[#FDE047] rounded-2xl shadow-xs">
            <MapPin className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-[#0A0A0A] text-base leading-tight">
                {t('nakaModeText')}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-black bg-[#0A0A0A] text-[#FDE047]">
                LIVE
              </span>
            </div>
            <p className="text-xs text-neutral-800 font-bold mt-0.5">
              {t('workersActiveHere')}
            </p>
          </div>
        </div>

        <button
          className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
          aria-label="Expand naka details"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5 stroke-[2.5]" /> : <ChevronDown className="w-5 h-5 stroke-[2.5]" />}
        </button>
      </div>

      {/* Expanded Naka Peer Details */}
      {isExpanded && (
        <div className="mt-3.5 pt-3.5 border-t-2 border-[#0A0A0A]/20 text-xs space-y-2.5">
          <div className="font-black text-[#0A0A0A] flex items-center justify-between text-sm">
            <span>{language === 'mr' ? 'खोपोली नाक्यावरील कारागीर:' : 'Workers at Khopoli Naka:'}</span>
            <span className="text-xs text-white bg-[#0A0A0A] font-black px-2.5 py-0.5 rounded-full">Total: 14</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {nakaWorkersSummary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-2 rounded-2xl border-2 border-[#0A0A0A] flex items-center justify-between text-[#0A0A0A]"
              >
                <span className="font-bold text-xs">{item.icon} {item.trade}</span>
                <span className="font-black text-sm bg-neutral-100 px-2 py-0.5 rounded-lg border border-neutral-300">{item.count}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-neutral-900 font-semibold italic pt-1">
            {language === 'mr'
              ? 'हे ॲप नाक्यावर बसूनच काम शोधण्यासाठी आहे. नाका सोडण्याची गरज नाही.'
              : 'Works alongside your naka chowk. No need to abandon your daily spot.'}
          </p>
        </div>
      )}
    </div>
  );
}
