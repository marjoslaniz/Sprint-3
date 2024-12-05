/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/js/**/*.js",
    "./public/**/*.css"
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'btn',
    'btn-sm',
    'btn-danger',
    'btn-warning', // Agrega todas las clases que quieres incluir
  ],
  plugins: [],
}

