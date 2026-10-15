import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, X, Check, ThumbsUp } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[400px] bg-white rounded-t-3xl sm:rounded-3xl border-t-4 border-amber-500 shadow-2xl p-5 space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-black text-slate-900 text-base">
              {t('rateExperience')}
            </h3>
            <p className="text-xs text-slate-500">
              {targetName} यांच्यासोबतचा अनुभव कसा होता?
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Three Big Face Sentiment Buttons */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <button
            onClick={() => {
              setSentiment('great');
              setStars(5);
            }}
            className={`p-3 rounded-2xl border-2 transition-all touch-target active:scale-95 ${
              sentiment === 'great'
                ? 'border-emerald-600 bg-emerald-50 shadow-md font-bold text-emerald-950'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <div className="text-3xl mb-1">😃</div>
            <div className="text-xs">{language === 'mr' ? 'उत्तम काम' : 'Great'}</div>
          </button>

          <button
            onClick={() => {
              setSentiment('neutral');
              setStars(3);
            }}
            className={`p-3 rounded-2xl border-2 transition-all touch-target active:scale-95 ${
              sentiment === 'neutral'
                ? 'border-amber-500 bg-amber-50 shadow-md font-bold text-amber-950'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <div className="text-3xl mb-1">😐</div>
            <div className="text-xs">{language === 'mr' ? 'साधारण' : 'Okay'}</div>
          </button>

          <button
            onClick={() => {
              setSentiment('poor');
              setStars(1);
            }}
            className={`p-3 rounded-2xl border-2 transition-all touch-target active:scale-95 ${
              sentiment === 'poor'
                ? 'border-red-500 bg-red-50 shadow-md font-bold text-red-950'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <div className="text-3xl mb-1">🙁</div>
            <div className="text-xs">{language === 'mr' ? 'असमाधानी' : 'Poor'}</div>
          </button>
        </div>

        {/* 2. Five Star Rating Picker */}
        <div className="flex justify-center gap-2 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setStars(star)}
              className="p-1 touch-target active:scale-110"
              aria-label={`${star} stars`}
            >
              <Star
                className={`w-7 h-7 ${
                  star <= stars
                    ? 'fill-amber-400 text-amber-500'
                    : 'text-slate-300'
                }`}
              />
            </button>
          ))}
        </div>

        {/* 3. Quick Feedback Tags */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            {language === 'mr' ? 'योग्य गुणवैशिष्ट्ये निवडा:' : 'Quick tags:'}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map(tag => {
              const active = selectedTags.includes(tag.label);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.label)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {active ? '✓ ' : '+ '} {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
        >
          <Check className="w-5 h-5" />
          <span>{language === 'mr' ? 'रेटिंग सबमिट करा' : 'Submit Review'}</span>
        </button>

      </div>
    </div>
  );
}
