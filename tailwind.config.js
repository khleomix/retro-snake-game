module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        fontFamily: {
        	'sans': ['VT323', 'monospace'],
        },
		colors: {
    		primary: '#BAC700',
			secondary: '#183400',
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
			pink: {
				100: '#ff007f',
				200: '#F76BC0',
			},
			inset: {
				black: 'rgba(0, 0, 0, 0.5)',
				gray: 'rgba(255, 255, 255, 0.5)',
			},
			transparent: 'transparent',
			current: 'currentColor',
		},
    extend: {
      backgroundImage: {
        'game-box': "repeating-linear-gradient(to bottom, #0000, #0000 2px, #27430e78 2px, #27430e78 4px), repeating-linear-gradient(to right, #bac70029, #bac70029 2px, #27430e78 2px, #27430e78 4px)",
      }
	},
  },
  plugins: [],
}
