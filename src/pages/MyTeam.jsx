import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Plus,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Phone,
  Briefcase,
  UserPlus
} from 'lucide-react';

export default function MyTeam() {
  const { teams, INITIAL_WORKERS, language, showToast, t } = useApp();

  const [activeTeam, setActiveTeam] = useState(teams[0]);
  const [teamAvailability, setTeamAvailability] = useState('available');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const toggleTeamAvailability = () => {
    const next = teamAvailability === 'available' ? 'busy' : 'available';
    setTeamAvailability(next);
    showToast(
      language === 'mr'
        ? `संघाची स्थिती: ${next === 'available' ? 'उपलब्ध' : 'व्यस्त'}`
        : `Team is now ${next}`
    );
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeamName) return;
    showToast(
      language === 'mr'
        ? `नवीन संघ "${newTeamName}" तयार झाला!`
        : `New team "${newTeamName}" created!`,
      'success'
    );
    setIsCreateModalOpen(false);
    setNewTeamName('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-6">
      
      {/* 1. Team Hero Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl p-2 bg-amber-100 rounded-xl">👥</span>
              <div>
                <h1 className="font-black text-slate-900 text-base leading-snug">
                  {activeTeam.name}
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  {language === 'mr' ? 'प्रमुख (Leader):' : 'Leader:'} {activeTeam.leaderName}
                </p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-black text-[#B45309]">
              ₹{activeTeam.totalTeamDailyRate}
            </div>
            <div className="text-[10px] font-bold text-slate-500">
              /{language === 'mr' ? 'संपूर्ण संघ/दिवस' : 'full crew/day'}
            </div>
          </div>
        </div>

        {/* Team Availability Toggle */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                teamAvailability === 'available' ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'
              }`}
            />
            <span className="text-xs font-black text-slate-800">
              {teamAvailability === 'available'
                ? (language === 'mr' ? 'संघ उपलब्ध आहे' : 'Team Available')
                : (language === 'mr' ? 'संघ कामात व्यस्त आहे' : 'Team Busy')}
            </span>
          </div>

          <button
            onClick={toggleTeamAvailability}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs touch-target active:scale-95 ${
              teamAvailability === 'available'
                ? 'bg-amber-600 text-white'
                : 'bg-emerald-700 text-white'
            }`}
          >
            {teamAvailability === 'available'
              ? (language === 'mr' ? 'व्यस्त नोंदवा' : 'Mark Busy')
              : (language === 'mr' ? 'उपलब्ध करा' : 'Mark Free')}
          </button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1 border-t border-slate-100">
          <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-black text-slate-900">★ {activeTeam.rating}</div>
            <div className="text-[10px] text-slate-500">{activeTeam.jobsCompleted} {language === 'mr' ? 'पूर्ण झालेली कामे' : 'group jobs'}</div>
          </div>
          <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-black text-slate-900">{activeTeam.compositeTrades.length} कारागीर</div>
            <div className="text-[10px] text-slate-500">{language === 'mr' ? 'एकत्रित संघ' : 'Trades'}</div>
          </div>
        </div>
      </div>

      {/* 2. Team Composition & Wage Distribution Breakdown */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            {language === 'mr' ? 'संघातील सदस्य व रोज विभागणी' : 'Members & Wage Split'}
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            पारदर्शक हिशोब
          </span>
        </div>

        <div className="space-y-2">
          {activeTeam.compositeTrades.map((member, index) => (
            <div
              key={index}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">
                  {member.trade === 'plumber' ? '🔧' : member.trade === 'electrician' ? '⚡' : '👷'}
                </span>
                <div>
                  <div className="font-black text-slate-900">{member.workerName}</div>
                  <div className="text-[11px] text-slate-500 uppercase">{member.trade}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-[#B45309] text-sm">₹{member.dailyRate}</div>
                <div className="text-[10px] text-slate-500">/{language === 'mr' ? 'दिवस' : 'day'}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-950 leading-relaxed">
          🤝 {language === 'mr'
            ? 'संघातील प्रत्येक कामगाराचा वाटा आधीच ठरलेला असतो. मालकाने पैसे दिल्यावर कोणताही वाद होत नाही.'
            : 'Pre-agreed per-head splits ensure every worker gets their full share without disputes.'}
        </div>
      </div>

      {/* 3. Create a Team CTA */}
      <div className="text-center pt-1">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95"
        >
          <UserPlus className="w-5 h-5 text-amber-400" />
          <span>{language === 'mr' ? '+ नाक्यावरील मित्रांचा नवीन संघ बनवा' : '+ Create a New Worker Team'}</span>
        </button>
      </div>

      {/* Modal: Create Team */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateTeam} className="w-full max-w-[380px] bg-white rounded-3xl p-5 shadow-2xl space-y-4">
            <h3 className="font-black text-slate-900 text-base">
              {language === 'mr' ? 'नवीन कामगार संघ तयार करा' : 'Create a New Team'}
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'mr' ? 'संघाचे नाव:' : 'Team Name:'}
              </label>
              <input
                type="text"
                placeholder="उदा. खोपोली प्लास्टर संघ"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-xs text-slate-900"
                required
              />
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              {language === 'mr'
                ? 'प्रमुख म्हणून रमेश शिंदे (तुम्ही) नोंदवले जाल. इतर 2-3 कामगार नाक्यावरून जोडता येतील.'
                : 'You (Ramesh Shinde) will be registered as Team Leader.'}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="py-2.5 px-4 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
              >
                {language === 'mr' ? 'रद्द' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-[#B45309] text-white font-black rounded-xl text-xs shadow-md"
              >
                {language === 'mr' ? 'तयार करा' : 'Create Team'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
