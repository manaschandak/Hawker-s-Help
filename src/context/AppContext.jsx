import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_JOBS,
  INITIAL_WORKERS,
  INITIAL_EMPLOYERS,
  INITIAL_TEAMS,
  WELFARE_SCHEMES,
  AREA_BENCHMARKS,
  DICTIONARY,
  COMMON_TOOLS,
  SAMPLE_DATA_DISCLAIMER
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language state: 'mr' (default for Maharashtra Naka), 'hi', 'en' with persistence
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('hh_lang') || 'mr';
    } catch {
      return 'mr';
    }
  });

  const setLanguage = useCallback((newLang) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('hh_lang', newLang);
    } catch {
      // ignore
    }
  }, []);

  // 2. Active Role: 'worker' | 'employer' with persistence
  const [role, setRoleState] = useState(() => {
    try {
      return localStorage.getItem('hh_role') || 'worker';
    } catch {
      return 'worker';
    }
  });

  const setRole = useCallback((newRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem('hh_role', newRole);
    } catch {
      // ignore
    }
  }, []);

  // 3. User & Auth state with persistence
  const [auth, setAuthState] = useState(() => {
    try {
      const saved = localStorage.getItem('hh_auth');
      return saved ? JSON.parse(saved) : {
        isLoggedIn: true, // Default to demo-ready state
        isGuest: false,
        phone: '9822188921',
        name: 'Ramesh Shinde'
      };
    } catch {
      return {
        isLoggedIn: true,
        isGuest: false,
        phone: '9822188921',
        name: 'Ramesh Shinde'
      };
    }
  });

  const setAuth = useCallback((newAuth) => {
    setAuthState(newAuth);
    try {
      localStorage.setItem('hh_auth', JSON.stringify(newAuth));
    } catch {
      // ignore
    }
  }, []);

  const loginUser = useCallback((phone, chosenRole) => {
    const updatedRole = chosenRole || role;
    setRole(updatedRole);
    const updatedAuth = {
      isLoggedIn: true,
      isGuest: false,
      phone: phone || '9822188921',
      name: updatedRole === 'worker' ? 'Ramesh Shinde' : 'Sunita Joshi'
    };
    setAuth(updatedAuth);
  }, [role, setRole, setAuth]);

  const loginGuest = useCallback((chosenRole) => {
    const updatedRole = chosenRole || role;
    setRole(updatedRole);
    const updatedAuth = {
      isLoggedIn: true,
      isGuest: true,
      phone: '',
      name: updatedRole === 'worker' ? 'Guest Worker' : 'Guest Employer'
    };
    setAuth(updatedAuth);
  }, [role, setRole, setAuth]);

  const logout = useCallback(() => {
    const updatedAuth = {
      isLoggedIn: false,
      isGuest: false,
      phone: '',
      name: ''
    };
    setAuth(updatedAuth);
  }, [setAuth]);

  // 4. Workers database in state & Current Worker Profile (Ramesh Shinde)
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [workerProfile, setWorkerProfile] = useState(INITIAL_WORKERS[0]);

  // 5. Jobs database in state
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  // 6. Teams database in state
  const [teams, setTeams] = useState(INITIAL_TEAMS);

  // 7. Employers database in state
  const [employers, setEmployers] = useState(INITIAL_EMPLOYERS);

  // 8. Active active/negotiating job state
  const [negotiations, setNegotiations] = useState({});

  // 9. Time tracking logs: { [jobId]: { clockedInAt: Date, hoursWorked: number } }
  const [timeLogs, setTimeLogs] = useState({});

  // 10. Grievance & Reports list
  const [reports, setReports] = useState([
    {
      id: 'REP-7701',
      jobId: 'job10',
      reason: "Asked for upfront deposit of ₹250",
      status: "Under Review at District Legal Aid",
      date: "14 Oct 2026",
      caseId: "#HH-MAH-2026-7701"
    }
  ]);

  // 11. Interactive Toast / Banner message
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Tri-lingual translation helper
  const t = useCallback((key) => {
    const dict = DICTIONARY[language] || DICTIONARY.en;
    return dict[key] || DICTIONARY.en[key] || key;
  }, [language]);

  // TTS Voice Reader with silent fallback (Marathi -> Hindi -> English -> silent)
  const speakText = useCallback((text) => {
    if (!('speechSynthesis' in window)) {
      return; // Silent fallback
    }

    try {
      window.speechSynthesis.cancel(); // Stop any active utterance

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      // Desired lang code
      let targetLang = 'mr-IN';
      if (language === 'hi') targetLang = 'hi-IN';
      if (language === 'en') targetLang = 'en-IN';

      // Find best match or fallback silently to Hindi/English
      const matchedVoice = voices.find(v => v.lang.startsWith(targetLang))
        || voices.find(v => v.lang.startsWith('hi'))
        || voices.find(v => v.lang.startsWith('en'))
        || null;

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
      utterance.lang = matchedVoice ? matchedVoice.lang : (language === 'mr' ? 'hi-IN' : targetLang);
      utterance.rate = 0.95; // Slightly slower for clarity in noisy nakas
      utterance.pitch = 1.0;

      utterance.onerror = () => {
        // Fall back completely silently without disturbing user
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful silent fallback
    }
  }, [language]);

  // Worker availability toggle
  const toggleAvailability = () => {
    setWorkerProfile(prev => {
      const nextStatus = prev.availableStatus === 'available' ? 'busy' : 'available';
      const msg = nextStatus === 'available'
        ? (language === 'mr' ? 'तुम्ही आता कामासाठी उपलब्ध आहात' : 'You are now marked Available')
        : (language === 'mr' ? 'तुम्ही सध्या व्यस्त नोंदवले आहात' : 'You are marked Busy');
      showToast(msg, 'success');
      return { ...prev, availableStatus: nextStatus };
    });
  };

  // Set free from date
  const setFreeFrom = (dateString) => {
    setWorkerProfile(prev => ({ ...prev, freeFrom: dateString }));
    showToast(language === 'mr' ? `उपलब्धता अपडेट केली: ${dateString}` : `Availability updated: ${dateString}`);
  };

  // Toggle owned tool
  const toggleTool = (toolId) => {
    setWorkerProfile(prev => {
      const exists = prev.ownedTools.includes(toolId);
      const nextTools = exists
        ? prev.ownedTools.filter(id => id !== toolId)
        : [...prev.ownedTools, toolId];
      return { ...prev, ownedTools: nextTools };
    });
  };

  // Update base minimum ask
  const updateBaseWage = (delta) => {
    setWorkerProfile(prev => {
      const newWage = Math.max(300, Math.min(2500, prev.baseWageAsk + delta));
      return { ...prev, baseWageAsk: newWage };
    });
  };

  // Wage negotiation logic
  const updateNegotiation = (jobId, { currentOffer, currentAsk, lastActionBy, historyItem }) => {
    setNegotiations(prev => {
      const existing = prev[jobId] || {
        history: [],
        currentOffer: null,
        currentAsk: null
      };

      return {
        ...prev,
        [jobId]: {
          ...existing,
          currentOffer: currentOffer !== undefined ? currentOffer : existing.currentOffer,
          currentAsk: currentAsk !== undefined ? currentAsk : existing.currentAsk,
          lastActionBy: lastActionBy || existing.lastActionBy,
          history: historyItem ? [...existing.history, historyItem] : existing.history
        }
      };
    });
  };

  // Accept a job
  const acceptJob = (jobId, agreedPay) => {
    const targetJob = jobs.find(j => j.id === jobId);
    const jobDate = targetJob?.startDate || 'Today';
    const jobTitle = targetJob?.title?.[language] || targetJob?.title?.en || targetJob?.title || '';

    setJobs(prevJobs =>
      prevJobs.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: 'accepted',
            statusLabel: 'Accepted',
            agreedPay: agreedPay || job.payOffer
          };
        }
        return job;
      })
    );

    // If job is for Tomorrow, worker remains FREE (AVAILABLE) today!
    if (jobDate === 'Tomorrow') {
      setWorkerProfile(prev => ({
        ...prev,
        availableStatus: 'available',
        freeFrom: 'Today',
        bookedTomorrow: {
          jobId,
          title: jobTitle,
          status: 'booked'
        }
      }));

      showToast(
        language === 'mr'
          ? 'उद्याचे काम बुक झाले! आज तुम्ही इतर कामांसाठी मोकळे (Available) आहात.'
          : 'Tomorrow’s job confirmed! You remain Free & Available for work today.',
        'success'
      );
    } else {
      // Job is for Today: Worker is busy today
      setWorkerProfile(prev => ({
        ...prev,
        availableStatus: 'busy',
        freeFrom: 'After Job Completion',
        bookedToday: {
          jobId,
          title: jobTitle,
          status: 'booked'
        }
      }));

      showToast(
        language === 'mr'
          ? `आजचे काम पक्के झाले! ₹${agreedPay || ''} मजुरी मान्य. तुमची आजची स्थिती "कामावर/व्यस्त" झाली.`
          : `Today’s job accepted at ₹${agreedPay || ''}! Status updated to Busy for today.`,
        'success'
      );
    }
  };

  // Clock In / Start Work
  const clockIn = (jobId) => {
    const now = new Date();
    setTimeLogs(prev => ({
      ...prev,
      [jobId]: {
        clockedInAt: now,
        status: 'working'
      }
    }));

    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, status: 'in_progress', statusLabel: 'In Progress' } : j))
    );

    showToast(
      language === 'mr'
        ? 'काम सुरू झाले! हजेरी वेळेची नोंद झाली.'
        : 'Work started! Clock-in recorded.',
      'info'
    );
  };

  // Clock Out / End Work
  const clockOut = (jobId, hours = 8) => {
    setTimeLogs(prev => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        clockedOutAt: new Date(),
        hoursWorked: hours,
        status: 'awaiting_payment'
      }
    }));

    setJobs(prev =>
      prev.map(j =>
        j.id === jobId ? { ...j, status: 'completed_pending_payment', statusLabel: 'Awaiting Payment' } : j
      )
    );

    // Offer one-tap availability reset
    showToast(
      language === 'mr'
        ? 'काम पूर्ण झाले! मालकाला हिशोब पाठवला आहे.'
        : 'Job ended! Shift summary sent to employer for payment.',
      'success'
    );
  };

  // Employer confirms hours & marks paid
  const confirmHoursAndPay = (jobId) => {
    setJobs(prev =>
      prev.map(j =>
        j.id === jobId ? { ...j, status: 'paid', statusLabel: 'Paid & Completed' } : j
      )
    );

    // Update worker profile total hours worked
    setWorkerProfile(prev => ({
      ...prev,
      hoursWorkedTotal: prev.hoursWorkedTotal + 8,
      availableStatus: 'available',
      freeFrom: 'Today'
    }));

    showToast(
      language === 'mr'
        ? 'हिशोब मंजूर झाला! मजुरी जमा झाली.'
        : 'Hours confirmed! Payment marked as completed.',
      'success'
    );
  };

  // Submit mutual review
  const submitReview = (jobId, { rating, tags, comment, role: reviewerRole }) => {
    setJobs(prev =>
      prev.map(j =>
        j.id === jobId ? { ...j, status: 'rated', statusLabel: 'Rated' } : j
      )
    );

    showToast(
      language === 'mr'
        ? 'तुमचे मत नोंदवले गेले! धन्यवाद.'
        : 'Review submitted! Thank you.',
      'success'
    );
  };

  // Employer posts a job
  const postNewJob = (newJobData) => {
    const id = `job_${Date.now()}`;
    const newJob = {
      id,
      title: {
        en: newJobData.titleEn || `${newJobData.trade} Job in ${newJobData.location}`,
        hi: newJobData.titleHi || `${newJobData.trade} कार्य - ${newJobData.location}`,
        mr: newJobData.titleMr || `${newJobData.trade} काम - ${newJobData.location}`
      },
      trade: newJobData.trade,
      employerId: 'emp_current',
      employerName: 'Current Employer',
      locationName: newJobData.location || 'Khopoli',
      distanceKm: 1.5,
      payOffer: Number(newJobData.payOffer) || 700,
      payUnit: 'day',
      hoursText: newJobData.hoursText || '9:00 AM - 5:00 PM',
      startDate: newJobData.startDate || 'Today',
      durationDays: Number(newJobData.durationDays) || 1,
      toolsNeeded: newJobData.toolsNeeded || [],
      paymentTerms: {
        en: newJobData.paymentTermsEn || 'Instant UPI/Cash upon daily inspection',
        hi: 'काम पूरा होते ही नकद या यूपीआई',
        mr: 'काम पूर्ण होताच त्वरित रोख किंवा UPI द्वारे पेमेंट'
      },
      isFoodProvided: !!newJobData.isFoodProvided,
      safetyStatus: 'safe',
      safetyNotes: {
        en: 'Direct homeowner listing. Payment guaranteed.',
        hi: 'सीधा घरमालिक। भुगतान सुरक्षित।',
        mr: 'थेट घरमालकाकडून काम. मजुरीची खात्री.'
      },
      status: 'open',
      statusLabel: 'Open'
    };

    setJobs(prev => [newJob, ...prev]);
    showToast(
      language === 'mr'
        ? 'नवीन काम यशस्वीरित्या पोस्ट केले!'
        : 'Job successfully posted to nearby nakas!',
      'success'
    );
    return id;
  };

  // Submit grievance / dispute
  const submitGrievance = (grievanceData) => {
    const caseId = `#HH-MAH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport = {
      id: `rep_${Date.now()}`,
      caseId,
      jobId: grievanceData.jobId || 'direct',
      reason: grievanceData.reason,
      voiceNoteRecorded: !!grievanceData.hasVoiceNote,
      status: 'Case Registered - Naka Help Cell Notified',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setReports(prev => [newReport, ...prev]);
    showToast(
      language === 'mr'
        ? `तक्रार नोंदवली: केस क्र. ${caseId}`
        : `Grievance registered: Case ID ${caseId}`,
      'danger'
    );
    return caseId;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        role,
        setRole,
        auth,
        setAuth,
        loginUser,
        loginGuest,
        logout,
        workers,
        setWorkers,
        INITIAL_WORKERS,
        INITIAL_TEAMS,
        workerProfile,
        setWorkerProfile,
        jobs,
        setJobs,
        teams,
        employers,
        negotiations,
        updateNegotiation,
        acceptJob,
        clockIn,
        clockOut,
        confirmHoursAndPay,
        submitReview,
        postNewJob,
        submitGrievance,
        reports,
        toggleAvailability,
        setFreeFrom,
        toggleTool,
        updateBaseWage,
        t,
        speakText,
        COMMON_TOOLS,
        AREA_BENCHMARKS,
        WELFARE_SCHEMES,
        SAMPLE_DATA_DISCLAIMER,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
