 import { createSlice } from '@reduxjs/toolkit'

 const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        token: localStorage.getItem("token") || null,
        loading: false
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            state.userData = null;
            state.token = null;
            state.loading = false;
        },
    },
 });

 export default userSlice.reducer;

 export const {setUserData, setToken, setLoading, logout } = userSlice.actions;