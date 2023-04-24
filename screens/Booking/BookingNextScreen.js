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
			<View className="h-full p-0 items-center">
				{/* HEADER */}
				<View
					style={{
						height: "18%",
						backgroundColor: theme.colors.main,
						borderBottomRightRadius: 30,
						borderBottomLeftRadius: 30,
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
							className=" text-lg font-semibold"
						>
							CONTINUE RESERVATION
						</Text>
					</View>
				</View>

				{/* LOWER SECTION */}
				<TouchableOpacity
					activeOpacity={1}
					style={{
						height: "82%",
						backgroundColor: theme.colors.surface,
					}}
					className="h-full w-full"
				>
					{/* info Card */}
					<View
						style={{
							borderRadius: 30,
							backgroundColor: theme.colors.surface,
							shadowColor: theme.colors.shadow,
							elevation: 5,
							borderColor: theme.colors.bg1,
						}}
						className="h-40 py-4 px-6 m-4 mt-8 border flex-col justify-evenly"
					>
						<Text
							style={{
								color: theme.colors.main,
							}}
							className="font-semibold uppercase text-base text-center"
						>
							{space}
						</Text>

						<Text
							style={{
								color: theme.colors.main,
							}}
							className="font-medium text-2xl text-center"
						>
							{slot}
						</Text>
					</View>

					{/* Info Card */}
					<View className="px-4 w-full">
						<View
							style={{
								borderRadius: 30,
								backgroundColor: theme.colors.surface,
								shadowColor: theme.colors.shadow,
								elevation: 5,
								borderColor: theme.colors.bg1,
							}}
							className="w-full mx-auto my-2 p-6 border"
						>
							<Text
								style={{ color: theme.colors.main }}
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
					<View
						className="mt-auto w-full px-4 h-28 items-center justify-center"
						style={{
							borderTopLeftRadius: 60,
							// backgroundColor: theme.colors.main,
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
					</View>
				</TouchableOpacity>
			</View>
		</Background>
	);
}
