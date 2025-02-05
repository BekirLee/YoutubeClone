/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
      },
      fontFamily: {
        sans: ['"PT Sans"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      }
    },
    // --font-family:{}
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide')
  ],
}

