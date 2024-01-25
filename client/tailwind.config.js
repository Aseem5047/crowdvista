/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 1s ease-in-out',
        'slide-in-left': 'slideInLeft 1s ease-in-out',

      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      colors: {
        primary: "#03a9f4f0",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      screens: {
        xs: "450px",
        "3xl": "1656px",
      },
      fontFamily: {
        family: "Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif"
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require('tailwind-scrollbar'),
  ],
  corePlugins: {
    animation: true,
  },
}
