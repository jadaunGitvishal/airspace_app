import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function MenuButton() {
	return (
		<TouchableOpacity onPress={() => {}} style={styles.container}>
			<Image style={styles.image} source={require("../../assets/menu.png")} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 35,
		height: 35,
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain",
	},
});
