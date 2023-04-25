import React, { useState } from "react";
import Background from "../components/Background";
import MenuButton from "../components/Button/MenuButton";
import BackButtonSimple from "../components/Button/BackButtonSimple";
import Button from "../components/Button/Button";
import TextInput from "../components/Input/TextInput";
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

export default function NotificationsScreen({ navigation }) {
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
							style={{ color: theme.colors.surface }}
							className="text-lg font-semibold"
						>
							NOTIFICATIONS
						</Text>
						<Octicons name="bell" size={20} color={theme.colors.surface} />
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
					showsVerticalScrollIndicator={false}
					className="w-full "
				>
					<TouchableOpacity
						activeOpacity={1}
						className="h-full w-full p-6 pt-10 items-center"
					>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
							<TouchableOpacity
								key={x}
								activeOpacity={0.8}
								style={{
									backgroundColor: theme.colors.surface,
									shadowColor: theme.colors.shadow,
									elevation: 6,
									borderRadius: 15,
								}}
								className="w-full px-4 py-6 flex-row items-center my-3"
							>
								<Octicons
									name="dot-fill"
									color={theme.colors.darker}
									size={20}
								/>
								<Text
									style={{ color: theme.colors.dark }}
									className="text-base ml-3 w-2/3"
								>
									Your free trial is expired.
								</Text>

								<Text
									style={{ color: theme.colors.darker }}
									className="ml-auto"
								>
									10:21AM
								</Text>
							</TouchableOpacity>
						))}
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}
