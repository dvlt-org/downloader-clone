import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userId: null,
    querys: [],
    queryChanging: false,
    downloadVideos: [],
    downloadProgress: 0,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, payload) => {
            state.userId = JSON.parse(payload.payload)
        },
        addQuerys: (state, payload) => {
            state.querys = JSON.parse(payload.payload)
        },
        queryChanging: (state, payload) => {
            state.queryChanging = JSON.parse(payload.payload)
        },
        changeDownloadVideo: (state, action) => {
            state.downloadVideos = [...state.downloadVideos, JSON.parse(action.payload)]
        },
        changeDownloadProgress: (state, action) => {
            state.downloadProgress = JSON.parse(action.payload)
        }
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/changeDownloadVideo'],
            },
        }),
})


export const {
    login,
    addQuerys,
    queryChanging,
    changeDownloadVideo,
    changeDownloadProgress } = userSlice.actions


export default userSlice.reducer