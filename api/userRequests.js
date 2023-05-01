import axios from "axios";
const mainUrl = "http://192.168.18.14:4000/api/v1";
const userUrl = mainUrl + "/user";
const psUrl = mainUrl + "/ps";

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

// Register User
export const registerUser = (data) =>
	axios.post(`${userUrl}/new`, data, config);

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
export const getAllParkingSpaces = () => axios.get(`${psUrl}/all`);

// Get Parking Details
export const getParkingSpaceDetails = (id) => axios.get(`${psUrl}/get/${id}`);
