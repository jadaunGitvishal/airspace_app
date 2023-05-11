import React, { useState, useEffect } from "react";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import {
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
	Alert,
} from "react-native";
import { theme } from "../../core/theme";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as api from "../../api/userRequests";
import { useIsFocused } from "@react-navigation/native";

export default function VehiclesScreen({ navigation }) {
	const isFocused = useIsFocused();
	const [loading, setLoading] = useState(false);
	const [vehiclesData, setVehiclesData] = useState([]);
	const [reload, setReload] = useState(false);

	// Get Data
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const { data } = await api.getAllVehicles();
				if (data) {
					setVehiclesData(data.data.reverse());
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
		}

		fetchData();
	}, [reload, isFocused]);

	// handle delete
	async function handleDelete(id) {
		try {
			const { data } = await api.deleteVehicle(id);
			if (data) {
				setReload(!reload);
				console.log("Vehicle deleted");
			} else {
				Alert.alert("Error", "Data not found.");
			}
		} catch (error) {
			console.log("=> Error");
			console.log(error);
			Alert.alert(
				"Error",
				error?.response?.data?.message ?? "An error occured."
			);
		}
	}

	return (
		<Background>
			<View
				style={{ backgroundColor: theme.colors.main }}
				className="h-full w-full relative"
			>
				{/* HEADER */}
				<View
					style={{
						height: "15%",
						backgroundColor: theme.colors.main,
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center"
				>
					{/* Top Row */}
					<View className="w-full flex-row items-center justify-betwee">
						<BackButtonSimple goBack={navigation.goBack} />
						{/* <MenuButton /> */}
					</View>

					{/* Middle Row */}
					<View
						style={{ letterSpacing: 1 }}
						className="w-full px-4 mt-2 flex-row items-center justify-between"
					>
						<Text className="text-white text-lg font-semibold">VEHICLES</Text>
						<Ionicons
							name="car-sport-outline"
							size={20}
							color={theme.colors.surface}
						/>
					</View>
				</View>

				{/* SETTINGS AREA */}
				<ScrollView
					style={{
						height: "85%",
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
						backgroundColor: theme.colors.surface,
					}}
					className="w-full"
				>
					<TouchableOpacity
						activeOpacity={1}
						className="h-full w-full p-6 pt-10 items-center"
					>
						<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300 uppercase">
							YOUR VEHICLES
						</Text>

						{loading === true ? (
							<View className="h-full flex-col justify-center">
								<ActivityIndicator size={45} color={theme.colors.bg0} />
							</View>
						) : (
							vehiclesData?.map((v, i) => (
								<View
									key={i}
									className="h-32 w-full border border-gray-100 shadow-md rounded-xl mb-4 py-4 px-5 flex-row items-center"
									style={{
										shadowColor: theme.colors.shadow,
										backgroundColor: theme.colors.surface,
									}}
								>
									<View className="flex-1 h-full flex-col">
										<View className="flex-row items-center">
											<Text
												style={{ color: theme.colors.dark }}
												className="text-sm font-medium"
											>
												Name:
											</Text>
											<Text
												style={{ color: theme.colors.dark }}
												className="text-sm pl-2"
											>
												{v.name}
											</Text>
										</View>

										<View className="flex-row items-center">
											<Text
												style={{ color: theme.colors.dark }}
												className="text-sm font-medium"
											>
												Color:
											</Text>
											<Text
												style={{ color: theme.colors.dark }}
												className="text-sm pl-2"
											>
												{v.color}
											</Text>
										</View>

										<View className="flex-row items-center">
											<Text
												style={{ color: theme.colors.dark }}
												className="text-sm font-medium"
											>
												Model:
											</Text>
											<Text
												style={{ color: theme.colors.dark }}
												className="text-sm pl-2"
											>
												{v.model}
											</Text>
										</View>

										<Text
											style={{ color: theme.colors.darker }}
											className="text-xl mt-auto"
										>
											{v.number}
										</Text>
									</View>

									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() =>
											Alert.alert(
												"Remove Vehicle",
												"Are you sure to remove " + v.number,
												[
													{
														text: "Cancel",
														onPress: () => console.log("Cancel Pressed"),
														style: "cancel",
													},
													{
														text: "Remove",
														onPress: () => handleDelete(v._id),
													},
												],
												{ cancelable: false }
											)
										}
										className="bg-red-400 rounded-md p-2"
									>
										<MaterialIcons
											name="delete-outline"
											size={23}
											color={theme.colors.surface}
										/>
									</TouchableOpacity>
								</View>
							))
						)}
					</TouchableOpacity>
				</ScrollView>

				{/* Add new */}
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => navigation.navigate("AddVehicle")}
					className="absolute bottom-0 right-0 m-4 bg-main rounded-full py-2 px-4 z-50 flex-row items-center"
				>
					<Ionicons
						name="car-sport-outline"
						size={24}
						color={theme.colors.surface}
					/>

					<Text
						style={{
							color: theme.colors.surface,
						}}
						className="text-base font-medium ml-2"
					>
						REGISTER NEW
					</Text>
				</TouchableOpacity>
			</View>
		</Background>
	);
}
