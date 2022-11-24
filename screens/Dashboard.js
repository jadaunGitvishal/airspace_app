import React from "react";
import Background from "../components/Background";
import Heading from "../components/Text/Heading";
import Paragraph from "../components/Text/Paragraph";
import Button from "../components/Button/Button";
import {
	Image,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { theme } from "../core/theme";
import Header from "../components/Navbar/Header";
import Ionicons from "@expo/vector-icons/Ionicons";

const Dashboard = ({ navigation }) => {
	return (
		<Background>
			<View className="h-full p-0 items-center">
				<Header />
				<View className="h-full w-full items-center flex-1">
					{/* Top */}
					<View
						style={{ height: "22%" }}
						className="w-full p-4 items-center justify-center bg-primary "
					>
						<View className="h-full bg-surface rounded-xl flex-row justify-between py-4">
							<View className="h-full w-1/3 border-r">
								<Image
									source={require("../assets/car.png")}
									style={styles.image}
								/>
							</View>

							<View className=" w-1/3 items-start pl-3 justify-between">
								<Text className=" text-sm text-center">White</Text>
								<Text className=" text-sm text-center">Honda Civic</Text>
								<Text className=" text-sm text-center">2020</Text>
								<Text className=" text-sm text-center">RIR 6798</Text>
							</View>

							<View className=" w-1/3 items-start pl-3 justify-between border-l">
								<Text className=" text-sm text-center">Comsats Park...</Text>
								<Text className=" text-sm text-center">D Block</Text>
								<Text className=" text-sm text-center">Slot 13</Text>
								<Text className=" text-sm text-center">Paid</Text>
							</View>
						</View>
					</View>

					<ScrollView style={{ height: "78%" }} className="w-full flex-1">
						<TouchableOpacity activeOpacity={1}>
							{/* Center */}
							<View className="w-full bg-secondary">
								<Text className="w-full pt-4 text-center text-lg font-semibold">
									Get Parking Details
								</Text>
								<View className="w-full pt-5 pb-10 flex-row flex-wrap items-center justify-around ">
									<TouchableOpacity
										activeOpacity={0.95}
										className="w-28 h-28 p-2 rounded-xl items-center justify-center bg-surface shadow-sm shadow-text"
										onPress={() => navigation.navigate("ParkingSpaces")}
									>
										<View className="h-1/2 flex justify-end p-0 items-end">
											<Ionicons name="car-sharp" size={45} color={"black"} />
										</View>
										<View className="h-1/2 flex justify-center items-center">
											<Text className="text-xs font-bold bg-primary text-surface px-2 py-1 rounded-full">
												Parkings
											</Text>
										</View>
									</TouchableOpacity>

									<TouchableOpacity
										activeOpacity={0.95}
										className="w-28 h-28 p-2 rounded-xl items-center justify-center bg-surface shadow-sm shadow-text"
										onPress={() => navigation.navigate("RegisterParkingSpace")}
									>
										<View className="h-1/2 flex justify-end p-0 items-end">
											<Ionicons name="car-sharp" size={45} color={"black"} />
										</View>
										<View className="h-1/2 flex justify-center items-center">
											<Text className="text-xs font-bold bg-primary text-surface px-2 py-1 rounded-full">
												Subscriptions
											</Text>
										</View>
									</TouchableOpacity>

									<TouchableOpacity
										activeOpacity={0.95}
										className="w-28 h-28 p-2 rounded-xl items-center justify-center bg-surface shadow-sm shadow-text"
										onPress={() => navigation.navigate("ParkingSpaces")}
									>
										<View className="h-1/2 flex justify-end p-0 items-end">
											<Ionicons name="car-sharp" size={45} color={"black"} />
										</View>
										<View className="h-1/2 flex justify-center items-center">
											<Text className="text-xs font-bold bg-primary text-surface px-2 py-1 rounded-full">
												Timings
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>

							{/* Bottom */}
							<View className="w-full bg-background relative">
								<View className="w-full absolute -top-3 left-0 flex items-center justify-center ">
									<Text className="text-center rounded-full px-4 font-semibold border border-primary bg-surface">
										Manage Your Account
									</Text>
								</View>
								<View className="w-full p-4 pt-8 flex-row justify-around flex-wrap ">
									{/* Parking Spaces */}
									{[
										1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
										18,
									].map((x) => (
										<View className="items-center w-1/3 my-2" key={x}>
											<Ionicons
												name="car-outline"
												size={30}
												color={theme.colors.primary}
											/>
											<Text className="text-xs font-bold">Parking</Text>
											<Text className="text-xs font-bold">Spaces</Text>
										</View>
									))}
								</View>
							</View>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</View>
		</Background>
	);
};

export default Dashboard;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain",
	},
});

// <Button
// 	mode="outlined"
// 	onPress={() =>
// 		navigation.reset({
// 			index: 0,
// 			routes: [{ name: "StartScreen" }],
// 		})
// 	}
// >
// 	Logout
// </Button>
