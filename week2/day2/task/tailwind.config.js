/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      fontFamily:{
        jakarta : ['"Plus Jakarta Sans"', 'sans-serif']
      },
      colors: {
        light: {
          primary: {
            red500: "hsl(1, 90%, 64%)",
            blue950: "hsl(219, 85%, 26%)",
          },
          neutral: {
            white: "hsl(0, 100%, 100%)",
            navy50: "hsl(210, 60%, 98%)",
            blue100: "hsl(211, 68%, 94%)",
            navy100: "hsl(205, 33%, 90%)",
            gray500: "hsl(219, 14%, 63%)",
            gray600: "hsl(219, 12%, 42%)",
            navy950: "hsl(224, 21%, 14%)",
          },
        },
        dark: {
            
        },
      },
    },
  },
  plugins: [],
};
