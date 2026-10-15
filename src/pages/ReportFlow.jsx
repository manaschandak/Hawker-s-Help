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
  AlertTriangle
} from 'lucide-react';

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
      icon: '💸'
    },
    {
      id: 'asked_money',
      title: language === 'mr' ? 'कामासाठी आधी डिपॉझिट/पैसे मागितले' : 'Asked for money/deposit upfront',
      icon: '⚠️'
    },
    {
      id: 'unsafe_site',
      title: language === 'mr' ? 'धोकादायक काम / सुरक्षा साधने दिली नाहीत' : 'Unsafe work site / No safety gear',
      icon: '🚨'
    },
    {
      id: 'harassment',
      title: language === 'mr' ? 'शिवीगाळ किंवा गैरवर्तन केले' : 'Harassment / Abusive behavior',
      icon: '🛑'
    },
    {
      id: 'other',
      title: language === 'mr' ? 'इतर तक्रार' : 'Other grievance',
      icon: '📝'
    }
  ];

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
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl border-t-4 border-red-600 shadow-2xl p-5 overflow-y-auto max-h-[92vh] space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 text-red-700 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-sm">
                {language === 'mr' ? 'तक्रार नोंदणी केंद्र (Grievance Cell)' : 'File Grievance / Report'}
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">
                {language === 'mr' ? 'नाका कामगार हक्क व संरक्षण' : 'Worker Protection Protocol'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Choose Grievance Reason */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-700">
              {language === 'mr' ? 'काय समस्या झाली? कारण निवडा:' : 'What happened? Choose reason:'}
            </p>

            <div className="space-y-2">
              {reasons.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedReason(item.id)}
                  className={`w-full p-3 rounded-2xl border-2 flex items-center gap-3 text-left transition-all touch-target active:scale-98 ${
                    selectedReason === item.id
                      ? 'border-red-600 bg-red-50 text-slate-950 font-black shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs flex-1 font-bold">{item.title}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-2 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95"
            >
              <span>{language === 'mr' ? 'पुढे चला' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: Optional Voice Note & Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'mr' ? 'काय घडले? थोडक्यात सांगा किंवा आवाजात रेकॉर्ड करा:' : 'Details or Voice Note:'}
              </label>
              <textarea
                rows={3}
                value={detailsText}
                onChange={(e) => setDetailsText(e.target.value)}
                placeholder={language === 'mr' ? 'उदा. काम पूर्ण झाल्यावर शेठ फोन उचलत नाही...' : 'Briefly describe what happened...'}
                className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            {/* Voice Note Recorder Simulator */}
            <div className="p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>🎙️ {language === 'mr' ? 'आवाजात तक्रार सांगा (Voice Note)' : 'Voice Message:'}</span>
                {hasVoiceNote && (
                  <span className="text-emerald-700 font-bold">✓ 0:06 {language === 'mr' ? 'रेकॉर्ड झाली' : 'Saved'}</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleToggleVoice}
                className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 touch-target transition-all ${
                  isRecordingVoice
                    ? 'bg-red-600 text-white animate-pulse'
                    : hasVoiceNote
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-white border-2 border-slate-300 text-slate-800'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>
                  {isRecordingVoice
                    ? `रेकॉर्डिंग सुरू आहे... (${voiceRecordedDuration}s / टॅप करून थांबवा)`
                    : hasVoiceNote
                    ? 'पुन्हा रेकॉर्ड करा'
                    : 'माईक दाबून आवाजात बोला'}
                </span>
              </button>

              <p className="text-[10px] text-slate-500 italic">
                {language === 'mr'
                  ? 'लिहिता येत नसल्यास फक्त आवाजात तक्रार नोंदवता येते.'
                  : 'Limited typing literacy? Just tap and speak your grievance.'}
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95"
              >
                <span>{language === 'mr' ? 'तक्रार दाखल करा' : 'Submit Grievance'}</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Case Generated & What Happens Next */}
        {step === 3 && (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto">
              <FileCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-lg">
                {language === 'mr' ? 'तक्रार अधिकृतरीत्या दाखल झाली!' : 'Grievance Registered!'}
              </h3>
              <p className="text-xs text-slate-600">
                {language === 'mr' ? 'तुमचा केस संदर्भ क्रमांक (Case ID):' : 'Official Case Reference ID:'}
              </p>
              <div className="font-mono font-black text-base text-red-800 bg-red-50 border border-red-300 py-1.5 px-4 rounded-xl inline-block">
                {generatedCaseId}
              </div>
            </div>

            {/* What Happens Next Guide */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2 text-xs text-slate-700">
              <div className="font-black text-slate-900 text-xs">
                {language === 'mr' ? 'आता पुढे काय होईल? (What Happens Next):' : 'What Happens Next:'}
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-[11px] leading-relaxed">
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
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md touch-target block"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{language === 'mr' ? 'कामगार तक्रार निवारण केंद्रास कॉल करा (14434)' : 'Call Grievance Helpdesk (14434)'}</span>
            </a>

            <button
              onClick={onClose}
              className="w-full py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 touch-target"
            >
              {language === 'mr' ? 'बंद करा' : 'Done'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
