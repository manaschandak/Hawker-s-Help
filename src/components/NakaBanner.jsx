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
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-3.5 shadow-sm">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500 text-white rounded-xl shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-sm">
                {t('nakaModeText')}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {t('workersActiveHere')}
            </p>
          </div>
        </div>

        <button
          className="p-1.5 rounded-lg text-slate-600 hover:bg-amber-100 transition-colors"
          aria-label="Expand naka details"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Naka Peer Details */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-amber-200/70 text-xs space-y-2">
          <div className="font-bold text-slate-800 flex items-center justify-between">
            <span>{language === 'mr' ? 'खोपोली नाक्यावरील कारागीर:' : 'Workers at Khopoli Naka:'}</span>
            <span className="text-[11px] text-amber-900 font-semibold">Total: 14</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {nakaWorkersSummary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/80 p-1.5 rounded-lg border border-amber-200 flex items-center justify-between text-slate-700"
              >
                <span>{item.icon} {item.trade}</span>
                <span className="font-bold text-slate-900">{item.count}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 italic pt-1">
            {language === 'mr'
              ? 'हे ॲप नाक्यावर बसूनच काम शोधण्यासाठी आहे. नाका सोडण्याची गरज नाही.'
              : 'Works alongside your naka chowk. No need to abandon your daily spot.'}
          </p>
        </div>
      )}
    </div>
  );
}
