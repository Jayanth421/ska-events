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
        maroon: {
          50: "#fdf2f4",
          100: "#fce7eb",
          200: "#f9d0d8",
          300: "#f4aab8",
          400: "#ec7591",
          500: "#e14d71",
          600: "#cc2d56",
          700: "#ab2147",
          800: "#8b1d40",
          900: "#771c3c",
          950: "#5e0a27",
          DEFAULT: "#6B0F1A",
          dark: "#4A0B12",
          deep: "#3D0812",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
          bright: "#FFD700",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        telugu: ["Noto Serif Telugu", "Mandali", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
        "maroon-gradient": "linear-gradient(135deg, #6B0F1A 0%, #9B1B2A 50%, #6B0F1A 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "spin-slow": "spin 20s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(201, 168, 76, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(201, 168, 76, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        gold: "0 4px 20px rgba(201, 168, 76, 0.3)",
        "gold-lg": "0 8px 40px rgba(201, 168, 76, 0.4)",
        maroon: "0 4px 20px rgba(107, 15, 26, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
