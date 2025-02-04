/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
      fontFamily: {
        playwrite : ['Playwrite', 'sans-serif'],
        qwigley : ['Qwigley', 'sans-serif'],
        dmsans : ['DMSans', 'sans-serif']

      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}