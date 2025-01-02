import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        querys: [],
        queryChanging: false
    },
    reducers: {
        login: (state, payload) => {
            state.userId = payload.payload
        },
        addQuerys: (state, payload) => {
            state.querys = payload.payload
        },
        queryChanging: (state, payload) => {
            state.queryChanging = payload.payload
        }
    }
})



export const { login, addQuerys, queryChanging } = userSlice.actions


export default userSlice.reducer