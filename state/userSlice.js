import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userId: null,
    querys: [],
    queryChanging: false,
    downloadingProgress: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload
        },
        addQuerys: (state, action) => {
            state.querys = action.payload
        },
        queryChanging: (state, action) => {
            state.queryChanging = action.payload
        },
        addProgress: (state, action) => {
            state.downloadingProgress[action.payload.id] = action.payload.progress
        }
    },
})


export const {
    login,
    addQuerys,
    queryChanging,
    addProgress
} = userSlice.actions


export default userSlice.reducer