module.exports = {
  content: [
    './index.html', // Include the root HTML file
    './src/**/*.{vue,js,ts,jsx,tsx}', // Scan all Vue and JS files in the src folder
  ],
  theme: {
    extend: {}, // You can customize your theme here if needed
  },
  plugins: [], // Add Tailwind plugins here if required later
};
