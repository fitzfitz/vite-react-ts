/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancingScript: ['"Dancing Script"'],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/aspect-ratio")],
};
