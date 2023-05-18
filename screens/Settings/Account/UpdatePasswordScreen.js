import React, { useState } from "react";
import Background from "../../../components/Background";
import BackButtonSimple from "../../../components/Button/BackButtonSimple";
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/Input/TextInput";
import * as api from "../../../api/userRequests";

export default function UpdatePasswordScreen({ navigation }) {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const [oldPassword, setOldPassword] = useState({ value: "", error: "" });
	const [newPassword, setNewPassword] = useState({ value: "", error: "" });
	const [confirmPassword, setConfirmPassword] = useState({
		value: "",
		error: "",
	});

	// handle update
	const handleUpdate = async () => {
		const oldError = checkErrors(oldPassword);
		const newError = checkErrors(newPassword);
		const confirmError = checkErrors(confirmPassword);
		if (oldError || newError || confirmError) {
			setOldPassword({ ...oldPassword, error: oldError });
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
			const { data } = await api.updatePassword({
				oldPassword: oldPassword.value,
				newPassword: newPassword.value,
				confirmPassword: confirmPassword.value,
			});
			if (data) {
				Alert.alert("Password Updated", "Password updated for your account.");
				navigation.goBack();
			} else {
				Alert.alert("Error", "Data not found.");
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
			<View
				style={{ backgroundColor: theme.colors.main }}
				className="h-full w-full"
			>
				{/* HEADER */}
				<View
					style={{
						height: "15%",
						backgroundColor: theme.colors.main,
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center"
				>
					{/* Top Row */}
					<View className="w-full flex-row items-center justify-betwee">
						<BackButtonSimple goBack={navigation.goBack} />
						{/* <MenuButton /> */}
					</View>

					{/* Middle Row */}
					<View
						style={{ letterSpacing: 1 }}
						className="w-full px-4 mt-2 flex-row items-center justify-between"
					>
						<Text
							style={{ color: theme.colors.surface }}
							className=" text-lg font-semibold"
						>
							PASSWORD
						</Text>
						<Ionicons
							name="finger-print-outline"
							size={20}
							color={theme.colors.surface}
						/>
					</View>
				</View>

				{/* SETTINGS AREA */}
				<ScrollView
					style={{
						height: "85%",
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
						backgroundColor: theme.colors.surface,
					}}
					className="w-full"
				>
					{loading === true ? (
						<View className="h-full flex-col justify-center my-20">
							<ActivityIndicator size={45} color={theme.colors.bg0} />
						</View>
					) : (
						<TouchableOpacity
							activeOpacity={1}
							className="h-full w-full p-6 pt-10 items-center"
						>
							<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300 uppercase">
								UPDATE PASSWORD
							</Text>

							<TextInput
								label="Old Password"
								returnKeyType="done"
								value={oldPassword.value}
								onChangeText={(text) =>
									setOldPassword({ value: text, error: "" })
								}
								error={oldPassword.error}
								errorText={oldPassword.error}
								containerStyle={{ marginVertical: 5 }}
								inputStyle={{ height: 50 }}
								secureTextEntry
							/>
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

							<View className="w-2/4 ml-auto mt-5">
								<Button
									mode="contained"
									onPress={() => {
										handleUpdate();
									}}
								>
									Update
								</Button>
							</View>
						</TouchableOpacity>
					)}
				</ScrollView>
			</View>
		</Background>
	);
}
