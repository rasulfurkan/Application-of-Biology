/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          DEFAULT: '#059669',
          fg: '#ffffff',
        },
        neutral: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1f2937',
          900: '#0f172a',
        },
        success: { DEFAULT: '#22c55e', fg: '#ffffff' },
        warning: { DEFAULT: '#f59e0b', fg: '#111827' },
        error:   { DEFAULT: '#ef4444', fg: '#ffffff' },
        info:    { DEFAULT: '#3b82f6', fg: '#ffffff' },
        category: {
          vertebrates:    { DEFAULT: '#2563eb', fg: '#ffffff' },
          invertebrates:  { DEFAULT: '#d97706', fg: '#111827' },
          seedPlants:     { DEFAULT: '#059669', fg: '#ffffff' },
          seedlessPlants: { DEFAULT: '#0d9488', fg: '#ffffff' },
        },
        surface: {
          DEFAULT: '#ffffff',
          muted:   '#f8fafc',
          dark:    '#0b1220',
        },
        text: {
          DEFAULT: '#0b1220',
          inverted: '#f9fafb',
        },
        border: {
          DEFAULT: '#e2e8f0',
          dark:    '#1f2937',
        },
      },
      borderRadius: {
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      fontFamily: {
        sans: ['SpaceGrotesk_400Regular', 'System'],
      },
    },
  },
  plugins: [],
};
