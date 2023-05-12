import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
	ActivityIndicator,
	Alert,
} from "react-native";
import { Text } from "react-native-paper";
import Paragraph from "../../../components/Text/Paragraph";
import Background from "../../../components/Background";
import Logo from "../../../components/Logo";
import Heading from "../../../components/Text/Heading";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/Input/TextInput";
import BackButton from "../../../components/Button/BackButton";
import { theme } from "../../../core/theme";
import { emailValidator } from "../../../helpers/emailValidator";
import { passwordValidator } from "../../../helpers/passwordValidator";
import { nameValidator } from "../../../helpers/nameValidator";
import * as ImagePicker from "expo-image-picker";
import * as api from "../../../api/userRequests";
import { useDispatch } from "react-redux";

const UpdateImageScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const [selectedImage, setSelectedImage] = useState({ value: "", error: "" });
	const [name, setName] = useState({ value: "", error: "" });
	const [email, setEmail] = useState({ value: "", error: "" });
	const [phone, setPhone] = useState({ value: "", error: "" });
	const [CNIC, setCNIC] = useState({ value: "", error: "" });
	const [city, setCity] = useState({ value: "", error: "" });
	const [address, setAddress] = useState({ value: "", error: "" });
	const [password, setPassword] = useState({ value: "", error: "" });
	const [confirmPassword, setConfirmPassword] = useState({
		value: "",
		error: "",
	});

	// pick photo
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		if (!result.cancelled) {
			setSelectedImage({ value: result.base64, error: "" });
		}
	};

	// take photo
	const takePhoto = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		if (!result.cancelled) {
			setSelectedImage({ value: result.base64, error: "" });
		}
	};

	// permissions
	useEffect(() => {
		async function takePermission() {
			// Request camera permission
			let cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
			if (cameraPermission.status !== "granted") {
				alert("Sorry, we need camera roll permissions to make this work!");
				return;
			}

			// Request photo library permission
			let libraryPermission =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (libraryPermission.status !== "granted") {
				alert("Sorry, we need camera roll permissions to make this work!");
				return;
			}
		}

		takePermission();
	}, []);

	// handle signup
	const handleSignUp = async () => {
		const imageError = nameValidator(selectedImage.value);
		const nameError = nameValidator(name.value);
		const emailError = emailValidator(email.value);
		const phoneError = nameValidator(phone.value);
		const CNICError = nameValidator(CNIC.value);
		const cityError = nameValidator(city.value);
		const addressError = nameValidator(address.value);
		const passwordError = passwordValidator(password.value);
		const confirmPasswordError =
			confirmPassword.value !== password.value && "Passwords don't match.";

		if (
			imageError ||
			nameError ||
			emailError ||
			phoneError ||
			CNICError ||
			cityError ||
			addressError ||
			passwordError ||
			confirmPasswordError
		) {
			setSelectedImage({ ...selectedImage, error: imageError });
			setName({ ...name, error: nameError });
			setEmail({ ...email, error: emailError });
			setPhone({ ...email, error: phoneError });
			setCNIC({ ...email, error: CNICError });
			setCity({ ...email, error: cityError });
			setAddress({ ...email, error: addressError });
			setPassword({ ...password, error: passwordError });
			setConfirmPassword({ ...password, error: confirmPasswordError });
			return;
		}

		setLoading(true);

		try {
			const inputData = {
				name: name.value,
				email: email.value,
				phone: phone.value,
				cnic: CNIC.value,
				city: city.value,
				address: address.value,
				password: password.value,
				image: selectedImage.value,
			};

			const { data } = await api.registerUser(inputData);
			console.log(data);

			if (data) {
				dispatch(
					logIn({
						user: data.user,
					})
				);
			} else {
				console.log("Process failed");
				Alert.alert("Error", "Process failed.");
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log("=> Error");
			console.log(error);
			Alert.alert("Error", error?.response?.data?.message);
		}
	};

	return (
		<Background>
			{loading === true ? (
				<View className="h-full flex-col justify-center">
					<ActivityIndicator size={45} color={theme.colors.bg0} />
				</View>
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						justifyContent: "center",
					}}
					className="h-full w-full flex-col"
				>
					<BackButton goBack={navigation.goBack} />
					<View className="h-full items-center p-10 justify-center">
						<Logo size={140} />

						<Heading>Create Account</Heading>
						<Paragraph>
							Please provide valid information for your account creation.
						</Paragraph>

						{/* presonal */}

						<Text
							style={{ color: theme.colors.dark }}
							className="text-left w-full border-b border-gray-300 pb-1 text-base font-medium mt-8"
						>
							Personal
						</Text>

						<View className="flex-row items-center mt-5 justify-between w-full bg-white border border-gray-400 rounded-md p-4">
							<View className="flex-col items-center">
								{selectedImage.value !== "" ? (
									<Image
										source={{
											uri: "data:image/jpeg;base64," + selectedImage.value,
										}}
										className="h-[100px] w-[100px] rounded-full"
									/>
								) : (
									<View className="h-[100px] w-[100px] rounded-full bg-gray-300 flex-col items-center justify-center">
										<Text>UPLOAD</Text>
										<Text>IMAGE</Text>
									</View>
								)}
							</View>

							<View className="flex-col items-center">
								<TouchableOpacity onPress={pickImage}>
									<Text className="bg-blue-500 text-white w-[100px] text-center py-2 font-bold rounded-full mb-2">
										Gallery
									</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={takePhoto}>
									<Text className="bg-blue-500 text-white w-[100px] text-center py-2 font-bold rounded-full">
										Camera
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						{selectedImage.error !== "" && (
							<Text
								style={{
									fontSize: 13,
									color: theme.colors.error,
									paddingTop: 8,
									marginRight: "auto",
								}}
							>
								{selectedImage.error}
							</Text>
						)}

						<TextInput
							label="Name"
							returnKeyType="next"
							value={name.value}
							onChangeText={(text) => setName({ value: text, error: "" })}
							error={name.error}
							errorText={name.error}
							className="h-10 bg-white"
						/>

						<TextInput
							label="CNIC eg: xxxxx-xxxxxxx-x"
							returnKeyType="next"
							value={CNIC.value}
							onChangeText={(text) => setCNIC({ value: text, error: "" })}
							error={CNIC.error}
							errorText={CNIC.error}
							autoCapitalize="none"
							keyboardType="number-pad"
							className="h-10 bg-white"
						/>

						{/* contact */}
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left w-full border-b border-gray-300 pb-1 text-base font-medium mt-8"
						>
							Contact
						</Text>

						<TextInput
							label="Email"
							returnKeyType="next"
							value={email.value}
							onChangeText={(text) => setEmail({ value: text, error: "" })}
							error={email.error}
							errorText={email.error}
							autoCapitalize="none"
							autoCompleteType="email"
							textContentType="emailAddress"
							keyboardType="email-address"
							className="h-10 bg-white"
						/>

						<TextInput
							label="Phone"
							returnKeyType="next"
							value={phone.value}
							onChangeText={(text) => setPhone({ value: text, error: "" })}
							error={phone.error}
							errorText={phone.error}
							autoCapitalize="none"
							keyboardType="number-pad"
							className="h-10 bg-white"
						/>

						{/* address */}
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left w-full border-b border-gray-300 pb-1 text-base font-medium mt-8"
						>
							Address
						</Text>

						<TextInput
							label="City"
							returnKeyType="next"
							value={city.value}
							onChangeText={(text) => setCity({ value: text, error: "" })}
							error={city.error}
							errorText={city.error}
							autoCapitalize="none"
							className="h-10 bg-white"
						/>

						<TextInput
							label="Address"
							returnKeyType="next"
							value={address.value}
							onChangeText={(text) => setAddress({ value: text, error: "" })}
							error={address.error}
							errorText={address.error}
							autoCapitalize="none"
							className="h-10 bg-white"
						/>

						{/* password */}
						<Text
							style={{ color: theme.colors.dark }}
							className="text-left w-full border-b border-gray-300 pb-1 text-base font-medium mt-8"
						>
							Password
						</Text>

						<TextInput
							label="Password"
							returnKeyType="done"
							value={password.value}
							onChangeText={(text) => setPassword({ value: text, error: "" })}
							error={password.error}
							errorText={password.error}
							secureTextEntry
							className="h-10 bg-white"
						/>

						<TextInput
							label="Confirm password"
							returnKeyType="done"
							value={confirmPassword.value}
							onChangeText={(text) =>
								setConfirmPassword({ value: text, error: "" })
							}
							error={confirmPassword.error}
							errorText={confirmPassword.error}
							secureTextEntry
							className="h-10 bg-white"
						/>

						<Button
							mode="contained"
							onPress={handleSignUp}
							style={{ marginTop: 24, backgroundColor: theme.colors.main }}
						>
							Sign Up
						</Button>
						<View style={styles.row}>
							<Text>Already have an account? </Text>
							<TouchableOpacity
								onPress={() => navigation.replace("LoginScreen")}
							>
								<Text style={styles.link}>Login</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			)}
		</Background>
	);
};

export default UpdateImageScreen;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		marginTop: 4,
	},
	link: {
		fontWeight: "bold",
		color: theme.colors.main,
	},
});
