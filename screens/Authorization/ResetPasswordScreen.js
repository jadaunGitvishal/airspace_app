import React, { useState } from "react";
import Background from "../../components/Background";
import BackButton from "../../components/Button/BackButton";
import Logo from "../../components/Logo";
import Heading from "../../components/Text/Heading";
import TextInput from "../../components/Input/TextInput";
import Button from "../../components/Button/Button";
import { ActivityIndicator, Alert, View } from "react-native";
import { theme } from "../../core/theme";
import * as api from "../../api/userRequests.js";
import { logIn, useDispatch } from "../../features/userSlice.js";

const ResetPasswordScreen = ({ navigation, route }) => {
	const { otp } = route.params;
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [newPassword, setNewPassword] = useState({ value: "", error: "" });
	const [confirmPassword, setConfirmPassword] = useState({
		value: "",
		error: "",
	});

	// handle reset
	const handleReset = async () => {
		const newError = checkErrors(newPassword);
		const confirmError = checkErrors(confirmPassword);
		if (newError || confirmError) {
			setNewPassword({ ...newPassword, error: newError });
			setConfirmPassword({ ...confirmPassword, error: confirmError });
			return;
		}

		if (newPassword.value !== confirmPassword.value) {
			setNewPassword({ ...newPassword, error: "* passwords don't match" });
			setConfirmPassword({
				...confirmPassword,
				error: "* passwords don't match",
			});
			return;
		}

		try {
			setLoading(true);
			const { data } = await api.resetPassword({
				otp: otp,
				password: newPassword.value,
				confirmPassword: confirmPassword.value,
			});

			if (data) {
				Alert.alert("Password Reset", "Your password reset was successful.");
				dispatch(
					logIn({
						user: data.user,
					})
				);
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

	// check errors
	const checkErrors = (inp) => {
		if (inp.value === "") {
			return "*this field cannot be empty";
		}

		if (inp.value.length < 8) {
			return "*password length must be 8 characters";
		}

		return "";
	};

	return (
		<Background>
			<View className="h-full px-10 items-center justify-center">
				<BackButton goBack={navigation.goBack} />
				<Logo size={140} />

				<Heading>Reset Password</Heading>

				{loading === true ? (
					<View className="h-[211px] flex-col justify-center">
						<ActivityIndicator size={45} color={theme.colors.bg0} />
					</View>
				) : (
					<>
						<TextInput
							label="New Password"
							returnKeyType="done"
							value={newPassword.value}
							onChangeText={(text) =>
								setNewPassword({ value: text, error: "" })
							}
							error={newPassword.error}
							errorText={newPassword.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
							secureTextEntry
						/>
						<TextInput
							label="Confirm Password"
							returnKeyType="done"
							value={confirmPassword.value}
							onChangeText={(text) =>
								setConfirmPassword({ value: text, error: null })
							}
							error={confirmPassword.error}
							errorText={confirmPassword.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
							secureTextEntry
						/>

						<Button
							mode="contained"
							onPress={handleReset}
							style={{ marginTop: 16, backgroundColor: theme.colors.main }}
						>
							RESET PASSWORD
						</Button>
					</>
				)}
			</View>
		</Background>
	);
};

export default ResetPasswordScreen;
