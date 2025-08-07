/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        light: {
          green: {
            400: "hsl(172, 67%, 45%)",
            900: "hsl(183, 100%, 15%)",
          },
          grey: {
            500: "hsl(186, 14%, 43%)",
            400: "hsl(184, 14%, 56%)",
            200: "hsl(185, 41%, 84%)",
            50: "hsl(189, 47%, 97%)",
          },
          white: "hsl(0, 100%, 100%)",
        },
      },
      fontFamily: {
        mono: ['"Space Mono"', "monospace"],
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      boxShadow: {
        glow: '0px 0px 20px hsla(185, 41%, 84%, 0.8)',
      },
    },
  },
  plugins: [],
};
