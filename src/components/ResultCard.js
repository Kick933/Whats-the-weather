import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getWeather } from '../helpers/getWeather'

function ResultCard({ place, deleteResult }) {
    const [weather, setWeather] = useState({})

    function handleDelete(e) {
        deleteResult(place)
    }

    useEffect(() => {
        let isSubscribed = true
        getWeather(place)
            .then(res => (isSubscribed ? setWeather(res) : null))
            .catch(err => console.log(err.message))

        return () => (isSubscribed = false)
    }, [place])
    if (weather.cod === 200) {
        return (
            <>

                <div className="weather-card m-2 bg-opacity-90 dark:bg-opacity-100 focus:outline-none">
                    <Link to={`/place/${weather.name}`}>
                        <p className="text-xl font-semibold">{weather.name}</p>
                        <p className="text-lg font-medium text-gray-600 dark:text-indigo-200">{weather.sys.country}</p>
                        <p className="text-sm mt-4 text-gray-600 dark:text-indigo-200">Temperature</p>
                        <p className="text-base  text-gray-600 dark:text-indigo-200">{weather.main.temp} &#8451;</p>
                        <p className="text-sm mt-4 text-gray-600 dark:text-indigo-200">Feels like</p>
                        <p className="text-3xl">{weather.main.feels_like} &#8451;</p>
                    </Link>
                    <button className="w-16 h-8 bg-red-500 hover:bg-red-600 mx-auto mt-4 focus:outline-none focus:bg-red-400 active:bg-red-400 dark:text-black text-gray-200 rounded-md" onClick={() => handleDelete(place)}>Delete</button>
                </div>

            </>
        )
    } else {
        return (
            <div className="weather-card  bg-opacity-80 dark:bg-opacity-100 focus:outline-none">
                <p className="text-xl font-semibold">{place}</p>
                <p className="text-lg text-gray-400">Loading....</p>
            </div>
        )
    }
}

export default ResultCard
