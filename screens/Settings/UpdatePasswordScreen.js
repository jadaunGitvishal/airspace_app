import React, { useState } from "react";
import Background from "../../components/Background";
import MenuButton from "../../components/Button/MenuButton";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import Button from "../../components/Button/Button";
import TextInput from "../../components/Input/TextInput";
import {
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UpdatePasswordScreen({ navigation }) {
	const [oldPassword, setOldPassword] = useState({ value: "", error: "" });
	const [newPassword, setNewPassword] = useState({ value: "", error: "" });
	const [confirmPassword, setConfirmPassword] = useState({
		value: "",
		error: "",
	});

	const handleUpdate = () => {
		const oldError = checkErrors(oldPassword);
		const newError = checkErrors(newPassword);
		const confirmError = checkErrors(confirmPassword);
		if (oldError || newError || confirmError) {
			setOldPassword({ ...oldPassword, error: oldError });
			setNewPassword({ ...newPassword, error: newError });
			setConfirmPassword({ ...confirmPassword, error: confirmError });
			return;
		}

		if (newPassword !== confirmPassword) {
			setNewPassword({ ...newPassword, error: "* passwords don't match" });
			setConfirmPassword({
				...confirmPassword,
				error: "* passwords don't match",
			});
			return;
		}

		alert("Submitted");
	};

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
				style={{ backgroundColor: theme.colors.bg0 }}
				className="h-full w-full"
			>
				{/* HEADER */}
				<LinearGradient
					style={{
						paddingTop: StatusBar.currentHeight + 10,
						height: "15%",
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center"
					colors={["rgba(46, 199, 255,1)", "rgba(197, 81, 204,0.9)"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 10, y: 0 }}
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
							className="text-lg font-semibold"
						>
							UPDATE PASSWORD
						</Text>
						<Ionicons
							name="finger-print-outline"
							size={20}
							color={theme.colors.surface}
						/>
					</View>
				</LinearGradient>

				<ScrollView
					style={{
						height: "85%",
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
						backgroundColor: theme.colors.surface,
					}}
					className="w-full "
				>
					<TouchableOpacity
						activeOpacity={1}
						className="h-full w-full p-6 pt-10 items-center"
					>
						<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300 uppercase">
							PASSWORDS
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
				</ScrollView>
			</View>
		</Background>
	);
}
