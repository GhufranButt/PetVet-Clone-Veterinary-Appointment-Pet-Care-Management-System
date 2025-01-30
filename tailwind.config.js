/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: {
          light: "#CDAAFB",
          default: "#8F4BF6",
          dark: "#6A2EDB",
        },
      },
    },
  },
  plugins: [],
};
