import React, { useState } from "react";
import Background from "../../components/Background";
import BackButton from "../../components/Button/BackButton";
import Logo from "../../components/Logo";
import Heading from "../../components/Text/Heading";
import TextInput from "../../components/Input/TextInput";
import Button from "../../components/Button/Button";
import { emailValidator } from "../../helpers/emailValidator";
import { View } from "react-native";
import { theme } from "../../core/theme";

const ResetPasswordScreen = ({ navigation }) => {
	const [email, setEmail] = useState({ value: "", error: "" });

	const sendResetPasswordEmail = () => {
		const emailError = emailValidator(email.value);
		if (emailError) {
			setEmail({ ...email, error: emailError });
			return;
		}
		navigation.navigate("LoginScreen");
	};

	return (
		<Background>
			<View className="h-full px-10 items-center justify-center">
				<BackButton goBack={navigation.goBack} />
				<Logo size={140} />

				<Heading>Restore Password</Heading>
				<TextInput
					label="E-mail address"
					returnKeyType="done"
					value={email.value}
					onChangeText={(text) => setEmail({ value: text, error: "" })}
					error={email.error}
					errorText={email.error}
					autoCapitalize="none"
					autoCompleteType="email"
					textContentType="emailAddress"
					keyboardType="email-address"
					description="You will receive email with password reset link."
				/>
				<Button
					mode="contained"
					onPress={sendResetPasswordEmail}
					style={{ marginTop: 16, backgroundColor: theme.colors.main }}
				>
					Send Instructions
				</Button>
			</View>
		</Background>
	);
};

export default ResetPasswordScreen;
