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
	const Tab = createBottomTabNavigator();
	const theme = useTheme();
	return (
		<Tab.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: theme.colors.text,
				tabBarInactiveTintColor: theme.colors.primary,
				tabBarItemStyle: {},
			}}
		>
			<Tab.Screen
				name="DashboardStack"
				component={DashboardStack}
				options={({ route }) => ({
					tabBarStyle: {
						...tabBarStyles,
						backgroundColor: theme.colors.bg0,
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
						...tabBarStyles,
						backgroundColor: theme.colors.bg0,

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
						...tabBarStyles,
						backgroundColor: theme.colors.bg0,
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

const tabBarStyles = {
	borderTopLeftRadius: 40,
	borderTopRightRadius: 40,
	height: 60,
};
