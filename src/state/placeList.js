import { createSlice } from "@reduxjs/toolkit";


const getData = () => {
    const myStorage = window.localStorage
    const val = JSON.parse(myStorage.getItem('placeList'))
    if (val !== null) {
        return val.map(item => {
            return {
                searchName: item,
                status: 'Idle'
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
                    if (item.searchName.toLowerCase() === action.payload.searchName.toLowerCase()) {
                        return {
                            searchName: action.payload.searchName,
                            weather: action.payload.weather,
                            status: action.payload.status
                        }
                    } else return item
                })
                state.placeList = newState
            },
            setPending: (state, action) => {
                const newState = state.placeList.map(item => {
                    if (item.searchName.toLowerCase() === action.payload.searchName.toLowerCase()) {
                        return {
                            searchName: item.searchName,
                            status: 'Pending'
                        }
                    }
                    return item
                })
                state.placeList = newState
            },
            setRejected: (state, action) => {
                const newState = state.placeList.map(item => {
                    if (item.searchName.toLowerCase() === action.payload.searchName.toLowerCase()) {
                        return {
                            searchName: item.searchName,
                            status: 'Rejected'
                        }
                    }
                    return item
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

export const { add, remove, setWeather, setPending, setRejected } = placeList.actions
export default placeList.reducer