
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ffffffff', 
          100: '#d4ffef', 
          200: '#aaffd9', 
          300: '#6effc0', 
          400: '#3bffa8', 
          500: '#00f98a', 
          600: '#00d97a',
          700: '#00b868', 
          800: '#009555', 
          900: '#007744', 
        }
      },
      boxShadow: {
        glow: '0 0 25px rgba(51,245,196,0.35)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(1200px 600px at 20% -10%, rgba(51,245,196,0.25), transparent), radial-gradient(1000px 400px at 90% 20%, rgba(51,245,196,0.15), transparent)'
      }
    },
  },
  plugins: [],
}
