module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		colors: {
    		primary: '#BAC700',
			secondary: '#27430E',
			tertiary: '#2F376C',
			white: '#ffffff',
			black: '#000000',
			red: {
				100: '#881400',
				200: '#A81000',
			},
			blue: {
				100: '#0000BC',
				200: '#0000FC',
			},
			gray: {
				100: '#7C7C7C',
				200: '#BCBCBC',
			},
			transparent: 'transparent',
			current: 'currentColor',
		},
    extend: {},
  },
  plugins: [],
}
