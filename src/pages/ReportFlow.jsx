import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Mic,
  Camera,
  CheckCircle2,
  PhoneCall,
  X,
  FileCheck,
  AlertTriangle,
  Banknote,
  AlertCircle,
  FileText,
  Check
} from 'lucide-react';
import { HelpfulAdvocateCharacter } from '../components/Characters';

export default function ReportFlow({ isOpen, onClose, defaultJobId = null }) {
  const { submitGrievance, SAMPLE_DATA_DISCLAIMER, language, showToast, t } = useApp();

  const [step, setStep] = useState(1); // 1: Reason, 2: Evidence & Voice, 3: Case Generated
  const [selectedReason, setSelectedReason] = useState('wage_theft');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceRecordedDuration, setVoiceRecordedDuration] = useState(0);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [generatedCaseId, setGeneratedCaseId] = useState(null);
  const [detailsText, setDetailsText] = useState('');

  if (!isOpen) return null;

  const reasons = [
    {
      id: 'wage_theft',
      title: language === 'mr' ? 'काम झाल्यावर पैसे दिले नाहीत (मजुरी बुडवली)' : 'Did not pay me / Wage theft',
      iconType: 'banknote'
    },
    {
      id: 'asked_money',
      title: language === 'mr' ? 'कामासाठी आधी डिपॉझिट/पैसे मागितले' : 'Asked for money/deposit upfront',
      iconType: 'warning'
    },
    {
      id: 'unsafe_site',
      title: language === 'mr' ? 'धोकादायक काम / सुरक्षा साधने दिली नाहीत' : 'Unsafe work site / No safety gear',
      iconType: 'shield'
    },
    {
      id: 'harassment',
      title: language === 'mr' ? 'शिवीगाळ किंवा गैरवर्तन केले' : 'Harassment / Abusive behavior',
      iconType: 'danger'
    },
    {
      id: 'other',
      title: language === 'mr' ? 'इतर तक्रार' : 'Other grievance',
      iconType: 'file'
    }
  ];

  const renderReasonIcon = (type) => {
    switch (type) {
      case 'banknote': return <Banknote className="w-5 h-5 text-[#DC2626]" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-[#DC2626]" />;
      case 'shield': return <ShieldAlert className="w-5 h-5 text-[#DC2626]" />;
      case 'danger': return <AlertCircle className="w-5 h-5 text-[#DC2626]" />;
      default: return <FileText className="w-5 h-5 text-[#0A0A0A]" />;
    }
  };

  // Voice note toggle
  const handleToggleVoice = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setVoiceRecordedDuration(0);
      const timer = setInterval(() => {
        setVoiceRecordedDuration(prev => {
          if (prev >= 6) {
            clearInterval(timer);
            setIsRecordingVoice(false);
            setHasVoiceNote(true);
            return 6;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecordingVoice(false);
      setHasVoiceNote(true);
    }
  };

  const handleSubmit = () => {
    const reasonObj = reasons.find(r => r.id === selectedReason);
    const caseId = submitGrievance({
      jobId: defaultJobId || 'direct',
      reason: reasonObj?.title || selectedReason,
      hasVoiceNote
    });
    setGeneratedCaseId(caseId);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] border-2 border-[#0A0A0A] shadow-2xl p-6 overflow-y-auto max-h-[92vh] space-y-4">
        
        {/* Header with Advocate Character */}
        <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-3">
          <div className="flex items-center gap-3">
            <HelpfulAdvocateCharacter className="w-12 h-12 shrink-0" />
            <div>
              <h2 className="font-black text-[#0A0A0A] text-base leading-tight">
                {language === 'mr' ? 'तक्रार निवारण केंद्र' : 'Worker Grievance Cell'}
              </h2>
              <p className="text-xs text-neutral-600 font-bold">
                {language === 'mr' ? 'नाका कामगार हक्क व कायदेशीर संरक्षण' : 'Worker Protection Protocol'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Choose Grievance Reason */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs font-black text-[#0A0A0A]">
              {language === 'mr' ? 'काय समस्या झाली? कारण निवडा:' : 'What happened? Choose reason:'}
            </p>

            <div className="space-y-2">
              {reasons.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedReason(item.id)}
                  className={`w-full p-4 rounded-[24px] border-2 flex items-center gap-3 text-left transition-all touch-target active:scale-98 ${
                    selectedReason === item.id
                      ? 'border-[#DC2626] bg-[#FEE2E2] text-[#0A0A0A] font-black shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:border-[#0A0A0A]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-[#0A0A0A] flex items-center justify-center shrink-0">
                    {renderReasonIcon(item.iconType)}
                  </div>
                  <span className="text-xs flex-1 font-bold">{item.title}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 min-h-[56px] bg-[#DC2626] hover:bg-red-700 text-white font-black rounded-full shadow-lg border-2 border-[#0A0A0A] flex items-center justify-center gap-2 touch-target active:scale-95"
            >
              <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* STEP 2: Optional Voice Note & Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-[#0A0A0A] mb-1.5">
                {language === 'mr' ? 'काय घडले? थोडक्यात सांगा किंवा आवाजात रेकॉर्ड करा:' : 'Details or Voice Note:'}
              </label>
              <textarea
                rows={3}
                value={detailsText}
                onChange={(e) => setDetailsText(e.target.value)}
                placeholder={language === 'mr' ? 'उदा. काम पूर्ण झाल्यावर शेठ फोन उचलत नाही...' : 'Briefly describe what happened...'}
                className="w-full p-3.5 bg-white border-2 border-[#0A0A0A] rounded-[24px] text-xs font-bold text-[#0A0A0A] focus:outline-none"
              />
            </div>

            {/* Voice Note Recorder Simulator */}
            <div className="p-4 bg-neutral-50 border-2 border-[#0A0A0A] rounded-[24px] space-y-2.5">
              <div className="flex justify-between items-center text-xs font-black text-[#0A0A0A]">
                <span className="flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-[#0A0A0A]" />
                  <span>{language === 'mr' ? 'आवाजात तक्रार सांगा (Voice Note)' : 'Voice Message:'}</span>
                </span>
                {hasVoiceNote && (
                  <span className="text-[#15803D] font-black inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>0:06 {language === 'mr' ? 'रेकॉर्ड झाली' : 'Saved'}</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleToggleVoice}
                className={`w-full min-h-[52px] rounded-full font-black text-xs flex items-center justify-center gap-2 touch-target transition-all border-2 border-[#0A0A0A] ${
                  isRecordingVoice
                    ? 'bg-[#DC2626] text-white animate-pulse'
                    : hasVoiceNote
                    ? 'bg-[#DCFCE7] text-[#15803D]'
                    : 'bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A]'
                }`}
              >
                <Mic className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {isRecordingVoice
                    ? `रेकॉर्डिंग सुरू आहे... (${voiceRecordedDuration}s / टॅप करून थांबवा)`
                    : hasVoiceNote
                    ? 'पुन्हा रेकॉर्ड करा'
                    : 'माईक दाबून आवाजात बोला'}
                </span>
              </button>

              <p className="text-[11px] text-neutral-600 font-bold italic">
                {language === 'mr'
                  ? 'लिहिता येत नसल्यास फक्त आवाजात तक्रार नोंदवता येते.'
                  : 'Limited typing literacy? Just tap and speak your grievance.'}
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setStep(1)}
                className="min-h-[56px] px-6 border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] bg-white hover:bg-neutral-100"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 min-h-[56px] bg-[#DC2626] hover:bg-red-700 text-white font-black rounded-full shadow-lg border-2 border-[#0A0A0A] flex items-center justify-center gap-2 touch-target active:scale-95"
              >
                <span>{language === 'mr' ? 'तक्रार दाखल करा' : 'Submit Grievance'}</span>
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Case Generated & What Happens Next */}
        {step === 3 && (
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 bg-[#FEE2E2] text-[#DC2626] border-2 border-[#DC2626] rounded-full flex items-center justify-center mx-auto">
              <FileCheck className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-[#0A0A0A] text-lg">
                {language === 'mr' ? 'तक्रार अधिकृतरीत्या दाखल झाली!' : 'Grievance Registered!'}
              </h3>
              <p className="text-xs text-neutral-600 font-bold">
                {language === 'mr' ? 'तुमचा केस संदर्भ क्रमांक (Case ID):' : 'Official Case Reference ID:'}
              </p>
              <div className="font-mono font-black text-base text-[#991B1B] bg-[#FEE2E2] border-2 border-[#DC2626] py-1.5 px-4 rounded-full inline-block">
                {generatedCaseId}
              </div>
            </div>

            {/* What Happens Next Guide */}
            <div className="p-4 bg-neutral-50 border-2 border-[#0A0A0A] rounded-[24px] text-left space-y-2 text-xs text-neutral-800">
              <div className="font-black text-[#0A0A0A] text-xs">
                {language === 'mr' ? 'आता पुढे काय होईल? (What Happens Next):' : 'What Happens Next:'}
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-[11px] leading-relaxed font-bold">
                <li>
                  {language === 'mr'
                    ? 'नाका कामगार सुरक्षा सेल आणि स्थानिक कामगार प्रतिनिधीला तातडीने संदेश पाठवला गेला आहे.'
                    : 'The Naka Worker Protection Cell has been notified.'}
                </li>
                <li>
                  {language === 'mr'
                    ? 'संबंधित कंत्राटदार / मालकाचे प्रोफाइल तात्पुरते ब्लॉक करून चौकशी सुरू केली आहे.'
                    : 'The employer has been flagged and placed under review.'}
                </li>
                <li>
                  {language === 'mr'
                    ? 'आपल्याला कायदेशीर मदतीसाठी खालील हेल्पलाईनवर मोफत सल्ला मिळेल.'
                    : 'Free guidance is available via the sample helpline below.'}
                </li>
              </ul>
            </div>

            {/* Helpline Action */}
            <a
              href="tel:14434"
              className="w-full min-h-[52px] bg-[#15803D] hover:bg-green-700 text-white font-black rounded-full text-xs flex items-center justify-center gap-2 shadow-md touch-target no-underline"
            >
              <PhoneCall className="w-4 h-4 stroke-[2.5]" />
              <span>{language === 'mr' ? 'कामगार तक्रार निवारण केंद्रास कॉल करा (14434)' : 'Call Grievance Helpdesk (14434)'}</span>
            </a>

            <button
              onClick={onClose}
              className="w-full min-h-[48px] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black rounded-full text-xs hover:bg-neutral-100 touch-target"
            >
              {language === 'mr' ? 'बंद करा' : 'Done'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
