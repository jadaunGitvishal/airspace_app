import axios from "axios";
// const mainUrl = "http://localhost:4000/api/v1";
const mainUrl = "http://192.168.2.125:4000/api/v1";

// FETCH ALL PARKINGS
export const fetchAllParkings = () => axios.get(`${mainUrl}/parkings`);

// FETCH PARKING DETAILS
export const fetchParkingDetails = (id) =>
	axios.get(`${mainUrl}/parking/details/${id}`);
