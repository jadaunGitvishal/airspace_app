import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Background from "../components/Background";
import ProfileButton from "../components/Button/ProfileButton";
import * as Progress from "react-native-progress";
import { useTheme } from "react-native-paper";
import {
	Ionicons,
	MaterialIcons,
	MaterialCommunityIcons,
	FontAwesome,
} from "@expo/vector-icons";
import { selectUser, useSelector } from "../features/userSlice.js";
import * as api from "../api/userRequests";

const Dashboard = ({ navigation }) => {
	const theme = useTheme();
	const [isLoading, setIsLoading] = useState(false);
	const { user, loading } = useSelector(selectUser);
	const [dashboardData, setDashboardData] = useState({});

	const [time, setTime] = useState("00:00:00");
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// fetch data
		async function fetchData() {
			try {
				const { data } = await api.getUserDashboard();
				// console.log(data);

				if (data.success === true) {
					setDashboardData(data.data);
					calculateTime(data.data.from, data.data.to);
				} else {
					Alert.alert("Error", "Data not found.");
				}
				setIsLoading(false);
			} catch (error) {
				console.log("=> Error");
				console.log(error);
				Alert.alert(
					"Error",
					error?.response?.data?.message ?? "An error occured."
				);
				setIsLoading(false);
			}
		}
		fetchData();

		// calculate time
		function calculateTime(startTime, endTime) {
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

			const start = getTime(startTime);
			const target = getTime(endTime);

			const timeInterval = setInterval(() => {
				var now = new Date();
				if (now > target || now < start) {
					target.setDate(target.getDate() + 1);
					setProgress(1);
					setTime("Finished");
					clearInterval(timeInterval);
					return;
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
	}, []);

	return (
		<Background>
			{loading === true ? (
				<View className="h-full flex-col justify-center">
					<ActivityIndicator size={45} color={theme.colors.bg0} />
				</View>
			) : (
				<View
					className="h-full w-full flex-1 relative p- flex-col items-center justify-between"
					style={{
						backgroundColor: theme.colors.surface,
					}}
				>
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

						{/* user info */}
						<View className="w-full flex-row items-center mt-5">
							<View
								style={{ backgroundColor: theme.colors.surface }}
								className="rounded-full p-1"
							>
								<MaterialIcons
									name="star"
									size={20}
									color={
										dashboardData?.bookings >= 50
											? "gold"
											: dashboardData?.bookings >= 20
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
									{user?.user?.name}
								</Text>
								<Text
									style={{ color: theme.colors.surface }}
									className="text-sm pl-2"
								>
									{user?.user?.email}
								</Text>
							</View>
						</View>
					</View>

					{/* Data */}
					<ScrollView
						showsVerticalScrollIndicator={false}
						className="flex-1 w-full"
					>
						{dashboardData?.hasBooking === true ? (
							// Booking Data
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
											{dashboardData.ps}
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
											{dashboardData.vehicle}
										</Text>
									</View>

									{/* number */}
									<View className="flex-row mt-1">
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
											{dashboardData.number}
										</Text>
									</View>

									{/* slot */}
									<View className="flex-row mt-1">
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
											{/* {dashboardData.block} - */}
											{/* {dashboardData.slot} */}
											No data for slot
										</Text>
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
											{dashboardData.daysLeft} days left
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						) : (
							// Non Booking Data
							<TouchableOpacity
								activeOpacity={1}
								className="flex-col items-center w-full p-4"
							>
								{/* banner */}
								<TouchableOpacity
									activeOpacity={0.8}
									style={{
										elevation: 5,
										shadowColor: theme.colors.shadow,
										borderRadius: 15,
										backgroundColor: theme.colors.surface,
									}}
									className="w-[100%] overflow-hidden"
								>
									<LinearGradient
										className="w-[100%] px-6 py-10 flex-row items-center justify-between"
										colors={[theme.colors.greenBg, theme.colors.bg1]}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 1 }}
									>
										<View className="flex-col">
											<Text
												style={{ color: theme.colors.green }}
												className="text-xl font-semibold uppercase tracking-wide"
											>
												Reserve a parking
											</Text>

											<Text
												style={{ color: theme.colors.green }}
												className="text-sm font-semibold uppercase"
											>
												Get a package
											</Text>
										</View>

										<Image
											source={require("../assets/parking.png")}
											className="h-16 w-16"
										/>
									</LinearGradient>
								</TouchableOpacity>

								{/* links1 */}
								<View className="w-full flex-row items-center justify-between flex-wrap mt-8">
									{/* nearby */}
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => navigation.navigate("Nearby")}
										className="border rounded-md h-32 w-[30%] flex-col items-center justify-center"
										style={{
											shadowColor: theme.colors.shadow,
											borderColor: theme.colors.green,
										}}
									>
										<MaterialCommunityIcons
											name="near-me"
											size={25}
											color={theme.colors.green}
										/>
										<Text
											style={{ color: theme.colors.green }}
											className="font-semibold mt-2"
										>
											Nearby
										</Text>
									</TouchableOpacity>

									{/* account */}
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => navigation.navigate("AccountSettings")}
										className="border rounded-md h-32 w-[30%] flex-col items-center justify-center mx-4"
										style={{
											shadowColor: theme.colors.shadow,
											borderColor: theme.colors.green,
										}}
									>
										<MaterialIcons
											name="person"
											size={25}
											color={theme.colors.green}
										/>
										<Text
											style={{ color: theme.colors.green }}
											className="font-semibold mt-2"
										>
											Account
										</Text>
									</TouchableOpacity>

									{/* vehicles */}
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => navigation.navigate("Vehicles")}
										className="border rounded-md h-32 w-[30%] flex-col items-center justify-center"
										style={{
											shadowColor: theme.colors.shadow,
											borderColor: theme.colors.green,
										}}
									>
										<Ionicons
											name="car-sport"
											size={25}
											color={theme.colors.green}
										/>
										<Text
											style={{ color: theme.colors.green }}
											className="font-semibold mt-2"
										>
											Vehicles
										</Text>
									</TouchableOpacity>
								</View>

								{/* links2 */}
								<View className="w-full flex-row items-center justify-between flex-wrap mt-4">
									{/* history */}
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => navigation.navigate("History")}
										className="border rounded-md h-32 w-[30%] flex-col items-center justify-center"
										style={{
											shadowColor: theme.colors.shadow,
											borderColor: theme.colors.green,
										}}
									>
										<FontAwesome
											name="history"
											size={25}
											color={theme.colors.green}
										/>
										<Text
											style={{ color: theme.colors.green }}
											className="font-semibold mt-2"
										>
											History
										</Text>
									</TouchableOpacity>

									{/* payments */}
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => navigation.navigate("Payments")}
										className="border rounded-md h-32 w-[30%] flex-col items-center justify-center mx-4"
										style={{
											shadowColor: theme.colors.shadow,
											borderColor: theme.colors.green,
										}}
									>
										<Ionicons
											name="md-card"
											size={25}
											color={theme.colors.green}
										/>
										<Text
											style={{ color: theme.colors.green }}
											className="font-semibold mt-2"
										>
											Payments
										</Text>
									</TouchableOpacity>

									{/* settings */}
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => navigation.navigate("Settings")}
										className="border rounded-md h-32 w-[30%] flex-col items-center justify-center"
										style={{
											shadowColor: theme.colors.shadow,
											borderColor: theme.colors.green,
										}}
									>
										<Ionicons
											name="settings"
											size={25}
											color={theme.colors.green}
										/>
										<Text
											style={{ color: theme.colors.green }}
											className="font-semibold mt-2"
										>
											Settings
										</Text>
									</TouchableOpacity>
								</View>

								{/* user info */}
								<View
									style={{
										elevation: 5,
										borderColor: theme.colors.bg1,
										shadowColor: theme.colors.shadow,
										borderRadius: 15,
										backgroundColor: theme.colors.bg,
									}}
									className="flex-col w-full mt-8 p-6 border"
								>
									{/* heading */}
									<Text
										style={{ color: theme.colors.main }}
										className="text-base font-medium uppercase"
									>
										User Info
									</Text>

									{/* phone */}
									<View className="flex-row mt-6 items-center">
										<View className="h-7 aspect-square rounded-md flex-row items-center justify-center">
											<Ionicons
												name="phone-portrait-outline"
												color={theme.colors.green}
												size={20}
											/>
										</View>

										<Text
											style={{ color: theme.colors.darker }}
											className="text-lg ml-2 capitalize"
										>
											{user?.user?.phone}
										</Text>
									</View>

									{/* cnic */}
									<View className="flex-row items-center mt-1">
										<View className="h-7 aspect-square rounded-md flex-row items-center justify-center">
											<MaterialCommunityIcons
												name="form-textbox-password"
												size={22}
												color={theme.colors.green}
											/>
										</View>

										<Text
											style={{ color: theme.colors.darker }}
											className="text-lg ml-2"
										>
											{user?.user?.cnic}
										</Text>
									</View>

									{/* city */}
									<View className="flex-row items-center mt-1">
										<View className="h-7 aspect-square rounded-md flex-row items-center justify-center">
											<MaterialCommunityIcons
												name="city-variant-outline"
												size={22}
												color={theme.colors.green}
											/>
										</View>

										<Text
											style={{ color: theme.colors.darker }}
											className="text-lg ml-2 capitalize"
										>
											{user?.user?.city}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						)}
					</ScrollView>
				</View>
			)}
		</Background>
	);
};

export default Dashboard;
