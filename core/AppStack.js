import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/Authorization/LoginScreen";
import RegisterScreen from "../screens/Authorization/RegisterScreen";
import ResetPasswordScreen from "../screens/Authorization/ResetPasswordScreen";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
import RegisterParkingSpace from "../screens/ParkingSpaces/RegisterParkingSpace";
import ParkingSpaces from "../screens/ParkingSpaces/ParkingSpaces";
import { ParkingSpaceDetails } from "../screens/ParkingSpaces/ParkingSpaceDetails";

const AppStack = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			initialRouteName="StartScreen"
			// initialRouteName="ParkingSpaces"
			// initialRouteName="Dashboard"
			// initialRouteName="ParkingSpaceDetails"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="StartScreen" component={StartScreen} />
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
			<Stack.Screen
				name="ResetPasswordScreen"
				component={ResetPasswordScreen}
			/>
			<Stack.Screen name="Dashboard" component={Dashboard} />
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="ParkingSpaces" component={ParkingSpaces} />
			<Stack.Screen
				name="ParkingSpaceDetails"
				component={ParkingSpaceDetails}
			/>
			<Stack.Screen
				name="RegisterParkingSpace"
				component={RegisterParkingSpace}
			/>
		</Stack.Navigator>
	);
};

export default AppStack;
