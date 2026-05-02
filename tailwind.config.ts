import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#052e16',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.1)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
