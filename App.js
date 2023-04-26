import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./core/navigation/AppStack.js";
import AuthStack from "./core/navigation/AuthStack.js";

import { theme, darkTheme } from "./core/theme";
import { StatusBar } from "react-native";

const App = () => {
	// const loggedIn = true;
	const loggedIn = false;

	return (
		<Provider theme={theme}>
			{/* <Provider theme={theme}> */}
			<StatusBar
				animated={true}
				backgroundColor={"#1364FC"}
				barStyle={"light-content"}
				showHideTransition={"fade"}
				// translucent={true}
				// hidden={true}
			/>

			<NavigationContainer>
				{loggedIn === true ? <AppStack /> : <AuthStack />}
			</NavigationContainer>
		</Provider>
	);
};

export default App;
