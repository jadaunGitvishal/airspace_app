import React from "react";
import MenuButton from "../Button/MenuButton";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BackButtonSimple from "../Button/BackButtonSimple";
import { theme } from "../../core/theme";
import { TextInput as PaperInput } from "react-native-paper";

export default function HeaderSimple({ goBack, name }) {
	return (
		<>
			<LinearGradient
				style={{
					paddingTop: StatusBar.currentHeight + 10,
					height: "35%",
					borderBottomRightRadius: 30,
					borderBottomLeftRadius: 30,
				}}
				className="w-full h-16 p-4 flex-col items-center justify-between"
				colors={["rgba(46, 199, 255,1)", "rgba(197, 81, 204,0.9)"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0.75, y: 1.5 }}
			>
				<View className="w-full flex-row items-center justify-between">
					<BackButtonSimple goBack={goBack} />
					<MenuButton />
				</View>
				<Text className="text-surface text-2xl mr-auto font-semibold">
					{name}
				</Text>

				<View className="w-full mb-3">
					<PaperInput
						style={{
							backgroundColor: theme.colors.accent,
							borderColor: theme.colors.surface,
							borderWidth: 1,
						}}
						className={"h-10 rounded-md text-surface"}
						selectionColor={theme.colors.primary}
						underlineColor="transparent"
						mode="flat"
						placeholder="Search"
						placeholderTextColor={theme.colors.surface}
						onChangeText={(text) => {}}
					/>

					<View className="flex-row mt-3">
						<Pressable
							style={{ backgroundColor: theme.colors.accent }}
							className="flex-row items-center justify-between rounded-md py-3 px-4 mr-5"
						>
							<Text className="font-semibold text-surface">All</Text>
						</Pressable>

						<Pressable
							style={{ backgroundColor: theme.colors.accent }}
							className="flex-row items-center justify-between rounded-md py-3 px-4 mr-auto"
						>
							<Text className="font-semibold text-surface">Registered</Text>
						</Pressable>

						<Pressable
							style={{ backgroundColor: theme.colors.accent }}
							className="flex-row items-center justify-between rounded-md py-3 px-4"
						>
							<Text className="font-semibold mr-4 text-surface">Filters</Text>
							<Ionicons
								name="md-filter-outline"
								size={20}
								color={theme.colors.surface}
							/>
						</Pressable>
					</View>
				</View>
			</LinearGradient>
		</>
	);
}
