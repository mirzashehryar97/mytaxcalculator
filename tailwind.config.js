/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'serif'],
      },
      screens: {
        950: '950px',
      },
    },
  },
  plugins: [],
};
