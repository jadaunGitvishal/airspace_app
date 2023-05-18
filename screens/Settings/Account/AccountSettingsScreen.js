import React, { useState } from "react";
import Background from "../../../components/Background";
import BackButtonSimple from "../../../components/Button/BackButtonSimple";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import {
	AntDesign,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function AccountSettingsScreen({ navigation }) {
	const theme = useTheme();
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
							className="text-lg font-semibold"
						>
							ACCOUNT
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
					<TouchableOpacity
						activeOpacity={1}
						className="h-full w-full p-6 pt-10 items-center"
					>
						<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300 uppercase">
							ACCOUNT SETTINGS
						</Text>

						{/* personal */}
						<TouchableOpacity
							activeOpacity={0.9}
							className="w-full flex-row items-center my-3"
							onPress={() => navigation.navigate("UpdatePersonal")}
						>
							<View
								style={{ backgroundColor: theme.colors.bg1 }}
								className="rounded-full p-2"
							>
								<Ionicons
									name="person-outline"
									size={25}
									color={theme.colors.main}
								/>
							</View>
							<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
								PERSONAL
							</Text>
							<View className="ml-auto">
								<AntDesign name="right" size={20} color={theme.colors.dark} />
							</View>
						</TouchableOpacity>

						{/* photo */}
						<TouchableOpacity
							activeOpacity={0.9}
							className="w-full flex-row items-center my-3"
							onPress={() => navigation.navigate("UpdatePhoto")}
						>
							<View
								style={{ backgroundColor: theme.colors.bg1 }}
								className="rounded-full p-2"
							>
								<Ionicons
									name="image-outline"
									size={25}
									color={theme.colors.main}
								/>
							</View>
							<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
								PHOTO
							</Text>
							<View className="ml-auto">
								<AntDesign name="right" size={20} color={theme.colors.dark} />
							</View>
						</TouchableOpacity>

						{/* password */}
						<TouchableOpacity
							activeOpacity={0.9}
							className="w-full flex-row items-center my-3"
							onPress={() => navigation.navigate("UpdatePassword")}
						>
							<View
								style={{ backgroundColor: theme.colors.bg1 }}
								className="rounded-full p-2"
							>
								<MaterialCommunityIcons
									name="form-textbox-password"
									size={25}
									color={theme.colors.main}
								/>
							</View>
							<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
								PASSWORD
							</Text>
							<View className="ml-auto">
								<AntDesign name="right" size={20} color={theme.colors.dark} />
							</View>
						</TouchableOpacity>

						{/* biometric login */}
						<TouchableOpacity
							activeOpacity={0.9}
							className="w-full flex-row items-center my-3"
						>
							<View
								style={{ backgroundColor: theme.colors.bg1 }}
								className="rounded-full p-2"
							>
								<MaterialCommunityIcons
									name="fingerprint"
									size={25}
									color={theme.colors.main}
								/>
							</View>
							<Text className="text-left text-gray-500 font-bold text-base ml-3 uppercase">
								BIOMETRIC LOGIN
							</Text>
							<View className="ml-auto">
								<AntDesign name="right" size={20} color={theme.colors.dark} />
							</View>
						</TouchableOpacity>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}
