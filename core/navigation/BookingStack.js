import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookingScreen from "../../screens/Booking/BookingScreen";
import BookingNextScreen from "../../screens/Booking/BookingNextScreen";

export default function BookingStack() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Booking" component={BookingScreen} />
			<Stack.Screen name="BookingNext" component={BookingNextScreen} />
		</Stack.Navigator>
	);
}
