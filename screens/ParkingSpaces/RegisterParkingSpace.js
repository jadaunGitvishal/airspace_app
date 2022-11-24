import React, { useState } from "react";
import Background from "../../components/Background";
import Heading from "../../components/Text/Heading";
import Paragraph from "../../components/Text/Paragraph";
import Button from "../../components/Button/Button";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../core/theme";
import Header from "../../components/Navbar/Header";
import TextInput from "../../components/Input/TextInput";
import HeaderSimple from "../../components/Navbar/HeaderSimple";

const RegisterParkingSpace = ({ navigation }) => {
	const [reg, setReg] = useState({ value: "", error: "" });

	return (
		<Background>
			<View className="h-full p-0 items-center">
				<HeaderSimple goBack={navigation.goBack} name={"CUI Registeration"} />
				<View className="h-full w-full p-4 items-center">
					<TextInput
						label="Name"
						returnKeyType="done"
						value={reg.value}
						onChangeText={(text) => setReg({ value: text, error: "" })}
						error={reg.error}
						errorText={reg.error}
						secureTextEntry
					/>

					<TextInput
						label="Reg No / ID"
						returnKeyType="done"
						value={reg.value}
						onChangeText={(text) => setReg({ value: text, error: "" })}
						error={reg.error}
						errorText={reg.error}
						secureTextEntry
					/>

					<TextInput
						label="Department"
						returnKeyType="done"
						value={reg.value}
						onChangeText={(text) => setReg({ value: text, error: "" })}
						error={reg.error}
						errorText={reg.error}
						secureTextEntry
					/>

					<TextInput
						label="Vehicle Registration Number"
						returnKeyType="done"
						value={reg.value}
						onChangeText={(text) => setReg({ value: text, error: "" })}
						error={reg.error}
						errorText={reg.error}
						secureTextEntry
					/>

					<TextInput
						label="Owner's CNIC"
						returnKeyType="done"
						value={reg.value}
						onChangeText={(text) => setReg({ value: text, error: "" })}
						error={reg.error}
						errorText={reg.error}
						secureTextEntry
					/>

					<Button mode="contained" onPress={""}>
						Request
					</Button>
				</View>
			</View>
		</Background>
	);
};

export default RegisterParkingSpace;
