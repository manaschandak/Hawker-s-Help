// Hawker's Help Mock Dataset
// All welfare schemes, helpline numbers, and legal data are SAMPLE DATA for demonstration.

export const SAMPLE_DATA_DISCLAIMER = {
  en: "SAMPLE DATA: Scheme names, eligibility criteria, and helpline numbers are illustrative mock data. Please verify against official government portals (e-Shram, Maharashtra BOCW Board) before actual filing.",
  hi: "नमूना डेटा (SAMPLE DATA): योजना के नाम, पात्रता नियम और हेल्पलाइन नंबर केवल प्रदर्शन हेतु हैं। वास्तविक आवेदन से पहले आधिकारिक सरकारी पोर्टल (ई-श्रम, महाराष्ट्र BOCW) से पुष्टि करें।",
  mr: "नमुना माहिती (SAMPLE DATA): योजनांची नावे, पात्रता अटी आणि हेल्पलाइन क्रमांक हे केवळ प्रात्यक्षिकासाठी आहेत. प्रत्यक्ष नोंदणीपूर्वी अधिकृत सरकारी पोर्टलवरून खात्री करा."
};

export const AREA_BENCHMARKS = {
  plumber: { rate: 700, unit: "day", label: "₹700 / दिवस (सरासरी दर)" },
  electrician: { rate: 750, unit: "day", label: "₹750 / दिवस (सरासरी दर)" },
  carpenter: { rate: 800, unit: "day", label: "₹800 / दिवस (सरासरी दर)" },
  painter: { rate: 700, unit: "day", label: "₹700 / दिवस (सरासरी दर)" },
  mason: { rate: 850, unit: "day", label: "₹850 / दिवस (सरासरी दर)" },
  sweeper: { rate: 500, unit: "day", label: "₹500 / दिवस (सरासरी दर)" },
  helper: { rate: 500, unit: "day", label: "₹500 / दिवस (सरासरी दर)" },
};

export const COMMON_TOOLS = [
  { id: 'pipe_wrench', name: { en: 'Pipe Wrench', hi: 'पाइप रिंच', mr: 'पाईप रिंच' }, icon: 'Wrench' },
  { id: 'drill', name: { en: 'Power Drill', hi: 'ड्रिल मशीन', mr: 'ड्रील मशीन' }, icon: 'Drill' },
  { id: 'hammer', name: { en: 'Heavy Hammer', hi: 'हथौड़ा', mr: 'हातोडा' }, icon: 'Hammer' },
  { id: 'ladder', name: { en: 'Step Ladder', hi: 'सीढ़ी', mr: 'शिडी' }, icon: 'Ladder' },
  { id: 'tester', name: { en: 'Electric Tester & Stripper', hi: 'टेस्टर व कटर', mr: 'टेस्टर व वायर कटर' }, icon: 'Zap' },
  { id: 'paintbrush', name: { en: 'Paint Brushes & Roller', hi: 'पेंट ब्रश व रोलर', mr: 'रंगकामाचा ब्रश व रोलर' }, icon: 'Paintbrush' },
  { id: 'measuring_tape', name: { en: 'Measuring Tape', hi: 'नापने का फीता', mr: 'मोजपट्टी (टेप)' }, icon: 'Ruler' },
  { id: 'saw', name: { en: 'Hand Saw', hi: 'आरी', mr: 'करवत' }, icon: 'Scissors' },
  { id: 'trowel', name: { en: 'Mason Trowel', hi: 'करनी', mr: 'थापी (बांधकाम)' }, icon: 'Square' },
];

export const INITIAL_WORKERS = [
  {
    id: 'w1',
    name: 'Ramesh Shinde',
    trade: 'plumber',
    secondaryTrades: ['helper'],
    phone: '98221XXXXX',
    naka: 'Khopoli Naka (खोपोली नाका)',
    location: 'Khopoli, Maharashtra',
    experienceYears: 14,
    baseWageAsk: 700,
    rating: 4.9,
    reviewCount: 42,
    hoursWorkedTotal: 320,
    aadhaarMasked: 'XXXX XXXX 8921',
    isAadhaarVerified: true,
    availableStatus: 'available', // available | busy
    freeFrom: 'Today',
    ownedTools: ['pipe_wrench', 'drill', 'hammer', 'measuring_tape'],
    tags: ['On time (वेळेवर)', 'Skilled (अनुभवी)', 'Fair rate (योग्य दर)'],
    audioBio: 'मी रमेश शिंदे, 14 वर्षे प्लंबिंगचे काम करतो. गळती दुरुस्ती, बाथरूम फिटिंग आणि पाईपलाईन कामात पारंगत.',
    workPhotos: [
      { id: 'p1', title: 'PVC Pipeline Fitting', label: 'बाथरूम पाईपलाईन फिटिंग', tag: 'Plumbing' },
      { id: 'p2', title: 'Water Tank Overhaul', label: 'टाकी जोडणी व दुरुस्ती', tag: 'Water Tank' },
      { id: 'p3', title: 'Drainage Repair Work', label: 'ड्रेनेज चेंबर दुरुस्ती', tag: 'Drainage' },
      { id: 'p4', title: 'Kitchen Sink & Tap Set', label: 'नवीन सिंक व नळ फिटिंग', tag: 'Sanitary' }
    ]
  },
  {
    id: 'w2',
    name: 'Santosh Gaikwad',
    trade: 'electrician',
    secondaryTrades: [],
    phone: '98205XXXXX',
    naka: 'Khalapur Chowk (खालापूर चौक)',
    location: 'Khalapur',
    experienceYears: 18,
    baseWageAsk: 800,
    rating: 4.8,
    reviewCount: 56,
    hoursWorkedTotal: 480,
    aadhaarMasked: 'XXXX XXXX 3412',
    isAadhaarVerified: true,
    availableStatus: 'available',
    freeFrom: 'Today',
    ownedTools: ['tester', 'drill', 'ladder', 'measuring_tape'],
    tags: ['Safe work', 'Quick repair', 'Polite'],
    audioBio: 'संतोष गायकवाड, 18 वर्षांचा अनुभव. घरगुती वायरिंग, इन्व्हर्टर, शॉर्ट सर्किट कामे.',
    workPhotos: [
      { id: 'p5', title: 'Full House DB Wiring', label: 'डीबी बॉक्स वायरिंग', tag: 'Electrical' },
      { id: 'p6', title: 'Inverter & Battery Setup', label: 'इन्व्हर्टर बसवणे', tag: 'Power Backup' }
    ]
  },
  {
    id: 'w3',
    name: 'Suresh Jadhav',
    trade: 'carpenter',
    secondaryTrades: ['helper'],
    phone: '97631XXXXX',
    naka: 'Karjat Station Chowk (कर्जत चौक)',
    location: 'Karjat',
    experienceYears: 9,
    baseWageAsk: 750,
    rating: 4.7,
    reviewCount: 29,
    hoursWorkedTotal: 210,
    aadhaarMasked: 'XXXX XXXX 7761',
    isAadhaarVerified: true,
    availableStatus: 'available',
    freeFrom: 'Tomorrow',
    ownedTools: ['saw', 'hammer', 'measuring_tape', 'drill'],
    tags: ['Furniture repair', 'Door lock fix', 'Punctual'],
    audioBio: 'सुरेश जाधव, सुतार काम, कपाट दुरुस्ती, दरवाजा व कुलूप फिटिंग.',
    workPhotos: [
      { id: 'p7', title: 'Plywood Wardrobe Fix', label: 'कपाट दुरुस्ती', tag: 'Carpentry' }
    ]
  },
  {
    id: 'w4',
    name: 'Anand More',
    trade: 'helper',
    secondaryTrades: ['sweeper'],
    phone: '91560XXXXX',
    naka: 'Khopoli Naka',
    location: 'Khopoli',
    experienceYears: 4,
    baseWageAsk: 500,
    rating: 4.9,
    reviewCount: 38,
    hoursWorkedTotal: 180,
    aadhaarMasked: 'XXXX XXXX 1198',
    isAadhaarVerified: true,
    availableStatus: 'available',
    freeFrom: 'Today',
    ownedTools: ['hammer'],
    tags: ['Hard working', 'Prompt', 'Heavy lifting'],
    audioBio: 'आनंद मोरे, बांधकाम मदतनीस, सामान चढवणे-उतरवणे आणि स्वच्छता.',
    workPhotos: [
      { id: 'p8', title: 'Site Cleanup & Unloading', label: 'मटेरियल हँडलिंग', tag: 'Labour' }
    ]
  },
  {
    id: 'w5',
    name: 'Kavita Kamble',
    trade: 'sweeper',
    secondaryTrades: ['helper'],
    phone: '98192XXXXX',
    naka: 'Panvel Naka (पनवेल नाका)',
    location: 'Panvel',
    experienceYears: 8,
    baseWageAsk: 550,
    rating: 5.0,
    reviewCount: 34,
    hoursWorkedTotal: 260,
    aadhaarMasked: 'XXXX XXXX 9923',
    isAadhaarVerified: true,
    availableStatus: 'available',
    freeFrom: 'Today',
    ownedTools: [],
    tags: ['Thorough clean', 'Trusted by families', 'Safe'],
    audioBio: 'कविता कांबळे, फ्लॅट डीप क्लिनिंग, सोसायटी स्वच्छता, रंगकामानंतरची साफसफाई.',
    workPhotos: [
      { id: 'p9', title: 'Deep Kitchen Degreasing', label: 'किचन डीप क्लिनिंग', tag: 'Cleaning' }
    ]
  },
  {
    id: 'w6',
    name: 'Deepak Pawar',
    trade: 'painter',
    secondaryTrades: ['helper'],
    phone: '99214XXXXX',
    naka: 'Khopoli Naka',
    location: 'Khopoli',
    experienceYears: 12,
    baseWageAsk: 750,
    rating: 4.8,
    reviewCount: 45,
    hoursWorkedTotal: 310,
    aadhaarMasked: 'XXXX XXXX 5567',
    isAadhaarVerified: true,
    availableStatus: 'busy',
    freeFrom: '20 Oct',
    ownedTools: ['paintbrush', 'ladder'],
    tags: ['Clean finish', 'No paint drops', 'Fast'],
    audioBio: 'दीपक पवार, घर रंगकाम, वॉटरप्रूफिंग आणि पुट्टी काम.',
    workPhotos: [
      { id: 'p10', title: 'Exterior Waterproofing', label: 'वॉटरप्रूफिंग रंगकाम', tag: 'Painting' }
    ]
  },
  {
    id: 'w7',
    name: 'Sanjay Shelke',
    trade: 'mason',
    secondaryTrades: ['helper'],
    phone: '98690XXXXX',
    naka: 'Khalapur Chowk',
    location: 'Khalapur',
    experienceYears: 20,
    baseWageAsk: 850,
    rating: 4.9,
    reviewCount: 68,
    hoursWorkedTotal: 620,
    aadhaarMasked: 'XXXX XXXX 4409',
    isAadhaarVerified: true,
    availableStatus: 'available',
    freeFrom: 'Today',
    ownedTools: ['trowel', 'hammer', 'measuring_tape'],
    tags: ['Tile fitting', 'Brickwork specialist', 'Master craftsman'],
    audioBio: 'संजय शेळके, 20 वर्षे गवंडी काम, टाईल्स फिटिंग, प्लास्टर व भिंत बांधकाम.',
    workPhotos: [
      { id: 'p11', title: 'Bathroom Tile Alignment', label: 'टाईल्स फिटिंग काम', tag: 'Masonry' }
    ]
  },
  {
    id: 'w8',
    name: 'Pravin Bhoir',
    trade: 'helper',
    secondaryTrades: [],
    phone: '90288XXXXX',
    naka: 'Karjat Chowk',
    location: 'Karjat',
    experienceYears: 5,
    baseWageAsk: 500,
    rating: 4.6,
    reviewCount: 22,
    hoursWorkedTotal: 150,
    aadhaarMasked: 'XXXX XXXX 8832',
    isAadhaarVerified: false,
    availableStatus: 'available',
    freeFrom: 'Today',
    ownedTools: [],
    tags: ['Strong', 'On time'],
    audioBio: 'प्रवीण भोईर, हेल्पर, सिमेंट वाळू मिक्सिंग, वजन उचलणे.',
    workPhotos: []
  }
];

export const INITIAL_EMPLOYERS = [
  {
    id: 'emp1',
    name: 'Sunita Joshi (सुनिता जोशी)',
    type: 'Homeowner',
    location: 'Khopoli Heights, Khopoli',
    phone: '9820011223',
    rating: 4.9,
    reviewsCount: 14,
    paidOnTimePercent: 100,
    verifiedBadge: true,
    jobsPostedCount: 6,
    reportedCount: 0,
    workerFeedback: 'काम संपताच रोख पैसे दिले. चहा-पाण्याची चांगली सोय केली.'
  },
  {
    id: 'emp2',
    name: 'Rajesh Patil Hardware (राजेश पाटील)',
    type: 'Shop & Site Owner',
    location: 'Main Bazaar, Khalapur',
    phone: '9821122334',
    rating: 4.8,
    reviewsCount: 38,
    paidOnTimePercent: 96,
    verifiedBadge: true,
    jobsPostedCount: 22,
    reportedCount: 0,
    workerFeedback: 'नियमित काम देणारे शेठ. ठरलेले पैसे न कापता वेळेवर देतात.'
  },
  {
    id: 'emp3',
    name: 'Amit Mehra (अमित मेहरा)',
    type: 'Society Secretary',
    location: 'Hill View CHS, Karjat',
    phone: '9833445566',
    rating: 4.7,
    reviewsCount: 19,
    paidOnTimePercent: 94,
    verifiedBadge: true,
    jobsPostedCount: 11,
    reportedCount: 0,
    workerFeedback: 'मोठे काम होते. दररोज संध्याकाळी हिशोब पूर्ण केला.'
  },
  {
    id: 'emp4',
    name: 'Ganesh Builders (गणेश बिल्डर्स)',
    type: 'Civil Contractor',
    location: 'Old Panvel Naka',
    phone: '9877889900',
    rating: 4.3,
    reviewsCount: 42,
    paidOnTimePercent: 88,
    verifiedBadge: true,
    jobsPostedCount: 35,
    reportedCount: 1,
    workerFeedback: 'काम व्यवस्थित केले तर वेळेवर पैसे मिळतात. साइटवर सुरक्षा हेल्मेट देतात.'
  },
  {
    id: 'emp5',
    name: 'Quick Fast Labour Agency (अनोळखी ठेकेदार)',
    type: 'Unverified Third-party Agent',
    location: 'Highway Turn, Khopoli Outskirts',
    phone: '9123456789',
    rating: 2.1,
    reviewsCount: 7,
    paidOnTimePercent: 35,
    verifiedBadge: false,
    jobsPostedCount: 4,
    reportedCount: 5,
    workerFeedback: 'सावध राहा! काम झाल्यावर फोन उचलत नाही. आधी डिपॉझिट मागितले होते.'
  }
];

export const INITIAL_JOBS = [
  {
    id: 'job1',
    title: {
      en: 'Bathroom Leakage & Pipe Replacement',
      hi: 'बाथरूम लीकेज व नई पाइप फिटिंग',
      mr: 'बाथरूम गळती दुरुस्ती व पाईपलाईन फिटिंग'
    },
    trade: 'plumber',
    employerId: 'emp1',
    employerName: 'Sunita Joshi',
    locationName: 'Khopoli (Near St. Xavier School)',
    distanceKm: 0.9,
    payOffer: 700,
    payUnit: 'day',
    hoursText: '9:00 AM - 5:00 PM (8 तास)',
    startDate: 'Today',
    durationDays: 1,
    toolsNeeded: ['pipe_wrench', 'drill'],
    paymentTerms: {
      en: 'Cash or instant UPI right after testing pipes',
      hi: 'काम पूरा होते ही तुरंत नकद या यूपीआई',
      mr: 'काम पूर्ण झाल्यावर लगेच रोख किंवा UPI ने संपूर्ण मोबदला'
    },
    isFoodProvided: true,
    safetyStatus: 'safe', // safe | careful
    safetyNotes: {
      en: 'Verified resident homeowner. 100% on-time payment track record.',
      hi: 'सत्यापित घरमालक। 100% समय पर भुगतान का रिकॉर्ड।',
      mr: 'सत्यापित घरमालक. 100% वेळेवर पैसे देण्याचा सुरक्षित रेकॉर्ड.'
    },
    status: 'open', // open | negotiating | accepted | in_progress | completed | rated
    statusLabel: 'Open'
  },
  {
    id: 'job2',
    title: {
      en: 'Short Circuit Repair & 4 Switchboards Change',
      hi: 'शॉर्ट सर्किट चेक व 4 स्विचबोर्ड बदलना',
      mr: 'शॉर्ट सर्किट तपासणी व 4 स्विचबोर्ड बदलणे'
    },
    trade: 'electrician',
    employerId: 'emp2',
    employerName: 'Rajesh Patil Hardware',
    locationName: 'Khalapur Bazaar Road',
    distanceKm: 2.4,
    payOffer: 750,
    payUnit: 'day',
    hoursText: '9:30 AM - 4:30 PM (7 तास)',
    startDate: 'Today',
    durationDays: 1,
    toolsNeeded: ['tester', 'drill', 'ladder'],
    paymentTerms: {
      en: 'Cash payment from shop counter at 5:00 PM sharp',
      hi: 'शाम 5 बजे दुकान काउंटर से पूरा नकद भुगतान',
      mr: 'दुकान काउंटरवरून संध्याकाळी 5 वाजता पूर्ण रोख पैसे'
    },
    isFoodProvided: false,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Known local shopkeeper. 22 past jobs posted without complaints.',
      hi: 'स्थानीय प्रतिष्ठित दुकानदार। 22 पूर्व कार्यों में कोई शिकायत नहीं।',
      mr: 'स्थानिक ओळखीचे दुकानदार. 22 कामांचा चांगला इतिहास.'
    },
    status: 'open',
    statusLabel: 'Open'
  },
  {
    id: 'job3',
    title: {
      en: 'Teakwood Main Door Lock & Hinge Repair',
      hi: 'सागवान दरवाजे का लॉक व कब्जा दुरुस्ती',
      mr: 'मुख्य सागवानी दरवाजा लॉक व बिजागऱ्या दुरुस्ती'
    },
    trade: 'carpenter',
    employerId: 'emp3',
    employerName: 'Amit Mehra',
    locationName: 'Karjat (Hill View Society)',
    distanceKm: 4.1,
    payOffer: 800,
    payUnit: 'day',
    hoursText: '10:00 AM - 6:00 PM',
    startDate: 'Tomorrow',
    durationDays: 1,
    toolsNeeded: ['saw', 'hammer', 'drill'],
    paymentTerms: {
      en: 'Society secretary cheque or instant phone payment',
      hi: 'सोसायटी सचिव द्वारा तुरंत फोन पे / जीपे',
      mr: 'सोसायटी सचिव तर्फे काम संपताच ऑनलाईन UPI ट्रान्सफर'
    },
    isFoodProvided: true,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Gated society. Safety security pass provided at gate.',
      hi: 'गेटेड सोसायटी। सुरक्षा पास गेट पर उपलब्ध।',
      mr: 'सुरक्षित सोसायटी. गेटवर सुरक्षा पास मिळेल.'
    },
    status: 'open',
    statusLabel: 'Open'
  },
  {
    id: 'job4',
    title: {
      en: '2 BHK Fresh Painting - Living Room & Bedroom',
      hi: '2 बीएचके घर की पुट्टी व रंगाई',
      mr: '2 BHK घर रंगकाम - हॉल आणि बेडरूम'
    },
    trade: 'painter',
    employerId: 'emp1',
    employerName: 'Sunita Joshi',
    locationName: 'Khopoli',
    distanceKm: 1.2,
    payOffer: 700,
    payUnit: 'day',
    hoursText: '9:00 AM - 6:00 PM',
    startDate: 'Tomorrow',
    durationDays: 3,
    toolsNeeded: ['paintbrush', 'ladder'],
    paymentTerms: {
      en: 'Daily wage paid every evening at 6:00 PM in cash',
      hi: 'प्रतिदिन शाम 6 बजे नकद मजदूरी का भुगतान',
      mr: 'दररोज संध्याकाळी 6 वाजता कामाच्या शेवटी रोख मजुरी'
    },
    isFoodProvided: true,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Reputed household. Tea and morning snacks provided.',
      hi: 'विश्वसनीय परिवार। चाय-नाश्ते की सुविधा।',
      mr: 'विश्वासू कुटुंब. सकाळी चहा व दुपारचे जेवण मिळेल.'
    },
    status: 'open',
    statusLabel: 'Open'
  },
  {
    id: 'job5',
    title: {
      en: 'Tile Fixing in Verandah & Plaster Touch-up',
      hi: 'बरामदे में टाइल लगाना व प्लास्टर कार्य',
      mr: 'व्हरांड्यात फरशी बसवणे व प्लास्टर दुरुस्ती'
    },
    trade: 'mason',
    employerId: 'emp4',
    employerName: 'Ganesh Builders',
    locationName: 'Khalapur Site 2',
    distanceKm: 3.5,
    payOffer: 850,
    payUnit: 'day',
    hoursText: '8:30 AM - 5:00 PM',
    startDate: 'Today',
    durationDays: 2,
    toolsNeeded: ['trowel', 'hammer', 'measuring_tape'],
    paymentTerms: {
      en: 'Half advance at 1:00 PM, balance upon evening check',
      hi: 'दोपहर में आधा अग्रिम, शाम को बाकी भुगतान',
      mr: 'दुपारी अर्धी रक्कम, संध्याकाळी उर्वरित मजुरी'
    },
    isFoodProvided: false,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Site helmet and drinking water available on site.',
      hi: 'साइट पर सुरक्षा हेलमेट व पीने का पानी उपलब्ध।',
      mr: 'साइटवर हेल्मेट व पिण्याचे शुद्ध पाणी उपलब्ध.'
    },
    status: 'open',
    statusLabel: 'Open'
  },
  {
    id: 'job6',
    title: {
      en: 'Unloading 120 Cement Bags from Truck',
      hi: 'ट्रक से 120 सीमेंट बोरी उतारना',
      mr: 'ट्रकमधून 120 सिमेंट गोण्या गोदामात उतरवणे'
    },
    trade: 'helper',
    employerId: 'emp2',
    employerName: 'Rajesh Patil Hardware',
    locationName: 'Khopoli Godown Road',
    distanceKm: 0.5,
    payOffer: 550,
    payUnit: 'day',
    hoursText: '11:00 AM - 3:00 PM (4 तास)',
    startDate: 'Today',
    durationDays: 1,
    toolsNeeded: [],
    paymentTerms: {
      en: 'Full payment of ₹550 directly when truck is cleared',
      hi: 'ट्रक खाली होते ही पूरे ₹550 नकद',
      mr: 'ट्रक खाली होताच थेट रोख ₹550 हातात'
    },
    isFoodProvided: true,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Heavy lifting. Hand gloves provided by warehouse.',
      hi: 'वजन उठाने का काम। गोदाम द्वारा दस्ताने उपलब्ध।',
      mr: 'वजनदार काम. गोदामाकडून हाताचे मोजे दिले जातील.'
    },
    status: 'open',
    statusLabel: 'Open'
  },
  {
    id: 'job7',
    title: {
      en: 'Post-Renovation Society Hall Deep Cleaning',
      hi: 'मरम्मत के बाद हॉल की गहरी सफाई',
      mr: 'हॉल दुरुस्तीनंतरची सर्व कचरा स्वच्छता व पुसणे'
    },
    trade: 'sweeper',
    employerId: 'emp3',
    employerName: 'Amit Mehra',
    locationName: 'Karjat Station Area',
    distanceKm: 3.8,
    payOffer: 550,
    payUnit: 'day',
    hoursText: '9:00 AM - 4:00 PM',
    startDate: 'Today',
    durationDays: 1,
    toolsNeeded: [],
    paymentTerms: {
      en: 'Spot cash payment upon final inspection',
      hi: 'काम की जांच होते ही मौके पर नकद',
      mr: 'काम संपून पाहणी झाल्यावर जागेवरच रोख रक्कम'
    },
    isFoodProvided: true,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Brooms, phenyl and trash bags provided on site.',
      hi: 'झाड़ू, फिनाइल व कचरा बैग साइट पर मिलेंगे।',
      mr: 'झाडू, फिनाईल व कचरा पिशव्या आयोजक देतील.'
    },
    status: 'open',
    statusLabel: 'Open'
  },
  {
    id: 'job8',
    title: {
      en: 'Water Supply Motor Pump Wiring & Starter Fix',
      hi: 'पानी की मोटर व स्टार्टर वायरिंग चेक',
      mr: 'पाण्याची मोटर व स्टार्टर दुरुस्ती'
    },
    trade: 'electrician',
    employerId: 'emp4',
    employerName: 'Ganesh Builders',
    locationName: 'Rasayani Road, Khalapur',
    distanceKm: 5.2,
    payOffer: 700,
    payUnit: 'day',
    hoursText: '1:00 PM - 5:30 PM',
    startDate: 'Today',
    durationDays: 1,
    toolsNeeded: ['tester', 'pipe_wrench'],
    paymentTerms: {
      en: 'Direct site manager UPI transfer',
      hi: 'साइट मैनेजर द्वारा डायरेक्ट यूपीआई',
      mr: 'काम तपासल्यावर थेट बँक किंवा गुगल पे'
    },
    isFoodProvided: false,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Main power switch must be turned off before inspecting.',
      hi: 'काम शुरू करने से पहले मेन स्विच बंद करना अनिवार्य।',
      mr: 'काम सुरू करण्यापूर्वी मेन स्विच बंद केला जाईल.'
    },
    status: 'open',
    statusLabel: 'Open'
  },
  {
    id: 'job9',
    title: {
      en: 'Terrace Garden Pipeline & Tap Installation',
      hi: 'छत पर बागवानी पाइप व नल लगाना',
      mr: 'टेरेस गार्डनसाठी पाईपलाईन व 2 नळ बसवणे'
    },
    trade: 'plumber',
    employerId: 'emp1',
    employerName: 'Sunita Joshi',
    locationName: 'Khopoli',
    distanceKm: 1.1,
    payOffer: 650,
    payUnit: 'day',
    hoursText: '10:00 AM - 3:00 PM (5 तास)',
    startDate: 'Tomorrow',
    durationDays: 1,
    toolsNeeded: ['pipe_wrench', 'drill'],
    paymentTerms: {
      en: 'Cash paid upon completion',
      hi: 'काम पूरा होने पर नकद',
      mr: 'काम पूर्ण झाल्यावर लगेच रोख मोबदला'
    },
    isFoodProvided: true,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Safe open terrace. Drinking water available.',
      hi: 'सुरक्षित खुली छत। पीने का पानी उपलब्ध।',
      mr: 'सुरक्षित मोकळी गच्ची. पिण्याचे पाणी उपलब्ध.'
    },
    status: 'open',
    statusLabel: 'Open'
  },
  // Suspicious / Flagged jobs to teach safe practices
  {
    id: 'job10',
    title: {
      en: 'Factory Labour - Demands ₹250 Registration Fee',
      hi: 'फैक्ट्री मजदूरी - पहले ₹250 पंजीयन शुल्क की मांग',
      mr: 'कंपनी काम - कामापूर्वी ₹250 रजिस्ट्रेशन फी मागितली'
    },
    trade: 'helper',
    employerId: 'emp5',
    employerName: 'Quick Fast Labour Agency',
    locationName: 'Highway Toll, Khopoli',
    distanceKm: 7.2,
    payOffer: 400,
    payUnit: 'day',
    hoursText: '8:00 AM - 8:00 PM (12 तास - बेकायदेशीर)',
    startDate: 'Today',
    durationDays: 7,
    toolsNeeded: [],
    paymentTerms: {
      en: 'Claims payment will be made after 15 days via contractor',
      hi: 'ठेकेदार का दावा: 15 दिन बाद मिलेगा पैसा',
      mr: '15 दिवसांनी पैसे देऊ असे सांगत आहेत'
    },
    isFoodProvided: false,
    safetyStatus: 'careful', // SUSPICIOUS
    suspiciousFlags: [
      {
        en: 'Asks for ₹250 cash upfront for uniform/registration. Genuine employers NEVER ask workers for money.',
        hi: 'वर्दी के नाम पर पहले ₹250 की मांग। असली काम कभी पहले पैसे नहीं मांगता।',
        mr: 'कामासाठी आधी ₹250 मागितले जात आहेत. कोणतेही खरे काम कधीही आधी पैसे मागत नाही.'
      },
      {
        en: '12-hour shift offered at only ₹400 (far below Khopoli Naka minimum wage).',
        hi: '12 घंटे के लिए केवल ₹400 (क्षेत्रीय न्यूनतम मजदूरी से बहुत कम)।',
        mr: '12 तासांसाठी फक्त ₹400 (खोपोली नाक्याच्या किमान दरापेक्षा खूप कमी).'
      },
      {
        en: 'Reported 5 times by other workers for disappearing without payment.',
        hi: '5 मजदूरों ने काम करवाकर पैसा न देने की शिकायत दर्ज की है।',
        mr: '5 कामगारांनी पैसे बुडवल्याची तक्रार नोंदवली आहे.'
      }
    ],
    safetyNotes: {
      en: 'CAUTION: Highly suspicious. Do not pay any money upfront.',
      hi: 'सावधान: यह काम संदेहास्पद है। कोई भी अग्रिम राशि न दें।',
      mr: 'सावधान: हे काम संशयास्पद आहे. कामासाठी एकही रुपया आधी देऊ नका!'
    },
    status: 'open',
    statusLabel: 'Flagged'
  },
  {
    id: 'job11',
    title: {
      en: 'Unverified Contractor - Urgent Painting Job',
      hi: 'अज्ञात ठेकेदार - तत्काल रंगाई कार्य',
      mr: 'अनोळखी ठेकेदार - तातडीने घर रंगकाम'
    },
    trade: 'painter',
    employerId: 'emp5',
    employerName: 'Quick Fast Labour Agency',
    locationName: 'Isolated Outskirts, Khalapur',
    distanceKm: 8.5,
    payOffer: 450,
    payUnit: 'day',
    hoursText: 'Unknown hours',
    startDate: 'Today',
    durationDays: 2,
    toolsNeeded: ['paintbrush', 'ladder'],
    paymentTerms: {
      en: 'No written terms. Refuses to confirm payment date.',
      hi: 'भुगतान की तारीख बताने से इनकार।',
      mr: 'पैसे कधी मिळणार याची स्पष्टता नाही.'
    },
    isFoodProvided: false,
    safetyStatus: 'careful',
    suspiciousFlags: [
      {
        en: 'Unverified employer profile with multiple non-payment reports.',
        hi: 'गैर-सत्यापित नियोक्ता। मजदूरी न देने की रिपोर्ट।',
        mr: 'अपुष्ट प्रोफाइल. मजुरी न दिल्याबद्दल कामगारांच्या तक्रारी आहेत.'
      },
      {
        en: 'Wage offer ₹450 is ₹250 below the naka median rate (₹700).',
        hi: 'नाका औसत दर (₹700) से ₹250 कम वेतन।',
        mr: 'नाक्याच्या सरासरी दरापेक्षा (₹700) तब्बल ₹250 कमी मजुरी.'
      }
    ],
    safetyNotes: {
      en: 'CAUTION: Refuses to state payment mode. High risk of wage theft.',
      hi: 'सावधान: पैसे मिलने में धोखा होने की संभावना।',
      mr: 'सावधान: मजुरी बुडण्याचा मोठा धोका.'
    },
    status: 'open',
    statusLabel: 'Flagged'
  },
  {
    id: 'job12',
    title: {
      en: 'Compound Wall Brickwork & Sand Mixing',
      hi: 'बाउंड्री दीवार की चिनाई व मसाला बनाना',
      mr: 'कंपाउंड भिंतीचे दगड-वीट बांधकाम व सिमेंट माल बनवणे'
    },
    trade: 'mason',
    employerId: 'emp2',
    employerName: 'Rajesh Patil Hardware',
    locationName: 'Khalapur Industrial Zone',
    distanceKm: 1.8,
    payOffer: 850,
    payUnit: 'day',
    hoursText: '8:30 AM - 5:30 PM',
    startDate: 'Tomorrow',
    durationDays: 3,
    toolsNeeded: ['trowel', 'hammer'],
    paymentTerms: {
      en: 'Daily evening cash payment of ₹850 guaranteed',
      hi: 'प्रतिदिन शाम ₹850 नकद गारंटी',
      mr: 'दररोज संध्याकाळी रोख ₹850 ची खात्रीशीर मजुरी'
    },
    isFoodProvided: true,
    safetyStatus: 'safe',
    safetyNotes: {
      en: 'Reputed local hardware store owner. Safe worksite.',
      hi: 'विश्वसनीय व्यापारी। सुरक्षित कार्यस्थल।',
      mr: 'प्रतिष्ठित स्थानिक व्यापारी. कामाच्या ठिकाणी सुरक्षित वातावरण.'
    },
    status: 'open',
    statusLabel: 'Open'
  }
];

export const INITIAL_TEAMS = [
  {
    id: 'team1',
    name: 'Khopoli Fast Renovation Squad (खोपोली जलद दुरुस्ती संघ)',
    leaderId: 'w1',
    leaderName: 'Ramesh Shinde (Plumber)',
    rating: 4.9,
    jobsCompleted: 18,
    availability: 'available',
    compositeTrades: [
      { trade: 'plumber', count: 1, dailyRate: 700, workerName: 'Ramesh Shinde' },
      { trade: 'electrician', count: 1, dailyRate: 750, workerName: 'Santosh Gaikwad' },
      { trade: 'helper', count: 2, dailyRate: 500, workerName: 'Anand More & Pravin Bhoir' }
    ],
    totalTeamDailyRate: 2450,
    description: {
      en: 'Complete 4-person renovation crew: 1 Plumber + 1 Electrician + 2 Helpers for full house remodeling.',
      hi: '4 लोगों की संपूर्ण टीम: 1 प्लंबर + 1 इलेक्ट्रीशियन + 2 हेल्पर। घर के पूरे काम हेतु।',
      mr: '4 लोकांचा संपूर्ण संघ: 1 प्लंबर + 1 इलेक्ट्रिशियन + 2 हेल्पर. संपूर्ण घर दुरुस्तीसाठी योग्य.'
    }
  },
  {
    id: 'team2',
    name: 'Sahyadri Painting & Finishing Duo (सह्याद्री रंगकाम जोडी)',
    leaderId: 'w6',
    leaderName: 'Deepak Pawar (Painter)',
    rating: 4.8,
    jobsCompleted: 24,
    availability: 'available',
    compositeTrades: [
      { trade: 'painter', count: 1, dailyRate: 750, workerName: 'Deepak Pawar' },
      { trade: 'carpenter', count: 1, dailyRate: 750, workerName: 'Suresh Jadhav' }
    ],
    totalTeamDailyRate: 1500,
    description: {
      en: '2 experienced masters for door repairs, carpentry touch-up, and wall paint finishing.',
      hi: 'रंगाई और बढ़ई काम के लिए 2 कुशल कारीगरों की जोड़ी।',
      mr: 'सुतारकाम आणि दर्जेदार रंगकामासाठी 2 अनुभवी कारागिरांची जोडगोळी.'
    }
  },
  {
    id: 'team3',
    name: 'Karjat Masonry & Concrete Crew (कर्जत गवंडी संघ)',
    leaderId: 'w7',
    leaderName: 'Sanjay Shelke (Mason)',
    rating: 4.9,
    jobsCompleted: 31,
    availability: 'available',
    compositeTrades: [
      { trade: 'mason', count: 1, dailyRate: 850, workerName: 'Sanjay Shelke' },
      { trade: 'helper', count: 2, dailyRate: 500, workerName: 'Anand More & Pravin Bhoir' }
    ],
    totalTeamDailyRate: 1850,
    description: {
      en: '1 master mason and 2 dedicated helpers for fast brickwork, plastering, and flooring.',
      hi: '1 मुख्य मिस्त्री और 2 मेहनती हेल्पर। चिनाई और प्लास्टर के लिए।',
      mr: '1 मुख्य गवंडी आणि 2 मदतनीस. भिंत बांधकाम, प्लास्टर आणि फरशी कामासाठी.'
    }
  }
];

// SAMPLE WELFARE SCHEMES - FOR DEMONSTRATION ONLY
export const WELFARE_SCHEMES = [
  {
    id: 'bocw',
    category: 'construction',
    name: {
      en: 'Maharashtra BOCW Board (Building & Construction Workers)',
      hi: 'महाराष्ट्र भवन एवं अन्य संनिर्माण कर्मकार कल्याण मंडल (BOCW)',
      mr: 'महाराष्ट्र इमारत व इतर बांधकाम कामगार कल्याण मंडळ (BOCW)'
    },
    targetAudience: {
      en: 'Construction workers, masons, painters, plumbers, carpenters on building sites',
      hi: 'भवन निर्माण से जुड़े मजदूर, राजमिस्त्री, पेंटर, प्लंबर व बढ़ई',
      mr: 'इमारत बांधकामावरील कारागीर, गवंडी, पेंटर, प्लंबर व सुतार'
    },
    sampleBenefits: [
      {
        title: { en: 'Essential Tool Kit Grant', hi: 'औजार किट सहायता', mr: 'कामाची अवजारे खरेदी सहाय्य' },
        amount: '₹5,000 (Sample grant)',
        detail: {
          en: 'One-time financial assistance to buy essential trade safety tools',
          hi: 'काम के औजार व सुरक्षा उपकरण खरीदने हेतु एकमुश्त सहायता राशि',
          mr: 'स्वतःची अवजारे व सुरक्षा साधने खरेदी करण्यासाठी थेट बँक खात्यात मदत'
        }
      },
      {
        title: { en: 'Children Education Scholarship', hi: 'बच्चों की छात्रवृत्ति', mr: 'मुलांच्या शिक्षणासाठी शिष्यवृत्ती' },
        amount: '₹2,500 - ₹20,000 / year',
        detail: {
          en: 'School books and college fee assistance for registered workers children',
          hi: 'पंजीकृत कामगारों के बच्चों की स्कूल व कॉलेज फीस में सहायता',
          mr: 'नोंदणीकृत कामगारांच्या पाल्यांना शालेय पुस्तके व शिक्षणासाठी वार्षिक सहाय्य'
        }
      },
      {
        title: { en: 'Accidental Medical Coverage', hi: 'दुर्घटना चिकित्सा सहायता', mr: 'अपघात वैद्यकीय मदत' },
        amount: 'Up to ₹1,00,000',
        detail: {
          en: 'Coverage for medical expenses incurred during workplace injuries',
          hi: 'कार्यस्थल पर चोट लगने पर अस्पताल के खर्च की प्रतिपूर्ति',
          mr: 'कामाच्या ठिकाणी दुखापत झाल्यास वैद्यकीय उपचारांचा खर्च'
        }
      }
    ],
    documentsNeeded: [
      { en: 'Aadhaar Card (आधार कार्ड)', hi: 'आधार कार्ड', mr: 'आधार कार्ड' },
      { en: '90-Day Work Certificate from Contractor/Gram Panchayat', hi: '90 दिन काम का प्रमाण पत्र', mr: '90 दिवस कामाचे प्रमाणपत्र (ठेकेदार / ग्रामसेवक)' },
      { en: 'Bank Passbook copy with IFSC', hi: 'बैंक पासबुक की प्रति', mr: 'बँक पासबुक झेरॉक्स' },
      { en: '2 Passport size photos', hi: '2 पासपोर्ट फोटो', mr: '2 पासपोर्ट आकाराचे फोटो' }
    ],
    registrationCenter: {
      name: 'Common Service Centre (CSC) / Taluka Labour Office',
      location: 'Near Tahsildar Office, Khopoli / Karjat',
      helpline: '1800-180-1551 (Sample Helpline)'
    }
  },
  {
    id: 'eshram',
    category: 'all_informal',
    name: {
      en: 'e-Shram Universal Informal Worker Card',
      hi: 'ई-श्रम राष्ट्रीय असंगठित कामगार कार्ड',
      mr: 'ई-श्रम राष्ट्रीय असंघटित कामगार ओळखपत्र'
    },
    targetAudience: {
      en: 'All unorganised workers (daily wagers, helpers, sweepers, home cleaners, hawkers)',
      hi: 'सभी दिहाड़ी मजदूर, हेल्पर, सफाईकर्मी, फेरीवाले व घरेलू कामगार',
      mr: 'सर्व रोजंदारी मजूर, हेल्पर, सफाई कामगार, फेरीवाले व घरकामगार'
    },
    sampleBenefits: [
      {
        title: { en: 'PMSBY Accidental Insurance', hi: 'दुर्घटना बीमा सुरक्षा', mr: 'अपघात विमा संरक्षण' },
        amount: '₹2,00,000 (Death / Total Disability)',
        detail: {
          en: 'Financial security to family in case of fatal accident or permanent handicap',
          hi: 'गंभीर दुर्घटना की स्थिति में परिवार को आर्थिक संबल',
          mr: 'दुर्दैवी अपघात किंवा कायमस्वरूपी अपंगत्व आल्यास कुटुंबाला आर्थिक आधार'
        }
      },
      {
        title: { en: 'Universal 12-Digit Worker ID (UAN)', hi: 'राष्ट्रीय श्रमिक पहचान', mr: 'देशव्यापी कामगार ओळख क्रमांक' },
        amount: 'Valid across all states',
        detail: {
          en: 'One identity across India; directly links to central welfare disbursements',
          hi: 'पूरे भारत में मान्य पहचान; सीधे बैंक खाते में सहायता',
          mr: 'संपूर्ण भारतात एकाच क्रमांकावर ओळख; थेट बँक खात्यात शासकीय लाभ'
        }
      }
    ],
    documentsNeeded: [
      { en: 'Aadhaar Card linked to active mobile', hi: 'आधार कार्ड (मोबाइल लिंक)', mr: 'आधार कार्ड (मोबाईलशी जोडलेले)' },
      { en: 'Active Savings Bank Account Number', hi: 'सक्रिय बैंक बचत खाता', mr: 'चालू बँक खाते क्रमांक' },
      { en: 'Age between 16 and 59 years', hi: 'आयु 16 से 59 वर्ष के बीच', mr: 'वय 16 ते 59 वर्षे' }
    ],
    registrationCenter: {
      name: 'Aaple Sarkar Seva Kendra / CSC Center',
      location: 'Any nearby cyber cafe or CSC center',
      helpline: '14434 (Sample National Helpdesk)'
    }
  },
  {
    id: 'pmsym',
    category: 'pension',
    name: {
      en: 'PM Shram Yogi Maandhan Pension Scheme (PM-SYM)',
      hi: 'प्रधानमंत्री श्रम योगी मानधन पेंशन योजना',
      mr: 'पंतप्रधान श्रम योगी मानधन निवृत्तीवेतन योजना'
    },
    targetAudience: {
      en: 'Informal workers aged 18-40 earning under ₹15,000/month',
      hi: '18-40 वर्ष के श्रमिक जिनकी मासिक आय ₹15,000 से कम हो',
      mr: '18 ते 40 वर्षे वयाचे असंघटित कामगार ज्यांचे मासिक उत्पन्न ₹15,000 पेक्षा कमी आहे'
    },
    sampleBenefits: [
      {
        title: { en: 'Guaranteed Monthly Pension at 60', hi: '60 वर्ष की आयु पर मासिक पेंशन', mr: 'वयाच्या 60 नंतर खात्रीशीर मासिक पेन्शन' },
        amount: '₹3,000 / Month (Lifelong)',
        detail: {
          en: 'Equal 50% contribution by Central Govt. Modest monthly saving of ₹55-₹200 depending on joining age.',
          hi: 'सरकार द्वारा भी 50% अंशदान। वृद्धावस्था में सम्मानजनक मासिक सहारा।',
          mr: 'जेवढी रक्कम तुम्ही जमा कराल तेवढीच रक्कम केंद्र सरकार भरेल. म्हातारपणात आधार.'
        }
      }
    ],
    documentsNeeded: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' },
      { en: 'Savings Bank Account with Jan Dhan / Auto-debit', hi: 'बैंक पासबुक', mr: 'जनधन किंवा बचत बँक पासबुक' }
    ],
    registrationCenter: {
      name: 'LIC Branch or Nearest CSC Centre',
      location: 'Station Road, Khopoli / Panvel',
      helpline: '1800-267-6888 (Sample Helpdesk)'
    }
  },
  {
    id: 'ayushman',
    category: 'healthcare',
    name: {
      en: 'Ayushman Bharat PM-JAY Free Health Treatment',
      hi: 'आयुष्मान भारत मुफ्त अस्पताल चिकित्सा योजना',
      mr: 'आयुष्मान भारत मोफत रुग्णालय उपचार योजना'
    },
    targetAudience: {
      en: 'Low-income informal families listed in SECC or ration card database',
      hi: 'कम आय वाले श्रमिक परिवार व राशन कार्ड धारक',
      mr: 'कमी उत्पन्न असलेले कामगार कुटुंब व पिवळे/केशरी शिधापत्रिकाधारक'
    },
    sampleBenefits: [
      {
        title: { en: 'Free Hospitalization Treatment', hi: 'अस्पताल में कैशलेस इलाज', mr: 'हॉस्पिटलमध्ये कॅशलेस उपचार' },
        amount: 'Up to ₹5,00,000 / Family / Year',
        detail: {
          en: 'Covers surgery, medicine, diagnostic tests in empanelled govt and private hospitals',
          hi: 'शल्यक्रिया, दवाएं व जांच खर्च संबद्ध सरकारी व निजी अस्पतालों में पूरी तरह मुफ्त',
          mr: 'शस्त्रक्रिया, औषधे आणि चाचण्यांचा खर्च नामांकित रुग्णालयांमध्ये मोफत'
        }
      }
    ],
    documentsNeeded: [
      { en: 'Ration Card (शिधापत्रिका)', hi: 'राशन कार्ड', mr: 'राशन कार्ड' },
      { en: 'Aadhaar Card of all family members', hi: 'परिवार के सदस्यों का आधार', mr: 'सर्व कुटुंबियांचे आधार कार्ड' }
    ],
    registrationCenter: {
      name: 'Khopoli Municipal Hospital Ayushman Mitra Desk',
      location: 'Government Sub-district Hospital, Khopoli',
      helpline: '14555 (Sample Health Helpdesk)'
    }
  }
];

// TRI-LINGUAL UI DICTIONARY
export const DICTIONARY = {
  en: {
    appTitle: "Hawker's Help",
    tagline: "Work finds you. You don't have to wait.",
    nakaModeText: "At Khopoli Naka",
    workersActiveHere: "14 workers available here today",
    available: "Available",
    busy: "Busy",
    setAvailability: "My Availability",
    availableFromToday: "Free Today",
    availableFromTomorrow: "Free from Tomorrow",
    pickDate: "Pick Date",
    iWantWork: "I Want Work",
    iWantToHire: "I Want to Hire",
    loginWithPhone: "Login with Phone",
    enterPhoneNumber: "Enter 10-digit mobile number",
    sendOtp: "Get OTP (मोबाईलवर कोड मिळवा)",
    guestContinue: "Continue as Guest (अतिथी म्हणून पुढे जा)",
    verifyOtp: "Verify & Enter",
    otpSimulatedNote: "Demo mode: Tap 'Verify & Enter' or use 1234",
    navJobs: "Jobs",
    navMyTeam: "My Team",
    navRights: "Rights Hub",
    navProfile: "Profile",
    navEmployerJobs: "My Jobs",
    navFindWorkers: "Find Workers",
    filterAll: "All",
    filterToday: "Today",
    filterTomorrow: "Tomorrow",
    filterMatchesTools: "My Tools Match",
    looksSafe: "Looks Safe",
    beCareful: "Be Careful",
    termsAtGlance: "Job Terms at a Glance",
    employerTrustScore: "Employer Trust Profile",
    paidOnTime: "paid on time",
    verifiedEmployer: "Verified Employer",
    unverifiedEmployer: "Unverified Contractor",
    toolsNeeded: "Tools Required",
    toolsProvided: "Tools provided by employer",
    startNegotiation: "Wage Negotiation",
    workerAsk: "Worker Ask",
    employerOffer: "Employer Offer",
    nakaMedian: "Naka Usual Rate",
    splitDifference: "Split the Difference",
    dealMatched: "Terms Matched! Ready to Commit",
    acceptJob: "Accept This Job",
    offerCounter: "Send Counter Offer",
    startWork: "Start Work (Clock In)",
    endWork: "End Work (Clock Out)",
    confirmHours: "Confirm Hours & Pay",
    markAsPaid: "Mark as Paid",
    raiseDispute: "Raise a Grievance",
    rateExperience: "Rate Your Experience",
    speakReadAloud: "Listen Aloud",
    workPhotosTitle: "My Work Photos",
    totalHoursWorked: "Total Hours on Hawker's Help",
    baseWageTitle: "My Minimum Daily Ask",
    iHaveToolsTitle: "Tools I Own & Carry",
    shareOnWhatsApp: "Share Profile on WhatsApp",
    qrCodeText: "Scan to hire Ramesh directly",
    reportIssue: "Help / Report",
    postJobTitle: "Post a New Job",
    findWorkersTitle: "Available Workers at Nearby Nakas",
    sampleDataNote: "SAMPLE DATA: Strictly for demonstration. Verify with official authorities before actual use.",
    // Extended Keys
    onboardingTitle: "Select Language",
    onboardingSub: "Choose your preferred language for voice and text",
    roleTitle: "Choose Your Role",
    roleSub: "Are you seeking work or looking to hire skilled workers?",
    roleWorkerTitle: "I am a Worker (कारीगर)",
    roleWorkerDesc: "Plumbers, electricians, carpenters, painters, masons, sweepers & helpers looking for daily naka work.",
    roleEmployerTitle: "I am an Employer (मालक / ठेकेदार)",
    roleEmployerDesc: "Homeowners, contractors, builders, and shops needing reliable workers right away.",
    continueBtn: "Continue",
    backBtn: "Back",
    loginTitle: "Phone Verification",
    loginSub: "No password needed. Simple instant OTP code.",
    otpLabel: "4-Digit SMS Code",
    otpPlaceholder: "Enter 1234",
    resendOtp: "Resend Code",
    nearestNakaLabel: "Nearest Pickup Point (Naka)",
    refreshGps: "Refresh Location",
    openInMaps: "Directions in Maps",
    getDirections: "Get Directions",
    pickupFacilities: "Available Amenities",
    allCategories: "All Trades",
    plansTitle: "Employer & Contractor Hiring Plans",
    plansSubtitle: "Predictable, fair pricing to connect with verified chowk workers without intermediaries.",
    plansPilotBadge: "10 Free Trial Hires Available",
    bookCallBtn: "Choose Plan",
    retryBtn: "Try Again",
    noWorkersFound: "No workers found matching this filter at nearby nakas.",
    clearFilters: "Clear Filters",
    viewProfileBtn: "View Full Profile",
    directHireBtn: "Offer Job Directly",
    step1SelectCategory: "1. Select Trade",
    step2ChooseWorker: "2. Pick Worker",
    step3ReviewAndHire: "3. Direct Contact & Hire",
    navPlans: "Hiring Plans",
    locationPermissionExpl: "We use your location to calculate distance to the nearest roadside naka and compute travel convenience.",
    allowLocationBtn: "Enable Live Location",
    manualLocationPick: "Or select your nearby naka manually:",
    filterByTrade: "Filter by Trade",
    contactWorker: "Call Worker",
    hireTeam: "Hire Entire Crew",
    nakaDistance: "Distance from you",
    ratingReviews: "ratings & reviews",
    toolsCarryCount: "verified trade tools"
  },
  hi: {
    appTitle: "हॉकर्स हेल्प",
    tagline: "काम आपको खोजेगा। अब चौराहे पर खड़े होकर इंतज़ार नहीं।",
    nakaModeText: "खोपोली नाके पर सक्रिय",
    workersActiveHere: "आज यहाँ 14 कारीगर उपलब्ध हैं",
    available: "काम के लिए तैयार (उपलब्ध)",
    busy: "व्यस्त (काम में)",
    setAvailability: "मेरी उपलब्धता",
    availableFromToday: "आज से खाली",
    availableFromTomorrow: "कल से खाली",
    pickDate: "तारीख चुनें",
    iWantWork: "मुझे काम चाहिए (कारीगर)",
    iWantToHire: "मुझे काम कराना है (नियोक्ता)",
    loginWithPhone: "मोबाइल नंबर से प्रवेश करें",
    enterPhoneNumber: "10 अंकों का मोबाइल नंबर डालें",
    sendOtp: "ओटीपी कोड प्राप्त करें",
    guestContinue: "बिना लॉगिन आगे बढ़ें (गेस्ट)",
    verifyOtp: "पुष्टि करें और आगे बढ़ें",
    otpSimulatedNote: "डेमो: कोड 1234 डालें या सीधे बटन दबाएं",
    navJobs: "काम खोजें",
    navMyTeam: "मेरी टीम",
    navRights: "हक और योजनाएं",
    navProfile: "मेरी प्रोफाइल",
    navEmployerJobs: "मेरे काम",
    navFindWorkers: "कारीगर खोजें",
    filterAll: "सभी",
    filterToday: "आज का काम",
    filterTomorrow: "कल का काम",
    filterMatchesTools: "मेरे औजारों अनुसार",
    looksSafe: "सुरक्षित काम",
    beCareful: "सावधान रहें",
    termsAtGlance: "काम की शर्तें एक नज़र में",
    employerTrustScore: "मालिक का भरोसा स्कोर",
    paidOnTime: "समय पर पैसा दिया",
    verifiedEmployer: "सत्यापित मालिक",
    unverifiedEmployer: "गैर-सत्यापित ठेकेदार",
    toolsNeeded: "जरूरी औजार",
    toolsProvided: "औजार मालिक द्वारा दिए जाएंगे",
    startNegotiation: "मजदूरी तय करें (बातचीत)",
    workerAsk: "कारीगर की मांग",
    employerOffer: "मालिक की पेशकश",
    nakaMedian: "नाके का तय दर",
    splitDifference: "बीच का रास्ता चुनें (बराबर)",
    dealMatched: "बात पक्की! दोनों सहमत",
    acceptJob: "काम स्वीकार करें",
    offerCounter: "नया दर भेजें",
    startWork: "काम शुरू किया (हाजिरी)",
    endWork: "काम समाप्त हुआ (घंटे दर्ज)",
    confirmHours: "घंटे जांचें व भुगतान करें",
    markAsPaid: "पैसा मिल गया / भुगतान पूरा",
    raiseDispute: "शिकायत दर्ज करें",
    rateExperience: "अनुभव कैसा रहा? रेटिंग दें",
    speakReadAloud: "आवाज़ में सुनें",
    workPhotosTitle: "मेरे किए गए काम के फोटो",
    totalHoursWorked: "कुल काम के घंटे",
    baseWageTitle: "मेरी न्यूनतम दैनिक मजदूरी",
    iHaveToolsTitle: "मेरे पास मौजूद औजार",
    shareOnWhatsApp: "व्हाट्सएप पर शेयर करें",
    qrCodeText: "सीधे संपर्क के लिए क्यूआर स्कैन करें",
    reportIssue: "मदद / शिकायत",
    postJobTitle: "नया काम पोस्ट करें",
    findWorkersTitle: "आसपास के नाकों पर उपलब्ध कारीगर",
    sampleDataNote: "नमूना डेटा (SAMPLE DATA): केवल प्रदर्शन हेतु। आधिकारिक पुष्टि अवश्य करें।",
    // Extended Keys
    onboardingTitle: "भाषा चुनें",
    onboardingSub: "अपनी पसंदीदा भाषा का चयन करें",
    roleTitle: "अपनी भूमिका चुनें",
    roleSub: "क्या आप काम ढूंढ रहे हैं या कारीगर काम पर रखना चाहते हैं?",
    roleWorkerTitle: "मैं कारीगर / मजदूर हूँ",
    roleWorkerDesc: "प्लंबर, इलेक्ट्रीशियन, बढ़ई, पेंटर, मिस्त्री या हेल्पर जो दिहाड़ी काम चाहते हैं।",
    roleEmployerTitle: "मैं नियोक्ता / ठेकेदार हूँ",
    roleEmployerDesc: "घरमालिक, बिल्डर या ठेकेदार जिन्हें आज ही भरोसेमंद कारीगरों की जरूरत है।",
    continueBtn: "आगे बढ़ें",
    backBtn: "पीछे जाएं",
    loginTitle: "मोबाइल से लॉगिन",
    loginSub: "कोई पासवर्ड नहीं। केवल 4 अंकों का एसएमएस ओटीपी।",
    otpLabel: "4 अंकों का ओटीपी कोड",
    otpPlaceholder: "कोड 1234 डालें",
    resendOtp: "ओटीपी दोबारा भेजें",
    nearestNakaLabel: "सबसे नजदीकी लेबर नाका",
    refreshGps: "स्थान अपडेट करें",
    openInMaps: "गूगल मैप्स पर रास्ता देखें",
    getDirections: "दिशा निर्देश",
    pickupFacilities: "नाके पर उपलब्ध सुविधाएं",
    allCategories: "सभी ट्रेड",
    plansTitle: "ठेकेदार व नियोक्ता भर्ती योजनाएं",
    plansSubtitle: "नाके के कुशल कामगारों को बिना बिचौलियों के सीधे काम देने के लिए पारदर्शी प्लान।",
    plansPilotBadge: "10 ट्रायल हायरिंग मुफ्त",
    bookCallBtn: "प्लान चुनें",
    retryBtn: "फिर कोशिश करें",
    noWorkersFound: "इस ट्रेड के लिए आसपास कोई कारीगर उपलब्ध नहीं मिला।",
    clearFilters: "फ़िल्टर हटाएं",
    viewProfileBtn: "पूरी प्रोफाइल व काम देखें",
    directHireBtn: "सीधे काम ऑफर करें",
    step1SelectCategory: "1. काम का प्रकार चुनें",
    step2ChooseWorker: "2. कारीगर चुनें",
    step3ReviewAndHire: "3. जांचें और काम दें",
    navPlans: "भर्ती प्लान",
    locationPermissionExpl: "नजदीकी लेबर नाके की दूरी और यात्रा समय बताने के लिए हम आपकी लोकेशन का उपयोग करते हैं।",
    allowLocationBtn: "लाइव लोकेशन चालू करें",
    manualLocationPick: "या नजदीकी नाका स्वयं चुनें:",
    filterByTrade: "ट्रेड अनुसार चुनें",
    contactWorker: "कॉल करें",
    hireTeam: "पूरी टीम बुक करें",
    nakaDistance: "आपसे दूरी",
    ratingReviews: "रेटिंग व समीक्षाएं",
    toolsCarryCount: "सत्यापित औजार"
  },
  mr: {
    appTitle: "हॉकर्स हेल्प",
    tagline: "काम तुम्हाला शोधेल. आता नाक्यावर तिष्ठत उभे राहण्याची गरज नाही.",
    nakaModeText: "खोपोली नाक्यावर उपस्थित",
    workersActiveHere: "आज या नाक्यावर 14 कारागीर उपलब्ध आहेत",
    available: "कामासाठी उपलब्ध",
    busy: "सध्या व्यस्त",
    setAvailability: "माझी उपलब्धता",
    availableFromToday: "आजपासून मोकळा",
    availableFromTomorrow: "उद्यापासून मोकळा",
    pickDate: "तारीख निवडा",
    iWantWork: "मला काम हवे आहे (कामगार)",
    iWantToHire: "मला काम करून घ्यायचे आहे (मालक)",
    loginWithPhone: "मोबाईल नंबरने लॉगिन करा",
    enterPhoneNumber: "10 अंकी मोबाईल नंबर टाका",
    sendOtp: "ओटीपी कोड मिळवा",
    guestContinue: "लॉगिन न करता पुढे जा (पाहुणे)",
    verifyOtp: "खात्री करा आणि सुरू करा",
    otpSimulatedNote: "डेमो: कोड 1234 टाका किंवा थेट बटण दाबा",
    navJobs: "कामे",
    navMyTeam: "माझा संघ",
    navRights: "हक्क व योजना",
    navProfile: "माझे प्रोफाईल",
    navEmployerJobs: "दिलेली कामे",
    navFindWorkers: "कारागीर शोधा",
    filterAll: "सर्व कामे",
    filterToday: "आजची कामे",
    filterTomorrow: "उद्याची कामे",
    filterMatchesTools: "माझ्या अवजारांनुसार",
    looksSafe: "सुरक्षित काम",
    beCareful: "सावध राहा",
    termsAtGlance: "कामाच्या अटी एका नजरेत",
    employerTrustScore: "मालकाचा विश्वासू रेकॉर्ड",
    paidOnTime: "वेळेवर पैसे दिले",
    verifiedEmployer: "सत्यापित मालक",
    unverifiedEmployer: "अपुष्ट ठेकेदार",
    toolsNeeded: "लागणारी अवजारे",
    toolsProvided: "अवजारे मालक देणार",
    startNegotiation: "मजुरी दर निश्चिती (बोलणी)",
    workerAsk: "कामगाराची मागणी",
    employerOffer: "मालकाचा प्रस्ताव",
    nakaMedian: "नाक्याचा सरासरी दर",
    splitDifference: "मध्यम मार्ग काढा (दोन्ही बाजू)",
    dealMatched: "दर निश्चित झाला! काम पक्के",
    acceptJob: "हे काम स्वीकारा",
    offerCounter: "नवीन दर सुचवा",
    startWork: "काम सुरू केले (हजेरी)",
    endWork: "काम संपले (वेळ नोंदणी)",
    confirmHours: "कामाची वेळ तपासा व पैसे द्या",
    markAsPaid: "मजुरी मिळाली / जमा झाली",
    raiseDispute: "तक्रार नोंदवा",
    rateExperience: "काम कसे वाटले? गुण द्या",
    speakReadAloud: "आवाजात ऐका",
    workPhotosTitle: "माझ्या प्रत्यक्ष कामाचे फोटो",
    totalHoursWorked: "हॉकर्स हेल्पवर पूर्ण केलेले तास",
    baseWageTitle: "माझा किमान रोज (दर)",
    iHaveToolsTitle: "माझ्याकडे असलेली अवजारे",
    shareOnWhatsApp: "व्हॉट्सॲपवर प्रोफाईल पाठवा",
    qrCodeText: "थेट कामासाठी क्यूआर कोड स्कॅन करा",
    reportIssue: "मदत / तक्रार",
    postJobTitle: "नवीन काम द्या",
    findWorkersTitle: "जवळच्या नाक्यावरील उपलब्ध कारागीर",
    sampleDataNote: "नमुना माहिती (SAMPLE DATA): केवळ प्रात्यक्षिकासाठी. प्रत्यक्ष वापरापूर्वी अधिकृत पोर्टलवरून खात्री करा.",
    // Extended Keys
    onboardingTitle: "भाषा निवडा",
    onboardingSub: "वापरण्यासाठी तुमची सोयीची भाषा निवडा",
    roleTitle: "तुमची भूमिका निवडा",
    roleSub: "तुम्हाला काम हवे आहे की कामासाठी कारागीर हवे आहेत?",
    roleWorkerTitle: "मी कामगार / कारागीर आहे",
    roleWorkerDesc: "प्लंबर, इलेक्ट्रिशियन, सुतार, पेंटर, गवंडी किंवा हेल्पर जे नाक्यावर काम शोधतात.",
    roleEmployerTitle: "मी मालक / कंत्राटदार आहे",
    roleEmployerDesc: "घरमालक, बिल्डर किंवा व्यावसायिक ज्यांना आजच अनुभवी व विश्वासू कारागीर हवे आहेत.",
    continueBtn: "पुढे जा",
    backBtn: "मागे जा",
    loginTitle: "मोबाईल नंबरने पडताळणी",
    loginSub: "कोणताही पासवर्ड नको. फक्त 4 अंकी एसएमएस कोड.",
    otpLabel: "4 अंकी ओटीपी कोड",
    otpPlaceholder: "कोड 1234 टाका",
    resendOtp: "ओटीपी पुन्हा पाठवा",
    nearestNakaLabel: "सर्वात जवळचा कामगार नाका",
    refreshGps: "स्थान अपडेट करा",
    openInMaps: "गुगल मॅप्सवर रस्ता पहा",
    getDirections: "दिशानिर्देश",
    pickupFacilities: "नाक्यावरील सोयीसुविधा",
    allCategories: "सर्व कामे",
    plansTitle: "कंत्राटदार व मालकांसाठी योजना",
    plansSubtitle: "नाक्यावरील कुशल कारागिरांशी थेट जोडणीसाठी सुलभ व वाजवी दर योजना.",
    plansPilotBadge: "10 मोफत ट्रायल नेमणुका उपलब्ध",
    bookCallBtn: "योजना निवडा",
    retryBtn: "पुन्हा प्रयत्न करा",
    noWorkersFound: "या व्यवसायासाठी सध्या जवळ कारागीर उपलब्ध नाहीत.",
    clearFilters: "फिल्टर काढा",
    viewProfileBtn: "संपूर्ण प्रोफाईल व काम पहा",
    directHireBtn: "थेट कामाचा प्रस्ताव पाठवा",
    step1SelectCategory: "1. कामाचा प्रकार निवडा",
    step2ChooseWorker: "2. कारागीर निवडा",
    step3ReviewAndHire: "3. खात्री करा व काम द्या",
    navPlans: "योजना",
    locationPermissionExpl: "जवळचा कामगार नाका शोधण्यासाठी व प्रवासाचे अंतर समजण्यासाठी आम्ही आपले स्थान वापरतो.",
    allowLocationBtn: "लाइव्ह स्थान चालू करा",
    manualLocationPick: "किंवा जवळचा नाका स्वतः निवडा:",
    filterByTrade: "व्यवसायानुसार निवडा",
    contactWorker: "कॉल करा",
    hireTeam: "संपूर्ण संघ घ्या",
    nakaDistance: "तुमच्यापासून अंतर",
    ratingReviews: "रेटिंग व अभिप्राय",
    toolsCarryCount: "स्वतःची अवजारे"
  }
};

