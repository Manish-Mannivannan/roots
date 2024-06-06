import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      palette1: "rgba(246,217,146,1)",
      palette2: "rgba(246,207,146,1)",
      palette3: "rgba(246,196,146,1)",
      palette4: "rgba(246,176,146,1)",
      palette5: "rgba(246,161,146,1)",
      offWhite: "rgba(240, 240, 240, 1)",
      darkGray: "rgba(50, 50, 50, 1)",
    }
  },
  plugins: [],
};
export default config;
