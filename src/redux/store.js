import { configureStore } from "@reduxjs/toolkit";
import musicReducer from './musicSlice'

export default configureStore({
    reducer: {
        music: musicReducer,
    }
})