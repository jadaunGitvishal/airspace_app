import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as PaperInput } from "react-native-paper";
import { theme } from "../../core/theme";

export default function TextInput({
	containerStyle,
	inputStyle,
	errorText,
	description,
	...props
}) {
	return (
		<View
			style={[
				containerStyle ? containerStyle : styles.container,
				{ width: "100%" },
			]}
		>
			<PaperInput
				style={[
					inputStyle && inputStyle,
					{ backgroundColor: theme.colors.surface },
				]}
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
		marginVertical: 12,
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
