/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark" :"#16181D",
        "light":"#F0F2F5",
        "border":'220 15% 20%',
        "input":"220 15% 15%"
      }
    },
  },
  plugins: [],
}