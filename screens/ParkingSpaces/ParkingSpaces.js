import React, { useEffect, useState } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../../core/theme";
import MenuButton from "../../components/Button/MenuButton";
import { TextInput as PaperInput } from "react-native-paper";
import * as api from "../../api/parkingSpacesReuests";

const ParkingSpaces = ({ navigation }) => {
	const [allSpaces, setAllSpaces] = useState(true);
	const [parkingSpaces, setParkingSpaces] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await api.fetchAllParkings();
			setParkingSpaces(data.allParkings);
		};
		getData();
	}, [allSpaces]);

	return (
		<Background>
			<View className="h-full p-0 items-center bg-white">
				{/* HEADER */}
				<LinearGradient
					style={{
						paddingTop: StatusBar.currentHeight + 10,
						height: "30%",
						minHeight: 200,
						borderBottomRightRadius: 30,
						borderBottomLeftRadius: 30,
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center justify-between"
					colors={["rgba(46, 199, 255,1)", "rgba(197, 81, 204,0.9)"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0.75, y: 1.5 }}
				>
					{/* Top Row */}
					<View className="w-full flex-row items-center justify-between">
						{/* <BackButtonSimple goBack={navigation.goBack} /> */}
						{/* <MenuButton /> */}
					</View>

					{/* Center Row */}
					<Text
						style={{ letterSpacing: 1 }}
						className="text-white text-2xl mr-auto font-semibold"
					>
						PARKING SPACES
					</Text>

					{/* Bottom Row */}
					<View className="w-full">
						<PaperInput
							style={{
								backgroundColor: theme.colors.accent,
							}}
							className={"h-10 rounded-md text-white"}
							selectionColor={theme.colors.surface}
							underlineColorAndroid="transparent"
							mode="outlined"
							outlineColor={"transparent"}
							placeholder="Search"
							placeholderTextColor={theme.colors.surface}
							onChangeText={(text) => {}}
							theme={{
								colors: {
									primary: "transparent",
									underlineColor: "transparent",
									text: theme.colors.primary,
								},
							}}
						/>

						<View className="flex-row mt-3">
							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									backgroundColor: allSpaces
										? theme.colors.accent1
										: theme.colors.accent,
								}}
								onPress={() => setAllSpaces(true)}
								className="flex-row items-center justify-between rounded-md py-2 px-4 mr-5"
							>
								<Text className="font-semibold text-white">All</Text>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									backgroundColor: allSpaces
										? theme.colors.accent
										: theme.colors.accent1,
								}}
								onPress={() => setAllSpaces(false)}
								className="flex-row items-center justify-between rounded-md py-2 px-4 mr-auto"
							>
								<Text className="font-semibold text-white">Registered</Text>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.8}
								style={{ backgroundColor: theme.colors.accent }}
								className="flex-row items-center justify-between rounded-md py-2 px-4"
							>
								<Text className="font-semibold mr-4 text-white">Filters</Text>
								<Ionicons
									name="md-filter-outline"
									size={20}
									color={theme.colors.surface}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</LinearGradient>

				{/* SCROLL VIEW */}
				<ScrollView
					style={{ height: "70%" }}
					className="w-full flex-1 bg-transparent"
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<TouchableOpacity activeOpacity={1}>
						<View className="h-full w-full p-4 pt-6 items-center">
							{/* Cards */}
							{parkingSpaces.length > 0 ? (
								parkingSpaces.map(({ _id, name, city, location }) => (
									<TouchableOpacity
										key={_id}
										activeOpacity={0.9}
										className="h-40 mb-5 w-full "
										onPress={() =>
											navigation.navigate("ParkingSpaceDetails", {
												spaceId: _id,
											})
										}
									>
										<View
											style={{
												backgroundColor: "white",
												borderColor: "rgba(46, 199, 255,0.5)",
												borderWidth: 0.5,
												shadowColor: "rgba(0,0,0, .4)",
												shadowOffset: { height: 1, width: 1 },
												shadowOpacity: 1,
												shadowRadius: 1, //IOS
												elevation: 6,
											}}
											className="h-full  w-full flex-row items-center rounded-md overflow-hidden"
										>
											{/* left */}
											<LinearGradient
												colors={[
													"rgba(46, 199, 255,1)",
													"rgba(197, 81, 204,0.9)",
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
															color={theme.colors.primary}
														/>
													</View>
													<Text className="ml-2 pr-10 break-words">{city}</Text>
												</View>

												<View className="flex-row items-center w-full">
													<View className="flex items-center justify-center h-6 w-10 rounded-md ">
														<Ionicons
															name="location-outline"
															size={20}
															color={theme.colors.primary}
														/>
													</View>
													<Text className="ml-2 pr-10 break-words">
														{location}
													</Text>
												</View>
											</View>
										</View>
									</TouchableOpacity>
								))
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
