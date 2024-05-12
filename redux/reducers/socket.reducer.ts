import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

const initialState: {
  socket: Socket<any, any> | null;
} = {
  socket: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, payload) => {
      state.socket = payload.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
    }
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;

export default socketSlice.reducer;
