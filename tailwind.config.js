/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
        colors: {
          primary: {
            light: '#FF5EC3', // Light pink shade
            DEFAULT: '#D300A9', // Vibrant pink (primary)
            dark: '#A40089', // Darker purple-pink
            muted: '#ECFFDC', // Light pastel green (for muted elements)
          },
          secondary: '#5B0073', // Purple (secondary)
          white: '#FFFFFF',
          black:"#000000", // White for text
          background: '#FF0080', // Pink for gradient
        },

    },
  },
  plugins: [],
}
