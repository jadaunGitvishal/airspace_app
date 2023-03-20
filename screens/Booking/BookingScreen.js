import React, { useEffect, useState } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
	Modal,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Background from "../../components/Background";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import MenuButton from "../../components/Button/MenuButton";
import { TextInput as PaperInput } from "react-native-paper";
import Slot from "../../components/Slot/Slot";
import Button from "../../components/Button/Button";
import * as api from "../../api/parkingSpacesReuests";
import ParkingSpaces from "../ParkingSpaces/ParkingSpaces";

const BookingScreen = ({ navigation }) => {
	const [slot, setSlot] = useState(null);
	const [space, setSpace] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
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

	const [slotsList, setSlotsList] = useState([
		{
			reserved: true,
			name: "1",
		},
		{
			reserved: false,
			name: "2",
		},
		{
			reserved: false,
			name: "3",
		},
		{
			reserved: true,
			name: "4",
		},
		{
			reserved: false,
			name: "5",
		},
		{
			reserved: true,
			name: "6",
		},
		{
			reserved: true,
			name: "7",
		},
		{
			reserved: false,
			name: "8",
		},
		{
			reserved: false,
			name: "8",
		},
		{
			reserved: true,
			name: "10",
		},
		{
			reserved: false,
			name: "11",
		},
		{
			reserved: true,
			name: "12",
		},
		{
			reserved: false,
			name: "13",
		},
	]);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const { data } = await api.fetchAllParkings();
	// 		setSpacesList(data.allParkings);
	// 	};
	// 	getData();
	// }, []);

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
			<View className="h-full p-0 items-center bg-white">
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
							backgroundColor: theme.colors.accent1,
						}}
					>
						<View
							style={{
								backgroundColor: "white",
								borderRadius: 20,
								alignItems: "center",
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 2,
								},
								shadowOpacity: 0.25,
								shadowRadius: 4,
								elevation: 5,
								width: "95%",
							}}
							className="h-3/4 px-7 py-5"
						>
							<View
								style={{
									height: "10%",
								}}
								className="w-full flex-row justify-between items-center border-b border-gray-300"
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
									{parkingSpaces.length > 0 ? (
										parkingSpaces.map(({ name, _id }) => (
											<TouchableOpacity
												key={_id}
												activeOpacity={0.7}
												onPress={() => {
													setSpace(name);
													setModalVisible(!modalVisible);
												}}
											>
												<Text
													style={{
														backgroundColor: theme.colors.secondary,
														color: theme.colors.primary,
													}}
													className="text-base font-medium p-4 rounded-md shadow-sm shadow-black my-3"
												>
													{name}
												</Text>
											</TouchableOpacity>
										))
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
				<LinearGradient
					style={{
						paddingTop: StatusBar.currentHeight + 10,
						height: "30%",
						minHeight: 200,
						borderBottomRightRadius: 30,
						borderBottomLeftRadius: 30,
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center"
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
						className="text-white text-2xl mr-auto pt-4 font-semibold uppercase"
					>
						RESERVATION
					</Text>

					{/* Bottom Row */}
					<View className="w-full my-auto">
						<View className="flex-row mt-3">
							<TouchableOpacity
								activeOpacity={0.8}
								style={{
									backgroundColor: theme.colors.accent,
								}}
								onPress={() => setModalVisible(true)}
								className="w-5/6 mx-auto my-auto flex-row items-center justify-between rounded-md p-4"
							>
								<Text className="font-semibold text-white text-base">
									{space === null ? "Select Parking Space" : space}
								</Text>
								{space === null && (
									<EvilIcons name="chevron-down" size={24} color="white" />
								)}
							</TouchableOpacity>
						</View>
					</View>
				</LinearGradient>

				{space !== null && (
					<>
						{/* SCROLL VIEW */}
						<ScrollView
							style={{ height: "60%" }}
							className="w-full flex-1 px-8"
						>
							<TouchableOpacity activeOpacity={1}>
								<Text className="text-base font-semibold mt-4 mb-4 text-gray-500 border-b border-gray-300">
									SELECT A SLOT
								</Text>
								<View className="w-full flex-row flex-wrap items-center p-2">
									{/* Cards */}
									{slotsList.map(({ reserved, name }, index) => (
										<TouchableOpacity
											key={index}
											activeOpacity={0.9}
											className="m-2"
											onPress={() => {
												if (reserved === false) {
													setSlot(name);
												}
											}}
										>
											<Slot
												reserved={reserved}
												name={name}
												active={slot === name}
											/>
										</TouchableOpacity>
									))}
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
				)}
			</View>
		</Background>
	);
};

export default BookingScreen;
