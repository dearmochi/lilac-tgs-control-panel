import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthed: !!sessionStorage.getItem("bearerToken"),
  },
  reducers: {
    login: state => {
      state.isAuthed = true;
    },
    logout: state => {
      state.isAuthed = false;
    },
  }
})

export const { login, logout } = authSlice.actions;

// Store
export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  devTools: true,
});