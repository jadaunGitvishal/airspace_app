import axios from "axios";
// const mainUrl = "http://192.168.18.14:4000/api/v1";
const mainUrl = "http://192.168.1.102:4000/api/v1";
const userUrl = mainUrl + "/user";
const psUrl = mainUrl + "/ps";
const pkgUrl = mainUrl + "/package";

const config = {
	headers: { "Content-Type": "multipart/form-data" },
	withCredentials: true,
	credentials: "include",
};

// Login User
export const loginUser = (data) => axios.post(`${userUrl}/login`, data, config);

// Logout User
export const logoutUser = () => axios.get(`${userUrl}/logout`, config);

// Load User
export const loadUser = () => axios.get(`${userUrl}/load/me`, config);

// Forget Password
export const forgetPassword = (data) =>
	axios.post(`${userUrl}/forgot`, data, config);

// Check Otp
export const checkOtp = (data) => axios.post(`${userUrl}/otp`, data, config);

// Reset Password
export const resetPassword = (data) =>
	axios.post(`${userUrl}/reset`, data, config);

// Register User
export const registerUser = (data) =>
	axios.post(`${userUrl}/new`, data, config);

// Update Profile
export const updateProfile = (data) =>
	axios.put(`${userUrl}/me/update`, data, config);

// Update Image
export const updateImage = (data) =>
	axios.put(`${userUrl}/me/image/update`, data, config);

// Update Password
export const updatePassword = (data) =>
	axios.put(`${userUrl}/password/update`, data, config);

// Get User Dashboard
export const getUserDashboard = () => axios.get(`${userUrl}/dashboard`, config);

// Get Nearby Ps
export const getNearbyPs = () => axios.get(`${userUrl}/nearby`, config);

// Get History
export const getHistory = () => axios.get(`${userUrl}/history`, config);

// Get Notifications
export const getNotifications = () =>
	axios.get(`${userUrl}/notifications`, config);

// Get All Parking Spaces
export const getAllParkingSpaces = () => axios.get(`${psUrl}/all`, config);

// Get Parking Details
export const getParkingSpaceDetails = (id) =>
	axios.get(`${psUrl}/get/${id}`, config);

// Create Click And Impression
export const createClickAndImpression = (data) =>
	axios.post(`${userUrl}/click/new`, data, config);

// Get All Vehicles
export const getAllVehicles = () => axios.get(`${userUrl}/vehicles`, config);

// Delete Vehicle
export const deleteVehicle = (id) =>
	axios.delete(`${userUrl}/vehicles/delete/${id}`, config);

// Add Vehicle
export const addVehicle = (data) =>
	axios.post(`${userUrl}/vehicles/new`, data, config);

// Get All Packages
export const getAllPackages = () => axios.get(`${pkgUrl}/user/all`, config);

// Check Reservation Status
export const checkSlotStatus = (data) =>
	axios.post(`${psUrl}/slot/check`, data, config);

// Create Payment Intent
export const createPaymentIntent = (data) =>
	axios.post(`${userUrl}/payment/new`, data, config);

// Add Booking
export const addBooking = (data) =>
	axios.post(`${userUrl}/booking/new`, data, config);

// Check Reservation Status
export const checkReservationStatus = () =>
	axios.get(`${userUrl}/booking/check`, config);

// Get All Queries
export const getAllQueries = () => axios.get(`${userUrl}/queries`, config);

// Add Query
export const addQuery = (data) =>
	axios.post(`${userUrl}/Query/new`, data, config);
