import React, { useState } from "react";
import Background from "../components/Background";
import BackButtonSimple from "../components/Button/BackButtonSimple";
import {
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import {
	AntDesign,
	MaterialIcons,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function PaymentsScreen({ navigation }) {
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
							style={{
								color: theme.colors.surface,
							}}
							className=" text-lg font-semibold"
						>
							PAYMENTS
						</Text>
						<Ionicons
							name="card-outline"
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
							YOUR PAYMENT DATA
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}
