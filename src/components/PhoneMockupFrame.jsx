import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal, RotateCcw } from 'lucide-react';

export default function PhoneMockupFrame({
  children,
  isMobileView,
  setIsMobileView
}) {
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Top Floating Control Bar on Desktop Screens */}
      <div className="hidden md:flex items-center justify-between px-6 py-2.5 bg-[#0A0A0A] text-white border-b-2 border-neutral-800 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-[#FDE047] tracking-wider flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#FDE047]" />
            <span>NAKA Display Mode</span>
          </span>
          <span className="text-xs text-neutral-400 font-bold hidden lg:inline">
            Toggle between mobile phone shell (390px) and wide desktop view
          </span>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center gap-1 bg-[#171717] p-1 rounded-full border border-neutral-700">
          <button
            type="button"
            onClick={() => setIsMobileView(true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
              isMobileView
                ? 'bg-[#FDE047] text-[#0A0A0A] shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>Mobile Phone (390px)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileView(false)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
              !isMobileView
                ? 'bg-[#FDE047] text-[#0A0A0A] shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor size={14} />
            <span>Desktop View</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {isMobileView ? (
        <div className="flex-1 w-full flex items-center justify-center p-0 md:p-6 lg:p-8 bg-neutral-900 md:bg-neutral-950/90 transition-all">
          {/* Phone Shell (390px on Desktop, Native Full Width on Mobile) */}
          <div className="w-full md:w-[414px] md:max-w-[414px] h-screen md:h-[860px] md:max-h-[92vh] flex flex-col bg-[#0A0A0A] md:rounded-[54px] md:border-[12px] md:border-[#0A0A0A] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden ring-1 ring-neutral-700/60">
            
            {/* iOS Dynamic Island & Status Bar (Visible in phone mockup on md+) */}
            <div className="hidden md:flex items-center justify-between px-6 pt-3 pb-1 bg-[#FDE047] text-[#0A0A0A] select-none z-50 shrink-0 border-b border-[#0A0A0A]/20">
              <span className="text-xs font-black tracking-tight">{currentTime}</span>

              {/* Dynamic Island Cutout */}
              <div className="w-24 h-5 bg-[#0A0A0A] rounded-full mx-auto flex items-center justify-end px-2 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 ring-1 ring-neutral-700 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-950"></div>
                </div>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-[#0A0A0A]">
                <Signal size={12} className="stroke-[2.5]" />
                <Wifi size={12} className="stroke-[2.5]" />
                <Battery size={14} className="stroke-[2.5] fill-current" />
              </div>
            </div>

            {/* Inner App Container with Smooth 390px Scrolling */}
            <div className="flex-1 w-full overflow-y-auto no-scrollbar relative bg-white flex flex-col">
              {children}
            </div>

            {/* iOS Home Indicator Bar (Desktop Mockup) */}
            <div className="hidden md:block py-2 bg-[#0A0A0A] shrink-0">
              <div className="w-32 h-1 bg-white/70 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full">
          {children}
        </div>
      )}
    </div>
  );
}
