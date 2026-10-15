import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Lock,
  ArrowUpRight,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { TradeCharacter } from '../components/Characters';

export default function WorkerProfile() {
  const navigate = useNavigate();
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

  const photoFileInputRef = useRef(null);

  // Handle Real Photo Upload from Camera / Device
  const handleRealPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newPhoto = {
        id: `photo_${Date.now()}`,
        imageUrl: reader.result,
        title: file.name.replace(/\.[^/.]+$/, "") || (language === 'mr' ? 'नवीन काम फोटो' : 'New Work Photo'),
        label: new Date().toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        tag: workerProfile.trade || 'General Work',
        timestamp: Date.now()
      };

      setWorkerProfile(prev => ({
        ...prev,
        workPhotos: [newPhoto, ...(prev.workPhotos || [])]
      }));

      showToast(
        language === 'mr' ? 'काम फोटो गॅलरीत जोडला गेला!' : 'Real photo added to your profile gallery!',
        'success'
      );
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDeletePhoto = (photoId) => {
    setWorkerProfile(prev => ({
      ...prev,
      workPhotos: (prev.workPhotos || []).filter(p => p.id !== photoId)
    }));
    setActivePhotoModal(null);
    showToast(language === 'mr' ? 'फोटो हटवला गेला' : 'Photo removed', 'info');
  };

  // Experience stepper
  const handleExperienceNudge = (delta) => {
    setWorkerProfile(prev => ({
      ...prev,
      experienceYears: Math.max(1, Math.min(40, prev.experienceYears + delta))
    }));
  };

  // Add mock photo fallback
  const handleAddMockPhoto = () => {
    if (photoFileInputRef.current) {
      photoFileInputRef.current.click();
    }
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-5">
      
      {/* 1. Header Profile Identity Card */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <TradeCharacter trade={workerProfile.trade} className="w-16 h-16 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-[#0A0A0A] text-xl leading-tight">
                  {workerProfile.name}
                </h1>
                {workerProfile.isAadhaarVerified && (
                  <span className="p-1 bg-[#DCFCE7] text-[#15803D] rounded-full border border-[#15803D]" title="ID Verified">
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-600 font-bold mt-0.5">
                {workerProfile.naka}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-black text-[#0A0A0A] bg-[#FDE047] px-2.5 py-0.5 rounded-full border border-[#0A0A0A] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#0A0A0A] text-[#0A0A0A]" />
                  <span>{workerProfile.rating} ({workerProfile.reviewCount})</span>
                </span>
                <span className="text-xs font-black text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300">
                  {workerProfile.experienceYears} {language === 'mr' ? 'वर्षे अनुभव' : 'yrs experience'}
                </span>
              </div>
            </div>
          </div>

          {/* Audio Speaker for Voice Bio */}
          <button
            onClick={handlePlayVoiceBio}
            className="w-12 h-12 rounded-full bg-[#FDE047] border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-yellow-300 active:scale-95 flex items-center justify-center flex-shrink-0 shadow-xs"
            title="Listen to worker voice introduction"
            aria-label="Listen to worker voice bio"
          >
            <Volume2 className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Reputation Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {workerProfile.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-black bg-neutral-100 text-[#0A0A0A] px-3 py-1 rounded-full border border-neutral-300 flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5] text-[#15803D]" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Share Profile Action Buttons */}
        <div className="pt-2 border-t-2 border-neutral-100 flex gap-2.5">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex-1 min-h-[52px] py-2.5 px-4 bg-[#0A0A0A] hover:bg-neutral-800 text-white rounded-full text-xs font-black flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <QrCode className="w-4 h-4 text-[#FDE047] stroke-[2.5]" />
            <span>{language === 'mr' ? 'माझे QR कार्ड व शेअर' : 'My QR & Share'}</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[52px] py-2.5 px-5 bg-[#15803D] hover:bg-[#166534] text-white rounded-full text-xs font-black flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Share2 className="w-4 h-4 stroke-[2.5]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 2. Total Hours Worked on Platform (Milestone Card) */}
      <div className="bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] rounded-[32px] p-5 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FDE047] text-[#0A0A0A] rounded-2xl">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-black text-[#FDE047] uppercase tracking-wider">
                {t('totalHoursWorked')}
              </div>
              <div className="text-2xl font-black text-white">
                {workerProfile.hoursWorkedTotal} {language === 'mr' ? 'तास' : 'hours'}
              </div>
            </div>
          </div>

          <span className="text-xs font-black text-[#0A0A0A] bg-[#FDE047] px-3 py-1 rounded-full border border-[#0A0A0A]">
            {Math.floor(workerProfile.hoursWorkedTotal / 8)} {language === 'mr' ? 'कामाचे दिवस' : 'days completed'}
          </span>
        </div>

        <p className="text-xs text-neutral-300 font-medium">
          {language === 'mr'
            ? 'सर्व तास पडताळणी झालेले आहेत. कोणतीही खोटी नोंद नाही.'
            : 'Every hour is employer-verified upon daily clock-out.'}
        </p>
      </div>

      {/* 3. Work Photos Gallery */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
            <h2 className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider">
              {t('workPhotosTitle')} ({workerProfile.workPhotos?.length || 0})
            </h2>
          </div>

          {/* Hidden File Input for Real Photo Uploads */}
          <input
            type="file"
            ref={photoFileInputRef}
            accept="image/*"
            onChange={handleRealPhotoUpload}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => photoFileInputRef.current?.click()}
            className="text-xs font-black text-[#0A0A0A] bg-[#FDE047] hover:bg-yellow-400 border-2 border-[#0A0A0A] px-3.5 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{language === 'mr' ? 'फोटो जोडा' : 'Add Photo'}</span>
          </button>
        </div>

        {/* Gallery Grid with Real Photos & Previews */}
        <div className="grid grid-cols-2 gap-3">
          {workerProfile.workPhotos?.map(photo => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoModal(photo)}
              className="bg-neutral-50 border-2 border-[#0A0A0A] rounded-[24px] p-2.5 cursor-pointer active:scale-95 transition-all space-y-2 group hover:border-black"
            >
              <div className="h-32 bg-[#FAF8F5] border-2 border-[#0A0A0A] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                {photo.imageUrl ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-2 text-center">
                    <Camera className="w-7 h-7 text-[#0A0A0A] stroke-[2]" />
                    <span className="text-xs font-black text-[#0A0A0A] mt-1">{photo.tag}</span>
                  </div>
                )}
                <span className="absolute bottom-1 right-1 px-2 py-0.5 bg-[#0A0A0A] text-[#FDE047] text-[10px] rounded-full font-black shadow-xs">
                  Verified
                </span>
              </div>

              <div className="px-1">
                <div className="font-black text-xs text-[#0A0A0A] truncate">
                  {photo.title}
                </div>
                <div className="text-[11px] text-neutral-600 font-bold truncate">
                  {photo.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gov ID & Document Vault Quick Banner */}
      <div className="bg-[#FDE047] rounded-[32px] border-3 border-[#0A0A0A] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#0A0A0A] text-[#FDE047] rounded-2xl shrink-0">
            <Lock className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider">
              {language === 'mr' ? 'शासकीय कागदपत्रे व ओळखपत्र तिजोरी' : 'Gov ID & Document Vault'}
            </div>
            <div className="text-sm font-black text-[#0A0A0A]">
              {language === 'mr' ? 'आधार कार्ड, BOCW स्मार्ट कार्ड व ई-श्रम सुरक्षित पहा' : 'Aadhaar, BOCW Card & e-Shram Vault'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/vault')}
          className="min-h-[48px] px-5 rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-[#171717] font-black text-xs flex items-center justify-center gap-2 active:scale-95 border-2 border-[#0A0A0A] shadow-xs cursor-pointer"
        >
          <span>{language === 'mr' ? 'तिजोरी उघडा' : 'Open Vault'}</span>
          <ArrowUpRight size={16} className="stroke-[2.5]" />
        </button>
      </div>

      {/* 4. Minimum Base Wage Stepper */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-black text-neutral-500 uppercase tracking-wider">
              {t('baseWageTitle')}
            </h2>
            <p className="text-xs text-neutral-600 font-bold mt-0.5">
              {language === 'mr' ? 'यापेक्षा कमी मजुरीचे काम तुम्हाला विचारले जाणार नाही' : 'Your floor daily rate'}
            </p>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-neutral-500 uppercase">नाका सरासरी दर</div>
            <div className="text-xs font-black text-[#0A0A0A] bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300">
              ₹{benchmark} / दिवस
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-neutral-50 border-2 border-[#0A0A0A] rounded-[24px] p-3">
          <button
            onClick={() => updateBaseWage(-50)}
            className="w-14 h-14 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-xl text-[#0A0A0A] flex items-center justify-center active:scale-95 shadow-sm"
            aria-label="Decrease minimum wage by 50"
          >
            <Minus className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
          </button>

          <div className="text-center">
            <div className="text-3xl font-black text-[#0A0A0A]">
              ₹{workerProfile.baseWageAsk}
            </div>
            <div className="text-xs font-bold text-neutral-600">
              /{language === 'mr' ? 'दिवस (किमान)' : 'day (minimum)'}
            </div>
          </div>

          <button
            onClick={() => updateBaseWage(50)}
            className="w-14 h-14 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-xl text-[#0A0A0A] flex items-center justify-center active:scale-95 shadow-sm"
            aria-label="Increase minimum wage by 50"
          >
            <Plus className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 5. "I Have Tools" Interactive Checklist */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
            <h2 className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider">
              {t('iHaveToolsTitle')} ({workerProfile.ownedTools?.length || 0})
            </h2>
          </div>
          <span className="text-xs text-neutral-600 font-bold">
            {language === 'mr' ? 'बदलांसाठी टॅप करा' : 'Tap to toggle'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {COMMON_TOOLS.map(tool => {
            const hasTool = workerProfile.ownedTools?.includes(tool.id);
            const toolName = tool.name[language] || tool.name.en;

            return (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between active:scale-95 ${
                  hasTool
                    ? 'border-[#0A0A0A] bg-[#FDE047] text-[#0A0A0A] font-black shadow-xs'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-[#0A0A0A] font-bold'
                }`}
              >
                <div className="truncate">
                  <div className="text-xs truncate">{toolName}</div>
                </div>
                {hasTool ? (
                  <Check className="w-4 h-4 text-[#0A0A0A] stroke-[2.5] flex-shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-[#0A0A0A] flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-neutral-600 font-semibold italic pt-1">
          {language === 'mr'
            ? 'स्वतःची अवजारे असल्यास जास्त मजुरीची कामे प्राधान्याने मिळतात.'
            : 'Jobs requiring owned tools rank higher in your feed and pay better.'}
        </p>
      </div>

      {/* 6. ID Verification Card (Aadhaar Simulated Privacy) */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#0A0A0A] stroke-[2.5]" />
            <h2 className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider">
              {language === 'mr' ? 'ओळखपत्र पडताळणी (ID Verification)' : 'ID Verification'}
            </h2>
          </div>

          {workerProfile.isAadhaarVerified ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#15803D]">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>सत्यापित</span>
            </span>
          ) : (
            <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-400">
              पडताळणी बाकी
            </span>
          )}
        </div>

        <div className="p-4 bg-neutral-50 border-2 border-neutral-200 rounded-[24px] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#0A0A0A]">
            <span>{language === 'mr' ? 'आधार क्रमांक (सुरक्षित मास्क):' : 'Masked ID Number:'}</span>
            <span className="font-mono text-sm tracking-wider font-black text-[#0A0A0A]">
              {workerProfile.aadhaarMasked || 'XXXX XXXX 8921'}
            </span>
          </div>

          <div className="text-xs text-neutral-600 font-medium leading-relaxed flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#15803D] stroke-[2.5] flex-shrink-0" />
            <span>
              {language === 'mr'
                ? 'तुमचा पूर्ण आधार नंबर कधीही कोणाला दाखवला जात नाही. फक्त शेवटचे 4 अंक पडताळणीसाठी वापरले जातात.'
                : 'Your full 12-digit Aadhaar is NEVER stored or shown to employers. Only masked digits are displayed.'}
            </span>
          </div>
        </div>

        {!workerProfile.isAadhaarVerified && !isVerifyingAadhaar && (
          <button
            onClick={() => setIsVerifyingAadhaar(true)}
            className="w-full min-h-[52px] bg-[#0A0A0A] hover:bg-neutral-800 text-white rounded-full text-xs font-black active:scale-95"
          >
            {language === 'mr' ? 'ओळखपत्र सत्यापित करा (डेमो OTP)' : 'Verify ID (Simulated OTP)'}
          </button>
        )}

        {/* Verification Inline Form */}
        {isVerifyingAadhaar && (
          <div className="p-4 bg-amber-50 border-2 border-[#0A0A0A] rounded-[24px] space-y-3">
            <div>
              <label className="block text-xs font-black text-[#0A0A0A] mb-1.5">
                {language === 'mr' ? 'आधारचे शेवटचे 4 अंक टाका:' : 'Enter last 4 digits of Aadhaar:'}
              </label>
              <input
                type="text"
                maxLength={4}
                value={last4Digits}
                onChange={(e) => setLast4Digits(e.target.value)}
                placeholder="8921"
                className="w-full min-h-[48px] p-2.5 bg-white border-2 border-[#0A0A0A] rounded-full font-mono text-center font-black text-xl text-[#0A0A0A]"
              />
            </div>

            {!aadhaarOtpSent ? (
              <button
                onClick={() => setAadhaarOtpSent(true)}
                className="w-full min-h-[48px] bg-[#0A0A0A] text-white rounded-full text-xs font-black active:scale-95"
              >
                {language === 'mr' ? 'डेमो OTP पाठवा' : 'Send Demo OTP'}
              </button>
            ) : (
              <div className="space-y-2.5">
                <input
                  type="text"
                  maxLength={4}
                  value={aadhaarOtp}
                  onChange={(e) => setAadhaarOtp(e.target.value)}
                  className="w-full min-h-[48px] p-2.5 bg-white border-2 border-[#15803D] rounded-full font-mono text-center font-black text-xl text-[#0A0A0A]"
                />
                <button
                  onClick={handleAadhaarVerify}
                  className="w-full min-h-[48px] bg-[#15803D] text-white rounded-full text-xs font-black shadow-md active:scale-95"
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
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[390px] bg-white rounded-[32px] p-6 border-4 border-[#0A0A0A] shadow-2xl space-y-4 text-center">
            <h3 className="font-black text-[#0A0A0A] text-lg">
              {language === 'mr' ? 'रमेश शिंदे - डिजिटल ओळखपत्र' : 'Ramesh Shinde - Digital Profile'}
            </h3>

            {/* Simulated QR Visual */}
            <div className="p-4 bg-neutral-50 border-2 border-dashed border-[#0A0A0A] rounded-2xl inline-block mx-auto">
              <div className="w-44 h-44 bg-white border-4 border-[#0A0A0A] p-2 flex flex-col items-center justify-center shadow-inner relative">
                <QrCode className="w-36 h-36 text-[#0A0A0A]" />
                <span className="text-[10px] font-black text-[#0A0A0A] bg-[#FDE047] px-2 py-0.5 rounded-full mt-1 border border-[#0A0A0A]">
                  NAKA ID #8921
                </span>
              </div>
            </div>

            <div className="text-xs text-neutral-700 font-bold space-y-1">
              <div className="font-black text-sm text-[#0A0A0A]">{workerProfile.trade.toUpperCase()} • 14 YRS EXP</div>
              <div className="flex items-center justify-center gap-1">
                <span>खोपोली नाका (Khopoli Chowk) • </span>
                <Star className="w-3.5 h-3.5 fill-[#FDE047] text-[#0A0A0A]" />
                <span>4.9</span>
              </div>
              <div className="text-base font-black text-[#0A0A0A]">रोज: ₹{workerProfile.baseWageAsk} / दिवस</div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[56px] bg-[#15803D] hover:bg-[#166534] text-white font-black rounded-full text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 border-2 border-[#0A0A0A]"
              >
                <Share2 className="w-5 h-5 stroke-[2.5]" />
                <span>{t('shareOnWhatsApp')}</span>
              </a>

              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-full min-h-[48px] border-2 border-[#0A0A0A] text-[#0A0A0A] rounded-full text-xs font-black hover:bg-neutral-100 active:scale-95"
              >
                {language === 'mr' ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Photo Preview Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[390px] bg-white rounded-[32px] p-5 space-y-4 text-center border-4 border-[#0A0A0A] shadow-2xl">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-[#FDE047] text-[#0A0A0A] rounded-full text-xs font-black uppercase tracking-wider border border-[#0A0A0A] inline-block">
                {activePhotoModal.tag || 'Work Photo'}
              </span>
              <h3 className="font-black text-[#0A0A0A] text-lg">
                {activePhotoModal.title}
              </h3>
            </div>

            {/* Real Image Preview */}
            <div className="h-60 bg-[#FAF8F5] rounded-2xl overflow-hidden border-2 border-[#0A0A0A] flex items-center justify-center">
              {activePhotoModal.imageUrl ? (
                <img
                  src={activePhotoModal.imageUrl}
                  alt={activePhotoModal.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4">
                  <Camera className="w-12 h-12 text-[#0A0A0A] stroke-[2]" />
                  <span className="font-black text-[#0A0A0A] text-sm mt-2">{activePhotoModal.title}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-neutral-600 font-bold">{activePhotoModal.label}</p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="flex-1 min-h-[52px] bg-[#0A0A0A] text-[#FDE047] font-black rounded-full text-xs active:scale-95 border-2 border-[#0A0A0A] cursor-pointer"
              >
                {language === 'mr' ? 'बंद करा' : 'Close Preview'}
              </button>

              <button
                type="button"
                onClick={() => handleDeletePhoto(activePhotoModal.id)}
                className="min-h-[52px] px-4 bg-red-50 hover:bg-red-100 text-red-600 font-black rounded-full text-xs active:scale-95 border-2 border-red-300 flex items-center justify-center gap-1 cursor-pointer"
                title="Delete Photo"
              >
                <Trash2 size={16} />
                <span>{language === 'mr' ? 'हटवा' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
