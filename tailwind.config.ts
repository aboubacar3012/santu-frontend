import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "my-background": "#eeeeee",
        "my-slate": "#313d4c",
        "my-blush": "#feeeed",
        "my-pink": "#f4b7c9",
        "my-raspberry": "#b34766",
        "my-eggplant": "#5d2442",
      }
    },
  },
  plugins: [],
};
export default config;
