import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f2f6f3',
          100: '#dce9e0',
          200: '#bad5c3',
          300: '#8fb89a',
          400: '#6a9877',
          500: '#617e67',
          600: '#4e6656',
          700: '#3d5244',
          800: '#2e3f34',
          900: '#1e2c23',
        },
        accent: {
          300: '#ffd48a',
          400: '#ffc974',
          500: '#FFB347',
          600: '#F3AF4B',
          700: '#e09a30',
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
