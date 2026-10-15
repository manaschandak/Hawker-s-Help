import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen w-full flex flex-col bg-neutral-950">
      {/* Top Floating Control Bar on Desktop Screens */}
      <div className="hidden md:flex items-center justify-between px-6 py-2.5 bg-[#0A0A0A] text-white border-b-2 border-neutral-800 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-[#FDE047] tracking-wider flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#FDE047]" />
            <span>NAKA Display Mode</span>
          </span>
          <span className="text-xs text-neutral-400 font-bold hidden lg:flex items-center gap-2">
            <span>Standard Smartphone (9:20 Ratio • 390×866px Viewport)</span>
            <span className="bg-neutral-800 text-[#FDE047] text-[10px] font-black px-2 py-0.5 rounded-full border border-neutral-700">
              9:20 Mobile Fit
            </span>
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
            <span>9:20 Phone (390×866)</span>
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
        <div className="flex-1 w-full flex items-center justify-center p-0 md:p-6 lg:p-8 bg-neutral-900 md:bg-neutral-950 transition-all overflow-hidden">
          
          {/* Outer Hardware Chassis Container with Side Buttons */}
          <div className="relative w-full md:w-auto flex items-center justify-center">
            
            {/* Left Hardware Side Buttons (Simulated on md+) */}
            <div className="hidden md:flex flex-col gap-5 absolute -left-[14px] top-28 z-0">
              {/* Action/Mute Switch */}
              <div className="w-[4px] h-7 bg-neutral-700 rounded-l-md shadow-md border-y border-l border-neutral-600"></div>
              {/* Volume Up */}
              <div className="w-[4px] h-12 bg-neutral-700 rounded-l-md shadow-md border-y border-l border-neutral-600"></div>
              {/* Volume Down */}
              <div className="w-[4px] h-12 bg-neutral-700 rounded-l-md shadow-md border-y border-l border-neutral-600"></div>
            </div>

            {/* Right Hardware Power Button (Simulated on md+) */}
            <div className="hidden md:block absolute -right-[14px] top-36 z-0">
              <div className="w-[4px] h-16 bg-neutral-700 rounded-r-md shadow-md border-y border-r border-neutral-600"></div>
            </div>

            {/* Phone Shell: Strict 9:20 proportion (390px inner width × 866.6px inner height + 10px bezel = 410px × 886px) */}
            <div className="w-full md:w-[410px] md:max-w-[410px] h-screen md:h-[886px] md:max-h-[94vh] flex flex-col bg-[#0A0A0A] md:rounded-[52px] md:border-[10px] md:border-[#1A1A1A] md:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(253,224,71,0.08)] relative overflow-hidden ring-1 ring-white/10 z-10">
              
              {/* Top Dynamic Island & Status Bar (Visible in phone mockup on md+) */}
              <div className="hidden md:flex items-center justify-between px-6 pt-3 pb-1.5 bg-[#FDE047] text-[#0A0A0A] select-none z-50 shrink-0 border-b-2 border-[#0A0A0A]">
                <span className="text-xs font-black tracking-tight">{currentTime}</span>

                {/* Dynamic Island Cutout */}
                <div className="w-24 h-5 bg-[#0A0A0A] rounded-full mx-auto flex items-center justify-between px-2.5 shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 ring-1 ring-neutral-700 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-950"></div>
                  </div>
                </div>

                {/* Status Icons: Signal, 5G, Wi-Fi, Battery */}
                <div className="flex items-center gap-1.5 text-[#0A0A0A]">
                  <span className="text-[10px] font-black tracking-tighter">5G</span>
                  <Signal size={12} className="stroke-[2.5]" />
                  <Wifi size={12} className="stroke-[2.5]" />
                  <Battery size={14} className="stroke-[2.5] fill-current" />
                </div>
              </div>

              {/* Inner App Container with Smooth 390px Scrolling & Exact 9:20 Ratio */}
              <div className="flex-1 w-full overflow-y-auto no-scrollbar relative bg-[#FAF8F5] flex flex-col">
                {children}
              </div>

              {/* iOS Home Indicator Bar (Desktop Mockup) */}
              <div className="hidden md:block py-2 bg-[#0A0A0A] shrink-0 border-t border-neutral-900">
                <div className="w-32 h-1 bg-white/70 rounded-full mx-auto"></div>
              </div>
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
