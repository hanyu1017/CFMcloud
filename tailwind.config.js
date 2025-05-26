module.exports = {
  darkMode: 'class', // This ensures dark mode only applies when 'dark' class is present
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'default': '#f9fafb', // gray-50
        'card': '#ffffff',    // white
      }
    },
  },
  plugins: [],
}