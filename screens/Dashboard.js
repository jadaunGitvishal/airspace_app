import React, { useEffect, useState } from "react";
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
import ProfileButton from "../components/Button/ProfileButton";
import * as Progress from "react-native-progress";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import {
	Ionicons,
	MaterialIcons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";

const Dashboard = ({ navigation }) => {
	const theme = useTheme();
	// const Tab = createBottomTabNavigator();
	const [dashboardData, setDashboardData] = useState({});
	const [userData, setUserData] = useState({});

	const [time, setTime] = useState("00:00:00");
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const data = {
				from: "08:15",
				to: "05:45",
				ps: "Comsats University Islamabad",
				vehicle: "White Toyota Corolla",
				number: "RIR 6798",
				slot: 17,
				package: "One Day Package",
				days: 1,
				bookingFrom: "25-03-2023",
				bookingTo: "25-04-2023",
				timeLeft: "14",
				// discount: "10",
			};

			const user = {
				name: "Abdul Haseeb",
				email: "abdulhaseeb2115@gmail.com",
				bookings: 20,
			};

			setDashboardData(data);
			setUserData(user);
		}

		fetchData();

		function calculateTime() {
			// get time
			function getTime(str) {
				var now = new Date();
				const [hours, minutes] = str.split(":").map(Number);
				var time = new Date(
					now.getFullYear(),
					now.getMonth(),
					now.getDate(),
					parseInt(hours),
					parseInt(minutes),
					0
				);

				return time;
			}
			const startTime = "07:30";
			const endTime = "17:30";
			const start = getTime(startTime);
			const target = getTime(endTime);

			const timeInterval = setInterval(() => {
				var now = new Date();
				if (now > target) {
					target.setDate(target.getDate() + 1);
					setProgress(1);
					setTime("Finished");
					clearInterval(timeInterval);
				}
				var diff = target - now;

				setProgress((start - now) / (start - target));

				var h = Math.floor(diff / (1000 * 60 * 60));
				var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				var s = Math.floor((diff % (1000 * 60)) / 1000);

				setTime(
					`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
						.toString()
						.padStart(2, "0")}`
				);
			}, 1000);
		}

		calculateTime();
	}, []);

	return (
		<Background>
			<View className="h-full w-full flex-1 relative p- flex-col items-center justify-between">
				{/* Navbar */}
				<View
					style={{ backgroundColor: theme.colors.main }}
					className="w-full flex-col items-center justify-between p-4"
				>
					<View className="w-full flex-row items-center justify-between">
						{/* logo */}
						<View className="flex-row items-end py-1 rounded-full">
							<View className="h-8 w-8">
								<Image
									source={require("../assets/airspaceLogoWhite.png")}
									style={{
										flex: 1,
										width: null,
										height: null,
										resizeMode: "contain",
									}}
								/>
							</View>
							<Text
								style={{ color: theme.colors.surface }}
								className="text-lg uppercase font-black flex"
							>
								ir Space
							</Text>
						</View>

						{/* notifications */}
						<TouchableOpacity
							activeOpacity={1}
							style={{
								elevation: 1,
								backgroundColor: theme.colors.greenBg,
							}}
							className="ml-auto rounded-full h-8 aspect-square flex-row items-center justify-center"
							onPress={() => navigation.navigate("Notifications")}
						>
							<Ionicons
								name="notifications-outline"
								color={theme.colors.green}
								size={20}
							/>
						</TouchableOpacity>

						{/* account */}
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => navigation.navigate("Sidebar")}
							className="ml-2 rounded-full"
							style={{
								elevation: 5,
							}}
						>
							<ProfileButton size={40} />
						</TouchableOpacity>
					</View>

					<View className="w-full flex-row items-center mt-5">
						<View
							style={{ backgroundColor: theme.colors.surface }}
							className="rounded-full p-1"
						>
							<MaterialIcons
								name="star"
								size={20}
								color={
									userData.bookings >= 50
										? "gold"
										: userData.bookings >= 20
										? "silver"
										: "#cd7f32"
								}
							/>
						</View>

						<View className="w-full">
							<Text
								style={{
									color: theme.colors.surface,
								}}
								className="text-xl font-bold pl-2 capitalize"
							>
								{userData.name}
							</Text>
							<Text
								style={{ color: theme.colors.surface }}
								className="text-sm pl-2"
							>
								{userData.email}
							</Text>
						</View>
					</View>
				</View>

				{/* Data */}
				<ScrollView
					showsVerticalScrollIndicator={false}
					className="flex-1 w-full"
				>
					{/* Booking Data */}
					<TouchableOpacity
						activeOpacity={1}
						className="flex-col items-center w-full p-4"
					>
						{/* circle & time */}
						<View
							style={
								{
									// elevation: 2,
									// borderRadius: 10,
									// backgroundColor: theme.colors.surface,
								}
							}
							className="flex-col items-center w-full mt-6"
						>
							{/* circle */}
							<Progress.Circle
								size={260}
								// indeterminate={true}
								progress={progress}
								animated={true}
								borderWidth={1}
								thickness={8}
								// strokeCap={"round"}
								color={theme.colors.main}
								unfilledColor={theme.colors.bg1}
								className="flex-row justify-center items-center relative rotate-180 mt-5"
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

							{/* time */}
							<View className="mt-5">
								<Text
									style={{ color: theme.colors.darkest }}
									className="text-lg break-words text-center"
								>
									Time Left
								</Text>
								<Text
									style={{ color: theme.colors.darkest }}
									className="text-5xl font-bold text-center"
								>
									{time}
								</Text>
							</View>
						</View>

						{/* parking details */}
						<View
							style={{
								elevation: 5,
								shadowColor: theme.colors.shadow,
								borderRadius: 15,
								backgroundColor: theme.colors.surface,
							}}
							className="flex-col w-full mt-16 p-6"
						>
							{/* heading */}
							<Text
								style={{ color: theme.colors.darker }}
								className="text-base font-medium uppercase"
							>
								Parking Space
							</Text>

							{/* ps */}
							<View className="flex-row mt-6 items-center">
								<View
									style={{ backgroundColor: theme.colors.bg1 }}
									className="h-7 aspect-square rounded-md flex-row items-center justify-center"
								>
									<MaterialCommunityIcons
										name="office-building-marker"
										color={theme.colors.main}
										size={20}
									/>
								</View>

								<Text
									style={{ color: theme.colors.dark }}
									className="text-lg ml-2 capitalize"
								>
									Comsats University Islamabad
								</Text>
							</View>

							{/* vehicle */}
							<View className="flex-row mt-1 items-center">
								<View
									style={{ backgroundColor: theme.colors.bg1 }}
									className="h-7 aspect-square rounded-md flex-row items-center justify-center"
								>
									<Ionicons
										name="car-outline"
										size={24}
										color={theme.colors.main}
									/>
								</View>

								<Text
									style={{ color: theme.colors.dark }}
									className="text-lg ml-2 capitalize"
								>
									White Toyota Corolla
								</Text>
							</View>

							{/* number & slot */}
							<View className="flex-row items-center mt-1">
								{/* number */}
								<View className="flex-row">
									<View
										style={{ backgroundColor: theme.colors.bg1 }}
										className="h-7 aspect-square rounded-md flex-row items-center justify-center"
									>
										<Text
											style={{ color: theme.colors.main }}
											className="text-xl font-bold"
										>
											#
										</Text>
									</View>

									<Text
										style={{ color: theme.colors.dark }}
										className="text-lg ml-2 uppercase"
									>
										RIR 6798
									</Text>
								</View>

								{/* slot */}
								<View className="flex-row ml-8">
									<View
										style={{ backgroundColor: theme.colors.bg1 }}
										className="h-7 aspect-square rounded-md flex-row items-center justify-center"
									>
										<MaterialCommunityIcons
											name="parking"
											size={18}
											color={theme.colors.main}
										/>
									</View>

									<Text
										style={{ color: theme.colors.dark }}
										className="text-lg ml-2 uppercase"
									>
										6
									</Text>
								</View>
							</View>
						</View>

						{/* package details */}
						<View
							style={{
								elevation: 5,
								shadowColor: theme.colors.shadow,
								borderRadius: 15,
								backgroundColor: theme.colors.surface,
							}}
							className="flex-col w-full mt-4 p-6"
						>
							{/* heading */}
							<Text
								style={{ color: theme.colors.darker }}
								className="text-base font-medium uppercase"
							>
								Package
							</Text>

							{/* name */}
							<View className="flex-row mt-6 items-center">
								<View
									style={{ backgroundColor: theme.colors.bg1 }}
									className="h-7 aspect-square rounded-md flex-row items-center justify-center"
								>
									<Ionicons
										name="pricetags-outline"
										color={theme.colors.main}
										size={20}
									/>
								</View>

								<Text
									style={{ color: theme.colors.dark }}
									className="text-lg ml-2 capitalize"
								>
									{dashboardData.package}
								</Text>
							</View>

							{/* Booking */}
							<View className="flex-row items-center">
								{/* booking date */}
								<View className="flex-row items-center">
									<View
										style={{ backgroundColor: theme.colors.bg1 }}
										className="h-7 aspect-square rounded-md flex-row items-center justify-center"
									>
										<MaterialCommunityIcons
											name="calendar-arrow-right"
											size={22}
											color={theme.colors.main}
										/>
									</View>

									<Text
										style={{ color: theme.colors.dark }}
										className="text-lg ml-2 capitalize"
									>
										{dashboardData.bookingFrom}
									</Text>
								</View>

								{/* booking ending date */}
								<View className="flex-row items-center ml-10 mt-1">
									<View
										style={{ backgroundColor: theme.colors.bg1 }}
										className="h-7 aspect-square rounded-md flex-row items-center justify-center"
									>
										<MaterialCommunityIcons
											name="calendar-remove"
											size={22}
											color={theme.colors.main}
										/>
									</View>

									<Text
										style={{ color: theme.colors.dark }}
										className="text-lg ml-2 capitalize"
									>
										{dashboardData.bookingTo}
									</Text>
								</View>
							</View>

							{/* time left */}
							<View className="flex-row items-center mt-1">
								<View
									style={{ backgroundColor: theme.colors.bg1 }}
									className="h-7 aspect-square rounded-md flex-row items-center justify-center"
								>
									<MaterialIcons
										name="history"
										size={22}
										color={theme.colors.main}
									/>
								</View>

								<Text
									style={{ color: theme.colors.dark }}
									className="text-lg ml-2"
								>
									{dashboardData.timeLeft} days left
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
};

export default Dashboard;
