import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Star,
  ShieldCheck,
  User,
  ArrowRight,
  Phone,
  Sparkles,
  Users,
  MapPin,
  HardHat
} from 'lucide-react';
import RatingModal from '../components/RatingModal';
import { TradeCharacter, EmployerCharacter } from '../components/Characters';

export default function EmployerJobs({ onOpenPostJob, onGoToFindWorkers }) {
  const { jobs, clockIn, clockOut, confirmHoursAndPay, language, t } = useApp();
  const navigate = useNavigate();

  const [activeRatingJob, setActiveRatingJob] = useState(null);

  // Filter jobs for employer dashboard
  const employerJobs = jobs.filter(j => j.employerId === 'emp1' || j.employerId === 'emp_current');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      
      {/* 1. Decluttered Employer Greeting & Profile Banner */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 border-2 border-[#0A0A0A] flex items-center justify-center shrink-0">
              <EmployerCharacter className="w-14 h-14" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-[#0A0A0A] text-lg sm:text-xl">
                  Sunita Joshi (सुनिता जोशी)
                </h1>
                <span className="p-1 bg-[#DCFCE7] text-[#15803D] border border-[#15803D] rounded-full" title="Verified Homeowner">
                  <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-bold mt-0.5">
                Khopoli Heights • Homeowner & Site Host
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#FEF08A]/40 px-4 py-2.5 rounded-full border-2 border-[#0A0A0A] shrink-0">
            <div>
              <div className="text-sm font-black text-[#15803D]">100%</div>
              <div className="text-[10px] text-neutral-700 font-bold">{t('paidOnTime')}</div>
            </div>
            <div className="w-[2px] h-8 bg-[#0A0A0A]"></div>
            <div>
              <div className="text-sm font-black text-[#0A0A0A]">{employerJobs.length}</div>
              <div className="text-[10px] text-neutral-700 font-bold">Active Listings</div>
            </div>
          </div>
        </div>

        {/* 2. Three Primary Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t-2 border-neutral-100">
          
          {/* Action 1: Find Workers */}
          <button
            onClick={() => {
              if (onGoToFindWorkers) onGoToFindWorkers();
              else navigate('/workers');
            }}
            className="p-5 rounded-[28px] bg-[#FEF08A]/40 hover:bg-[#FEF08A] border-2 border-[#0A0A0A] text-left transition-all group flex flex-col justify-between space-y-3 touch-target"
          >
            <div className="flex items-center justify-between">
              <TradeCharacter trade="plumber" className="w-10 h-10" />
              <ArrowRight size={18} className="text-[#0A0A0A] group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-[#0A0A0A] text-sm">
                {language === 'mr' ? 'कारागीर शोधा' : 'Find Workers'}
              </h3>
              <p className="text-[11px] text-neutral-700 font-bold mt-0.5">
                {language === 'mr' ? 'नाक्यावरील उपलब्ध कारागीर व संघ' : 'Browse available naka trades'}
              </p>
            </div>
          </button>

          {/* Action 2: Post a New Job */}
          <button
            onClick={onOpenPostJob}
            className="p-5 rounded-[28px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] text-left transition-all group flex flex-col justify-between space-y-3 touch-target shadow-sm"
          >
            <div className="flex items-center justify-between">
              <PlusCircle className="w-8 h-8 text-[#0A0A0A] stroke-[2.5]" />
              <ArrowRight size={18} className="text-[#0A0A0A] group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-[#0A0A0A] text-sm">
                {language === 'mr' ? 'नवीन काम पोस्ट करा' : 'Post a New Job'}
              </h3>
              <p className="text-[11px] text-neutral-800 font-bold mt-0.5">
                {language === 'mr' ? 'नाक्यावर थेट सूचना पाठवा' : 'Broadcast vacancy to nearby nakas'}
              </p>
            </div>
          </button>

          {/* Action 3: Hiring Plans */}
          <button
            onClick={() => navigate('/plans')}
            className="p-5 rounded-[28px] bg-white hover:bg-neutral-50 border-2 border-[#0A0A0A] text-left transition-all group flex flex-col justify-between space-y-3 touch-target"
          >
            <div className="flex items-center justify-between">
              <Sparkles className="w-8 h-8 text-[#0A0A0A]" />
              <ArrowRight size={18} className="text-[#0A0A0A] group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-[#0A0A0A] text-sm">
                {language === 'mr' ? 'कंत्राटदार योजना' : 'Hiring Plans'}
              </h3>
              <p className="text-[11px] text-neutral-600 font-bold mt-0.5">
                {language === 'mr' ? 'सवलतीचे प्रो प्लॅन व जीएसटी' : 'Contractor Pro & 10 free trial hires'}
              </p>
            </div>
          </button>

        </div>
      </div>

      {/* 3. My Posted Jobs Live Tracker List (Responsive Multi-Column Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#0A0A0A]" />
            <span>{t('navEmployerJobs')} ({employerJobs.length})</span>
          </h2>
          <span className="text-xs text-neutral-600 font-bold">
            {language === 'mr' ? 'थेट हिशोब व प्रगती' : 'Shift and payment monitor'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employerJobs.map(job => {
            const titleText = job.title[language] || job.title.en;

            return (
              <div
                key={job.id}
                className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                {/* Header: Title & Status */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wide">
                        {job.trade.toUpperCase()} • {job.startDate}
                      </span>
                      <h3 className="font-black text-[#0A0A0A] text-base leading-snug">
                        {titleText}
                      </h3>
                      <p className="text-xs text-neutral-600 font-bold mt-0.5 flex items-center gap-1">
                        <MapPin size={13} className="text-[#0A0A0A]" />
                        <span>{job.locationName}</span>
                      </p>
                    </div>

                    {/* Status Badges */}
                    <div>
                      {job.status === 'open' && (
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-neutral-100 text-[#0A0A0A] border border-[#0A0A0A]">
                          {language === 'mr' ? 'खुले' : 'Open'}
                        </span>
                      )}
                      {job.status === 'accepted' && (
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FEF08A] text-[#0A0A0A] border border-[#0A0A0A]">
                          {language === 'mr' ? 'स्वीकारले' : 'Accepted'}
                        </span>
                      )}
                      {job.status === 'in_progress' && (
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-[#DCFCE7] text-[#15803D] border border-[#15803D] animate-pulse">
                          {language === 'mr' ? 'काम सुरू' : 'In Progress'}
                        </span>
                      )}
                      {job.status === 'completed_pending_payment' && (
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-950 border border-amber-400">
                          {language === 'mr' ? 'पैसे बाकी' : 'Pay Pending'}
                        </span>
                      )}
                      {job.status === 'paid' && (
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-[#DCFCE7] text-[#15803D] border border-[#15803D]">
                          {language === 'mr' ? 'मंजूर व जमा' : 'Paid'}
                        </span>
                      )}
                      {job.status === 'rated' && (
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-neutral-100 text-[#0A0A0A] border border-[#0A0A0A] inline-flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#0A0A0A]" />
                          <span>{language === 'mr' ? 'रेटिंग झाली' : 'Rated'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Wage & Hours Preview */}
                  <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-[20px] border border-neutral-200 text-xs">
                    <span className="font-bold text-neutral-700">
                      मजुरी: <strong className="text-[#0A0A0A] text-sm">₹{job.payOffer}/{job.payUnit}</strong>
                    </span>
                    <span className="text-neutral-600 font-bold">
                      वेळ: {job.hoursText}
                    </span>
                  </div>
                </div>

                {/* Status-Driven Contextual Action Cards */}
                <div className="pt-2 border-t-2 border-neutral-100">
                  
                  {/* State 1: Open -> Go find workers */}
                  {job.status === 'open' && (
                    <button
                      onClick={() => {
                        if (onGoToFindWorkers) onGoToFindWorkers();
                        else navigate('/workers');
                      }}
                      className="w-full min-h-[52px] px-4 bg-[#0A0A0A] hover:bg-neutral-800 text-[#FDE047] font-black rounded-full text-xs flex items-center justify-center gap-2 touch-target active:scale-95"
                    >
                      <span>{language === 'mr' ? 'नाक्यावर योग्य कारागीर शोधा' : 'Find Workers for this Job'}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  )}

                  {/* State 2: Accepted (Simulate worker clock-in) */}
                  {job.status === 'accepted' && (
                    <div className="space-y-2">
                      <div className="p-3 bg-[#FEF08A]/40 rounded-[20px] border border-[#0A0A0A] text-xs text-[#0A0A0A] font-bold flex items-center gap-2">
                        <HardHat className="w-4 h-4 text-[#0A0A0A]" />
                        <span><strong>Ramesh Shinde</strong> यांनी काम स्वीकारले आहे.</span>
                      </div>
                      <button
                        onClick={() => clockIn(job.id)}
                        className="w-full min-h-[52px] bg-[#15803D] hover:bg-green-700 text-white font-black rounded-full text-xs touch-target active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Clock className="w-4 h-4 stroke-[2.5]" />
                        <span>{language === 'mr' ? 'हजेरी नोंदवा (Clock In)' : 'Simulate Clock In'}</span>
                      </button>
                    </div>
                  )}

                  {/* State 3: In Progress (Simulate worker clock-out) */}
                  {job.status === 'in_progress' && (
                    <div className="space-y-2">
                      <div className="p-3 bg-[#DCFCE7] rounded-[20px] border border-[#15803D] text-xs text-[#15803D] font-black flex items-center justify-between">
                        <span>कामगार सध्या कामावर हजर आहे</span>
                        <span>सुरू: 9:00 AM</span>
                      </div>
                      <button
                        onClick={() => clockOut(job.id, 8)}
                        className="w-full min-h-[52px] bg-[#0A0A0A] hover:bg-neutral-800 text-[#FDE047] font-black rounded-full text-xs touch-target active:scale-95 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        <span>{language === 'mr' ? 'काम संपले (Clock Out / 8 तास)' : 'Simulate Clock Out (8 hrs)'}</span>
                      </button>
                    </div>
                  )}

                  {/* State 4: Completed Pending Payment */}
                  {job.status === 'completed_pending_payment' && (
                    <div className="space-y-2.5 p-4 bg-[#FEF08A]/40 rounded-[24px] border-2 border-[#0A0A0A]">
                      <div className="flex justify-between items-center text-xs font-black text-[#0A0A0A]">
                        <span>{language === 'mr' ? 'एकूण झालेले तास: 8 तास' : 'Logged: 8 hours'}</span>
                        <span className="text-base">देय रक्कम: ₹{job.agreedPay || job.payOffer}</span>
                      </div>

                      <button
                        onClick={() => confirmHoursAndPay(job.id)}
                        className="w-full min-h-[52px] bg-[#15803D] hover:bg-green-700 text-white font-black rounded-full text-xs shadow-md touch-target active:scale-95 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        <span>{language === 'mr' ? 'वेळ मान्य करा व मजुरी दिली (Mark Paid)' : 'Confirm Hours & Mark Paid'}</span>
                      </button>
                    </div>
                  )}

                  {/* State 5: Paid -> Ready for Rating */}
                  {job.status === 'paid' && (
                    <button
                      onClick={() => setActiveRatingJob(job)}
                      className="w-full min-h-[52px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] border-2 border-[#0A0A0A] font-black rounded-full text-xs shadow-sm touch-target active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Star className="w-4 h-4 fill-[#0A0A0A]" />
                      <span>{language === 'mr' ? 'कारागिराला गुण द्या (Rate Worker)' : 'Rate Worker Experience'}</span>
                    </button>
                  )}

                  {/* State 6: Completed & Rated */}
                  {job.status === 'rated' && (
                    <div className="text-center py-2 text-xs font-black text-[#15803D] flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{language === 'mr' ? 'व्यवहार व रेटिंग यशस्वीरित्या पूर्ण झाली' : 'Job cycle completed & rated!'}</span>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rating Modal */}
      {activeRatingJob && (
        <RatingModal
          isOpen={true}
          onClose={() => setActiveRatingJob(null)}
          targetName="Ramesh Shinde (Plumber)"
          targetRole="worker"
          jobId={activeRatingJob.id}
        />
      )}

    </div>
  );
}
