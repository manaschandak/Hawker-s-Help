import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ChevronDown, ChevronUp, PlayCircle, ArrowRightLeft, AlertTriangle, Clock, Shield } from 'lucide-react';

export default function ScenarioPresets({ onSelectScenario }) {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const scenarios = [
    {
      id: 'negotiation',
      title: language === 'mr' ? '1-क्लिक: मजुरी बोलणी व विश्वासू कार्ड' : '1-Click: Wage Negotiation & Trust Card',
      subtitle: language === 'mr' ? 'सुनिता जोशी (घरमालक) सोबत दर निश्चित करा' : 'Negotiate ₹700/day with homeowner Sunita',
      icon: <ArrowRightLeft className="w-5 h-5 text-[#FDE047] stroke-[2.5]" />
    },
    {
      id: 'scam_alert',
      title: language === 'mr' ? '1-क्लिक: संशयास्पद काम व सुरक्षा सूचना' : '1-Click: Flagged Suspicious Job Alert',
      subtitle: language === 'mr' ? '₹250 डिपॉझिट मागणारे बनावट काम ओळखा' : 'Spot scam contractor asking ₹250 upfront fee',
      icon: <AlertTriangle className="w-5 h-5 text-[#DC2626] stroke-[2.5]" />
    },
    {
      id: 'clock_in_pay',
      title: language === 'mr' ? '1-क्लिक: हजेरी, हिशोब व 3-फेस रेटिंग' : '1-Click: Clock-in, Mark Paid & Rating',
      subtitle: language === 'mr' ? 'मालक भूमिकेतून तास मंजूर करा व पैसे द्या' : 'Employer view: approve 8 hrs & rate Ramesh',
      icon: <Clock className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
    },
    {
      id: 'welfare_checker',
      title: language === 'mr' ? '1-क्लिक: 3-प्रश्नांत सरकारी योजना पात्रता' : '1-Click: 3-Question Welfare Eligibility',
      subtitle: language === 'mr' ? 'BOCW, ई-श्रम व पेन्शन योजना पहा' : 'Instant scheme match with SAMPLE DATA tags',
      icon: <Shield className="w-5 h-5 text-blue-400 stroke-[2.5]" />
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-white px-3 py-2 text-xs border-b-2 border-neutral-800">
      <div
        className="flex items-center justify-between cursor-pointer select-none min-h-[40px]"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-2 font-black text-[#FDE047]">
          <Sparkles className="w-4 h-4 text-[#FDE047] stroke-[2.5]" />
          <span className="tracking-wide">{language === 'mr' ? 'परीक्षकांसाठी डेमो प्रसंग (Demo Scenarios)' : 'Hackathon Judge Demo Scenarios'}</span>
        </div>

        <button className="w-7 h-7 rounded-full bg-neutral-800 text-[#FDE047] flex items-center justify-center hover:bg-neutral-700" aria-label="Toggle demo scenarios">
          {isOpen ? <ChevronUp className="w-4 h-4 stroke-[2.5]" /> : <ChevronDown className="w-4 h-4 stroke-[2.5]" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2.5 pt-2.5 border-t border-neutral-800 space-y-2">
          {scenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => {
                onSelectScenario(sc.id);
                setIsOpen(false);
              }}
              className="w-full p-2.5 rounded-2xl bg-[#171717] hover:bg-neutral-800 text-left flex items-start gap-3 transition-colors border-2 border-neutral-700 hover:border-[#FDE047] active:scale-98"
            >
              <span className="text-xl flex-shrink-0 p-1.5 bg-[#0A0A0A] rounded-xl">{sc.icon}</span>
              <div className="flex-1 truncate">
                <div className="font-black text-white text-xs truncate">{sc.title}</div>
                <div className="text-[11px] text-neutral-400 font-medium truncate mt-0.5">{sc.subtitle}</div>
              </div>
              <PlayCircle className="w-5 h-5 text-[#FDE047] flex-shrink-0 mt-0.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
