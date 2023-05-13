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
import { theme } from "../../core/theme";
import {
	CardField,
	useStripe,
	StripeProvider,
} from "@stripe/stripe-react-native";
import { useSelector, selectUser } from "../../features/userSlice";
import * as api from "../../api/userRequests";

export default function BookingFinalScreen({ route, navigation }) {
	const { space, slot, block, days, pkg, startDate, endDate, price, vehicle } =
		route.params;
	const [processing, setProcessing] = useState(false);

	// Set Key
	const [publishableKey, setPublishableKey] = useState("");
	useEffect(() => {
		const fetchPublishableKey = async () => {
			const key =
				"pk_test_51LaSQhEAemI4LDmuIe5cl3b69a2f17XKvQ9S2GXGFLMnIitI4Fu58m0YcbiOMzS3M6OF1SlaltCCDPG3UI2Hov1h00wu5B46Yx";
			setPublishableKey(key);
		};

		fetchPublishableKey();
	}, []);

	// handle booking
	async function handleBooking() {
		setProcessing(2);

		try {
			const bookingInfo = {
				ps: space.id,
				slot: slot,
				block: block,
				days: days,
				package: pkg.id === 0 ? null : pkg.id,
				from: startDate,
				to: endDate,
				price: price,
				vehicleId: vehicle.id,
				vehicleNo: vehicle.number,
			};
			const { data } = await api.addBooking(bookingInfo);

			if (data?.success === true) {
				// console.log(data);
				Alert.alert(
					"Slot reserved",
					`Successfully reserved your slot in ${space.name}\nBlock: ${block}\nSlot: ${slot}`
				);
				navigation.goBack();
				navigation.goBack();
			} else {
				Alert.alert("Error", "Something went wrong.");
				// console.log(data);
			}
			setProcessing(false);
		} catch (error) {
			console.log("=> Error");
			console.log(error);
			Alert.alert(
				"Error",
				error?.response?.data?.message ?? "An error occured."
			);
			setProcessing(false);
		}
	}

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
						className="flex-col w-full relative"
					>
						{/* loader */}
						{processing !== false && (
							<View
								style={{ backgroundColor: theme.colors.surface }}
								className="absolute top-0 left-0 z-40 h-full w-full flex-col justify-center items-center"
							>
								<ActivityIndicator size={45} color={theme.colors.bg0} />
								<Text>
									{processing === 1
										? "processing payments..."
										: "processing booking..."}
								</Text>
							</View>
						)}

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
								- {vehicle.number}
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

								<StripeProvider publishableKey={publishableKey}>
									<PaymentScreen
										price={price}
										handleBooking={handleBooking}
										setProcessing={setProcessing}
									/>
								</StripeProvider>
							</View>
						)}
					</TouchableOpacity>
				</ScrollView>
			</View>
		</Background>
	);
}

function PaymentScreen({ price, handleBooking, setProcessing }) {
	const { user } = useSelector(selectUser);
	const [cardDetails, setCardDetails] = useState(null);
	const { confirmPayment } = useStripe();

	// Payment
	async function handleSubmit() {
		const { data } = await api.createPaymentIntent({ amount: price });
		const billingDetails = {
			email: user?.user?.email,
			phone: user?.user?.phone,
			address: {
				city: user?.user?.city,
				country: "PK",
				line1: user?.user?.address,
			},
		};
		const { error, paymentIntent } = await confirmPayment(
			data?.data, //clientSecret
			{
				paymentMethodType: "Card",
				paymentMethodData: {
					billingDetails,
				},
			}
		);

		if (error) {
			Alert.alert("Payment error", error.message);
			console.log(
				`Error code: ${error.code}` + "Payment confirmation error",
				error.message
			);
			setProcessing(false);
		} else if (paymentIntent) {
			console.log("Success from promise", paymentIntent);
			handleBooking();
		}
	}

	return (
		<View className="w-full">
			<CardField
				style={{ height: 70, marginVertical: 20 }}
				cardStyle={{ backgroundColor: theme.colors.bg, borderRadius: 15 }}
				postalCodeEnabled={false}
				placeholders={{
					number: "4242 4242 4242 4242",
					cvc: "CVC",
					expiration: "MM|YY",
				}}
				onCardChange={(cardDetails) => {
					// console.log("cardDetails", cardDetails);
					setCardDetails(cardDetails);
				}}
			/>

			<Button
				mode="contained"
				onPress={() => {
					setProcessing(1);
					handleSubmit();
				}}
				disabled={cardDetails?.complete !== true}
			>
				Confirm Booking
			</Button>
		</View>
	);
}
