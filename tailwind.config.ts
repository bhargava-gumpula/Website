import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#042f2e",
          600: "#2dd4bf",
          700: "#5eead4",
          100: "#0d3331",
          200: "#115e59",
          400: "#2dd4bf",
          500: "#14b8a6"
        }
      },
      boxShadow: {
        soft: "0 1px 3px rgb(0 0 0 / 0.35), 0 8px 24px rgb(0 0 0 / 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
