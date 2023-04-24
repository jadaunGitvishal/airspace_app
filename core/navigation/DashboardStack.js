import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../../screens/Dashboard";
import Sidebar from "../../screens/Sidebar";
import NotificationsScreen from "../../screens/NotificationsScreen";
import Settings from "../../screens/Settings/SettingsScreen";
import UpdatePasswordScreen from "../../screens/Settings/UpdatePasswordScreen";
import AccountSettingsScreen from "../../screens/Settings/AccountSettingsScreen";
import HistoryScreen from "../../screens/HistoryScreen";
import VehiclesScreen from "../../screens/Vehicles/VehiclesScreen";
import AddVehicleScreen from "../../screens/Vehicles/AddVehicleScreen";
import NearbyScreen from "../../screens/NearbyScreen";
import PaymentsScreen from "../../screens/PaymentsScreen";

export default function DashboardStack() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Dashboard" component={Dashboard} />

			<Stack.Screen
				name="Sidebar"
				component={Sidebar}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [-layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="UpdatePassword"
				component={UpdatePasswordScreen}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="AccountSettings"
				component={AccountSettingsScreen}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="Vehicles"
				component={VehiclesScreen}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="AddVehicle"
				component={AddVehicleScreen}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="History"
				component={HistoryScreen}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="Nearby"
				component={NearbyScreen}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>

			<Stack.Screen
				name="Payments"
				component={PaymentsScreen}
				options={{
					cardStyleInterpolator: ({ current, layouts }) => {
						return {
							cardStyle: {
								transform: [
									{
										translateX: current.progress.interpolate({
											inputRange: [0, 1],
											outputRange: [layouts.screen.width, 0],
										}),
									},
								],
							},
						};
					},
				}}
			/>
		</Stack.Navigator>
	);
}
