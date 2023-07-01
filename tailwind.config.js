/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      black: "#202022",
      white: "#fff",
      primary: {
        400: "#5CCD72",
        500: "#4CAF50",
      },
      error: "#FF0000",
      warning: "#F5A200",
      grey: {
        200: "#F2F2F2",
        400: "#F0F0F0",
        500: "#E0E0E0",
        600: "#D7D7D7",
        800: "#D3D3D3"
      },
    },
    extend: {
      colors: {
        darkGrey: {
          600: "#787878",
          800: "#525252"
        }
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif']
      },
      fontSize: {
        'caption': '10px',
        'sm': '12px',
        'base': '14px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '35px'
      }
    }
  },
  plugins: [],
}

