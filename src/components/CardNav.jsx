import React, { useLayoutEffect, useRef, useState, useMemo, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  ArrowUpRight,
  Menu,
  X,
  Globe,
  MapPin,
  Sparkles,
  User,
  Briefcase,
  Shield,
  FileText,
  CheckCircle2,
  LogIn,
  LogOut
} from 'lucide-react';
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

  // Role-specific navigation items memoized so references stay stable
  const workerItems = useMemo(() => [
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
      label: language === 'mr' ? 'माझे प्रोफाईल व खाते' : language === 'hi' ? 'मेरी प्रोफाइल व खाता' : 'My Profile & Account',
      bgColor: '#78350F', // Rich Warm Amber/Rust
      textColor: '#FFFFFF',
      icon: <User className="w-5 h-5 text-amber-300" />,
      links: [
        { label: language === 'mr' ? 'काम फोटो व अनुभव' : language === 'hi' ? 'काम के फोटो' : 'Work Photos & Gallery', href: '/profile' },
        { label: language === 'mr' ? 'उपलब्धता बदला' : language === 'hi' ? 'उपलब्धता दर्ज करें' : 'Set Availability', href: '/profile' },
        { label: language === 'mr' ? 'मोबाईलने लॉगिन करा (OTP)' : language === 'hi' ? 'मोबाइल से लॉगिन' : 'Mobile Login / Switch Account', href: '/onboarding/login' },
        { label: language === 'mr' ? 'मालक मोडमध्ये जा' : language === 'hi' ? 'नियोक्ता मोड चुनें' : 'Switch to Employer Mode', href: '#switch-role', onClick: () => { setRole('employer'); navigate('/employer/jobs'); } }
      ]
    }
  ], [language, setRole, navigate]);

  const employerItems = useMemo(() => [
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
      label: language === 'mr' ? 'खाते व लॉगिन' : language === 'hi' ? 'खाता व लॉगिन' : 'Account & Login',
      bgColor: '#78350F',
      textColor: '#FFFFFF',
      icon: <Shield className="w-5 h-5 text-amber-300" />,
      links: [
        { label: language === 'mr' ? 'मोबाईलने लॉगिन करा (OTP)' : language === 'hi' ? 'मोबाइल से लॉगिन' : 'Mobile Login / Verify Phone', href: '/onboarding/login' },
        { label: language === 'mr' ? 'नवीन काम पोस्ट करा' : language === 'hi' ? 'नया काम पोस्ट करें' : 'Post New Job', href: '#post-job', onClick: () => onOpenPostJob && onOpenPostJob() },
        { label: language === 'mr' ? 'भाषा बदला' : language === 'hi' ? 'भाषा बदलें' : 'Change Language', href: '/onboarding/language' },
        { label: language === 'mr' ? 'कामगार मोडमध्ये जा' : language === 'hi' ? 'कारीगर मोड चुनें' : 'Switch to Worker Mode', href: '#switch-role', onClick: () => { setRole('worker'); navigate('/jobs'); } }
      ]
    }
  ], [language, onOpenPostJob, setRole, navigate]);

  const items = role === 'employer' ? employerItems : workerItems;

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 320;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        return Math.max(380, 64 + contentEl.scrollHeight + 20);
      }
      return 420;
    }
    return 320;
  };

  // State-driven GSAP animation: perfectly synchronized with isExpanded
  useLayoutEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    // Filter valid card DOM elements
    const validCards = cardsRef.current.filter(Boolean);

    if (isExpanded) {
      const targetHeight = calculateHeight();
      gsap.killTweensOf(navEl);
      gsap.killTweensOf(validCards);

      // Animate container height
      gsap.to(navEl, {
        height: targetHeight,
        duration: 0.45,
        ease: 'power3.out'
      });

      // Animate cards appearance
      gsap.fromTo(
        validCards,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'power3.out',
          stagger: 0.06,
          delay: 0.08
        }
      );
    } else {
      gsap.killTweensOf(navEl);
      gsap.killTweensOf(validCards);

      // Animate cards exit
      gsap.to(validCards, {
        y: 15,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });

      // Animate container back to initial bar height
      gsap.to(navEl, {
        height: 64,
        duration: 0.35,
        ease: 'power3.inOut'
      });
    }
  }, [isExpanded, items]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!navRef.current || !isExpanded) return;
      const newHeight = calculateHeight();
      gsap.to(navRef.current, { height: newHeight, duration: 0.25 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    setIsExpanded(prev => !prev);
  };

  const closeMenu = () => {
    setIsExpanded(false);
  };

  const setCardRef = (i) => (el) => {
    cardsRef.current[i] = el;
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
        <div className="card-nav-top absolute inset-x-0 top-0 h-[64px] flex items-center justify-between px-3 sm:px-5 z-20 bg-white">
          
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

          {/* Right Actions: Login Button, Language Switcher & Role CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* LOGIN / ACCOUNT BUTTON */}
            {auth?.isLoggedIn && !auth?.isGuest ? (
              <div className="flex items-center gap-1">
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="h-10 px-2.5 sm:px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 font-black text-xs flex items-center gap-1.5 transition-colors no-underline"
                  title={auth.name || 'Account'}
                >
                  <User size={14} className="text-[#B45309]" />
                  <span className="hidden sm:inline truncate max-w-[85px]">{auth.name ? auth.name.split(' ')[0] : 'Account'}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/onboarding/login');
                  }}
                  className="h-10 px-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold text-xs transition-colors"
                  title="Logout / Switch Account"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                to="/onboarding/login"
                onClick={closeMenu}
                className="h-10 px-3 sm:px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all no-underline"
              >
                <LogIn size={14} className="text-amber-400" />
                <span>{language === 'mr' ? 'लॉगिन' : language === 'hi' ? 'लॉगिन' : 'Login'}</span>
              </Link>
            )}

            {/* Language Switcher */}
            <button
              type="button"
              onClick={handleLanguageToggle}
              className="h-10 px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1 transition-all active:scale-95"
              title="Change Language"
            >
              <Globe size={14} className="text-[#B45309]" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Role CTA */}
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
          className={`card-nav-content absolute left-0 right-0 top-[64px] bottom-0 p-3 sm:p-4 flex flex-col gap-3 justify-start z-10 ${
            isExpanded ? 'visible pointer-events-auto opacity-100' : 'invisible pointer-events-none opacity-0'
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
