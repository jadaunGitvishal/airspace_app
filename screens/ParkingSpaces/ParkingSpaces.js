import React, { useEffect, useState } from "react";
import {
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Background from "../../components/Background";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../../core/theme";
import TextInput from "../../components/Input/TextInput";
import * as api from "../../api/parkingSpacesReuests";

const ParkingSpaces = ({ navigation }) => {
	const [search, setSearch] = useState("");
	const [allSpaces, setAllSpaces] = useState(true);
	const [parkingSpaces, setParkingSpaces] = useState([
		{
			_id: 123,
			name: "Comsats University Islamabad",
			city: "Islamabad",
			location: "Park Road, Chak Shehzad, Islamabad",
		},
		{
			_id: 3,
			name: "Hamdard University Islamabad",
			city: "Islamabad",
			location: "Park Road, Chak Shehzad, Islamabad",
		},
		{
			_id: 2,
			name: "Abasym University Islamabad",
			city: "Islamabad",
			location: "Park Road, Chak Shehzad, Islamabad",
		},
		{
			_id: 0,
			name: "Quaid-e-Azam University Islamabad",
			city: "Islamabad",
			location: "Murree Road, Islamabad",
		},
		{
			_id: 9,
			name: "NUST University Islamabad",
			city: "Islamabad",
			location: "Sector H11, Islamabad",
		},
	]);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const { data } = await api.fetchAllParkings();
	// 		setParkingSpaces(data.allParkings);
	// 	};
	// 	getData();
	// }, [allSpaces]);

	return (
		<Background>
			<View className="h-full p-0 items-center">
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
							label="Search"
							returnKeyType="done"
							value={search}
							onChangeText={(text) => setSearch(text)}
							error={null}
							errorText={""}
							containerStyle={{ marginBottom: 5 }}
							inputStyle={{ height: 45 }}
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
						backgroundColor: theme.colors.surface,
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
