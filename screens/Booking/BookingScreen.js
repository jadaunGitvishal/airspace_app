import React, { useEffect, useState } from "react";
import {
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Modal,
	ActivityIndicator,
} from "react-native";
import Background from "../../components/Background";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import Slot from "../../components/Slot/Slot";
import Button from "../../components/Button/Button";
import * as api from "../../api/userRequests";

const BookingScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(true); //loading
	const [modalVisible, setModalVisible] = useState(false);

	// slot and ps
	const [slot, setSlot] = useState(null);
	const [space, setSpace] = useState(null);
	const [parkingSpaces, setParkingSpaces] = useState([]);
	const [slotsList, setSlotsList] = useState([]);

	function handleSlots(slots) {
		const groupedSlots = slots.reduce((acc, slot) => {
			const { block, ...rest } = slot;
			const existingBlock = acc.find((item) => item.block === block);
			if (existingBlock) {
				existingBlock.slots.push(rest);
			} else {
				acc.push({ block, slots: [rest] });
			}
			return acc;
		}, []);

		setSlotsList(groupedSlots);
	}

	// Get Data
	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const { data } = await api.getAllParkingSpaces();

				if (data.success === true) {
					setParkingSpaces(data.data);
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
	}, []);

	// continue
	const handleContinue = () => {
		if (space === null || slot === null) {
			alert("Select a slot first");
			return;
		}
		// alert(slot + "\n" + space);
		navigation.navigate("BookingNext", {
			space: space,
			slot: slot,
		});
	};

	return (
		<Background>
			<View
				style={{
					backgroundColor: theme.colors.surface,
				}}
				className="h-full p-0 items-center"
			>
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
								width: "90%",
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
									SELECT A PARKING SPACE
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
										parkingSpaces.length > 0 ? (
											parkingSpaces.map(({ name, _id, slotsArr }) => (
												<TouchableOpacity
													key={_id}
													activeOpacity={0.7}
													onPress={() => {
														setSpace({ name: name, id: _id });
														handleSlots(slotsArr);
														setModalVisible(!modalVisible);
													}}
												>
													<Text
														style={{
															backgroundColor: theme.colors.surface,
															color: theme.colors.main,
															shadowColor: theme.colors.shadow,
															elevation: 5,
															borderColor: theme.colors.bg,
														}}
														className="text-base font-medium p-4 rounded-md mb-3 mx-5 border"
													>
														{name}
													</Text>
												</TouchableOpacity>
											))
										) : (
											<View className="h-full flex-col justify-center">
												<Text>No result ...</Text>
											</View>
										)
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
						height: "25%",
						borderBottomRightRadius: 40,
						borderBottomLeftRadius: 40,
						backgroundColor: theme.colors.main,
					}}
					className="w-full h-16 px-5 py-4 flex-col items-center"
				>
					{/* Center Row */}
					<Text
						style={{ letterSpacing: 1, color: theme.colors.surface }}
						className="text-xl mr-auto font-semibold uppercase mt-5"
					>
						RESERVATION
					</Text>

					{/* Bottom Row */}
					<View className="w-full my-auto">
						<View className="flex-row mt-3">
							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									backgroundColor: theme.colors.surface,
								}}
								onPress={() => setModalVisible(true)}
								className="w-full mx-auto my-auto flex-row items-center justify-between rounded-full px-6 py-3"
							>
								<Text
									style={{ color: theme.colors.darker }}
									className="font-semibold text-base"
								>
									{space === null ? "Select Parking Space" : space.name}
								</Text>
								{space === null && (
									<EvilIcons
										name="chevron-down"
										size={24}
										color={theme.colors.darkest}
									/>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>

				{space !== null ? (
					<>
						{/* SCROLL VIEW */}
						<ScrollView
							style={{ height: "60%" }}
							className="w-full flex-1 px-8"
						>
							<TouchableOpacity activeOpacity={1}>
								<Text className="text-base font-semibold mt-4 mb-2 text-gray-500 border-b border-gray-300">
									SELECT A SLOT
								</Text>
								<View className="w-full flex flex-col p-2">
									{/* Cards */}
									{slotsList.length > 0 ? (
										slotsList.map(({ block, slots }, index) => (
											<View key={index}>
												<Text className="text-lg text-darker font-medium border-b border-gray-300 p-1 mb-1">
													{block}
												</Text>

												<View className="w-full flex-row flex-wrap items-center mb-2">
													{slots.length > 0 ? (
														slots.map(({ status, slotNo }) => (
															<TouchableOpacity
																key={slotNo + 2000}
																activeOpacity={0.9}
																className="m-2"
																onPress={() => {
																	if (status === "free") {
																		setSlot(slotNo);
																	}
																}}
															>
																<Slot
																	reserved={status !== "free"}
																	name={slotNo}
																	active={slot === slotNo}
																/>
															</TouchableOpacity>
														))
													) : (
														<Text className="my-auto text-center font-medium text-dark text-lg">
															Empty block
														</Text>
													)}
												</View>
											</View>
										))
									) : (
										<Text className="my-auto text-center font-medium text-dark text-xl pt-10">
											Empty parking space
										</Text>
									)}
								</View>
							</TouchableOpacity>
						</ScrollView>

						<View
							style={{
								height: "10%",
							}}
							className="w-2/3"
						>
							<Button
								mode="contained"
								disabled={slot === null}
								onPress={() => handleContinue()}
							>
								Continue
							</Button>
						</View>
					</>
				) : (
					<Text className="my-auto font-medium text-dark text-xl">
						Select a parking space
					</Text>
				)}
			</View>
		</Background>
	);
};

export default BookingScreen;
