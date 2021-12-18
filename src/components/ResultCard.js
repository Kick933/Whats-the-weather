import React from 'react'
import { Link } from 'react-router-dom'
import { remove } from '../state/placeList'
import { useDispatch } from 'react-redux'

function ResultCard({ place, loading }) {
    const dispatch = useDispatch()
    if (place.status === 'Fulfilled') {
        const weather = place.weather
        return (
            <>
                <div className="weather-card m-2 bg-opacity-90 dark:bg-opacity-100 focus:outline-none">
                    <Link to={{ pathname: `/place/${place.searchName}` }}>
                        <p className="text-xl font-semibold">{weather.name}</p>
                        <p className="text-lg font-medium text-gray-600 dark:text-indigo-200">{weather.sys.country}</p>
                        <p className="text-sm mt-4 text-gray-600 dark:text-indigo-200">Temperature</p>
                        <p className="text-base  text-gray-600 dark:text-indigo-200">{weather.main.temp} &#8451;</p>
                        <p className="text-sm mt-4 text-gray-600 dark:text-indigo-200">Feels like</p>
                        <p className="text-3xl">{weather.main.feels_like} &#8451;</p>
                    </Link>
                    <button className="w-16 h-8 bg-red-500 hover:bg-red-600 mx-auto mt-4 focus:outline-none focus:bg-red-400 active:bg-red-400 dark:text-black text-gray-200 rounded-md" onClick={() => dispatch(remove(place.searchName))}>Delete</button>
                </div>
            </>
        )
    } else {
        return (
            <div className="weather-card m-2  bg-opacity-80 dark:bg-opacity-100 focus:outline-none" >
                <p className="text-xl font-semibold">{place.searchName.toUpperCase()}</p>
                <p className="text-base p-4 text-gray-400">{place.status === 'Rejected' ? "Something went wrong" : "Loading...."}</p>
            </div>
        )
    }
}

export default ResultCard
