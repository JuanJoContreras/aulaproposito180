/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        navy: { DEFAULT: '#1B3A5C', 50:'#F1F5F9', 100:'#E2E8F0', 600:'#264E78', 700:'#1B3A5C', 800:'#142A43', 900:'#0E1F31' },
        gold: { DEFAULT: '#C9A227', 50:'#FBF6E3', 100:'#F4E8B6', 500:'#D9B233', 600:'#C9A227', 700:'#A78818' },
        ink: '#1A1A1A',
        paper: '#FAFAFA',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
        hover: '0 12px 28px -8px rgba(27,58,92,0.18), 0 6px 12px -6px rgba(27,58,92,0.12)',
      },
    },
  },
  plugins: [],
}
