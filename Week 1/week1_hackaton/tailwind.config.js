/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./*.js"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        mono : ['"Space Mono"','monospace'],
        work : ['"Work Sans"', 'sans-serif'],
        clash: ['"Clash Display"', 'sans-serif'],
      },
      screens: {
        "3xl": "1728px", // custom breakpoint
      },
      maxWidth: {
        1728: "1728px", // custom container size
      },
      backgroundImage: {
        hero: "url('./assets/hero_bg.png')",
        footer:"url('./assets/footer_bg.png')",
        map:"url('./assets/map_bg.png')"
      },
    },
  },
  plugins: [],
};
