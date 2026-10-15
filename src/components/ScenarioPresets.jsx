import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';

export default function ScenarioPresets({ onSelectScenario }) {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const scenarios = [
    {
      id: 'negotiation',
      title: language === 'mr' ? '1-क्लिक: मजुरी बोलणी व विश्वासू कार्ड' : '1-Click: Wage Negotiation & Trust Card',
      subtitle: language === 'mr' ? 'सुनिता जोशी (घरमालक) सोबत दर निश्चित करा' : 'Negotiate ₹700/day with homeowner Sunita',
      icon: '🤝'
    },
    {
      id: 'scam_alert',
      title: language === 'mr' ? '1-क्लिक: संशयास्पद काम व सुरक्षा सूचना' : '1-Click: Flagged Suspicious Job Alert',
      subtitle: language === 'mr' ? '₹250 डिपॉझिट मागणारे बनावट काम ओळखा' : 'Spot scam contractor asking ₹250 upfront fee',
      icon: '🚨'
    },
    {
      id: 'clock_in_pay',
      title: language === 'mr' ? '1-क्लिक: हजेरी, हिशोब व 3-फेस रेटिंग' : '1-Click: Clock-in, Mark Paid & Rating',
      subtitle: language === 'mr' ? 'मालक भूमिकेतून तास मंजूर करा व पैसे द्या' : 'Employer view: approve 8 hrs & rate Ramesh',
      icon: '⏱️'
    },
    {
      id: 'welfare_checker',
      title: language === 'mr' ? '1-क्लिक: 3-प्रश्नांत सरकारी योजना पात्रता' : '1-Click: 3-Question Welfare Eligibility',
      subtitle: language === 'mr' ? 'BOCW, ई-श्रम व पेन्शन योजना पहा' : 'Instant scheme match with SAMPLE DATA tags',
      icon: '📜'
    }
  ];

  return (
    <div className="bg-slate-900 text-white px-3 py-2 text-xs border-b border-slate-700">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1.5 font-black text-amber-400">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{language === 'mr' ? 'परीक्षकांसाठी डेमो प्रसंग (Demo Scenarios)' : 'Hackathon Judge Demo Scenarios'}</span>
        </div>

        <button className="text-slate-400 hover:text-white">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 pt-2 border-t border-slate-800 space-y-1.5">
          {scenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => {
                onSelectScenario(sc.id);
                setIsOpen(false);
              }}
              className="w-full p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-left flex items-start gap-2.5 transition-colors border border-slate-700"
            >
              <span className="text-lg flex-shrink-0">{sc.icon}</span>
              <div className="flex-1 truncate">
                <div className="font-bold text-white text-xs truncate">{sc.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{sc.subtitle}</div>
              </div>
              <PlayCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
