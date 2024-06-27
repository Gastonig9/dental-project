/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        acento: "#58D68D",
        background: "#F9F9FF",
        typography: "#18212B",
        lightgray: "#F5F5F5",
        darkgray: "#DAE3DE",
      },
      screens: {
        xs: "360px",
        // => @media (min-width: 360px) { ... }
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        newxl: "1485px",
        // => @media (min-width: 1485px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
