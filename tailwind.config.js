/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#141810',
        'text-primary': '#E6E6EA',
        pink: '#FF6392',
        green: '#98CE00',
        'border-subtle': 'rgba(255, 99, 146, 0.3)',
      },
      fontFamily: {
        serif: ['var(--font-primary)'],
        sans: ['var(--font-utility)'],
        utility: ['var(--font-utility)'],
      },
    },
  },
  plugins: [],
};
