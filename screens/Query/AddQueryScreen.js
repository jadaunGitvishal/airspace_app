import React, { useState } from "react";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button/Button";
import TextInput from "../../components/Input/TextInput";
import * as api from "../../api/userRequests";

export default function AddQueryScreen({ navigation }) {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const [subject, setSubject] = useState({ value: "", error: "" });
	const [message, setMessage] = useState({ value: "", error: "" });

	const handleRegister = async () => {
		const subjectError = checkErrors(subject);
		const messageError = checkErrors(message);
		if (subjectError || messageError) {
			setSubject({ ...subject, error: subjectError });
			setMessage({ ...message, error: messageError });
			return;
		}

		try {
			setLoading(true);
			const { data } = await api.addQuery({
				subject: subject.value,
				message: message.value,
			});
			if (data) {
				Alert.alert(
					"Query Registered",
					"A new query is registered with your account."
				);
				navigation.goBack();
			} else {
				Alert.alert("Error", "Data not found.");
			}
			setLoading(false);
		} catch (error) {
			console.log("=> Error");
			console.log(error);
			Alert.alert(
				"Error",
				error?.response?.data?.message ?? "An error occured."
			);
			setLoading(false);
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
							ADD QUERY
						</Text>
						<Ionicons
							name="chatbox-ellipses-outline"
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
					{loading === true ? (
						<View className="h-full flex-col justify-center my-20">
							<ActivityIndicator size={45} color={theme.colors.bg0} />
						</View>
					) : (
						<TouchableOpacity
							activeOpacity={1}
							className="h-full w-full p-6 pt-10 items-center"
						>
							<Text className="text-base font-semibold w-full text-left border-b pb-2 pl-2 mb-5 border-gray-300 uppercase">
								ADD QUERY
							</Text>

							<TextInput
								label="Subject"
								returnKeyType="done"
								value={subject.value}
								onChangeText={(text) =>
									setSubject({ value: text, error: null })
								}
								error={subject.error}
								errorText={subject.error}
								containerStyle={{ marginVertical: 5 }}
								inputStyle={{ height: 50 }}
							/>

							<TextInput
								label="Message"
								returnKeyType="done"
								value={message.value}
								onChangeText={(text) => setMessage({ value: text, error: "" })}
								error={message.error}
								errorText={message.error}
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
									Add
								</Button>
							</View>
						</TouchableOpacity>
					)}
				</ScrollView>
			</View>
		</Background>
	);
}
