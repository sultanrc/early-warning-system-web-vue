/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3F3F3',
        secondary: '#E7E3E3',
        temp: '#B50713',
        hum: '#3176AB',
      },
    },
  },
  plugins: [],
}
