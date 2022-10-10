const { preset } = require('twin.arco');
const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset()],
  content: [path.resolve(__dirname, './src/**/*.{html,ts,tsx}')],
  theme: {
    // TODO: arco
  },
  plugins: [],
};
