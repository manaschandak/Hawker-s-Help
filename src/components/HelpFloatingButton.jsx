import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, X, PhoneCall, ShieldAlert, FileText, ChevronRight } from 'lucide-react';
import { HelpfulAdvocateCharacter } from './Characters';

export default function HelpFloatingButton({ onOpenReport, onOpenRights }) {
  const { language, t, SAMPLE_DATA_DISCLAIMER } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 bg-[#DC2626] hover:bg-red-700 text-white font-black min-h-[56px] px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border-2 border-[#0A0A0A] active:scale-95 transition-transform text-sm"
        aria-label="Open emergency help and grievance support"
      >
        <AlertCircle className="w-5 h-5 stroke-[2.5] animate-pulse" />
        <span>
          {language === 'mr' ? 'मदत / तक्रार' : language === 'hi' ? 'मदद / शिकायत' : 'Help'}
        </span>
      </button>

      {/* Slide-up Help Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-white rounded-t-[32px] sm:rounded-[32px] border-4 border-[#0A0A0A] shadow-2xl p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-3">
              <div className="flex items-center gap-3">
                <HelpfulAdvocateCharacter className="w-13 h-13 flex-shrink-0" />
                <div>
                  <h3 className="font-black text-[#0A0A0A] text-base leading-tight">
                    {language === 'mr' ? 'मदत व तक्रार केंद्र' : 'Emergency Help & Rights'}
                  </h3>
                  <p className="text-xs text-neutral-600 font-bold">
                    {language === 'mr' ? 'नाका कामगार सुरक्षा व निवारण' : 'Naka Worker Protection'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border-2 border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] font-black"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              {/* Option 1: File Grievance */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenReport();
                }}
                className="w-full min-h-[56px] p-4 bg-white border-2 border-[#0A0A0A] hover:border-[#DC2626] rounded-[24px] flex items-center justify-between text-left shadow-sm active:scale-98 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-[#FEE2E2] rounded-xl border border-red-200 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-[#DC2626] stroke-[2.5]" />
                  </span>
                  <div>
                    <div className="font-black text-sm text-[#0A0A0A]">
                      {language === 'mr' ? 'मजुरी बुडवली / गैरवर्तनाची तक्रार' : 'Report Wage Theft / Harassment'}
                    </div>
                    <div className="text-xs text-neutral-600 font-medium">
                      {language === 'mr' ? 'पैसे मिळाले नाहीत किंवा धोकादायक काम' : 'File grievance with evidence'}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
              </button>

              {/* Option 2: Check Rights & Welfare */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenRights();
                }}
                className="w-full min-h-[56px] p-4 bg-white border-2 border-[#0A0A0A] hover:border-[#FDE047] rounded-[24px] flex items-center justify-between text-left shadow-sm active:scale-98 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-[#FDE047] rounded-xl border-2 border-[#0A0A0A] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
                  </span>
                  <div>
                    <div className="font-black text-sm text-[#0A0A0A]">
                      {language === 'mr' ? 'सरकारी योजना व हक्क' : 'Welfare Schemes & Cards'}
                    </div>
                    <div className="text-xs text-neutral-600 font-medium">
                      {language === 'mr' ? 'BOCW, ई-श्रम, पेन्शन माहिती' : 'BOCW, e-Shram eligibility'}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
              </button>

              {/* Option 3: Call Sample Helpline */}
              <a
                href="tel:14434"
                className="w-full min-h-[56px] p-4 bg-[#DCFCE7] border-2 border-[#15803D] hover:bg-emerald-100 rounded-[24px] flex items-center justify-between text-left shadow-sm active:scale-98 transition-all block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#15803D] text-white rounded-xl">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black text-sm text-[#15803D] flex items-center gap-2">
                      <span className="text-base font-black">14434</span>
                      <span className="text-[11px] font-black px-2 py-0.5 bg-[#15803D] text-white rounded-full">
                        SAMPLE
                      </span>
                    </div>
                    <div className="text-xs text-[#15803D] font-bold">
                      {language === 'mr' ? 'कामगार हेल्पलाईन (नमुना नंबर)' : 'Sample Labour Helpdesk'}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-black text-[#15803D] underline">
                  {language === 'mr' ? 'कॉल करा' : 'Call'}
                </span>
              </a>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-neutral-100 rounded-2xl text-xs text-neutral-700 font-medium leading-relaxed border border-neutral-300">
              {SAMPLE_DATA_DISCLAIMER[language] || SAMPLE_DATA_DISCLAIMER.en}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
