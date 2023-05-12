import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../../screens/Authorization/StartScreen";
import LoginScreen from "../../screens/Authorization/LoginScreen";
import RegisterScreen from "../../screens/Authorization/RegisterScreen";
import ForgetPasswordScreen from "../../screens/Authorization/ForgetPasswordScreen";
import OtpScreen from "../../screens/Authorization/OtpScreen";
import ResetPasswordScreen from "../../screens/Authorization/ResetPasswordScreen.js";

const AuthStack = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			initialRouteName="StartScreen"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="StartScreen" component={StartScreen} />
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
			<Stack.Screen
				name="ForgetPasswordScreen"
				component={ForgetPasswordScreen}
			/>
			<Stack.Screen name="OtpScreen" component={OtpScreen} />
			<Stack.Screen
				name="ResetPasswordScreen"
				component={ResetPasswordScreen}
			/>
		</Stack.Navigator>
	);
};

export default AuthStack;
