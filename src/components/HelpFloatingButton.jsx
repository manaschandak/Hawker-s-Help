import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, X, PhoneCall, ShieldAlert, FileText, ChevronRight } from 'lucide-react';

export default function HelpFloatingButton({ onOpenReport, onOpenRights }) {
  const { language, t, SAMPLE_DATA_DISCLAIMER } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 bg-red-600 hover:bg-red-700 text-white font-extrabold px-3.5 py-2.5 rounded-full shadow-2xl flex items-center gap-1.5 border-2 border-white active:scale-95 transition-transform"
        aria-label="Open emergency help and grievance support"
      >
        <AlertCircle className="w-5 h-5 animate-pulse" />
        <span className="text-xs">
          {language === 'mr' ? 'मदत / तक्रार' : language === 'hi' ? 'मदद / शिकायत' : 'Help'}
        </span>
      </button>

      {/* Slide-up Help Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border-t-4 border-red-600 shadow-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 text-red-700 rounded-xl">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">
                    {language === 'mr' ? 'मदत व तक्रार केंद्र' : 'Emergency Help & Rights'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {language === 'mr' ? 'नाका कामगार सुरक्षा व निवारण' : 'Naka Worker Protection'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2.5">
              {/* Option 1: File Grievance */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenReport();
                }}
                className="w-full p-3.5 bg-white border-2 border-slate-200 hover:border-red-400 rounded-2xl flex items-center justify-between text-left shadow-sm active:scale-98 transition-all touch-target"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900">
                      {language === 'mr' ? 'मजुरी बुडवली / गैरवर्तनाची तक्रार' : 'Report Wage Theft / Harassment'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'mr' ? 'पैसे मिळाले नाहीत किंवा धोकादायक काम' : 'File grievance with evidence'}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>

              {/* Option 2: Check Rights & Welfare */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenRights();
                }}
                className="w-full p-3.5 bg-white border-2 border-slate-200 hover:border-amber-400 rounded-2xl flex items-center justify-between text-left shadow-sm active:scale-98 transition-all touch-target"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📜</span>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900">
                      {language === 'mr' ? 'सरकारी योजना व हक्क' : 'Welfare Schemes & Cards'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'mr' ? 'BOCW, ई-श्रम, पेन्शन माहिती' : 'BOCW, e-Shram eligibility'}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>

              {/* Option 3: Call Sample Helpline */}
              <a
                href="tel:14434"
                className="w-full p-3.5 bg-emerald-50 border-2 border-emerald-300 hover:border-emerald-400 rounded-2xl flex items-center justify-between text-left shadow-sm active:scale-98 transition-all touch-target block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-xl">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-emerald-950 flex items-center gap-1.5">
                      <span>14434</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-200 text-emerald-900 rounded">
                        SAMPLE
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-800">
                      {language === 'mr' ? 'कामगार हेल्पलाईन (नमुना नंबर)' : 'Sample Labour Helpdesk'}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 underline">
                  {language === 'mr' ? 'कॉल करा' : 'Call'}
                </span>
              </a>
            </div>

            {/* Disclaimer */}
            <div className="p-2.5 bg-slate-100 rounded-xl text-[10px] text-slate-600 leading-relaxed border border-slate-200">
              {SAMPLE_DATA_DISCLAIMER[language] || SAMPLE_DATA_DISCLAIMER.en}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
