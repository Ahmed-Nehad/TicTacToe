/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade": {
          "0%": { opacity: "0%", top: '80%' },
          "80%": { opacity: "100%" },
          "100%": { opacity: "0%", top: '40%', scale: "150%" }
        },
        "show": {
          "0%": { opacity: "0", top: '10%' },
          "100%": { opacity: "100%", top: '0' }
        }
      },
      animation: {
        "faden": "fade 1.3s ease-in-out",
        "show": "show .2s ease-in-out"
      }
    },
  },
  plugins: [],
}

