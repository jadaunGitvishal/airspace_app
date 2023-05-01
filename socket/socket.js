// import io from "socket.io-client";
// const socket = io("http://localhost:4000", {
// 	withCredentials: true,
// });

// async function dataUpdateWithSocket(func) {
// 	// socket connect
// 	socket.on("connect", () => {
// 		console.log("$ Connected to AirSpace server");
// 	});

// 	// change events
// 	socket.on("activities", async () => {
// 		func();
// 	});
// 	socket.on("admins", async () => {
// 		func();
// 	});
// 	socket.on("bookings", async () => {
// 		func();
// 	});
// 	socket.on("clicks", async () => {
// 		func();
// 	});
// 	socket.on("packages", async () => {
// 		func();
// 	});
// 	socket.on("parkingspaces", async () => {
// 		func();
// 	});
// 	socket.on("queries", async () => {
// 		func();
// 	});
// 	socket.on("users", async () => {
// 		func();
// 	});
// 	socket.on("vehicles", async () => {
// 		func();
// 	});
// 	socket.on("notifications", async () => {
// 		func();
// 	});

// 	// socket disconnect
// 	socket.on("disconnect", () => {
// 		console.log("$ Disconnected from AirSpace server");
// 	});
// }

// export default dataUpdateWithSocket;
