import React, { useState } from "react";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import {
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import {
	AntDesign,
	MaterialIcons,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import Button from "../../components/Button/Button";
import TextInput from "../../components/Input/TextInput";

export default function AddVehicleScreen({ navigation }) {
	const [name, setName] = useState({ value: "", error: "" });
	const [model, setModel] = useState({ value: "", error: "" });
	const [color, setColor] = useState({ value: "", error: "" });
	const [number, setNumber] = useState({ value: "", error: "" });

	const handleRegister = () => {
		const nameError = checkErrors(name);
		const modelError = checkErrors(model);
		const colorError = checkErrors(color);
		const numberError = checkErrors(number);
		if (nameError || modelError || colorError || numberError) {
			setName({ ...name, error: nameError });
			setModel({ ...model, error: modelError });
			setColor({ ...color, error: colorError });
			setNumber({ ...color, error: numberError });
			return;
		}

		alert("Registered");
	};

	const checkErrors = (inp) => {
		if (inp.value === "") {
			return "*this field cannot be empty";
		}

		return "";
	};

	return (
		<Background>
			<View
				style={{ backgroundColor: theme.colors.main }}
				className="h-full w-full"
			>
				{/* HEADER */}
				<View
					style={{
						height: "15%",
						backgroundColor: theme.colors.main,
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center"
				>
					{/* Top Row */}
					<View className="w-full flex-row items-center justify-betwee">
						<BackButtonSimple goBack={navigation.goBack} />
						{/* <MenuButton /> */}
					</View>

					{/* Middle Row */}
					<View
						style={{ letterSpacing: 1 }}
						className="w-full px-4 mt-2 flex-row items-center justify-between"
					>
						<Text
							style={{ color: theme.colors.surface }}
							className=" text-lg font-semibold"
						>
							ADD VEHICLES
						</Text>
						<Ionicons
							name="car-sport-outline"
							size={20}
							color={theme.colors.surface}
						/>
					</View>
				</View>

				{/* SETTINGS AREA */}
				<ScrollView
					style={{
						height: "85%",
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
						backgroundColor: theme.colors.surface,
					}}
					className="w-full"
				>
					<TouchableOpacity
						activeOpacity={1}
						className="h-full w-full p-6 pt-10 items-center"
					>
						<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300 uppercase">
							ADD VEHICLE
						</Text>

						<TextInput
							label="Number"
							returnKeyType="done"
							value={number.value}
							onChangeText={(text) => setNumber({ value: text, error: null })}
							error={number.error}
							errorText={number.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
						/>

						<TextInput
							label="Name"
							returnKeyType="done"
							value={name.value}
							onChangeText={(text) => setName({ value: text, error: "" })}
							error={name.error}
							errorText={name.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
						/>

						<TextInput
							label="Model"
							returnKeyType="done"
							value={model.value}
							onChangeText={(text) => setModel({ value: text, error: "" })}
							error={model.error}
							errorText={model.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
							keyboardType="number-pad"
						/>

						<TextInput
							label="Color"
							returnKeyType="done"
							value={color.value}
							onChangeText={(text) => setColor({ value: text, error: null })}
							error={color.error}
							errorText={color.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
						/>

						<View className="w-2/4 ml-auto mt-5">
							<Button
								mode="contained"
								onPress={() => {
									handleRegister();
								}}
							>
								Register
							</Button>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}
