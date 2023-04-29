import React, { useEffect } from "react";
import {
	ImageBackground,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { theme } from "../core/theme";
import * as Font from "expo-font";

export default function Background({ children }) {
	useEffect(() => {
		const loadFonts = async () => {
			await Font.loadAsync({
				Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
				Roboto: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
			});
		};

		loadFonts();
	}, []);

	return (
		// <ImageBackground
		// 	source={require("../assets/background_dot.png")}
		// 	resizeMode="repeat"
		// 	style={styles.background}
		// >
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				{children}
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
		// </ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		// backgroundColor: theme.colors.surface,
		// backgroundColor: "#F8F9FD",
		backgroundColor: "#fff",
	},
	container: {
		flex: 1,
		padding: 0,
		width: "100%",
		alignSelf: "center",
		backgroundColor: theme.colors.surface,
		// backgroundColor: theme.colors.background,
		fontFamily: "Poppins",
	},
});
