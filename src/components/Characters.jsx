import React from 'react';

/**
 * NAKA Illustrated Characters
 * Flat, respectful, dignified Indian trade workers & employers.
 * Built with pure inline SVGs, Cyber Yellow (#FDE047), deep black (#0A0A0A),
 * warm skin tones, and clear trade tools.
 */

// 1. Plumber (Male, with pipe wrench)
export function PlumberCharacter({ className = "w-20 h-20", state = "default" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Background circle badge accent */}
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />
      
      {/* Body / Kurta / Blue Overalls */}
      <path d="M26 84 C26 68 34 62 50 62 C66 62 74 68 74 84 Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2" />
      <path d="M42 62 L42 84 M58 62 L58 84" stroke="#FDE047" strokeWidth="2" strokeDasharray="2 2" />

      {/* Neck */}
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />

      {/* Head */}
      <circle cx="50" cy="40" r="15" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />

      {/* Hair & Cap */}
      <path d="M35 38 C35 27 43 25 50 25 C57 25 65 27 65 38 Z" fill="#0A0A0A" />
      <path d="M34 32 C38 24 62 24 66 32 L70 34 C64 33 54 33 46 33 Z" fill="#171717" />

      {/* Face details */}
      {/* Eyes */}
      {state === 'happy' ? (
        <>
          <path d="M43 38 Q46 35 48 38" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M52 38 Q54 35 57 38" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="45" cy="38" r="2" fill="#0A0A0A" />
          <circle cx="55" cy="38" r="2" fill="#0A0A0A" />
        </>
      )}

      {/* Moustache */}
      <path d="M44 45 Q50 42 56 45 Q50 48 44 45 Z" fill="#0A0A0A" />

      {/* Smile / Mouth */}
      {state === 'happy' ? (
        <path d="M46 48 Q50 53 54 48" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="#FFFFFF" />
      ) : (
        <path d="M47 48 Q50 50 53 48" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}

      {/* Wrench Tool in hand */}
      <g transform="translate(62, 50) rotate(-25)">
        <rect x="0" y="8" width="6" height="28" rx="2" fill="#DC2626" stroke="#0A0A0A" strokeWidth="1.5" />
        <path d="M-3 0 C-3 6 9 6 9 0 L7 -2 C7 2 -1 2 -1 -2 Z" fill="#71717A" stroke="#0A0A0A" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// 2. Electrician (Female, with tester & safety gear)
export function ElectricianCharacter({ className = "w-20 h-20", state = "default" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />

      {/* Clothes: High-vis Vest */}
      <path d="M26 84 C26 68 34 62 50 62 C66 62 74 68 74 84 Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2" />
      {/* Reflective yellow strips */}
      <path d="M36 64 L36 84 M64 64 L64 84" stroke="#FDE047" strokeWidth="4" />

      {/* Neck */}
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />

      {/* Head */}
      <circle cx="50" cy="40" r="14.5" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />

      {/* Hair (Tied bun with safety clip) */}
      <path d="M35 40 C34 26 44 24 50 24 C56 24 66 26 65 40 C61 32 39 32 35 40 Z" fill="#0A0A0A" />
      <circle cx="50" cy="21" r="5" fill="#0A0A0A" />

      {/* Eyes & Bindi */}
      <circle cx="50" cy="34" r="1.5" fill="#DC2626" />
      {state === 'happy' ? (
        <>
          <path d="M43 39 Q46 36 48 39" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M52 39 Q55 36 57 39" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="45" cy="39" r="2" fill="#0A0A0A" />
          <circle cx="55" cy="39" r="2" fill="#0A0A0A" />
        </>
      )}

      {/* Smile */}
      <path d="M46 47 Q50 51 54 47" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Voltage Tester Tool with yellow tip & spark icon */}
      <g transform="translate(68, 52) rotate(15)">
        <rect x="0" y="5" width="5" height="24" rx="1.5" fill="#FDE047" stroke="#0A0A0A" strokeWidth="1.5" />
        <rect x="1.5" y="0" width="2" height="5" fill="#71717A" />
        <path d="M-6 8 L-2 8 L-4 13 L0 13" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// 3. Carpenter (Male, experienced worker with hammer)
export function CarpenterCharacter({ className = "w-20 h-20", state = "default" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />

      {/* Body: Checkered or dark shirt */}
      <path d="M26 84 C26 68 34 62 50 62 C66 62 74 68 74 84 Z" fill="#171717" stroke="#0A0A0A" strokeWidth="2" />
      <path d="M50 62 L50 84" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Neck */}
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#C27845" />

      {/* Head */}
      <circle cx="50" cy="40" r="15" fill="#D98A52" stroke="#0A0A0A" strokeWidth="2.5" />

      {/* Hair (slight grey touch for experienced artisan) */}
      <path d="M35 38 C35 26 44 24 50 24 C56 24 65 26 65 38 C60 30 40 30 35 38 Z" fill="#262626" />
      {/* Pencil tucked behind ear */}
      <rect x="61" y="32" width="10" height="3" rx="1" transform="rotate(-30 61 32)" fill="#DC2626" stroke="#0A0A0A" strokeWidth="1" />

      {/* Eyes */}
      <circle cx="45" cy="39" r="2" fill="#0A0A0A" />
      <circle cx="55" cy="39" r="2" fill="#0A0A0A" />

      {/* Broad friendly smile */}
      <path d="M46 48 Q50 53 54 48" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Claw Hammer */}
      <g transform="translate(22, 54) rotate(-35)">
        <rect x="2" y="8" width="5" height="26" rx="1" fill="#B45309" stroke="#0A0A0A" strokeWidth="1.5" />
        <path d="M-4 4 L12 4 L14 8 L-2 8 Z" fill="#52525B" stroke="#0A0A0A" strokeWidth="1.5" />
        <path d="M-4 4 C-8 4 -8 0 -6 -2" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 4. Painter (Female / Male with roller & paint splash)
export function PainterCharacter({ className = "w-20 h-20", state = "default" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />

      {/* Body / Overalls with paint dots */}
      <path d="M26 84 C26 68 34 62 50 62 C66 62 74 68 74 84 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
      <circle cx="40" cy="72" r="3" fill="#2563EB" />
      <circle cx="58" cy="76" r="2" fill="#15803D" />
      <circle cx="48" cy="80" r="2.5" fill="#DC2626" />

      {/* Neck */}
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />

      {/* Head */}
      <circle cx="50" cy="40" r="14.5" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />

      {/* White painter cloth bandana/cap */}
      <path d="M34 36 C34 26 44 24 50 24 C56 24 66 26 66 36 L68 39 L32 39 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
      <path d="M32 39 L30 46 M68 39 L70 46" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />

      {/* Eyes & Smile */}
      <circle cx="45" cy="43" r="2" fill="#0A0A0A" />
      <circle cx="55" cy="43" r="2" fill="#0A0A0A" />
      <path d="M46 49 Q50 53 54 49" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Paint Roller Tool */}
      <g transform="translate(68, 46) rotate(20)">
        <rect x="0" y="0" width="16" height="8" rx="2" fill="#2563EB" stroke="#0A0A0A" strokeWidth="1.5" />
        <path d="M8 8 L8 14 L12 16 L12 28" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 5. Mason (Male, building brickwork with trowel)
export function MasonCharacter({ className = "w-20 h-20", state = "default" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />

      {/* Body: Sturdy shirt */}
      <path d="M26 84 C26 68 34 62 50 62 C66 62 74 68 74 84 Z" fill="#78350F" stroke="#0A0A0A" strokeWidth="2" />

      {/* Neck & Head */}
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#C27845" />
      <circle cx="50" cy="40" r="15" fill="#D98A52" stroke="#0A0A0A" strokeWidth="2.5" />

      {/* Head cloth (Gamcha / Pheta) */}
      <path d="M33 34 C36 24 64 24 67 34 L69 38 L31 38 Z" fill="#DC2626" stroke="#0A0A0A" strokeWidth="2" />
      <path d="M63 36 C66 42 67 48 68 54" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />

      {/* Eyes & Sturdy Beard / Moustache */}
      <circle cx="45" cy="41" r="2" fill="#0A0A0A" />
      <circle cx="55" cy="41" r="2" fill="#0A0A0A" />
      <path d="M43 47 Q50 44 57 47" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M46 51 Q50 53 54 51" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Trowel with red brick */}
      <g transform="translate(18, 54) rotate(-20)">
        <polygon points="6,2 18,8 6,14" fill="#71717A" stroke="#0A0A0A" strokeWidth="1.5" />
        <path d="M6 8 L1 8 L1 18" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 6. Sweeper / Sanitation Worker (Female with traditional broom)
export function SweeperCharacter({ className = "w-20 h-20", state = "default" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />

      {/* Body: Dignified green/saffron saree */}
      <path d="M26 84 C26 68 34 62 50 62 C66 62 74 68 74 84 Z" fill="#15803D" stroke="#0A0A0A" strokeWidth="2" />
      <path d="M36 68 Q50 78 64 68" stroke="#FDE047" strokeWidth="2.5" fill="none" />

      {/* Neck & Head */}
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />
      <circle cx="50" cy="40" r="14.5" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />

      {/* Hair with flower/gajra */}
      <path d="M35 40 C34 26 44 24 50 24 C56 24 66 26 65 40 Z" fill="#0A0A0A" />
      <circle cx="64" cy="42" r="3" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1" />

      {/* Eyes & Bindi */}
      <circle cx="50" cy="34" r="1.5" fill="#DC2626" />
      <circle cx="45" cy="39" r="2" fill="#0A0A0A" />
      <circle cx="55" cy="39" r="2" fill="#0A0A0A" />

      {/* Warm gentle smile */}
      <path d="M46 47 Q50 51 54 47" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Broom (Phool jhadu) */}
      <g transform="translate(70, 52) rotate(25)">
        <rect x="0" y="0" width="3" height="32" rx="1" fill="#78350F" stroke="#0A0A0A" strokeWidth="1" />
        <path d="M-6 24 C-4 16 7 16 9 24 L11 34 L-8 34 Z" fill="#F59E0B" stroke="#0A0A0A" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// 7. Helper / General Worker (Young, energetic with bag)
export function HelperCharacter({ className = "w-20 h-20", state = "default" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />

      {/* Body: T-shirt with tool bag strap */}
      <path d="M26 84 C26 68 34 62 50 62 C66 62 74 68 74 84 Z" fill="#2563EB" stroke="#0A0A0A" strokeWidth="2" />
      {/* Shoulder strap */}
      <line x1="34" y1="64" x2="66" y2="84" stroke="#0A0A0A" strokeWidth="3.5" />

      {/* Neck & Head */}
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />
      <circle cx="50" cy="40" r="14.5" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />

      {/* Short neat hair */}
      <path d="M35 38 C35 26 44 24 50 24 C56 24 65 26 65 38 Z" fill="#0A0A0A" />

      {/* Eyes & enthusiastic smile */}
      <circle cx="45" cy="39" r="2" fill="#0A0A0A" />
      <circle cx="55" cy="39" r="2" fill="#0A0A0A" />
      <path d="M46 47 Q50 52 54 47" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="#FFFFFF" />

      {/* Work Bag on shoulder */}
      <rect x="62" y="70" width="16" height="14" rx="3" fill="#D97706" stroke="#0A0A0A" strokeWidth="2" />
    </svg>
  );
}

// 8. Employer Character (Homeowner / Contractor / Shopkeeper with keys & clipboard)
export function EmployerCharacter({ className = "w-20 h-20", state = "default" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3" />

      {/* Kurta / Collared Shirt */}
      <path d="M26 84 C26 68 34 62 50 62 C66 62 74 68 74 84 Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2" />
      <path d="M46 62 L50 68 L54 62" stroke="#FFFFFF" strokeWidth="2" fill="none" />

      {/* Neck & Head */}
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#FBBF24" />
      <circle cx="50" cy="40" r="15" fill="#FDE68A" stroke="#0A0A0A" strokeWidth="2.5" />

      {/* Glasses & Hair */}
      <path d="M35 36 C35 26 43 24 50 24 C57 24 65 26 65 36 Z" fill="#171717" />
      <circle cx="44" cy="39" r="4" stroke="#0A0A0A" strokeWidth="2" fill="none" />
      <circle cx="56" cy="39" r="4" stroke="#0A0A0A" strokeWidth="2" fill="none" />
      <line x1="48" y1="39" x2="52" y2="39" stroke="#0A0A0A" strokeWidth="2" />

      {/* Smile */}
      <path d="M47 48 Q50 51 53 48" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Clipboard / Hire Badge */}
      <g transform="translate(64, 56) rotate(-10)">
        <rect x="0" y="0" width="14" height="20" rx="2" fill="#FDE047" stroke="#0A0A0A" strokeWidth="1.5" />
        <rect x="4" y="-3" width="6" height="4" rx="1" fill="#0A0A0A" />
        <line x1="3" y1="5" x2="11" y2="5" stroke="#0A0A0A" strokeWidth="1.5" />
        <line x1="3" y1="9" x2="11" y2="9" stroke="#0A0A0A" strokeWidth="1.5" />
        <line x1="3" y1="13" x2="8" y2="13" stroke="#0A0A0A" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// 9. Team Collective Group Illustration (3 workers standing proud together)
export function TeamIllustration({ className = "w-full max-w-[280px] h-36" }) {
  return (
    <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Background soft curved badge */}
      <rect x="10" y="10" width="220" height="100" rx="24" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />

      {/* Left Character: Painter / Woman */}
      <g transform="translate(25, 10)">
        <path d="M25 90 C25 76 31 72 45 72 C59 72 65 76 65 90 Z" fill="#2563EB" stroke="#0A0A0A" strokeWidth="2" />
        <circle cx="45" cy="52" r="13" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2" />
        <path d="M32 50 C32 40 40 38 45 38 C50 38 58 40 58 50 Z" fill="#0A0A0A" />
        <circle cx="41" cy="52" r="1.5" fill="#0A0A0A" />
        <circle cx="49" cy="52" r="1.5" fill="#0A0A0A" />
        <path d="M42 58 Q45 61 48 58" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Right Character: Electrician */}
      <g transform="translate(125, 10)">
        <path d="M25 90 C25 76 31 72 45 72 C59 72 65 76 65 90 Z" fill="#15803D" stroke="#0A0A0A" strokeWidth="2" />
        <circle cx="45" cy="52" r="13" fill="#D98A52" stroke="#0A0A0A" strokeWidth="2" />
        <path d="M32 50 C32 40 40 38 45 38 C50 38 58 40 58 50 Z" fill="#171717" />
        <circle cx="41" cy="52" r="1.5" fill="#0A0A0A" />
        <circle cx="49" cy="52" r="1.5" fill="#0A0A0A" />
        <path d="M42 58 Q45 61 48 58" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Center Hero Character: Master Plumber / Collective Lead */}
      <g transform="translate(75, 4)">
        <path d="M20 96 C20 78 28 72 45 72 C62 72 70 78 70 96 Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2.5" />
        <circle cx="45" cy="48" r="15" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />
        <path d="M30 46 C30 34 38 32 45 32 C52 32 60 34 60 46 Z" fill="#0A0A0A" />
        <circle cx="41" cy="47" r="2" fill="#0A0A0A" />
        <circle cx="49" cy="47" r="2" fill="#0A0A0A" />
        <path d="M40 52 Q45 49 50 52" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 56 Q45 59 48 56" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        {/* Tool held in center */}
        <rect x="42" y="72" width="6" height="20" rx="1.5" fill="#FDE047" stroke="#0A0A0A" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// 10. Emotion & State Characters (Waving, Thinking, Happy, Concerned)
export function StateCharacter({ state = "waving", className = "w-24 h-24" }) {
  if (state === 'waving') {
    // Waving Worker (Welcome screen)
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />
        {/* Body */}
        <path d="M26 86 C26 70 34 64 50 64 C66 64 74 70 74 86 Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2" />
        <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />
        {/* Head */}
        <circle cx="50" cy="40" r="15" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />
        <path d="M35 38 C35 26 44 24 50 24 C56 24 65 26 65 38 Z" fill="#0A0A0A" />
        {/* Friendly eyes & big smile */}
        <path d="M42 38 Q45 35 48 38" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M52 38 Q55 35 58 38" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M45 46 Q50 52 55 46" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="#FFFFFF" />
        {/* Raised Waving Hand with motion lines */}
        <g transform="translate(68, 22)">
          <path d="M4 14 C4 8 10 4 14 6 C18 8 18 14 16 20 Z" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2" />
          <path d="M2 4 C6 2 8 0 10 2" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 -2 C18 0 20 4 20 6" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (state === 'thinking') {
    // Thinking character (Negotiation gap)
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3" />
        <path d="M26 86 C26 70 34 64 50 64 C66 64 74 70 74 86 Z" fill="#171717" stroke="#0A0A0A" strokeWidth="2" />
        <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />
        <circle cx="50" cy="40" r="15" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />
        <path d="M35 38 C35 26 44 24 50 24 C56 24 65 26 65 38 Z" fill="#0A0A0A" />
        {/* Thinking eyes looking upwards */}
        <circle cx="46" cy="36" r="2.5" fill="#0A0A0A" />
        <circle cx="56" cy="36" r="2.5" fill="#0A0A0A" />
        {/* Straight or thoughtful mouth */}
        <line x1="46" y1="47" x2="54" y2="47" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        {/* Hand touching chin */}
        <circle cx="58" cy="50" r="5" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2" />
        {/* Thought dots */}
        <circle cx="72" cy="24" r="2" fill="#0A0A0A" />
        <circle cx="78" cy="18" r="3" fill="#0A0A0A" />
        <circle cx="85" cy="12" r="4" fill="#FDE047" stroke="#0A0A0A" strokeWidth="2" />
      </svg>
    );
  }

  if (state === 'happy') {
    // Happy character (Deal matched & Job completed)
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="#DCFCE7" stroke="#15803D" strokeWidth="3" />
        <path d="M26 86 C26 70 34 64 50 64 C66 64 74 70 74 86 Z" fill="#15803D" stroke="#0A0A0A" strokeWidth="2" />
        <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />
        <circle cx="50" cy="40" r="15" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />
        <path d="M35 38 C35 26 44 24 50 24 C56 24 65 26 65 38 Z" fill="#0A0A0A" />
        {/* Laughing happy eyes */}
        <path d="M42 38 Q45 33 48 38" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M52 38 Q55 33 58 38" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Joyful open smile */}
        <path d="M44 45 Q50 54 56 45 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
        {/* Double Thumbs Up */}
        <g transform="translate(18, 52)">
          <circle cx="4" cy="4" r="4" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="1.5" />
          <path d="M4 0 L4 -5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g transform="translate(74, 52)">
          <circle cx="4" cy="4" r="4" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="1.5" />
          <path d="M4 0 L4 -5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  // Concerned / Suspicious warning state
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FEE2E2" stroke="#DC2626" strokeWidth="3" />
      <path d="M26 86 C26 70 34 64 50 64 C66 64 74 70 74 86 Z" fill="#7F1D1D" stroke="#0A0A0A" strokeWidth="2" />
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />
      <circle cx="50" cy="40" r="15" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />
      <path d="M35 38 C35 26 44 24 50 24 C56 24 65 26 65 38 Z" fill="#0A0A0A" />
      {/* Worried tilted eyebrows and wide eyes */}
      <path d="M42 34 L48 37" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 34 L52 37" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="45" cy="40" r="2.5" fill="#0A0A0A" />
      <circle cx="55" cy="40" r="2.5" fill="#0A0A0A" />
      {/* Wavy concerned mouth */}
      <path d="M45 49 Q48 46 51 49 Q54 52 57 49" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Warning Triangle next to head */}
      <g transform="translate(68, 14)">
        <polygon points="10,0 20,18 0,18" fill="#DC2626" stroke="#0A0A0A" strokeWidth="1.5" />
        <line x1="10" y1="5" x2="10" y2="11" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="14" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

// 11. Helpful Advocate Character (Calm, friendly guide for Rights & Report flow)
export function HelpfulAdvocateCharacter({ className = "w-20 h-20" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0A0A0A" strokeWidth="3" />
      <path d="M26 86 C26 70 34 64 50 64 C66 64 74 70 74 86 Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2" />
      <rect x="44" y="52" width="12" height="12" rx="2" fill="#D97706" />
      <circle cx="50" cy="40" r="15" fill="#E0A96D" stroke="#0A0A0A" strokeWidth="2.5" />
      <path d="M35 38 C35 26 44 24 50 24 C56 24 65 26 65 38 Z" fill="#0A0A0A" />
      <circle cx="45" cy="40" r="2" fill="#0A0A0A" />
      <circle cx="55" cy="40" r="2" fill="#0A0A0A" />
      <path d="M46 48 Q50 52 54 48" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Shield of Rights / Protection in front */}
      <g transform="translate(38, 66)">
        <path d="M12 0 L24 4 C24 14 16 20 12 22 C8 20 0 14 0 4 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
        <path d="M6 10 L10 14 L18 6" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

// 12. Trade Character Dispatcher
export function TradeCharacter({ trade, className = "w-14 h-14", state = "default" }) {
  switch (trade?.toLowerCase()) {
    case 'plumber':
      return <PlumberCharacter className={className} state={state} />;
    case 'electrician':
      return <ElectricianCharacter className={className} state={state} />;
    case 'carpenter':
      return <CarpenterCharacter className={className} state={state} />;
    case 'painter':
      return <PainterCharacter className={className} state={state} />;
    case 'mason':
      return <MasonCharacter className={className} state={state} />;
    case 'sweeper':
      return <SweeperCharacter className={className} state={state} />;
    case 'helper':
      return <HelperCharacter className={className} state={state} />;
    case 'employer':
      return <EmployerCharacter className={className} state={state} />;
    default:
      return <HelperCharacter className={className} state={state} />;
  }
}
