const { preset } = require('twin.arco')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset()],
  content: [
    './src/client/src/**/*.{html,ts,tsx}'
  ],
  theme: {
    // TODO: arco
  },
  plugins: [],
}
