import React, { useState } from "react";
import MenuButton from "../../components/Button/MenuButton";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import Button from "../../components/Button/Button";
import {
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import TextInput from "../../components/Input/TextInput";

const RegisterParkingSpace = ({ navigation }) => {
	const [name, setName] = useState({ value: "", error: "" });
	const [reg, setReg] = useState({ value: "", error: "" });
	const [dept, setDept] = useState({ value: "", error: "" });
	const [vno, setVno] = useState({ value: "", error: "" });
	const [CNIC, setCNIC] = useState({ value: "", error: "" });

	const handleSubmit = () => {
		const nameError = checkErrors(name);
		const regError = checkErrors(reg);
		const deptError = checkErrors(dept);
		const vnoError = checkErrors(vno);
		const CNICError = checkErrors(CNIC);
		if (nameError || regError || deptError || vnoError || CNICError) {
			setName({ ...name, error: nameError });
			setReg({ ...name, error: regError });
			setDept({ ...name, error: deptError });
			setVno({ ...name, error: vnoError });
			setCNIC({ ...name, error: CNICError });
			return;
		} else {
			alert("Submitted");
		}
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
				style={{ backgroundColor: theme.colors.bg0 }}
				className="h-full p-0 items-center"
			>
				{/* HEADER */}
				<LinearGradient
					style={{
						paddingTop: StatusBar.currentHeight + 10,
						height: "20%",
					}}
					className="w-full h-16 p-4 pb-6 flex-col items-center"
					colors={["rgba(46, 199, 255,1)", "rgba(197, 81, 204,0.9)"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 10, y: 0 }}
				>
					{/* Top Row */}
					<View className="w-full flex-row items-center justify-betwee">
						<BackButtonSimple goBack={navigation.goBack} />
						{/* <MenuButton /> */}
					</View>

					{/* Middle Row */}
					<Text
						style={{ letterSpacing: 1 }}
						className="w-full text-start px-4 text-white text-lg font-semibold mt-4"
					>
						REGISTRATION
					</Text>

					{/* Bottom Row */}
					<Text
						style={{ letterSpacing: 1 }}
						className="w-full text-start px-4 text-white"
					>
						COMSATS UNIVERSITY ISLAMABAD
					</Text>
				</LinearGradient>

				<ScrollView
					style={{
						height: "80%",
						borderTopRightRadius: 30,
						borderTopLeftRadius: 30,
					}}
					className="w-full bg-white"
				>
					<TouchableOpacity
						activeOpacity={1}
						className="h-full w-full p-6 pt-10 items-center"
					>
						<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300">
							REGISTER
						</Text>

						<TextInput
							label="Name"
							returnKeyType="done"
							value={name.value}
							onChangeText={(text) => setName({ value: text, error: "" })}
							error={name.error}
							errorText={name.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
							secureTextEntry
						/>

						<TextInput
							label="Reg No / ID"
							returnKeyType="done"
							value={reg.value}
							onChangeText={(text) => setReg({ value: text, error: "" })}
							error={reg.error}
							errorText={reg.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
							secureTextEntry
						/>

						<TextInput
							label="Department"
							returnKeyType="done"
							value={dept.value}
							onChangeText={(text) => setDept({ value: text, error: "" })}
							error={dept.error}
							errorText={dept.error}
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
							secureTextEntry
						/>

						<TextInput
							label="Vehicle Registration Number"
							returnKeyType="done"
							value={vno.value}
							onChangeText={(text) => setVno({ value: text, error: "" })}
							error={vno.error}
							errorText={vno.error}
							secureTextEntry
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
						/>

						<TextInput
							label="Owner's CNIC"
							returnKeyType="done"
							value={CNIC.value}
							onChangeText={(text) => setCNIC({ value: text, error: "" })}
							error={CNIC.error}
							errorText={CNIC.error}
							secureTextEntry
							containerStyle={{ marginVertical: 5 }}
							inputStyle={{ height: 50 }}
						/>

						<View className="w-2/4 ml-auto mt-5">
							<Button
								mode="contained"
								onPress={() => {
									handleSubmit();
								}}
							>
								Submit
							</Button>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
};

export default RegisterParkingSpace;
