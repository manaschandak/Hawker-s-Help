# Hawker's Help (हॉकर्स हेल्प / फेरीवाला मदत)
> *"Work finds you. You don't have to wait."*
> **Theme**: Inclusive Design, Employment, Digital Empowerment
> **Target Audience**: Daily-wage hawkers & naka workers (plumbers, carpenters, electricians, painters, sweepers, helpers, masons) across Indian labour chowks.

---

## 1. Quick Start & Setup

### Prerequisites
- Node.js (v18+)
- Package manager (`pnpm` or `npm`)

### Installation & Run
```bash
# Navigate to the project directory
cd hawkers-help

# Install dependencies (React 18, Vite, Tailwind CSS, Lucide Icons)
pnpm install # or npm install

# Start development server
pnpm dev # or npm run dev
# The application will launch at http://localhost:5173/

# Create production build
pnpm build # or npm run build
```

---

## 2. Problem Statement & Context

Across Indian cities and semi-urban clusters (such as Khopoli, Khalapur, Panvel, and Karjat in Maharashtra), thousands of skilled workers gather at roadside labour chowks (*nakas*) every morning.
- **The Reality**: Workers wait for hours in extreme sun and rain with no shelter. By evening, over 60% may return home without work.
- **Vulnerabilities**: Wage undercutting, contractors who disappear without paying, lack of resumes or digital credentials despite 15+ years of trade experience, and zero awareness of state welfare registrations (e.g. BOCW, e-Shram).
- **The Core Solution**: Hawker's Help connects workers to local jobs, allows transparent wage negotiation before committing, verifies employer trust, showcases trade skills through photos and verified hours, and enables mutual protection—**without forcing workers to abandon their physical naka community.**

---

## 3. Design Decisions Tied to Personas

### Persona A: Ramesh (38, Plumber at Khopoli Naka)
- **Device & Environment**: Budget Android phone with cracked screen, used under harsh direct sunlight with patchy 4G data.
- **Literacy & Usability**: Fluent in Marathi and Hindi; minimal English reading ability; types very slowly with one hand.
- **Design Decisions Made for Ramesh**:
  1. **Zero Typing Requirement**: All primary choices use giant icon cards, steppers ($\pm ₹50$), and visual pickers instead of text fields.
  2. **High Outdoor Contrast (WCAG AA Compliant)**:
     - Saturated Ochre/Amber **`#B45309`** used for all active buttons and critical text against white surfaces to ensure a contrast ratio $> 4.5:1$ under direct glare.
     - Backgrounds use a soft cream `#FAF8F5` with high-contrast Slate-950 `#020617` text.
     - `#D97706` is used strictly for decorative borders/badges.
  3. **Multi-Sensory Cues (Icon + Text + Audio)**: Every key action has both a prominent icon and plain-language wording. A dedicated speaker button triggers text-to-speech reading aloud in Marathi.
  4. **Silent Voice Fallback**: If an Android browser lacks native Marathi phonetics, the Web Speech synthesis silently falls back to Hindi or English without crashing or triggering distracting error dialogs.
  5. **Naka Community Mode**: A live banner (*"At Khopoli Naka — 14 workers active today"*) gives Ramesh social proof and camaraderie with peers at his usual chowk.
  6. **Skills Without Credentials**:
     - **Work Photos Gallery**: Visual photo cards showing completed PVC piping and tank repairs.
     - **Milestone Metric**: *"320 hours worked on Hawker's Help"* provides proof of reliability without requiring a resume.
     - **"I Have Tools" Checklist**: Workers who own their tools (pipe wrench, power drill) rank higher for jobs requiring owned equipment.
  7. **Privacy-First ID Verification**:
     - Only asks for the last 4 digits of Aadhaar with simulated OTP verification.
     - Displays `XXXX XXXX 8921` with a badge: *"Your full ID number is never stored or shown to anyone."* Full 12-digit Aadhaar numbers are strictly never accepted or stored.

### Persona B: Sunita (Homeowner in Khopoli)
- **Need**: Needs a reliable plumber quickly for a leaking bathroom; fears being overcharged or dealing with unreliable workers.
- **Design Decisions Made for Sunita**:
  1. **4-Step Post-Job Flow**: Post a job in under 60 seconds with guided wage hints based on the local median rate (`₹700 / दिवस`).
  2. **Verified Naka Workers Directory**: Browse local craftsmen with ratings (★ 4.9), verified tools, and clock-in records.
  3. **Clock-In / Clock-Out & Mark Paid**: See when the worker starts work, review confirmed hours (8 hrs), and mark payment completed with one tap.
  4. **Mutual Rating Flow**: 3 big face buttons (😃 Great, 😐 Okay, 🙁 Poor) + 1-5 stars + quick tags (*"On time"*, *"Skilled"*, *"Paid on time"*).

---

## 4. Core Features Walkthrough

### 1. Visual Wage Negotiation Slider
- Displays the **Employer's Offer**, the **Worker's Minimum Ask**, and the **Naka Median Benchmark** on a single visual gradient bar.
- If a gap exists, it highlights the difference in amber with a 1-tap **"Split the Difference"** midpoint button and $\pm ₹50$ nudges.
- When terms match, the bar turns solid emerald green with *"Deal Matched! ₹X / day"*.
- Both sides' numbers are permanently visible to prevent silent wage undercutting.

### 2. Employer Trust Card & Safety Radar
- Verified employer badges, jobs posted count, and a clear **`100% paid on time`** indicator.
- Plain-language warnings for flagged suspicious jobs (e.g. *"Demands ₹250 upfront deposit"* or *"12-hour shift far below minimum wage"*).

### 3. My Team (Worker Collectives)
- Recognizes that naka workers often work in groups (e.g., *1 Plumber + 1 Electrician + 2 Helpers*).
- Displays composite daily rates (`₹2,450 / दिवस`) with transparent per-worker wage distributions to prevent wage theft among crews.

### 4. Rights Hub & Grievance Flow
- **Interactive 3-Question Checker**: Matches informal workers with relevant welfare boards (Maharashtra BOCW, e-Shram, PM-SYM Pension, Ayushman Bharat).
- **Documents Checklist**: Interactive tick boxes for Aadhaar, bank passbook, and contractor certificates.
- **Low-Literacy Grievance Flow**: 1-tap reason selector, voice note recorder, and generated Case ID (e.g. `#HH-MAH-2026-9142`).

---

## 5. What is Mock vs. Real

| Component | Status | Implementation Details |
|---|---|---|
| **Frontend Framework** | **Real** | React 18, Vite 5, Tailwind CSS, Lucide Icons |
| **State Machine** | **Real** | In-memory `AppContext` managing jobs, roles, clock-ins, and ratings |
| **TTS Speech Synthesis** | **Real** | Browser `window.speechSynthesis` with silent Marathi $\rightarrow$ Hindi $\rightarrow$ English fallback |
| **Phone / OTP Authentication** | **Simulated** | Phone input + 1-tap simulated OTP `1234` + Guest mode |
| **Aadhaar Verification** | **Simulated** | Privacy-first last 4 digits only (`XXXX XXXX 8921`); no 12-digit numbers stored |
| **Backend & Database** | **Mock** | In-memory JavaScript dataset (`src/data/mockData.js`) |
| **Welfare Schemes & Helplines** | **Sample Data** | Clearly labeled as `SAMPLE DATA` in UI; must be verified before actual government filing |

---

## 6. Hackathon Judge Scenario Presets

At the top of the app, click the **"Hackathon Judge Demo Scenarios"** toolbar to test key flows in 1 click:
1. 🤝 **Scenario 1**: Wage Negotiation & Trust Card (Ramesh $\leftrightarrow$ Sunita).
2. 🚨 **Scenario 2**: Flagged Scam Job Alert (Detect ₹250 deposit scam).
3. ⏱️ **Scenario 3**: Clock-In & Payment Clearance (Employer dashboard).
4. 📜 **Scenario 4**: Welfare Eligibility & 3-Question Checker.
