import React, { useEffect, useState } from "react";
import {
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
	TextInput,
	Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Background from "../../components/Background";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import * as api from "../../api/userRequests";
import { dataUpdateWithSocket } from "../../socket/socket";

const ParkingSpaces = ({ navigation }) => {
	const theme = useTheme();
	const [loading, setLoading] = useState(true); //loading
	const [allParkingSpaces, setAllParkingSpaces] = useState([]);

	// Search
	const [search, setSearch] = useState("");
	const [parkingSpaces, setParkingSpaces] = useState([]);
	useEffect(() => {
		function updateList() {
			var tempList = allParkingSpaces.filter(
				(ps) => ps.name.indexOf(search) > -1
			);

			setParkingSpaces(tempList);
		}

		updateList();
	}, [search]);

	// Add click & impression
	async function addClick(psId, type) {
		const { data } = await api.createClickAndImpression({
			parkingSpace: psId,
			clickType: type,
		});
	}

	// Get Data
	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await api.getAllParkingSpaces();
				if (data) {
					setAllParkingSpaces(data.data);
					setParkingSpaces(data.data);
					data.data.forEach((ps) => {
						addClick(ps._id, "impression");
					});
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
			<View
				className="h-full p-0 items-center"
				style={{
					backgroundColor: theme.colors.surface,
				}}
			>
				{/* HEADER */}
				<View
					style={{
						height: "25%",
						backgroundColor: theme.colors.main,
						borderBottomRightRadius: 30,
						borderBottomLeftRadius: 30,
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center justify-between"
				>
					{/* Center Row */}
					<Text
						style={{ letterSpacing: 1, color: theme.colors.surface }}
						className="text-2xl mr-auto font-semibold mt-5"
					>
						PARKING SPACES
					</Text>

					{/* Bottom Row */}
					<View className="w-full">
						<TextInput
							returnKeyType="search"
							placeholder="Search..."
							value={search}
							onChangeText={(text) => setSearch(text)}
							className="h-10 rounded mx-2 mb-4 px-2"
							style={{
								backgroundColor: theme.colors.surface,
							}}
						/>
					</View>
				</View>

				{/* SCROLL VIEW */}
				<ScrollView
					style={{ height: "70%" }}
					className="w-full flex-1 bg-transparent"
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "center",
						flexDirection: "column",
						// backgroundColor: theme.colors.surface,
					}}
				>
					<TouchableOpacity activeOpacity={1}>
						<View className="h-full w-full p-4 pt-6 items-center">
							{/* Cards */}
							{loading === false ? (
								parkingSpaces.length > 0 ? (
									parkingSpaces.map(({ _id, name, city, address }) => (
										<TouchableOpacity
											key={_id}
											activeOpacity={0.9}
											className="h-40 mb-5 w-full "
											onPress={() => {
												addClick(_id, "click");
												navigation.navigate("ParkingSpaceDetails", {
													spaceId: _id,
												});
											}}
										>
											<View
												style={{
													backgroundColor: theme.colors.surface,
													borderColor: "rgba(46, 199, 255,0.5)",
													borderWidth: 0.5,
													shadowColor: theme.colors.shadow,
													elevation: 6,
												}}
												className="h-full  w-full flex-row items-center rounded-md overflow-hidden"
											>
												{/* left */}
												<LinearGradient
													colors={[
														"rgba(46, 199, 255,1)",
														"rgba(197, 81, 204,0.9)",
														// theme.colors.greenBg,
														// theme.colors.pinkBg,
													]}
													start={{ x: 0, y: 0 }}
													end={{ x: 0.75, y: 1.5 }}
													style={{
														width: "2%",
														// opacity: 0.5,
													}}
													className="h-full items-center justify-center"
												>
													<Text className="text-2xl text-white"></Text>
												</LinearGradient>

												{/* right */}
												<View
													style={{
														width: "98%",
													}}
													className="py-2 px-6"
												>
													<View className="flex-row w-full items-center">
														<View className="h-10 w-10">
															<Image
																className="h-full w-full object-cover"
																source={require("../../assets/CUI_logo.jpg")}
															/>
														</View>

														<Text className="ml-2 text-base">{name}</Text>
													</View>

													<View className="flex-row items-center w-full mt-2">
														<View className="flex items-center justify-center h-6 w-10 rounded-md">
															<Ionicons
																name="business-outline"
																size={20}
																color={theme.colors.main}
															/>
														</View>
														<Text className="ml-2 pr-10 break-words">
															{city}
														</Text>
													</View>

													<View className="flex-row items-center w-full">
														<View className="flex items-center justify-center h-6 w-10 rounded-md ">
															<Ionicons
																name="location-outline"
																size={20}
																color={theme.colors.main}
															/>
														</View>
														<Text className="ml-2 pr-10 break-words">
															{address}
														</Text>
													</View>
												</View>
											</View>
										</TouchableOpacity>
									))
								) : (
									<View className="h-full flex-col justify-center">
										<Text>No results ...</Text>
									</View>
								)
							) : (
								<View className="h-full flex-col justify-center">
									<ActivityIndicator size={45} color={theme.colors.bg0} />
								</View>
							)}
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
};

export default ParkingSpaces;
