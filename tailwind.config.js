
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eafffb',
          100: '#c9fff4',
          200: '#93ffe9',
          300: '#55f7d9',
          400: '#24e2c5',
          500: '#10c8ad',
          600: '#06a393',
          700: '#07827a',
          800: '#0b6763',
          900: '#0d5351',
        }
      },
      boxShadow: {
        glow: '0 0 25px rgba(16,200,173,0.35)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(1200px 600px at 20% -10%, rgba(16,200,173,0.25), transparent), radial-gradient(1000px 400px at 90% 20%, rgba(16,200,173,0.15), transparent)'
      }
    },
  },
  plugins: [],
}
