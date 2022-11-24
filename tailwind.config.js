/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./helpers/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			text: "#000000",
			primary: "#560CCE",
			secondary: "#edf2f4",
			error: "#f13a59",
			surface: "#ffffff",
			background: "aliceblue",
			accent: "",
			onSurface: "",
			disabled: "",
			placeholder: "",
			backdrop: "",
			notification: "",
		},
	},
	plugins: [],
};
