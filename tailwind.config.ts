import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': "465px",
      'xssm': "576px",
      'sm': '640px',
      'md': '768px',
      'mdlg': '992px',
      'lg': '1040px',
      'xl': '1280px',
      'lgxl' : '1400px',
      '2xl': '1536px',
      '3xl': '1850px'
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs': "465px",
      'xssm': "576px",
      'sm': '640px',
      'md': '768px',
      'mdlg': '992px',
      'lg': '1040px',
      'xl': '1280px',
      'lgxl' : '1400px',
      '2xl': '1536px',
      '3xl': '1850px'
    },
    extend: {
      fontSize: {
      },
    },
  },
  plugins: [],
};