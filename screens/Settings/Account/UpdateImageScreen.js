import React, { useEffect, useState } from "react";
import Background from "../../../components/Background";
import BackButtonSimple from "../../../components/Button/BackButtonSimple";
import {
	ActivityIndicator,
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { theme } from "../../../core/theme";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../components/Button/Button";
import * as api from "../../../api/userRequests";
import * as ImagePicker from "expo-image-picker";
import { nameValidator } from "../../../helpers/nameValidator";
import { logIn, useDispatch } from "../../../features/userSlice";

export default function UpdateImageScreen({ navigation }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState({ value: "", error: "" });

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

	// handle update
	const handleUpdate = async () => {
		const imageError = nameValidator(selectedImage.value);
		if (imageError) {
			setSelectedImage({ ...selectedImage, error: imageError });
			return;
		}

		try {
			setLoading(true);
			const { data } = await api.updateImage({
				image: selectedImage.value,
			});
			if (data) {
				dispatch(
					logIn({
						user: data?.data,
					})
				);
				Alert.alert("Image Updated", "Image updated for your account.");
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
							PROFILE IMAGE
						</Text>
						<Ionicons
							name="image-outline"
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
								UPDATE IMAGE
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

							<View className="w-2/4 ml-auto mt-5">
								<Button
									mode="contained"
									onPress={() => {
										handleUpdate();
									}}
								>
									Update
								</Button>
							</View>
						</TouchableOpacity>
					)}
				</ScrollView>
			</View>
		</Background>
	);
}
