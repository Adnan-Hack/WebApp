/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#FFD700",
          neon: "#FFC300"
        },
        metallic: {
          gold: "#E6BE8A"
        }
      },
      fontFamily: {
        luxury: ['"Playfair Display"', "serif"]
      }
    }
  },
  plugins: []
}