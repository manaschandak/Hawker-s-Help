import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import NegotiationSlider from '../components/NegotiationSlider';
import {
  ArrowLeft,
  Volume2,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Phone,
  CheckCircle2,
  Calendar,
  Utensils,
  Wrench,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function JobDetail({ job, onBack, onOpenReport }) {
  const { language, employers, acceptJob, workerProfile, speakText, t } = useApp();

  const employer = employers.find(e => e.id === job.employerId) || {
    name: job.employerName,
    type: 'Direct Employer',
    rating: 4.8,
    reviewsCount: 12,
    paidOnTimePercent: 95,
    verifiedBadge: true,
    jobsPostedCount: 5,
    reportedCount: 0,
    workerFeedback: 'काम वेळेवर पूर्ण झाले की लगेच पैसे दिले.'
  };

  const isSafe = job.safetyStatus === 'safe';
  const titleText = job.title[language] || job.title.en;
  const paymentTermsText = job.paymentTerms[language] || job.paymentTerms.en;

  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [agreedWage, setAgreedWage] = useState(job.payOffer);
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);
  const [contractId, setContractId] = useState(null);

  const handleReadAloud = () => {
    const text = language === 'mr'
      ? `कामाचे नाव: ${titleText}. ठिकाण: ${job.locationName}. मजुरी: ₹${job.payOffer} दिवस. कामाची वेळ: ${job.hoursText}. पैसे देण्याची पद्धत: ${paymentTermsText}.`
      : `Job title: ${titleText}. Location: ${job.locationName}. Wage: ₹${job.payOffer} per day. Hours: ${job.hoursText}. Payment terms: ${paymentTermsText}.`;
    speakText(text);
  };

  const handleTriggerAccept = (wage) => {
    setAgreedWage(wage);
    setIsAgreementModalOpen(true);
  };

  const handleFinalConfirm = () => {
    const mockId = `HH-KH-${Math.floor(1000 + Math.random() * 9000)}`;
    setContractId(mockId);
    acceptJob(job.id, agreedWage);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold flex items-center gap-1.5 shadow-sm active:scale-95 touch-target"
          aria-label="Back to jobs feed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-xs">{language === 'mr' ? 'मागे' : 'Back'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Audio Speaker */}
          <button
            onClick={handleReadAloud}
            className="p-2 rounded-xl bg-amber-50 text-[#B45309] border border-amber-200 hover:bg-amber-100 active:scale-95 touch-target"
            aria-label="Read terms aloud"
            title={t('speakReadAloud')}
          >
            <Volume2 className="w-5 h-5" />
          </button>

          {/* Report Button */}
          <button
            onClick={() => onOpenReport(job.id)}
            className="px-3 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 active:scale-95"
          >
            {language === 'mr' ? 'तक्रार करा' : 'Report'}
          </button>
        </div>
      </div>

      {/* Main Title & Rate Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {job.startDate === 'Today'
                ? (language === 'mr' ? 'आजचे काम' : 'Today')
                : (language === 'mr' ? 'उद्याचे काम' : 'Tomorrow')} • {job.durationDays} {language === 'mr' ? 'दिवस' : 'day'}
            </span>
            <h1 className="text-base font-black text-slate-900 leading-snug">
              {titleText}
            </h1>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-black text-[#B45309]">
              ₹{job.payOffer}
            </div>
            <div className="text-[11px] font-bold text-slate-500">
              /{language === 'mr' ? 'दिवस' : 'day'}
            </div>
          </div>
        </div>

        {/* Safety Badge */}
        <div>
          {isSafe ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-emerald-50 text-emerald-900 border border-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{t('looksSafe')} — {job.safetyNotes[language] || job.safetyNotes.en}</span>
            </div>
          ) : (
            <div className="p-3 bg-red-50 border-2 border-red-300 rounded-xl space-y-1.5 text-xs text-red-900 font-bold">
              <div className="flex items-center gap-1.5 text-red-700 font-black">
                <AlertTriangle className="w-4 h-4" />
                <span>{t('beCareful')} (सावध राहा)</span>
              </div>
              <p className="text-[11px] leading-relaxed font-medium">
                {job.safetyNotes[language] || job.safetyNotes.en}
              </p>
              {job.suspiciousFlags && (
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-red-800 font-normal">
                  {job.suspiciousFlags.map((flag, idx) => (
                    <li key={idx}>{flag[language] || flag.en}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Terms at a Glance */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          {t('termsAtGlance')}
        </h2>

        <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-800">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500">{language === 'mr' ? 'कामाचे ठिकाण' : 'Location'}</div>
            <div className="font-bold truncate flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.locationName}</span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500">{language === 'mr' ? 'कामाची वेळ' : 'Hours'}</div>
            <div className="font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.hoursText}</span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500">{language === 'mr' ? 'सुरक्षा व जेवण' : 'Food / Water'}</div>
            <div className="font-bold flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.isFoodProvided ? (language === 'mr' ? 'जेवण/चहा मिळेल ✓' : 'Food/Tea provided ✓') : (language === 'mr' ? 'स्वतः आणावे' : 'Bring own food')}</span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500">{language === 'mr' ? 'कामाचा कालावधी' : 'Duration'}</div>
            <div className="font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.durationDays} {language === 'mr' ? 'दिवस' : 'day(s)'}</span>
            </div>
          </div>
        </div>

        {/* Payment Terms Row */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
          <div className="text-[11px] font-bold text-amber-900">
            💰 {language === 'mr' ? 'पैसे देण्याची पद्धत व वेळ:' : 'Payment Terms:'}
          </div>
          <p className="text-xs font-semibold text-slate-900">
            {paymentTermsText}
          </p>
        </div>

        {/* Tools Needed Checklist */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>{t('toolsNeeded')}:</span>
            <span className="text-[11px] text-slate-500">
              {job.toolsNeeded?.length === 0 ? t('toolsProvided') : `${job.toolsNeeded?.length} required`}
            </span>
          </div>

          {job.toolsNeeded && job.toolsNeeded.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {job.toolsNeeded.map(toolId => {
                const ownsTool = workerProfile.ownedTools?.includes(toolId);
                return (
                  <span
                    key={toolId}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      ownsTool
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}
                  >
                    <span>{ownsTool ? '✓' : '⚠️'}</span>
                    <span className="capitalize">{toolId.replace('_', ' ')}</span>
                    <span className="text-[10px] opacity-75 font-normal">
                      {ownsTool ? (language === 'mr' ? '(तुमच्याकडे आहे)' : '(you have)') : (language === 'mr' ? '(आवश्यक)' : '(needed)')}
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
              ✓ {language === 'mr' ? 'सर्व अवजारे कामाच्या ठिकाणी मालक देणार आहेत.' : 'All necessary tools will be provided on site.'}
            </div>
          )}
        </div>
      </div>

      {/* Employer Trust Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            {t('employerTrustScore')}
          </h2>
          {employer.verifiedBadge && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('verifiedEmployer')}</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              {employer.name}
            </h3>
            <p className="text-xs text-slate-500">
              {employer.type} • {employer.location}
            </p>
          </div>

          <a
            href={`tel:${employer.phone}`}
            className="p-2.5 bg-slate-900 text-white rounded-xl shadow-sm hover:bg-slate-800 active:scale-95 touch-target flex items-center gap-1.5 text-xs font-bold"
            aria-label="Call employer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'कॉल' : 'Call'}</span>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 text-center text-xs">
          <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-black text-emerald-700 text-sm">
              {employer.paidOnTimePercent}%
            </div>
            <div className="text-[10px] text-slate-500 font-semibold">{t('paidOnTime')}</div>
          </div>

          <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-black text-slate-900 text-sm">
              ★ {employer.rating}
            </div>
            <div className="text-[10px] text-slate-500 font-semibold">({employer.reviewsCount} reviews)</div>
          </div>

          <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-black text-slate-900 text-sm">
              {employer.jobsPostedCount}
            </div>
            <div className="text-[10px] text-slate-500 font-semibold">{language === 'mr' ? 'दिलेली कामे' : 'Jobs Posted'}</div>
          </div>
        </div>

        {/* Worker Feedback Quote */}
        {employer.workerFeedback && (
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs italic text-slate-700">
            💬 "{employer.workerFeedback}"
          </div>
        )}
      </div>

      {/* CORE FEATURE: Interactive Wage Negotiation Slider */}
      <NegotiationSlider
        job={job}
        onAcceptAgreedPay={handleTriggerAccept}
      />

      {/* Agreement & Confirmation Modal */}
      {isAgreementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-white rounded-t-3xl sm:rounded-3xl border-t-4 border-[#B45309] shadow-2xl p-5 space-y-4">
            
            {!contractId ? (
              <>
                <div className="text-center space-y-1">
                  <h3 className="font-black text-slate-900 text-lg">
                    {language === 'mr' ? 'कामाची खात्री व अटी स्वीकृती' : 'Confirm & Commit Terms'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {language === 'mr' ? 'दोन्ही बाजूंच्या सुरक्षिततेसाठी अटी तपासा' : 'Review terms before final commitment'}
                  </p>
                </div>

                {/* Summary Terms Card */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-800">
                  <div className="flex justify-between font-bold">
                    <span>{language === 'mr' ? 'निश्चित मजुरी:' : 'Agreed Wage:'}</span>
                    <span className="text-[#B45309] font-black text-base">₹{agreedWage} / {language === 'mr' ? 'दिवस' : 'day'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'mr' ? 'वेळ व दिनांक:' : 'Time & Date:'}</span>
                    <span className="font-semibold">{job.startDate} • {job.hoursText}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'mr' ? 'पैसे मिळण्याची वेळ:' : 'Payment Mode:'}</span>
                    <span className="font-semibold">{paymentTermsText}</span>
                  </div>
                </div>

                {/* Mutual Trust Checkbox */}
                <label className="flex items-start gap-2.5 p-2 bg-amber-50 border border-amber-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAgreedTerms}
                    onChange={(e) => setHasAgreedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#B45309] rounded border-slate-300 focus:ring-[#B45309]"
                  />
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    {language === 'mr'
                      ? 'मी या अटी वाचल्या आहेत आणि कामाच्या वेळेवर हजर राहण्याचे मान्य करतो.'
                      : 'I agree to these terms and confirm availability on the scheduled date.'}
                  </span>
                </label>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setIsAgreementModalOpen(false)}
                    className="py-3 px-4 border border-slate-300 rounded-2xl text-xs font-bold text-slate-700 bg-white touch-target"
                  >
                    {language === 'mr' ? 'रद्द करा' : 'Cancel'}
                  </button>

                  <button
                    disabled={!hasAgreedTerms}
                    onClick={handleFinalConfirm}
                    className={`flex-1 py-3.5 px-4 font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target transition-all ${
                      hasAgreedTerms
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{language === 'mr' ? 'काम निश्चित करा' : 'Confirm Booking'}</span>
                  </button>
                </div>
              </>
            ) : (
              /* Success Contract Screen */
              <div className="text-center space-y-3 py-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 text-lg">
                    {language === 'mr' ? 'काम यशस्वीरित्या बुक झाले!' : 'Job Confirmed & Booked!'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {language === 'mr' ? 'कामाचा नोंदणी क्रमांक (Contract ID):' : 'Job Contract ID:'}
                  </p>
                  <div className="font-black text-sm text-slate-900 bg-slate-100 py-1 px-3 rounded-lg inline-block border border-slate-300">
                    #{contractId}
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
                  {language === 'mr'
                    ? 'तुमची उपलब्धता आपोआप "व्यस्त" करण्यात आली आहे, जेणेकरून वेळेचा गोंधळ होणार नाही.'
                    : 'Your status is now automatically marked Busy for this date to prevent conflicting bookings.'}
                </div>

                <button
                  onClick={() => {
                    setIsAgreementModalOpen(false);
                    onBack();
                  }}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-md touch-target active:scale-95 transition-transform"
                >
                  {language === 'mr' ? 'माझ्या कामांवर जा' : 'Done & Return to Feed'}
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
