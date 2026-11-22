import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60-30-10 Rule:
        // 60% Dominant: #F3F3F3 (Light Gray/Warm Surface)
        // 30% Structure: #1D1D1D (Charcoal/Dark Contrast)
        // 10% Accent: #F0FD63 (rgb(240, 253, 99) Neon Lime)
        arcv: {
          base: "#F3F3F3",
          baseHover: "#EAEAEA",
          surface: "#FFFFFF",
          dark: "#1D1D1D",
          darkMuted: "#262626",
          darkCard: "#141414",
          neon: "#F0FD63",
          neonHover: "#E2EF4E",
          slate: "#919EAB",
          border: "#E2E5E9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
