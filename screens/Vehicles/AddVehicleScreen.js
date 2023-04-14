import React, { useState } from "react";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import {
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Octicons } from "@expo/vector-icons";

export default function AddVehicleScreen({ navigation }) {
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
						<Text className="text-white text-lg font-semibold">
							Add Vehicles
						</Text>
					</View>
				</LinearGradient>

				{/* PAGE */}
				<ScrollView
					style={{
						height: "85%",
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
					}}
					className="w-full bg-white"
				>
					<TouchableOpacity
						activeOpacity={1}
						className="h-full w-full p-6 pt-10 items-center"
					>
						{[1, 2, 3, 4, 5, 6].map(() => (
							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									backgroundColor: theme.colors.secondary,
								}}
								className="w-full px-7 py-3 shadow-md shadow-black rounded-lg my-3"
							>
								<View className="flex-row justify-between items-center">
									<Text className="text-gray-500 font-medium">25-11-2022</Text>
									<Text className="text-gray-500 font-medium">Mon</Text>
								</View>

								<Text className="text-base text-gray-500 font-medium uppercase">
									COMSATS UNIVERSITY ISLAMABAD
								</Text>

								<Text className="text-base text-gray-500 mt-2 uppercase">
									- RIR 6798
								</Text>
								<Text className="text-base text-gray-500 uppercase">- 64A</Text>
								<Text className="text-base text-gray-500 uppercase">
									- 08:40AM - 02:30PM
								</Text>
							</TouchableOpacity>
						))}
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}
