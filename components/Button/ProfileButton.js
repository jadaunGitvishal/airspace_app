import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { selectUser, useSelector } from "../../features/userSlice.js";

export default function ProfileButton({ size }) {
	const { user, loading } = useSelector(selectUser);

	return (
		<View
			className="bg-primary rounded-full overflow-hidden"
			style={{ width: size ? size + 0 : 35, height: size ? size + 0 : 35 }}
		>
			<Image style={styles.image} source={{ uri: user.user.image.url }} />
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "cover",
		backgroundColor: "gray",
	},
});
