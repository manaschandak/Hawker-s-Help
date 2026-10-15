import { useState, useEffect, useCallback, useMemo } from 'react';
import { PICKUP_POINTS } from '../data/pickupPoints';
import { getDistanceKm, getGoogleMapsDirectionsUrl } from '../utils/distance';

const NOMINATIM_CACHE_KEY = 'hh_geo_cache';

export function useLocation() {
  // Default fallback coords (Khopoli Naka)
  const defaultCoords = { lat: 18.7844, lng: 73.3444, accuracy: 20 };

  const [coords, setCoords] = useState(() => {
    try {
      const saved = localStorage.getItem('hh_user_coords');
      return saved ? JSON.parse(saved) : defaultCoords;
    } catch {
      return defaultCoords;
    }
  });

  const [locationStatus, setLocationStatus] = useState('idle'); // idle | loading | success | denied | unavailable
  const [errorMessage, setErrorMessage] = useState(null);
  const [areaName, setAreaName] = useState('Khopoli Naka, Raigad');
  const [selectedPickupId, setSelectedPickupId] = useState('naka_khopoli');

  // Compute sorted pickup points by distance to current coords
  const sortedPickupPoints = useMemo(() => {
    return [...PICKUP_POINTS].map(point => {
      const distance = getDistanceKm(coords.lat, coords.lng, point.lat, point.lng);
      return {
        ...point,
        distanceKm: distance,
        directionsUrl: getGoogleMapsDirectionsUrl(point.lat, point.lng, point.googleMapsQuery)
      };
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [coords.lat, coords.lng]);

  const nearestPickup = sortedPickupPoints[0];

  // Reverse geocode via Nominatim with rate limiting / caching
  const reverseGeocode = useCallback(async (lat, lng) => {
    try {
      const cacheKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
      const cached = sessionStorage.getItem(`${NOMINATIM_CACHE_KEY}_${cacheKey}`);
      if (cached) {
        setAreaName(cached);
        return;
      }

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en'
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        const address = data.address || {};
        const display =
          address.suburb ||
          address.neighbourhood ||
          address.village ||
          address.town ||
          address.city_district ||
          address.city ||
          data.display_name?.split(',')[0] ||
          'Khopoli Chowk';
        const fullDisplay = `${display}${address.county ? `, ${address.county}` : ''}`;
        setAreaName(fullDisplay);
        sessionStorage.setItem(`${NOMINATIM_CACHE_KEY}_${cacheKey}`, fullDisplay);
      }
    } catch {
      // Fallback silently to closest known naka area
      if (nearestPickup) {
        setAreaName(`${nearestPickup.area} Area`);
      }
    }
  }, [nearestPickup]);

  // Request browser live location
  const refreshLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocationStatus('unavailable');
      setErrorMessage('Geolocation not supported by this browser.');
      return;
    }

    setLocationStatus('loading');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setCoords(newCoords);
        setLocationStatus('success');
        try {
          localStorage.setItem('hh_user_coords', JSON.stringify(newCoords));
        } catch {
          // ignore
        }
        reverseGeocode(newCoords.lat, newCoords.lng);
      },
      (err) => {
        if (err.code === 1) {
          setLocationStatus('denied');
          setErrorMessage('Location permission denied. Using Khopoli Naka fallback.');
        } else {
          setLocationStatus('unavailable');
          setErrorMessage('Unable to determine location. Showing nearest naka.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000
      }
    );
  }, [reverseGeocode]);

  // Manual selection of pickup point
  const setManualPickup = useCallback((pickupId) => {
    const found = PICKUP_POINTS.find(p => p.id === pickupId);
    if (found) {
      setSelectedPickupId(pickupId);
      setCoords({ lat: found.lat, lng: found.lng, accuracy: 10 });
      setAreaName(`${found.area} Naka`);
      setLocationStatus('success');
    }
  }, []);

  return {
    coords,
    locationStatus,
    errorMessage,
    areaName,
    sortedPickupPoints,
    nearestPickup,
    selectedPickup: PICKUP_POINTS.find(p => p.id === selectedPickupId) || nearestPickup,
    refreshLocation,
    setManualPickup
  };
}
