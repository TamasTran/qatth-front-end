
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9fb', 
          100: '#d9f0f5', 
          200: '#b3dfe9', 
          300: '#7cc5d8', 
          400: '#4fa8c9', 
          500: '#2d8ba8', 
          600: '#1a6b8a',
          700: '#0d4f6f', 
          800: '#083a52', 
          900: '#052a3d', 
        }
      },
      boxShadow: {
        glow: '0 0 25px rgba(26,107,138,0.4)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(1200px 600px at 20% -10%, rgba(26,107,138,0.2), transparent), radial-gradient(1000px 400px at 90% 20%, rgba(79,168,201,0.12), transparent)'
      }
    },
  },
  plugins: [],
}
