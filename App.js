import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./core/navigation/AppStack.js";
import AuthStack from "./core/navigation/AuthStack.js";

import { theme } from "./core/theme";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

const App = () => {
	const [fontsLoaded] = useFonts({
		Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
	});

	const loggedIn = true;
	// const loggedIn = false;

	return (
		<Provider theme={theme}>
			<StatusBar
				animated={true}
				backgroundColor={"transparent"}
				barStyle={"light-content"}
				showHideTransition={"fade"}
				translucent={true}
			/>

			<NavigationContainer>
				{loggedIn === true ? <AppStack /> : <AuthStack />}
			</NavigationContainer>
		</Provider>
	);
};

export default App;
