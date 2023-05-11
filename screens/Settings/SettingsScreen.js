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
import { ActivityIndicator, Switch } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { setMode, setNotif, useDispatch } from "../../features/appSlice";

const SettingsScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isNotificationOn, setIsNotificationOn] = useState(false);

	// update mode
	const updateMode = async (value) => {
		try {
			await AsyncStorage.setItem("darkMode", JSON.stringify(value));
			dispatch(setMode(value));
		} catch (error) {
			console.log("Error saving dark mode:", error);
		}
	};

	// get mode
	useEffect(() => {
		const getMode = async () => {
			try {
				setLoading(true);
				const value = await AsyncStorage.getItem("darkMode");

				if (value === null) {
					setIsDarkMode(false);
				} else {
					setIsDarkMode(JSON.parse(value));
				}
				setLoading(false);
			} catch (error) {
				console.log("Error retrieving dark mode:", error);
				setLoading(false);
			}
		};

		getMode();
	}, []);

	//
	//
	//

	// update mode
	const updateNotif = async (value) => {
		try {
			await AsyncStorage.setItem("notif", JSON.stringify(value));
			dispatch(setNotif(value));
		} catch (error) {
			console.log("Error saving notif:", error);
		}
	};

	// get notification
	useEffect(() => {
		const getNotif = async () => {
			try {
				const value = await AsyncStorage.getItem("notif");
				// console.log("settings notif is", value);

				if (value === null) {
					setIsNotificationOn(false);
				} else {
					setIsNotificationOn(JSON.parse(value));
				}
			} catch (error) {
				console.log("Error retrieving notif:", error);
			}
		};

		getNotif();
	}, []);
	return (
		<Background>
			<View
				style={{
					backgroundColor: theme.colors.main,
				}}
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
							style={{
								color: theme.colors.surface,
							}}
							className="text-lg font-semibold"
						>
							SETTINGS
						</Text>
						<Ionicons
							name="settings-outline"
							size={20}
							color={theme.colors.surface}
						/>
					</View>
				</View>

				{/* PAGE */}
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
								APP SETTINGS
							</Text>

							{/* dark mode */}
							<View className="w-full flex-row items-center">
								<View
									style={{ backgroundColor: "#7C15FF" }}
									className="rounded-full p-2"
								>
									<Ionicons
										name="moon-sharp"
										size={20}
										color={theme.colors.surface}
									/>
								</View>
								<Text className="text-left text-gray-500 font-bold text-base ml-2">
									Dark Mode
								</Text>
								<Switch
									value={isDarkMode}
									onValueChange={() => {
										setIsDarkMode(!isDarkMode);
										updateMode(!isDarkMode);
									}}
									className="scale-125 ml-auto"
									color={isDarkMode && theme.colors.primary}
								/>
							</View>

							{/* notifications */}
							<View className="w-full flex-row items-center">
								<View
									style={{ backgroundColor: "#FC6766" }}
									className="rounded-full p-2 "
								>
									<Ionicons
										name="notifications"
										size={20}
										color={theme.colors.surface}
									/>
								</View>
								<Text className="text-left text-gray-500 font-bold text-base ml-2">
									Notifications
								</Text>
								<Switch
									value={isNotificationOn}
									onValueChange={() => {
										setIsNotificationOn(!isNotificationOn);
										updateNotif(!isNotificationOn);
									}}
									className="scale-125 ml-auto"
									color={isNotificationOn && theme.colors.primary}
								/>
							</View>
						</TouchableOpacity>
					)}
				</ScrollView>
			</View>
		</Background>
	);
};

export default SettingsScreen;
