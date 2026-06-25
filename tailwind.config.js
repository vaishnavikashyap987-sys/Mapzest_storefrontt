/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#F8FAFC', // slate-50
          800: '#F1F5F9', // slate-100
          700: '#E2E8F0', // slate-200
          600: '#FFFFFF', // white
        },
        accent: {
          cyan: '#0284c7', // sky-600
          green: '#16a34a', // green-600
          purple: '#7c3aed', // purple-600
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
