import React, { useEffect, useState } from "react";
import MenuButton from "../../components/Button/MenuButton";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import Button from "../../components/Button/Button";
import {
	StatusBar,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import { theme } from "../../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as api from "../../api/parkingSpacesReuests";
import { ScrollView } from "react-native-gesture-handler";

export default function ParkingSpaceDetails({ route, navigation }) {
	const { spaceId } = route.params;
	const [parkingSpace, setParkingSpace] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const { data } = await api.fetchParkingDetails(spaceId);
			setParkingSpace(data.parkingDetails);
		};
		getData();
	}, []);

	return (
		<Background>
			<View
				style={{ backgroundColor: theme.colors.secondary }}
				className="h-full p-0 items-center"
			>
				{/* HEADER */}
				<LinearGradient
					style={{
						position: "relative",
						paddingTop: StatusBar.currentHeight + 10,
						height: "30%",
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center"
					colors={["rgba(46, 199, 255,1)", "rgba(197, 81, 204,0.9)"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 10, y: 0 }}
				>
					{/* Top Row */}
					<View className="w-full flex-row items-center justify-betwee">
						<BackButtonSimple goBack={navigation.goBack} />
						{/* <MenuButton /> */}
					</View>

					{/* Bottom Row */}
					<Text
						style={{ letterSpacing: 1 }}
						className="w-full text-start px-4 text-white text-base font-semibold mt-4"
					>
						{parkingSpace === null ? "..." : parkingSpace.name}
					</Text>

					{/* Address Card */}
					<View
						style={{
							position: "absolute",
							borderRadius: 30,
							backgroundColor: theme.colors.surface,
						}}
						className="h-40 w-full z-20 bottom-0 translate-y-12 shadow-sm shadow-black py-4 px-6"
					>
						<Text
							style={{
								color: theme.colors.primary,
							}}
							className="font-semibold uppercase text-base"
						>
							{parkingSpace === null ? "..." : parkingSpace.city}
						</Text>

						<Text
							style={{
								color: theme.colors.primary,
							}}
							className="font-semibold uppercase"
						>
							{parkingSpace === null ? "..." : parkingSpace.openTime} -{" "}
							{parkingSpace === null ? "..." : parkingSpace.closeTime}
						</Text>

						<View
							style={{
								backgroundColor: theme.colors.primary,
							}}
							className="mt-auto p-2 px-3 rounded-lg"
						>
							<Text className="font-semibold  text-white mb-1">Location</Text>

							<Text className="uppercase text-white">
								{parkingSpace === null ? "..." : parkingSpace.location}
							</Text>
						</View>
					</View>
				</LinearGradient>

				{/* LOWER SECTION */}
				<TouchableOpacity
					activeOpacity={1}
					style={{
						height: "70%",
						backgroundColor: theme.colors.surface,
					}}
					className="h-full w-full items-center pt-14"
				>
					{parkingSpace === null ? (
						<View className="h-full flex-col justify-center">
							<ActivityIndicator size={45} color={theme.colors.bg0} />
						</View>
					) : (
						<>
							{/* Info Card */}
							<View style={{ maxHeight: "77%" }} className="px-4">
								<View
									style={{
										backgroundColor: "white",
										borderColor: "rgba(46, 199, 255,0.5)",
										borderWidth: 0.5,
										borderRadius: 30,
										shadowColor: "rgba(0,0,0, .4)",
										shadowOffset: { height: 1, width: 1 },
										shadowOpacity: 1,
										shadowRadius: 1,
										elevation: 6,
									}}
									className="w-full mx-auto my-2 p-0"
								>
									<ScrollView className="m-1">
										<TouchableOpacity activeOpacity={1} className="m-5">
											<Text
												style={{ color: theme.colors.primary }}
												className="font-semibold text-base mb-1"
											>
												DETAILS
											</Text>

											<Text className="text-justify mb-4">
												{parkingSpace.details}
											</Text>

											<View className="flex-row items-center">
												<View className="w-8">
													<Ionicons name="checkmark-done" size={25} />
												</View>
												<Text className="font-medium">
													{parkingSpace.blocks} Parking Blocks
												</Text>
											</View>

											<View className="flex-row items-center">
												<View className="w-8">
													<Ionicons name="checkmark-done" size={25} />
												</View>
												<Text className="font-medium">
													{parkingSpace.slots.shaded +
														parkingSpace.slots.nonShaded}{" "}
													Parking Slots
												</Text>
											</View>

											<View className="flex-row items-center pl-6 mt-1">
												<View className="w-8">
													<Ionicons name="checkmark-done" size={20} />
												</View>
												<Text className="font-medium">
													{parkingSpace.slots.shaded} Shaded
												</Text>
											</View>

											<View className="flex-row items-center pl-6">
												<View className="w-8">
													<Ionicons name="checkmark-done" size={20} />
												</View>
												<Text className="font-medium">
													{parkingSpace.slots.nonShaded} Non Shaded
												</Text>
											</View>

											<View className="flex-row items-center pl-6 mt-1">
												<View className="w-8">
													<Ionicons name="checkmark-done" size={20} />
												</View>
												<Text className="font-medium">
													{parkingSpace.slots.reserved} Reservation Slots
												</Text>
											</View>

											<View className="flex-row items-center pl-6">
												<View className="w-8">
													<Ionicons name="checkmark-done" size={20} />
												</View>
												<Text className="font-medium">
													{parkingSpace.slots.free} Free Slots
												</Text>
											</View>

											<Text
												style={{ color: theme.colors.primary }}
												className="font-semibold text-base mt-4 mb-2"
											>
												AVAILABILITY
											</Text>

											<View className="flex-row items-center justify-center">
												<View
													style={{ backgroundColor: theme.colors.bg0 }}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">M</Text>
												</View>
												<View
													style={{ backgroundColor: theme.colors.bg0 }}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">T</Text>
												</View>
												<View
													style={{ backgroundColor: theme.colors.bg0 }}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">W</Text>
												</View>
												<View
													style={{ backgroundColor: theme.colors.bg0 }}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">T</Text>
												</View>
												<View
													style={{ backgroundColor: theme.colors.bg0 }}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">F</Text>
												</View>
												<View
													style={{ backgroundColor: theme.colors.bg0 }}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">S</Text>
												</View>
												<View
													style={{ backgroundColor: theme.colors.bg1 }}
													className="w-7 h-7 flex-row items-center justify-center rounded-full mx-1"
												>
													<Text className="font-medium text-white">S</Text>
												</View>
											</View>
										</TouchableOpacity>
									</ScrollView>
								</View>
							</View>

							{/* Register Button */}
							<LinearGradient
								className="mt-auto w-full px-4 h-28 items-center justify-center"
								colors={["rgba(46, 199, 255,1)", "rgba(197, 81, 204,0.9)"]}
								start={{ x: 0, y: 0 }}
								end={{ x: 10, y: 0 }}
								style={{
									borderTopLeftRadius: 60,
								}}
							>
								<Text className="text-white text-base">
									Register to get our services.
								</Text>

								<View className="w-2/3">
									<Button
										mode="contained"
										onPress={() => navigation.navigate("RegisterParkingSpace")}
									>
										Register
									</Button>
								</View>
							</LinearGradient>
						</>
					)}
				</TouchableOpacity>
			</View>
		</Background>
	);
}
