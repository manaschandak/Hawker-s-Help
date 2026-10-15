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
  CheckCircle2,
  LogIn,
  LogOut,
  Wrench,
  Clock
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

  // Role-specific navigation items styled with Dark High-Contrast cards
  const workerItems = useMemo(() => [
    {
      label: language === 'mr' ? 'कामाचे शोध' : language === 'hi' ? 'काम खोजें' : 'Find Jobs',
      href: '/jobs',
      bgColor: '#0A0A0A',
      textColor: '#FFFFFF',
      icon: <Briefcase className="w-5 h-5 text-[#FDE047]" />,
      onClick: () => {
        navigate('/jobs');
        setTimeout(() => {
          const el = document.getElementById('job-feed-list');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      },
      links: [
        { label: language === 'mr' ? 'सर्व उपलब्ध कामे' : language === 'hi' ? 'सभी उपलब्ध कार्य' : 'All Available Jobs', href: '/jobs?filter=all' },
        { label: language === 'mr' ? 'आजचे तातडीचे काम' : language === 'hi' ? 'आज का तुरंत काम' : 'Urgent Today Jobs', href: '/jobs?filter=today' },
        { label: language === 'mr' ? 'माझ्या अवजारांनुसार' : language === 'hi' ? 'मेरे औजार अनुसार' : 'Tool Matched Jobs', href: '/jobs?filter=tools' }
      ]
    },
    {
      label: language === 'mr' ? 'माझे काम व तास' : language === 'hi' ? 'मेरा काम व हाजिरी' : 'My Work & Hours',
      href: '/work-hours',
      bgColor: '#171717',
      textColor: '#FFFFFF',
      icon: <Clock className="w-5 h-5 text-[#FDE047]" />,
      onClick: () => {
        navigate('/work-hours');
      },
      links: [
        { label: language === 'mr' ? 'काम हजेरी (Clock In / Shift)' : language === 'hi' ? 'हाजिरी व समय' : 'Clock In / Active Shift', href: '/work-hours' },
        { label: language === 'mr' ? 'मागील हजेरी व मजुरी नोंद' : language === 'hi' ? 'हाजिरी रजिस्टर' : 'Attendance Muster Log', href: '/work-hours' },
        { label: language === 'mr' ? '९०-दिवस कल्याण प्रमाणपत्र' : language === 'hi' ? '९० दिन प्रमाण पत्र' : 'BOCW 90-Day Proof', href: '/work-hours' }
      ]
    },
    {
      label: language === 'mr' ? 'हक्क व योजना' : language === 'hi' ? 'हक व योजनाएं' : 'Welfare & Rights',
      href: '/rights',
      bgColor: '#0A0A0A',
      textColor: '#FFFFFF',
      icon: <Shield className="w-5 h-5 text-[#FDE047]" />,
      onClick: () => {
        navigate('/rights');
      },
      links: [
        { label: language === 'mr' ? 'BOCW / ई-श्रम योजना' : language === 'hi' ? 'ई-श्रम व पेंशन' : 'e-Shram & BOCW Grants', href: '/rights' },
        { label: language === 'mr' ? 'पात्रता तपासणी (3 प्रश्न)' : language === 'hi' ? 'पात्रता जांचें' : 'Scheme Eligibility Test', href: '/rights' },
        { label: language === 'mr' ? 'तक्रार व मदत कक्ष' : language === 'hi' ? 'शिकायत व मदद' : 'Grievance / Dispute Cell', href: '/rights' }
      ]
    },
    {
      label: language === 'mr' ? 'माझे प्रोफाईल व खाते' : language === 'hi' ? 'मेरी प्रोफाइल व खाता' : 'My Profile & Account',
      href: '/profile',
      bgColor: '#171717',
      textColor: '#FFFFFF',
      icon: <User className="w-5 h-5 text-[#FDE047]" />,
      onClick: () => {
        navigate('/profile');
      },
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
      href: '/workers',
      bgColor: '#0A0A0A',
      textColor: '#FFFFFF',
      icon: <User className="w-5 h-5 text-[#FDE047]" />,
      onClick: () => {
        navigate('/workers');
      },
      links: [
        { label: language === 'mr' ? 'नाक्यावरील उपलब्ध कारागीर' : language === 'hi' ? 'उपलब्ध कारीगर' : 'Nearby Available Workers', href: '/workers' },
        { label: language === 'mr' ? 'तयार कामगार संघ (Teams)' : language === 'hi' ? 'कारीगर टीमें' : 'Pre-formed Work Teams', href: '/workers' },
        { label: language === 'mr' ? 'ट्रेड अनुसार शोधा' : language === 'hi' ? 'श्रेणी अनुसार खोजें' : 'Browse by Category', href: '/workers' }
      ]
    },
    {
      label: language === 'mr' ? 'माझी दिलेली कामे' : language === 'hi' ? 'मेरे पोस्ट किए काम' : 'My Jobs & Posts',
      href: '/employer/jobs',
      bgColor: '#171717',
      textColor: '#FFFFFF',
      icon: <Briefcase className="w-5 h-5 text-[#FDE047]" />,
      onClick: () => {
        navigate('/employer/jobs');
      },
      links: [
        { label: language === 'mr' ? 'सक्रिय कामे व हजेरी' : language === 'hi' ? 'सक्रिय कार्य' : 'Active Worksites', href: '/employer/jobs' },
        { label: language === 'mr' ? 'कामाचे तास मंजूर करा' : language === 'hi' ? 'घंटे मंजूर करें' : 'Approve Hours & Pay', href: '/employer/jobs' },
        { label: language === 'mr' ? 'कारागिरांना रेटिंग द्या' : language === 'hi' ? 'रेटिंग दर्ज करें' : 'Rate Workers', href: '/employer/jobs' }
      ]
    },
    {
      label: language === 'mr' ? 'कंत्राटदार योजना' : language === 'hi' ? 'हायरिंग प्लान' : 'Hiring Plans',
      href: '/plans',
      bgColor: '#0A0A0A',
      textColor: '#FFFFFF',
      icon: <Sparkles className="w-5 h-5 text-[#FDE047]" />,
      onClick: () => {
        navigate('/plans');
      },
      links: [
        { label: language === 'mr' ? 'कंत्राटदार प्रो योजना' : language === 'hi' ? 'ठेकेदार प्रो' : 'Contractor Pro Plan', href: '/plans' },
        { label: language === 'mr' ? '10 मोफत ट्रायल नेमणुका' : language === 'hi' ? '10 ट्रायल हायरिंग' : '10 Free Trial Hires', href: '/plans' },
        { label: language === 'mr' ? 'कामाचा हिशोब व इनव्हॉईस' : language === 'hi' ? 'बिलिंग व इनवॉइस' : 'Billing & Invoices', href: '/plans' }
      ]
    },
    {
      label: language === 'mr' ? 'खाते व लॉगिन' : language === 'hi' ? 'खाता व लॉगिन' : 'Account & Login',
      href: '/onboarding/login',
      bgColor: '#171717',
      textColor: '#FFFFFF',
      icon: <User className="w-5 h-5 text-[#FDE047]" />,
      onClick: () => {
        navigate('/onboarding/login');
      },
      links: [
        { label: language === 'mr' ? 'कामगार मोडमध्ये जा' : language === 'hi' ? 'कामगार मोड चुनें' : 'Switch to Worker Mode', href: '#switch-role', onClick: () => { setRole('worker'); navigate('/jobs'); } },
        { label: language === 'mr' ? 'मदत व ग्राहक कक्ष' : language === 'hi' ? 'हेल्पलाइन' : 'Customer Support Cell', href: 'tel:18001801551' }
      ]
    }
  ], [language, setRole, navigate]);

  const items = role === 'employer' ? employerItems : workerItems;

  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const navEl = navRef.current;
      if (!navEl) return;

      gsap.set(navEl, { height: 68, overflow: 'hidden' });

      const tl = gsap.timeline({ paused: true });

      tl.to(navEl, {
        height: 'auto',
        duration: 0.45,
        ease: 'power3.inOut'
      });

      tl.from(
        cardsRef.current.filter(Boolean),
        {
          y: 20,
          opacity: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'power2.out'
        },
        '-=0.2'
      );

      tlRef.current = tl;
    });

    return () => ctx.revert();
  }, [items]);

  useEffect(() => {
    if (tlRef.current) {
      if (isExpanded) {
        tlRef.current.play();
      } else {
        tlRef.current.reverse();
      }
    }
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
      setTimeout(() => {
        const el = document.getElementById('job-feed-list');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="card-nav-container relative w-full max-w-7xl mx-auto z-40 px-3 sm:px-6 pt-3">
      {/* Flat Cyber Yellow #FDE047 Header with Pill & 32px curves */}
      <nav
        ref={navRef}
        className={`card-nav ${
          isExpanded ? 'open shadow-2xl' : 'shadow-lg'
        } block h-[68px] p-0 rounded-[32px] relative overflow-hidden will-change-[height] border-3 border-[#0A0A0A] bg-[#FDE047] transition-shadow`}
      >
        {/* Top Bar: Always black text on Cyber Yellow */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-[68px] flex items-center justify-between px-3 sm:px-5 z-20 bg-[#FDE047]">
          
          {/* Left: Pill Menu Trigger & Location Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleMenu}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-[#171717] transition-all cursor-pointer touch-target border-2 border-[#0A0A0A] active:scale-95 shadow-sm"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            >
              {isExpanded ? (
                <X size={22} className="text-[#FDE047]" />
              ) : (
                <Menu size={22} className="text-[#FDE047]" />
              )}
            </button>

            {/* Solid White Location Badge */}
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FFFFFF] border-2 border-[#0A0A0A] text-sm font-black text-[#0A0A0A] transition-colors cursor-pointer shadow-xs active:scale-95"
              title={t('nearestNakaLabel')}
            >
              <MapPin size={15} className="text-[#0A0A0A] shrink-0 fill-[#FDE047]" />
              <span className="truncate max-w-[110px] sm:max-w-[170px]">{locationName}</span>
              <span className="hidden sm:inline text-xs font-bold text-slate-600">({nearestDistance})</span>
            </button>
          </div>

          {/* Center Brand Identity */}
          <div className="logo-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
            <Link to={role === 'employer' ? '/employer/jobs' : '/jobs'} onClick={closeMenu} className="flex items-center gap-2 no-underline">
              <span className="p-1.5 bg-[#0A0A0A] text-[#FDE047] rounded-xl flex items-center justify-center shadow-xs">
                <Wrench className="w-4 h-4 stroke-[2.5]" />
              </span>
              <span className="font-black text-[#0A0A0A] text-lg sm:text-xl tracking-tight">
                {t('appTitle')}
              </span>
            </Link>
          </div>

          {/* Right Actions: Pill Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* LOGIN / ACCOUNT PILL */}
            {auth?.isLoggedIn && !auth?.isGuest ? (
              <div className="flex items-center gap-1">
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="min-h-[46px] px-3.5 rounded-full bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black text-sm flex items-center gap-1.5 transition-colors no-underline shadow-xs"
                  title={auth.name || 'Account'}
                >
                  <User size={15} className="text-[#0A0A0A]" />
                  <span className="hidden sm:inline truncate max-w-[85px]">{auth.name ? auth.name.split(' ')[0] : 'Account'}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/onboarding/login');
                  }}
                  className="h-11 w-11 rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-red-600 hover:text-white font-bold flex items-center justify-center transition-colors shadow-xs"
                  title="Logout / Switch Account"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/onboarding/login"
                onClick={closeMenu}
                className="min-h-[46px] px-4 rounded-full bg-[#0A0A0A] text-[#FDE047] hover:bg-[#171717] font-black text-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-all no-underline border-2 border-[#0A0A0A]"
              >
                <LogIn size={16} className="text-[#FDE047]" />
                <span>{language === 'mr' ? 'लॉगिन' : language === 'hi' ? 'लॉगिन' : 'Login'}</span>
              </Link>
            )}

            {/* Language Switcher Pill */}
            <button
              type="button"
              onClick={handleLanguageToggle}
              className="h-11 px-3 rounded-full bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] font-black text-xs flex items-center gap-1 transition-all active:scale-95 shadow-xs"
              title="Change Language"
            >
              <Globe size={14} className="text-[#0A0A0A]" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Primary Action CTA (Pill Button 56px minimum tall on md) */}
            <button
              type="button"
              onClick={handleCtaClick}
              className="hidden md:inline-flex rounded-full px-6 items-center min-h-[50px] font-black text-sm bg-[#0A0A0A] text-[#FDE047] hover:bg-[#171717] shadow-md transition-all duration-200 active:scale-95 border-2 border-[#0A0A0A]"
            >
              {ctaButtonText}
            </button>
          </div>
        </div>

        {/* Content / Expandable Navigation Cards (Dark High-Contrast 32px Cards) */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[68px] bottom-0 p-3 sm:p-5 flex flex-col gap-3 justify-start z-10 ${
            isExpanded ? 'visible pointer-events-auto opacity-100' : 'invisible pointer-events-none opacity-0'
          } md:flex-row md:items-stretch md:gap-4 bg-[#FDE047]`}
          aria-hidden={!isExpanded}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
              className="nav-card relative flex flex-col gap-3 p-5 rounded-[28px] sm:rounded-[32px] min-w-0 flex-[1_1_auto] md:flex-1 shadow-xl border-3 border-[#0A0A0A] group/card transition-transform duration-200 hover:-translate-y-1 bg-[#0A0A0A] text-white"
            >
              {/* Clickable Card Header */}
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  if (item.onClick) item.onClick();
                  else if (item.href) navigate(item.href);
                  else if (item.links[0]?.href) navigate(item.links[0].href);
                }}
                className="flex items-center justify-between w-full font-black tracking-tight text-lg text-[#FDE047] hover:underline text-left cursor-pointer group-hover/card:text-yellow-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight size={18} className="text-[#FDE047] shrink-0 stroke-[2.5]" />
              </button>

              <div className="nav-card-links mt-auto flex flex-col gap-2 pt-3 border-t-2 border-neutral-800">
                {item.links.map((lnk, i) => {
                  if (lnk.onClick) {
                    return (
                      <button
                        key={`${lnk.label}-${i}`}
                        onClick={() => {
                          closeMenu();
                          lnk.onClick();
                        }}
                        className="nav-card-link inline-flex items-center justify-between no-underline cursor-pointer transition-all duration-150 text-sm text-left font-bold text-white hover:text-[#FDE047] hover:translate-x-1 py-1"
                      >
                        <span>{lnk.label}</span>
                        <ArrowUpRight size={16} className="shrink-0 text-[#FDE047]" />
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={`${lnk.label}-${i}`}
                      to={lnk.href}
                      onClick={closeMenu}
                      className="nav-card-link inline-flex items-center justify-between no-underline cursor-pointer transition-all duration-150 text-sm font-bold text-white hover:text-[#FDE047] hover:translate-x-1 py-1"
                    >
                      <span>{lnk.label}</span>
                      <ArrowUpRight size={16} className="shrink-0 text-[#FDE047]" />
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
