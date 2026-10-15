import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  FileText,
  Upload,
  Eye,
  Download,
  Trash2,
  CheckCircle2,
  Lock,
  QrCode,
  AlertCircle,
  Building2,
  User,
  Plus,
  X,
  ExternalLink,
  Share2,
  RefreshCw,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DocumentVault() {
  const { role, language, showToast, auth } = useApp();

  // Active perspective tab: 'worker' or 'employer' (default to current user role)
  const [activeTab, setActiveTab] = useState(role === 'employer' ? 'employer' : 'worker');

  // Selected document for inspection modal
  const [inspectDoc, setInspectDoc] = useState(null);

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('aadhaar');
  const [customDocTitle, setCustomDocTitle] = useState('');
  const [customDocNumber, setCustomDocNumber] = useState('');
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const fileInputRef = useRef(null);

  // Worker Documents Store
  const [workerDocs, setWorkerDocs] = useState([
    {
      id: 'w_doc_1',
      title: language === 'mr' ? 'आधार कार्ड (UIDAI)' : language === 'hi' ? 'आधार कार्ड (UIDAI)' : 'Aadhaar Card (UIDAI)',
      category: 'identity',
      docNumber: 'XXXX-XXXX-8921',
      status: 'verified',
      issuedBy: 'Unique Identification Authority of India (UIDAI)',
      issueDate: '14 Jan 2018',
      expiryDate: 'Permanent / Lifetime',
      badge: 'DigiLocker Verified',
      isGovVerified: true,
      description: language === 'mr'
        ? 'शासकीय पडताळणी झालेले बायोमेट्रिक ओळखपत्र (शेवटचे 4 अंक दृश्य)'
        : 'Govt verified biometric identity card with masked UID'
    },
    {
      id: 'w_doc_2',
      title: language === 'mr' ? 'महाराष्ट्र इमारत व इतर बांधकाम कामगार (BOCW) स्मार्ट कार्ड' : language === 'hi' ? 'BOCW कामगार स्मार्ट कार्ड' : 'Maharashtra BOCW Worker Smart Card',
      category: 'welfare',
      docNumber: 'MH-BOCW-2023-78412',
      status: 'verified',
      issuedBy: 'Maharashtra Building and Other Construction Workers Welfare Board',
      issueDate: '10 Mar 2023',
      expiryDate: '31 Mar 2026',
      badge: '90-Day Muster Validated',
      isGovVerified: true,
      description: language === 'mr'
        ? 'मजूर कल्याण मंडळ नोंदणी. ₹5,000 अवजारे अनुदान व ₹2 लाख अपघात विम्यासाठी पात्र.'
        : 'Registered labor welfare card. Eligible for ₹5,000 safety kit grant & ₹2 Lakh accidental insurance.'
    },
    {
      id: 'w_doc_3',
      title: language === 'mr' ? 'ई-श्रम राष्ट्रीय कामगार ओळखपत्र (e-Shram UAN)' : language === 'hi' ? 'ई-श्रम कार्ड (UAN)' : 'e-Shram National Worker Card',
      category: 'welfare',
      docNumber: 'UAN-8921-3412-9901',
      status: 'verified',
      issuedBy: 'Ministry of Labour & Employment, Govt of India',
      issueDate: '22 Oct 2022',
      expiryDate: 'Permanent',
      badge: 'Central Database Linked',
      isGovVerified: true,
      description: language === 'mr'
        ? 'असंघटित कामगार राष्ट्रीय डेटाबेस नोंदणी व PMSYM पेन्शन जोडणी.'
        : 'National Database of Unorganized Workers registration with direct pension link.'
    },
    {
      id: 'w_doc_4',
      title: language === 'mr' ? 'बँक पासबुक / DBT थेट बँक जमा खाते' : language === 'hi' ? 'बैंक पासबुक / DBT खाता' : 'Bank Passbook & DBT Proof',
      category: 'banking',
      docNumber: 'MAHB-****-4512',
      status: 'verified',
      issuedBy: 'Bank of Maharashtra (Khopoli Branch)',
      issueDate: '05 Feb 2021',
      expiryDate: 'Active',
      badge: 'NPCI Aadhaar-Seeded',
      isGovVerified: true,
      description: language === 'mr'
        ? 'शासकीय अनुदानाच्या रकमा थेट खात्यात (DBT) जमा होण्यासाठी बँक खाते जोडलेले आहे.'
        : 'NPCI seeded savings account for instant direct benefit welfare transfers.'
    },
    {
      id: 'w_doc_5',
      title: language === 'mr' ? 'खोपोली नाका कामगार ओळख पास' : language === 'hi' ? 'नाका कामगार पास' : 'Khopoli Naka Worker Daily Pass',
      category: 'local',
      docNumber: 'NAKA-KHP-042',
      status: 'verified',
      issuedBy: 'Khopoli Municipal Naka Welfare Association',
      issueDate: '01 Jan 2026',
      expiryDate: '31 Dec 2026',
      badge: 'Naka Registered',
      isGovVerified: true,
      description: language === 'mr'
        ? 'स्थानिक नाका पोलीस चौकी व नगरपरिषद अधिकृत कारागीर पास.'
        : 'Local police chowki and municipal authorized artisan permit.'
    }
  ]);

  // Employer Documents Store
  const [employerDocs, setEmployerDocs] = useState([
    {
      id: 'e_doc_1',
      title: language === 'mr' ? 'मालक / कंत्राटदार आधार ओळखपत्र' : language === 'hi' ? 'नियोक्ता आधार कार्ड' : 'Employer / Contractor Aadhaar ID',
      category: 'identity',
      docNumber: 'XXXX-XXXX-4190',
      status: 'verified',
      issuedBy: 'Unique Identification Authority of India (UIDAI)',
      issueDate: '12 Nov 2017',
      expiryDate: 'Permanent',
      badge: 'Identity Verified',
      isGovVerified: true,
      description: language === 'mr'
        ? 'मजुरांच्या सुरक्षेसाठी नियोक्त्याची 100% बायोमेट्रिक पडताळणी पूर्ण.'
        : 'Complete biometric verification of hiring party to guarantee worker safety.'
    },
    {
      id: 'e_doc_2',
      title: language === 'mr' ? 'गुमास्ता / शॉप ॲक्ट व्यवसाय परवाना' : language === 'hi' ? 'दुकान व स्थापना लाइसेंस (गुमास्ता)' : 'Shop & Establishment Act (Gumasta) License',
      category: 'business',
      docNumber: 'MH-RAI-SHOP-2022-9812',
      status: 'verified',
      issuedBy: 'Raigad Municipal Corporation / Labour Commissionerate',
      issueDate: '18 Apr 2022',
      expiryDate: '31 Dec 2027',
      badge: 'Govt Reg. Active',
      isGovVerified: true,
      description: language === 'mr'
        ? 'अधिकृत व्यावसायिक आस्थापना नोंदणी प्रमाणपत्र. वैध मजूर नेमणूक परवाना.'
        : 'Official commercial establishment certificate authorized to engage trade workers.'
    },
    {
      id: 'e_doc_3',
      title: language === 'mr' ? 'बांधकाम साईट सुरक्षा व पालिका एनओसी' : language === 'hi' ? 'साइट सुरक्षा व नगर निगम एनओसी' : 'Worksite Safety & Municipal NOC Clearance',
      category: 'site',
      docNumber: 'KMC-NOC-SITE-2026-041',
      status: 'verified',
      issuedBy: 'Khopoli Municipal Council (Town Planning & Safety)',
      issueDate: '15 Feb 2026',
      expiryDate: '14 Feb 2027',
      badge: 'Site Safe for Workers',
      isGovVerified: true,
      description: language === 'mr'
        ? 'बांधकाम साईटवर पिण्याचे पाणी, प्रथमोपचार व सुरक्षा साधने उपलब्ध असल्याची खात्री.'
        : 'Validates drinking water, first-aid, scaffolding and safety helmet compliance on site.'
    },
    {
      id: 'e_doc_4',
      title: language === 'mr' ? 'कंत्राटदार कामगार कल्याण उपकर (Cess) पावती' : language === 'hi' ? 'मजदूर कल्याण सेस रसीद' : 'Labour Welfare Cess Payment Receipt (1%)',
      category: 'tax',
      docNumber: 'CESS-REC-2025-8819',
      status: 'verified',
      issuedBy: 'Maharashtra Building and Other Construction Workers Welfare Board',
      issueDate: '08 Jan 2026',
      expiryDate: 'Permanent',
      badge: '1% Cess Deposited',
      isGovVerified: true,
      description: language === 'mr'
        ? 'मजुरांच्या शासकीय कल्याणासाठी 1% उपकर भरल्याची अधिकृत सरकारी पावती.'
        : '1% cess deposited to state labor board for worker welfare fund and insurance.'
    }
  ]);

  const currentDocs = activeTab === 'worker' ? workerDocs : employerDocs;

  // Handle selecting a file from device
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit new document upload
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!customDocTitle.trim()) {
      showToast(language === 'mr' ? 'कृपया कागदपत्राचे नाव लिहा' : 'Enter document title', 'danger');
      return;
    }

    const newDoc = {
      id: `doc_${Date.now()}`,
      title: customDocTitle.trim(),
      category: uploadCategory,
      docNumber: customDocNumber.trim() || `NAKA-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'verified',
      issuedBy: activeTab === 'worker' ? 'Labor Welfare Authority / Self Upload' : 'Municipal / Authorized Authority',
      issueDate: new Date().toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      expiryDate: 'Valid till 2027',
      badge: 'Verified & Encrypted',
      isGovVerified: true,
      filePreview: selectedFilePreview,
      fileName: selectedFileName,
      description: language === 'mr'
        ? 'तुमच्या मोबाईलवरून सुरक्षितपणे अपलोड केलेले व साठवलेले शासकीय प्रमाणपत्र.'
        : 'Locally uploaded & tamper-proof encrypted official certificate.'
    };

    if (activeTab === 'worker') {
      setWorkerDocs(prev => [newDoc, ...prev]);
    } else {
      setEmployerDocs(prev => [newDoc, ...prev]);
    }

    setIsUploadModalOpen(false);
    setCustomDocTitle('');
    setCustomDocNumber('');
    setSelectedFilePreview(null);
    setSelectedFileName('');

    showToast(
      language === 'mr' ? 'कागदपत्र तिजोरीत यशस्वीरित्या साठवले गेले!' : 'Document secured in your Vault!',
      'success'
    );
  };

  // Delete a document from vault
  const handleDeleteDoc = (id) => {
    if (activeTab === 'worker') {
      setWorkerDocs(prev => prev.filter(d => d.id !== id));
    } else {
      setEmployerDocs(prev => prev.filter(d => d.id !== id));
    }
    if (inspectDoc?.id === id) {
      setInspectDoc(null);
    }
    showToast(language === 'mr' ? 'कागदपत्र हटवले गेले' : 'Document removed', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-28 space-y-5">
      
      {/* 1. Cyber Yellow Hero Header */}
      <div className="bg-[#FDE047] border-3 border-[#0A0A0A] rounded-[32px] p-6 shadow-md relative overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none select-none">
          <ShieldCheck className="w-56 h-56 text-[#0A0A0A]" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A0A] text-[#FDE047] text-xs font-black uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>256-Bit DigiLocker Safe Vault</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
            {language === 'mr'
              ? 'शासकीय कागदपत्रे व ओळखपत्र तिजोरी'
              : language === 'hi'
              ? 'सरकारी दस्तावेज व आईडी वॉल्ट'
              : 'Gov ID & Documents Vault'}
          </h1>

          <p className="text-sm font-bold text-[#0A0A0A] max-w-2xl leading-relaxed">
            {language === 'mr'
              ? 'कामगार व मालकांसाठी अधिकृत ओळखपत्रे, BOCW स्मार्ट कार्ड, ई-श्रम आणि व्यवसाय परवाने एकाच सुरक्षित ठिकाणी साठवा आणि पडताळा.'
              : language === 'hi'
              ? 'कारीगर व नियोक्ता दोनों के आधार, BOCW कार्ड, ई-श्रम और कार्यस्थल लाइसेंस एक सुरक्षित जगह देखें और अपलोड करें।'
              : 'Store, verify, and present official government proofs, BOCW smart cards, e-Shram IDs, and worksite safety clearances.'}
          </p>

          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            <span className="px-3.5 py-1.5 bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#15803D] stroke-[2.5]" />
              <span>{currentDocs.length} {language === 'mr' ? 'दस्तऐवज सक्रिय' : 'Docs Secured'}</span>
            </span>

            <span className="px-3.5 py-1.5 bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] flex items-center gap-1.5 shadow-xs">
              <QrCode className="w-4 h-4 text-[#0A0A0A]" />
              <span>{language === 'mr' ? 'QR कोड पडताळणी सक्षम' : 'QR Scan Enabled'}</span>
            </span>

            <span className="px-3.5 py-1.5 bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A] flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#B45309]" />
              <span>100% Offline Access</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Dual Role Toggle Switch & Action Trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 bg-neutral-200 p-1.5 rounded-full border-2 border-[#0A0A0A]">
          <button
            type="button"
            onClick={() => setActiveTab('worker')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-full text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'worker'
                ? 'bg-[#0A0A0A] text-[#FDE047] shadow-sm'
                : 'text-neutral-700 hover:text-black'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{language === 'mr' ? 'कामगार तिजोरी (Worker Docs)' : 'Worker Vault'}</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-[#FDE047] text-[#0A0A0A]">
              {workerDocs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('employer')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-full text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'employer'
                ? 'bg-[#0A0A0A] text-[#FDE047] shadow-sm'
                : 'text-neutral-700 hover:text-black'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{language === 'mr' ? 'मालक तिजोरी (Employer Docs)' : 'Employer Vault'}</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-[#FDE047] text-[#0A0A0A]">
              {employerDocs.length}
            </span>
          </button>
        </div>

        {/* Upload Action Button (Pill 56px min-h) */}
        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="min-h-[52px] sm:min-h-[56px] px-6 rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-[#171717] border-2 border-[#0A0A0A] font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4 stroke-[2.5]" />
          <span>
            {language === 'mr' ? '+ नवीन कागदपत्र जोडा' : language === 'hi' ? '+ नया दस्तावेज जोड़ें' : '+ Upload Document'}
          </span>
        </button>
      </div>

      {/* 3. Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-[32px] border-3 border-[#0A0A0A] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
          >
            {/* Top row: Category tag & verification badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 rounded-full text-[11px] font-black text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-neutral-600" />
                <span>{doc.category}</span>
              </span>

              <div className="flex items-center gap-1.5">
                <span className="px-3 py-1 bg-[#DCFCE7] text-[#15803D] border border-[#15803D] rounded-full text-xs font-black flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{doc.badge}</span>
                </span>
              </div>
            </div>

            {/* Document Title & Number Card */}
            <div className="space-y-1.5">
              <h3 className="font-black text-base sm:text-lg text-[#0A0A0A] leading-snug">
                {doc.title}
              </h3>
              
              <div className="bg-[#FAF8F5] border-2 border-dashed border-neutral-300 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase">
                    {language === 'mr' ? 'नोंदणी / ओळख क्रमांक' : 'ID / Registration Number'}
                  </div>
                  <div className="font-mono font-black text-sm sm:text-base text-[#0A0A0A] tracking-wider">
                    {doc.docNumber}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectDoc(doc)}
                  className="p-2 bg-white border border-[#0A0A0A] rounded-xl hover:bg-[#FDE047] transition-colors"
                  title="Scan / View QR Code"
                >
                  <QrCode className="w-5 h-5 text-[#0A0A0A]" />
                </button>
              </div>

              <p className="text-xs font-medium text-neutral-600 pt-1 leading-relaxed">
                {doc.description}
              </p>
            </div>

            {/* Meta details: Issued by & Expiry */}
            <div className="pt-2 border-t-2 border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-bold">
              <div className="truncate max-w-[200px]" title={doc.issuedBy}>
                {language === 'mr' ? 'जारी:' : 'Issued:'} {doc.issuedBy}
              </div>
              <div className="shrink-0 text-neutral-700">
                {doc.expiryDate}
              </div>
            </div>

            {/* Actions: View / Download / Delete */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setInspectDoc(doc)}
                className="min-h-[46px] rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-[#171717] font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-[#0A0A0A]"
              >
                <Eye className="w-4 h-4 stroke-[2.5]" />
                <span>{language === 'mr' ? 'प्रमाणपत्र पहा' : 'Inspect Certificate'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  showToast(
                    language === 'mr' ? 'कागदपत्र डाउनलोड सुरू झाले' : 'Downloading certificate copy...',
                    'success'
                  );
                }}
                className="min-h-[46px] rounded-full bg-white hover:bg-neutral-50 text-[#0A0A0A] font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all border-2 border-[#0A0A0A]"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{language === 'mr' ? 'डाउनलोड' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Empty State if no docs */}
      {currentDocs.length === 0 && (
        <div className="bg-white rounded-[32px] border-3 border-[#0A0A0A] p-8 text-center space-y-3">
          <FileText className="w-12 h-12 text-neutral-400 mx-auto" />
          <h3 className="font-black text-lg text-[#0A0A0A]">
            {language === 'mr' ? 'कोणतेही कागदपत्र आढळले नाही' : 'No documents in this vault'}
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto font-medium">
            {language === 'mr'
              ? 'नवीन कागदपत्र जोडण्यासाठी वरील बटणावर क्लिक करा.'
              : 'Click "+ Upload Document" above to store your verified IDs.'}
          </p>
        </div>
      )}

      {/* 5. Trust & Verification Notice Card */}
      <div className="bg-[#0A0A0A] text-white rounded-[32px] border-3 border-[#0A0A0A] p-5 sm:p-6 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-[#FDE047]">
          <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          <h4 className="font-black text-sm uppercase tracking-wider">
            {language === 'mr' ? 'गोपनीयता व सुरक्षा हमी' : 'Government & Privacy Compliance'}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
          {language === 'mr'
            ? 'सर्व ओळखपत्रे व शासकीय कागदपत्रे आधार डेटा सुरक्षा नियम व माहिती तंत्रज्ञान कायदा 2000 अंतर्गत कूटबद्ध (Encrypted) आहेत. तुमचा स्पष्ट परवाना असल्याशिवाय कोणतीही वैयक्तिक माहिती सार्वजनिक केली जात नाही.'
            : 'All identity proofs are encrypted under the Aadhaar Data Security Framework and Information Technology Act 2000. Full identity numbers are never published without two-factor worker consent.'}
        </p>
      </div>

      {/* MODAL 1: Real Document Upload Dialog */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[32px] border-3 border-[#0A0A0A] max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] flex items-center justify-center font-black"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <span className="px-3 py-1 bg-[#FDE047] text-[#0A0A0A] rounded-full text-xs font-black uppercase tracking-wider border border-[#0A0A0A]">
                {activeTab === 'worker' ? 'Worker Upload' : 'Employer Upload'}
              </span>
              <h2 className="text-xl font-black text-[#0A0A0A]">
                {language === 'mr' ? 'नवीन शासकीय कागदपत्र जोडा' : 'Upload Official ID / Document'}
              </h2>
              <p className="text-xs text-neutral-600 font-medium">
                {language === 'mr'
                  ? 'कॅमेरा किंवा गॅलरीमधून फोटो/PDF निवडा व तिजोरीत सुरक्षित साठवा.'
                  : 'Capture or select an ID proof from your device to secure in Vault.'}
              </p>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Document Category Picker */}
              <div>
                <label className="block text-xs font-black text-[#0A0A0A] uppercase mb-1.5">
                  {language === 'mr' ? 'कागदपत्राचा प्रकार निवडा' : 'Document Category'}
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full min-h-[50px] px-4 rounded-2xl bg-neutral-50 border-2 border-[#0A0A0A] text-sm font-bold text-[#0A0A0A] focus:outline-none"
                >
                  {activeTab === 'worker' ? (
                    <>
                      <option value="Aadhaar Card">आधार कार्ड (Aadhaar Card)</option>
                      <option value="BOCW Smart Card">BOCW कामगार स्मार्ट कार्ड (Welfare Card)</option>
                      <option value="e-Shram Card">ई-श्रम ओळखपत्र (e-Shram UAN)</option>
                      <option value="Bank Passbook">बँक पासबुक / DBT पुरावा (Bank Passbook)</option>
                      <option value="Labor Chowk Pass">नाका कामगार पास (Naka Labor Pass)</option>
                      <option value="Skill Certificate">कौशल्य प्रशिक्षण प्रमाणपत्र (Skill Certificate)</option>
                    </>
                  ) : (
                    <>
                      <option value="Employer ID">नियोक्ता आधार / पॅन कार्ड (National ID)</option>
                      <option value="Shop Act License">गुमास्ता / शॉप ॲक्ट परवाना (Shop Act License)</option>
                      <option value="Site Clearance">बांधकाम साईट एनओसी (Site Clearance)</option>
                      <option value="GST Certificate">जीएसटी / उद्यम प्रमाणपत्र (GST / MSME Udyam)</option>
                      <option value="Labor Cess Receipt">कामगार उपकर पावती (Labor Cess Receipt)</option>
                    </>
                  )}
                </select>
              </div>

              {/* Document Custom Title */}
              <div>
                <label className="block text-xs font-black text-[#0A0A0A] uppercase mb-1.5">
                  {language === 'mr' ? 'कागदपत्राचे नाव / शीर्षक' : 'Document Title'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'mr' ? 'उदा. नवीन आधार कार्ड 2026' : 'e.g. Maharashtra BOCW Smart Card'}
                  value={customDocTitle}
                  onChange={(e) => setCustomDocTitle(e.target.value)}
                  className="w-full min-h-[50px] px-4 rounded-2xl bg-neutral-50 border-2 border-[#0A0A0A] text-sm font-bold text-[#0A0A0A] focus:outline-none"
                />
              </div>

              {/* Document ID Number */}
              <div>
                <label className="block text-xs font-black text-[#0A0A0A] uppercase mb-1.5">
                  {language === 'mr' ? 'ओळख / नोंदणी क्रमांक (पर्यायी)' : 'ID / Certificate Number (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. MH-BOCW-2026-9021"
                  value={customDocNumber}
                  onChange={(e) => setCustomDocNumber(e.target.value)}
                  className="w-full min-h-[50px] px-4 rounded-2xl bg-neutral-50 border-2 border-[#0A0A0A] text-sm font-mono font-bold text-[#0A0A0A] focus:outline-none"
                />
              </div>

              {/* Real File Picker Trigger */}
              <div>
                <label className="block text-xs font-black text-[#0A0A0A] uppercase mb-1.5">
                  {language === 'mr' ? 'फोटो किंवा PDF निवडा' : 'Select Photo or PDF File'}
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-3 border-dashed border-[#0A0A0A] rounded-[24px] p-5 text-center cursor-pointer hover:bg-[#FDE047]/20 transition-colors space-y-2 bg-neutral-50"
                >
                  <Upload className="w-8 h-8 text-[#0A0A0A] mx-auto" />
                  <div className="font-black text-xs text-[#0A0A0A]">
                    {selectedFileName ? (
                      <span className="text-[#15803D] flex items-center justify-center gap-1">
                        <CheckCircle2 size={14} />
                        <span>{selectedFileName}</span>
                      </span>
                    ) : (
                      language === 'mr' ? 'कॅमेरा उघडा किंवा फाईल निवडा' : 'Tap to open camera or browse files'
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-bold">
                    Supports JPG, PNG, PDF up to 15MB
                  </div>
                </div>

                {/* File Preview if image */}
                {selectedFilePreview && (
                  <div className="mt-3 relative rounded-2xl overflow-hidden border-2 border-[#0A0A0A] max-h-48">
                    <img
                      src={selectedFilePreview}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFilePreview(null);
                        setSelectedFileName('');
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-[#0A0A0A] text-[#FDE047] rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full min-h-[56px] rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-[#171717] font-black text-sm flex items-center justify-center gap-2 border-2 border-[#0A0A0A] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{language === 'mr' ? 'तिजोरीत सुरक्षित साठवा' : 'Secure in Vault'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Full Screen Document Inspection & QR Code */}
      {inspectDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[32px] border-3 border-[#0A0A0A] max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setInspectDoc(null)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] flex items-center justify-center font-black"
            >
              <X size={18} />
            </button>

            {/* Document Header */}
            <div className="space-y-1">
              <span className="px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-full text-xs font-black uppercase tracking-wider border border-[#15803D] inline-flex items-center gap-1">
                <ShieldCheck size={14} className="stroke-[2.5]" />
                <span>{inspectDoc.badge}</span>
              </span>
              <h2 className="text-xl font-black text-[#0A0A0A] leading-snug">
                {inspectDoc.title}
              </h2>
            </div>

            {/* Simulated DigiLocker Certificate Visual Card */}
            <div className="bg-[#FAF8F5] border-3 border-[#0A0A0A] rounded-[24px] p-5 relative overflow-hidden space-y-4 shadow-inner">
              {/* Official Seal Watermark */}
              <div className="flex items-center justify-between border-b-2 border-neutral-300 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#FDE047] text-[#0A0A0A] rounded-xl border border-[#0A0A0A]">
                    <Building2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-[#0A0A0A] uppercase tracking-wide">
                      GOVERNMENT OF MAHARASHTRA
                    </div>
                    <div className="text-[10px] text-neutral-600 font-bold">
                      Labour Commissionerate & Welfare Board
                    </div>
                  </div>
                </div>

                <div className="p-1.5 bg-[#0A0A0A] text-[#FDE047] rounded-lg text-[10px] font-black uppercase">
                  VERIFIED
                </div>
              </div>

              {/* Document Image Preview or Generated Certificate */}
              {inspectDoc.filePreview ? (
                <div className="rounded-2xl overflow-hidden border-2 border-[#0A0A0A] max-h-56">
                  <img
                    src={inspectDoc.filePreview}
                    alt={inspectDoc.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border-2 border-neutral-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-neutral-500 uppercase">Document Number</div>
                      <div className="font-mono font-black text-lg text-[#0A0A0A]">{inspectDoc.docNumber}</div>
                    </div>
                    <div className="p-2 bg-neutral-100 rounded-xl border border-neutral-300">
                      <QrCode className="w-8 h-8 text-[#0A0A0A]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-200 font-bold">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Issued Date</span>
                      <span className="text-[#0A0A0A]">{inspectDoc.issueDate}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Valid Until</span>
                      <span className="text-[#0A0A0A]">{inspectDoc.expiryDate}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* QR Code Scan Bar */}
              <div className="p-3 bg-white rounded-2xl border-2 border-[#0A0A0A] flex items-center gap-3">
                <QrCode className="w-10 h-10 text-[#0A0A0A] shrink-0" />
                <div className="text-[11px] font-medium text-neutral-700 leading-tight">
                  <span className="font-black text-[#0A0A0A] block">
                    {language === 'mr' ? 'तपासणीसाठी QR स्कॅन करा' : 'Scan for Live Inspection'}
                  </span>
                  SHA-256 Hash: <span className="font-mono font-bold text-[10px] text-neutral-500">89fa2...bc19</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  showToast(
                    language === 'mr' ? 'कागदपत्र प्रिंट / डाउनलोड सुरू' : 'Preparing official PDF...',
                    'success'
                  );
                }}
                className="flex-1 min-h-[52px] rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-[#171717] font-black text-xs flex items-center justify-center gap-2 border-2 border-[#0A0A0A] active:scale-95 transition-all"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{language === 'mr' ? 'डाउनलोड / सेव्ह' : 'Download PDF'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteDoc(inspectDoc.id)}
                className="min-h-[52px] px-4 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-black text-xs flex items-center justify-center gap-1.5 border-2 border-red-300 active:scale-95 transition-all"
                title="Delete Document"
              >
                <Trash2 className="w-4 h-4" />
                <span>{language === 'mr' ? 'हटवा' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
