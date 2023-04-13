/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./helpers/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				main: "#1364FC",
				dark: "#707070a8",
				darker: "#6A6A6A",
				bg: "#F1F4FF",
				bg1: "#dfe6ff",
			},
		},
	},
	plugins: [],
};
