/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/**/*.{css,js}",
    "./*.html",
    "./*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'josefin': ['"Josefin Sans"', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

