import React, { useEffect, useState } from "react";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import Button from "../../components/Button/Button";
import {
	Modal,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
	Alert,
} from "react-native";
import { theme } from "../../core/theme";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function BookingNextScreen({ route, navigation }) {
	const { space, slot } = route.params;
	const [loading, setLoading] = useState(true); //loading

	const [modalVisible, setModalVisible] = useState(false);
	const [allPkgs, setAllPkgs] = useState([]);
	const [allVehicles, setAllVehicles] = useState([]);

	const now = new Date();
	const today = new Date();
	const tomorrow = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 1
	);

	const [pkg, setPkg] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [totalDays, setTotalDays] = useState(null);
	const [totalPrice, setTotalPrice] = useState(null);
	const [vehicle, setVehicle] = useState(null);
	const [normalRate, setNormalRate] = useState(null);
	const [peekPct, setPeakPct] = useState(null);
	const [fillPct, setFillPct] = useState(null);
	const [filledPct, setFilledPct] = useState(null);

	// Get Data
	useEffect(() => {
		const getData = async () => {
			// const { data } = await api.fetchAllParkings();
			setAllPkgs([
				{
					_id: 1,
					name: "3 Days Package",
					description: "This is my package description__.",
					days: "3",
					price: "1200",
				},
				{
					_id: 2,
					name: "6 Days Package",
					description: "This is my package description__.",
					days: "6",
					price: "2400",
				},
				{
					_id: 3,
					name: "4 Days Package",
					description: "This is my package description__.",
					days: "4",
					price: "1600",
				},
				{
					_id: 4,
					name: "12 Days Package",
					description: "This is my package description__.",
					days: "12",
					price: "4000",
				},
			]);
			setAllVehicles([
				{
					_id: "6416e56933774718df4a2e08",
					name: "Toyota Corolla",
					number: "ABC-123",
					model: "2019",
					color: "Blue",
					owner: "641645dd6c626af96c680258",
					createdAt: "2023-03-19T10:35:21.740Z",
					updatedAt: "2023-03-19T10:35:21.740Z",
				},
				{
					_id: "6416e56933774718df4a2e08",
					name: "Vitz",
					number: "XYZ-123",
					model: "2019",
					color: "Blue",
					owner: "641645dd6c626af96c680258",
					createdAt: "2023-03-19T10:35:21.740Z",
					updatedAt: "2023-03-19T10:35:21.740Z",
				},
				{
					_id: "6416e56933774718df4a2e08",
					name: "Aqua",
					number: "EFG-123",
					model: "2019",
					color: "Blue",
					owner: "641645dd6c626af96c680258",
					createdAt: "2023-03-19T10:35:21.740Z",
					updatedAt: "2023-03-19T10:35:21.740Z",
				},
			]);
			setNormalRate(100);
			setPeakPct(20);
			setFillPct(80);
			setFilledPct(90);
			setLoading(false);
		};
		getData();
	}, []);

	const showStartDatePicker = () => {
		return "only current date can be set as start date";
		const maxDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 6
		);
		DateTimePickerAndroid.open({
			value: startDate === null ? today : startDate,
			minimumDate: now.getHours() >= 15 ? tomorrow : today,
			maximumDate: maxDate,

			onChange: (event, selectedDate) => {
				const currentDate = selectedDate;
				setStartDate(currentDate);
			},
			mode: "date",
			is24Hour: true,
		});

		setEndDate(null);
	};

	const showEndDatePicker = () => {
		if (pkg === null || pkg.id !== 0) {
			return;
		}
		if (startDate === null) {
			Alert.alert("Action not possible", "Please select a start date first.");
			return;
		}
		const maxDate = new Date(
			startDate.getFullYear(),
			startDate.getMonth(),
			startDate.getDate() + 39
		);

		DateTimePickerAndroid.open({
			value: endDate === null ? startDate : endDate,
			minimumDate: startDate,
			maximumDate: maxDate,
			onChange: (event, selectedDate) => {
				const currentDate = selectedDate;
				setEndDate(currentDate);
			},
			mode: "date",
			is24Hour: true,
		});
	};

	// set total days and price
	useEffect(() => {
		if (endDate === null || startDate === null) {
			setTotalDays(null);
			return;
		}

		const differenceInMs = Math.abs(endDate - startDate);
		const daysDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
		setTotalDays(daysDifference + 1);

		if (pkg === null || pkg.id !== 0) {
			return;
		}
		var tempRate = normalRate;
		if (filledPct >= fillPct) {
			tempRate = normalRate + normalRate * (peekPct / 100);
		}
		setTotalPrice(tempRate * (daysDifference + 1));
	}, [startDate, endDate]);

	return (
		<Background>
			<View className="h-full p-0 items-center">
				{/* modal */}
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					statusBarTranslucent={true}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View
							style={{
								backgroundColor: theme.colors.surface,
								borderRadius: 10,
								shadowOffset: {
									width: 0,
									height: 2,
								},
								shadowColor: theme.colors.shadow,
								shadowRadius: 4,
								elevation: 10,
								width: "95%",
							}}
							className="h-3/4 py-3"
						>
							<View
								style={{
									height: "10%",
								}}
								className="flex-row justify-between items-center border-b border-gray-300 mx-7"
							>
								<Text className="text-base font-semibold">
									SELECT A PACKAGE
								</Text>
								<TouchableOpacity
									activeOpacity={0.7}
									onPress={() => setModalVisible(false)}
								>
									<Ionicons name="close-circle-outline" size={30} color="red" />
								</TouchableOpacity>
							</View>

							<ScrollView
								style={{
									height: "90%",
								}}
								contentContainerStyle={{
									flexGrow: 1,
									justifyContent: "center",
								}}
								className="w-full pt-4"
							>
								<TouchableOpacity activeOpacity={1} className="h-full">
									{loading === false ? (
										<>
											{/* custom pkg */}
											<TouchableOpacity
												activeOpacity={0.7}
												onPress={() => {
													setPkg({ name: "Custom", id: 0 });
													// setStartDate(null);
													setStartDate(now.getHours() >= 15 ? tomorrow : today);
													setEndDate(null);
													setModalVisible(!modalVisible);
												}}
												style={{
													backgroundColor: theme.colors.surface,
													color: theme.colors.main,
													shadowColor: theme.colors.shadow,
													elevation: 5,
													borderColor: theme.colors.bg1,
												}}
												className="p-4 rounded-md mb-4 mx-5 border"
											>
												<Text
													style={{
														color: theme.colors.main,
													}}
													className="font-semibold text-base uppercase"
												>
													Custom
												</Text>

												<Text
													style={{
														color: theme.colors.darker,
													}}
													className="font-medium"
												>
													Select your required days for booking
												</Text>
											</TouchableOpacity>

											{allPkgs.length > 0 ? (
												allPkgs.map(
													({ name, days, price, description, _id }) => (
														<TouchableOpacity
															key={_id}
															activeOpacity={0.7}
															onPress={() => {
																setPkg({ name: name, id: _id });
																// setStartDate(null);
																// setEndDate(null);
																setStartDate(
																	now.getHours() >= 15 ? tomorrow : today
																);
																const pkgEndDate = new Date(
																	(now.getHours() >= 15
																		? tomorrow
																		: today
																	).getFullYear(),
																	(now.getHours() >= 15
																		? tomorrow
																		: today
																	).getMonth(),
																	(now.getHours() >= 15
																		? tomorrow
																		: today
																	).getDate() +
																		parseInt(days) -
																		1
																);
																setEndDate(pkgEndDate);
																setTotalPrice(price);
																setModalVisible(!modalVisible);
															}}
															style={{
																days,
																backgroundColor: theme.colors.surface,
																color: theme.colors.main,
																shadowColor: theme.colors.shadow,
																elevation: 5,
																borderColor: theme.colors.bg1,
															}}
															className="p-4 rounded-md mb-4 mx-5 border"
														>
															<Text
																style={{
																	color: theme.colors.main,
																}}
																className="font-semibold text-base uppercase"
															>
																{name}
															</Text>

															<Text
																style={{
																	color: theme.colors.darker,
																}}
																className="font-medium"
															>
																{description}
															</Text>

															<Text
																style={{
																	color: theme.colors.darker,
																}}
																className="font-semibold"
															>
																- {days} Days
															</Text>

															<Text
																style={{
																	color: theme.colors.darker,
																}}
																className="font-semibold"
															>
																- {price} Rs
															</Text>
														</TouchableOpacity>
													)
												)
											) : (
												<View className="h-full flex-col justify-center">
													<Text>No result ...</Text>
												</View>
											)}
										</>
									) : (
										<View className="h-full flex-col justify-center">
											<ActivityIndicator size={45} color={theme.colors.bg0} />
										</View>
									)}
								</TouchableOpacity>
							</ScrollView>
						</View>
					</View>
				</Modal>

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
					<View className="p-4 mx-4 my-2 flex-col">
						{/* parking info */}
						<Text
							style={{
								color: theme.colors.main,
								borderColor: theme.colors.main,
							}}
							className="font-semibold capitalize text-base border-b pb-0.5 mb-3"
						>
							Parking Information
						</Text>
						<Text
							style={{
								color: theme.colors.dark,
							}}
							className="font-semibold capitalize text-base"
						>
							- {space.name}
						</Text>
						<Text
							style={{
								color: theme.colors.dark,
							}}
							className="font-semibold capitalize text-base"
						>
							- Slot No {slot}
						</Text>

						{/*package selection*/}
						<Text
							style={{
								color: theme.colors.main,
								borderColor: theme.colors.main,
							}}
							className="font-semibold capitalize text-base border-b pb-0.5 my-3"
						>
							Package
						</Text>
						<View className="flex-row">
							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									backgroundColor: theme.colors.bg1,
								}}
								onPress={() => setModalVisible(true)}
								className="w-full mx-auto my-auto flex-row items-center justify-between rounded-full px-6 py-3"
							>
								<Text
									style={{ color: theme.colors.darker }}
									className="font-semibold text-base"
								>
									{pkg === null ? "Select Package" : pkg.name}
								</Text>
								{pkg === null && (
									<EvilIcons
										name="chevron-down"
										size={24}
										color={theme.colors.darker}
									/>
								)}
							</TouchableOpacity>
						</View>

						{pkg !== null && (
							<>
								<View className="flex-row mt-2">
									<TouchableOpacity
										activeOpacity={0.8}
										style={{
											backgroundColor: theme.colors.bg1,
										}}
										onPress={() => showStartDatePicker()}
										className="w-full mx-auto my-auto flex-row items-center justify-between rounded-full px-6 py-3"
									>
										<Text
											style={{ color: theme.colors.darker }}
											className="font-semibold text-base"
										>
											{startDate === null
												? "Start Date"
												: "Start Date - " + startDate.toLocaleDateString()}
										</Text>
									</TouchableOpacity>
								</View>
								<View className="flex-row mt-2">
									<TouchableOpacity
										activeOpacity={0.8}
										style={{
											backgroundColor: theme.colors.bg1,
										}}
										onPress={() => showEndDatePicker()}
										className="w-full mx-auto my-auto flex-row items-center justify-between rounded-full px-6 py-3"
									>
										<Text
											style={{ color: theme.colors.darker }}
											className="font-semibold text-base"
										>
											{endDate === null
												? "End Date"
												: "End Date - " + endDate.toLocaleDateString()}
										</Text>
									</TouchableOpacity>
								</View>
								<View className="flex-row mt-2">
									<TouchableOpacity
										activeOpacity={0.8}
										style={{
											backgroundColor: theme.colors.bg1,
										}}
										className="w-full mx-auto my-auto flex-row items-center justify-between rounded-full px-6 py-3"
									>
										<Text
											style={{ color: theme.colors.darker }}
											className="font-semibold text-base"
										>
											{endDate === null || startDate === null
												? "N/A Days"
												: totalDays + " Days"}
										</Text>
									</TouchableOpacity>
								</View>
								<View className="flex-row mt-2">
									<TouchableOpacity
										activeOpacity={0.8}
										style={{
											backgroundColor: theme.colors.bg1,
										}}
										className="w-full mx-auto my-auto flex-row items-center justify-between rounded-full px-6 py-3"
									>
										<Text
											style={{ color: theme.colors.darker }}
											className="font-semibold text-base"
										>
											{endDate === null || startDate === null
												? "N/A Price"
												: totalPrice + " Rs"}
										</Text>
									</TouchableOpacity>
								</View>

								{/*vehicle selection*/}
								<Text
									style={{
										color: theme.colors.main,
										borderColor: theme.colors.main,
									}}
									className="font-semibold capitalize text-base border-b pb-0.5 my-3 mt-5"
								>
									Vehicle
								</Text>
								<View className="flex-row items-center justify-between">
									{allVehicles?.map(({ number }) => (
										<TouchableOpacity
											key={number}
											activeOpacity={0.8}
											style={{
												backgroundColor:
													vehicle === number
														? theme.colors.bg1
														: theme.colors.bg,
											}}
											onPress={() => setVehicle(number)}
											className="w-fit mx-auto my-auto flex-row items-center justify-between rounded-full px-6 py-3"
										>
											<Text
												style={{ color: theme.colors.darker }}
												className="font-semibold text-base"
											>
												{number}
											</Text>
										</TouchableOpacity>
									))}
								</View>
								{/* SELECT VEHICLE */}
								{/* FORMAT BOOKING TABLE */}
							</>
						)}
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
									if (
										startDate === null ||
										endDate === null ||
										totalDays === null ||
										pkg === null ||
										vehicle === null ||
										totalPrice === null
									) {
										Alert.alert(
											"Action not possible",
											"Please select all fields."
										);
										return;
									}
									navigation.navigate("BookingFinalScreen", {
										space: space,
										slot: slot,
										startDate: startDate,
										endDate: endDate,
										days: totalDays,
										pkg: pkg,
										price: totalPrice,
										vehicle: vehicle,
									});
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
