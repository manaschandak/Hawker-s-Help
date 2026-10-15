/**
 * Haversine distance calculator between two lat/lng coordinates in kilometers.
 */
export function getDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
    return 0;
  }
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10; // Round to 1 decimal place
}

export function formatDistance(km, language = 'en') {
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return language === 'mr' ? `${meters} मी` : language === 'hi' ? `${meters} मी` : `${meters} m`;
  }
  return language === 'mr' ? `${km} किमी` : language === 'hi' ? `${km} किमी` : `${km} km`;
}

export function getGoogleMapsDirectionsUrl(destLat, destLng, destName = '') {
  return `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&destination_place_id=${encodeURIComponent(
    destName
  )}`;
}
