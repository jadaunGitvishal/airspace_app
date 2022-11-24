import React, { useState } from "react";
import Background from "../components/Background";
import Heading from "../components/Text/Heading";
import Paragraph from "../components/Text/Paragraph";
import Button from "../components/Button/Button";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../core/theme";
import Header from "../components/Navbar/Header";
import TextInput from "../components/Input/TextInput";

const Settings = ({ navigation }) => {
	const [oldPassword, setOldPassword] = useState({ value: "", error: "" });
	const [newPassword, setNewPassword] = useState({ value: "", error: "" });
	const [confirmPassword, setConfirmPassword] = useState({
		value: "",
		error: "",
	});

	return (
		<Background>
			<View className="h-full p-0 items-center">
				<Header />
				<View className="h-full w-full p-4 items-center">
					<Heading>Update Passsword</Heading>
					<TextInput
						label="Old Password"
						returnKeyType="done"
						value={oldPassword.value}
						onChangeText={(text) => setOldPassword({ value: text, error: "" })}
						error={oldPassword.error}
						errorText={oldPassword.error}
						secureTextEntry
					/>
					<TextInput
						label="New Password"
						returnKeyType="done"
						value={newPassword.value}
						onChangeText={(text) => setnewPassword({ value: text, error: "" })}
						error={newPassword.error}
						errorText={newPassword.error}
						secureTextEntry
					/>
					<TextInput
						label="Confirm Password"
						returnKeyType="done"
						value={confirmPassword.value}
						onChangeText={(text) =>
							setConfirmPassword({ value: text, error: "" })
						}
						error={confirmPassword.error}
						errorText={confirmPassword.error}
						secureTextEntry
					/>

					<Button mode="contained" onPress={""}>
						Update
					</Button>
				</View>
			</View>
		</Background>
	);
};

export default Settings;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain",
	},
});
