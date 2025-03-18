/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          light: '#A7F3D0', // Light green
          DEFAULT: '#34D399', // Default green
          dark: '#065F46', // Dark green
        },
      },
    },
  },
  plugins: [],
}

