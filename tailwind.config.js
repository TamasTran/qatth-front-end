
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          50: '#f8fafc', 
          100: '#f1f5f9', 
          200: '#e2e8f0', 
          300: '#cbd5e1', 
          400: '#94a3b8', 
          500: '#64748b', 
          600: '#475569',
          700: '#334155', 
          800: '#1e293b', 
          900: '#0f172a', 
        },
        accent: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fda29b',
          400: '#f97066',
          500: '#f04438',
          600: '#d92d20',
          700: '#b42318',
          800: '#912018',
          900: '#55160c',
        }
      },
      boxShadow: {
        glow: '0 0 25px rgba(71,85,105,0.15)',
        'glow-accent': '0 0 25px rgba(240,68,56,0.2)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(1200px 600px at 20% -10%, rgba(71,85,105,0.04), transparent), radial-gradient(1000px 400px at 90% 20%, rgba(148,163,184,0.02), transparent)',
        'gradient-hero': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #ffffff 50%, #fef3f2 75%, #fee4e2 100%)',
      }
    },
  },
  plugins: [],
}
