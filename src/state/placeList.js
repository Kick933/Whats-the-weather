import { createSlice } from "@reduxjs/toolkit";


const getData = () => {
    const myStorage = window.localStorage
    const val = JSON.parse(myStorage.getItem('placeList'))
    if (val !== null) {
        return val.map(item => {
            return {
                searchName: item
            }
        })
    }
    return []
}

const initialState = {
    placeList: getData()
}


export const placeList = createSlice(
    {
        name: 'placeList',
        initialState,
        reducers: {
            setWeather: (state, action) => {
                const newState = state.placeList.map(item => {
                    if (item.searchName === action.payload.searchName) {
                        return {
                            searchName: action.payload.searchName,
                            weather: action.payload.weather
                        }
                    } else return item
                })
                state.placeList = newState
            },
            add: (state, action) => {
                state.placeList.unshift({
                    searchName: action.payload.searchName,
                    weather: action.payload.weather
                })
            },
            remove: (state, action) => {
                const places = state.placeList.filter(item => item.searchName.toLowerCase() !== action.payload.toLowerCase())
                state.placeList = places
            }

        }
    }
)

export const { add, remove, setWeather } = placeList.actions
export default placeList.reducer