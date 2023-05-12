import React, { useState } from "react";
import Background from "../../components/Background";
import BackButton from "../../components/Button/BackButton";
import Logo from "../../components/Logo";
import Heading from "../../components/Text/Heading";
import TextInput from "../../components/Input/TextInput";
import Button from "../../components/Button/Button";
import { emailValidator } from "../../helpers/emailValidator";
import { ActivityIndicator, Alert, View } from "react-native";
import { theme } from "../../core/theme";
import * as api from "../../api/userRequests.js";

const ForgetPasswordScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState({ value: "", error: "" });

	const sendResetPasswordEmail = async () => {
		const emailError = emailValidator(email.value);
		if (emailError) {
			setEmail({ ...email, error: emailError });
			return;
		}

		try {
			setLoading(true);
			const { data } = await api.forgetPassword({
				email: email.value,
			});

			if (data) {
				navigation.navigate("OtpScreen");
			} else {
				console.log("No user found");
				Alert.alert("Error", "User not found.");
			}

			setLoading(false);
		} catch (error) {
			console.log("=> Error");
			console.log(error);
			Alert.alert(
				"Error",
				error?.response?.data?.message ?? "An error occured."
			);
			setLoading(false);
		}
	};

	return (
		<Background>
			<View className="h-full px-10 items-center justify-center">
				<BackButton goBack={navigation.goBack} />
				<Logo size={140} />

				<Heading>Restore Password</Heading>

				{loading === true ? (
					<View className="h-[188px] flex-col justify-center">
						<ActivityIndicator size={45} color={theme.colors.bg0} />
					</View>
				) : (
					<>
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
							description="You will receive email with an OTP."
						/>
						<Button
							mode="contained"
							onPress={sendResetPasswordEmail}
							style={{ marginTop: 16, backgroundColor: theme.colors.main }}
						>
							Send Instructions
						</Button>
					</>
				)}
			</View>
		</Background>
	);
};

export default ForgetPasswordScreen;
