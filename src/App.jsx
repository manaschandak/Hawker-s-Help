import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation as useRouterLocation, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { useLocation } from './hooks/useLocation';
import CardNav from './components/CardNav';
import BottomNav from './components/BottomNav';
import LocationModal from './components/LocationModal';
import ScenarioPresets from './components/ScenarioPresets';
import HelpFloatingButton from './components/HelpFloatingButton';
import PhoneMockupFrame from './components/PhoneMockupFrame';

// Pages
import WorkerHome from './pages/WorkerHome';
import JobDetail from './pages/JobDetail';
import WorkerProfile from './pages/WorkerProfile';
import EmployerJobs from './pages/EmployerJobs';
import FindWorkers from './pages/FindWorkers';
import Plans from './pages/Plans';
import RightsHub from './pages/RightsHub';
import MyTeam from './pages/MyTeam';
import MyWorkHours from './pages/MyWorkHours';
import PostJobModal from './pages/PostJobModal';
import ReportFlow from './pages/ReportFlow';

// Onboarding Pages
import LanguageSelect from './pages/onboarding/LanguageSelect';
import RoleSelect from './pages/onboarding/RoleSelect';
import Login from './pages/onboarding/Login';

export default function App() {
  const { role, setRole, jobs, toast, showToast, language } = useApp();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const locationState = useLocation();

  // Mobile Phone Mockup View Option state (Persisted in localStorage)
  const [isMobileView, setIsMobileView] = useState(() => {
    const saved = localStorage.getItem('naka_mobile_frame_view');
    if (saved !== null) return saved === 'true';
    return true; // Default to mobile phone interface view on desktop
  });

  useEffect(() => {
    localStorage.setItem('naka_mobile_frame_view', isMobileView);
  }, [isMobileView]);

  // Selected job for detail view
  const [selectedJob, setSelectedJob] = useState(null);

  // Modals state
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isReportFlowOpen, setIsReportFlowOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [reportTargetJobId, setReportTargetJobId] = useState(null);

  // Check if current route is an onboarding route
  const isOnboardingRoute = routerLocation.pathname.startsWith('/onboarding');

  // Derive active bottom nav tab based on path
  const getActiveTab = () => {
    const path = routerLocation.pathname;
    if (path.includes('/workers')) return 'find_workers';
    if (path.includes('/employer/jobs')) return 'employer_jobs';
    if (path.includes('/work-hours')) return 'work_hours';
    if (path.includes('/team')) return 'team';
    if (path.includes('/rights')) return 'rights';
    if (path.includes('/profile')) return 'profile';
    return 'jobs';
  };

  const handleBottomNavClick = (tab) => {
    setSelectedJob(null);
    if (tab === 'jobs') navigate('/jobs');
    else if (tab === 'work_hours') navigate('/work-hours');
    else if (tab === 'team') navigate('/team');
    else if (tab === 'rights') navigate('/rights');
    else if (tab === 'profile') navigate('/profile');
    else if (tab === 'employer_jobs') navigate('/employer/jobs');
    else if (tab === 'find_workers') navigate('/workers');
  };

  const handleTriggerReport = (jobId = null) => {
    setReportTargetJobId(jobId);
    setIsReportFlowOpen(true);
  };

  // 1-Click Hackathon Evaluator Presets
  const handleSelectScenario = (scenarioId) => {
    if (scenarioId === 'negotiation') {
      setRole('worker');
      const cleanJob = jobs.find(j => j.id === 'job1') || jobs[0];
      setSelectedJob(cleanJob);
      navigate('/jobs');
      showToast(
        language === 'mr'
          ? 'प्रसंग 1: सुनिता जोशी यांच्यासोबत मजुरी बोलणी'
          : 'Scenario 1 Loaded: Wage Negotiation with Sunita',
        'info'
      );
    } else if (scenarioId === 'scam_alert') {
      setRole('worker');
      const suspiciousJob = jobs.find(j => j.id === 'job10') || jobs[9];
      setSelectedJob(suspiciousJob);
      navigate('/jobs');
      showToast(
        language === 'mr'
          ? 'प्रसंग 2: संशयास्पद काम व सुरक्षा सूचना (डिपॉझिट घोटाळा)'
          : 'Scenario 2 Loaded: Flagged Scam Job with Caution Alert',
        'danger'
      );
    } else if (scenarioId === 'clock_in_pay') {
      setRole('employer');
      setSelectedJob(null);
      navigate('/employer/jobs');
      showToast(
        language === 'mr'
          ? 'प्रसंग 3: मालक डॅशबोर्ड व हिशोब मंजूरी'
          : 'Scenario 3 Loaded: Employer Hours Confirmation & Rating',
        'info'
      );
    } else if (scenarioId === 'welfare_checker') {
      setRole('worker');
      setSelectedJob(null);
      navigate('/rights');
      showToast(
        language === 'mr'
          ? 'प्रसंग 4: सरकारी योजना पात्रता तपासणी'
          : 'Scenario 4 Loaded: Welfare Schemes & 3-Question Checker',
        'info'
      );
    }
  };

  return (
    <PhoneMockupFrame isMobileView={isMobileView} setIsMobileView={setIsMobileView}>
      <div className="min-h-full bg-[#FAF8F5] text-slate-900 font-sans flex flex-col selection:bg-amber-200 selection:text-amber-950 relative w-full">
        
        {/* Floating Toast Notification */}
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full px-4 animate-slide-down pointer-events-none">
            <div
              className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between text-xs font-black border text-white pointer-events-auto ${
                toast.type === 'danger'
                  ? 'bg-red-900 border-red-700'
                  : toast.type === 'success'
                  ? 'bg-emerald-900 border-emerald-700'
                  : 'bg-slate-900 border-slate-700'
              }`}
            >
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* 1-Click Hackathon Judge Evaluator Toolbar (Always Accessible) */}
        <ScenarioPresets
          onSelectScenario={handleSelectScenario}
          isMobileView={isMobileView}
          setIsMobileView={setIsMobileView}
        />

        {/* Top GSAP-Powered Expandable CardNav (Hidden only on clean onboarding routes) */}
        {!isOnboardingRoute && (
          <header className="sticky top-0 z-40">
            <CardNav
              locationName={locationState.nearestPickup ? (locationState.nearestPickup.name[language] || locationState.nearestPickup.name.en) : locationState.areaName}
              nearestDistance={locationState.nearestPickup ? `${locationState.nearestPickup.distanceKm} km` : '0.9 km'}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onOpenPostJob={() => setIsPostJobModalOpen(true)}
            />
          </header>
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full overflow-x-hidden">
          <Routes>
            {/* Default Route */}
            <Route
              path="/"
              element={
                <Navigate
                  to={role === 'employer' ? '/employer/jobs' : '/jobs'}
                  replace
                />
              }
            />

            {/* Onboarding Routes */}
            <Route path="/onboarding/language" element={<LanguageSelect />} />
            <Route path="/onboarding/role" element={<RoleSelect />} />
            <Route path="/onboarding/login" element={<Login />} />

            {/* Worker Home / Feed or Job Detail */}
            <Route
              path="/jobs"
              element={
                selectedJob ? (
                  <JobDetail
                    job={selectedJob}
                    onBack={() => setSelectedJob(null)}
                    onOpenReport={(jobId) => handleTriggerReport(jobId)}
                  />
                ) : (
                  <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-4">
                    <WorkerHome
                      onSelectJob={(job) => {
                        setSelectedJob(job);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>
                )
              }
            />

            {/* My Work & Hours (New Dedicated Screen) */}
            <Route path="/work-hours" element={<MyWorkHours />} />

            {/* Find Workers (Employer Screen) */}
            <Route
              path="/workers"
              element={
                <FindWorkers
                  onOfferJob={() => {
                    navigate('/employer/jobs');
                  }}
                />
              }
            />

            {/* Employer Jobs Tracker */}
            <Route
              path="/employer/jobs"
              element={
                <EmployerJobs
                  onOpenPostJob={() => setIsPostJobModalOpen(true)}
                  onGoToFindWorkers={() => navigate('/workers')}
                />
              }
            />

            {/* Plans & Pricing Section */}
            <Route path="/plans" element={<Plans />} />

            {/* My Team */}
            <Route path="/team" element={<MyTeam />} />

            {/* Rights Hub */}
            <Route
              path="/rights"
              element={
                <RightsHub
                  onOpenReport={() => handleTriggerReport(null)}
                />
              }
            />

            {/* Worker Profile */}
            <Route path="/profile" element={<WorkerProfile />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/jobs" replace />} />
          </Routes>
        </main>

        {/* Sticky Bottom Navigation */}
        {!isOnboardingRoute && (
          <div className="sticky bottom-0 z-30 w-full">
            <BottomNav
              activeTab={getActiveTab()}
              setActiveTab={handleBottomNavClick}
              onOpenPostJob={() => setIsPostJobModalOpen(true)}
            />
          </div>
        )}

        {/* Floating Help / Grievance Button for Worker */}
        {!isOnboardingRoute && role === 'worker' && (
          <HelpFloatingButton
            onOpenReport={() => handleTriggerReport(null)}
            onOpenRights={() => navigate('/rights')}
          />
        )}

        {/* Location Modal */}
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          locationState={locationState}
        />

        {/* Employer Post Job Modal */}
        <PostJobModal
          isOpen={isPostJobModalOpen}
          onClose={() => setIsPostJobModalOpen(false)}
        />

        {/* Grievance Report Modal */}
        <ReportFlow
          isOpen={isReportFlowOpen}
          onClose={() => setIsReportFlowOpen(false)}
          defaultJobId={reportTargetJobId}
        />

      </div>
    </PhoneMockupFrame>
  );
}
