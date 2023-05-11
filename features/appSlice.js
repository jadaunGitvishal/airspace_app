import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
	dark: false,
	notif: true,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setMode: (state, action) => {
			state.dark = action.payload;
		},
		setNotif: (state, action) => {
			state.notif = action.payload;
		},
	},
});

export const { setMode, setNotif } = appSlice.actions;
export const selectApp = (state) => state.app;
export default appSlice.reducer;
export { useDispatch, useSelector };
