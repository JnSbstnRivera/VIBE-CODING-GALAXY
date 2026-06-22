import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wm: {
          blue: "#1D429B",
          orange: "#F89B24",
        },
        cosmos: {
          ink: "#070a14",
          mist: "#AFC3EE",
          lav: "#A9B8FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
