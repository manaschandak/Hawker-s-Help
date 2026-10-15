import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FileText,
  Star,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { StateCharacter, TradeCharacter } from '../components/Characters';

export default function JobDetail({ job, onBack, onOpenReport }) {
  const navigate = useNavigate();
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
    const mockId = `NK-KH-${Math.floor(1000 + Math.random() * 9000)}`;
    setContractId(mockId);
    acceptJob(job.id, agreedWage);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* 1. Sticky Navigation & Audio Readout */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-[#0A0A0A] font-black text-xs text-[#0A0A0A] shadow-xs active:scale-95"
        >
          <ArrowLeft size={16} className="stroke-[2.5]" />
          <span>{language === 'mr' ? 'मागे जा' : 'Back to Jobs'}</span>
        </button>

        <button
          onClick={handleReadAloud}
          className="px-4 py-2.5 bg-[#FDE047] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black rounded-full flex items-center gap-1.5 text-xs shadow-xs active:scale-95"
        >
          <Volume2 className="w-4 h-4 stroke-[2.5]" />
          <span>{t('speakReadAloud')}</span>
        </button>
      </div>

      {/* 2. Flagged Suspicious Job Alert Banner with Concerned Character */}
      {!isSafe && (
        <div className="bg-[#FEE2E2] border-3 border-[#DC2626] rounded-[32px] p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <StateCharacter state="concerned" className="w-14 h-14 flex-shrink-0" />
            <div>
              <div className="inline-block bg-[#DC2626] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                SAFETY WARNING • सावधान
              </div>
              <h2 className="text-base font-black text-[#991B1B] mt-0.5">
                {language === 'mr' ? 'संशयास्पद काम सूचना' : 'Suspicious Terms Detected'}
              </h2>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-bold text-[#991B1B] pl-2">
            {job.suspiciousFlags?.map((flag, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <span>{flag[language] || flag.en}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenReport}
            className="w-full min-h-[48px] py-2 px-4 bg-white border-2 border-[#DC2626] hover:bg-red-50 text-[#991B1B] font-black rounded-full text-xs active:scale-95"
          >
            {language === 'mr' ? 'या कामाची तक्रार नोंदवा' : 'Report this Suspicious Posting'}
          </button>
        </div>
      )}

      {/* 3. Job Core Summary Card */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-4">
        {/* Trade, Date & Wage Banner */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <TradeCharacter trade={job.trade} className="w-14 h-14 flex-shrink-0" />
            <div>
              <span className="text-xs font-black text-neutral-500 uppercase tracking-wider">
                {job.startDate === 'Today'
                  ? (language === 'mr' ? 'आजचे काम' : 'Today')
                  : (language === 'mr' ? 'उद्याचे काम' : 'Tomorrow')}
              </span>
              <h1 className="text-xl font-black text-[#0A0A0A] leading-tight">
                {titleText}
              </h1>
            </div>
          </div>

          {/* Wage badge */}
          <div className="flex flex-col items-end flex-shrink-0">
            <div className="bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3.5 py-1 rounded-full text-2xl font-black shadow-xs">
              ₹{job.payOffer}
            </div>
            <div className="text-xs font-bold text-neutral-600 mt-0.5">
              /{language === 'mr' ? 'दिवस' : 'day'}
            </div>
          </div>
        </div>

        {/* 4 Key Facts Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
          <div className="p-3 bg-neutral-50 rounded-2xl border-2 border-neutral-200 space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase">{language === 'mr' ? 'कामाचे ठिकाण' : 'Location'}</div>
            <div className="font-black text-[#0A0A0A] flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-[#0A0A0A] flex-shrink-0 stroke-[2.5]" />
              <span className="truncate">{job.locationName}</span>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-2xl border-2 border-neutral-200 space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase">{language === 'mr' ? 'कामाची वेळ' : 'Hours'}</div>
            <div className="font-black text-[#0A0A0A] flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-[#0A0A0A] flex-shrink-0 stroke-[2.5]" />
              <span>{job.hoursText}</span>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-2xl border-2 border-neutral-200 space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase">{language === 'mr' ? 'सुरक्षा व जेवण' : 'Food / Water'}</div>
            <div className="font-black text-[#0A0A0A] flex items-center gap-1.5 text-sm">
              <Utensils className="w-4 h-4 text-[#0A0A0A] flex-shrink-0 stroke-[2.5]" />
              <span className="truncate">{job.isFoodProvided ? (language === 'mr' ? 'जेवण/चहा मिळेल' : 'Food/Tea provided') : (language === 'mr' ? 'स्वतः आणावे' : 'Bring own food')}</span>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-2xl border-2 border-neutral-200 space-y-1">
            <div className="text-[11px] font-bold text-neutral-500 uppercase">{language === 'mr' ? 'कामाचा कालावधी' : 'Duration'}</div>
            <div className="font-black text-[#0A0A0A] flex items-center gap-1.5 text-sm">
              <Calendar className="w-4 h-4 text-[#0A0A0A] flex-shrink-0 stroke-[2.5]" />
              <span>{job.durationDays} {language === 'mr' ? 'दिवस' : 'day(s)'}</span>
            </div>
          </div>
        </div>

        {/* Payment Terms Row */}
        <div className="p-3.5 bg-[#FDE047] border-2 border-[#0A0A0A] rounded-[24px] space-y-1 text-[#0A0A0A]">
          <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 stroke-[2.5]" />
            <span>{language === 'mr' ? 'पैसे देण्याची पद्धत व वेळ:' : 'Payment Terms:'}</span>
          </div>
          <p className="text-sm font-bold">
            {paymentTermsText}
          </p>
        </div>

        {/* Tools Needed Checklist */}
        <div className="pt-2 border-t-2 border-neutral-100 space-y-2">
          <div className="text-xs font-black text-[#0A0A0A] flex items-center justify-between">
            <span>{t('toolsNeeded')}:</span>
            <span className="text-xs text-neutral-600 font-bold">
              {job.toolsNeeded?.length === 0 ? t('toolsProvided') : `${job.toolsNeeded?.length} required`}
            </span>
          </div>

          {job.toolsNeeded && job.toolsNeeded.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {job.toolsNeeded.map(toolId => {
                const ownsTool = workerProfile.ownedTools?.includes(toolId);
                return (
                  <span
                    key={toolId}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border-2 ${
                      ownsTool
                        ? 'bg-[#DCFCE7] text-[#15803D] border-[#15803D]'
                        : 'bg-amber-100 text-[#0A0A0A] border-amber-400'
                    }`}
                  >
                    {ownsTool ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" /> : <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />}
                    <span className="capitalize">{toolId.replace('_', ' ')}</span>
                    <span className="text-[10px] opacity-75 font-normal">
                      {ownsTool ? (language === 'mr' ? '(उपलब्ध)' : '(owned)') : (language === 'mr' ? '(आवश्यक)' : '(needed)')}
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="text-xs font-bold text-neutral-800 bg-neutral-100 p-3 rounded-2xl border border-neutral-300">
              <CheckCircle2 className="w-4 h-4 inline mr-1.5 text-[#15803D] stroke-[2.5]" />
              {language === 'mr' ? 'सर्व अवजारे कामाच्या ठिकाणी मालक देणार आहेत.' : 'All necessary tools will be provided on site.'}
            </div>
          )}
        </div>
      </div>

      {/* 4. Employer Trust Card */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-neutral-500 uppercase tracking-wider">
            {t('employerTrustScore')}
          </h2>
          {employer.verifiedBadge && (
            <span className="inline-flex items-center gap-1 text-xs font-black text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#15803D]">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>{t('verifiedEmployer')}</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-[#0A0A0A] text-base">
              {employer.name}
            </h3>
            <p className="text-xs text-neutral-600 font-bold mt-0.5">
              {employer.type} • {employer.location}
            </p>
          </div>

          <a
            href={`tel:${employer.phone}`}
            className="min-h-[46px] px-4 bg-[#0A0A0A] hover:bg-neutral-800 text-white rounded-full shadow-sm active:scale-95 flex items-center gap-2 text-xs font-black"
            aria-label="Call employer"
          >
            <Phone className="w-4 h-4" />
            <span>{language === 'mr' ? 'कॉल' : 'Call'}</span>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t-2 border-neutral-100 text-center text-xs">
          <div className="p-2.5 bg-neutral-50 rounded-2xl border-2 border-neutral-200">
            <div className="font-black text-[#15803D] text-base">
              {employer.paidOnTimePercent}%
            </div>
            <div className="text-[10px] text-neutral-600 font-bold mt-0.5">{t('paidOnTime')}</div>
          </div>

          <div className="p-2.5 bg-neutral-50 rounded-2xl border-2 border-neutral-200">
            <div className="font-black text-[#0A0A0A] text-base flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-[#FDE047] text-[#0A0A0A]" />
              <span>{employer.rating}</span>
            </div>
            <div className="text-[10px] text-neutral-600 font-bold mt-0.5">({employer.reviewsCount} reviews)</div>
          </div>

          <div className="p-2.5 bg-neutral-50 rounded-2xl border-2 border-neutral-200">
            <div className="font-black text-[#0A0A0A] text-base">
              {employer.jobsPostedCount}
            </div>
            <div className="text-[10px] text-neutral-600 font-bold mt-0.5">{language === 'mr' ? 'दिलेली कामे' : 'Jobs Posted'}</div>
          </div>
        </div>

        {/* Worker Feedback Quote */}
        {employer.workerFeedback && (
          <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-200 text-xs italic font-medium text-neutral-700 flex items-start gap-2">
            <FileText className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
            <span>"{employer.workerFeedback}"</span>
          </div>
        )}
      </div>

      {/* Direct Chat with Employer Banner */}
      <div className="bg-[#0A0A0A] text-white rounded-[32px] border-3 border-[#0A0A0A] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FDE047] text-[#0A0A0A] rounded-2xl shrink-0">
            <MessageSquare className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-black text-[#FDE047] uppercase tracking-wide">
              {language === 'mr' ? 'थेट संवाद व पत्ता विचारणा' : 'Direct Chat with Employer'}
            </div>
            <div className="text-xs text-neutral-300 font-bold mt-0.5">
              {language === 'mr' ? 'कामाचे ठिकाण, वेळ किंवा अवजारांबद्दल थेट मेसेज करा' : 'Message regarding address, tools or arrival timing'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/chat?conv=conv_1&sender=worker`)}
          className="min-h-[46px] px-5 rounded-full bg-[#FDE047] text-[#0A0A0A] hover:bg-yellow-300 font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shrink-0 border-2 border-[#0A0A0A] cursor-pointer"
        >
          <span>{language === 'mr' ? 'मालकांशी चॅट करा' : 'Chat with Employer'}</span>
          <ArrowRight size={14} className="stroke-[2.5]" />
        </button>
      </div>

      {/* 5. Wage Negotiation Slider Component */}
      <NegotiationSlider
        job={job}
        onAcceptAgreedPay={handleTriggerAccept}
      />

      {/* 6. Agreement & Confirmation Modal */}
      {isAgreementModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-[420px] bg-white rounded-t-[32px] sm:rounded-[32px] border-4 border-[#0A0A0A] shadow-2xl p-6 space-y-4">
            
            {!contractId ? (
              <>
                <div className="text-center space-y-1">
                  <h3 className="font-black text-[#0A0A0A] text-lg">
                    {language === 'mr' ? 'कामाची खात्री व अटी स्वीकृती' : 'Confirm & Commit Terms'}
                  </h3>
                  <p className="text-xs text-neutral-600 font-bold">
                    {language === 'mr' ? 'दोन्ही बाजूंच्या सुरक्षिततेसाठी अटी तपासा' : 'Review terms before final commitment'}
                  </p>
                </div>

                {/* Summary Terms Card */}
                <div className="p-4 bg-neutral-50 border-2 border-[#0A0A0A] rounded-[24px] space-y-2 text-xs text-[#0A0A0A]">
                  <div className="flex justify-between items-center font-bold">
                    <span>{language === 'mr' ? 'निश्चित मजुरी:' : 'Agreed Wage:'}</span>
                    <span className="bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3 py-0.5 rounded-full font-black text-lg">₹{agreedWage} / {language === 'mr' ? 'दिवस' : 'day'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-neutral-600">{language === 'mr' ? 'वेळ व दिनांक:' : 'Time & Date:'}</span>
                    <span className="font-black">{job.startDate} • {job.hoursText}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-neutral-600">{language === 'mr' ? 'पैसे मिळण्याची वेळ:' : 'Payment Mode:'}</span>
                    <span className="font-black">{paymentTermsText}</span>
                  </div>
                </div>

                {/* Mutual Trust Checkbox */}
                <label className="flex items-start gap-3 p-3 bg-[#FDE047]/20 border-2 border-[#0A0A0A] rounded-2xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAgreedTerms}
                    onChange={(e) => setHasAgreedTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#0A0A0A] rounded"
                  />
                  <span className="text-xs font-black text-[#0A0A0A] leading-tight">
                    {language === 'mr'
                      ? 'मी या अटी वाचल्या आहेत आणि कामाच्या वेळेवर हजर राहण्याचे मान्य करतो.'
                      : 'I agree to these terms and confirm availability on the scheduled date.'}
                  </span>
                </label>

                {/* Action Buttons: Min 56px */}
                <div className="flex gap-2.5 pt-1">
                  <button
                    onClick={() => setIsAgreementModalOpen(false)}
                    className="min-h-[56px] py-3 px-5 border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] bg-white active:scale-95"
                  >
                    {language === 'mr' ? 'रद्द करा' : 'Cancel'}
                  </button>

                  <button
                    disabled={!hasAgreedTerms}
                    onClick={handleFinalConfirm}
                    className={`flex-1 min-h-[56px] py-3.5 px-5 font-black text-base rounded-full shadow-lg flex items-center justify-center gap-2 border-2 border-[#0A0A0A] transition-all ${
                      hasAgreedTerms
                        ? 'bg-[#15803D] hover:bg-[#166534] text-white active:scale-95'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed border-neutral-300'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                    <span>{language === 'mr' ? 'काम निश्चित करा' : 'Confirm Booking'}</span>
                  </button>
                </div>
              </>
            ) : (
              /* Success Contract Screen with Happy Character */
              <div className="text-center space-y-3.5 py-2">
                <StateCharacter state="happy" className="w-20 h-20 mx-auto" />

                <div className="space-y-1">
                  <h3 className="font-black text-[#0A0A0A] text-lg">
                    {language === 'mr' ? 'काम यशस्वीरित्या बुक झाले!' : 'Job Confirmed & Booked!'}
                  </h3>
                  <p className="text-xs text-neutral-600 font-bold">
                    {language === 'mr' ? 'कामाचा नोंदणी क्रमांक (Contract ID):' : 'Job Contract ID:'}
                  </p>
                  <div className="font-black text-sm text-[#0A0A0A] bg-[#FDE047] py-1.5 px-4 rounded-full inline-block border-2 border-[#0A0A0A] mt-1">
                    #{contractId}
                  </div>
                </div>

                <div className="p-3.5 bg-neutral-100 border-2 border-[#0A0A0A] rounded-2xl text-xs text-neutral-800 font-bold">
                  {language === 'mr'
                    ? 'तुमची उपलब्धता आपोआप "व्यस्त" करण्यात आली आहे, जेणेकरून वेळेचा गोंधळ होणार नाही.'
                    : 'Your status is now automatically marked Busy for this date to prevent conflicting bookings.'}
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      setIsAgreementModalOpen(false);
                      navigate('/chat?conv=conv_1&sender=worker');
                    }}
                    className="w-full min-h-[56px] bg-[#0A0A0A] hover:bg-[#171717] text-[#FDE047] font-black rounded-full shadow-lg border-2 border-[#0A0A0A] active:scale-95 transition-transform text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    <span>{language === 'mr' ? 'मालकांना मेसेज पाठवा' : 'Message Employer Now'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAgreementModalOpen(false);
                      onBack();
                    }}
                    className="w-full min-h-[52px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full border-2 border-[#0A0A0A] active:scale-95 transition-transform text-sm cursor-pointer"
                  >
                    {language === 'mr' ? 'माझ्या कामांवर जा' : 'Done & Return to Feed'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
