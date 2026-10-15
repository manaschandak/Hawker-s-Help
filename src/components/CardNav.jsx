import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Menu, X, Globe, MapPin, Sparkles, User, Briefcase, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function CardNav({
  locationName = 'Khopoli Naka',
  nearestDistance = '0.9 km',
  onOpenLocationModal,
  onOpenPostJob
}) {
  const { role, setRole, language, setLanguage, t, auth, logout } = useApp();
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  // Role-specific navigation items with deep, vibrant distinctive card backgrounds
  const workerItems = [
    {
      label: language === 'mr' ? 'कामाचे शोध' : language === 'hi' ? 'काम खोजें' : 'Find Jobs',
      bgColor: '#1E293B', // Deep Slate Blue
      textColor: '#FFFFFF',
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      links: [
        { label: language === 'mr' ? 'सर्व उपलब्ध कामे' : language === 'hi' ? 'सभी उपलब्ध कार्य' : 'All Available Jobs', href: '/jobs' },
        { label: language === 'mr' ? 'आजचे तातडीचे काम' : language === 'hi' ? 'आज का तुरंत काम' : 'Urgent Today Jobs', href: '/jobs?filter=today' },
        { label: language === 'mr' ? 'माझ्या अवजारांनुसार' : language === 'hi' ? 'मेरे औजार अनुसार' : 'Tool Matched Jobs', href: '/jobs?filter=tools' }
      ]
    },
    {
      label: language === 'mr' ? 'माझे काम व तास' : language === 'hi' ? 'मेरा काम व हाजिरी' : 'My Work & Hours',
      bgColor: '#064E3B', // Deep Emerald
      textColor: '#FFFFFF',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-300" />,
      links: [
        { label: language === 'mr' ? 'काम हजेरी (Clock In)' : language === 'hi' ? 'हाजिरी व समय' : 'Clock In / Shift', href: '/jobs' },
        { label: language === 'mr' ? 'माझा कामगार संघ' : language === 'hi' ? 'मेरी टीम' : 'My Worker Collective', href: '/team' },
        { label: language === 'mr' ? 'मजुरी बोलणी इतिहास' : language === 'hi' ? 'मजदूरी बातचीत' : 'Wage Negotiations', href: '/jobs' }
      ]
    },
    {
      label: language === 'mr' ? 'हक्क व सरकारी योजना' : language === 'hi' ? 'हक व योजनाएं' : 'Welfare & Rights',
      bgColor: '#312E81', // Rich Indigo
      textColor: '#FFFFFF',
      icon: <Shield className="w-5 h-5 text-indigo-300" />,
      links: [
        { label: language === 'mr' ? 'BOCW / ई-श्रम योजना' : language === 'hi' ? 'ई-श्रम व पेंशन' : 'e-Shram & BOCW Grants', href: '/rights' },
        { label: language === 'mr' ? 'पात्रता तपासणी (3 प्रश्न)' : language === 'hi' ? 'पात्रता जांचें' : 'Scheme Eligibility Test', href: '/rights' },
        { label: language === 'mr' ? 'तक्रार व मदत कक्ष' : language === 'hi' ? 'शिकायत व मदद' : 'Grievance / Dispute Cell', href: '/rights?tab=report' }
      ]
    },
    {
      label: language === 'mr' ? 'माझे प्रोफाईल' : language === 'hi' ? 'मेरी प्रोफाइल' : 'My Profile',
      bgColor: '#78350F', // Rich Warm Amber/Rust
      textColor: '#FFFFFF',
      icon: <User className="w-5 h-5 text-amber-300" />,
      links: [
        { label: language === 'mr' ? 'काम फोटो व अनुभव' : language === 'hi' ? 'काम के फोटो' : 'Work Photos & Gallery', href: '/profile' },
        { label: language === 'mr' ? 'उपलब्धता बदला' : language === 'hi' ? 'उपलब्धता दर्ज करें' : 'Set Availability', href: '/profile' },
        { label: language === 'mr' ? 'व्हॉट्सॲप कार्ड शेअर' : language === 'hi' ? 'कार्ड शेयर करें' : 'Share WhatsApp Card', href: '/profile' }
      ]
    }
  ];

  const employerItems = [
    {
      label: language === 'mr' ? 'कारागीर शोधा' : language === 'hi' ? 'कारीगर खोजें' : 'Find Workers',
      bgColor: '#1E293B',
      textColor: '#FFFFFF',
      icon: <User className="w-5 h-5 text-amber-400" />,
      links: [
        { label: language === 'mr' ? 'नाक्यावरील उपलब्ध कारागीर' : language === 'hi' ? 'उपलब्ध कारीगर' : 'Nearby Available Workers', href: '/workers' },
        { label: language === 'mr' ? 'तयार कामगार संघ (Teams)' : language === 'hi' ? 'कारीगर टीमें' : 'Pre-formed Work Teams', href: '/workers?tab=teams' },
        { label: language === 'mr' ? 'ट्रेड अनुसार शोधा' : language === 'hi' ? 'श्रेणी अनुसार खोजें' : 'Browse by Category', href: '/workers' }
      ]
    },
    {
      label: language === 'mr' ? 'माझी दिलेली कामे' : language === 'hi' ? 'मेरे पोस्ट किए काम' : 'My Jobs & Posts',
      bgColor: '#064E3B',
      textColor: '#FFFFFF',
      icon: <Briefcase className="w-5 h-5 text-emerald-300" />,
      links: [
        { label: language === 'mr' ? 'सक्रिय कामे व हजेरी' : language === 'hi' ? 'सक्रिय कार्य' : 'Active Worksites', href: '/employer/jobs' },
        { label: language === 'mr' ? 'कामाचे तास मंजूर करा' : language === 'hi' ? 'घंटे मंजूर करें' : 'Approve Hours & Pay', href: '/employer/jobs' },
        { label: language === 'mr' ? 'कारागिरांना रेटिंग द्या' : language === 'hi' ? 'रेटिंग दर्ज करें' : 'Rate Workers', href: '/employer/jobs' }
      ]
    },
    {
      label: language === 'mr' ? 'कंत्राटदार योजना' : language === 'hi' ? 'हायरिंग प्लान' : 'Hiring Plans',
      bgColor: '#312E81',
      textColor: '#FFFFFF',
      icon: <Sparkles className="w-5 h-5 text-amber-300" />,
      links: [
        { label: language === 'mr' ? 'कंत्राटदार प्रो योजना' : language === 'hi' ? 'ठेकेदार प्रो' : 'Contractor Pro Plan', href: '/plans' },
        { label: language === 'mr' ? '10 मोफत ट्रायल नेमणुका' : language === 'hi' ? '10 ट्रायल हायरिंग' : '10 Free Trial Hires', href: '/plans' },
        { label: language === 'mr' ? 'कामाचा हिशोब व इनव्हॉईस' : language === 'hi' ? 'बिलिंग व इनवॉइस' : 'Billing & Invoices', href: '/plans' }
      ]
    },
    {
      label: language === 'mr' ? 'खाते व भूमिका' : language === 'hi' ? 'खाता व सेटिंग्स' : 'Account & Role',
      bgColor: '#78350F',
      textColor: '#FFFFFF',
      icon: <Shield className="w-5 h-5 text-amber-300" />,
      links: [
        { label: language === 'mr' ? 'नवीन काम पोस्ट करा' : language === 'hi' ? 'नया काम पोस्ट करें' : 'Post New Job', href: '#post-job', onClick: () => onOpenPostJob && onOpenPostJob() },
        { label: language === 'mr' ? 'भाषा बदला' : language === 'hi' ? 'भाषा बदलें' : 'Change Language', href: '/onboarding/language' },
        { label: language === 'mr' ? 'कामगार मोडमध्ये जा' : language === 'hi' ? 'कारीगर मोड चुनें' : 'Switch to Worker Mode', href: '#switch-role', onClick: () => { setRole('worker'); navigate('/jobs'); } }
      ]
    }
  ];

  const items = role === 'employer' ? employerItems : workerItems;

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        const topBar = 64;
        const padding = 20;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 310;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 64, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.45,
      ease: 'power3.out'
    });

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
        stagger: 0.06
      },
      '-=0.2'
    );

    return tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = createTimeline();
      tlRef.current = tl;
    }, navRef);

    return () => ctx.revert();
  }, [items, language, role]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.to(navRef.current, { height: newHeight, duration: 0.25 });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsExpanded(true);
      tl.play();
    } else {
      tl.reverse().eventCallback('onReverseComplete', () => setIsExpanded(false));
    }
  };

  const closeMenu = () => {
    if (isExpanded && tlRef.current) {
      tlRef.current.reverse().eventCallback('onReverseComplete', () => setIsExpanded(false));
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  const handleLanguageToggle = () => {
    const nextLang = language === 'mr' ? 'hi' : language === 'hi' ? 'en' : 'mr';
    setLanguage(nextLang);
  };

  const ctaButtonText =
    role === 'employer'
      ? (language === 'mr' ? '+ काम पोस्ट करा' : language === 'hi' ? '+ काम पोस्ट करें' : '+ Post a Job')
      : (language === 'mr' ? 'कामे शोधा' : language === 'hi' ? 'काम खोजें' : 'Find Jobs');

  const handleCtaClick = () => {
    closeMenu();
    if (role === 'employer') {
      if (onOpenPostJob) onOpenPostJob();
    } else {
      navigate('/jobs');
    }
  };

  return (
    <div className="card-nav-container relative w-full max-w-7xl mx-auto z-40 px-3 sm:px-6 pt-3">
      <nav
        ref={navRef}
        className={`card-nav ${
          isExpanded ? 'open shadow-2xl' : 'shadow-md'
        } block h-[64px] p-0 rounded-2xl sm:rounded-3xl relative overflow-hidden will-change-[height] border-2 border-slate-200/90 bg-[#FFFFFF] backdrop-blur-md transition-shadow`}
      >
        {/* Top Bar */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-[64px] flex items-center justify-between px-3 sm:px-5 z-10">
          
          {/* Left: Menu Trigger & Location Chip */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleMenu}
              className="group h-11 w-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer touch-target border border-slate-200"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            >
              {isExpanded ? (
                <X size={22} className="transition-transform duration-300 text-slate-900" />
              ) : (
                <Menu size={22} className="transition-transform duration-300 text-slate-900" />
              )}
            </button>

            {/* Quick Location Badge */}
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-amber-950 transition-colors cursor-pointer"
              title={t('nearestNakaLabel')}
            >
              <MapPin size={14} className="text-[#B45309] shrink-0" />
              <span className="truncate max-w-[110px] sm:max-w-[160px] font-black">{locationName}</span>
              <span className="hidden sm:inline text-[11px] font-medium text-amber-800">({nearestDistance})</span>
            </button>
          </div>

          {/* Center Brand Identity */}
          <div className="logo-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
            <Link to={role === 'employer' ? '/employer/jobs' : '/jobs'} onClick={closeMenu} className="flex items-center gap-1.5 no-underline">
              <span className="text-xl sm:text-2xl drop-shadow">🔨</span>
              <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
                {t('appTitle')}
              </span>
            </Link>
          </div>

          {/* Right Actions: Language Switcher & Role CTA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLanguageToggle}
              className="h-10 px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1 transition-all active:scale-95"
              title="Change Language"
            >
              <Globe size={14} className="text-[#B45309]" />
              <span className="uppercase">{language}</span>
            </button>

            <button
              type="button"
              onClick={handleCtaClick}
              className="hidden md:inline-flex rounded-xl px-4 items-center h-10 font-black text-xs sm:text-sm bg-[#B45309] hover:bg-[#92400E] text-white shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {ctaButtonText}
            </button>
          </div>
        </div>

        {/* Content / Expandable Navigation Cards */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[64px] bottom-0 p-3 sm:p-4 flex flex-col gap-3 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-stretch md:gap-4`}
          aria-hidden={!isExpanded}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
              className="nav-card relative flex flex-col gap-2.5 p-4 sm:p-5 rounded-2xl min-w-0 flex-[1_1_auto] md:flex-1 shadow-lg border border-white/10 group/card transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="flex items-center gap-2 font-black tracking-tight text-base sm:text-lg">
                {item.icon}
                <span>{item.label}</span>
              </div>

              <div className="nav-card-links mt-auto flex flex-col gap-1.5 pt-2 border-t border-white/15">
                {item.links.map((lnk, i) => {
                  if (lnk.onClick) {
                    return (
                      <button
                        key={`${lnk.label}-${i}`}
                        onClick={() => {
                          closeMenu();
                          lnk.onClick();
                        }}
                        className="nav-card-link inline-flex items-center justify-between no-underline cursor-pointer transition-all duration-200 text-xs sm:text-sm text-left opacity-90 hover:opacity-100 hover:translate-x-1 py-1"
                      >
                        <span className="font-semibold text-white">{lnk.label}</span>
                        <ArrowUpRight size={14} className="shrink-0 text-amber-300" />
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={`${lnk.label}-${i}`}
                      to={lnk.href}
                      onClick={closeMenu}
                      className="nav-card-link inline-flex items-center justify-between no-underline cursor-pointer transition-all duration-200 text-xs sm:text-sm opacity-90 hover:opacity-100 hover:translate-x-1 py-1"
                    >
                      <span className="font-semibold text-white">{lnk.label}</span>
                      <ArrowUpRight size={14} className="shrink-0 text-amber-300" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
