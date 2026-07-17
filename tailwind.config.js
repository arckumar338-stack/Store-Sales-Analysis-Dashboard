/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: {
          950: '#08090d',
          900: '#0c0e14',
          850: '#10131c',
          800: '#141826',
          750: '#1a1f30',
          700: '#222840',
          600: '#2c3349',
          500: '#3a425e',
          400: '#5a6480',
          300: '#8a92ad',
          200: '#c0c6d6',
          100: '#e8ebf2',
        },
        brand: {
          50: '#ecfdfa',
          100: '#cffaf2',
          200: '#9ff5e6',
          300: '#5fe9d2',
          400: '#2dd4b7',
          500: '#14b89a',
          600: '#0a9883',
          700: '#0a7a6c',
          800: '#0c6056',
          900: '#0d4d47',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(45,212,183,0.18), 0 8px 40px -12px rgba(45,212,183,0.25)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 40px -20px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        flow: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-in': 'slide-in 0.4s ease-out both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        flow: 'flow 1.2s linear infinite',
      },
    },
  },
  plugins: [],
};
