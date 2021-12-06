import { configureStore } from '@reduxjs/toolkit'
import placeList from './placeList'

export const store = configureStore({
    reducer: {
        weather: placeList
    },
})