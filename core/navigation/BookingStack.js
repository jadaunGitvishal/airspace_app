import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookingScreen from "../../screens/Booking/BookingScreen";

export default function BookingStack() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Booking" component={BookingScreen} />
		</Stack.Navigator>
	);
}
