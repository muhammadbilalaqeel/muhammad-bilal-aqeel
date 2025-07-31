 /** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
   content: ["./src/**/*.{html,js}"],
   theme: {
     extend: {
      fontFamily:{
        poppin:['"Poppins"', 'sans-serif'],
        imperial : ['"Imperial Script"', 'cursive']
      },
      backgroundImage:{
        'hero' : "url('../assets/hero.jpg')",
        'desert' : "url('../assets/hisma_desert_1.png')",
        'explore' : "url('../assets/explore_bg.png')",
        'destination' : "url('../assets/destination_bg.png')",
        'about':"url('../assets/about_bg.png')",
      },
     },
   },
   plugins: [],
 }