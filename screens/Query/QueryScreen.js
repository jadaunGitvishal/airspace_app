import React, { useEffect, useState } from "react";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import * as api from "../../api/userRequests";
import { ActivityIndicator } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { dataUpdateWithSocket } from "../../socket/socket";

export default function QueryScreen({ navigation }) {
	const theme = useTheme();
	const isFocused = useIsFocused();
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState([]);

	// fetch data
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const { data } = await api.getAllQueries();

				if (data.success === true) {
					setQuery(data.data.reverse());
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

			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}

		fetchData();
		dataUpdateWithSocket(fetchData);
	}, [isFocused]);

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
						<Text
							style={{
								color: theme.colors.surface,
							}}
							className=" text-lg font-semibold"
						>
							QUERIES
						</Text>
						<Ionicons
							name="chatbox-ellipses-outline"
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
							YOUR QUERIES
						</Text>

						{loading === true ? (
							<View className="h-full flex-col justify-center my-2 p-2">
								<ActivityIndicator size={45} color={theme.colors.bg0} />
							</View>
						) : (
							query.map((q, i) => {
								var x = new Date(q.createdAt);

								return (
									<TouchableOpacity
										key={i}
										activeOpacity={0.8}
										style={{
											backgroundColor: theme.colors.surface,
											shadowColor: theme.colors.shadow,
											elevation: 6,
											borderRadius: 15,
											borderWidth: 1,
											borderColor: theme.colors.bg,
										}}
										className="w-full px-4 py-6 flex-col my-3"
									>
										<View className="flex-row justify-between items-center">
											<Text
												style={{ color: theme.colors.dark }}
												className="font-medium"
											>
												{x.toLocaleDateString()}
											</Text>

											<Text
												style={{ color: theme.colors.dark }}
												className="font-medium"
											>
												{q.status}
											</Text>
										</View>

										<Text
											style={{ color: theme.colors.darker }}
											className="text-base font-medium uppercase mt-1"
										>
											{q.subject}
										</Text>

										<Text
											style={{ color: theme.colors.darker }}
											className="capitalize mt-1"
										>
											Message
										</Text>

										<Text
											style={{ color: theme.colors.dark }}
											className="capitalize"
										>
											{q.message}
										</Text>

										<Text
											style={{ color: theme.colors.darker }}
											className="capitalize mt-1"
										>
											{q.reply !== "" && "Reply"}
										</Text>

										<Text
											style={{ color: theme.colors.dark }}
											className="capitalize"
										>
											{q.reply}
										</Text>
									</TouchableOpacity>
								);
							})
						)}
					</TouchableOpacity>
				</ScrollView>

				{/* Add new */}
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => navigation.navigate("AddQuery")}
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
						ADD NEW
					</Text>
				</TouchableOpacity>
			</View>
		</Background>
	);
}
