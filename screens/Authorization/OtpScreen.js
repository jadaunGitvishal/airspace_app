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

const OtpScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState({ value: "", error: "" });

	// handle check
	const handleCheck = async () => {
		if (otp === "") {
			setOtp({ ...otp, error: "This field can't be empty." });
			return;
		}

		if (otp.value.length !== 6) {
			setOtp({ ...otp, error: "Invalid otp." });
			return;
		}

		try {
			setLoading(true);

			const { data } = await api.checkOtp({
				otp: otp.value,
			});

			if (data?.success === true) {
				navigation.navigate("ResetPasswordScreen", { otp: otp.value });
			} else {
				console.log("Reset Password OTP is invalid or has been expired.");
				Alert.alert(
					"Inavlid OTP",
					"Reset Password OTP is invalid or has been expired."
				);
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
							label="6-digit OTP"
							returnKeyType="done"
							value={otp.value}
							onChangeText={(text) => setOtp({ value: text, error: "" })}
							error={otp.error}
							errorText={otp.error}
							autoCapitalize="none"
							description="OTP sent to your email. Its valid for 15 minutes."
						/>

						<Button
							mode="contained"
							onPress={handleCheck}
							style={{ marginTop: 16, backgroundColor: theme.colors.main }}
						>
							CHECK OTP
						</Button>
					</>
				)}
			</View>
		</Background>
	);
};

export default OtpScreen;
