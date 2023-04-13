import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import ParkingStack from "./ParkingStack";
import BookingStack from "./BookingStack";
import DashboardStack from "./DashboardStack";

import {
	Ionicons,
	MaterialIcons,
	MaterialCommunityIcons,
	SimpleLineIcons,
	Octicons,
} from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export default function TabNavigator() {
	const theme = useTheme();
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: theme.colors.main,
				tabBarInactiveTintColor: theme.colors.dark,
				// tabBarActiveBackgroundColor: theme.colors.surface,
				tabBarItemStyle: {
					// borderRadius: 50,
					// margin: 4,
				},
				tabBarStyle: {},
			}}
		>
			<Tab.Screen
				name="DashboardStack"
				component={DashboardStack}
				options={({ route }) => ({
					tabBarStyle: {
						...tabBarStyles(theme),
						display:
							getFocusedRouteNameFromRoute(route) === "Sidebar" ||
							getFocusedRouteNameFromRoute(route) === "Notifications" ||
							getFocusedRouteNameFromRoute(route) === "Settings" ||
							getFocusedRouteNameFromRoute(route) === "AccountSettings" ||
							getFocusedRouteNameFromRoute(route) === "UpdatePassword" ||
							getFocusedRouteNameFromRoute(route) === "History"
								? "none"
								: "flex",
					},
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="view-dashboard"
							color={color}
							size={size}
						/>
					),
				})}
			/>

			<Tab.Screen
				name="BookingStack"
				component={BookingStack}
				options={({ route }) => ({
					tabBarStyle: {
						...tabBarStyles(theme),
						display:
							getFocusedRouteNameFromRoute(route) === "BookingNext"
								? "none"
								: "flex",
					},
					tabBarIcon: ({ color, size }) => (
						<Octicons name="diff-added" color={color} size={size} />
					),
				})}
			/>

			<Tab.Screen
				name="ParkingsStack"
				component={ParkingStack}
				options={({ route }) => ({
					tabBarStyle: {
						...tabBarStyles(theme),
						display:
							getFocusedRouteNameFromRoute(route) === "ParkingSpaceDetails" ||
							getFocusedRouteNameFromRoute(route) === "RegisterParkingSpace"
								? "none"
								: "flex",
					},
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="office-building-marker"
							color={color}
							size={size}
						/>
					),
				})}
			/>
		</Tab.Navigator>
	);
}

const tabBarStyles = (theme) => {
	return {
		height: 55,

		// height: 50,
		// width: "90%",

		// marginLeft: "5%",
		// marginBottom: 15,

		// borderRadius: 50,
		// backgroundColor: theme.colors.main,

		// position: "absolute",
		// bottom: 0,
	};
};
