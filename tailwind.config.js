/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    './App.{js,ts,jsx,tsx}',
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/navigation/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //     'gradient-conic':
      // 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      // },
      colors: {
        'main-color': '#0A98C5',
        'text-color': '#5B5A5A'
      },
      padding: {
        'btn-padding': '10px'
      }
    }
  },
  plugins: []

}
