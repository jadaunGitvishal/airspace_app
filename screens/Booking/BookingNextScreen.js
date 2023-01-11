import React, { useState } from "react";
import MenuButton from "../../components/Button/MenuButton";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import Button from "../../components/Button/Button";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function BookingNextScreen({ route, navigation }) {
	const { space, slot } = route.params;

	const [date, setDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);

	const showDatePicker = () => {
		DateTimePickerAndroid.open({
			value: date === null ? new Date(1598051730000) : date,
			onChange: (event, selectedDate) => {
				const currentDate = selectedDate;
				setDate(currentDate);
			},
			mode: "date",
			is24Hour: true,
		});
	};

	const showStartTimePicker = () => {
		DateTimePickerAndroid.open({
			value: startTime === null ? new Date(1598051730000) : startTime,
			onChange: (event, selectedDate) => {
				const currentDate = selectedDate;
				setStartTime(currentDate);
			},
			mode: "time",
			is24Hour: true,
		});
	};

	const showEndTimePicker = () => {
		DateTimePickerAndroid.open({
			value: endTime === null ? new Date(1598051730000) : endTime,
			onChange: (event, selectedDate) => {
				const currentDate = selectedDate;
				setEndTime(currentDate);
			},
			mode: "time",
			is24Hour: true,
		});
	};

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
						className="w-full text-start px-4 text-white text-base font-semibold mt-4 uppercase"
					>
						CONTINUE RESERVATION
					</Text>

					{/* info Card */}
					<View
						style={{
							position: "absolute",
							borderRadius: 30,
							backgroundColor: theme.colors.surface,
						}}
						className="h-40 w-full z-20 bottom-0 translate-y-12 shadow-sm shadow-black py-4 px-6 flex-col justify-evenly"
					>
						<Text
							style={{
								color: theme.colors.primary,
							}}
							className="font-semibold uppercase text-lg text-center"
						>
							{space}
						</Text>

						<Text
							style={{
								color: theme.colors.primary,
							}}
							className="font-medium uppercase text-4xl text-center"
						>
							{slot}
						</Text>
					</View>
				</LinearGradient>

				{/* LOWER SECTION */}
				<TouchableOpacity
					activeOpacity={1}
					style={{
						height: "70%",
					}}
					className="h-full w-full items-center pt-14 bg-white"
				>
					{/* Info Card */}
					<View className="px-4 w-full">
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
							className="w-full mx-auto my-2 p-6"
						>
							<Text
								style={{ color: theme.colors.primary }}
								className="font-semibold text-base mb-5 uppercase text-center"
							>
								SELECT DATE AND TIME
							</Text>
							<View className="flex-row items-center justify-between">
								<Button
									onPress={showDatePicker}
									mode="contained"
									style={{
										width: "30%",
									}}
								>
									Date
								</Button>
								<Text
									style={{
										backgroundColor: theme.colors.bg0,
									}}
									className="text-base text-center p-3 rounded-md text-white font-medium"
								>
									{date === null ? "---" : date.toLocaleDateString()}
								</Text>
							</View>

							<View className="flex-row items-center justify-between">
								<Button
									onPress={showStartTimePicker}
									mode="contained"
									style={{
										width: "30%",
									}}
								>
									Start
								</Button>
								<Text
									style={{
										backgroundColor: theme.colors.bg0,
									}}
									className="text-base text-center p-3 rounded-md text-white font-medium"
								>
									{startTime === null ? "---" : startTime.toLocaleTimeString()}
								</Text>
							</View>

							<View className="flex-row items-center justify-between">
								<Button
									onPress={showEndTimePicker}
									mode="contained"
									style={{
										width: "30%",
									}}
								>
									END
								</Button>
								<Text
									style={{
										backgroundColor: theme.colors.bg0,
									}}
									className="text-base text-center p-3 rounded-md text-white font-medium"
								>
									{endTime === null ? "---" : endTime.toLocaleTimeString()}
								</Text>
							</View>
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
						<Text className="text-white text-base">Confirm Reservation.</Text>

						<View className="w-2/3">
							<Button
								mode="contained"
								onPress={() => {
									if (date === null || startTime === null || endTime === null) {
										alert("Select all dates");
										return;
									}
									alert("Reservation Confirmed");
								}}
							>
								RESERVE
							</Button>
						</View>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		</Background>
	);
}
