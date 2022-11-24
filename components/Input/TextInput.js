import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as PaperInput } from "react-native-paper";
import { theme } from "../../core/theme";

export default function TextInput({ errorText, description, ...props }) {
	return (
		<View style={styles.container}>
			<PaperInput
				style={styles.input}
				selectionColor={theme.colors.primary}
				underlineColor="transparent"
				mode="outlined"
				{...props}
			/>
			{
				// description for text input
				description && !errorText ? (
					<Text style={styles.description}>{description}</Text>
				) : null
			}
			{
				// error message for text input
				errorText ? <Text style={styles.error}>{errorText}</Text> : null
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginVertical: 12,
	},
	input: {
		backgroundColor: theme.colors.surface,
	},
	description: {
		fontSize: 13,
		color: theme.colors.secondary,
		paddingTop: 8,
	},
	error: {
		fontSize: 13,
		color: theme.colors.error,
		paddingTop: 8,
	},
});
