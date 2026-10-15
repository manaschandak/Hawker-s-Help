import React from 'react';
import { MapPin, Navigation, ExternalLink, X, RotateCcw, CheckCircle2, ShieldCheck, Bus, Star, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDistance } from '../utils/distance';
import NakaMap from './NakaMap';

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
    <div className="fixed inset-0 z-50 bg-[#0A0A0A]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[32px] p-6 sm:p-7 shadow-2xl border-2 border-[#0A0A0A] space-y-5 animate-slide-up max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#FDE047] border-2 border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A]">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0A0A0A]">
                {t('nearestNakaLabel')}
              </h3>
              <p className="text-xs text-neutral-600 font-bold">
                {areaName || 'Detecting GPS position...'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border-2 border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live GPS Trigger Button */}
        <div className="p-4 rounded-[24px] bg-[#FEF08A]/40 border-2 border-[#0A0A0A] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#0A0A0A] uppercase tracking-wide">
              Live Geolocation
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white">
              {locationStatus === 'loading' ? 'Searching GPS...' : locationStatus === 'success' ? 'GPS Active' : 'Fallback Mode'}
            </span>
          </div>

          <p className="text-xs text-neutral-800 font-medium">
            {t('locationPermissionExpl')}
          </p>

          {errorMessage && (
            <p className="text-[11px] text-[#DC2626] font-bold">
              {errorMessage}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={refreshLocation}
              disabled={locationStatus === 'loading'}
              className="flex-1 min-h-[48px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all border-2 border-[#0A0A0A] disabled:opacity-50"
            >
              <Navigation size={14} className={locationStatus === 'loading' ? 'animate-spin' : ''} />
              <span>{t('refreshGps')}</span>
            </button>
          </div>
        </div>

        {/* Interactive Leaflet OpenStreetMap */}
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase text-neutral-500 tracking-wider block">
            Roadside Chowks Map
          </label>
          <NakaMap
            userCoords={coords}
            pickupPoints={sortedPickupPoints}
            selectedPickup={selectedPickup}
            onSelectPickup={setManualPickup}
            language={language}
          />
        </div>

        {/* Nearest Pickup Highlight Card */}
        {nearestPickup && (
          <div className="bg-[#0A0A0A] text-white rounded-[28px] p-5 space-y-3 shadow-md border-2 border-[#0A0A0A]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#FDE047] tracking-wider inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#FDE047] text-[#FDE047]" />
                  <span>Closest Active Chowk</span>
                </span>
                <h4 className="text-base font-black text-white mt-1">
                  {nearestPickup.name[language] || nearestPickup.name.en}
                </h4>
                <p className="text-xs text-neutral-300 font-medium mt-0.5">
                  {nearestPickup.address}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl font-black text-[#FDE047]">
                  {formatDistance(nearestPickup.distanceKm, language)}
                </span>
                <span className="text-[10px] text-neutral-400 block font-bold">
                  away
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-neutral-800">
              {nearestPickup.facilities.map((fac, i) => (
                <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-200 inline-flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#FDE047]" />
                  <span>{fac}</span>
                </span>
              ))}
            </div>

            <a
              href={nearestPickup.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] bg-[#FDE047] hover:bg-yellow-300 text-[#0A0A0A] font-black rounded-full text-xs flex items-center justify-center gap-1.5 transition-colors no-underline border-2 border-[#0A0A0A]"
            >
              <ExternalLink size={14} />
              <span>{t('openInMaps')}</span>
            </a>
          </div>
        )}

        {/* Manual Pickup Selection List */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-neutral-500 tracking-wider block">
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
                  className={`w-full p-3.5 rounded-[24px] text-left border-2 transition-all flex items-center justify-between group touch-target ${
                    isSelected
                      ? 'border-[#0A0A0A] bg-[#FEF08A] shadow-sm'
                      : 'border-neutral-200 bg-white hover:border-[#0A0A0A] hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white border border-[#0A0A0A] flex items-center justify-center text-sm font-bold text-[#0A0A0A]">
                      <MapPin className="w-4 h-4 text-[#0A0A0A]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-[#0A0A0A]">
                        {pointName}
                      </h5>
                      <span className="text-[11px] text-neutral-600 font-bold">
                        {point.workersCount} workers active • {point.peakHours}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#0A0A0A]">
                      {formatDistance(point.distanceKm, language)}
                    </span>
                    {isSelected && (
                      <CheckCircle2 size={16} className="text-[#0A0A0A]" />
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
