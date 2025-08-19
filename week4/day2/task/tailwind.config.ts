import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "hsl(180, 52%, 96%)",   // light background
          400: "hsl(180, 29%, 50%)",  // primary accent
          900: "hsl(180, 14%, 20%)",  // dark text (light mode)
          950: "hsl(180, 14%, 12%)",  // dark mode background
        },
        gray: {
          400: "hsl(180, 8%, 52%)",   // light neutral
          300: "hsl(180, 8%, 70%)",   // dark mode neutral
        },
        m : '#000'
      },

    },
  },
  plugins: [],
}

export default config
