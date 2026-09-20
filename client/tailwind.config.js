/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Design System: Nutritional Intelligence Tokens
        canvas: '#F8FAFC',
        card: '#FFFFFF',
        border: {
          subtle: '#E2E8F0',
          hover: '#CBD5E1',
        },
        primary: {
          DEFAULT: '#4F46E5', // Deep Indigo for primary actions
          hover: '#4338CA',
          active: '#3730A3',
          light: '#EEF2FF',
          border: '#C7D2FE',
        },
        emerald: {
          DEFAULT: '#059669', // Emerald for targets, macro completion
          dark: '#047857',
          light: '#ECFDF5',
          border: '#A7F3D0',
        },
        amber: {
          DEFAULT: '#D97706', // Warm Amber for warnings & maintenance
          dark: '#B45309',
          light: '#FFFBEB',
          border: '#FDE68A',
        },
        crimson: {
          DEFAULT: '#DC2626', // Crimson for overages & critical bounds
          dark: '#B91C1C',
          light: '#FEF2F2',
          border: '#FECACA',
        },
        slate: {
          900: '#0F172A', // Primary high-contrast text
          600: '#475569', // Secondary copy
          400: '#94A3B8', // Captions & subtle metadata
          100: '#F1F5F9', // Control wells & recessed panels
          50: '#F8FAFC',  // Baseline canvas
        }
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Geist', 'monospace'],
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(15, 23, 42, 0.05)',
        'card-hover': '0px 4px 6px -1px rgba(15, 23, 42, 0.07), 0px 2px 4px -2px rgba(15, 23, 42, 0.05)',
        modal: '0px 20px 25px -5px rgba(15, 23, 42, 0.08), 0px 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        card: '0.5rem', // 8px default
        panel: '0.75rem', // 12px parent
      }
    },
  },
  plugins: [],
};
