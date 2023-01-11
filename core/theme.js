import { DefaultTheme } from "react-native-paper";

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		text: "black",
		primary: "#4485E6",
		secondary: "#edf2f4",
		error: "#f13a59",
		surface: "white",
		bg0: "rgba(46, 199, 255,1)",
		bg1: "rgba(197, 81, 204,1)",
		accent: "rgba(255, 255, 255, 0.2)",
		accent1: "rgba(255, 255, 255, 0.5)",
		gray500: "rgba(107,114,128,1)",
		onSurface: "",
		disabled: "",
		placeholder: "",
		backdrop: "",
		notification: "",
		shadow: "rgba(0,0,0, 0.7)",
	},
};

export const darkTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		text: "white",
		primary: "#4485E6",
		secondary: "#edf2f4",
		error: "#f13a59",
		surface: "black",
		bg0: "black",
		bg1: "black",
		accent: "rgba(255, 200, 255, 0.2)",
		accent1: "rgba(255, 115, 255, 0.5)",
		gray500: "rgba(17,14,128,1)",
		onSurface: "",
		disabled: "",
		placeholder: "",
		backdrop: "",
		notification: "",
		shadow: "rgba(255,255,255, 0.7)",
	},
};
