import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { theme } from "../core/theme";

export default function Logo({ size }) {
	return (
		<View className="flex-row items-end">
			<View
				style={{
					height: 0 + size,
					width: 0 + size,
				}}
			>
				<Image
					source={require("../assets/airspaceLogo.png")}
					style={styles.image}
				/>
			</View>
			{/* <Text
				style={{ color: theme.colors.main }}
				className="text-4xl font-[Poppins] font-black mb-5 p-0"
			>
				ir Space
			</Text> */}
		</View>
	);
}
{
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain",
	},
});
