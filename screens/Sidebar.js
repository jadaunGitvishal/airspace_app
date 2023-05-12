import React, { useState } from "react";
import Background from "../components/Background";
import BackButtonSimple from "../components/Button/BackButtonSimple";
import {
	Image,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	AntDesign,
	MaterialIcons,
	Ionicons,
	MaterialCommunityIcons,
	SimpleLineIcons,
} from "@expo/vector-icons";
import { theme } from "../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import * as api from "../api/userRequests";
import {
	logOut,
	selectUser,
	useDispatch,
	useSelector,
} from "../features/userSlice";

const Sidebar = ({ navigation }) => {
	const dispatch = useDispatch();
	const { user, loading } = useSelector(selectUser);

	async function handleLogout(params) {
		try {
			const { data } = await api.logoutUser();
			console.log(data);
			dispatch(logOut());
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Background>
			<View
				style={{ backgroundColor: theme.colors.surface }}
				className="h-full w-full"
			>
				{/* HEADER */}
				<View
					style={{
						height: "25%",
						backgroundColor: theme.colors.main,
					}}
					className="w-full h-16 p-4 pb-0 flex-col items-center relative"
				>
					{/* Top Row */}
					<View className="w-full flex-row items-center">
						<BackButtonSimple goBack={navigation.goBack} />
					</View>

					{/* Middle Row */}
					<View
						style={{ letterSpacing: 1 }}
						className="w-full px-4 flex-row items-center justify-between mt-2"
					>
						<View>
							<Text
								style={{ color: theme.colors.surface }}
								className="text-2xl font-semibold"
							>
								My Account
							</Text>
							<Text
								style={{ color: theme.colors.surface }}
								className="font-medium"
							>
								PROFILE, SETTINGS & MORE
							</Text>
						</View>
						{/* <Ionicons name="apps" size={25} color={theme.colors.surface} /> */}
					</View>

					{/* Bottom Card */}
					<View
						className="h-32 w-full 
						px-4 
						flex-row items-center justify-between 
						absolute 
						bottom-0 translate-y-16"
					>
						<TouchableOpacity
							activeOpacity={1}
							style={{
								elevation: 5,
								shadowColor: theme.colors.shadow,
								borderRadius: 15,
								backgroundColor: theme.colors.surface,
							}}
							className="h-full w-full flex-row items-center px-4"
						>
							<View
								onPress={() => {}}
								className="h-20 w-20 rounded-full overflow-hidden"
								style={{
									backgroundColor: theme.colors.bg1,
									borderColor: theme.colors.main,
									borderWidth: 0,
									elevation: 5,
								}}
							>
								<Image
									// style={{
									// 	flex: 1,
									// 	width: null,
									// 	height: null,
									// 	resizeMode: "contain",
									// }}
									className="w-full flex-1 object-contain bg-gray-400"
									source={{ uri: user?.user?.image?.url }}
								/>
							</View>

							<View className=" pl-4">
								<Text
									style={{
										color: theme.colors.darkest,
									}}
									className="text-black text-base uppercase font-semibold"
								>
									{user?.user?.name}
								</Text>
								<Text
									style={{
										color: theme.colors.darkest,
									}}
									className="text-black text-sm uppercase font-semibold"
								>
									{user?.user?.phone}
								</Text>
								<Text
									style={{
										color: theme.colors.darkest,
									}}
									className="text-black text-xs font-semibold"
								>
									{user?.user?.email}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity
					activeOpacity={1}
					style={{
						height: "75%",
					}}
					className="w-full p-6 pt-20 items-center flex-1 flex-col"
				>
					{/* settings */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("Settings")}
					>
						<View
							style={{ backgroundColor: theme.colors.bg1 }}
							className="rounded-full p-2"
						>
							<Ionicons
								name="settings-outline"
								size={25}
								color={theme.colors.main}
							/>
						</View>
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left font-bold text-base ml-3 uppercase"
						>
							SETTINGS
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={theme.colors.dark} />
						</View>
					</TouchableOpacity>

					{/* account */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("AccountSettings")}
					>
						<View
							style={{ backgroundColor: theme.colors.bg1 }}
							className="rounded-full p-2"
						>
							<MaterialIcons
								name="person-outline"
								size={25}
								color={theme.colors.main}
							/>
						</View>
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left font-bold text-base ml-3 uppercase"
						>
							ACCOUNT
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={theme.colors.dark} />
						</View>
					</TouchableOpacity>

					{/* vehicles */}
					{/* <TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("Vehicles")}
					>
						<View
							style={{ backgroundColor: theme.colors.bg1 }}
							className="rounded-full p-2"
						>
							<Ionicons
								name="car-sport-outline"
								size={25}
								color={theme.colors.main}
							/>
						</View>
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left font-bold text-base ml-3 uppercase"
						>
							VEHICLES
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={theme.colors.dark} />
						</View>
					</TouchableOpacity> */}

					{/* query */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("Query")}
					>
						<View
							style={{ backgroundColor: theme.colors.bg1 }}
							className="rounded-full p-2"
						>
							<Ionicons
								name="chatbox-ellipses-outline"
								size={25}
								color={theme.colors.main}
							/>
						</View>
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left font-bold text-base ml-3 uppercase"
						>
							QUERY
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={theme.colors.dark} />
						</View>
					</TouchableOpacity>

					{/* history */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("History")}
					>
						<View
							style={{ backgroundColor: theme.colors.bg1 }}
							className="rounded-full p-2"
						>
							<MaterialCommunityIcons
								name="history"
								size={25}
								color={theme.colors.main}
							/>
						</View>
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left font-bold text-base ml-3 uppercase"
						>
							HISTORY
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={theme.colors.dark} />
						</View>
					</TouchableOpacity>

					{/* logout */}
					<TouchableOpacity
						activeOpacity={0.8}
						className="w-full flex-row items-center mb-3 mt-auto"
						onPress={() => handleLogout()}
					>
						<View
							style={{ backgroundColor: theme.colors.bg1 }}
							className="rounded-full p-2"
						>
							<AntDesign name="logout" size={25} color={theme.colors.main} />
						</View>
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left font-bold text-base ml-3 uppercase"
						>
							LOGOUT
						</Text>
					</TouchableOpacity>
				</TouchableOpacity>
			</View>
		</Background>
	);
};

export default Sidebar;
