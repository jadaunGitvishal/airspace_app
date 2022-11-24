import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import Button from "../../components/Button/Button";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import TextInput from "../../components/Input/TextInput";
import Heading from "../../components/Text/Heading";
import Ionicons from "@expo/vector-icons/Ionicons";
import HeaderSimple from "../../components/Navbar/HeaderSimple";
import { theme } from "../../core/theme";

export const ParkingSpaceDetails = ({ navigation }) => {
	return (
		<Background>
			<View className="h-full p-0 items-center bg-secondary">
				<HeaderSimple goBack={navigation.goBack} name={"CUI Parking Info"} />
				<View
					style={{ height: "92%" }}
					className="h-full w-full p-4 pt-6 items-center justify-center"
				>
					<View className="w-full p-4 my-3 rounded-lg bg-surface shadow-sm shadow-text">
						<View className="flex-row items-center my-1">
							<Ionicons
								name="home-outline"
								size={30}
								color={theme.colors.primary}
							/>
							<Text className="ml-2 font-semibold">
								Comsats University Islamabad{" "}
							</Text>
						</View>

						<View className="flex-row items-center my-1">
							<Ionicons
								name="location-outline"
								size={30}
								color={theme.colors.primary}
							/>
							<Text className="ml-2 font-semibold">
								Chattha Bakhtawar, Chak Shehzad, Islamabad{" "}
							</Text>
						</View>

						<View className="flex-row items-center my-1">
							<Ionicons
								name="time-outline"
								size={30}
								color={theme.colors.primary}
							/>
							<Text className="ml-2 font-semibold">7:00 AM - 9:00 PM</Text>
						</View>

						<View className="border-t-2 border-t-secondary my-5 mx-5"></View>

						<View className="w-3/4 mx-auto flex-row items-center justify-center my-2 px-5 py-3 bg-primary rounded-full">
							<Ionicons
								name="cube-outline"
								size={40}
								color={theme.colors.surface}
							/>
							<Text className="ml-2 text-surface font-semibold text-lg">
								4 Parking Blocks
							</Text>
						</View>

						<View className="w-3/4 mx-auto flex-row items-center justify-center my-2 px-5 py-3 bg-primary rounded-full">
							<Ionicons
								name="flag-outline"
								size={40}
								color={theme.colors.surface}
							/>
							<Text className="ml-2 text-surface font-semibold text-lg">
								123 Parking Slots
							</Text>
						</View>

						<View className="w-3/4 mx-auto flex-row items-center justify-center my-2 px-5 py-3 bg-primary rounded-full">
							<Ionicons
								name="pricetags-outline"
								size={40}
								color={theme.colors.surface}
							/>
							<Text className="ml-2 text-surface font-semibold text-lg">
								80 Free Parking Slots
							</Text>
						</View>

						<View className="w-3/4 mx-auto flex-row items-center justify-center my-2 px-5 py-3 bg-primary rounded-full">
							<Ionicons
								name="pricetags-outline"
								size={40}
								color={theme.colors.surface}
							/>
							<Text className="ml-2 text-surface font-semibold text-lg">
								43 Paid Parking Slots
							</Text>
						</View>

						<View className="border-t-2 border-t-secondary my-5 mx-5"></View>

						<Button
							mode="outlined"
							onPress={() => navigation.navigate("RegisterParkingSpace")}
						>
							Register
						</Button>
					</View>
				</View>
			</View>
		</Background>
	);
};
