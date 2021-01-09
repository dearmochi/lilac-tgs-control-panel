import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthed: !!sessionStorage.getItem("bearerToken"),
    user: null,
    instanceUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthed = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthed = false;
      state.user = state.instanceUser = null;
    },
    instance: (state, { payload }) => {
      state.instanceUser = payload;
    },
  },
});

export const { login, logout, instance } = authSlice.actions;

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
  },
});

export const { root, hint } = breadcrumbSlice.actions;

// Instance jobs slice
const instanceJobsSlice = createSlice({
  name: "instanceJobs",
  initialState: {
    jobs: [],
  },
  reducers: {
    init: (state, { payload }) => {
      state.jobs = payload || [];
    },
    add: (state, { payload }) => {
      state.jobs = state.jobs.concat(payload);
    },
  },
});

export const { init, add } = instanceJobsSlice.actions;

// Store
export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    breadcrumb: breadcrumbSlice.reducer,
    instanceJobs: instanceJobsSlice.reducer,
  },
  devTools: true,
});