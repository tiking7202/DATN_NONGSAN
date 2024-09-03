/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#339900',
        'secondary': '#FFFFFF',
        'third': '#000000',
        'fourth': '#CDE6CD',
      },
      fontSize: {
        '40': '40px',
      }
    },
  },
  plugins: [],
}