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
        brand: {
          DEFAULT: '#B45309', // High contrast WCAG AA warm ochre/terracotta for buttons and active text
          hover: '#92400E',
          light: '#FEF3C7',
          deco: '#D97706',   // Decorative/badge accent only
          bg: '#FAF8F5',     // Warm, soft cream background
          surface: '#FFFFFF',
          dark: '#0F172A',   // Deep slate for maximum outdoor legibility
          muted: '#475569',
          border: '#E2E8F0',
          success: '#15803D',
          warning: '#B45309',
          danger: '#DC2626',
          indigo: '#312E81',
          teal: '#0F766E'
        }
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          '"Noto Sans Devanagari"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
      },
      minHeight: {
        'touch': '48px',
        'touch-lg': '56px'
      }
    },
  },
  plugins: [],
}
