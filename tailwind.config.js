import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", fontFamily.sans],
        mono: [fontFamily.mono],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1200px",
        },
      },
    },
  },
  plugins: [],
}
