 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js}"],
   theme: {
     extend: {
      fontFamily:{
        poppin:['"Poppins"', 'sans-serif'],
      },
      backgroundImage:{
        'hero' : "url('../assets/hero.jpg')"
      }
     },
   },
   plugins: [],
 }