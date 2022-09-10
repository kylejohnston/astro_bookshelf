/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			// black: colors.black,
			// white: colors.white,
			gray: colors.neutral,
			// green: colors.lime,
			blue: colors.blue,
			orange: colors.orange,
			// purple: colors.violet,
			'white': '#FDFBF7',
			'black': '#262321',
			'primary': '#FF5500', // orange
			'bright': '#DDFF00',  // green
		},
		extend: {
			fontFamily: {
				headline: ['"Roboto Flex"', 'Arial', 'sans-serif'],
				mono: ['Roboto Mono', 'monospace'],
			},
		},
	},
	plugins: [],
}
