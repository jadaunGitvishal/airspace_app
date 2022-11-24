import React from "react";
import { TouchableOpacity, Image, StyleSheet, StatusBar } from "react-native";

export default function BackButton({ goBack }) {
	return (
		<TouchableOpacity onPress={goBack} style={styles.container}>
			<Image
				style={styles.image}
				source={require("../../assets/arrow_back1.png")}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 35,
		height: 35,
		position: "absolute",
		// top: 10 + getStatusBarHeight(),
		top: 10,
		left: 10,
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain",
	},
});
