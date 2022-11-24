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

const ParkingSpaces = ({ navigation }) => {
	return (
		<Background>
			<View className="h-full p-0 items-center bg-secondary">
				<HeaderSimple goBack={navigation.goBack} name={"Parking Spaces"} />
				<View
					style={{ height: "15%" }}
					className="w-full px-4 bg-surface shadow-sm shadow-text"
				>
					<TextInput
						label="Search"
						className="bg-surface h-10"
						// returnKeyType="done"
						// value={password.value}
						// onChangeText={(text) => setPassword({ value: text, error: "" })}
						// error={password.error}
						// errorText={password.error}
						// secureTextEntry
					/>

					<View className="ml-auto w-1/4 flex-row items-center justify-between rounded-md bg-secondary py-1 px-2">
						<Text className="font-semibold">Filters</Text>
						<Ionicons
							name="md-filter-outline"
							size={20}
							color={theme.colors.text}
						/>
					</View>
				</View>

				<ScrollView
					style={{ height: "77%" }}
					className="w-full flex-1 bg-transparent"
				>
					<TouchableOpacity activeOpacity={1}>
						<View className="h-full w-full p-4 pt-6 items-center">
							{[1, 2, 3, 4, 5, 6].map((x) => (
								<TouchableOpacity
									key={x}
									activeOpacity={0.95}
									className="h-40 p-5 mb-3 w-full rounded-xl bg-surface shadow-sm shadow-text flex-row"
									onPress={() => navigation.navigate("ParkingSpaceDetails")}
								>
									<View className="h-full w-1/3 flex items-center justify-center">
										<Image
											className="h-full w-full object-cover"
											source={require("../../assets/CUI_logo.jpg")}
										/>
									</View>

									<View className="h-full pl-4 w-2/3 flex justify-center items-start">
										<Text className="bg-primary text-surface font-semibold px-3 rounded-full">
											Name
										</Text>
										<Text className="ml-2 mt-1">
											Comsats University Islamabad
										</Text>
										<Text className="bg-primary text-surface font-semibold px-2 rounded-full mt-2">
											Location
										</Text>
										<Text className="ml-2 mt-1">
											Chattha Bakhtawar, Chak Shehzad, Islamabad{" "}
										</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
};

export default ParkingSpaces;
