/**
 * Verified roadside hiring points (Nakas / Labour Chowks)
 * with precise geographical coordinates for live geolocation.
 */
export const PICKUP_POINTS = [
  {
    id: 'naka_khopoli',
    name: {
      en: 'Khopoli Station Naka',
      hi: 'खोपोली स्टेशन नाका',
      mr: 'खोपोली स्टेशन नाका'
    },
    area: 'Khopoli',
    address: 'Near Old Bus Stand & St. Xavier High School, Khopoli, Raigad, Maharashtra 410203',
    lat: 18.7844,
    lng: 73.3444,
    workersCount: 18,
    peakHours: '7:00 AM - 10:30 AM',
    facilities: ['Water Booth', 'Shaded Shed', 'Tea Stall'],
    googleMapsQuery: 'Khopoli Railway Station Naka'
  },
  {
    id: 'naka_khalapur',
    name: {
      en: 'Khalapur Chowk',
      hi: 'खालापूर मुख्य चौक',
      mr: 'खालापूर मुख्य चौक'
    },
    area: 'Khalapur',
    address: 'Main Bazaar Road, Near Tehsil Office, Khalapur, Raigad, Maharashtra 410202',
    lat: 18.8315,
    lng: 73.2847,
    workersCount: 12,
    peakHours: '7:30 AM - 10:00 AM',
    facilities: ['Shaded Shed', 'PCO'],
    googleMapsQuery: 'Khalapur Chowk Raigad'
  },
  {
    id: 'naka_karjat',
    name: {
      en: 'Karjat Station Chowk',
      hi: 'कर्जत स्टेशन चौक',
      mr: 'कर्जत स्टेशन चौक'
    },
    area: 'Karjat',
    address: 'Station Road West, Opp. Auto Stand, Karjat, Maharashtra 410201',
    lat: 18.9102,
    lng: 73.3283,
    workersCount: 22,
    peakHours: '6:30 AM - 11:00 AM',
    facilities: ['Drinking Water', 'ATM', 'Bus Stop'],
    googleMapsQuery: 'Karjat Railway Station Labour Naka'
  },
  {
    id: 'naka_panvel',
    name: {
      en: 'Old Panvel Naka',
      hi: 'पुराना पनवेल नाका',
      mr: 'जुना पनवेल नाका'
    },
    area: 'Panvel',
    address: 'Near Shivaji Chowk & Bunder Road, Old Panvel, Navi Mumbai 410206',
    lat: 18.9894,
    lng: 73.1175,
    workersCount: 35,
    peakHours: '6:00 AM - 11:30 AM',
    facilities: ['Labour Union Booth', 'CCTV Area', 'Public Toilet'],
    googleMapsQuery: 'Old Panvel Shivaji Chowk Labour Naka'
  },
  {
    id: 'naka_rasayani',
    name: {
      en: 'Rasayani Industrial Naka',
      hi: 'रसायनी इंडस्ट्रियल नाका',
      mr: 'रसायनी औद्योगिक नाका'
    },
    area: 'Rasayani',
    address: 'Patalganga MIDC Junction, Rasayani, Maharashtra 410207',
    lat: 18.9011,
    lng: 73.1678,
    workersCount: 15,
    peakHours: '7:00 AM - 9:30 AM',
    facilities: ['Canteen', 'Bus Shelter'],
    googleMapsQuery: 'Rasayani MIDC Naka'
  }
];
