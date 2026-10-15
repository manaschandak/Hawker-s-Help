import React from 'react';
import { Check, ShieldCheck, Sparkles, Zap, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PricingSection({ onBookCall, className = '' }) {
  const { language, t, showToast } = useApp();

  const plans = [
    {
      id: 'daily_hire',
      name: language === 'mr' ? 'रोजंदारी हायर (पे-अॅज-यू-गो)' : language === 'hi' ? 'दैनिक हायर (पे-एज-यू-गो)' : 'Daily Direct Hire',
      description: language === 'mr' ? 'घरमालक व लहान कामांसाठी थेट संपर्क.' : language === 'hi' ? 'घरमालिक व छोटे कार्यों हेतु सीधा संपर्क।' : 'For homeowners and quick one-day repair tasks.',
      price: '₹0',
      priceNote: language === 'mr' ? '/ कायमस्वरूपी मोफत' : language === 'hi' ? '/ आजीवन मुफ्त' : '/ Forever Free',
      priceStrikethrough: false,
      alertText: language === 'mr' ? 'नाक्यावरील कोणत्याही कामगाराला थेट फोन करा' : language === 'hi' ? 'चौराहे के किसी भी कारीगर को सीधा कॉल करें' : 'Direct contact numbers for all naka workers',
      features: [
        language === 'mr' ? 'अमर्यादित कामगार प्रोफाईल व कामाचे फोटो पाहणे' : language === 'hi' ? 'कारीगरों के कार्य फोटो व अनुभव देखना' : 'Browse verified worker work photos and experience',
        language === 'mr' ? 'नाक्याचा सरासरी मजुरी बेंचमार्क' : language === 'hi' ? 'क्षेत्रीय न्यूनतम मजदूरी दर गाइड' : 'Local wage benchmark & transparent negotiation slider',
        language === 'mr' ? 'थेट फोन कॉल व व्हॉट्सॲप संपर्क' : language === 'hi' ? 'सीधा फोन व व्हाट्सएप संपर्क' : 'Direct phone calls without commissions',
        language === 'mr' ? 'कामगाराचे कामाचे तास व हिशोब नोंद' : language === 'hi' ? 'काम के घंटे व हाजिरी ट्रैकिंग' : 'Digital clock-in and daily shift confirmation'
      ],
      buttonText: language === 'mr' ? 'विनामूल्य सुरू करा' : language === 'hi' ? 'मुफ्त शुरू करें' : 'Start Free'
    },
    {
      id: 'contractor_pro',
      name: language === 'mr' ? 'कंत्राटदार प्रो (Contractor Pro)' : language === 'hi' ? 'ठेकेदार प्रो (Contractor Pro)' : 'Contractor Pro',
      description: language === 'mr' ? 'बांधकाम कंत्राटदार व नियमित काम देणाऱ्यांसाठी.' : language === 'hi' ? 'सिविल ठेकेदार व नियमित निर्माण कार्यों हेतु।' : 'For civil contractors and regular construction sites.',
      price: '₹1,499',
      priceNote: language === 'mr' ? '/ महिना (3 महिन्यांची सूट)' : language === 'hi' ? '/ महीना (3 माह की छूट)' : '/ month (bil-monthly discount)',
      priceStrikethrough: false,
      alertText: language === 'mr' ? 'सवलत: पहिले 10 कारागीर थेट मोफत हायरिंग' : language === 'hi' ? 'विशेष ऑफर: पहली 10 हायरिंग बिल्कुल मुफ्त' : 'Founding Offer: 10 trial crew dispatches free',
      features: [
        language === 'mr' ? 'तयार कामगार संघ (Plumber + Electrician + Helpers) थेट बुकिंग' : language === 'hi' ? 'रेडीमेड लेबर टीम (मिस्त्री + हेल्पर) डायरेक्ट बुकिंग' : 'Instant pre-formed crew dispatch (Mason + Helpers)',
        language === 'mr' ? 'सत्यापित आधार व कामाची अवजारे तपासणी बॅज' : language === 'hi' ? 'सत्यापित पहचान व औजार जांच' : 'Aadhaar verified workers with safety-checked tools',
        language === 'mr' ? 'GST बिलिंग, हिशोब इनव्हॉईस व कामगार हजेरी शीट' : language === 'hi' ? 'जीएसटी इनवॉइस व डिजिटल उपस्थिति पत्रक' : 'GST compliant digital muster and daily work invoices',
        language === 'mr' ? 'तात्काळ कारागीर रिप्लेसमेंट गॅरंटी (सकाळी 9 पर्यंत)' : language === 'hi' ? 'सुबह 9 बजे तक तुरंत कारीगर रिप्लेसमेंट' : 'Same-day worker replacement guarantee before 9:00 AM'
      ],
      buttonText: language === 'mr' ? 'प्रो योजना निवडा' : language === 'hi' ? 'प्रो प्लान चुनें' : 'Select Pro Plan'
    },
    {
      id: 'builder_enterprise',
      name: language === 'mr' ? 'बिल्डर व इन्फ्रा एंटरप्राइज' : language === 'hi' ? 'बिल्डर व इंफ्रा एंटरप्राइज' : 'Builder & Enterprise',
      description: language === 'mr' ? 'मोठ्या साईट्ससाठी समर्पित लेबर समन्वयक.' : language === 'hi' ? 'बड़ी निर्माण साइट्स हेतु समर्पित लेबर समन्वयक।' : 'For large residential & commercial infrastructure projects.',
      price: '₹4,999',
      priceNote: language === 'mr' ? '/ महिना प्रति साईट' : language === 'hi' ? '/ महीना प्रति साइट' : '/ month per project site',
      priceStrikethrough: false,
      alertText: language === 'mr' ? 'BOCW मंडळ अनुपालन व कामगार अपघात विमा सहाय्य' : language === 'hi' ? 'BOCW अनुपालन व बीमा सहायता शामिल' : 'Full BOCW compliance filing & group accident protection',
      features: [
        language === 'mr' ? '20+ कामगारांची थेट नाका ते साईट पिकअप व्यवस्था' : language === 'hi' ? '20+ कारीगरों का नाका से साइट डायरेक्ट मोबिलाइजेशन' : 'Bulk mobilization of 20+ skilled wagers directly from chowks',
        language === 'mr' ? 'समर्पित स्थानिक नाका समन्वयक (On-ground Field Officer)' : language === 'hi' ? 'समर्पित स्थानीय नाका कोऑर्डिनेटर' : 'Dedicated on-ground naka coordinator for attendance',
        language === 'mr' ? 'महाराष्ट्र BOCW कल्याण मंडळ नोंदणी सहाय्य' : language === 'hi' ? 'सरकारी कल्याण बोर्ड पंजीयन में सहायता' : 'Official BOCW & e-Shram group welfare documentation',
        language === 'mr' ? 'प्राधान्य 24/7 फोन व लीगल एड सहाय्यता' : language === 'hi' ? 'प्राथमिकता 24/7 कानूनी व विवाद निवारण सहायता' : 'Priority 24/7 helpline and legal grievance mediation'
      ],
      buttonText: language === 'mr' ? 'आमच्याशी संपर्क साधा' : language === 'hi' ? 'संपर्क करें' : 'Talk to Labor Cell'
    }
  ];

  const handleSelect = (planId) => {
    if (onBookCall) {
      onBookCall(planId);
    } else {
      showToast(
        language === 'mr'
          ? `योजना निवडली: ${planId}. आमच्या नाका प्रतिनिधीशी जोडत आहोत...`
          : `Selected plan: ${planId}. Connecting with labor coordinator...`,
        'success'
      );
    }
  };

  return (
    <section className={`py-6 sm:py-10 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#B45309] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('plansPilotBadge')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('plansTitle')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {t('plansSubtitle')}
          </p>
        </div>

        {/* Stacked Cards */}
        <div className="space-y-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {plan.id === 'contractor_pro' && (
                <div className="absolute top-0 right-0 bg-[#B45309] text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                  ★ MOST POPULAR
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Plan Details */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                          {plan.price}
                        </span>
                        {plan.priceNote && (
                          <span className="text-xs sm:text-sm font-bold text-slate-500">
                            {plan.priceNote}
                          </span>
                        )}
                      </div>
                    </div>

                    {plan.alertText && (
                      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-bold text-amber-950 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#B45309] shrink-0" />
                        <span>{plan.alertText}</span>
                      </div>
                    )}
                  </div>

                  {/* 3D Pill Button */}
                  <button
                    onClick={() => handleSelect(plan.id)}
                    className="w-full py-3.5 px-6 rounded-full font-black text-xs sm:text-sm text-white bg-slate-900 
                    shadow-[0_8px_16px_-4px_rgba(15,23,42,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]
                    hover:shadow-[0_16px_28px_-6px_rgba(15,23,42,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]
                    hover:bg-[#B45309] active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{plan.buttonText}</span>
                  </button>
                </div>

                {/* Right Column: Features */}
                <div className="lg:col-span-7 relative pt-2 lg:pt-0">
                  {/* Desktop Divider */}
                  <div className="hidden lg:block absolute left-[-1.5rem] top-0 bottom-0 w-[1px] bg-slate-200"></div>

                  {/* Mobile Divider */}
                  <div className="block lg:hidden w-full h-[1px] bg-slate-200 mb-6"></div>

                  <div className="space-y-2 mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      {language === 'mr' ? 'समाविष्ट वैशिष्ट्ये' : language === 'hi' ? 'शामिल सुविधाएं' : 'Included Capabilities'}
                    </span>
                  </div>

                  <ul className="space-y-3.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          <div className="bg-[#B45309] rounded-full p-1 w-5 h-5 flex items-center justify-center shadow-sm">
                            <Check className="w-3 h-3 text-white stroke-[3]" />
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 text-center max-w-xl mx-auto shadow-sm space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Commission-Free Direct Hiring for Roadside Hawkers</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Workers receive 100% of their daily wage. No platform deductions from worker earnings.
          </p>
        </div>

      </div>
    </section>
  );
}
