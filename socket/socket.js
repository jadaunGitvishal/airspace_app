import io from "socket.io-client";
// const socket = io("http://192.168.18.14:4000", {
const socket = io("http://192.168.1.100:4000", {
	withCredentials: true,
});

async function dataUpdateWithSocket(func) {
	// socket connect
	socket.on("connect", () => {
		console.log("$ Connected to AirSpace server");
	});

	// change events
	socket.on("activities", async () => {
		func();
	});
	socket.on("admins", async () => {
		func();
	});
	socket.on("bookings", async () => {
		func();
	});
	socket.on("clicks", async () => {
		func();
	});
	socket.on("packages", async () => {
		func();
	});
	socket.on("parkingspaces", async () => {
		func();
	});
	socket.on("queries", async () => {
		func();
	});
	socket.on("users", async () => {
		func();
	});
	socket.on("vehicles", async () => {
		func();
	});
	socket.on("notifications", async () => {
		func();
	});

	// socket disconnect
	socket.on("disconnect", () => {
		console.log("$ Disconnected from AirSpace server");
	});
}

async function dataUpdateWithNotificationSocket(func) {
	// socket connect
	socket.on("connect", () => {
		console.log("$ Connected to AirSpace server for notifications");
	});

	socket.on("new_notification", async (data) => {
		console.log("\nNew Notification\n");
		func(data);
	});

	// socket disconnect
	socket.on("disconnect", () => {
		console.log("$ Disconnected from AirSpace server for notifications");
	});
}

export { dataUpdateWithNotificationSocket, dataUpdateWithSocket };
