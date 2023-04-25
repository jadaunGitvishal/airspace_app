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
import { Ionicons, Octicons } from "@expo/vector-icons";

export default function HistoryScreen({ navigation }) {
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
							className=" text-lg font-semibold"
						>
							PARKING HISTORY
						</Text>
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
					<TouchableOpacity
						activeOpacity={1}
						className="h-full w-full p-6 pt-10 items-center"
					>
						{[1, 2, 3, 4, 5, 6].map(() => (
							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									backgroundColor: theme.colors.surface,
									shadowColor: theme.colors.shadow,
									elevation: 6,
									borderRadius: 15,
								}}
								className="w-full px-4 py-6 flex-col my-3"
							>
								<View className="flex-row justify-between items-center">
									<Text
										style={{ color: theme.colors.darker }}
										className="font-medium"
									>
										25-11-2022
									</Text>
									<Text
										style={{ color: theme.colors.darker }}
										className="font-medium"
									>
										Mon
									</Text>
								</View>

								<Text
									style={{ color: theme.colors.darker }}
									className="text-base font-medium uppercase"
								>
									COMSATS UNIVERSITY ISLAMABAD
								</Text>

								<Text
									style={{ color: theme.colors.darker }}
									className="text-base mt-2 uppercase"
								>
									- RIR 6798
								</Text>
								<Text
									style={{ color: theme.colors.darker }}
									className="text-base uppercase"
								>
									- 64A
								</Text>
								<Text
									style={{ color: theme.colors.darker }}
									className="text-base uppercase"
								>
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
