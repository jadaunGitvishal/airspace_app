import React from "react";
import MenuButton from "../Button/MenuButton";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BackButtonSimple from "../Button/BackButtonSimple";

const HeaderSimple = ({ goBack, name }) => {
	return (
		<>
			<View
				style={{ height: "8%" }}
				className="w-full h-16 px-4 bg-primary flex-row items-center justify-between"
			>
				<View className="w-1/3">
					<BackButtonSimple goBack={goBack} />
				</View>
				<Text className="w-2/3 text-surface text-lg font-semibold">{name}</Text>
			</View>
		</>
	);
};

export default HeaderSimple;
