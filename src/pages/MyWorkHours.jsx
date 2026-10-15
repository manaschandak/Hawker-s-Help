import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  CheckCircle2,
  Calendar,
  IndianRupee,
  MapPin,
  ShieldCheck,
  User,
  ArrowRight,
  Download,
  Share2,
  Sparkles,
  AlertCircle,
  Play,
  Square,
  FileText
} from 'lucide-react';
import { TradeCharacter, StateCharacter } from '../components/Characters';

export default function MyWorkHours() {
  const { workerProfile, language, t, showToast } = useApp();

  // Shift timer state
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [shiftSeconds, setShiftSeconds] = useState(4 * 3600 + 32 * 60 + 15); // Simulated 4h 32m into shift
  const [activeTab, setActiveTab] = useState('attendance'); // attendance | earnings | bocw

  useEffect(() => {
    let interval = null;
    if (isClockedIn) {
      interval = setInterval(() => {
        setShiftSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleClock = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      showToast(
        language === 'mr'
          ? 'आजचे काम पूर्ण झाले! ८ तास हजेरी नोंदवली गेली.'
          : 'Shift marked complete! 8 hours logged to attendance muster.',
        'success'
      );
    } else {
      setIsClockedIn(true);
      setShiftSeconds(0);
      showToast(
        language === 'mr'
          ? 'नवीन शिफ्ट सुरू झाली (Clock In यशस्वी)'
          : 'Shift started! Real-time muster clock active.',
        'success'
      );
    }
  };

  const attendanceLog = [
    {
      id: 'att_1',
      date: language === 'mr' ? 'आज (15 ऑक्टोबर)' : 'Today (15 Oct)',
      employer: 'Sunita Joshi (सुनिता जोशी)',
      site: 'Khopoli Heights, Station Road',
      hours: '8 hrs',
      wage: 700,
      paymentMode: language === 'mr' ? 'रोख (Cash in hand)' : 'Cash in hand',
      status: 'paid',
      statusLabel: language === 'mr' ? 'रोख अदा' : 'Paid in Cash'
    },
    {
      id: 'att_2',
      date: language === 'mr' ? 'काल (14 ऑक्टोबर)' : 'Yesterday (14 Oct)',
      employer: 'Rajesh Verma (कंत्राटदार)',
      site: 'Khopoli Naka Commercial Complex',
      hours: '8 hrs',
      wage: 750,
      paymentMode: 'Online UPI',
      status: 'paid',
      statusLabel: language === 'mr' ? 'UPI जमा' : 'UPI Credited'
    },
    {
      id: 'att_3',
      date: language === 'mr' ? '13 ऑक्टोबर' : '13 Oct',
      employer: 'Khopoli Chowk Site #3',
      site: 'Bazar Peth, Khopoli',
      hours: '8 hrs',
      wage: 700,
      paymentMode: language === 'mr' ? 'रोख (Cash)' : 'Cash',
      status: 'paid',
      statusLabel: language === 'mr' ? 'रोख अदा' : 'Paid in Cash'
    },
    {
      id: 'att_4',
      date: language === 'mr' ? '12 ऑक्टोबर' : '12 Oct',
      employer: 'Amit Shinde (दुकानदार)',
      site: 'Near Bus Stand, Khalapur',
      hours: '4 hrs (Half Day)',
      wage: 400,
      paymentMode: 'Online UPI',
      status: 'paid',
      statusLabel: language === 'mr' ? 'अर्धा दिवस' : 'Half Day'
    },
    {
      id: 'att_5',
      date: language === 'mr' ? '11 ऑक्टोबर' : '11 Oct',
      employer: 'Sunita Joshi (सुनिता जोशी)',
      site: 'Khopoli Heights, Flat 402',
      hours: '8 hrs',
      wage: 700,
      paymentMode: language === 'mr' ? 'रोख (Cash)' : 'Cash',
      status: 'paid',
      statusLabel: language === 'mr' ? 'रोख अदा' : 'Paid in Cash'
    },
    {
      id: 'att_6',
      date: language === 'mr' ? '10 ऑक्टोबर' : '10 Oct',
      employer: 'Skyline Civil Infrastructure',
      site: 'Pen-Khopoli Highway Site',
      hours: '9 hrs (Overtime +1h)',
      wage: 850,
      paymentMode: 'Bank Transfer',
      status: 'paid',
      statusLabel: language === 'mr' ? 'ओव्हरटाईम सह' : 'Overtime Paid'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      
      {/* 1. Header Profile Banner */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 border-2 border-[#0A0A0A] flex items-center justify-center shrink-0">
              <TradeCharacter trade={workerProfile.trade} className="w-14 h-14" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-[#0A0A0A] text-lg sm:text-xl">
                  {language === 'mr' ? 'माझे काम व तास (हजेरी वही)' : 'My Work & Hours Ledger'}
                </h1>
                <span className="p-1 bg-[#DCFCE7] text-[#15803D] border border-[#15803D] rounded-full" title="Aadhaar Verified">
                  <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-bold mt-0.5">
                {workerProfile.name} • {workerProfile.naka} • {workerProfile.experienceYears} {language === 'mr' ? 'वर्षे अनुभव' : 'yrs exp'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#FEF08A]/40 px-4 py-2.5 rounded-full border-2 border-[#0A0A0A] shrink-0">
            <div>
              <div className="text-xs font-black text-neutral-600 uppercase tracking-wide">
                {language === 'mr' ? 'एकूण हजेरी' : 'Total Muster'}
              </div>
              <div className="text-base font-black text-[#0A0A0A]">
                {workerProfile.hoursWorkedTotal} {language === 'mr' ? 'तास पूर्ण' : 'Hours'}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Digital Punch Clock Card */}
        <div className="bg-[#0A0A0A] text-white rounded-[28px] p-5 sm:p-6 space-y-4 border-2 border-[#0A0A0A] shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                isClockedIn ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-neutral-800 text-neutral-300'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{isClockedIn ? (language === 'mr' ? 'सक्रिय शिफ्ट (काम सुरू आहे)' : 'Active Shift In Progress') : (language === 'mr' ? 'काम संपले (Shift Closed)' : 'Shift Inactive')}</span>
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Sunita Joshi (सुनिता जोशी) • Khopoli Heights
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                {language === 'mr' ? 'प्लंबिंग दुरुस्ती व पाईप फिटिंग काम' : 'Plumbing overhaul and leak fix shift'}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="font-mono text-3xl sm:text-4xl font-black text-[#FDE047] tracking-wider">
                {formatTimer(shiftSeconds)}
              </div>
              <div className="text-xs text-neutral-400 font-bold mt-0.5">
                {language === 'mr' ? 'आजचे प्रत्यक्ष कामाचे तास' : 'Today Elapsed Shift Time'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
              <span className="bg-[#FDE047] text-[#0A0A0A] px-3 py-1 rounded-full font-black text-sm">
                ₹{workerProfile.baseWageAsk}
              </span>
              <span>/{language === 'mr' ? 'दिवस मजुरी हमी' : 'day agreed wage'}</span>
            </div>

            <button
              onClick={handleToggleClock}
              className={`min-h-[52px] px-6 rounded-full font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border-2 ${
                isClockedIn
                  ? 'bg-[#DC2626] hover:bg-red-700 text-white border-red-500'
                  : 'bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-[#0A0A0A]'
              }`}
            >
              {isClockedIn ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>{language === 'mr' ? 'हजेरी बंद करा (Clock Out - 8 तास)' : 'Punch Clock Out (8 hrs)'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{language === 'mr' ? 'नवीन काम सुरू करा (Clock In)' : 'Punch Clock In (Start Shift)'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. Three Earnings Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-[24px] bg-[#FEF08A]/40 border-2 border-[#0A0A0A] space-y-1">
            <span className="text-[11px] font-black uppercase text-neutral-700 tracking-wide">
              {language === 'mr' ? 'आजची रोख कमाई' : "Today's Earnings"}
            </span>
            <div className="text-2xl font-black text-[#0A0A0A]">
              ₹700
            </div>
            <p className="text-[11px] text-[#15803D] font-black flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>{language === 'mr' ? 'रोख हातात मिळाली' : 'Received in Cash'}</span>
            </p>
          </div>

          <div className="p-4 rounded-[24px] bg-white border-2 border-[#0A0A0A] space-y-1">
            <span className="text-[11px] font-black uppercase text-neutral-700 tracking-wide">
              {language === 'mr' ? 'या आठवड्याची कमाई' : 'This Week'}
            </span>
            <div className="text-2xl font-black text-[#0A0A0A]">
              ₹4,200
            </div>
            <p className="text-[11px] text-neutral-600 font-bold">
              {language === 'mr' ? '६ दिवस पूर्ण • सरासरी ₹७००' : '6 shifts completed'}
            </p>
          </div>

          <div className="p-4 rounded-[24px] bg-white border-2 border-[#0A0A0A] space-y-1">
            <span className="text-[11px] font-black uppercase text-neutral-700 tracking-wide">
              {language === 'mr' ? 'या महिन्याची एकूण मजुरी' : 'This Month Total'}
            </span>
            <div className="text-2xl font-black text-[#0A0A0A]">
              ₹18,200
            </div>
            <p className="text-[11px] text-[#15803D] font-bold">
              {language === 'mr' ? '२६ दिवस हजेरी नोंद' : '26 verified shifts'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Navigation Subtabs */}
      <div className="flex bg-[#0A0A0A] p-1.5 rounded-full text-xs font-black border border-[#0A0A0A] max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 py-2.5 rounded-full transition-all text-center ${
            activeTab === 'attendance'
              ? 'bg-[#FDE047] text-[#0A0A0A] shadow-sm font-black'
              : 'text-white hover:text-[#FDE047]'
          }`}
        >
          {language === 'mr' ? 'हजेरी नोंदवही' : 'Attendance Muster'}
        </button>
        <button
          onClick={() => setActiveTab('bocw')}
          className={`flex-1 py-2.5 rounded-full transition-all text-center ${
            activeTab === 'bocw'
              ? 'bg-[#FDE047] text-[#0A0A0A] shadow-sm font-black'
              : 'text-white hover:text-[#FDE047]'
          }`}
        >
          {language === 'mr' ? '९०-दिवस प्रमाणपत्र' : 'BOCW 90-Day Proof'}
        </button>
      </div>

      {/* 5. TAB 1: Attendance Muster Log List */}
      {activeTab === 'attendance' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0A0A0A]" />
              <span>{language === 'mr' ? 'मागील हजेरी व मजुरी पावती' : 'Recent Shifts & Payment History'}</span>
            </h2>
            <span className="text-xs text-neutral-600 font-bold">
              {attendanceLog.length} {language === 'mr' ? 'दिवस नोंद' : 'records logged'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {attendanceLog.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[28px] border-2 border-[#0A0A0A] hover:border-[#FDE047] p-5 shadow-sm space-y-3 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-black uppercase text-neutral-500 tracking-wider">
                      {item.date}
                    </span>
                    <h3 className="font-black text-[#0A0A0A] text-base leading-snug mt-0.5">
                      {item.employer}
                    </h3>
                    <p className="text-xs text-neutral-600 font-bold flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-[#0A0A0A]" />
                      <span className="truncate max-w-[200px]">{item.site}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3 py-1 rounded-full text-lg font-black shadow-xs">
                      ₹{item.wage}
                    </div>
                    <span className="text-[10px] font-bold text-neutral-600 block mt-0.5">
                      {item.hours}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t-2 border-neutral-100 text-xs font-bold">
                  <span className="text-neutral-700">
                    {language === 'mr' ? 'पद्धत:' : 'Mode:'} <strong className="text-[#0A0A0A]">{item.paymentMode}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] font-black border border-[#15803D] text-[11px]">
                    <CheckCircle2 size={12} />
                    <span>{item.statusLabel}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB 2: BOCW 90-Day Attendance Certificate Generator */}
      {activeTab === 'bocw' && (
        <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FDE047] text-[#0A0A0A] border border-[#0A0A0A] text-[11px] font-black uppercase tracking-wider">
                <span>महाराष्ट्र शासन BOCW कल्याण मंडळ</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0A0A0A]">
                {language === 'mr' ? '९० दिवस कामाचे अधिकृत हजेरी प्रमाणपत्र' : 'Official 90-Day Muster Certificate'}
              </h3>
              <p className="text-xs text-neutral-600 font-bold">
                {language === 'mr' ? 'सरकारी ₹५,००० अवजारे किट व पेन्शनसाठी हे प्रमाणपत्र आवश्यक असते' : 'Required proof for state welfare board grants, tool kits, and health benefits'}
              </p>
            </div>

            <StateCharacter state="happy" className="w-16 h-16 shrink-0" />
          </div>

          {/* Progress toward 90 days */}
          <div className="p-4 bg-neutral-50 rounded-[24px] border-2 border-[#0A0A0A] space-y-2">
            <div className="flex justify-between items-center text-xs font-black text-[#0A0A0A]">
              <span>{language === 'mr' ? 'हजेरी प्रगती (चालू वर्ष)' : 'Muster Progress (Current Year)'}</span>
              <span className="bg-[#FEF08A] px-2.5 py-0.5 rounded-full border border-[#0A0A0A]">
                ७८ / ९० दिवस पूर्ण (86%)
              </span>
            </div>

            <div className="w-full bg-neutral-200 h-4 rounded-full overflow-hidden border border-[#0A0A0A]">
              <div className="bg-[#15803D] h-full rounded-full transition-all" style={{ width: '86%' }}></div>
            </div>

            <p className="text-[11px] text-neutral-600 font-bold">
              {language === 'mr'
                ? 'केवळ १२ दिवस अधिक काम केल्यानंतर तुम्ही थेट मोफत अवजारे किटसाठी पात्र व्हाल!'
                : 'Just 12 more verified working days to qualify for the annual ₹5,000 tool kit grant!'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                showToast(
                  language === 'mr'
                    ? 'हजेरी प्रमाणपत्र PDF डाऊनलोड झाले!'
                    : 'BOCW Muster Certificate PDF downloaded!',
                  'success'
                );
              }}
              className="flex-1 min-h-[56px] px-6 bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <Download size={16} className="stroke-[2.5]" />
              <span>{language === 'mr' ? 'हजेरी प्रमाणपत्र डाऊनलोड करा (PDF)' : 'Download Muster Certificate (PDF)'}</span>
            </button>

            <button
              onClick={() => {
                showToast(
                  language === 'mr'
                    ? 'CSC केंद्रासाठी QR कोड व लिंक कॉपी झाली!'
                    : 'Certificate link copied for CSC Centre verification!',
                  'info'
                );
              }}
              className="min-h-[56px] px-6 bg-white hover:bg-neutral-100 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full text-xs flex items-center justify-center gap-2 active:scale-95"
            >
              <Share2 size={16} className="stroke-[2.5]" />
              <span>{language === 'mr' ? 'CSC केंद्रास पाठवा' : 'Send to CSC'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
