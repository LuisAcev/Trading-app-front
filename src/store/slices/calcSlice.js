import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deposit: "",
  instrument: "",
  price: "",
  lotes: 1,
  pipSize: "",
  pip: 1,
  fx:false
};

const calcSlice = createSlice({
  name: "calcSlice",
  initialState,
  reducers: {
    // value calc
    assetToCalc(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { assetToCalc } = calcSlice.actions;
export default calcSlice.reducer;
