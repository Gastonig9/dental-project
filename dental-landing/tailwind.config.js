/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'acento': '#58D68D',
        'background': '#F9F9FF',
        'typography': '#18212B',
        'lightgray': '#EEEEF0',
        'darkgray': '#DAE3DE' 
      }
    },
    colors: {
      'acento': '#58D68D',
      'background': '#F9F9FF',
      'typography': '#18212B',
      'lightgray': '#EEEEF0',
      'darkgray': '#DAE3DE' 
    }
  },
  plugins: [],
}

