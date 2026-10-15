import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShieldCheck,
  Star,
  Clock,
  Wrench,
  Camera,
  Share2,
  Plus,
  Minus,
  Check,
  Volume2,
  QrCode,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function WorkerProfile() {
  const {
    workerProfile,
    setWorkerProfile,
    toggleTool,
    updateBaseWage,
    COMMON_TOOLS,
    AREA_BENCHMARKS,
    language,
    speakText,
    showToast,
    t
  } = useApp();

  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false);
  const [last4Digits, setLast4Digits] = useState('8921');
  const [aadhaarOtp, setAadhaarOtp] = useState('1234');
  const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Experience stepper
  const handleExperienceNudge = (delta) => {
    setWorkerProfile(prev => ({
      ...prev,
      experienceYears: Math.max(1, Math.min(40, prev.experienceYears + delta))
    }));
  };

  // Add mock photo
  const handleAddMockPhoto = () => {
    const newPhoto = {
      id: `p_${Date.now()}`,
      title: language === 'mr' ? 'नवीन नळ दुरुस्ती काम' : 'New Plumbing Inspection',
      label: language === 'mr' ? 'आज पूर्ण केलेले काम' : 'Completed Today',
      tag: 'Plumbing'
    };
    setWorkerProfile(prev => ({
      ...prev,
      workPhotos: [newPhoto, ...prev.workPhotos]
    }));
    showToast(language === 'mr' ? 'फोटो जोडला गेला!' : 'Work photo added to gallery!', 'success');
  };

  // Simulate Aadhaar Verification
  const handleAadhaarVerify = () => {
    if (last4Digits.length !== 4) {
      showToast(language === 'mr' ? 'कृपया शेवटचे 4 अंक टाका' : 'Enter 4 digits', 'danger');
      return;
    }
    setWorkerProfile(prev => ({
      ...prev,
      isAadhaarVerified: true,
      aadhaarMasked: `XXXX XXXX ${last4Digits}`
    }));
    setIsVerifyingAadhaar(false);
    setAadhaarOtpSent(false);
    showToast(language === 'mr' ? 'ओळखपत्र यशस्वीरित्या सत्यापित झाले!' : 'ID verified successfully!', 'success');
  };

  // Play worker voice bio
  const handlePlayVoiceBio = () => {
    speakText(workerProfile.audioBio);
  };

  // WhatsApp share link
  const shareText = encodeURIComponent(
    `नमस्ते! मी ${workerProfile.name}, ${workerProfile.trade} (${workerProfile.experienceYears} वर्षे अनुभव, खोपोली नाका). माझे नाका (NAKA) प्रोफाईल व कामे पहा: https://naka.in/worker/${workerProfile.id} | रोज: ₹${workerProfile.baseWageAsk}/दिवस`
  );
  const waUrl = `https://wa.me/?text=${shareText}`;

  const benchmark = AREA_BENCHMARKS[workerProfile.trade]?.rate || 700;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      
      {/* 1. Header Profile Identity Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm">
              👨🏽‍🔧
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-slate-900 text-lg leading-tight">
                  {workerProfile.name}
                </h1>
                {workerProfile.isAadhaarVerified && (
                  <span className="p-0.5 bg-emerald-100 text-emerald-800 rounded-full" title="ID Verified">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {workerProfile.naka}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-black text-amber-950 bg-amber-100 px-2 py-0.5 rounded-md">
                  ★ {workerProfile.rating} ({workerProfile.reviewCount})
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  {workerProfile.experienceYears} {language === 'mr' ? 'वर्षे अनुभव' : 'yrs experience'}
                </span>
              </div>
            </div>
          </div>

          {/* Audio Speaker for Voice Bio */}
          <button
            onClick={handlePlayVoiceBio}
            className="p-2.5 rounded-xl bg-amber-50 text-[#B45309] border border-amber-200 hover:bg-amber-100 active:scale-95 touch-target"
            title="Listen to worker voice introduction"
            aria-label="Listen to worker voice bio"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Reputation Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {workerProfile.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
            >
              ✓ {tag}
            </span>
          ))}
        </div>

        {/* Share Profile Button */}
        <div className="pt-2 border-t border-slate-100 flex gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>{language === 'mr' ? 'माझे QR कार्ड व शेअर' : 'My QR & Share'}</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 touch-target active:scale-95 transition-transform"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 2. Total Hours Worked on Platform (Milestone Card) */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                {t('totalHoursWorked')}
              </div>
              <div className="text-2xl font-black text-emerald-950">
                {workerProfile.hoursWorkedTotal} {language === 'mr' ? 'तास' : 'hours'}
              </div>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-300">
            {Math.floor(workerProfile.hoursWorkedTotal / 8)} {language === 'mr' ? 'कामाचे दिवस' : 'days completed'}
          </span>
        </div>

        <p className="text-[11px] text-emerald-800 leading-tight">
          {language === 'mr'
            ? 'सर्व तास पडताळणी झालेले आहेत. कोणतीही खोटी नोंद नाही.'
            : 'Every hour is employer-verified upon daily clock-out.'}
        </p>
      </div>

      {/* 3. Work Photos Gallery */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#B45309]" />
            <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {t('workPhotosTitle')} ({workerProfile.workPhotos?.length || 0})
            </h2>
          </div>

          <button
            onClick={handleAddMockPhoto}
            className="text-xs font-bold text-[#B45309] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'फोटो जोडा' : 'Add Photo'}</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {workerProfile.workPhotos?.map(photo => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoModal(photo)}
              className="bg-slate-50 border-2 border-slate-200 hover:border-amber-400 rounded-xl p-2.5 cursor-pointer active:scale-95 transition-all space-y-1.5"
            >
              {/* Photo Placeholder Visual */}
              <div className="h-24 bg-gradient-to-tr from-slate-200 via-amber-100 to-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-500 border border-slate-300 relative overflow-hidden">
                <span className="text-2xl">📸</span>
                <span className="text-[10px] font-bold text-slate-700 mt-1">{photo.tag}</span>
                <span className="absolute bottom-1 right-1 px-1.5 py-0.2 bg-black/60 text-white text-[9px] rounded font-mono">
                  Verified
                </span>
              </div>

              <div>
                <div className="font-extrabold text-xs text-slate-900 truncate">
                  {photo.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {photo.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Minimum Base Wage Stepper */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {t('baseWageTitle')}
            </h2>
            <p className="text-[11px] text-slate-500">
              {language === 'mr' ? 'यापेक्षा कमी मजुरीचे काम तुम्हाला विचारले जाणार नाही' : 'Your floor daily rate'}
            </p>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500">नाका सरासरी दर</div>
            <div className="text-xs font-bold text-slate-800">₹{benchmark} / दिवस</div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
          <button
            onClick={() => updateBaseWage(-50)}
            className="w-12 h-12 bg-white border-2 border-slate-300 rounded-xl font-black text-xl text-slate-800 flex items-center justify-center active:scale-95 shadow-sm touch-target"
            aria-label="Decrease minimum wage by 50"
          >
            <Minus className="w-5 h-5 text-slate-700" />
          </button>

          <div className="text-center">
            <div className="text-2xl font-black text-[#B45309]">
              ₹{workerProfile.baseWageAsk}
            </div>
            <div className="text-[10px] font-bold text-slate-500">
              /{language === 'mr' ? 'दिवस (किमान)' : 'day (minimum)'}
            </div>
          </div>

          <button
            onClick={() => updateBaseWage(50)}
            className="w-12 h-12 bg-white border-2 border-slate-300 rounded-xl font-black text-xl text-slate-800 flex items-center justify-center active:scale-95 shadow-sm touch-target"
            aria-label="Increase minimum wage by 50"
          >
            <Plus className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* 5. "I Have Tools" Interactive Checklist */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#B45309]" />
            <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {t('iHaveToolsTitle')} ({workerProfile.ownedTools?.length || 0})
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {language === 'mr' ? 'बदलांसाठी टॅप करा' : 'Tap to toggle'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {COMMON_TOOLS.map(tool => {
            const hasTool = workerProfile.ownedTools?.includes(tool.id);
            const toolName = tool.name[language] || tool.name.en;

            return (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`p-2.5 rounded-xl border-2 text-left transition-all flex items-center justify-between touch-target active:scale-95 ${
                  hasTool
                    ? 'border-[#B45309] bg-amber-50/70 text-slate-900 font-black shadow-xs'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 font-semibold'
                }`}
              >
                <div className="truncate">
                  <div className="text-xs truncate">{toolName}</div>
                </div>
                {hasTool ? (
                  <Check className="w-4 h-4 text-[#B45309] flex-shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 italic pt-1">
          {language === 'mr'
            ? 'स्वतःची अवजारे असल्यास जास्त मजुरीची कामे प्राधान्याने मिळतात.'
            : 'Jobs requiring owned tools rank higher in your feed and pay better.'}
        </p>
      </div>

      {/* 6. ID Verification Card (Aadhaar Simulated Privacy) */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#B45309]" />
            <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {language === 'mr' ? 'ओळखपत्र पडताळणी (ID Verification)' : 'ID Verification'}
            </h2>
          </div>

          {workerProfile.isAadhaarVerified ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>सत्यापित ✓</span>
            </span>
          ) : (
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              पडताळणी बाकी
            </span>
          )}
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>{language === 'mr' ? 'आधार क्रमांक (सुरक्षित मास्क):' : 'Masked ID Number:'}</span>
            <span className="font-mono text-sm tracking-wider font-black text-slate-900">
              {workerProfile.aadhaarMasked || 'XXXX XXXX 8921'}
            </span>
          </div>

          <div className="text-[10px] text-slate-500 leading-relaxed">
            🛡️ {language === 'mr'
              ? 'तुमचा पूर्ण आधार नंबर कधीही कोणाला दाखवला जात नाही. फक्त शेवटचे 4 अंक पडताळणीसाठी वापरले जातात.'
              : 'Your full 12-digit Aadhaar is NEVER stored or shown to employers. Only masked digits are displayed.'}
          </div>
        </div>

        {!workerProfile.isAadhaarVerified && !isVerifyingAadhaar && (
          <button
            onClick={() => setIsVerifyingAadhaar(true)}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold touch-target active:scale-95"
          >
            {language === 'mr' ? 'ओळखपत्र सत्यापित करा (डेमो OTP)' : 'Verify ID (Simulated OTP)'}
          </button>
        )}

        {/* Verification Inline Form */}
        {isVerifyingAadhaar && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {language === 'mr' ? 'आधारचे शेवटचे 4 अंक टाका:' : 'Enter last 4 digits of Aadhaar:'}
              </label>
              <input
                type="text"
                maxLength={4}
                value={last4Digits}
                onChange={(e) => setLast4Digits(e.target.value)}
                placeholder="8921"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono text-center font-bold text-lg text-slate-900"
              />
            </div>

            {!aadhaarOtpSent ? (
              <button
                onClick={() => setAadhaarOtpSent(true)}
                className="w-full py-2 bg-slate-800 text-white rounded-lg text-xs font-bold touch-target"
              >
                {language === 'mr' ? 'डेमो OTP पाठवा' : 'Send Demo OTP'}
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  maxLength={4}
                  value={aadhaarOtp}
                  onChange={(e) => setAadhaarOtp(e.target.value)}
                  className="w-full p-2 bg-white border-2 border-emerald-600 rounded-lg font-mono text-center font-bold text-lg text-slate-900"
                />
                <button
                  onClick={handleAadhaarVerify}
                  className="w-full py-2.5 bg-emerald-700 text-white rounded-lg text-xs font-black shadow-md touch-target"
                >
                  {language === 'mr' ? 'पडताळणी पूर्ण करा' : 'Verify & Save Badge'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Share / QR Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[380px] bg-white rounded-3xl p-5 border-4 border-[#B45309] shadow-2xl space-y-4 text-center">
            <h3 className="font-black text-slate-900 text-base">
              {language === 'mr' ? 'रमेश शिंदे - डिजिटल ओळखपत्र' : 'Ramesh Shinde - Digital Profile'}
            </h3>

            {/* Simulated QR Visual */}
            <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl inline-block mx-auto">
              <div className="w-44 h-44 bg-white border-4 border-slate-900 p-2 flex flex-col items-center justify-center shadow-inner relative">
                <QrCode className="w-36 h-36 text-slate-900" />
                <span className="text-[9px] font-bold text-slate-600 bg-white px-1 mt-1">
                  NAKA ID #8921
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-0.5">
              <div className="font-black text-slate-900">{workerProfile.trade.toUpperCase()} • 14 YRS EXP</div>
              <div>खोपोली नाका (Khopoli Chowk) • ★ 4.9</div>
              <div className="text-[#B45309] font-black">रोज: ₹{workerProfile.baseWageAsk} / दिवस</div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md touch-target"
              >
                <Share2 className="w-4 h-4" />
                <span>{t('shareOnWhatsApp')}</span>
              </a>

              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-full py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 touch-target"
              >
                {language === 'mr' ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Photo Preview Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[360px] bg-white rounded-2xl p-4 space-y-3 text-center">
            <div className="h-48 bg-gradient-to-tr from-slate-200 via-amber-100 to-slate-200 rounded-xl flex flex-col items-center justify-center border-2 border-slate-300">
              <span className="text-5xl">🛠️</span>
              <span className="font-black text-slate-800 text-sm mt-2">{activePhotoModal.title}</span>
            </div>
            <p className="text-xs text-slate-600">{activePhotoModal.label}</p>
            <button
              onClick={() => setActivePhotoModal(null)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs touch-target"
            >
              {language === 'mr' ? 'बंद करा' : 'Close Preview'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
