/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html", // main HTML file
    "./src/pages/**/*.{html,js}", // all HTML files in /pages (including subfolders)
    "./src/js/**/*.js", // all JS files in /js (including nested folders like /ui)
  ],
  theme: {
    extend: {
      colors: {
        light: {
          dark: "#121417",
          border: "#E5E8EB",
          gray: "#F0F2F5",
          darkGray: "#61738A",
          blue: "#0D78F2",
          boxborder: "#DBE0E5",
        },
      },
      fontFamily: {
        manrope: ['"Manrope"', "sans-serif"],
      },
      backgroundImage: {
        hero: "url('./assets/images/hero-bg.png')",
      },
    },
  },
  plugins: [],
};
