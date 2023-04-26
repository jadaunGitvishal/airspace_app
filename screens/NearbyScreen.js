import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

import Background from "../components/Background";
import BackButtonSimple from "../components/Button/BackButtonSimple";
import {
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import { theme } from "../core/theme";
import { Ionicons } from "@expo/vector-icons";
import psMarker from "../assets/parkingMarker.png";

const GOOGLE_MAPS_APIKEY = "AIzaSyDJ-L92KULtVlHgF8rEfwITLzF_xibHtxc";
const directionsMode = "driving";

export default function NearbyScreen({ navigation }) {
	const [loading, setLoading] = useState(true);

	// An array of parking spots with their coordinates and names
	const [parkings, setParkings] = useState([]);

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [parkingMarkers, setParkingMarkers] = useState([]);
	const origin = location ? location.coords : null;
	const [destination, setDestination] = useState(null);

	// get current location
	useEffect(() => {
		(async () => {
			setTimeout(async () => {
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied");
					return;
				}

				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
			}, 500);
		})();
	}, []);

	// update parking markers & distance
	useEffect(() => {
		if (!location) return;
		const updatedMarkers = parkings.map((parking) => {
			const distance = getDrivingDistance(
				location.coords.latitude,
				location.coords.longitude,
				parking.latlng.latitude,
				parking.latlng.longitude
			);
			return { name: parking.name, latlng: parking.latlng, distance };
		});

		setParkingMarkers(updatedMarkers);
	}, [location]);

	// calculate distance between two coordinates
	const getDrivingDistance = async (lat1, lng1, lat2, lng2) => {
		// try {
		// 	const response = await fetch(
		// 		`https://maps.googleapis.com/maps/api/distancematrix/json
		// 		?destinations=${lat1},${lng1}
		// 		&origins=${lat2},${lng2}
		// 		&units=metric
		// 		&key=${GOOGLE_MAPS_APIKEY}`
		// 	);
		// 	const data = await response.json();

		// 	if (data.status === "OK") {
		// 		const distance = data.rows[0].elements[0].distance.text;
		// 		const time = data.rows[0].elements[0].duration.text;
		// 		console.log(distance);
		// 		return distance;
		// 	}

		// 	return 0;
		// } catch (error) {
		// 	console.log(error);
		// 	return null;
		// }

		//
		//
		//

		const R = 6371; // Radius of the earth in km
		const dLat = deg2rad(lat2 - lat1);
		const dLon = deg2rad(lng2 - lng1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) *
				Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c; // Distance in km
		return d;
	};
	const deg2rad = (deg) => {
		return deg * (Math.PI / 180);
	};

	// fetch data
	useEffect(() => {
		function fetchData() {
			setParkings([
				{
					name: "Iqra Uni",
					latlng: { latitude: 33.6641293, longitude: 73.0453663 },
				},
				{
					name: "Cui",
					latlng: { latitude: 33.6515371, longitude: 73.1558874 },
				},
			]);

			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}

		fetchData();
	}, []);

	return (
		<Background>
			<View
				style={{ backgroundColor: theme.colors.main }}
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
							className="text-lg font-semibold"
						>
							NEARBY
						</Text>
						<Ionicons
							name="location-outline"
							size={20}
							color={theme.colors.surface}
						/>
					</View>
				</View>

				{/* SETTINGS AREA */}
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "center",
						flexDirection: "column",
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
						backgroundColor: theme.colors.surface,
					}}
				>
					<TouchableOpacity
						activeOpacity={1}
						className="h-full p-6 items-center"
					>
						<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300 uppercase">
							NEARBY PARKING SPACES
						</Text>

						{loading === false ? (
							<View className="flex-1 w-full">
								{errorMsg && (
									<View className="h-full flex-col justify-center">
										<Text>{errorMsg}</Text>
									</View>
								)}
								{location && (
									<MapView
										className="h-full w-full bg-slate-200"
										region={{
											latitude: location.coords.latitude,
											longitude: location.coords.longitude,
											latitudeDelta: 0.4,
											longitudeDelta: 0.4,
										}}
									>
										<Marker
											coordinate={{
												latitude: location.coords.latitude,
												longitude: location.coords.longitude,
											}}
											title="Your location"
											pinColor={theme.colors.main}
										/>

										{parkingMarkers.map((marker, index) => (
											<Marker
												key={index}
												coordinate={marker.latlng}
												title={marker.name}
												description={`${marker.distance._z.toFixed(1)} km away`}
												image={psMarker}
												onPress={() => setDestination(marker.latlng)}
											/>
										))}

										{origin && destination && (
											<MapViewDirections
												origin={origin}
												destination={destination}
												apikey={GOOGLE_MAPS_APIKEY}
												mode={directionsMode}
												strokeWidth={4}
												strokeColor={theme.colors.main}
											/>
										)}
									</MapView>
								)}
							</View>
						) : (
							<View className="h-full flex-col justify-center">
								<ActivityIndicator size={45} color={theme.colors.bg0} />
							</View>
						)}
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}
