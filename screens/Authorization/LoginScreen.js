import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Heading from "../../components/Text/Heading";
import Button from "../../components/Button/Button";
import TextInput from "../../components/Input/TextInput";
import BackButton from "../../components/Button/BackButton";
import { theme } from "../../core/theme";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { logIn, useDispatch } from "../../features/userSlice.js";
import * as api from "../../api/userRequests.js";

const LoginScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState({ value: "", error: "" });
	const [password, setPassword] = useState({ value: "", error: "" });

	const onLoginPressed = async () => {
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);
		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		}

		try {
			const { data } = await api.loginUser({
				email: email.value,
				password: password.value,
			});
			console.log(data);

			if (data) {
				dispatch(
					logIn({
						user: data.user,
					})
				);
			} else {
				console.log("No user found");
				Alert.alert("Error", "User not found.");
			}
		} catch (error) {
			console.log("=> Error");
			console.log(error);
			Alert.alert("Error", error?.response?.data?.message);
		}
	};

	return (
		<Background>
			{loading ? (
				<View className="h-full flex-col justify-center">
					<ActivityIndicator size={45} color={theme.colors.bg0} />
				</View>
			) : (
				<View className="h-full px-10 items-center justify-center">
					<BackButton goBack={navigation.goBack} />
					<Logo size={140} />

					<Heading>Welcome back.</Heading>
					<TextInput
						label="Email"
						returnKeyType="next"
						value={email.value}
						onChangeText={(text) => setEmail({ value: text, error: "" })}
						error={email.error}
						errorText={email.error}
						autoCapitalize="none"
						autoCompleteType="email"
						textContentType="emailAddress"
						keyboardType="email-address"
					/>
					<TextInput
						label="Password"
						returnKeyType="done"
						value={password.value}
						onChangeText={(text) => setPassword({ value: text, error: "" })}
						error={password.error}
						errorText={password.error}
						secureTextEntry
					/>
					<View style={styles.forgotPassword}>
						<TouchableOpacity
							onPress={() => navigation.navigate("ResetPasswordScreen")}
						>
							<Text style={styles.forgot}>Forgot your password?</Text>
						</TouchableOpacity>
					</View>

					<Button
						style={{ backgroundColor: theme.colors.main }}
						mode="contained"
						onPress={() => onLoginPressed()}
					>
						Login
					</Button>

					<View style={styles.row}>
						<Text>Don’t have an account? </Text>
						<TouchableOpacity
							onPress={() => navigation.replace("RegisterScreen")}
						>
							<Text style={styles.link}>Sign up</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</Background>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	forgotPassword: {
		width: "100%",
		alignItems: "flex-end",
		marginBottom: 24,
	},
	row: {
		flexDirection: "row",
		marginTop: 4,
	},
	forgot: {
		fontSize: 13,
		color: theme.colors.secondary,
	},
	link: {
		fontWeight: "bold",
		color: theme.colors.main,
	},
});
