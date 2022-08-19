const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'totem-pole': {  DEFAULT: '#A70C09',  '50': '#F77370',  '100': '#F6605D',  '200': '#F43A36',  '300': '#F21410',  '400': '#CE0F0B',  '500': '#A70C09',  '600': '#720806',  '700': '#3D0403',  '800': '#070100',  '900': '#000000'},
        ...colors,
      }
    },
  },
  plugins: [],
}
