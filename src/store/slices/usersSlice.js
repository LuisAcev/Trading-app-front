import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id: "",
  fullname: "",
  email: "",
  password: "",
  cellPhone: "",
  country: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // Agrega un usuario completo
    usersAdded(state, action) {
      return { ...state, ...action.payload };
    },
    // Actualiza propiedades específicas
    usersUpdate(state, action) {
      Object.assign(state, action.payload);
    },
    usersdelete() {
      return initialState;
    },
  },
});

export const { usersAdded, usersUpdate, usersdelete } = userSlice.actions;
export default userSlice.reducer;
