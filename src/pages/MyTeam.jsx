import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  ShieldCheck,
  Star,
  Clock,
  Phone,
  Briefcase,
  UserPlus,
  Handshake,
  Check
} from 'lucide-react';
import { TeamIllustration, TradeCharacter } from '../components/Characters';

export default function MyTeam() {
  const { teams, language, showToast, t } = useApp();

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-24 space-y-5">
      
      {/* 1. Group Illustration Banner */}
      <div className="flex justify-center">
        <TeamIllustration className="w-full max-w-sm h-32" />
      </div>

      {/* 2. Team Hero Card */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FDE047] text-[#0A0A0A] rounded-2xl border-2 border-[#0A0A0A] shadow-xs">
              <Users className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-black text-[#0A0A0A] text-lg leading-snug">
                {activeTeam.name}
              </h1>
              <p className="text-xs text-neutral-600 font-bold mt-0.5">
                {language === 'mr' ? 'प्रमुख (Leader):' : 'Leader:'} {activeTeam.leaderName}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end flex-shrink-0">
            <div className="bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3.5 py-1 rounded-full text-xl font-black shadow-xs">
              ₹{activeTeam.totalTeamDailyRate}
            </div>
            <div className="text-[11px] font-bold text-neutral-600 mt-0.5">
              /{language === 'mr' ? 'संपूर्ण संघ/दिवस' : 'full crew/day'}
            </div>
          </div>
        </div>

        {/* Team Availability Toggle */}
        <div className="pt-3 border-t-2 border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-3.5 h-3.5 rounded-full ring-4 ${
                teamAvailability === 'available' ? 'bg-[#15803D] ring-emerald-200 animate-pulse' : 'bg-amber-500 ring-amber-200'
              }`}
            />
            <span className="text-xs font-black text-[#0A0A0A]">
              {teamAvailability === 'available'
                ? (language === 'mr' ? 'संघ उपलब्ध आहे' : 'Team Available')
                : (language === 'mr' ? 'संघ कामात व्यस्त आहे' : 'Team Busy')}
            </span>
          </div>

          <button
            onClick={toggleTeamAvailability}
            className={`min-h-[46px] px-4 py-2 rounded-full font-black text-xs border-2 border-[#0A0A0A] active:scale-95 ${
              teamAvailability === 'available'
                ? 'bg-[#0A0A0A] text-[#FDE047]'
                : 'bg-[#15803D] text-white'
            }`}
          >
            {teamAvailability === 'available'
              ? (language === 'mr' ? 'व्यस्त नोंदवा' : 'Mark Busy')
              : (language === 'mr' ? 'उपलब्ध करा' : 'Mark Free')}
          </button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1 border-t-2 border-neutral-100">
          <div className="p-3 bg-neutral-50 rounded-2xl border-2 border-neutral-200">
            <div className="font-black text-[#0A0A0A] text-base flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-[#FDE047] text-[#0A0A0A]" />
              <span>{activeTeam.rating}</span>
            </div>
            <div className="text-[11px] text-neutral-600 font-bold mt-0.5">{activeTeam.jobsCompleted} {language === 'mr' ? 'पूर्ण झालेली कामे' : 'group jobs'}</div>
          </div>
          <div className="p-3 bg-neutral-50 rounded-2xl border-2 border-neutral-200">
            <div className="font-black text-[#0A0A0A] text-base">{activeTeam.compositeTrades.length} कारागीर</div>
            <div className="text-[11px] text-neutral-600 font-bold mt-0.5">{language === 'mr' ? 'एकत्रित संघ' : 'Trades'}</div>
          </div>
        </div>
      </div>

      {/* 3. Team Composition & Wage Distribution Breakdown */}
      <div className="bg-white rounded-[32px] border-2 border-[#0A0A0A] p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-neutral-500 uppercase tracking-wider">
            {language === 'mr' ? 'संघातील सदस्य व रोज विभागणी' : 'Members & Wage Split'}
          </h2>
          <span className="text-xs font-black text-[#15803D] bg-[#DCFCE7] px-3 py-0.5 rounded-full border border-[#15803D]">
            पारदर्शक हिशोब
          </span>
        </div>

        <div className="space-y-2.5">
          {activeTeam.compositeTrades.map((member, index) => (
            <div
              key={index}
              className="p-3.5 bg-neutral-50 border-2 border-[#0A0A0A] rounded-[24px] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <TradeCharacter trade={member.trade} className="w-10 h-10 flex-shrink-0" />
                <div>
                  <div className="font-black text-sm text-[#0A0A0A]">{member.workerName}</div>
                  <div className="text-xs text-neutral-600 font-bold uppercase">{member.trade}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-[#0A0A0A] text-base">₹{member.dailyRate}</div>
                <div className="text-[11px] text-neutral-600 font-bold">/{language === 'mr' ? 'दिवस' : 'day'}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 bg-[#FDE047]/20 border-2 border-[#0A0A0A] rounded-2xl text-xs text-[#0A0A0A] font-bold leading-relaxed flex items-center gap-2.5">
          <Handshake className="w-5 h-5 flex-shrink-0 stroke-[2.5]" />
          <span>
            {language === 'mr'
              ? 'संघातील प्रत्येक कामगाराचा वाटा आधीच ठरलेला असतो. मालकाने पैसे दिल्यावर कोणताही वाद होत नाही.'
              : 'Pre-agreed per-head splits ensure every worker gets their full share without disputes.'}
          </span>
        </div>
      </div>

      {/* 4. Create a Team CTA */}
      <div className="text-center pt-1">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full min-h-[56px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full shadow-lg border-2 border-[#0A0A0A] flex items-center justify-center gap-2 active:scale-95 text-base"
        >
          <UserPlus className="w-5 h-5 stroke-[2.5]" />
          <span>{language === 'mr' ? '+ नाक्यावरील मित्रांचा नवीन संघ बनवा' : '+ Create a New Worker Team'}</span>
        </button>
      </div>

      {/* Modal: Create Team */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateTeam} className="w-full max-w-[400px] bg-white rounded-[32px] p-6 border-4 border-[#0A0A0A] shadow-2xl space-y-4">
            <h3 className="font-black text-[#0A0A0A] text-lg">
              {language === 'mr' ? 'नवीन कामगार संघ तयार करा' : 'Create a New Team'}
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-black text-[#0A0A0A]">
                {language === 'mr' ? 'संघाचे नाव:' : 'Team Name:'}
              </label>
              <input
                type="text"
                placeholder="उदा. खोपोली प्लास्टर संघ"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="w-full min-h-[52px] px-4 bg-white border-2 border-[#0A0A0A] rounded-full font-black text-sm text-[#0A0A0A] focus:outline-none"
                required
              />
            </div>

            <div className="p-3 bg-neutral-100 border border-neutral-300 rounded-2xl text-xs text-neutral-700 font-medium">
              {language === 'mr'
                ? 'प्रमुख म्हणून रमेश शिंदे (तुम्ही) नोंदवले जाल. इतर 2-3 कामगार नाक्यावरून जोडता येतील.'
                : 'You (Ramesh Shinde) will be registered as Team Leader.'}
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="min-h-[52px] py-2.5 px-5 border-2 border-[#0A0A0A] rounded-full text-xs font-black text-[#0A0A0A]"
              >
                {language === 'mr' ? 'रद्द' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="flex-1 min-h-[52px] py-3 bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full text-xs shadow-md border-2 border-[#0A0A0A]"
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
