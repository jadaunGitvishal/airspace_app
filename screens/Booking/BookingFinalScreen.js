import React, { useEffect, useState } from "react";
import Background from "../../components/Background";
import BackButtonSimple from "../../components/Button/BackButtonSimple";
import Button from "../../components/Button/Button";
import {
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
	Alert,
	TextInput,
	ScrollView,
} from "react-native";
import {
	StripeProvider,
	CardField,
	useStripe,
} from "@stripe/stripe-react-native";
import { theme } from "../../core/theme";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function BookingFinalScreen({ route, navigation }) {
	const { space, slot, days, pkg, startDate, endDate, price, vehicle } =
		route.params;

	// Set Key
	const [publishableKey, setPublishableKey] = useState("");
	const fetchPublishableKey = async () => {
		// const key = await fetchKey(); // fetch key from your server here
		const key =
			"pk_test_51LaSQhEAemI4LDmuIe5cl3b69a2f17XKvQ9S2GXGFLMnIitI4Fu58m0YcbiOMzS3M6OF1SlaltCCDPG3UI2Hov1h00wu5B46Yx";
		setPublishableKey(key);
	};

	useEffect(() => {
		fetchPublishableKey();
	}, []);

	return (
		<Background>
			<View className="h-full">
				{/* HEADER */}
				<View
					style={{
						height: "18%",
						backgroundColor: theme.colors.main,
						borderBottomRightRadius: 30,
						borderBottomLeftRadius: 30,
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
							PAYMENT
						</Text>
					</View>
				</View>

				{/* LOWER SECTION */}
				<ScrollView
					showsVerticalScrollIndicator={false}
					className="flex-1 w-full"
				>
					<TouchableOpacity
						activeOpacity={1}
						style={{
							backgroundColor: theme.colors.surface,
						}}
						className="flex-col w-full"
					>
						{/* Booking Informaion */}
						<View
							style={{
								backgroundColor: theme.colors.surface,
								borderColor: theme.colors.bg1,
								shadowColor: theme.colors.shadow,
								elevation: 10,
								borderRadius: 10,
							}}
							className="p-6 mt-4 mx-5 flex-col border"
						>
							<Text
								style={{
									color: theme.colors.main,
								}}
								className="font-semibold capitalize text-base text-center mb-4"
							>
								Booking Information
							</Text>

							<Text
								style={{
									color: theme.colors.dark,
								}}
								className="font-semibold capitalize text-base"
							>
								- {space.name}
							</Text>

							<Text
								style={{
									color: theme.colors.dark,
								}}
								className="font-semibold capitalize text-base"
							>
								- Slot No {slot}
							</Text>

							<Text
								style={{
									color: theme.colors.dark,
								}}
								className="font-semibold capitalize text-base"
							>
								- Start Date {startDate.toLocaleDateString()}
							</Text>
							<Text
								style={{
									color: theme.colors.dark,
								}}
								className="font-semibold capitalize text-base"
							>
								- End Date {endDate.toLocaleDateString()}
							</Text>

							<Text
								style={{
									color: theme.colors.dark,
								}}
								className="font-semibold capitalize text-base"
							>
								- Total {days} days
							</Text>

							<Text
								style={{
									color: theme.colors.dark,
								}}
								className="font-semibold capitalize text-base"
							>
								- {pkg.name}
							</Text>

							<Text
								style={{
									color: theme.colors.dark,
								}}
								className="font-semibold capitalize text-base"
							>
								- {price} Rs
							</Text>

							<Text
								style={{
									color: theme.colors.dark,
								}}
								className="font-semibold uppercase text-base"
							>
								- {vehicle}
							</Text>
						</View>

						{/* Payment Data */}

						{price && (
							<View
								style={{
									backgroundColor: theme.colors.surface,
									borderColor: theme.colors.bg1,
									shadowColor: theme.colors.shadow,
									elevation: 10,
									borderRadius: 10,
								}}
								className="p-6 mt-4 mx-5 flex-col border"
							>
								<Text
									style={{
										color: theme.colors.main,
									}}
									className="font-semibold capitalize text-base text-center"
								>
									Card Information
								</Text>

								<StripeProvider
									publishableKey={publishableKey}
									// merchantIdentifier="merchant.identifier" // required for Apple Pay
									// urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
								>
									<PaymentScreen price={price} />
								</StripeProvider>
							</View>
						)}
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}

// 4782 7800 1959 8575
// 02/28
// CVV 629

function PaymentScreen({ price }) {
	const { confirmPayment } = useStripe();

	const [name, setName] = useState("abh");
	const [email, setEmail] = useState("abhasbdo@gmail.com");
	const [cardDetails, setCardDetails] = useState(null);
	const [error, setError] = useState("");
	const [processing, setProcessing] = useState(false);
	const [paymentResult, setPaymentResult] = useState(null);

	const handleCardDetails = (details) => {
		setCardDetails(details);
	};

	const handleSubmit = async () => {
		setProcessing(true);
		setError(null);

		try {
			const { paymentIntent, error } = await confirmPayment({
				paymentMethod: {
					card: cardDetails,
					billing_details: {
						name,
						email,
					},
				},
			});

			if (error) {
				setError(`Payment failed: ${error.message}`);
			} else if (paymentIntent.status === "succeeded") {
				setPaymentResult(`Payment successful, ID: ${paymentIntent.id}`);
			} else {
				setError(`Payment failed: ${paymentIntent.status}`);
			}
		} catch (e) {
			console.log(e);
			setError(`Payment failed: ${e.message}`);
		} finally {
			setProcessing(false);
		}
	};

	return processing ? (
		<ActivityIndicator />
	) : (
		<>
			<CardField
				postalCodeEnabled={false}
				placeholders={{
					number: "1212 1212 1212 1212",
				}}
				cardStyle={{
					backgroundColor: "#FFFFFF",
					textColor: "#000000",
				}}
				style={{
					width: "100%",
					height: 50,
					marginVertical: 20,
				}}
				onCardChange={handleCardDetails}
				onFocus={(focusedField) => {
					console.log("focusField", focusedField);
				}}
			/>

			<View className="w-2/3 mx-auto ">
				<Button
					mode="contained"
					onPress={() => handleSubmit()}
					disabled={cardDetails?.complete !== true}
				>
					Confirm Booking
				</Button>
			</View>

			<View>{error}</View>
			<View>{paymentResult}</View>
		</>
	);
}
