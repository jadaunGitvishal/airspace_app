import React, { useState } from "react";
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
import dataUpdateWithNotificationSocket from "./socket/pushNotificationSocket.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectApp, setMode } from "./features/appSlice.js";

const App = () => {
	return (
		<ReduxProvider store={store}>
			<MainComponent />
		</ReduxProvider>
	);
};

export default App;

//

function MainComponent() {
	const dispatch = useDispatch();
	const { user, loading } = useSelector(selectUser);
	const { dark, notif } = useSelector(selectApp);

	const [darkMode, setDarkMode] = useState(null);
	const [notification, setNotification] = useState(null);

	// get mode
	useEffect(() => {
		const getMode = async () => {
			try {
				const value = await AsyncStorage.getItem("darkMode");

				if (value === null) {
					setDarkMode(false);
				} else {
					setDarkMode(JSON.parse(value));
				}
			} catch (error) {
				console.log("Error retrieving dark mode:", error);
			}
		};

		getMode();
	}, [dark]);

	// get notification
	useEffect(() => {
		const getNotif = async () => {
			try {
				const value = await AsyncStorage.getItem("notif");
				// console.log("notif is", value);

				if (value === null) {
					setNotification(false);
				} else {
					setNotification(JSON.parse(value));
				}
			} catch (error) {
				console.log("Error retrieving notif:", error);
			}
		};

		getNotif();
	}, [notif]);

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
			console.log(user);
			console.log(data);
			if (data?.forAll === false && data?.user !== user?.user?._id) {
				return;
			}

			if (notification === false) {
				return;
			}

			await Notifications.scheduleNotificationAsync({
				content: {
					title: data?.title,
					body: data?.text,
				},
				trigger: {
					seconds: 1,
					channelId: "default",
				},
			});
		}

		// socket update
		dataUpdateWithNotificationSocket(notify);
	}, [user]);

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

	// useEffect(() => {
	// 	console.log(
	// 		"-----------------------------------------------------------------------"
	// 	);
	// 	console.log(loading);
	// 	console.log(user?.user);
	// 	console.log(
	// 		"-----------------------------------------------------------------------"
	// 	);
	// }, [user, loading]);

	return (
		<Provider
			theme={darkMode !== null && (darkMode === true ? darkTheme : theme)}
		>
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
		</Provider>
	);
}
