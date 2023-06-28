import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null
    },
    reducers:{
        getUser: (state, action) => {
            state.user = action.payload
            console.log('data from user reducer', state.user)
        },
        logout: (state) => {
            state.user = null
        }
    }
})


export const {getUser, logout} = userSlice.actions

export default userSlice.reducer