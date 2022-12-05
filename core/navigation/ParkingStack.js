import React from "react";
import RegisterParkingSpace from "../../screens/ParkingSpaces/RegisterParkingSpace";
import ParkingSpaces from "../../screens/ParkingSpaces/ParkingSpaces";
import ParkingSpaceDetails from "../../screens/ParkingSpaces/ParkingSpaceDetails";
import { createStackNavigator } from "@react-navigation/stack";

export default function ParkingStack() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="ParkingSpaces" component={ParkingSpaces} />
			<Stack.Screen
				name="ParkingSpaceDetails"
				component={ParkingSpaceDetails}
				// options={{
				// 	cardStyleInterpolator: ({ current, layouts }) => {
				// 		return {
				// 			cardStyle: {
				// 				transform: [
				// 					{
				// 						translateX: current.progress.interpolate({
				// 							inputRange: [0, 1],
				// 							outputRange: [layouts.screen.width, 0],
				// 						}),
				// 					},
				// 				],
				// 			},
				// 		};
				// 	},
				// }}
			/>
			<Stack.Screen
				name="RegisterParkingSpace"
				component={RegisterParkingSpace}
				// options={{
				// 	cardStyleInterpolator: ({ current, layouts }) => {
				// 		return {
				// 			cardStyle: {
				// 				transform: [
				// 					{
				// 						translateX: current.progress.interpolate({
				// 							inputRange: [0, 1],
				// 							outputRange: [layouts.screen.width, 10],
				// 						}),
				// 					},
				// 				],
				// 			},
				// 		};
				// 	},
				// }}
			/>
		</Stack.Navigator>
	);
}
