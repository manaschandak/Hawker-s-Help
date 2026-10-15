import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, X, Check, ThumbsUp, Smile, Meh, Frown } from 'lucide-react';
import { StateCharacter } from './Characters';

export default function RatingModal({ isOpen, onClose, targetName, targetRole, jobId }) {
  const { submitReview, language, t } = useApp();

  const [sentiment, setSentiment] = useState('great'); // great | neutral | poor
  const [stars, setStars] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['On time (वेळेवर)', 'Skilled (अनुभवी)']);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const availableTags = targetRole === 'worker'
    ? [
        { id: 't1', label: language === 'mr' ? 'वेळेवर आले (On time)' : 'On time' },
        { id: 't2', label: language === 'mr' ? 'उत्तम काम केले (Skilled)' : 'Skilled' },
        { id: 't3', label: language === 'mr' ? 'नम्र व आदरयुक्त (Polite)' : 'Respectful' },
        { id: 't4', label: language === 'mr' ? 'कामाची जागा स्वच्छ केली' : 'Cleaned site' }
      ]
    : [
        { id: 'e1', label: language === 'mr' ? 'वेळेवर मजुरी दिली (Paid on time)' : 'Paid on time' },
        { id: 'e2', label: language === 'mr' ? 'चहा-पाण्याची चांगली सोय केली' : 'Good hospitality' },
        { id: 'e3', label: language === 'mr' ? 'सुरक्षित वातावरण होते' : 'Safe work site' }
      ];

  const toggleTag = (tagLabel) => {
    setSelectedTags(prev =>
      prev.includes(tagLabel) ? prev.filter(t => t !== tagLabel) : [...prev, tagLabel]
    );
  };

  const handleSubmit = () => {
    submitReview(jobId, {
      rating: stars,
      sentiment,
      tags: selectedTags,
      comment,
      role: targetRole
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[420px] bg-white rounded-t-[32px] sm:rounded-[32px] border-4 border-[#0A0A0A] shadow-2xl p-6 space-y-4">
        
        <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-3">
          <div className="flex items-center gap-3">
            <StateCharacter state="happy" className="w-12 h-12 flex-shrink-0" />
            <div>
              <h3 className="font-black text-[#0A0A0A] text-lg leading-tight">
                {t('rateExperience')}
              </h3>
              <p className="text-xs text-neutral-600 font-bold mt-0.5">
                {targetName} यांच्यासोबतचा अनुभव कसा होता?
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border-2 border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] font-black"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 1. Three Big Face Sentiment Buttons */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <button
            onClick={() => {
              setSentiment('great');
              setStars(5);
            }}
            className={`min-h-[56px] p-3 rounded-2xl border-2 border-[#0A0A0A] transition-all active:scale-95 flex flex-col items-center justify-center ${
              sentiment === 'great'
                ? 'bg-[#DCFCE7] shadow-md font-black text-[#15803D]'
                : 'bg-white text-neutral-600'
            }`}
          >
            <Smile className="w-8 h-8 mb-1 stroke-[2.5]" />
            <div className="text-xs font-black">{language === 'mr' ? 'उत्तम काम' : 'Great'}</div>
          </button>

          <button
            onClick={() => {
              setSentiment('neutral');
              setStars(3);
            }}
            className={`min-h-[56px] p-3 rounded-2xl border-2 border-[#0A0A0A] transition-all active:scale-95 flex flex-col items-center justify-center ${
              sentiment === 'neutral'
                ? 'bg-[#FDE047] shadow-md font-black text-[#0A0A0A]'
                : 'bg-white text-neutral-600'
            }`}
          >
            <Meh className="w-8 h-8 mb-1 stroke-[2.5]" />
            <div className="text-xs font-black">{language === 'mr' ? 'साधारण' : 'Okay'}</div>
          </button>

          <button
            onClick={() => {
              setSentiment('poor');
              setStars(1);
            }}
            className={`min-h-[56px] p-3 rounded-2xl border-2 border-[#0A0A0A] transition-all active:scale-95 flex flex-col items-center justify-center ${
              sentiment === 'poor'
                ? 'bg-[#FEE2E2] shadow-md font-black text-[#DC2626]'
                : 'bg-white text-neutral-600'
            }`}
          >
            <Frown className="w-8 h-8 mb-1 stroke-[2.5]" />
            <div className="text-xs font-black">{language === 'mr' ? 'असमाधानी' : 'Poor'}</div>
          </button>
        </div>

        {/* 2. Five Star Rating Picker */}
        <div className="flex justify-center gap-2 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setStars(star)}
              className="p-2 min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-110"
              aria-label={`${star} stars`}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= stars
                    ? 'fill-[#FDE047] text-[#0A0A0A] stroke-[2]'
                    : 'text-neutral-300 stroke-[1.5]'
                }`}
              />
            </button>
          ))}
        </div>

        {/* 3. Quick Feedback Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-[#0A0A0A]">
            {language === 'mr' ? 'योग्य गुणवैशिष्ट्ये निवडा:' : 'Quick tags:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => {
              const active = selectedTags.includes(tag.label);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.label)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-black border-2 border-[#0A0A0A] transition-all active:scale-95 ${
                    active
                      ? 'bg-[#0A0A0A] text-[#FDE047] shadow-xs'
                      : 'bg-white text-[#0A0A0A] hover:bg-neutral-100'
                  }`}
                >
                  {active ? <Check className="w-3.5 h-3.5 inline mr-1 stroke-[3]" /> : '+ '} {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full min-h-[56px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full shadow-lg border-2 border-[#0A0A0A] flex items-center justify-center gap-2 active:scale-95 transition-transform text-base"
        >
          <Check className="w-5 h-5 stroke-[2.5]" />
          <span>{language === 'mr' ? 'रेटिंग सबमिट करा' : 'Submit Review'}</span>
        </button>

      </div>
    </div>
  );
}
