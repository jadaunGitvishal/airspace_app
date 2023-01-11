import React from "react";
import { Image, Text, View } from "react-native";

export default function Slot({ reserved, name, active, ...props }) {
	return (
		<View>
			<View className="h-16 w-16 border-dashed border-r-2 border-l-2 border-black bg-slate-100">
				{reserved ? (
					<Image
						source={require("../../assets/car.png")}
						style={{
							flex: 1,
							width: null,
							height: null,
							resizeMode: "contain",
						}}
					/>
				) : (
					<View
						className={`h-full w-full flex-col items-center justify-center  ${
							active === true ? "bg-green-100" : "bg-slate-300"
						}`}
					>
						<Text className="text-base font-medium">{name}</Text>
					</View>
				)}
			</View>
		</View>
	);
}
