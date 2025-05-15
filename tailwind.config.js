/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          light: '#93C5FD',   // blue-300
          dark: '#1E40AF',    // blue-800
        },
        secondary: {
          DEFAULT: '#10B981', // emerald-500
          light: '#6EE7B7',   // emerald-300
          dark: '#065F46',    // emerald-800
        },
        accent: {
          DEFAULT: '#8B5CF6', // violet-500
          light: '#C4B5FD',   // violet-300
          dark: '#5B21B6',    // violet-800
        },
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Courier', 'monospace'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}