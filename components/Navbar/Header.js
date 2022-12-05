import React from "react";
import MenuButton from "../Button/ProfileButton";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
	return (
		<>
			<View className="w-full px-3 py-2 bg-primary flex-row items-center justify-between">
				<MenuButton size={40} />
				<Text className="text-surface text-lg font-semibold">Air Space</Text>
				<Ionicons name="md-notifications-outline" size={30} color="white" />
			</View>
		</>
	);
};

export default Header;
