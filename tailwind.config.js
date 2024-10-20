const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueColor: "#002D5D",
        lightBlueColor: "#002d5d25",
        orangeColor: "#E94E1B",
        yellowColor: "#FFC629",
      },
    },
  },
  plugins: [],
});
