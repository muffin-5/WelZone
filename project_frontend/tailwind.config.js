/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        sans: ["Urbanist", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          50: "#FDFCF9",
          100: "#FAF7F1",
          200: "#F3EDE1",
          300: "#EAE0CE",
        },
        sage: {
          50: "#F2F7F0",
          100: "#E2EDDE",
          200: "#C6DCC0",
          300: "#A3C69A",
          400: "#82AC79",
          500: "#63905B",
          600: "#4E7347",
          700: "#3E5A39",
          800: "#334831",
          900: "#2A3B29",
        },
        peach: {
          50: "#FDF3EC",
          100: "#FAE3D2",
          200: "#F5C6A6",
          300: "#EFA377",
          400: "#EA8753",
          500: "#E06A35",
          600: "#C5522A",
          700: "#9F4123",
        },
        clay: {
          50: "#F8F3EE",
          100: "#EFE4DA",
          200: "#DDC4B0",
          300: "#C8A183",
          400: "#B2815F",
          500: "#9D6847",
          600: "#80543A",
        },
        cocoa: "#3A3128",
        stone: "#6B645C",
        mist: "#EDF1EC",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(58, 49, 40, 0.08)",
        card: "0 4px 20px rgba(58, 49, 40, 0.06)",
        lift: "0 16px 40px rgba(58, 49, 40, 0.14)",
        glow: "0 10px 40px rgba(99, 144, 91, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        floatSlow: "float 7s ease-in-out infinite",
        fadeUp: "fadeUp 0.5s ease-out both",
        pop: "pop 0.25s ease-out both",
        breathe: "breathe 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};