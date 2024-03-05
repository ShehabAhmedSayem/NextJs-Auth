import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        indigo: {
          DEFAULT: '#FCFAFF',
          100: '#F3F0FF',
          200: '#D8CFFC',
          300: '#A895F3',
          400: '#836AE4',
          500: '#562AC6',
          600: '#4308AA',
          700: '#3A0088',
          800: '#300070',
          900: '#1E0047',
        },
        neutral: {
          DEFAULT: '#FFFFFF',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        green: {
          DEFAULT: '#F0FDF4',
          100: '#DCFCE7',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: "#15803D"
        },
        red: {
          600: '#DC2626'
        },
        yellow: {
          DEFAULT: '#FFF8EB',
          200: '#FFE5B2',
          700: '#E28D03',
        }
      },
      dropShadow: {
        DEFAULT: '0px 1px 3px 0px #0000001A',
      },
      maxWidth: {
        '8xl': '82.5rem',
        '9xl': '97.5rem',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config


