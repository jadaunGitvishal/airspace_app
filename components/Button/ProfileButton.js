import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileButton({ size }) {
	return (
		<View
			className="bg-primary rounded-full overflow-hidden"
			style={{ width: size ? size + 0 : 35, height: size ? size + 0 : 35 }}
		>
			<Image style={styles.image} source={require("../../assets/user.jpeg")} />
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "cover",
	},
});
