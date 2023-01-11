import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { theme } from "../core/theme";

export default function Logo({ size }) {
	return (
		<View
			className="p-3 rounded-full"
			style={{
				backgroundColor: theme.colors.primary,
				height: 0 + size,
				width: 0 + size,
			}}
		>
			<Image source={require("../assets/logo1.png")} style={styles.image} />
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain",
	},
});
