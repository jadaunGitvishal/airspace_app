import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import MenuButton from "../components/Button/MenuButton";
import BackButtonSimple from "../components/Button/BackButtonSimple";
import Button from "../components/Button/Button";
import TextInput from "../components/Input/TextInput";
import {
	ActivityIndicator,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../core/theme";
import { Octicons } from "@expo/vector-icons";
import * as api from "../api/userRequests";

export default function NotificationsScreen({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [notifications, setNotifications] = useState([]);

	// fetch data
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const { data } = await api.getNotifications();
				// console.log(data);

				if (data.success === true) {
					setNotifications(data.data);
				} else {
					console.log("An Error Occured");
				}
				setLoading(false);
			} catch (error) {
				console.log("=> Error");
				console.log(error);
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
							style={{ color: theme.colors.surface }}
							className="text-lg font-semibold"
						>
							NOTIFICATIONS
						</Text>
						<Octicons name="bell" size={20} color={theme.colors.surface} />
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
					showsVerticalScrollIndicator={false}
					className="w-full "
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
							notifications.map((n, i) => {
								const createdAt = new Date(n.createdAt);
								const months = [
									"Jan",
									"Feb",
									"Mar",
									"Apr",
									"May",
									"Jun",
									"Jul",
									"Aug",
									"Sep",
									"Oct",
									"Nov",
									"Dec",
								];
								const day = createdAt.getDate();
								const month = months[createdAt.getMonth()];
								const year = createdAt.getFullYear();
								const formattedDate = `${day
									.toString()
									.padStart(2, "0")}-${month}-${year.toString().substring(2)}`;

								const hour = createdAt.getHours();
								const minute = createdAt.getMinutes();
								const ampm = hour >= 12 ? "PM" : "AM";
								const formattedTime = `${(hour % 12)
									.toString()
									.padStart(2, "0")}:${minute
									.toString()
									.padStart(2, "0")} ${ampm}`;

								return (
									<TouchableOpacity
										key={i}
										activeOpacity={0.8}
										style={{
											backgroundColor: theme.colors.surface,
											shadowColor: theme.colors.shadow,
											elevation: 10,
											borderRadius: 15,
											borderColor: theme.colors.bg,
											borderWidth: 0.5,
										}}
										className="w-full p-6 flex-col my-3"
									>
										<View className="w-full flex-row items-center justify-between">
											<Octicons
												name="dot-fill"
												color={theme.colors.darker}
												size={20}
											/>

											<Text
												style={{ color: theme.colors.darker }}
												className="font-medium"
											>
												{`${formattedDate} - ${formattedTime}`}
											</Text>
										</View>

										<Text
											style={{ color: theme.colors.darker }}
											className="text-base mt-3"
										>
											{n.text}
										</Text>
									</TouchableOpacity>
								);
							})
						)}
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}
