import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instrument: "",
  time:"1d"
};

const instrumentSlice = createSlice({
  name: "instrumentSlice",
  initialState,
  reducers: {
    // value calc
    instrumentChart(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { instrumentChart } = instrumentSlice.actions;
export default instrumentSlice.reducer;
