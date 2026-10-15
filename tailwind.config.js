/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyber Yellow & High-Contrast Bold Palette
        cyber: {
          yellow: '#FDE047', // Main Cyber Yellow (Flat)
          black: '#0A0A0A',  // Deep Jet Black
          dark: '#171717',   // Dark Section Card Surface
          muted: '#262626',  // Secondary Dark
          border: '#404040', // Dark Border
          lightBorder: '#E5E7EB',
          surface: '#FFFFFF',
          cream: '#FFFBEB',
        },
        brand: {
          DEFAULT: '#FDE047', // Cyber Yellow
          textOnYellow: '#0A0A0A',
          dark: '#0A0A0A',
          darkSurface: '#171717',
          // Accessible Semantic Colors
          success: '#15803D',
          successBright: '#22C55E',
          warning: '#F59E0B',
          warningDark: '#B45309',
          danger: '#DC2626',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '"Noto Sans Devanagari"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
      },
      borderRadius: {
        'card-lg': '32px',
        'card-xl': '36px',
        'pill': '9999px',
      },
      minHeight: {
        'touch': '48px',
        'touch-lg': '56px',
      }
    },
  },
  plugins: [],
}
