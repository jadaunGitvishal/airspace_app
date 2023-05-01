import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./core/navigation/AppStack.js";
import AuthStack from "./core/navigation/AuthStack.js";

import { theme, darkTheme } from "./core/theme";
import { ActivityIndicator, StatusBar, View } from "react-native";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./app/store.js";
import { useEffect } from "react";
import {
	logIn,
	logOut,
	selectUser,
	useDispatch,
	useSelector,
} from "./features/userSlice.js";
import * as api from "./api/userRequests.js";
import * as Notifications from "expo-notifications";
import dataUpdateWithNotificationSocket from "./socket/notificationSocket.js";

const App = () => {
	return (
		<ReduxProvider store={store}>
			<Provider theme={theme}>
				<MainComponent />
			</Provider>
		</ReduxProvider>
	);
};

export default App;

//

function MainComponent() {
	const dispatch = useDispatch();
	const { user, loading } = useSelector(selectUser);

	//
	//
	// check login status
	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await api.loadUser();
				// console.log(data);

				if (data) {
					dispatch(
						logIn({
							user: data.user,
						})
					);
				} else {
					console.log("No user found");
				}
			} catch (error) {
				console.log("=> Error");
				console.log(error);
				dispatch(logOut());
			}
		}

		fetchData();
	}, []);

	//
	//
	// notifications
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		}),
	});
	useEffect(() => {
		async function notify(data) {
			console.log(data);
			await Notifications.scheduleNotificationAsync({
				content: {
					title: "Expo Notification",
					body: data?.updateDescription.updatedFields?.text ?? "Gandu",
					data: { someData: "goes here" },
				},
				trigger: {
					seconds: 1,
					channelId: "default",
				},
			});
			// get exact data
		}
		// notify();

		// socket update
		dataUpdateWithNotificationSocket(notify);
	}, [user]);

	//
	//
	// print data
	useEffect(() => {
		// console.log("=> " + JSON.stringify(user) + " | " + loading);
	}, [user, loading]);

	return (
		<>
			<StatusBar
				animated={true}
				backgroundColor={
					user !== null ? theme.colors.main : theme.colors.surface
				}
				barStyle={user !== null ? "light-content" : "dark-content"}
				showHideTransition={"fade"}
				// translucent={true}
				// hidden={true}
			/>

			<NavigationContainer>
				{loading === false ? (
					user !== null ? (
						<AppStack />
					) : (
						<AuthStack />
					)
				) : (
					<View className="h-full flex-col justify-center">
						<ActivityIndicator size={45} color={theme.colors.bg0} />
					</View>
				)}
			</NavigationContainer>
		</>
	);
}
