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

const Sidebar = ({ navigation }) => {
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
						height: "25%",
					}}
					className="w-full h-16 p-4 pb-0 flex-col items-center"
					colors={["rgba(46, 199, 255,1)", "rgba(197, 81, 204,0.9)"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 10, y: 0 }}
				>
					{/* Top Row */}
					<View className="w-full flex-row items-center">
						<BackButtonSimple goBack={navigation.goBack} />
						{/* <MenuButton /> */}
					</View>

					{/* Middle Row */}
					<View
						style={{ letterSpacing: 1 }}
						className="w-full px-4 flex-row items-center justify-between"
					>
						<View>
							<Text className="text-white text-2xl font-semibold">
								My Account
							</Text>
							<Text className="text-white font-medium">
								PROFILE, SETTINGS & MORE
							</Text>
						</View>
						{/* <Ionicons name="apps" size={25} color={theme.colors.surface} /> */}
					</View>

					{/* Bottom Card */}
					<View className="h-32 w-full px-4 flex-row items-center justify-between mt-auto translate-y-16 z-50">
						<TouchableOpacity
							activeOpacity={1}
							style={{
								borderRadius: 20,
							}}
							className="h-full w-full bg-white shadow-2xl shadow-black flex-row items-center px-4"
						>
							<View
								onPress={() => {}}
								className="h-24 w-24 rounded-full overflow-hidden"
								style={{
									borderColor: theme.colors.bg0,
									borderColor: theme.colors.primary,
									// borderColor: "black",
									borderWidth: 2,
								}}
							>
								<Image
									style={
										{
											// 	flex: 1,
											// 	width: null,
											// 	height: null,
											// 	resizeMode: "contain",
											// borderRadius: "100%",
										}
									}
									className="w-full flex-1 object-contain"
									source={require("../assets/user.jpeg")}
								/>
							</View>

							<View className=" pl-4">
								<Text
									style={{
										color: theme.colors.primary,
									}}
									className="text-black text-base uppercase font-semibold"
								>
									ABDUL HAMEED
								</Text>
								<Text
									style={{
										color: theme.colors.primary,
									}}
									className="text-black text-sm uppercase font-semibold"
								>
									0343 2344665
								</Text>
								<Text
									style={{
										color: theme.colors.primary,
									}}
									className="text-black text-xs font-semibold"
								>
									abdulhameedkhan@gmail.com
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</LinearGradient>

				<TouchableOpacity
					activeOpacity={1}
					style={{
						height: "75%",
						// borderTopRightRadius: 30,
						// borderTopLeftRadius: 30,
					}}
					className="w-full p-6 pt-20 items-center flex-1 flex-col bg-white"
				>
					{/* settings */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("Settings")}
					>
						<View
							style={{ backgroundColor: "#F6F6F6" }}
							className="rounded-full p-2"
						>
							<Ionicons
								name="settings-outline"
								size={25}
								color={theme.colors.bg0}
							/>
						</View>
						<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
							SETTINGS
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={"#BDBDBD"} />
						</View>
					</TouchableOpacity>

					{/* account */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("AccountSettings")}
					>
						<View
							style={{ backgroundColor: "#F6F6F6" }}
							className="rounded-full p-2"
						>
							<MaterialIcons
								name="person-outline"
								size={25}
								color={theme.colors.bg0}
							/>
						</View>
						<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
							ACCOUNT
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={"#BDBDBD"} />
						</View>
					</TouchableOpacity>

					{/* password */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("UpdatePassword")}
					>
						<View
							style={{ backgroundColor: "#F6F6F6" }}
							className="rounded-full p-2"
						>
							<MaterialCommunityIcons
								name="form-textbox-password"
								size={25}
								color={theme.colors.bg0}
							/>
						</View>
						<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
							PASSWORD
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={"#BDBDBD"} />
						</View>
					</TouchableOpacity>

					{/* password */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center my-3"
						onPress={() => navigation.navigate("History")}
					>
						<View
							style={{ backgroundColor: "#F6F6F6" }}
							className="rounded-full p-2"
						>
							<MaterialCommunityIcons
								name="history"
								size={25}
								color={theme.colors.bg0}
							/>
						</View>
						<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
							HISTORY
						</Text>
						<View className="ml-auto">
							<AntDesign name="right" size={20} color={"#BDBDBD"} />
						</View>
					</TouchableOpacity>

					{/* logout */}
					<TouchableOpacity
						activeOpacity={0.9}
						className="w-full flex-row items-center mb-3 mt-auto"
						onPress={() => {}}
					>
						<View
							style={{ backgroundColor: "#F6F6F6" }}
							className="rounded-full p-2"
						>
							<AntDesign name="logout" size={25} color={theme.colors.bg0} />
						</View>
						<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
							LOGOUT
						</Text>
					</TouchableOpacity>
				</TouchableOpacity>
			</View>
		</Background>
	);
};

export default Sidebar;
