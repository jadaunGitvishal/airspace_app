import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Heading from "../components/Text/Heading";
import Button from "../components/Button/Button";
import Paragraph from "../components/Text/Paragraph";
import { View, StatusBar } from "react-native";
import { theme } from "../core/theme";

const StartScreen = ({ navigation }) => {
	return (
		<Background>
			<View className="h-full px-10 items-center justify-center">
				<StatusBar
					animated={true}
					backgroundColor={theme.colors.surface}
					barStyle={"dark-content"}
					showHideTransition={"fade"}
					// translucent={true}
					// hidden={true}
				/>
				<Logo size={140} />
				<Heading>Air Space</Heading>
				<Paragraph>
					Lorem ipsum dolor sit, amet consectetur adipisicing
				</Paragraph>
				<Button
					mode="contained"
					onPress={() => navigation.navigate("LoginScreen")}
				>
					Login
				</Button>
				<Button
					mode="outlined"
					onPress={() => navigation.navigate("RegisterScreen")}
				>
					Sign Up
				</Button>
			</View>
		</Background>
	);
};

export default StartScreen;
