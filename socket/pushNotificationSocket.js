import io from "socket.io-client";

// const socket = io("http://localhost:4000", {
const socket = io("http://192.168.18.14:4000", {
	withCredentials: true,
});

async function dataUpdateWithNotificationSocket(func) {
	// socket connect
	socket.on("connect", () => {
		console.log("$ Connected to AirSpace server for notifications");
	});

	socket.on("new_notification", async (data) => {
		func(data);
	});

	// socket disconnect
	socket.on("disconnect", () => {
		console.log("$ Disconnected from AirSpace server for notifications");
	});
}

export default dataUpdateWithNotificationSocket;
