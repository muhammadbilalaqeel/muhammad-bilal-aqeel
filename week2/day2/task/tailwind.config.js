/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        light: {
          primary: {
            red500: "hsl(1, 90%, 64%)",
            blue950: "hsl(219, 85%, 26%)",
            purple: "hsl(259, 100%, 65%)", // Purple 500
            red: "hsl(0, 100%, 67%)", // Red 400
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
          primary: {
            red500: "hsl(1, 90%, 64%)", // Same as light for consistency
            blue950: "hsl(219, 85%, 70%)", // Lighter blue for better contrast
            purple: "hsl(259, 100%, 75%)", // Slightly lighter purple
            red: "hsl(0, 100%, 67%)", // Same red
          },
          neutral: {
            white: "hsl(224, 21%, 8%)", // Dark background (#121212 style)
            navy50: "hsl(222, 15%, 15%)", // Unread card bg (slightly lighter than base)
            blue100: "hsl(218, 15%, 22%)", // Border for unread
            navy100: "hsl(216, 15%, 28%)", // Border for read
            gray500: "hsl(219, 14%, 70%)", // Timestamp / less important
            gray600: "hsl(219, 12%, 84%)", // Main text
            navy950: "hsl(220, 25%, 92%)", // Strong title / name
          },
          charcoal: "#1f1f1f",
          d: "	#181818",
          gray500: "hsl(240, 3%, 60%)",
        },
      },
    },
  },
  plugins: [],
};
