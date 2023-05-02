import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import BackButtonSimple from "../components/Button/BackButtonSimple";
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../core/theme";
import * as api from "../api/userRequests";

export default function HistoryScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [history, setHistory] = useState([]);

	// fetch data
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const { data } = await api.getHistory();
				console.log(data);

				if (data.success === true) {
					setHistory(data.data);
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
	}, []);

	return (
		<Background>
			<View
				style={{
					backgroundColor: theme.colors.main,
				}}
				className="h-full w-full"
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
							PARKING HISTORY
						</Text>
					</View>
				</View>

				{/* PAGE */}
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
						{loading === true ? (
							<View className="h-full flex-col justify-center">
								<ActivityIndicator size={45} color={theme.colors.bg0} />
							</View>
						) : (
							history.map((h, i) => (
								<TouchableOpacity
									key={i}
									activeOpacity={0.8}
									style={{
										backgroundColor: theme.colors.surface,
										shadowColor: theme.colors.shadow,
										elevation: 6,
										borderRadius: 15,
									}}
									className="w-full px-4 py-6 flex-col my-3"
								>
									<View className="flex-row justify-between items-center">
										<Text
											style={{ color: theme.colors.darker }}
											className="font-medium"
										>
											{h.date}
										</Text>

										<Text
											style={{ color: theme.colors.darker }}
											className="font-medium"
										>
											{h.day}
										</Text>
									</View>

									<Text
										style={{ color: theme.colors.darker }}
										className="text-base font-medium uppercase"
									>
										{h.psName}
									</Text>

									<Text
										style={{ color: theme.colors.darker }}
										className="text-base mt-2 uppercase"
									>
										- {h.vehicleNo}
									</Text>

									<Text
										style={{ color: theme.colors.darker }}
										className="text-base uppercase"
									>
										- {h.time}
									</Text>

									<Text
										style={{ color: theme.colors.darker }}
										className="text-base uppercase"
									>
										- {h.activityType}
									</Text>
								</TouchableOpacity>
							))
						)}
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}
