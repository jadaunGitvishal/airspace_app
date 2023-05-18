import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	Alert,
	Text,
} from "react-native";
import BackButtonSimple from "../../../components/Button/BackButtonSimple";
import Background from "../../../components/Background";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/Input/TextInput";
import { Ionicons } from "@expo/vector-icons";
import { nameValidator } from "../../../helpers/nameValidator";
import { useTheme } from "react-native-paper";
import * as api from "../../../api/userRequests";
import {
	logIn,
	selectUser,
	useDispatch,
	useSelector,
} from "../../../features/userSlice";

const PersonalSettingsScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const { user, loading } = useSelector(selectUser);
	const [isLoading, setIsLoading] = useState(false);

	const [name, setName] = useState({ value: "", error: "" });
	const [phone, setPhone] = useState({ value: "", error: "" });
	const [city, setCity] = useState({ value: "", error: "" });
	const [address, setAddress] = useState({ value: "", error: "" });

	// handle update
	const handleUpdate = async () => {
		const nameError = nameValidator(name.value);
		const phoneError = nameValidator(phone.value);
		const cityError = nameValidator(city.value);
		const addressError = nameValidator(address.value);
		if (nameError || phoneError || cityError || addressError) {
			setName({ ...name, error: nameError });
			setPhone({ ...phone, error: phoneError });
			setCity({ ...city, error: cityError });
			setAddress({ ...address, error: addressError });
			return;
		}

		try {
			setIsLoading(true);
			const { data } = await api.updateProfile({
				name: name.value,
				phone: phone.value,
				city: city.value,
				address: address.value,
			});

			if (data) {
				dispatch(
					logIn({
						user: data?.data,
					})
				);
				Alert.alert("Profile Updated", "Your profile is updated.");
				navigation.goBack();
			} else {
				Alert.alert("Error", "Data not found.");
			}
			setIsLoading(false);
		} catch (error) {
			console.log("=> Error");
			console.log(error);
			Alert.alert(
				"Error",
				error?.response?.data?.message ?? "An error occured."
			);
			setIsLoading(false);
		}
	};

	// get profile
	useEffect(() => {
		function setValues() {
			setName({ value: user?.user?.name, error: "" });
			setPhone({ value: user?.user?.phone, error: "" });
			setCity({ value: user?.user?.city, error: "" });
			setAddress({ value: user?.user?.address, error: "" });
		}

		setValues();
	}, [loading]);

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
							PROFILE
						</Text>
						<Ionicons
							name="person-outline"
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
					{isLoading === true ? (
						<View className="h-full flex-col justify-center my-20">
							<ActivityIndicator size={45} color={theme.colors.bg0} />
						</View>
					) : (
						<TouchableOpacity
							activeOpacity={1}
							className="h-full w-full p-6 pt-10 items-center"
						>
							<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300 uppercase">
								UPDATE PROFILE
							</Text>

							<TextInput
								label="Name"
								returnKeyType="next"
								value={name.value}
								onChangeText={(text) => setName({ value: text, error: "" })}
								error={name.error}
								errorText={name.error}
								className="h-10 bg-white"
							/>

							<TextInput
								label="Phone"
								returnKeyType="next"
								value={phone.value}
								onChangeText={(text) => setPhone({ value: text, error: "" })}
								error={phone.error}
								errorText={phone.error}
								autoCapitalize="none"
								keyboardType="number-pad"
								className="h-10 bg-white"
							/>

							<TextInput
								label="City"
								returnKeyType="next"
								value={city.value}
								onChangeText={(text) => setCity({ value: text, error: "" })}
								error={city.error}
								errorText={city.error}
								autoCapitalize="none"
								className="h-10 bg-white"
							/>

							<TextInput
								label="Address"
								returnKeyType="next"
								value={address.value}
								onChangeText={(text) => setAddress({ value: text, error: "" })}
								error={address.error}
								errorText={address.error}
								autoCapitalize="none"
								className="h-10 bg-white"
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
};

export default PersonalSettingsScreen;
