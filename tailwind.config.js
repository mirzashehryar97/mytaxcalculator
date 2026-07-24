/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)', 'Arial', 'sans-serif'],
      },
      screens: {
        950: '950px',
      },
    },
  },
  plugins: [],
};
