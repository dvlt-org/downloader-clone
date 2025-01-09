import { createContext, useReducer } from "react"

export const downloadContext = createContext()

let initialState = {
    videos: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case "add":
            return {
                ...state,
                videos: [...state.videos, action.payload]
            }
        default:
            return state;
    }
}

export const DownloadProvider = ({ children }) => {
    const [state, downloadDispatch] = useReducer(reducer, initialState)
    return (
        <downloadContext.Provider value={{
            state, downloadDispatch
        }}>
            {children}
        </downloadContext.Provider>
    )
}