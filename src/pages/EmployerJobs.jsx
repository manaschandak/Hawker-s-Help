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
  Users
} from 'lucide-react';
import RatingModal from '../components/RatingModal';

export default function EmployerJobs({ onOpenPostJob, onGoToFindWorkers }) {
  const { jobs, clockIn, clockOut, confirmHoursAndPay, language, t } = useApp();
  const navigate = useNavigate();

  const [activeRatingJob, setActiveRatingJob] = useState(null);

  // Filter jobs for employer dashboard
  const employerJobs = jobs.filter(j => j.employerId === 'emp1' || j.employerId === 'emp_current');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      
      {/* 1. Decluttered Employer Greeting & Profile Banner */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shadow-inner shrink-0">
              👩🏻‍💼
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-slate-900 text-lg sm:text-xl">
                  Sunita Joshi (सुनिता जोशी)
                </h1>
                <span className="p-1 bg-emerald-100 text-emerald-800 rounded-full" title="Verified Homeowner">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Khopoli Heights • Homeowner & Site Host
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 shrink-0">
            <div>
              <div className="text-sm font-black text-emerald-700">100%</div>
              <div className="text-[10px] text-slate-500 font-bold">{t('paidOnTime')}</div>
            </div>
            <div className="w-[1px] h-8 bg-slate-200"></div>
            <div>
              <div className="text-sm font-black text-slate-900">{employerJobs.length}</div>
              <div className="text-[10px] text-slate-500 font-bold">Active Listings</div>
            </div>
          </div>
        </div>

        {/* 2. Three Primary Action Cards (Progressive Disclosure / Declutter) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          
          {/* Action 1: Find Workers */}
          <button
            onClick={() => {
              if (onGoToFindWorkers) onGoToFindWorkers();
              else navigate('/workers');
            }}
            className="p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border-2 border-amber-200 text-left transition-all group flex flex-col justify-between space-y-2 touch-target"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">👷🏽‍♂️</span>
              <ArrowRight size={16} className="text-[#B45309] group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                {language === 'mr' ? 'कारागीर शोधा' : 'Find Workers'}
              </h3>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                {language === 'mr' ? 'नाक्यावरील उपलब्ध कारागीर व संघ' : 'Browse available naka trades'}
              </p>
            </div>
          </button>

          {/* Action 2: Post a New Job */}
          <button
            onClick={onOpenPostJob}
            className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-left transition-all group flex flex-col justify-between space-y-2 touch-target shadow-md"
          >
            <div className="flex items-center justify-between">
              <PlusCircle className="w-6 h-6 text-amber-400" />
              <ArrowRight size={16} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm">
                {language === 'mr' ? 'नवीन काम पोस्ट करा' : 'Post a New Job'}
              </h3>
              <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                {language === 'mr' ? 'नाक्यावर थेट सूचना पाठवा' : 'Broadcast vacancy to nearby nakas'}
              </p>
            </div>
          </button>

          {/* Action 3: Hiring Plans */}
          <button
            onClick={() => navigate('/plans')}
            className="p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-left transition-all group flex flex-col justify-between space-y-2 touch-target"
          >
            <div className="flex items-center justify-between">
              <Sparkles className="w-6 h-6 text-[#B45309]" />
              <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                {language === 'mr' ? 'कंत्राटदार योजना' : 'Hiring Plans'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {language === 'mr' ? 'सवलतीचे प्रो प्लॅन व जीएसटी' : 'Contractor Pro & 10 free trial hires'}
              </p>
            </div>
          </button>

        </div>
      </div>

      {/* 3. My Posted Jobs Live Tracker List (Responsive Multi-Column Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#B45309]" />
            <span>{t('navEmployerJobs')} ({employerJobs.length})</span>
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            {language === 'mr' ? 'थेट हिशोब व प्रगती' : 'Shift and payment monitor'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employerJobs.map(job => {
            const titleText = job.title[language] || job.title.en;

            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                {/* Header: Title & Status */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        {job.trade.toUpperCase()} • {job.startDate}
                      </span>
                      <h3 className="font-black text-slate-900 text-base leading-snug">
                        {titleText}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        📍 {job.locationName}
                      </p>
                    </div>

                    {/* Status Badges */}
                    <div>
                      {job.status === 'open' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-100 text-blue-900">
                          {language === 'mr' ? 'खुले' : 'Open'}
                        </span>
                      )}
                      {job.status === 'accepted' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900">
                          {language === 'mr' ? 'स्वीकारले' : 'Accepted'}
                        </span>
                      )}
                      {job.status === 'in_progress' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900 animate-pulse">
                          {language === 'mr' ? 'काम सुरू' : 'In Progress'}
                        </span>
                      )}
                      {job.status === 'completed_pending_payment' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-purple-100 text-purple-900">
                          {language === 'mr' ? 'पैसे बाकी' : 'Pay Pending'}
                        </span>
                      )}
                      {job.status === 'paid' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900">
                          {language === 'mr' ? 'मंजूर व जमा' : 'Paid'}
                        </span>
                      )}
                      {job.status === 'rated' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-slate-100 text-slate-800">
                          ★ {language === 'mr' ? 'रेटिंग झाली' : 'Rated'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Wage & Hours Preview */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-700">
                      मजुरी: <strong className="text-[#B45309]">₹{job.payOffer}/{job.payUnit}</strong>
                    </span>
                    <span className="text-slate-500 font-medium">
                      वेळ: {job.hoursText}
                    </span>
                  </div>
                </div>

                {/* Status-Driven Contextual Action Cards */}
                <div className="pt-2 border-t border-slate-100">
                  
                  {/* State 1: Open -> Go find workers */}
                  {job.status === 'open' && (
                    <button
                      onClick={() => {
                        if (onGoToFindWorkers) onGoToFindWorkers();
                        else navigate('/workers');
                      }}
                      className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 touch-target active:scale-95"
                    >
                      <span>{language === 'mr' ? 'नाक्यावर योग्य कारागीर शोधा' : 'Find Workers for this Job'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {/* State 2: Accepted (Simulate worker clock-in) */}
                  {job.status === 'accepted' && (
                    <div className="space-y-2">
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                        👷 <strong>Ramesh Shinde</strong> यांनी काम स्वीकारले आहे.
                      </div>
                      <button
                        onClick={() => clockIn(job.id)}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs touch-target active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Clock className="w-4 h-4" />
                        <span>{language === 'mr' ? 'हजेरी नोंदवा (Clock In)' : 'Simulate Clock In'}</span>
                      </button>
                    </div>
                  )}

                  {/* State 3: In Progress (Simulate worker clock-out) */}
                  {job.status === 'in_progress' && (
                    <div className="space-y-2">
                      <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium flex items-center justify-between">
                        <span>कामगार सध्या कामावर हजर आहे</span>
                        <span className="font-bold">सुरू: 9:00 AM</span>
                      </div>
                      <button
                        onClick={() => clockOut(job.id, 8)}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs touch-target active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'mr' ? 'काम संपले (Clock Out / 8 तास)' : 'Simulate Clock Out (8 hrs)'}</span>
                      </button>
                    </div>
                  )}

                  {/* State 4: Completed Pending Payment */}
                  {job.status === 'completed_pending_payment' && (
                    <div className="space-y-2.5 p-3 bg-amber-50 rounded-xl border-2 border-amber-300">
                      <div className="flex justify-between items-center text-xs font-black text-slate-900">
                        <span>{language === 'mr' ? 'एकूण झालेले तास: 8 तास' : 'Logged: 8 hours'}</span>
                        <span className="text-[#B45309] text-sm">देय रक्कम: ₹{job.agreedPay || job.payOffer}</span>
                      </div>

                      <button
                        onClick={() => confirmHoursAndPay(job.id)}
                        className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl text-xs shadow-md touch-target active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'mr' ? 'वेळ मान्य करा व मजुरी दिली (Mark Paid)' : 'Confirm Hours & Mark Paid'}</span>
                      </button>
                    </div>
                  )}

                  {/* State 5: Paid -> Ready for Rating */}
                  {job.status === 'paid' && (
                    <button
                      onClick={() => setActiveRatingJob(job)}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-sm touch-target active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Star className="w-4 h-4 fill-slate-950" />
                      <span>{language === 'mr' ? 'कारागिराला गुण द्या (Rate Worker)' : 'Rate Worker Experience'}</span>
                    </button>
                  )}

                  {/* State 6: Completed & Rated */}
                  {job.status === 'rated' && (
                    <div className="text-center py-1 text-xs font-bold text-emerald-800">
                      ✓ {language === 'mr' ? 'व्यवहार व रेटिंग यशस्वीरित्या पूर्ण झाली' : 'Job cycle completed & rated!'}
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
