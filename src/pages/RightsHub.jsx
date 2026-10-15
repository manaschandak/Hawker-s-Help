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
  Award
} from 'lucide-react';

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
      
      {/* 1. Prominent SAMPLE DATA Warning Banner */}
      <div className="bg-amber-100 border-2 border-amber-300 rounded-2xl p-3 text-xs text-amber-950 font-bold space-y-1">
        <div className="flex items-center gap-1.5 text-[#B45309]">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="uppercase tracking-wider font-black">
            {language === 'mr' ? 'नमुना माहिती (SAMPLE DATA)' : 'Sample Data Disclaimer'}
          </span>
        </div>
        <p className="text-[11px] leading-relaxed font-medium">
          {SAMPLE_DATA_DISCLAIMER[language] || SAMPLE_DATA_DISCLAIMER.en}
        </p>
      </div>

      {/* 2. Section Tabs */}
      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveSection('schemes')}
          className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 touch-target transition-all ${
            activeSection === 'schemes'
              ? 'border-[#B45309] bg-amber-50 text-slate-900 font-black shadow-xs'
              : 'border-slate-200 bg-white text-slate-600'
          }`}
        >
          <span>📜</span>
          <span>{language === 'mr' ? 'सरकारी योजना' : 'Schemes'}</span>
        </button>

        <button
          onClick={() => setActiveSection('checker')}
          className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 touch-target transition-all ${
            activeSection === 'checker'
              ? 'border-[#B45309] bg-amber-50 text-slate-900 font-black shadow-xs'
              : 'border-slate-200 bg-white text-slate-600'
          }`}
        >
          <span>🎯</span>
          <span>{language === 'mr' ? 'पात्रता तपासणी' : 'Do I Qualify?'}</span>
        </button>

        <button
          onClick={() => setActiveSection('documents')}
          className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 touch-target transition-all ${
            activeSection === 'documents'
              ? 'border-[#B45309] bg-amber-50 text-slate-900 font-black shadow-xs'
              : 'border-slate-200 bg-white text-slate-600'
          }`}
        >
          <span>📋</span>
          <span>{language === 'mr' ? 'कागदपत्रे यादी' : 'Documents'}</span>
        </button>

        <button
          onClick={() => setActiveSection('centers')}
          className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 touch-target transition-all ${
            activeSection === 'centers'
              ? 'border-[#B45309] bg-amber-50 text-slate-900 font-black shadow-xs'
              : 'border-slate-200 bg-white text-slate-600'
          }`}
        >
          <span>📍</span>
          <span>{language === 'mr' ? 'नोंदणी केंद्रे' : 'CSC Centers'}</span>
        </button>
      </div>

      {/* SECTION 1: WELFARE SCHEMES DIRECTORY */}
      {activeSection === 'schemes' && (
        <div className="space-y-3">
          <div className="px-1 text-xs font-bold text-slate-700">
            {language === 'mr' ? 'असंघटित व नाका कामगारांसाठी प्रमुख योजना:' : 'Key welfare boards and programs:'}
          </div>

          {WELFARE_SCHEMES.map(scheme => {
            const isExpanded = expandedSchemeId === scheme.id;
            const nameText = scheme.name[language] || scheme.name.en;
            const targetText = scheme.targetAudience[language] || scheme.targetAudience.en;

            return (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                  className="p-4 cursor-pointer hover:bg-slate-50 transition-colors flex items-start justify-between gap-2"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded">
                      {scheme.category.toUpperCase()} • SAMPLE DATA
                    </span>
                    <h3 className="font-black text-slate-900 text-sm leading-snug">
                      {nameText}
                    </h3>
                    <p className="text-xs text-slate-600">
                      🎯 {targetText}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadScheme(scheme);
                      }}
                      className="p-1.5 rounded-lg bg-amber-50 text-[#B45309] border border-amber-200"
                      title="Listen aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details: "What you get in hand" */}
                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs">
                    
                    <div className="font-extrabold text-slate-800 text-xs pt-3">
                      💰 {language === 'mr' ? 'तुम्हाला नेमके काय मिळते? (प्रत्यक्ष लाभ)' : 'What you get in hand:'}
                    </div>

                    <div className="space-y-2">
                      {scheme.sampleBenefits.map((b, i) => (
                        <div key={i} className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                          <div className="flex justify-between items-center font-bold">
                            <span className="text-slate-900">{b.title[language] || b.title.en}</span>
                            <span className="text-[#B45309] font-black">{b.amount}</span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            {b.detail[language] || b.detail.en}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Registration Channel */}
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-emerald-950">
                      <div className="font-black text-[11px]">
                        📍 {language === 'mr' ? 'नोंदणी कोठे करावी?' : 'Where to register:'}
                      </div>
                      <p className="text-xs font-semibold">{scheme.registrationCenter.name}</p>
                      <p className="text-[11px] text-emerald-800">{scheme.registrationCenter.location}</p>
                      <div className="pt-1 flex items-center justify-between text-xs">
                        <span className="font-bold">हेल्पलाइन: {scheme.registrationCenter.helpline}</span>
                        <a
                          href="tel:14434"
                          className="px-2 py-1 bg-emerald-700 text-white font-bold rounded-lg text-[10px]"
                        >
                          {language === 'mr' ? 'कॉल करा' : 'Call'}
                        </a>
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
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-sm">
              {language === 'mr' ? '3 प्रश्नांत आपली पात्रता तपासा' : '3-Question Eligibility Check'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'mr' ? 'मोठ्या अर्जांशिवाय त्वरित योजनांची माहिती मिळवा' : 'Quick match without complex forms'}
            </p>
          </div>

          {/* Q1: Sector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              1. {language === 'mr' ? 'तुम्ही कोणत्या प्रकारचे काम करता?' : 'What work do you do?'}
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setSectorChoice('construction')}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  sectorChoice === 'construction'
                    ? 'border-[#B45309] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                🧱 {language === 'mr' ? 'बांधकाम / मिस्त्री / प्लंबर / पेंटर' : 'Construction / BOCW'}
              </button>
              <button
                onClick={() => setSectorChoice('other_informal')}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  sectorChoice === 'other_informal'
                    ? 'border-[#B45309] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                🧹 {language === 'mr' ? 'हेल्पर / सफाई / इतर रोजंदारी' : 'General Labour / Helper'}
              </button>
            </div>
          </div>

          {/* Q2: Age */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              2. {language === 'mr' ? 'तुमचे वय किती आहे?' : 'Your age bracket?'}
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold text-center">
              <button
                onClick={() => setAgeChoice('18_40')}
                className={`p-2.5 rounded-xl border-2 ${
                  ageChoice === '18_40'
                    ? 'border-[#B45309] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                18 - 40 वर्षे
              </button>
              <button
                onClick={() => setAgeChoice('40_59')}
                className={`p-2.5 rounded-xl border-2 ${
                  ageChoice === '40_59'
                    ? 'border-[#B45309] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                40 - 59 वर्षे
              </button>
              <button
                onClick={() => setAgeChoice('60_plus')}
                className={`p-2.5 rounded-xl border-2 ${
                  ageChoice === '60_plus'
                    ? 'border-[#B45309] bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                60+ वर्षे
              </button>
            </div>
          </div>

          {/* Q3: Bank Account */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              3. {language === 'mr' ? 'स्वतःचे बँक खाते आहे का?' : 'Do you have an active bank account?'}
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setHasBankAcc('yes')}
                className={`p-2.5 rounded-xl border-2 ${
                  hasBankAcc === 'yes'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                ✓ {language === 'mr' ? 'होय, बँक खाते आहे' : 'Yes, active account'}
              </button>
              <button
                onClick={() => setHasBankAcc('no')}
                className={`p-2.5 rounded-xl border-2 ${
                  hasBankAcc === 'no'
                    ? 'border-amber-600 bg-amber-50 text-amber-950'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                ✕ {language === 'mr' ? 'नाही, खाते उघडायचे आहे' : 'No account yet'}
              </button>
            </div>
          </div>

          {/* Calculated Matches */}
          <div className="p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-black text-slate-900 flex items-center justify-between">
              <span>{language === 'mr' ? 'तुम्ही पात्र असलेल्या योजना:' : 'Schemes matching your answers:'}</span>
              <span className="text-[#B45309]">SAMPLE DATA</span>
            </div>

            <div className="space-y-1.5 text-xs">
              {sectorChoice === 'construction' && (
                <div className="p-2 bg-emerald-100/70 text-emerald-950 rounded-lg font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>महाराष्ट्र बांधकाम कामगार कल्याण मंडळ (BOCW) — अवजारे व वैद्यकीय मदत</span>
                </div>
              )}
              <div className="p-2 bg-emerald-100/70 text-emerald-950 rounded-lg font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>ई-श्रम कार्ड (e-Shram) — ₹2 लाख अपघात विमा व देशव्यापी ओळख</span>
              </div>
              {ageChoice === '18_40' && (
                <div className="p-2 bg-emerald-100/70 text-emerald-950 rounded-lg font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>PM-SYM पेन्शन योजना — 60 नंतर दरमहा ₹3,000 निवृत्तीवेतन</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DOCUMENTS CHECKLIST */}
      {activeSection === 'documents' && (
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
          <div>
            <h3 className="font-black text-slate-900 text-sm">
              {language === 'mr' ? 'नोंदणीसाठी लागणारी आवश्यक कागदपत्रे' : 'Documents Checklist'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'mr' ? 'तुमच्याकडे असलेली कागदपत्रे तपासा (टिक करा)' : 'Check off documents you currently have'}
            </p>
          </div>

          <div className="space-y-2">
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
                  className={`p-3 rounded-xl border-2 flex items-start gap-2.5 cursor-pointer transition-all ${
                    checked
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {checked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs leading-snug">{doc.label}</span>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium">
            💡 {language === 'mr'
              ? 'कागदपत्रे नसल्यास आपल्या जवळच्या आपले सरकार सेवा केंद्रात मदत मिळवा.'
              : 'Need help gathering documents? Visit the nearest CSC Centre.'}
          </div>
        </div>
      )}

      {/* SECTION 4: REGISTRATION CENTERS & HELPLINES */}
      {activeSection === 'centers' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
            <h3 className="font-black text-slate-900 text-sm">
              {language === 'mr' ? 'खोपोली व कर्जत परिसरातील नोंदणी केंद्रे' : 'Nearby CSC & Labour Offices'}
            </h3>

            <div className="space-y-2.5 text-xs text-slate-800">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-black text-slate-900">1. आपले सरकार सेवा केंद्र (CSC Centre)</div>
                <div className="text-slate-600">स्टेशन रोड, खोपोली नगरपालिका समोर</div>
                <div className="text-emerald-800 font-bold">सोमवार ते शनिवार • सकाळी 9 ते संध्याकाळी 6</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-black text-slate-900">2. तालुका कामगार सुविधा केंद्र (Labour Office)</div>
                <div className="text-slate-600">तहसीलदार कार्यालय परिसर, कर्जत</div>
                <div className="text-emerald-800 font-bold">सरकारी कामकाजाचे दिवस</div>
              </div>
            </div>
          </div>

          {/* Sample Helplines */}
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-emerald-950 text-sm">
                {language === 'mr' ? 'कामगार मदत हेल्पलाईन' : 'Labour Helplines'}
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-200 text-emerald-900 rounded">
                SAMPLE DATA
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="font-black text-slate-900 text-sm">14434</div>
                  <div className="text-[11px] text-slate-500">e-Shram National Sample Helpdesk</div>
                </div>
                <a
                  href="tel:14434"
                  className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-lg"
                >
                  कॉल
                </a>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="font-black text-slate-900 text-sm">1800-180-1551</div>
                  <div className="text-[11px] text-slate-500">Labour Grievance Sample Helpline</div>
                </div>
                <a
                  href="tel:18001801551"
                  className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-lg"
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
          className="text-xs font-bold text-red-700 hover:underline flex items-center justify-center gap-1 mx-auto"
        >
          <span>मजुरी बुडवली किंवा फसवणूक झाली असल्यास येथे तक्रार करा →</span>
        </button>
      </div>

    </div>
  );
}
