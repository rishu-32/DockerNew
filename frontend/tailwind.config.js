/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        meridian: {
          50: '#faf7f2',
          100: '#f3ede3',
          200: '#e6d9c4',
          300: '#d4bf9a',
          400: '#c49d6a',
          500: '#b8834f',
          600: '#a66d3f',
          700: '#8a5635',
          800: '#714731',
          900: '#5d3c2b',
          950: '#321f16',
        },
        ink: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,.08), 0 16px 40px rgba(0,0,0,.1)',
      },
    },
  },
  plugins: [],
};
