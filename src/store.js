import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthed: !!sessionStorage.getItem("bearerToken"),
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthed = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthed = false;
      state.user = null;
    },
  }
});

export const { login, logout } = authSlice.actions;

// Breadcrumb slice
const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: {
    nodes: [],
    registeredNodes: {},
  },
  reducers: {
    root: (state, action) => {
      state.nodes = [action.payload];
      state.registeredNodes = [];
    },
    hint: (state, action) => {
      const node = action.payload;
      if (state.registeredNodes[node.path]) {
        return;
      }
      state.nodes = [...state.nodes, node];
      state.registeredNodes = { ...state.registeredNodes, [node.path]: true };
    },
  }
});

export const { root, hint } = breadcrumbSlice.actions;

// Store
export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    breadcrumb: breadcrumbSlice.reducer,
  },
  devTools: true,
});