import axios from "axios";
const mainUrl = "http://192.168.211.51:4000/api/v1/user";
const userUrl = mainUrl;

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
