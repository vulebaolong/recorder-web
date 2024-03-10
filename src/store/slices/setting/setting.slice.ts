import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

type TInittialState = {
  mode: PaletteMode;
};

const initialState: TInittialState = {
  mode: "dark",
};

const setting = createSlice({
  name: "setting",
  initialState,
  reducers: {
    SET_MODE: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { SET_MODE } = setting.actions;

export default setting.reducer;
