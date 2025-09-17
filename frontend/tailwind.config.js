/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        gray: {
          650: '#2d3748', // Custom color between gray-600 and gray-700
        },
      },
    },
  },
  plugins: [],
}