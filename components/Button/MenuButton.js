import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function MenuButton({ size }) {
	return (
		<TouchableOpacity
			className="bg-primary rounded-full overflow-hidden"
			style={{ height: 0 + size, width: 0 + size }}
		>
			{/* <Image style={styles.image} source={require("../../assets/menu.png")} /> */}
			<Image style={styles.image} source={require("../../assets/user.jpeg")} />
		</TouchableOpacity>
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
