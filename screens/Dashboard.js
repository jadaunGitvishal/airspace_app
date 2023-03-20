import React, { useState } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Background from "../components/Background";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileButton from "../components/Button/ProfileButton";
import * as Progress from "react-native-progress";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

const Dashboard = ({ navigation }) => {
	const Tab = createBottomTabNavigator();
	const theme = useTheme();

	var countDownDate = new Date("Mar 22, 2023 17:30:30").getTime();
	const [time, setTime] = useState("");
	var x = setInterval(function () {
		var now = new Date().getTime();
		var distance = countDownDate - now;

		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

		if (distance < 0) {
			clearInterval(x);
			// document.getElementById("demo").innerHTML = "EXPIRED";
			setTime("Ended");
		}
	}, 1000);

	return (
		<Background>
			<View className="h-full w-full items-center flex-1 relative">
				{/* HEADER */}
				<LinearGradient
					style={{
						paddingTop: StatusBar.currentHeight + 10,
						height: "60%",
						// borderBottomRightRadius: 500,
						// borderBottomLeftRadius: 500,
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center justify-between"
					// colors={["rgba(46, 199, 255,1)", "rgba(197, 81, 204,0.9)"]}
					colors={[theme.colors.bg0, theme.colors.bg1]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0.5, y: 1 }}
				>
					{/* First Row */}
					<View className="w-full flex-row items-center justify-between">
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => navigation.navigate("Sidebar")}
							className="w-12  flex-row justify-start"
						>
							<ProfileButton size={40} />
						</TouchableOpacity>

						<Text
							style={{ letterSpacing: 1 }}
							className="text-white text-xl uppercase font-semibold"
						>
							Air Space
						</Text>

						<TouchableOpacity
							activeOpacity={1}
							onPress={() => navigation.navigate("Notifications")}
							className="w-12 flex-row justify-end"
						>
							<Ionicons
								name="notifications-outline"
								color={"white"}
								size={27}
							/>
						</TouchableOpacity>
					</View>
				</LinearGradient>

				{/* Second Row */}
				<TouchableOpacity
					activeOpacity={1}
					style={{
						height: "75%",
						width: "90%",
						borderWidth: 2,
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.bg0,
						borderRadius: 30,
						position: "absolute",
						top: "17%",

						shadowColor: theme.colors.shadow,
						shadowOffset: { height: 1, width: 1 },
						shadowOpacity: 1,
						shadowRadius: 1,
						elevation: 10,
					}}
					className="flex-col px-4 py-10 items-center justify-between"
				>
					{/* circle */}
					<View>
						<Text
							style={{ color: theme.colors.primary }}
							className="text-xl break-words font-semibold text-center mb-4"
						>
							Comsats University Islamabad
						</Text>
						<Progress.Circle
							size={200}
							indeterminate={false}
							progress={0.8}
							className="flex-row justify-center items-center relative rotate-180"
							animated={true}
							color={theme.colors.gray500}
							unfilledColor={theme.colors.secondary}
							borderWidth={0}
							thickness={8}
							strokeCap={"round"}
						>
							<View className="h-2/3 w-1/3 absolute rotate-180">
								<Image
									source={require("../assets/car.png")}
									style={{
										flex: 1,
										width: null,
										height: null,
										resizeMode: "contain",
									}}
								/>
							</View>
						</Progress.Circle>
					</View>

					{/* time */}
					<View>
						<Text
							style={{ color: theme.colors.primary }}
							className="text-lg break-words font-medium text-center"
						>
							Parking Time
						</Text>
						<Text
							style={{ color: theme.colors.gray500 }}
							className="text-xl font-medium text-center mt-3"
						>
							{time}
						</Text>
					</View>

					{/* info */}
					<View className="w-full flex-row justify-evenly items-center">
						<View>
							<Text
								style={{ color: theme.colors.primary }}
								className="text-lg break-words font-medium text-center"
							>
								Car No
							</Text>
							<Text
								style={{ color: theme.colors.gray500 }}
								className="text-3xl font-medium text-center mt-2"
							>
								RIR 6798
							</Text>
						</View>
						<View>
							<Text
								style={{ color: theme.colors.primary }}
								className="text-lg break-words font-medium text-center"
							>
								Parking Slot
							</Text>
							<Text
								style={{ color: theme.colors.gray500 }}
								className="text-3xl font-medium text-center mt-2"
							>
								6
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</Background>
	);
};

export default Dashboard;

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
