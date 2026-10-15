import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PricingSection from '../components/PricingSection';
import { useApp } from '../context/AppContext';

export default function Plans() {
  const navigate = useNavigate();
  const { t, showToast, language } = useApp();

  const handleBookCall = (planId) => {
    showToast(
      language === 'mr'
        ? `योजना निवडल्याबद्दल धन्यवाद! नाका समन्वय कक्ष लवकरच संपर्क करेल.`
        : `Plan selected! Our chowk coordinator cell will contact you shortly.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all touch-target shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>{t('backBtn')}</span>
        </button>
      </div>

      <PricingSection onBookCall={handleBookCall} />
    </div>
  );
}
