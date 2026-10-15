import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatDistance } from '../utils/distance';

export default function NakaMap({
  userCoords,
  pickupPoints,
  selectedPickup,
  onSelectPickup,
  language = 'en'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center map around user coords or first pickup point
    const initialLat = userCoords?.lat || 18.7844;
    const initialLng = userCoords?.lng || 73.3444;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 12,
        scrollWheelZoom: false,
        attributionControl: false
      });

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([initialLat, initialLng], 12);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // 1. User Location Marker (Pulsing Blue Dot)
    if (userCoords?.lat && userCoords?.lng) {
      const userIcon = L.divIcon({
        className: 'user-pin-marker',
        html: `
          <div style="position: relative; width: 24px; height: 24px;">
            <div style="position: absolute; width: 24px; height: 24px; background: rgba(59, 130, 246, 0.4); border-radius: 9999px; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; top: 4px; left: 4px; width: 16px; height: 16px; background: #2563EB; border: 2px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const userMarker = L.marker([userCoords.lat, userCoords.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; font-weight: bold; padding: 4px;">
            📍 <strong>You Are Here</strong>
          </div>
        `);
      markersRef.current.push(userMarker);
    }

    // 2. Pickup Points Markers (Terracotta Chowk Pins)
    if (pickupPoints && pickupPoints.length > 0) {
      pickupPoints.forEach(point => {
        const isSelected = selectedPickup?.id === point.id;
        const ptName = point.name[language] || point.name.en;

        const nakaIcon = L.divIcon({
          className: 'naka-pin-marker',
          html: `
            <div style="
              background: ${isSelected ? '#B45309' : '#0F172A'};
              color: #FFFFFF;
              font-size: 11px;
              font-weight: 900;
              padding: 4px 8px;
              border-radius: 12px;
              border: 2px solid #FFFFFF;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
              display: flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
              cursor: pointer;
            ">
              <span>🔨</span>
              <span>${point.area}</span>
            </div>
          `,
          iconSize: [60, 28],
          iconAnchor: [30, 14]
        });

        const marker = L.marker([point.lat, point.lng], { icon: nakaIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; padding: 6px; min-width: 140px;">
              <div style="font-weight: 900; color: #0F172A; font-size: 13px; margin-bottom: 2px;">
                ${ptName}
              </div>
              <div style="color: #64748B; font-size: 11px; margin-bottom: 4px;">
                ${point.workersCount} workers active • ${formatDistance(point.distanceKm, language)}
              </div>
              <a href="${point.directionsUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #B45309; color: #FFF; padding: 4px 8px; border-radius: 6px; text-decoration: none; font-size: 11px; font-weight: bold;">
                Directions ↗
              </a>
            </div>
          `);

        marker.on('click', () => {
          if (onSelectPickup) onSelectPickup(point.id);
        });

        markersRef.current.push(marker);
      });
    }

    // Leaflet needs invalidateSize when shown in modals/animations
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => clearTimeout(timer);
  }, [userCoords, pickupPoints, selectedPickup, language, onSelectPickup]);

  return (
    <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-slate-200 relative shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      
      {/* Legend Overlay */}
      <div className="absolute bottom-2 left-2 z-20 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-700 flex items-center gap-3 shadow-sm pointer-events-none">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span> You
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#B45309]"></span> Naka
        </span>
      </div>
    </div>
  );
}
