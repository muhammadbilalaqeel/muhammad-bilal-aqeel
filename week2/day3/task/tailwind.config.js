/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        light: {
          brand: "#FC8A06",
          darkbg: "#03081F",
          heroLayer:'#03081FE5',
          gray:'#D9D9D9'
        },
      },
      fontFamily:{
        poppins:['"Poppins"', 'sans-serif']
      },
      backgroundImage:{
        "hero":"url('./assets/hero_img.png')"
      }
    },
  },
  plugins: [],
};
