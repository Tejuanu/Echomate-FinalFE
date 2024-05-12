import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  type: "success",
  message: "",
};

interface SnackState {
  open: boolean;
  type: "error" | "success" | "info";
  message: string;
}

export const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    setSnack: (state, payload: PayloadAction<SnackState>) => {
      state.open = payload.payload.open;
      state.type = payload.payload.type;
      state.message = payload.payload.message;
    },
    closeSnack: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { setSnack, closeSnack } = snackSlice.actions;

export default snackSlice.reducer;
