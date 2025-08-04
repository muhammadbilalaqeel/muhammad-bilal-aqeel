/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-8px)" },
          "40%, 80%": { transform: "translateX(8px)" },
        },
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
      },
      colors: {
        light: {
          primary: {
            purple: "hsl(259, 100%, 65%)", // Purple 500
            red: "hsl(0, 100%, 67%)", // Red 400
          },
          neutral: {
            white: "hsl(0, 100%, 100%)",
            gray100: "hsl(0, 0%, 94%)",
            gray200: "hsl(0, 0%, 86%)",
            gray500: "hsl(0, 1%, 44%)",
            black: "hsl(0, 0%, 0%)",
          },
        },
        dark: {
          charcoal: "#1f1f1f",
          d: "	#181818",
          gray500: "hsl(240, 3%, 60%)",
        },
      },
    },
  },
  plugins: [],
};
