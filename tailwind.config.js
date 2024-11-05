/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        slideIn: "slideIn 1s ease-out forwards",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
