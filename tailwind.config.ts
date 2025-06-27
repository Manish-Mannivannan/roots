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
        palette1: "rgba(246,217,146,1)",
        palette2: "rgba(246,207,146,1)",
        palette3: "rgba(246,196,146,1)",
        palette4: "rgba(246,176,146,1)",
        palette5: "rgba(246,161,146,1)",
        offWhite: "rgba(240, 240, 240, 1)",
        darkGray: "rgba(50, 50, 50, 1)",
        mutedBlack: "rgba(0,0,0,0.75)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "rgba(246,217,146,1)",
          "secondary": "rgba(246,207,146,1)",
          "accent": "rgba(246,196,146,1)",
          "neutral": "rgba(246,176,146,1)",
          "base-100": "rgba(240, 240, 240, 1)",
          "base-content": "rgba(246,196,146,1)",
          "info": "rgba(50, 50, 50, 1)",
          "success": "#00ff00",
          "warning": "#ffcc00",
          "error": "#ff0000",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};

export default config;
