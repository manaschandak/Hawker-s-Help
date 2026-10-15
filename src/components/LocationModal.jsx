import React from 'react';
import { MapPin, Navigation, ExternalLink, X, RotateCcw, CheckCircle2, ShieldCheck, Bus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDistance } from '../utils/distance';

export default function LocationModal({
  isOpen,
  onClose,
  locationState
}) {
  const { language, t } = useApp();

  if (!isOpen || !locationState) return null;

  const {
    coords,
    locationStatus,
    errorMessage,
    areaName,
    sortedPickupPoints,
    nearestPickup,
    selectedPickup,
    refreshLocation,
    setManualPickup
  } = locationState;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-slate-200 space-y-5 animate-slide-up max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-[#B45309]">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {t('nearestNakaLabel')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {areaName || 'Detecting GPS position...'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live GPS Trigger Button */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#B45309] uppercase tracking-wide">
              Live Geolocation
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              {locationStatus === 'loading' ? 'Searching GPS...' : locationStatus === 'success' ? 'GPS Active' : 'Fallback Mode'}
            </span>
          </div>

          <p className="text-xs text-slate-700 font-medium">
            {t('locationPermissionExpl')}
          </p>

          {errorMessage && (
            <p className="text-[11px] text-red-600 font-bold">
              {errorMessage}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={refreshLocation}
              disabled={locationStatus === 'loading'}
              className="flex-1 py-2.5 bg-[#B45309] hover:bg-[#92400E] text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all disabled:opacity-50"
            >
              <Navigation size={14} className={locationStatus === 'loading' ? 'animate-spin' : ''} />
              <span>{t('refreshGps')}</span>
            </button>
          </div>
        </div>

        {/* Nearest Pickup Highlight Card */}
        {nearestPickup && (
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  ★ Closest Active Chowk
                </span>
                <h4 className="text-base font-black text-white mt-0.5">
                  {nearestPickup.name[language] || nearestPickup.name.en}
                </h4>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {nearestPickup.address}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-black text-amber-400">
                  {formatDistance(nearestPickup.distanceKm, language)}
                </span>
                <span className="text-[10px] text-slate-400 block font-bold">
                  away
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10">
              {nearestPickup.facilities.map((fac, i) => (
                <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-slate-200">
                  ✓ {fac}
                </span>
              ))}
            </div>

            <a
              href={nearestPickup.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors no-underline"
            >
              <ExternalLink size={14} />
              <span>{t('openInMaps')}</span>
            </a>
          </div>
        )}

        {/* Manual Pickup Selection List */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider block">
            {t('manualLocationPick')}
          </label>

          <div className="space-y-2">
            {sortedPickupPoints.map((point) => {
              const isSelected = selectedPickup?.id === point.id;
              const pointName = point.name[language] || point.name.en;
              return (
                <button
                  key={point.id}
                  onClick={() => {
                    setManualPickup(point.id);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-2xl text-left border-2 transition-all flex items-center justify-between group touch-target ${
                    isSelected
                      ? 'border-[#B45309] bg-amber-50/60 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">
                      📍
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900">
                        {pointName}
                      </h5>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {point.workersCount} workers active • {point.peakHours}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#B45309]">
                      {formatDistance(point.distanceKm, language)}
                    </span>
                    {isSelected && (
                      <CheckCircle2 size={16} className="text-[#B45309]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
