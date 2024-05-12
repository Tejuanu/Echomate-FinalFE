import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: 'light'
}

export const loadingSlice = createSlice( {
  name: "theme",
  initialState,
  reducers: {
    switchToDark: ( state ) => {
      state.mode = "dark";
    },
    switchToLight: ( state ) => {
      state.mode = "light";
    },
  },
} );

export const { switchToDark, switchToLight } = loadingSlice.actions;

export default loadingSlice.reducer