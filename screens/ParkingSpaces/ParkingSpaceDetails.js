import React, { useEffect, useState } from "react";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import {
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
	Image,
	Alert,
} from "react-native";
import { useTheme } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import * as api from "../../api/userRequests";
import { dataUpdateWithSocket } from "../../socket/socket";

export default function ParkingSpaceDetails({ route, navigation }) {
	const theme = useTheme();
	const { spaceId } = route.params;
	const [loading, setLoading] = useState(false);
	const [parkingSpace, setParkingSpace] = useState(null);

	// Get Data
	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const { data } = await api.getParkingSpaceDetails(spaceId);
				if (data) {
					setParkingSpace(data.data);
				} else {
					Alert.alert("Error", "Data not found.");
				}
				setLoading(false);
			} catch (error) {
				console.log("=> Error");
				console.log(error);
				Alert.alert(
					"Error",
					error?.response?.data?.message ?? "An error occured."
				);
				setLoading(false);
			}
		};
		getData();
		// dataUpdateWithSocket(getData); // Clicks error
	}, []);

	return (
		<Background>
			{loading === true ? (
				<View className="h-full flex-col justify-center">
					<ActivityIndicator size={45} color={theme.colors.bg0} />
				</View>
			) : (
				<View
					style={{ backgroundColor: theme.colors.surface }}
					className="h-full p-0 items-center"
				>
					{/* HEADER */}
					<View
						style={{
							height: "16%",
							backgroundColor: theme.colors.main,
							borderBottomRightRadius: 30,
							borderBottomLeftRadius: 30,
						}}
						className="w-full h-16 p-4 pb-6 flex-col items-center"
					>
						{/* Top Row */}
						<View className="w-full flex-row items-center">
							<BackButtonSimple goBack={navigation.goBack} />
						</View>

						{/* Center Row */}
						<Text
							style={{ letterSpacing: 1, color: theme.colors.surface }}
							className="text-xl font-medium mt-5 uppercase"
						>
							{parkingSpace?.name}
						</Text>
					</View>

					{/* LOWER SECTION */}
					<ScrollView
						style={{ height: "84%" }}
						className="w-full flex-1 bg-transparent"
						contentContainerStyle={{
							flexGrow: 1,
							justifyContent: "center",
							flexDirection: "column",
							// backgroundColor: theme.colors.surface,
						}}
					>
						<TouchableOpacity
							activeOpacity={1}
							className="h-full w-full flex-col"
						>
							{parkingSpace === null ? (
								<View className="h-full flex-col justify-center">
									<ActivityIndicator size={45} color={theme.colors.bg0} />
								</View>
							) : (
								// Info Card
								<View className="w-full flex-1 p-4">
									{/* Images */}
									<View className="flex-row items-center justify-between mb-5">
										<Image
											className="w-[30%] aspect-square rounded bg-gray-200"
											source={{ uri: parkingSpace?.img1?.url }}
										/>
										<Image
											className="w-[30%] aspect-square rounded bg-gray-200"
											source={{ uri: parkingSpace?.img2?.url }}
										/>
										<Image
											className="w-[30%] aspect-square rounded bg-gray-200"
											source={{ uri: parkingSpace?.img3?.url }}
										/>
									</View>

									{/* Address */}
									<View
										style={{
											backgroundColor: theme.colors.surface,
											borderColor: theme.colors.bg,
											shadowColor: theme.colors.shadow,
											elevation: 5,
											borderWidth: 0.5,
											borderRadius: 15,
										}}
										className="w-full p-0 mb-5"
									>
										<TouchableOpacity activeOpacity={1} className="m-5">
											<Text
												style={{ color: theme.colors.main }}
												className="font-semibold text-base mb-1"
											>
												Address
											</Text>

											<Text
												style={{ color: theme.colors.dark }}
												className="text-justify mb-4"
											>
												{parkingSpace?.address}
											</Text>

											<Text
												style={{ color: theme.colors.main }}
												className="font-semibold text-base mb-1"
											>
												Email
											</Text>

											<Text
												style={{ color: theme.colors.dark }}
												className="text-justify mb-4"
											>
												{parkingSpace?.email}
											</Text>

											<Text
												style={{ color: theme.colors.main }}
												className="font-semibold text-base mb-1"
											>
												Phone
											</Text>

											<Text
												style={{ color: theme.colors.dark }}
												className="text-justify mb-4"
											>
												{parkingSpace?.phone}
											</Text>
										</TouchableOpacity>
									</View>

									{/* Parking Info */}
									<View
										style={{
											backgroundColor: theme.colors.surface,
											borderColor: theme.colors.bg,
											shadowColor: theme.colors.shadow,
											elevation: 5,
											borderWidth: 0.5,
											borderRadius: 15,
										}}
										className="w-full p-0 mb-5"
									>
										<TouchableOpacity activeOpacity={1} className="m-5">
											<View className="flex-row items-center">
												<View className="w-8">
													<Ionicons
														name="checkmark-done"
														size={25}
														color={theme.colors.main}
													/>
												</View>
												<Text
													style={{
														color: theme.colors.main,
													}}
													className="font-medium"
												>
													{parkingSpace?.totalSlots} Parking Slots
												</Text>
											</View>

											<View className="flex-row items-center pl-2 mt-1">
												<View className="w-8">
													<Ionicons
														name="checkmark-done"
														size={20}
														color={theme.colors.dark}
													/>
												</View>
												<Text
													style={{
														color: theme.colors.dark,
													}}
													className="font-medium"
												>
													{parkingSpace?.shadedSlots} Shaded
												</Text>
											</View>

											<View className="flex-row items-center pl-2 mt-1">
												<View className="w-8">
													<Ionicons
														name="checkmark-done"
														size={20}
														color={theme.colors.dark}
													/>
												</View>
												<Text
													style={{
														color: theme.colors.dark,
													}}
													className="font-medium"
												>
													{parkingSpace?.paidSlots} Reservation Slots
												</Text>
											</View>
										</TouchableOpacity>
									</View>

									{/* Availability */}
									<View
										style={{
											backgroundColor: theme.colors.surface,
											borderColor: theme.colors.bg,
											shadowColor: theme.colors.shadow,
											elevation: 5,
											borderWidth: 0.5,
											borderRadius: 15,
										}}
										className="w-full p-0"
									>
										<TouchableOpacity activeOpacity={1} className="m-5">
											<Text
												style={{ color: theme.colors.main }}
												className="font-semibold text-base mb-1"
											>
												Availability
											</Text>

											<View className="flex-row items-center justify-center mt-2">
												<View
													style={{
														backgroundColor: parkingSpace?.mon
															? theme.colors.greenBg
															: theme.colors.dark,
													}}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">M</Text>
												</View>
												<View
													style={{
														backgroundColor: parkingSpace?.tue
															? theme.colors.greenBg
															: theme.colors.dark,
													}}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">T</Text>
												</View>
												<View
													style={{
														backgroundColor: parkingSpace?.wed
															? theme.colors.greenBg
															: theme.colors.dark,
													}}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">W</Text>
												</View>
												<View
													style={{
														backgroundColor: parkingSpace?.thu
															? theme.colors.greenBg
															: theme.colors.dark,
													}}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">T</Text>
												</View>
												<View
													style={{
														backgroundColor: parkingSpace?.fri
															? theme.colors.greenBg
															: theme.colors.dark,
													}}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">F</Text>
												</View>
												<View
													style={{
														backgroundColor: parkingSpace?.sat
															? theme.colors.greenBg
															: theme.colors.dark,
													}}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">S</Text>
												</View>
												<View
													style={{
														backgroundColor: parkingSpace?.sun
															? theme.colors.greenBg
															: theme.colors.dark,
													}}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">S</Text>
												</View>
											</View>
										</TouchableOpacity>
									</View>
								</View>
							)}
						</TouchableOpacity>
					</ScrollView>
				</View>
			)}
		</Background>
	);
}
