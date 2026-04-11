/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'dark-green': '#0d3d36',
        'lime': '#b5e42a',
        'lime-dark': '#9dca1a',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
