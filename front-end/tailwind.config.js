/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#209E1E',
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