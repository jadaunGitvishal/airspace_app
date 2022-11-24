import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./core/AppStack.js";

import { theme } from "./core/theme";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

const App = () => {
	const [fontsLoaded] = useFonts({
		Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
	});
	return (
		<Provider theme={theme}>
			<StatusBar
				animated={true}
				backgroundColor={"black"}
				barStyle={"light-content"}
				showHideTransition={"fade"}
				translucent={false}
				// hidden={true}
			/>
			<NavigationContainer>
				<AppStack />
			</NavigationContainer>
		</Provider>
	);
};

export default App;
