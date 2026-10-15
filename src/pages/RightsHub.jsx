import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  FileText,
  MapPin,
  PhoneCall,
  CheckSquare,
  Square,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Volume2,
  ExternalLink,
  Award,
  CheckCircle2,
  ClipboardList,
  Target,
  IndianRupee,
  Wrench,
  Sparkles,
  Check,
  X
} from 'lucide-react';
import { HelpfulAdvocateCharacter } from '../components/Characters';

export default function RightsHub({ onOpenReport }) {
  const { WELFARE_SCHEMES, SAMPLE_DATA_DISCLAIMER, language, speakText, t } = useApp();

  const [activeSection, setActiveSection] = useState('schemes'); // schemes | checker | documents | centers
  const [checkedDocs, setCheckedDocs] = useState(['doc_aadhaar', 'doc_bank']);
  const [expandedSchemeId, setExpandedSchemeId] = useState('bocw');

  // Interactive 3-question eligibility checker state
  const [sectorChoice, setSectorChoice] = useState('construction'); // construction | other_informal
  const [ageChoice, setAgeChoice] = useState('18_40'); // 18_40 | 40_59 | 60_plus
  const [hasBankAcc, setHasBankAcc] = useState('yes'); // yes | no

  const toggleDoc = (id) => {
    setCheckedDocs(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleReadScheme = (scheme) => {
    const name = scheme.name[language] || scheme.name.en;
    const firstBenefit = scheme.sampleBenefits[0];
    const benefitText = firstBenefit.detail[language] || firstBenefit.detail.en;
    speakText(`${name}. मुख्य लाभ: ${firstBenefit.amount}. ${benefitText}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      
      {/* 1. Header with Helpful Advocate Character */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 sm:p-6 shadow-sm flex items-center gap-4">
        <HelpfulAdvocateCharacter className="w-16 h-16 shrink-0" />
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FDE047] text-[#0A0A0A] border border-[#0A0A0A] text-[11px] font-black uppercase tracking-wider mb-1">
            <span>{language === 'mr' ? 'कामगार हक्क कक्ष' : 'Rights & Welfare Cell'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0A] leading-tight">
            {language === 'mr' ? 'शासकीय योजना व कायदेशीर हक्क' : 'Government Welfare & Worker Rights'}
          </h1>
          <p className="text-xs text-neutral-600 font-bold mt-0.5">
            {language === 'mr' ? 'नाका कामगारांसाठी मोफत माहिती व सहाय्य' : 'Free guidance for daily wagers and informal trades'}
          </p>
        </div>
      </div>

      {/* 2. Prominent SAMPLE DATA Warning Banner */}
      <div className="bg-[#FEF08A]/40 border-2 border-[#0A0A0A] rounded-[24px] p-4 text-xs text-[#0A0A0A] font-bold space-y-1">
        <div className="flex items-center gap-2 text-[#0A0A0A]">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="uppercase tracking-wider font-black">
            {language === 'mr' ? 'नमुना माहिती (SAMPLE DATA)' : 'Sample Data Disclaimer'}
          </span>
        </div>
        <p className="text-[11px] leading-relaxed font-semibold text-neutral-700">
          {SAMPLE_DATA_DISCLAIMER[language] || SAMPLE_DATA_DISCLAIMER.en}
        </p>
      </div>

      {/* 3. Section Tabs */}
      <div className="grid grid-cols-2 gap-2 text-xs font-black">
        <button
          onClick={() => setActiveSection('schemes')}
          className={`min-h-[52px] p-3 rounded-full border-2 flex items-center justify-center gap-2 touch-target transition-all ${
            activeSection === 'schemes'
              ? 'border-[#0A0A0A] bg-[#FDE047] text-[#0A0A0A] shadow-sm'
              : 'border-neutral-300 bg-white text-neutral-700 hover:border-[#0A0A0A]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{language === 'mr' ? 'सरकारी योजना' : 'Schemes'}</span>
        </button>

        <button
          onClick={() => setActiveSection('checker')}
          className={`min-h-[52px] p-3 rounded-full border-2 flex items-center justify-center gap-2 touch-target transition-all ${
            activeSection === 'checker'
              ? 'border-[#0A0A0A] bg-[#FDE047] text-[#0A0A0A] shadow-sm'
              : 'border-neutral-300 bg-white text-neutral-700 hover:border-[#0A0A0A]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{language === 'mr' ? 'पात्रता तपासणी' : 'Do I Qualify?'}</span>
        </button>

        <button
          onClick={() => setActiveSection('documents')}
          className={`min-h-[52px] p-3 rounded-full border-2 flex items-center justify-center gap-2 touch-target transition-all ${
            activeSection === 'documents'
              ? 'border-[#0A0A0A] bg-[#FDE047] text-[#0A0A0A] shadow-sm'
              : 'border-neutral-300 bg-white text-neutral-700 hover:border-[#0A0A0A]'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>{language === 'mr' ? 'कागदपत्रे यादी' : 'Documents'}</span>
        </button>

        <button
          onClick={() => setActiveSection('centers')}
          className={`min-h-[52px] p-3 rounded-full border-2 flex items-center justify-center gap-2 touch-target transition-all ${
            activeSection === 'centers'
              ? 'border-[#0A0A0A] bg-[#FDE047] text-[#0A0A0A] shadow-sm'
              : 'border-neutral-300 bg-white text-neutral-700 hover:border-[#0A0A0A]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{language === 'mr' ? 'नोंदणी केंद्रे' : 'CSC Centers'}</span>
        </button>
      </div>

      {/* SECTION 1: WELFARE SCHEMES DIRECTORY */}
      {activeSection === 'schemes' && (
        <div className="space-y-3">
          <div className="px-1 text-xs font-black text-neutral-600">
            {language === 'mr' ? 'असंघटित व नाका कामगारांसाठी प्रमुख योजना:' : 'Key welfare boards and programs:'}
          </div>

          {WELFARE_SCHEMES.map(scheme => {
            const isExpanded = expandedSchemeId === scheme.id;
            const nameText = scheme.name[language] || scheme.name.en;
            const targetText = scheme.targetAudience[language] || scheme.targetAudience.en;

            return (
              <div
                key={scheme.id}
                className="bg-white rounded-[28px] border-2 border-[#0A0A0A] shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                  className="p-5 cursor-pointer hover:bg-neutral-50 transition-colors flex items-start justify-between gap-2"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-[#0A0A0A] uppercase tracking-wide bg-[#FEF08A] px-2.5 py-0.5 rounded-full border border-[#0A0A0A]">
                      {scheme.category.toUpperCase()} • SAMPLE DATA
                    </span>
                    <h3 className="font-black text-[#0A0A0A] text-base leading-snug mt-1">
                      {nameText}
                    </h3>
                    <p className="text-xs text-neutral-700 font-bold flex items-center gap-1.5 mt-0.5">
                      <Target className="w-3.5 h-3.5 text-[#0A0A0A] shrink-0" />
                      <span>{targetText}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadScheme(scheme);
                      }}
                      className="p-2 rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-neutral-800"
                      title="Listen aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#0A0A0A]" /> : <ChevronDown className="w-5 h-5 text-[#0A0A0A]" />}
                  </div>
                </div>

                {/* Expanded Details: "What you get in hand" */}
                {isExpanded && (
                  <div className="p-5 pt-0 border-t-2 border-neutral-100 bg-neutral-50/50 space-y-3 text-xs">
                    
                    <div className="font-black text-[#0A0A0A] text-xs pt-3 flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-[#0A0A0A]" />
                      <span>{language === 'mr' ? 'तुम्हाला नेमके काय मिळते? (प्रत्यक्ष लाभ)' : 'What you get in hand:'}</span>
                    </div>

                    <div className="space-y-2">
                      {scheme.sampleBenefits.map((b, i) => (
                        <div key={i} className="p-3 bg-white rounded-[20px] border-2 border-neutral-200 space-y-1">
                          <div className="flex justify-between items-center font-bold">
                            <span className="text-[#0A0A0A] font-black">{b.title[language] || b.title.en}</span>
                            <span className="text-[#0A0A0A] font-black bg-[#FEF08A] px-2 py-0.5 rounded-full border border-[#0A0A0A]">{b.amount}</span>
                          </div>
                          <p className="text-[11px] text-neutral-600 font-medium">
                            {b.detail[language] || b.detail.en}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-neutral-200 space-y-1 text-[11px] text-neutral-700 font-bold">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0A0A0A] shrink-0" />
                        <span>{language === 'mr' ? 'नोंदणी कोठे करावी?' : 'Where to register:'} {scheme.whereToRegister}</span>
                      </div>
                      <div className="text-neutral-500 font-semibold pl-5">
                        {scheme.requiredDocumentsNote}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 2: 3-QUESTION "DO I QUALIFY?" CHECKER */}
      {activeSection === 'checker' && (
        <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 sm:p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-black text-[#0A0A0A] text-base">
              {language === 'mr' ? '3 प्रश्नांत आपली पात्रता तपासा' : '3-Question Eligibility Check'}
            </h3>
            <p className="text-xs text-neutral-600 font-bold">
              {language === 'mr' ? 'मोठ्या अर्जांशिवाय त्वरित योजनांची माहिती मिळवा' : 'Quick match without complex forms'}
            </p>
          </div>

          {/* Q1: Sector */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-[#0A0A0A]">
              1. {language === 'mr' ? 'तुम्ही कोणत्या प्रकारचे काम करता?' : 'What work do you do?'}
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setSectorChoice('construction')}
                className={`p-3.5 rounded-[20px] border-2 text-left transition-all flex items-center gap-2 ${
                  sectorChoice === 'construction'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] text-[#0A0A0A] font-black'
                    : 'border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                <Wrench className="w-4 h-4 text-[#0A0A0A] shrink-0" />
                <span>{language === 'mr' ? 'बांधकाम / मिस्त्री / प्लंबर / पेंटर' : 'Construction / BOCW'}</span>
              </button>
              <button
                onClick={() => setSectorChoice('other_informal')}
                className={`p-3.5 rounded-[20px] border-2 text-left transition-all flex items-center gap-2 ${
                  sectorChoice === 'other_informal'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] text-[#0A0A0A] font-black'
                    : 'border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#0A0A0A] shrink-0" />
                <span>{language === 'mr' ? 'हेल्पर / सफाई / इतर रोजंदारी' : 'General Labour / Helper'}</span>
              </button>
            </div>
          </div>

          {/* Q2: Age */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-[#0A0A0A]">
              2. {language === 'mr' ? 'तुमचे वय किती आहे?' : 'Your age bracket?'}
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-black text-center">
              <button
                onClick={() => setAgeChoice('18_40')}
                className={`p-3 rounded-full border-2 ${
                  ageChoice === '18_40'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] text-[#0A0A0A]'
                    : 'border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                18 - 40 वर्षे
              </button>
              <button
                onClick={() => setAgeChoice('40_59')}
                className={`p-3 rounded-full border-2 ${
                  ageChoice === '40_59'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] text-[#0A0A0A]'
                    : 'border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                40 - 59 वर्षे
              </button>
              <button
                onClick={() => setAgeChoice('60_plus')}
                className={`p-3 rounded-full border-2 ${
                  ageChoice === '60_plus'
                    ? 'border-[#0A0A0A] bg-[#FEF08A] text-[#0A0A0A]'
                    : 'border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                60+ वर्षे
              </button>
            </div>
          </div>

          {/* Q3: Bank Account */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-[#0A0A0A]">
              3. {language === 'mr' ? 'स्वतःचे बँक खाते आहे का?' : 'Do you have an active bank account?'}
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-black">
              <button
                onClick={() => setHasBankAcc('yes')}
                className={`p-3 rounded-full border-2 flex items-center justify-center gap-1.5 ${
                  hasBankAcc === 'yes'
                    ? 'border-[#15803D] bg-[#DCFCE7] text-[#15803D]'
                    : 'border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{language === 'mr' ? 'होय, बँक खाते आहे' : 'Yes, active account'}</span>
              </button>
              <button
                onClick={() => setHasBankAcc('no')}
                className={`p-3 rounded-full border-2 flex items-center justify-center gap-1.5 ${
                  hasBankAcc === 'no'
                    ? 'border-[#DC2626] bg-[#FEE2E2] text-[#DC2626]'
                    : 'border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                <X className="w-4 h-4 stroke-[3]" />
                <span>{language === 'mr' ? 'नाही, खाते उघडायचे आहे' : 'No account yet'}</span>
              </button>
            </div>
          </div>

          {/* Calculated Matches */}
          <div className="p-4 bg-neutral-50 border-2 border-[#0A0A0A] rounded-[24px] space-y-2">
            <div className="text-xs font-black text-[#0A0A0A] flex items-center justify-between">
              <span>{language === 'mr' ? 'तुम्ही पात्र असलेल्या योजना:' : 'Schemes matching your answers:'}</span>
              <span className="text-[#0A0A0A] bg-[#FEF08A] px-2 py-0.5 rounded-full border border-[#0A0A0A]">SAMPLE DATA</span>
            </div>

            <div className="space-y-2 text-xs">
              {sectorChoice === 'construction' && (
                <div className="p-2.5 bg-[#DCFCE7] text-[#15803D] border border-[#15803D] rounded-[18px] font-black flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>महाराष्ट्र बांधकाम कामगार कल्याण मंडळ (BOCW) — अवजारे व वैद्यकीय मदत</span>
                </div>
              )}
              <div className="p-2.5 bg-[#DCFCE7] text-[#15803D] border border-[#15803D] rounded-[18px] font-black flex items-center gap-2">
                <Award className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>ई-श्रम कार्ड (e-Shram) — ₹2 लाख अपघात विमा व देशव्यापी ओळख</span>
              </div>
              {ageChoice === '18_40' && (
                <div className="p-2.5 bg-[#DCFCE7] text-[#15803D] border border-[#15803D] rounded-[18px] font-black flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>PM-SYM पेन्शन योजना — 60 नंतर दरमहा ₹3,000 निवृत्तीवेतन</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DOCUMENTS CHECKLIST */}
      {activeSection === 'documents' && (
        <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 sm:p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-black text-[#0A0A0A] text-base">
              {language === 'mr' ? 'नोंदणीसाठी लागणारी आवश्यक कागदपत्रे' : 'Documents Checklist'}
            </h3>
            <p className="text-xs text-neutral-600 font-bold">
              {language === 'mr' ? 'तुमच्याकडे असलेली कागदपत्रे तपासा (टिक करा)' : 'Check off documents you currently have'}
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              { id: 'doc_aadhaar', label: 'आधार कार्ड (Aadhaar Card) — मोबाईल नंबर जोडलेला असावा' },
              { id: 'doc_bank', label: 'बँक पासबुक झेरॉक्स (Bank Passbook with IFSC code)' },
              { id: 'doc_photos', label: '2 पासपोर्ट आकाराचे फोटो (Passport Photos)' },
              { id: 'doc_cert', label: '90 दिवस कामाचे प्रमाणपत्र (ठेकेदार / ग्रामपंचायत सही) [BOCW साठी]' },
              { id: 'doc_ration', label: 'शिधापत्रिका (Ration Card - पिवळे किंवा केशरी)' }
            ].map(doc => {
              const checked = checkedDocs.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`p-3.5 rounded-[20px] border-2 flex items-start gap-2.5 cursor-pointer transition-all ${
                    checked
                      ? 'border-[#0A0A0A] bg-[#FEF08A] text-[#0A0A0A] font-black'
                      : 'border-neutral-200 bg-white text-neutral-700'
                  }`}
                >
                  {checked ? (
                    <CheckSquare className="w-5 h-5 text-[#0A0A0A] flex-shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs leading-snug">{doc.label}</span>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-neutral-50 rounded-[20px] border border-neutral-200 text-xs text-neutral-700 font-bold flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#0A0A0A] shrink-0" />
            <span>
              {language === 'mr'
                ? 'कागदपत्रे नसल्यास आपल्या जवळच्या आपले सरकार सेवा केंद्रात मदत मिळवा.'
                : 'Need help gathering documents? Visit the nearest CSC Centre.'}
            </span>
          </div>
        </div>
      )}

      {/* SECTION 4: REGISTRATION CENTERS & HELPLINES */}
      {activeSection === 'centers' && (
        <div className="space-y-3">
          <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 sm:p-6 shadow-sm space-y-3">
            <h3 className="font-black text-[#0A0A0A] text-base">
              {language === 'mr' ? 'खोपोली व कर्जत परिसरातील नोंदणी केंद्रे' : 'Nearby CSC & Labour Offices'}
            </h3>

            <div className="space-y-2.5 text-xs text-neutral-800">
              <div className="p-3.5 bg-neutral-50 border-2 border-neutral-200 rounded-[20px] space-y-1">
                <div className="font-black text-[#0A0A0A]">1. आपले सरकार सेवा केंद्र (CSC Centre)</div>
                <div className="text-neutral-600 font-medium">स्टेशन रोड, खोपोली नगरपालिका समोर</div>
                <div className="text-[#15803D] font-bold">सोमवार ते शनिवार • सकाळी 9 ते संध्याकाळी 6</div>
              </div>

              <div className="p-3.5 bg-neutral-50 border-2 border-neutral-200 rounded-[20px] space-y-1">
                <div className="font-black text-[#0A0A0A]">2. तालुका कामगार सुविधा केंद्र (Labour Office)</div>
                <div className="text-neutral-600 font-medium">तहसीलदार कार्यालय परिसर, कर्जत</div>
                <div className="text-[#15803D] font-bold">सरकारी कामकाजाचे दिवस</div>
              </div>
            </div>
          </div>

          {/* Sample Helplines */}
          <div className="bg-[#FEF08A]/30 border-2 border-[#0A0A0A] rounded-[32px] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[#0A0A0A] text-sm">
                {language === 'mr' ? 'कामगार मदत हेल्पलाईन' : 'Labour Helplines'}
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 bg-[#FDE047] text-[#0A0A0A] border border-[#0A0A0A] rounded-full">
                SAMPLE DATA
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-full border-2 border-[#0A0A0A] flex items-center justify-between px-4">
                <div>
                  <div className="font-black text-[#0A0A0A] text-sm">14434</div>
                  <div className="text-[11px] text-neutral-600 font-bold">e-Shram National Sample Helpdesk</div>
                </div>
                <a
                  href="tel:14434"
                  className="px-4 py-2 bg-[#15803D] text-white font-black text-xs rounded-full no-underline"
                >
                  कॉल
                </a>
              </div>

              <div className="p-3 bg-white rounded-full border-2 border-[#0A0A0A] flex items-center justify-between px-4">
                <div>
                  <div className="font-black text-[#0A0A0A] text-sm">1800-180-1551</div>
                  <div className="text-[11px] text-neutral-600 font-bold">Labour Grievance Sample Helpline</div>
                </div>
                <a
                  href="tel:18001801551"
                  className="px-4 py-2 bg-[#15803D] text-white font-black text-xs rounded-full no-underline"
                >
                  कॉल
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Report Link */}
      <div className="text-center pt-2">
        <button
          onClick={onOpenReport}
          className="min-h-[48px] px-6 rounded-full border-2 border-[#DC2626] bg-[#FEE2E2] text-[#DC2626] font-black text-xs hover:bg-red-200 transition-colors inline-flex items-center justify-center gap-1.5 mx-auto"
        >
          <span>मजुरी बुडवली किंवा फसवणूक झाली असल्यास येथे तक्रार करा →</span>
        </button>
      </div>

    </div>
  );
}
